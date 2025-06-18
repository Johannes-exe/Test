import React from 'react'
import { Link } from 'react-router-dom'
import { ChartBarIcon, BellIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            AI-gestützte
            <span className="text-primary-600 block">Finanz-Newsletter</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Erhalten Sie täglich personalisierte Analysen und Insights zu Ihren Lieblings-Aktien.
            Powered by KI, zugeschnitten auf Ihre Interessen.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Jetzt 14 Tage kostenlos testen
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Mehr erfahren
            </Link>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            14 Tage kostenlos • Danach 19,99€/Monat • Jederzeit kündbar
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <ChartBarIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">KI-Analysen</h3>
            <p className="text-gray-600">
              Modernste KI analysiert Marktdaten und erstellt personalisierte Insights für Ihre Aktien.
            </p>
          </div>
          <div className="text-center">
            <BellIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Tägliche Updates</h3>
            <p className="text-gray-600">
              Erhalten Sie jeden Morgen die wichtigsten Nachrichten und Analysen zu Ihren Investments.
            </p>
          </div>
          <div className="text-center">
            <ShieldCheckIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">DSGVO-konform</h3>
            <p className="text-gray-600">
              Ihre Daten sind bei uns sicher. Vollständig DSGVO-konform und datenschutzfreundlich.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Starten Sie noch heute Ihre Finanz-Reise
          </h2>
          <p className="text-xl mb-8">
            Schließen Sie sich tausenden von Investoren an, die bereits auf unsere KI-Analysen vertrauen.
          </p>
          <Link
            to="/login"
            className="inline-block px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Kostenlos registrieren
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Landing
