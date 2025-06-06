import { useCart } from '../components/CartContext'
import Counter from '../components/Counter'
import './Cart.css'
import { FaRegTrashCan } from "react-icons/fa6";

function Cart() {
  
  const { cartItems, updateQuantity, removeFromCart } = useCart()

  const total = cartItems.reduce((sum, item) => sum + item.quantity * item.price / 100, 0)

  let deliveryPrice = 5

  if (total >= 50) {
    deliveryPrice = 0
  }

  return (
    <div className="cart-container">
      <h1>Panier ({cartItems.length} Article{cartItems.length > 1 ? 's' : ''})</h1>

      <div className="cart-content">
        <table className="cart-table">
          <thead>
            <tr>
              <th>Produit</th>
              <th>Prix</th>
              <th>Quantité</th>
              <th>Supprimer</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item.id}>
                <td className="product-cell">
                  <img src={item.preview} alt={item.name} />
                  <div>
                    <strong>{item.name}</strong>
                  </div>
                </td>
                <td>{(item.price / 100).toFixed(2)} €</td>
                <td className="counter-btn">
                    <Counter
                        count={item.quantity}
                        setCount={(newCount) => updateQuantity(item.id, newCount)}
                        stockLevel={item.stockLevel}
                    /></td>
                <td><button
                onClick={() => removeFromCart(item.id)}
                ><FaRegTrashCan /></button></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="cart-summary">
          <h2>Total</h2>
          <p><strong>Sous-total :</strong> {total.toFixed(2)} €</p>
          <p><strong>Livraison :</strong> { deliveryPrice } €</p>
          <p><strong>Total TTC :</strong> {(total + deliveryPrice).toFixed(2)} €</p>
          <button className="checkout-btn">Commander</button>
        </div>
      </div>
    </div>
  )
}

export default Cart
