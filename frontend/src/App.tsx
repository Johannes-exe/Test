import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import StockSelection from './pages/StockSelection'
import Account from './pages/Account'
import Privacy from './pages/Privacy'
import CookieConsent from './components/CookieConsent'
import Layout from './components/Layout'

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/stocks" element={<StockSelection />} />
        <Route path="/account" element={<Account />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
      <CookieConsent />
    </Layout>
  )
}

export default App
