const pool = require('../db/connection');
const { createStripeCheckoutSession, constructWebhookEvent } = require('../services/stripeService');

const createCheckoutSession = async (req, res) => {
  try {
    const userEmail = req.user.email;

    // Get or create user
    let userResult = await pool.query('SELECT id, stripe_customer_id FROM users WHERE email = $1', [userEmail]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = userResult.rows[0];

    // Check if user already has active subscription
    const subResult = await pool.query(
      'SELECT status FROM subscriptions WHERE user_id = $1 AND status IN ($2, $3)',
      [user.id, 'active', 'trialing']
    );

    if (subResult.rows.length > 0) {
      return res.status(400).json({ error: 'User already has an active subscription' });
    }

    const session = await createStripeCheckoutSession({
      customerEmail: userEmail,
      customerId: user.stripe_customer_id,
      successUrl: `${process.env.FRONTEND_URL}/account?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${process.env.FRONTEND_URL}/stocks`,
      metadata: {
        userId: user.id
      }
    });

    res.json({ sessionId: session.id });

  } catch (error) {
    console.error('Checkout session error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
};

const handleWebhook = async (req, res) => {
  try {
    const event = constructWebhookEvent(req.body, req.headers['stripe-signature']);

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object);
        break;
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object);
        break;
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object);
        break;
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ error: 'Webhook handling failed' });
  }
};

const handleCheckoutCompleted = async (session) => {
  const userId = session.metadata.userId;
  const customerId = session.customer;
  const subscriptionId = session.subscription;

  // Update user with Stripe customer ID
  await pool.query(
    'UPDATE users SET stripe_customer_id = $1 WHERE id = $2',
    [customerId, userId]
  );

  // Create subscription record
  await pool.query(`
    INSERT INTO subscriptions (user_id, stripe_subscription_id, status, trial_ends_at, current_period_start, current_period_end)
    VALUES ($1, $2, $3, $4, $5, $6)
  `, [
    userId,
    subscriptionId,
    'trialing',
    new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    new Date(),
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
  ]);
};

const handleSubscriptionUpdated = async (subscription) => {
  await pool.query(`
    UPDATE subscriptions
    SET status = $1, current_period_start = $2, current_period_end = $3
    WHERE stripe_subscription_id = $4
  `, [
    subscription.status,
    new Date(subscription.current_period_start * 1000),
    new Date(subscription.current_period_end * 1000),
    subscription.id
  ]);
};

const handleSubscriptionDeleted = async (subscription) => {
  await pool.query(
    'UPDATE subscriptions SET status = $1 WHERE stripe_subscription_id = $2',
    ['canceled', subscription.id]
  );
};

const getSubscriptionStatus = async (req, res) => {
  try {
    const userEmail = req.user.email;

    const result = await pool.query(`
      SELECT s.status, s.trial_ends_at, s.current_period_end
      FROM subscriptions s
      JOIN users u ON u.id = s.user_id
      WHERE u.email = $1 AND s.status != 'canceled'
      ORDER BY s.created_at DESC
      LIMIT 1
    `, [userEmail]);

    if (result.rows.length === 0) {
      return res.json({ subscription: null });
    }

    res.json({ subscription: result.rows[0] });

  } catch (error) {
    console.error('Get subscription status error:', error);
    res.status(500).json({ error: 'Failed to get subscription status' });
  }
};

module.exports = {
  createCheckoutSession,
  handleWebhook,
  getSubscriptionStatus
};
