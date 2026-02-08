import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './Categories.css'

const CATEGORIES = [
  { id: 'coffee', label: 'coffee' },
  { id: 'pastries', label: 'pastries' },
  { id: 'drinks', label: 'drinks' },
  { id: 'snacks', label: 'snacks' },
]

export default function Categories() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="categories">
      <div className="categories-header">
        <h1>{t('categories')}</h1>
        <button 
          className="btn-back"
          onClick={() => navigate('/')}
        >
          {t('back')}
        </button>
      </div>
      <div className="categories-grid">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className="category-card"
            onClick={() => navigate(`/products/${cat.id}`)}
          >
            <span className="category-name">{t(cat.label)}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
