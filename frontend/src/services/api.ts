import axios from 'axios'
import { auth } from './firebase'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
})

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser
  if (user) {
    const token = await user.getIdToken()
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const stockAPI = {
  search: (query: string) => api.get(`/stocks/search?q=${encodeURIComponent(query)}`),
  select: (stocks: string[]) => api.post('/stocks/select', { stocks }),
  getSelected: () => api.get('/stocks/selected')
}

export const subscriptionAPI = {
  createCheckoutSession: () => api.post('/subscription/checkout'),
  getStatus: () => api.get('/subscription/status')
}

export const accountAPI = {
  getProfile: () => api.get('/account/profile'),
  register: (userData: any) => api.post('/auth/register', userData)
}

export default api
