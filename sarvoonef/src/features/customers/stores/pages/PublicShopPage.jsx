import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Search, 
  ShoppingBag, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowLeft, 
  AlertCircle, 
  Loader2,
  Package,
  CheckCircle,
  XCircle,
  Tag,
  Store
} from 'lucide-react';
import api from '../../../../shared/api/axios';
import './PublicShopPage.css';

export default function PublicShopPage() {
  const { businessSlug } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shopInfo, setShopInfo] = useState(null);
  const [products, setProducts] = useState([]);
  
  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartCount, setCartCount] = useState(0);

  // Demo purchase modal
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    api.get(`/public/${businessSlug}`)
      .then((res) => {
        if (res.data && res.data.success) {
          setShopInfo(res.data.data.business);
          setProducts(res.data.data.products || []);
        } else {
          setError('Could not retrieve store information.');
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err.response?.data?.message || 'Store not found or offline.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [businessSlug]);

  const uniqueCategories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product) => {
    setCartCount(prev => prev + 1);
    setSelectedProduct(product);
    setShowDemoModal(true);
  };

  if (loading) {
    return (
      <div className="shop-loading-container">
        <Loader2 className="animate-spin" size={48} />
        <h2>Entering storefront...</h2>
        <p>Retrieving product catalog and store configurations.</p>
      </div>
    );
  }

  if (error || !shopInfo) {
    return (
      <div className="shop-error-container">
        <AlertCircle size={64} />
        <h2>Store Unavailable</h2>
        <p>{error || 'The requested storefront could not be located in our systems.'}</p>
        <button onClick={() => navigate('/')} className="btn-back-home">
          <ArrowLeft size={16} /> Back to Portal
        </button>
      </div>
    );
  }

  return (
    <div className="public-shop-layout">
      {/* Store Navbar */}
      <header className="shop-navbar">
        <div className="shop-navbar-container">
          <div className="shop-navbar-brand" onClick={() => navigate('/')}>
            <div className="logo-icon-s">S</div>
            <span className="logo-text-s">Sarvo One</span>
          </div>

          <div className="store-display-name">
            <span className="dot-active"></span>
            {shopInfo.name}
          </div>

          <div className="shop-navbar-actions">
            <Link to="/auth/login" className="shop-navbar-link">
              Partner Portal
            </Link>
            <div className="shop-cart-indicator">
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </div>
          </div>
        </div>
      </header>

      {/* Store Banner Hero */}
      <section className="shop-hero">
        <div className="shop-hero-container">
          <div className="shop-hero-details">
            <span className="shop-badge">{shopInfo.category || 'Retailer'}</span>
            <h1 className="shop-title">{shopInfo.name}</h1>
            <p className="shop-tagline">
              Official online store. Browse our certified product catalog, verify live stock rates, and place orders directly.
            </p>
            
            <div className="shop-meta-list">
              {shopInfo.address && (
                <div className="shop-meta-item">
                  <MapPin size={16} />
                  <span>{shopInfo.address}</span>
                </div>
              )}
              {shopInfo.phone && (
                <div className="shop-meta-item">
                  <Phone size={16} />
                  <span>{shopInfo.phone}</span>
                </div>
              )}
              {shopInfo.email && (
                <div className="shop-meta-item">
                  <Mail size={16} />
                  <span>{shopInfo.email}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog Controls & Search */}
      <main className="shop-catalog-container">
        <div className="catalog-header">
          <h2>Catalog Storefront</h2>
          <p>Showing {filteredProducts.length} of {products.length} catalog items</p>
        </div>

        <div className="catalog-filters-bar">
          <div className="search-wrapper-shop">
            <Search className="search-icon-shop" size={18} />
            <input 
              type="text" 
              placeholder="Search products by title, brand, SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="category-tabs">
            {uniqueCategories.map(cat => (
              <button 
                key={cat} 
                className={`category-tab-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Catalog Grid */}
        {filteredProducts.length === 0 ? (
          <div className="no-products-state">
            <Package size={48} />
            <h3>No products found</h3>
            <p>We couldn't find any items matching your current filters or search term.</p>
          </div>
        ) : (
          <div className="products-shop-grid">
            {filteredProducts.map(p => {
              const isLowStock = p.currentStock !== undefined && p.currentStock <= 0;
              return (
                <div key={p.id} className="product-shop-card">
                  <div className="product-card-header">
                    <Store size={12} className="header-store-icon" />
                    <span className="header-store-name">{shopInfo.name}</span>
                  </div>

                  <div className="card-image-box">
                    <div className="placeholder-image">
                      {p.name.charAt(0).toUpperCase()}
                    </div>
                  </div>

                  <div className="product-card-body">
                    <h3 className="product-name" title={p.name}>{p.name}</h3>
                    
                    <div className="product-price-section">
                      <span className="selling-price">₹{p.sellingPrice}</span>
                      {!!p.mrp && p.mrp > p.sellingPrice && (
                        <span className="mrp-price">₹{p.mrp}</span>
                      )}
                    </div>

                    <button 
                      onClick={() => handleAddToCart(p)}
                      className={`add-to-cart-btn ${isLowStock ? 'disabled' : ''}`}
                      disabled={isLowStock}
                    >
                      {isLowStock ? 'Out of Stock' : 'Buy Now'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="shop-footer">
        <div className="shop-footer-content">
          <div>
            <h3>{shopInfo.name}</h3>
            <p>Powered by Sarvo One Systems</p>
          </div>
          <div className="shop-footer-rights">
            &copy; {new Date().getFullYear()} {shopInfo.name}. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Demo Modal */}
      {showDemoModal && selectedProduct && (
        <div className="demo-modal-overlay" onClick={() => setShowDemoModal(false)}>
          <div className="demo-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="demo-modal-header">
              <h3>Order Notification</h3>
              <button className="close-demo-btn" onClick={() => setShowDemoModal(false)}>&times;</button>
            </div>
            <div className="demo-modal-body">
              <div className="success-circle">
                <CheckCircle size={40} style={{ color: '#10b981' }} />
              </div>
              <h4>Selected: {selectedProduct.name}</h4>
              <p>You have selected this product for checkout.</p>
              <div className="order-summary-box">
                <div>Price: <strong>₹{selectedProduct.sellingPrice}</strong></div>
                <div>SKU: <strong>{selectedProduct.sku}</strong></div>
                <div>Store: <strong>{shopInfo.name}</strong></div>
              </div>
              <p className="demo-note">Note: Online order placement and merchant gateway checkout is currently being integrated by our development team.</p>
            </div>
            <div className="demo-modal-footer">
              <button className="btn-demo-action" onClick={() => setShowDemoModal(false)}>Close Window</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
