const express = require('express');
const { registerUser } = require('../controllers/authController');
const { authenticateUser } = require('../middleware/auth');

const router = express.Router();

router.post('/register', authenticateUser, registerUser);

module.exports = router;
