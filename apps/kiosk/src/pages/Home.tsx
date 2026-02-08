import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './Home.css'

export default function Home() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="home">
      <div className="home-content">
        <h1 className="home-title">{t('welcome')}</h1>
        <p className="home-subtitle">{t('app_name')}</p>
        <button 
          className="home-button"
          onClick={() => navigate('/categories')}
        >
          {t('categories')}
        </button>
      </div>
    </div>
  )
}
