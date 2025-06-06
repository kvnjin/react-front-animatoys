import './App.css'
import Header from "./components/header.jsx";
import Home from "./pages/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Products from './pages/Products.jsx'
import ProductDetails from './pages/ProductDetails.jsx'


function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produits" element={<Products />} />
        <Route path="/produits/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  )
}

export default App
