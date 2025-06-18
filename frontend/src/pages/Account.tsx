import React, { useEffect } from 'react'
import { accountAPI, subscriptionAPI } from '../services/api'
import { useStore } from '../store/useStore'

const Account: React.FC = () => {
  const { user, setUser, subscription, setSubscription } = useStore()

  useEffect(() => {
    fetchProfile()
    fetchSubscription()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await accountAPI.getProfile()
      setUser(response.data.user)
    } catch (error) {
      console.error('Failed to load profile:', error)
    }
  }

  const fetchSubscription = async () => {
    try {
      const response = await subscriptionAPI.getStatus()
      setSubscription(response.data.subscription)
    } catch (error) {
      console.error('Failed to load subscription:', error)
    }
  }

  if (!user) return <div className="p-4">Lade...</div>

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Ihr Konto</h1>
      <div className="bg-white shadow rounded p-4">
        <p><strong>E-Mail:</strong> {user.email}</p>
        <p><strong>Anbieter:</strong> {user.authProvider}</p>
      </div>

      {subscription ? (
        <div className="bg-white shadow rounded p-4">
          <p><strong>Status:</strong> {subscription.status}</p>
          {subscription.trialEndsAt && (
            <p><strong>Trial endet:</strong> {new Date(subscription.trialEndsAt).toLocaleDateString()}</p>
          )}
          <p><strong>Nächste Zahlung:</strong> {new Date(subscription.current_period_end).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>Kein aktives Abonnement</p>
      )}
    </div>
  )
}

export default Account
