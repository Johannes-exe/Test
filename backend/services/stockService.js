const axios = require('axios');

// Mock stock search - replace with real API like Alpha Vantage, IEX Cloud, etc.
const searchStockAPI = async (query) => {
  // Mock data for demonstration
  const mockStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ', type: 'Common Stock' },
    { symbol: 'MSFT', name: 'Microsoft Corporation', exchange: 'NASDAQ', type: 'Common Stock' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', exchange: 'NASDAQ', type: 'Common Stock' },
    { symbol: 'TSLA', name: 'Tesla, Inc.', exchange: 'NASDAQ', type: 'Common Stock' },
    { symbol: 'AMZN', name: 'Amazon.com, Inc.', exchange: 'NASDAQ', type: 'Common Stock' },
    { symbol: 'META', name: 'Meta Platforms, Inc.', exchange: 'NASDAQ', type: 'Common Stock' },
    { symbol: 'NVDA', name: 'NVIDIA Corporation', exchange: 'NASDAQ', type: 'Common Stock' },
    { symbol: 'AMD', name: 'Advanced Micro Devices, Inc.', exchange: 'NASDAQ', type: 'Common Stock' },
    { symbol: 'NFLX', name: 'Netflix, Inc.', exchange: 'NASDAQ', type: 'Common Stock' },
    { symbol: 'CRM', name: 'Salesforce, Inc.', exchange: 'NYSE', type: 'Common Stock' }
  ];

  const filtered = mockStocks.filter(stock =>
    stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
    stock.name.toLowerCase().includes(query.toLowerCase())
  );

  return filtered.slice(0, 10);
};

module.exports = {
  searchStockAPI
};
