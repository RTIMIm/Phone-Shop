import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import { CartProvider } from './components/CartContext';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateProduct from './components/CreateProduct';
import ManageProducts from './components/ManageProducts';
import ProductDescription from './components/ProductDescription';
import './styles/App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [refresh, setRefresh] = useState(false);

  useEffect(()=>{
    fetchProducts()
  }, [refresh])

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products/getAll');
      setProducts(response.data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const triggerRefresh = ()=> {
    setRefresh(prev =>!prev)
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Router>
      <CartProvider>
        <nav className="navbar">
          <div className="navbar-content">
            <Link to="/" className="logo">
              PhoneStore
            </Link>
            
            <div className="search-bar">
              <span className="search-icon">
                <SearchIcon />
              </span>
              <input
                type="text"
                className="search-input"
                placeholder="Search phones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="nav-buttons">
              <Link to="/create">
                <button className="nav-button primary-button">
                  Add New Phone
                </button>
              </Link>
              <Link to="/manage">
                <button className="nav-button secondary-button">
                  Manage Products
                </button>
              </Link>
              <button className="cart-button" onClick={() => setCartOpen(true)}>
                <ShoppingCartIcon style={{ color: '#757575' }} />
              </button>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <ScrollableContent>
              <div className="products-container">
                <h1 className="section-title">Latest Phones</h1>
                <div className="products-grid">
                  {filteredProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product}
                      triggerRefresh={triggerRefresh}
                    />
                  ))}
                </div>
              </div>
            </ScrollableContent>
          } />
          <Route path="/create" element={<CreateProduct triggerRefresh={triggerRefresh} />} />
          <Route path="/manage" element={<ManageProducts triggerRefresh={triggerRefresh} />} />
          <Route path="/product/:id" element={<ProductDescription />} />
        </Routes>

        <Cart open={cartOpen} onClose={() => setCartOpen(false)} />
      </CartProvider>
    </Router>
  )
}

export default App;