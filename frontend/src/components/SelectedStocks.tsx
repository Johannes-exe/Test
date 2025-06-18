import React from 'react'
import { useStore } from '../store/useStore'
import { XMarkIcon } from '@heroicons/react/24/outline'

const SelectedStocks: React.FC = () => {
  const { selectedStocks, removeStock } = useStore()

  if (selectedStocks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Noch keine Aktien ausgewählt. Suchen Sie oben nach Aktien, die Sie verfolgen möchten.
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900">
        Ausgewählte Aktien ({selectedStocks.length})
      </h3>
      <div className="space-y-2">
        {selectedStocks.map((stock) => (
          <div
            key={stock.symbol}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div>
              <span className="font-semibold text-gray-900">{stock.symbol}</span>
              <span className="text-gray-600 ml-2">{stock.name}</span>
            </div>
            <button
              onClick={() => removeStock(stock.symbol)}
              className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SelectedStocks
