import { useState, useEffect, createContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Home from './pages/Home'
import Categories from './pages/Categories'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import AttractScreen from './pages/AttractScreen'
import { getLocationId } from './lib/config'
import { setCache, getCache, CACHE_KEYS } from './lib/cache'
import './App.css'

export interface MenuItem {
  id: string
  name_en: string
  name_fr: string
  description_en: string
  description_fr: string
  price: number
  available: boolean
}

export interface MenuCategory {
  id: string
  name_en: string
  name_fr: string
  icon: string
  products: MenuItem[]
}

export interface MenuData {
  location_id: string
  location_name: string
  categories: MenuCategory[]
}

export const MenuContext = createContext<{
  menu: MenuData | null
  refreshMenu: () => Promise<void>
  isLoading: boolean
}>({
  menu: null,
  refreshMenu: async () => {},
  isLoading: false,
})

function AppContent() {
  const { i18n } = useTranslation()
  const [showAttract, setShowAttract] = useState(false)
  const [inactivityTimer, setInactivityTimer] = useState<NodeJS.Timeout | null>(null)
  const [menu, setMenu] = useState<MenuData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const INACTIVITY_TIMEOUT = 30000 // 30 seconds for demo, use 5 min in prod
  const REFRESH_INTERVAL = 300000 // 5 minutes

  const loadMenu = async () => {
    setIsLoading(true)
    try {
      const locationId = getLocationId()
      // Try to fetch from API if available, otherwise use local menu.json
      const response = await fetch(`/menu.json?location=${locationId}&t=${Date.now()}`)
      if (!response.ok) throw new Error('Failed to load menu')
      const data = await response.json()
      setMenu(data)
      setCache(CACHE_KEYS.MENU, data, REFRESH_INTERVAL)
    } catch (err) {
      console.error('Menu load error:', err)
      // Try cached menu
      const cached = getCache<MenuData>(CACHE_KEYS.MENU)
      if (cached) {
        setMenu(cached)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Initialize location and language
    const locationId = getLocationId()
    console.log('Location ID:', locationId)
    
    // Set language from config or default to EN
    const lang = new URLSearchParams(window.location.search).get('lang') || 'en'
    i18n.changeLanguage(lang)

    // Load menu on startup
    loadMenu()
  }, [i18n])

  // Auto-refresh menu every 5 minutes
  useEffect(() => {
    const timer = setTimeout(() => {
      loadMenu()
    }, REFRESH_INTERVAL)

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [])

  const resetInactivityTimer = () => {
    setShowAttract(false)
    
    if (inactivityTimer) {
      clearTimeout(inactivityTimer)
    }
    
    const newTimer = setTimeout(() => {
      setShowAttract(true)
    }, INACTIVITY_TIMEOUT)
    
    setInactivityTimer(newTimer)
  }

  useEffect(() => {
    const events = ['mousedown', 'touchstart', 'click', 'keypress']
    events.forEach(event => {
      window.addEventListener(event, resetInactivityTimer)
    })

    // Initialize timer
    resetInactivityTimer()

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetInactivityTimer)
      })
      if (inactivityTimer) {
        clearTimeout(inactivityTimer)
      }
    }
  }, [inactivityTimer])

  if (showAttract) {
    return <AttractScreen />
  }

  return (
    <MenuContext.Provider value={{ menu, refreshMenu: loadMenu, isLoading }}>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products/:categoryId" element={<Products />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
        </Routes>
      </div>
    </MenuContext.Provider>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
