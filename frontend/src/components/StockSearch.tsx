import React, { useState, useEffect } from 'react'
import { stockAPI } from '../services/api'
import { Stock } from '../types'
import { useStore } from '../store/useStore'

const StockSearch: React.FC = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Stock[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const { addStock, selectedStocks } = useStore()

  useEffect(() => {
    const searchStocks = async () => {
      if (query.length < 2) {
        setResults([])
        return
      }

      setIsSearching(true)
      try {
        const response = await stockAPI.search(query)
        setResults(response.data.stocks || [])
      } catch (error) {
        console.error('Stock search error:', error)
        setResults([])
      } finally {
        setIsSearching(false)
      }
    }

    const debounce = setTimeout(searchStocks, 300)
    return () => clearTimeout(debounce)
  }, [query])

  const handleAddStock = (stock: Stock) => {
    addStock(stock)
    setQuery('')
    setResults([])
  }

  const isSelected = (symbol: string) =>
    selectedStocks.some(stock => stock.symbol === symbol)

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Aktie suchen (z.B. AAPL, TSLA...)"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        {isSearching && (
          <div className="absolute right-3 top-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {results.map((stock) => (
            <div
              key={stock.symbol}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              onClick={() => !isSelected(stock.symbol) && handleAddStock(stock)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900">{stock.symbol}</div>
                  <div className="text-sm text-gray-600">{stock.name}</div>
                </div>
                {isSelected(stock.symbol) ? (
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                    Ausgewählt
                  </span>
                ) : (
                  <button className="px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700">
                    Hinzufügen
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default StockSearch
