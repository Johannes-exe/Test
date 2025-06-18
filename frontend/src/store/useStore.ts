import { create } from 'zustand'
import { User, Stock, Subscription } from '../types'

interface AppState {
  user: User | null
  selectedStocks: Stock[]
  subscription: Subscription | null
  isLoading: boolean
  setUser: (user: User | null) => void
  setSelectedStocks: (stocks: Stock[]) => void
  setSubscription: (subscription: Subscription | null) => void
  setLoading: (loading: boolean) => void
  addStock: (stock: Stock) => void
  removeStock: (symbol: string) => void
}

export const useStore = create<AppState>((set) => ({
  user: null,
  selectedStocks: [],
  subscription: null,
  isLoading: false,
  setUser: (user) => set({ user }),
  setSelectedStocks: (stocks) => set({ selectedStocks: stocks }),
  setSubscription: (subscription) => set({ subscription }),
  setLoading: (loading) => set({ isLoading: loading }),
  addStock: (stock) => set((state) => ({
    selectedStocks: [...state.selectedStocks.filter(s => s.symbol !== stock.symbol), stock]
  })),
  removeStock: (symbol) => set((state) => ({
    selectedStocks: state.selectedStocks.filter(s => s.symbol !== symbol)
  }))
}))
