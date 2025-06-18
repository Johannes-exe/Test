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
  status: 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid'
  trial_ends_at?: string
  current_period_end?: string
}

export interface StockSearchResult {
  symbol: string
  name: string
  exchange: string
  type: string
}
