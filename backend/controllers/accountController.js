const pool = require('../db/connection');

const getProfile = async (req, res) => {
  try {
    const userEmail = req.user.email;

    const result = await pool.query(
      'SELECT id, email, auth_provider, stripe_customer_id, created_at FROM users WHERE email = $1',
      [userEmail]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: result.rows[0] });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to get user profile' });
  }
};

module.exports = { getProfile };
