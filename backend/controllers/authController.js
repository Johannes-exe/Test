const pool = require('../db/connection');
const Joi = require('joi');

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  authProvider: Joi.string().valid('google', 'email').required(),
  privacyAccepted: Joi.boolean().valid(true).required()
});

const registerUser = async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, authProvider, privacyAccepted } = value;

    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.json({
        message: 'User already exists',
        userId: existingUser.rows[0].id
      });
    }

    // Create new user
    const result = await pool.query(
      `INSERT INTO users (email, auth_provider, privacy_accepted)
       VALUES ($1, $2, $3)
       RETURNING id, email, created_at`,
      [email, authProvider, privacyAccepted]
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: result.rows[0]
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

module.exports = {
  registerUser
};
