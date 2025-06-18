const express = require('express');
const { createCheckoutSession, handleWebhook, getSubscriptionStatus } = require('../controllers/subscriptionController');
const { authenticateUser } = require('../middleware/auth');

const router = express.Router();

router.post('/checkout', authenticateUser, createCheckoutSession);
router.post('/webhook', express.raw({type: 'application/json'}), handleWebhook);
router.get('/status', authenticateUser, getSubscriptionStatus);

module.exports = router;
