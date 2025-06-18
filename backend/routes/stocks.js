const express = require('express');
const { searchStocks, selectStocks, getSelectedStocks } = require('../controllers/stocksController');
const { authenticateUser } = require('../middleware/auth');

const router = express.Router();

router.get('/search', authenticateUser, searchStocks);
router.post('/select', authenticateUser, selectStocks);
router.get('/selected', authenticateUser, getSelectedStocks);

module.exports = router;
