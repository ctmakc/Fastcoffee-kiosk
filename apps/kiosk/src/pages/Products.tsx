import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import { MenuContext } from '../App'
import './Products.css'

export default function Products() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const { menu, refreshMenu, isLoading } = useContext(MenuContext)
  
  const category = menu?.categories.find(c => c.id === categoryId)
  const products = category?.products || []
  const categoryName = i18n.language === 'fr' ? category?.name_fr : category?.name_en

  return (
    <div className="products">
      <div className="products-header">
        <button 
          className="btn-back"
          onClick={() => navigate('/categories')}
        >
          {t('back')}
        </button>
        <h1 className="category-title">{categoryName}</h1>
        <button 
          className="btn-refresh"
          onClick={refreshMenu}
          disabled={isLoading}
          title="Refresh menu"
        >
          {isLoading ? '⟳' : '↻'}
        </button>
      </div>
      <div className="products-grid">
        {products.map(product => (
          <button
            key={product.id}
            className="product-card"
            onClick={() => navigate(`/product/${product.id}`)}
            disabled={!product.available}
          >
            <h3 className="product-name">{i18n.language === 'fr' ? product.name_fr : product.name_en}</h3>
            <p className="product-price">${product.price.toFixed(2)}</p>
            {!product.available && <span className="unavailable">Unavailable</span>}
          </button>
        ))}
      </div>
    </div>
  )
}
