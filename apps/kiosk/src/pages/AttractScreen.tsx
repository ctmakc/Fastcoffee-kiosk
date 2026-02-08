import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import './AttractScreen.css'

export default function AttractScreen() {
  const navigate = useNavigate()

  useEffect(() => {
    // Auto-loop after 10 seconds
    const timer = setTimeout(() => {
      navigate('/')
    }, 10000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="attract-screen" onClick={() => navigate('/')}>
      <div className="attract-content">
        <h1 className="attract-title">FastCoffee</h1>
        <p className="attract-subtitle">Tap to start ordering</p>
        <div className="attract-animation">
          <div className="float"></div>
          <div className="float"></div>
          <div className="float"></div>
        </div>
      </div>
    </div>
  )
}
