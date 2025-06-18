export interface User {
  id: string
  email: string
  authProvider: 'google' | 'email'
  stripeCustomerId?: string
  createdAt: Date
}

export interface Stock {
  symbol: string
  name: string
  exchange?: string
  sector?: string
}

export interface UserStock {
  userId: string
  stockSymbol: string
}

export interface Subscription {
  userId: string
  status: 'trialing' | 'active' | 'canceled'
  trialEndsAt?: Date
  createdAt: Date
}

export interface StockSearchResult {
  symbol: string
  name: string
  exchange: string
  type: string
}
