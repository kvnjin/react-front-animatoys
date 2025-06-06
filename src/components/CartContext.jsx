import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  const updateQuantity = (id, quantity) => {
  setCartItems(prev =>
    prev.map(item =>
      item.id === id ? { ...item, quantity } : item
    )
  )
}

  const addToCart = (product, quantity) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        return [...prev, { ...product, quantity }]
      }
    })
  }
  const removeFromCart = (id) => {
  setCartItems(prev => prev.filter(item => item.id !== id))
}
  

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{ cartItems, addToCart, totalItems, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
