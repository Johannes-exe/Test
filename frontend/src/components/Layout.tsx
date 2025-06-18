import React from 'react'
import { Link } from 'react-router-dom'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-primary-600">AI Newsletter</Link>
          <nav className="space-x-4">
            <Link to="/stocks" className="text-gray-600 hover:text-gray-900">Stocks</Link>
            <Link to="/account" className="text-gray-600 hover:text-gray-900">Account</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-gray-100 py-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} AI Financial Newsletter
      </footer>
    </div>
  )
}

export default Layout
