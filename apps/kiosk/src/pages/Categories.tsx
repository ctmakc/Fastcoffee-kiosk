import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import { MenuContext } from '../App'
import './Categories.css'

export default function Categories() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { menu, refreshMenu, isLoading } = useContext(MenuContext)

  return (
    <div className="categories">
      <div className="categories-header">
        <h1>{t('categories')}</h1>
        <div className="header-right">
          <button 
            className="btn-refresh"
            onClick={refreshMenu}
            disabled={isLoading}
            title="Refresh menu"
          >
            {isLoading ? '⟳' : '↻'}
          </button>
          <button 
            className="btn-back"
            onClick={() => navigate('/')}
          >
            {t('back')}
          </button>
        </div>
      </div>
      <div className="categories-grid">
        {menu?.categories.map(cat => (
          <button
            key={cat.id}
            className="category-card"
            onClick={() => navigate(`/products/${cat.id}`)}
          >
            <span className="category-icon">{cat.icon}</span>
            <span className="category-name">{t('lang') === 'fr' ? cat.name_fr : cat.name_en}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
