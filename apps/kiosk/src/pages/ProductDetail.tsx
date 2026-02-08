import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './ProductDetail.css'

const MOCK_PRODUCTS: Record<string, any> = {
  '1': { name: 'Espresso', price: 2.50, description: 'Rich and bold espresso shot' },
  '2': { name: 'Latte', price: 3.50, description: 'Smooth espresso with steamed milk' },
  '3': { name: 'Cappuccino', price: 3.50, description: 'Classic cappuccino with foam' },
  '4': { name: 'Americano', price: 3.00, description: 'Espresso diluted with hot water' },
}

export default function ProductDetail() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  
  const product = MOCK_PRODUCTS[productId || ''] || { name: 'Product', price: 0, description: '' }

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
        <h1 className="detail-name">{product.name}</h1>
        <p className="detail-description">{product.description}</p>
        <p className="detail-price">${product.price.toFixed(2)}</p>
        <button className="btn-add-to-cart">
          {t('add_to_cart')}
        </button>
      </div>
    </div>
  )
}
