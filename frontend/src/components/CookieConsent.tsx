import React, { useState, useEffect } from 'react'

const CookieConsent: React.FC = () => {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowConsent(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setShowConsent(false)
  }

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="mb-4 sm:mb-0 sm:mr-4">
          <p className="text-sm">
            Wir verwenden Cookies und ähnliche Technologien, um Ihnen die bestmögliche Erfahrung zu bieten.
            <a href="/privacy" className="underline ml-1">Mehr erfahren</a>
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={declineCookies}
            className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-900"
          >
            Ablehnen
          </button>
          <button
            onClick={acceptCookies}
            className="px-4 py-2 text-sm bg-primary-600 rounded-md hover:bg-primary-700"
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
