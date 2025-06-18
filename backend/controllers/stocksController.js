const pool = require('../db/connection');
const { searchStockAPI } = require('../services/stockService');
const Joi = require('joi');

const searchStocks = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query || query.length < 2) {
      return res.json({ stocks: [] });
    }

    const stocks = await searchStockAPI(query);
    res.json({ stocks });

  } catch (error) {
    console.error('Stock search error:', error);
    res.status(500).json({ error: 'Stock search failed' });
  }
};

const selectStocksSchema = Joi.object({
  stocks: Joi.array().items(Joi.string().uppercase()).max(50).required()
});

const selectStocks = async (req, res) => {
  try {
    const { error, value } = selectStocksSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { stocks } = value;
    const userEmail = req.user.email;

    // Get user ID
    const userResult = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [userEmail]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userId = userResult.rows[0].id;

    // Clear existing selections
    await pool.query('DELETE FROM user_stocks WHERE user_id = $1', [userId]);

    // Insert new selections
    if (stocks.length > 0) {
      const insertPromises = stocks.map(async (symbol) => {
        // Get stock info for better UX (in real app, you'd fetch from API)
        const stockName = `${symbol} Inc.`; // Placeholder

        return pool.query(
          'INSERT INTO user_stocks (user_id, stock_symbol, stock_name) VALUES ($1, $2, $3)',
          [userId, symbol, stockName]
        );
      });

      await Promise.all(insertPromises);
    }

    res.json({
      message: 'Stocks selected successfully',
      count: stocks.length
    });

  } catch (error) {
    console.error('Select stocks error:', error);
    res.status(500).json({ error: 'Failed to select stocks' });
  }
};

const getSelectedStocks = async (req, res) => {
  try {
    const userEmail = req.user.email;

    const result = await pool.query(`
      SELECT us.stock_symbol, us.stock_name, us.added_at
      FROM user_stocks us
      JOIN users u ON u.id = us.user_id
      WHERE u.email = $1
      ORDER BY us.added_at DESC
    `, [userEmail]);

    const stocks = result.rows.map(row => ({
      symbol: row.stock_symbol,
      name: row.stock_name,
      addedAt: row.added_at
    }));

    res.json({ stocks });

  } catch (error) {
    console.error('Get selected stocks error:', error);
    res.status(500).json({ error: 'Failed to get selected stocks' });
  }
};

module.exports = {
  searchStocks,
  selectStocks,
  getSelectedStocks
};
