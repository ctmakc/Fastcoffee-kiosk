import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Home from './pages/Home'
import Categories from './pages/Categories'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import AttractScreen from './pages/AttractScreen'
import { getLocationId } from './lib/config'
import './App.css'

function App() {
  const { i18n } = useTranslation()
  const [showAttract, setShowAttract] = useState(false)
  const [inactivityTimer, setInactivityTimer] = useState<NodeJS.Timeout | null>(null)
  const INACTIVITY_TIMEOUT = 30000 // 30 seconds for demo, use 5 min in prod

  useEffect(() => {
    // Initialize location and language
    const locationId = getLocationId()
    console.log('Location ID:', locationId)
    
    // Set language from config or default to EN
    const lang = new URLSearchParams(window.location.search).get('lang') || 'en'
    i18n.changeLanguage(lang)
  }, [i18n])

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
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products/:categoryId" element={<Products />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
