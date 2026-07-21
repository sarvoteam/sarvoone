import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
import marketplaceHero from '../../../../assets/images/marketplace_hero.png';
import './PublicProductsPage.css';

export default function PublicProductsPage() {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [businesses, setBusinesses] = useState([]);
  
  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartCount, setCartCount] = useState(0);

  // Demo purchase modal
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleExploreClick = () => {
    const el = document.getElementById('products-directory-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    api.get('/public')
      .then((res) => {
        if (res.data && res.data.success) {
          setBusinesses(res.data.data || []);
        } else {
          setError('Could not retrieve product catalog.');
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Products directory offline. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const allProducts = (businesses || []).flatMap(b => (b.products || []).map(p => {
    const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    return {
      ...p,
      storeName: b.name,
      storeSlug: slugify(b.name)
    };
  }));

  const uniqueCategories = ['All', ...new Set(allProducts.map(p => p.category).filter(Boolean))];

  const filteredProducts = allProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product) => {
    setCartCount(prev => prev + 1);
    setSelectedProduct(product);
    setShowDemoModal(true);
  };

  const handleNavClick = (sectionId) => {
    navigate('/about', { state: { scrollTo: sectionId } });
  };

  return (
    <div className="public-products-layout">
      {/* Standalone Products Navbar */}
      <header className="products-navbar">
        <div className="products-navbar-container">
          <div className="products-navbar-brand" onClick={() => navigate('/')}>
            <span className="logo-text-p">Sarvo One</span>
          </div>

          <nav className="products-nav-links">
            <span className="products-nav-btn active" onClick={() => navigate('/')}>Products</span>
            <span className="products-nav-btn" onClick={() => handleNavClick('about')}>About</span>
            <span className="products-nav-btn" onClick={() => handleNavClick('features')}>Features</span>
            <span className="products-nav-btn" onClick={() => handleNavClick('pricing')}>Pricing</span>
            <span className="products-nav-btn" onClick={() => handleNavClick('contact')}>Contact</span>
          </nav>

          <div className="products-navbar-actions">
            <Link to="/auth/login" className="products-navbar-link">
              Sign In
            </Link>
            <div className="products-cart-indicator">
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </div>
          </div>
        </div>
      </header>

      {loading ? (
        <div className="products-inline-loading-container">
          <Loader2 className="animate-spin" size={32} />
          <p>Retrieving product directories and live merchant stocks...</p>
        </div>
      ) : error ? (
        <div className="products-error-container-inline">
          <AlertCircle size={48} />
          <h2>Directory Unavailable</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="btn-back-home">
            <ArrowLeft size={16} /> Retry
          </button>
        </div>
      ) : (
        <>
          {/* Marketplace Hero Banner */}
          <div className="marketplace-hero-banner">
            <div className="bg-circle bg-circle-1"></div>
            <div className="bg-circle bg-circle-2"></div>
            
            <div className="hero-banner-container">
              <div className="hero-banner-content">
                <div className="hero-banner-left">
                  <span className="badge-local">
                    <span className="sparkle">✨</span> India's Local Business Marketplace
                  </span>
                  <h1 className="hero-banner-title">
                    Discover <span className="text-handwritten">Local</span> Businesses. <br />
                    Shop with <span className="text-highlight">Confidence.</span>
                  </h1>

                  <div className="hero-feature-chips">
                    <span className="chip"><span className="check">✓</span> Verified Businesses</span>
                    <span className="chip"><span className="check">✓</span> Multiple Categories</span>
                    <span className="chip"><span className="check">✓</span> Direct Store Connection</span>
                    <span className="chip"><span className="check">✓</span> Trusted Marketplace</span>
                  </div>
                  
                  <div className="hero-cta-section">
                    <button className="btn-explore-cta" onClick={handleExploreClick}>
                      Explore Marketplace
                    </button>
                  </div>

                  <div className="hero-stats-row">
                    <div className="stat-card">
                      <span className="stat-sticker sticker-purple"><Store size={13} /></span>
                      <div className="stat-info">
                        <span className="stat-value font-ultra">500+</span>
                        <span className="stat-label font-wide">Businesses</span>
                      </div>
                    </div>
                    <div className="stat-card">
                      <span className="stat-sticker sticker-orange"><Package size={13} /></span>
                      <div className="stat-info">
                        <span className="stat-value font-mono">10,000+</span>
                        <span className="stat-label font-wide">Products</span>
                      </div>
                    </div>
                    <div className="stat-card">
                      <span className="stat-sticker sticker-green"><CheckCircle size={13} /></span>
                      <div className="stat-info">
                        <span className="stat-value font-handwritten">Verified</span>
                        <span className="stat-label font-light">Sellers</span>
                      </div>
                    </div>
                    <div className="stat-card">
                      <span className="stat-sticker sticker-blue"><MapPin size={13} /></span>
                      <div className="stat-info">
                        <span className="stat-value font-bold">India</span>
                        <span className="stat-label font-light">Wide Presence</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hero-banner-right">
                  <img src={marketplaceHero} alt="Marketplace Hero" className="hero-illustration" />
                </div>
              </div>
            </div>
          </div>

          <main className="products-catalog-container">
            <div className="catalog-header">
              <p>Showing {filteredProducts.length} of {allProducts.length} active listings</p>
            </div>

          <div id="products-directory-section" className="catalog-filters-bar">
          <div className="search-wrapper-products">
            <Search className="search-icon-products" size={18} />
            <input 
              type="text" 
              placeholder="Search products by title, brand, store name..."
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
          <div className="products-global-grid">
            {filteredProducts.map(p => {
              const isLowStock = p.currentStock !== undefined && p.currentStock <= 0;
              return (
                <div key={p.id} className="product-global-card">
                  <div 
                    className="product-card-header" 
                    onClick={() => navigate(`/${p.storeSlug}`)} 
                    title={`Visit ${p.storeName}`}
                  >
                    <Store size={12} className="header-store-icon" />
                    <span className="header-store-name">{p.storeName}</span>
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
    </>
  )}

      {/* Footer */}
      <footer className="products-footer">
        <div className="products-footer-content">
          <div>
            <h3>Sarvo One Marketplace</h3>
            <p>Unified Enterprise Directory & Storefronts</p>
          </div>
          <div className="products-footer-rights">
            &copy; {new Date().getFullYear()} Sarvo One. All rights reserved.
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
                <div>Store: <strong>{selectedProduct.storeName}</strong></div>
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
