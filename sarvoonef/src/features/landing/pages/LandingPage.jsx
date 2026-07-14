import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  TrendingUp, 
  Calculator, 
  MapPin, 
  Check, 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin as MapPinIcon, 
  Database, 
  Zap, 
  Layers, 
  Users 
} from 'lucide-react';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('sarvo_token');
    const userStr = sessionStorage.getItem('sarvo_user');
    if (token && userStr) {
      setIsAuthenticated(true);
      try {
        const user = JSON.parse(userStr);
        setUserRole(user.role || '');
      } catch (e) {}
    }
  }, []);

  const handleDashboardRedirect = () => {
    if (userRole === 'SUPER_ADMIN' || userRole === 'Super Admin') {
      navigate('/superadmin/analytics');
    } else {
      navigate('/dashboard');
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) {
      alert('Please fill out all fields.');
      return;
    }
    alert(`Thank you, ${contactName}! Your message has been received. Our team will contact you shortly.`);
    setContactName('');
    setContactEmail('');
    setContactMsg('');
  };

  return (
    <div className="landing-page">
      {/* Navigation Bar */}
      <header className="landing-navbar">
        <div className="navbar-container">
          <div className="landing-logo" onClick={() => navigate('/')}>
            <div className="logo-icon">S</div>
            <span className="brand-text">Sarvo One</span>
          </div>

          <nav className="nav-links">
            <a href="#about">About</a>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="nav-actions">
            {isAuthenticated ? (
              <button onClick={handleDashboardRedirect} className="btn-solid-premium">
                Go to Dashboard <ArrowRight size={15} />
              </button>
            ) : (
              <>
                <button onClick={() => navigate('/auth/login')} className="btn-outline-premium">
                  Sign In
                </button>
                <button onClick={() => navigate('/auth/register')} className="btn-solid-premium">
                  Start Free Trial
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section" id="about">
        <div className="hero-container">
          <div className="hero-content">
            <div className="promo-badge">
              <Zap size={12} /> Live Multi-Branch Syncing
            </div>
            <h1 className="hero-title">
              Unified Operating System for <span className="text-gradient">Retail & Medical</span> Enterprises
            </h1>
            <p className="hero-subtitle">
              Integrate POS billing, track warehouse levels, synchronize multiple branches, and manage financial ledgers inside one highly secure and responsive workspace.
            </p>
            <div className="hero-ctas">
              {isAuthenticated ? (
                <button onClick={handleDashboardRedirect} className="btn-solid-large">
                  Enter Dashboard <ArrowRight size={18} />
                </button>
              ) : (
                <>
                  <button onClick={() => navigate('/auth/register')} className="btn-solid-large">
                    Get Started Free <ArrowRight size={18} />
                  </button>
                  <a href="#features" className="btn-outline-large">
                    Explore Features
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Styled Dashboard Mockup */}
          <div className="hero-mockup-wrapper">
            <div className="mockup-frame">
              <div className="mockup-header">
                <div className="mockup-dots">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                </div>
                <div className="mockup-address">dashboard.sarvo.com/analytics</div>
              </div>
              <div className="mockup-body">
                {/* Simulated Sidebar */}
                <div className="mockup-sidebar">
                  <div className="sidebar-line-title"></div>
                  <div className="sidebar-line active"></div>
                  <div className="sidebar-line"></div>
                  <div className="sidebar-line"></div>
                  <div className="sidebar-line"></div>
                </div>
                {/* Simulated Main Panel */}
                <div className="mockup-main">
                  <div className="mockup-row flex-between">
                    <div className="mockup-h1">Sales Analytics Summary</div>
                    <div className="mockup-period">2026 Period</div>
                  </div>
                  <div className="mockup-grid">
                    <div className="widget-card purple">
                      <div className="widget-label">Monthly Gross Profit</div>
                      <div className="widget-val">₹4,82,900</div>
                      <div className="widget-trend">+14% vs last month</div>
                    </div>
                    <div className="widget-card emerald">
                      <div className="widget-label">Total Completed Billing</div>
                      <div className="widget-val">1,248 items</div>
                      <div className="widget-trend">+8.2% vs last week</div>
                    </div>
                    <div className="widget-card rose">
                      <div className="widget-label">Low Stock items Alert</div>
                      <div className="widget-val">3 items</div>
                      <div className="widget-trend">Reorder suggested</div>
                    </div>
                  </div>
                  {/* Simulated Chart */}
                  <div className="mockup-chart-card">
                    <div className="chart-title">Revenue Forecast</div>
                    <div className="chart-bar-container">
                      <div className="chart-bar" style={{ height: '35%' }}></div>
                      <div className="chart-bar" style={{ height: '55%' }}></div>
                      <div className="chart-bar" style={{ height: '80%' }}></div>
                      <div className="chart-bar" style={{ height: '65%' }}></div>
                      <div className="chart-bar active" style={{ height: '95%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">All the features your team needs</h2>
            <p className="section-subtitle">
              Engineered with advanced security and modular architectures to support stores, pharmacies, warehouses, and corporate networks.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper purple">
                <Package size={24} />
              </div>
              <h3 className="feature-card-title">Real-Time Inventory</h3>
              <p className="feature-card-desc">
                Track products, set low-stock alarms, log batch codes, and monitor expiry dates across custom warehouse units.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper emerald">
                <TrendingUp size={24} />
              </div>
              <h3 className="feature-card-title">Modern Billing Terminal</h3>
              <p className="feature-card-desc">
                Rapid Point-of-Sale invoice billing. Integrated with GST/taxation, discounts, and payment methods.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper blue">
                <Calculator size={24} />
              </div>
              <h3 className="feature-card-title">Accounting & Ledger</h3>
              <p className="feature-card-desc">
                Automatic ledger logging. Generate journal entries, balance logs, and monthly reports instantly.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper rose">
                <MapPin size={24} />
              </div>
              <h3 className="feature-card-title">Multi-Branch Syncing</h3>
              <p className="feature-card-desc">
                Manage multiple branch outlets, transfer stocks between warehouses, and sync accounts automatically.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper violet">
                <Users size={24} />
              </div>
              <h3 className="feature-card-title">Super Admin Portal</h3>
              <p className="feature-card-desc">
                Manage business onboarding, customize pricing subscriptions, and track audit logs of all sessions.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper cyan">
                <Database size={24} />
              </div>
              <h3 className="feature-card-title">Prisma & SQL Core</h3>
              <p className="feature-card-desc">
                Runs on robust PostgreSQL database structures with Prisma ORM mappings for ultimate speed and reliability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section" id="pricing">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Honest, flexible pricing</h2>
            <p className="section-subtitle">
              Start with our free trial period. Upgrade or cancel anytime based on your logistics volume.
            </p>
          </div>

          <div className="pricing-grid">
            {/* Starter Plan */}
            <div className="pricing-card">
              <div className="plan-name">Starter Plan</div>
              <div className="plan-desc">For single shops and small clinics.</div>
              <div className="plan-price">
                <span className="currency">₹</span>999<span className="period">/mo</span>
              </div>
              <button onClick={() => navigate('/auth/register')} className="plan-btn btn-outline">
                Get Started
              </button>
              <ul className="plan-features">
                <li><Check size={16} /> 1 Branch Outlet</li>
                <li><Check size={16} /> Up to 1,000 Products</li>
                <li><Check size={16} /> Basic Inventory Logs</li>
                <li><Check size={16} /> POS Invoice Generation</li>
                <li><Check size={16} /> Email Support</li>
              </ul>
            </div>

            {/* Professional Plan (Popular) */}
            <div className="pricing-card featured">
              <div className="popular-badge">Most Popular</div>
              <div className="plan-name">Professional Plan</div>
              <div className="plan-desc">For growing retail chains and pharmacies.</div>
              <div className="plan-price">
                <span className="currency">₹</span>2,499<span className="period">/mo</span>
              </div>
              <button onClick={() => navigate('/auth/register')} className="plan-btn btn-solid">
                Get Started
              </button>
              <ul className="plan-features">
                <li><Check size={16} /> Up to 5 Branch Outlets</li>
                <li><Check size={16} /> Unlimited Products Catalog</li>
                <li><Check size={16} /> Advanced Inventory Logistics</li>
                <li><Check size={16} /> Multi-Warehouse Transfers</li>
                <li><Check size={16} /> Real-time GST & Tax Logs</li>
                <li><Check size={16} /> 24/7 Priority Support</li>
              </ul>
            </div>

            {/* Enterprise Plan */}
            <div className="pricing-card">
              <div className="plan-name">Enterprise Plan</div>
              <div className="plan-desc">For massive multi-state retail grids.</div>
              <div className="plan-price">
                <span className="custom-rate">Custom Rate</span>
              </div>
              <a href="#contact" className="plan-btn btn-outline">
                Contact Sales
              </a>
              <ul className="plan-features">
                <li><Check size={16} /> Unlimited Outlets & Warehouses</li>
                <li><Check size={16} /> Dedicated Server Deployment</li>
                <li><Check size={16} /> Customized Barcode structures</li>
                <li><Check size={16} /> API Integration Access</li>
                <li><Check size={16} /> Dedicated Account Advisor</li>
                <li><Check size={16} /> Service Level Agreements (SLA)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <div className="section-container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2 className="section-title text-left">Get in touch with us</h2>
              <p className="section-subtitle text-left">
                Have questions about onboarding or want a customized demo? Drop us a note, and our team will get in touch with you.
              </p>

              <div className="info-items">
                <div className="info-item">
                  <div className="info-icon"><Mail size={18} /></div>
                  <div className="info-txt">
                    <span className="info-label">Email Us</span>
                    <strong className="info-val">support@sarvo.com</strong>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon"><Phone size={18} /></div>
                  <div className="info-txt">
                    <span className="info-label">Call Support</span>
                    <strong className="info-val">+91 98765 43210</strong>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon"><MapPinIcon size={18} /></div>
                  <div className="info-txt">
                    <span className="info-label">Headquarters</span>
                    <strong className="info-val">City Retail Depot, Sector 5, Bangalore</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-card">
              <form onSubmit={handleContactSubmit} className="contact-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Emily Lynch" 
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    placeholder="e.g. emily@company.com" 
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>How can we help?</label>
                  <textarea 
                    rows="4" 
                    placeholder="Your message details..." 
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn-solid-submit">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="logo-icon">S</div>
            <span className="brand-text">Sarvo One</span>
          </div>
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-copy">
            &copy; {new Date().getFullYear()} Sarvo One ERP. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
