import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { stockAPI, subscriptionAPI } from '../services/api'
import StockSearch from '../components/StockSearch'
import SelectedStocks from '../components/SelectedStocks'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const StockSelection: React.FC = () => {
  const { selectedStocks, setSelectedStocks, setLoading, isLoading } = useStore()
  const navigate = useNavigate()

  useEffect(() => {
    loadSelectedStocks()
  }, [])

  const loadSelectedStocks = async () => {
    try {
      const response = await stockAPI.getSelected()
      setSelectedStocks(response.data.stocks || [])
    } catch (error) {
      console.error('Failed to load selected stocks:', error)
    }
  }

  const saveStocks = async () => {
    try {
      setLoading(true)
      const stockSymbols = selectedStocks.map(stock => stock.symbol)
      await stockAPI.select(stockSymbols)
      alert('Aktien erfolgreich gespeichert!')
    } catch (error) {
      console.error('Failed to save stocks:', error)
      alert('Fehler beim Speichern der Aktien.')
    } finally {
      setLoading(false)
    }
  }

  const proceedToSubscription = async () => {
    if (selectedStocks.length === 0) {
      alert('Bitte wählen Sie mindestens eine Aktie aus.')
      return
    }

    try {
      setLoading(true)

      const stockSymbols = selectedStocks.map(stock => stock.symbol)
      await stockAPI.select(stockSymbols)

      const response = await subscriptionAPI.createCheckoutSession()
      const stripe = await stripePromise

      if (stripe && response.data.sessionId) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: response.data.sessionId
        })

        if (error) {
          console.error('Stripe error:', error)
          alert('Fehler bei der Weiterleitung zur Zahlung.')
        }
      }
    } catch (error) {
      console.error('Subscription error:', error)
      alert('Fehler beim Erstellen der Checkout-Session.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Wählen Sie Ihre Aktien
            </h1>
            <p className="text-gray-600">
              Suchen und wählen Sie die Aktien aus, über die Sie in Ihrem Newsletter informiert werden möchten.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Aktien suchen
              </h2>
              <StockSearch />
            </div>

            <div>
              <SelectedStocks />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                onClick={saveStocks}
                disabled={isLoading || selectedStocks.length === 0}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Auswahl speichern
              </button>

              <button
                onClick={proceedToSubscription}
                disabled={isLoading || selectedStocks.length === 0}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none"
              >
                {isLoading ? 'Wird geladen...' : 'Newsletter aktivieren (19,99€/Monat)'}
              </button>
            </div>

            <div className="text-sm text-gray-500 text-center">
              14 Tage kostenlos testen • Jederzeit kündbar • Sichere Bezahlung über Stripe
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StockSelection
