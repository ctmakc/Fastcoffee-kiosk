import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import { MenuContext } from '../App'
import './ProductDetail.css'

export default function ProductDetail() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const { menu, refreshMenu, isLoading } = useContext(MenuContext)
  
  // Find product in menu
  let product = null
  for (const category of menu?.categories || []) {
    const found = category.products.find((p: any) => p.id === productId)
    if (found) {
      product = found
      break
    }
  }

  if (!product) {
    return (
      <div className="product-detail">
        <div className="detail-header">
          <button 
            className="btn-back"
            onClick={() => navigate(-1)}
          >
            {t('back')}
          </button>
        </div>
        <div className="detail-content">
          <p>Product not found</p>
        </div>
      </div>
    )
  }

  const name = i18n.language === 'fr' ? product.name_fr : product.name_en
  const description = i18n.language === 'fr' ? product.description_fr : product.description_en

  return (
    <div className="product-detail">
      <div className="detail-header">
        <button 
          className="btn-back"
          onClick={() => navigate(-1)}
        >
          {t('back')}
        </button>
        <button 
          className="btn-refresh"
          onClick={refreshMenu}
          disabled={isLoading}
          title="Refresh menu"
        >
          {isLoading ? '⟳' : '↻'}
        </button>
      </div>
      <div className="detail-content">
        <h1 className="detail-name">{name}</h1>
        <p className="detail-description">{description}</p>
        <p className="detail-price">${product.price.toFixed(2)}</p>
        <button className="btn-add-to-cart" disabled={!product.available}>
          {product.available ? t('add_to_cart') : 'Unavailable'}
        </button>
      </div>
    </div>
  )
}
