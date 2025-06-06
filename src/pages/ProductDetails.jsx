import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchProductById } from '../service/ProductServices'
import Counter from '../components/Counter'
import './ProductDetails.css'
import { useCart } from '../components/CartContext'


function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [count, setCount] = useState(1)

  const cleanUrl = (url) => (url ? url.replace(/\\/g, '/') : '')
  const cleanP = (p) => (p ? p.replace(/<[^>]*>/g, '') : '')

  const { addToCart } = useCart()

  useEffect(() => {
    fetchProductById(id)
      .then(setProduct)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p>Chargement...</p>
  if (error) return <p>Erreur : {error}</p>
  if (!product || !product.variants || product.variants.length === 0) return <p>Produit introuvable</p>

  const variant = product.variants[0]

  const cartPrice = ((variant.priceWithTax / 100) * count).toFixed(2)

  return (
    <div className="product-details-container">
      <div className="product-image">
        <img
          src={cleanUrl(product.featuredAsset?.preview)}
          alt={product.name}
          style={{ maxWidth: '300px', borderRadius: '12px' }}
        />
      </div>
      <div className="product-info">
        <h1>{product.name}</h1>
        <p><strong>Prix :</strong> {(variant.priceWithTax / 100).toFixed(2)} €</p>
        <div className="description">{cleanP(product.description)}</div>
        <div className="delivery-info">Livraison gratuite dès 50€ | Paiement sécurisé</div>
        <p><strong>Stock :</strong> {Number(variant.stockLevel) === 0 ? <span className="badge-out">Rupture</span> : variant.stockLevel}</p>
        <Counter 
          count={count}
          setCount={setCount}
          stockLevel={Number(variant.stockLevel)}
        />
        <button
          className="add-to-cart-btn"
          disabled={Number(variant.stockLevel) === 0}
          onClick={() =>
            addToCart(
              {
                id: variant.id,
                name: product.name,
                price: variant.priceWithTax,
                preview: product.featuredAsset?.preview,
              },
              count
            )
          }
        >
          Ajouter au panier - {cartPrice} €
        </button>
      </div>
    </div>
  )
}

export default ProductDetails
