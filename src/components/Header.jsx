import logo from '../assets/logo-small.png'
import { FiShoppingCart } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-left">
          <img src={logo} alt="AnimaToys Logo" className="logo" />
        </div>

        <div className="nav-right">
          <Link to="/" className="nav-link">Accueil</Link>
          <Link to="/produits" className="nav-link">Produit</Link>
          <FiShoppingCart className="cart-icon" />
        </div>
      </nav>
    </header>
  )
}

export default Header
