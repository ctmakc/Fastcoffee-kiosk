import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './Products.css'

const MOCK_PRODUCTS = {
  coffee: [
    { id: '1', name: 'Espresso', price: 2.50 },
    { id: '2', name: 'Latte', price: 3.50 },
    { id: '3', name: 'Cappuccino', price: 3.50 },
    { id: '4', name: 'Americano', price: 3.00 },
  ],
  pastries: [
    { id: '5', name: 'Croissant', price: 3.00 },
    { id: '6', name: 'Muffin', price: 2.50 },
    { id: '7', name: 'Donut', price: 2.00 },
  ],
  drinks: [
    { id: '8', name: 'Orange Juice', price: 3.00 },
    { id: '9', name: 'Water', price: 1.50 },
  ],
  snacks: [
    { id: '10', name: 'Sandwich', price: 5.00 },
    { id: '11', name: 'Salad', price: 6.00 },
  ],
}

export default function Products() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  
  const products = MOCK_PRODUCTS[categoryId as keyof typeof MOCK_PRODUCTS] || []

  return (
    <div className="products">
      <div className="products-header">
        <button 
          className="btn-back"
          onClick={() => navigate('/categories')}
        >
          {t('back')}
        </button>
        <h1 className="category-title">{t(categoryId || 'products')}</h1>
      </div>
      <div className="products-grid">
        {products.map(product => (
          <button
            key={product.id}
            className="product-card"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${product.price.toFixed(2)}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
