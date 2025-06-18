const express = require('express');
const { getProfile } = require('../controllers/accountController');
const { authenticateUser } = require('../middleware/auth');

const router = express.Router();

router.get('/profile', authenticateUser, getProfile);

module.exports = router;
