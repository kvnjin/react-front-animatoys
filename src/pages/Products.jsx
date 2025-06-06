import './Products.css'
import { fetchAnimatoysProducts } from '../service/ProductServices.js'
import { useEffect, useState } from 'react'
import anneau from '../assets/anneau.jpg'
import donuts from '../assets/donuts.jpg'
import balle from '../assets/balle.jpeg'
import frisbee from '../assets/frisbee.jpg'
import osNylon from '../assets/os-nylon.png'
import pelucheRenard from '../assets/peluche-renard.jpg'
import { useNavigate } from 'react-router-dom'
import CircularText from '../components/CircularText';
import { useCart } from '../components/CartContext'

function Products() {

  const [sortOpen, setSortOpen] = useState(false)
  const [sortOption, setSortOption] = useState('none')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const cleanUrl = (url) => (url ? url.replace(/\\/g, '/') : '')
  const { addToCart } = useCart()
  
  useEffect(() => {
    fetchAnimatoysProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="loader-wrapper">
      <CircularText
        text="Loved Animals*Happier Home*"
        onHover="speedUp"
        spinDuration={20}
        className="custom-class"
      />
    </div>
  )
  if (error) return <p>Erreur : {error}</p>

  const sortOptions = [
    { value: 'alpha-asc', label: 'Alphabétique, de A à Z' },
    { value: 'alpha-desc', label: 'Alphabétique, de Z à A' },
    { value: 'price-asc', label: 'Prix : faible à élevé' },
    { value: 'price-desc', label: 'Prix : élevé à faible' },
  ]
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case 'alpha-asc':
        return a.product.name.localeCompare(b.product.name)
      case 'alpha-desc':
        return b.product.name.localeCompare(a.product.name)
      case 'price-asc':
        return a.priceWithTax - b.priceWithTax
      case 'price-desc':
        return b.priceWithTax - a.priceWithTax
      default:
        return 0
    }
  })

  return (
    <>
    <section className="products-images-section">
      <div className="products-images">
        <img src={anneau} alt="" />
        <img src={frisbee} alt="" />
        <img src={balle} alt="" />
        <img src={pelucheRenard} alt="" />
        <img src={osNylon} alt="" />
        <img src={donuts} alt="" />
      </div>
    </section>
    <section className="products-page">
      <div className="products-header">
        <div className="custom-sort" onClick={() => setSortOpen(!sortOpen)}>
          Trier par ▼
          {sortOpen && (
            <div className="sort-menu">
              {sortOptions.map((opt) => (
                <label key={opt.value} className="sort-option">
                  <input
                    type="radio"
                    name="sort"
                    value={opt.value}
                    checked={sortOption === opt.value}
                    onChange={() => {
                      setSortOption(opt.value)
                      setSortOpen(false)
                    }}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          )}
        </div>
        <div className="product-count">{products.length} Produits</div>
      </div>

      <div className="product-grid">
        
        {sortedProducts.map((variant) => (
          <div className="product-card" key={variant.id}
            onClick={() => navigate(`/produits/${variant.product.id}`)}
            style={{ cursor: 'pointer' }} 
            >
              <img
                src={cleanUrl(variant.product.featuredAsset?.preview)}
                alt={variant.product.name}
                className={`product-image ${variant.stockLevel === "0" ? 'grayscale' : ''}`}
                
              />
              <div className="product-info">
                <div className="product-title">{variant.product.name}</div>
                <div className="product-price">{(variant.priceWithTax / 100).toFixed(2)} €</div>
                {variant.stockLevel === "0" && (
                  <span className="badge-out">Rupture</span>
                )}
                <button
                  className="add-to-cart-btn"
                  disabled={Number(variant.stockLevel) === 0}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(
                      {
                        id: variant.id,
                        name: variant.product.name,
                        price: variant.priceWithTax,
                        preview: variant.product.featuredAsset?.preview,
                      },
                      1
                    );
                  }}
                >
                  Ajouter au panier
                </button>
              </div>
          </div>
        ))}
      </div>
    </section>
     </>
  )
}

export default Products
