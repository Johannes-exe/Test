const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createStripeCheckoutSession = async ({ customerEmail, customerId, successUrl, cancelUrl, metadata }) => {
  const sessionParams = {
    payment_method_types: ['card'],
    line_items: [{
      price: process.env.STRIPE_PRICE_ID,
      quantity: 1,
    }],
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata,
    subscription_data: {
      trial_period_days: 14,
    },
  };

  if (customerId) {
    sessionParams.customer = customerId;
  } else {
    sessionParams.customer_email = customerEmail;
  }

  return await stripe.checkout.sessions.create(sessionParams);
};

const constructWebhookEvent = (body, signature) => {
  return stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET
  );
};

module.exports = {
  createStripeCheckoutSession,
  constructWebhookEvent
};
