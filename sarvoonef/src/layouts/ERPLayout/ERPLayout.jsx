import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  ChevronRight, 
  Menu, 
  Search, 
  Bell, 
  History, 
  Plus, 
  X,
  LayoutDashboard,
  Calculator,
  Database,
  Wallet,
  Package,
  TrendingUp,
  ShieldCheck,
  ArrowLeftRight,
  Settings,
  LogOut,
  User,
  RefreshCw
} from 'lucide-react';
import './ERPLayout.css';

export default function ERPLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [user, setUser] = useState({
    name: 'Emily Lynch',
    email: 'admin@sarvo.com',
    role: 'Admin',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120'
  });

  // Load user session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('sarvo_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        // use default
      }
    }
  }, []);

  // Controls expanding/collapsing submenus
  const [expandedMenus, setExpandedMenus] = useState({
    basicInfo: true,
    accounting: false,
    stocks: false,
    sales: false
  });

  const toggleSubmenu = (menu) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('sarvo_token');
    localStorage.removeItem('sarvo_user');
    navigate('/auth/login');
  };

  return (
    <div className="erp-layout">
      {/* Sidebar Navigation */}
      <aside className={`erp-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-box">S</div>
            {!isCollapsed && <span className="brand-name">Sarvo One</span>}
          </div>
          <button 
            className="sidebar-toggle-btn" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            title="Toggle Sidebar"
          >
            <Menu size={18} />
          </button>
        </div>

        {/* Sidebar Search */}
        {!isCollapsed && (
          <div className="sidebar-search-box">
            <div className="sidebar-search-wrapper">
              <Search className="sidebar-search-icon" size={16} />
              <input 
                type="text" 
                placeholder="Search tools..." 
                className="sidebar-search-input" 
              />
            </div>
          </div>
        )}

        {/* Sidebar Menu Items */}
        <nav className="sidebar-menu">
          <div 
            className={`menu-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
            onClick={() => navigate('/dashboard')}
          >
            <div className="menu-item-left">
              <LayoutDashboard className="menu-item-icon" size={18} />
              {!isCollapsed && <span>Dashboard</span>}
            </div>
          </div>

          {/* Accounting Accordion */}
          <div className="menu-item-wrapper">
            <div className="menu-item" onClick={() => toggleSubmenu('accounting')}>
              <div className="menu-item-left">
                <Calculator className="menu-item-icon" size={18} />
                {!isCollapsed && <span>Accounting</span>}
              </div>
              {!isCollapsed && (expandedMenus.accounting ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
            </div>
            {!isCollapsed && expandedMenus.accounting && (
              <div className="menu-submenu">
                <div 
                  className={`submenu-item ${location.pathname === '/ledger' ? 'active' : ''}`}
                  onClick={() => navigate('/ledger')}
                  style={{ cursor: 'pointer' }}
                >
                  General Ledger
                </div>
                <div 
                  className={`submenu-item ${location.pathname === '/journal' ? 'active' : ''}`}
                  onClick={() => navigate('/journal')}
                  style={{ cursor: 'pointer' }}
                >
                  Journal Entries
                </div>
                <div 
                  className={`submenu-item ${location.pathname === '/taxation' ? 'active' : ''}`}
                  onClick={() => navigate('/taxation')}
                  style={{ cursor: 'pointer' }}
                >
                  GST & Taxation
                </div>
              </div>
            )}
          </div>

          {/* Basic Information Accordion */}
          <div className="menu-item-wrapper">
            <div className="menu-item" onClick={() => toggleSubmenu('basicInfo')}>
              <div className="menu-item-left">
                <Database className="menu-item-icon" size={18} />
                {!isCollapsed && <span>Basic Information</span>}
              </div>
              {!isCollapsed && (expandedMenus.basicInfo ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
            </div>
            {!isCollapsed && expandedMenus.basicInfo && (
              <div className="menu-submenu">
                <div 
                  className={`submenu-item ${location.pathname === '/products' ? 'active' : ''}`}
                  onClick={() => navigate('/products')}
                  style={{ cursor: 'pointer' }}
                >
                  Product Catalog
                </div>
                <div 
                  className={`submenu-item ${location.pathname === '/customers' ? 'active' : ''}`}
                  onClick={() => navigate('/customers')}
                  style={{ cursor: 'pointer' }}
                >
                  Customers Ledger
                </div>
                <div 
                  className={`submenu-item ${location.pathname === '/suppliers' ? 'active' : ''}`}
                  onClick={() => navigate('/suppliers')}
                  style={{ cursor: 'pointer' }}
                >
                  Suppliers Database
                </div>
                <div 
                  className={`submenu-item ${location.pathname === '/users' ? 'active' : ''}`}
                  onClick={() => navigate('/users')}
                  style={{ cursor: 'pointer' }}
                >
                  Users & Access
                </div>
              </div>
            )}
          </div>

          {/* Stocks / Inventory Accordion */}
          <div className="menu-item-wrapper">
            <div className="menu-item" onClick={() => toggleSubmenu('stocks')}>
              <div className="menu-item-left">
                <Package className="menu-item-icon" size={18} />
                {!isCollapsed && <span>Stocks</span>}
              </div>
              {!isCollapsed && (expandedMenus.stocks ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
            </div>
            {!isCollapsed && expandedMenus.stocks && (
              <div className="menu-submenu">
                <div 
                  className={`submenu-item ${location.pathname === '/inventory' ? 'active' : ''}`}
                  onClick={() => navigate('/inventory')}
                  style={{ cursor: 'pointer' }}
                >
                  Inventory Items
                </div>
                <div 
                  className={`submenu-item ${location.pathname === '/stock-transfer' ? 'active' : ''}`}
                  onClick={() => navigate('/stock-transfer')}
                  style={{ cursor: 'pointer' }}
                >
                  Stock Transfers
                </div>
                <div 
                  className={`submenu-item ${location.pathname === '/warehouses' ? 'active' : ''}`}
                  onClick={() => navigate('/warehouses')}
                  style={{ cursor: 'pointer' }}
                >
                  Warehouses
                </div>
                <div 
                  className={`submenu-item ${location.pathname === '/barcodes' ? 'active' : ''}`}
                  onClick={() => navigate('/barcodes')}
                  style={{ cursor: 'pointer' }}
                >
                  Barcode Labels
                </div>
              </div>
            )}
          </div>

          {/* Sales Accordion */}
          <div className="menu-item-wrapper">
            <div className="menu-item" onClick={() => toggleSubmenu('sales')}>
              <div className="menu-item-left">
                <TrendingUp className="menu-item-icon" size={18} />
                {!isCollapsed && <span>Sales & Purchases</span>}
              </div>
              {!isCollapsed && (expandedMenus.sales ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
            </div>
            {!isCollapsed && expandedMenus.sales && (
              <div className="menu-submenu">
                <div 
                  className={`submenu-item ${location.pathname === '/pos' ? 'active' : ''}`}
                  onClick={() => navigate('/pos')}
                  style={{ cursor: 'pointer' }}
                >
                  POS Billing Terminal
                </div>
                <div 
                  className={`submenu-item ${location.pathname === '/sales' ? 'active' : ''}`}
                  onClick={() => navigate('/sales')}
                  style={{ cursor: 'pointer' }}
                >
                  Sales Invoices
                </div>
                <div 
                  className={`submenu-item ${location.pathname === '/purchases' ? 'active' : ''}`}
                  onClick={() => navigate('/purchases')}
                  style={{ cursor: 'pointer' }}
                >
                  Purchase Orders
                </div>
              </div>
            )}
          </div>

          {/* Standalone navigation links */}
          <div 
            className={`menu-item ${location.pathname === '/employees' ? 'active' : ''}`}
            onClick={() => navigate('/employees')}
          >
            <div className="menu-item-left">
              <ShieldCheck className="menu-item-icon" size={18} />
              {!isCollapsed && <span>Employee Payroll</span>}
            </div>
          </div>

          <div 
            className={`menu-item ${location.pathname === '/reports' ? 'active' : ''}`}
            onClick={() => navigate('/reports')}
          >
            <div className="menu-item-left">
              <ArrowLeftRight className="menu-item-icon" size={18} />
              {!isCollapsed && <span>Reports & Charts</span>}
            </div>
          </div>

          <div 
            className={`menu-item ${location.pathname === '/notifications' ? 'active' : ''}`}
            onClick={() => navigate('/notifications')}
          >
            <div className="menu-item-left">
              <Bell className="menu-item-icon" size={18} />
              {!isCollapsed && <span>Notifications Warning</span>}
            </div>
          </div>

          <div 
            className={`menu-item ${location.pathname === '/branches' ? 'active' : ''}`}
            onClick={() => navigate('/branches')}
          >
            <div className="menu-item-left">
              <RefreshCw className="menu-item-icon" size={18} />
              {!isCollapsed && <span>Branches List</span>}
            </div>
          </div>

          <div 
            className={`menu-item ${location.pathname === '/settings' ? 'active' : ''}`}
            onClick={() => navigate('/settings')}
          >
            <div className="menu-item-left">
              <Settings className="menu-item-icon" size={18} />
              {!isCollapsed && <span>General Settings</span>}
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Workspace Frame */}
      <main className="erp-main">
        {/* Header Dashboard Navigation */}
        <header className="erp-header">
          <div className="header-left">
            <select className="period-dropdown" defaultValue="2026 Period">
              <option value="2026 Period">2026 Period</option>
              <option value="2025 Period">2025 Period</option>
            </select>
          </div>

          {/* Right Header Controls */}
          <div className="header-right">
            <div className="header-search-wrapper">
              <Search className="header-search-icon" size={14} />
              <input type="text" placeholder="Search..." className="header-search-input" />
            </div>

            <div className="header-actions">
              <button className="header-action-btn" title="View Logs History">
                <History size={16} />
              </button>
              <button className="header-action-btn" title="Notifications">
                <Bell size={16} />
                <span className="notification-badge"></span>
              </button>
            </div>

            {/* Profile Avatar & Dropdown Menu */}
            <div 
              className="user-profile" 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              style={{ position: 'relative' }}
            >
              <img 
                src={user.avatar} 
                alt="Profile" 
                className="avatar-img" 
              />
              {showProfileMenu && (
                <div style={{
                  position: 'absolute',
                  top: '48px',
                  right: '0',
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '16px',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  padding: '16px',
                  width: '240px',
                  zIndex: 9999,
                  textAlign: 'left'
                }} onClick={(e) => e.stopPropagation()}>
                  
                  {/* Premium Profile Info Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '12px', borderBottom: '1px solid #f3f4f6', marginBottom: '8px' }}>
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #7c3aed' }} 
                    />
                    <div>
                      <div style={{ fontWeight: 700, color: '#1f2937', fontSize: '13.5px', lineHeight: '1.2' }}>{user.name}</div>
                      <div style={{ color: '#6b7280', fontSize: '11px', marginTop: '2px', wordBreak: 'break-all' }}>{user.email}</div>
                      <div style={{
                        display: 'inline-block',
                        backgroundColor: '#eff6ff',
                        color: '#1d4ed8',
                        fontSize: '9px',
                        fontWeight: 700,
                        padding: '1px 6px',
                        borderRadius: '4px',
                        marginTop: '4px'
                      }}>{user.role}</div>
                    </div>
                  </div>

                  {/* Actions Links */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <div 
                      onClick={() => { alert('Navigating to user profile setup...'); }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        color: '#4b5563',
                        cursor: 'pointer',
                        fontWeight: 500,
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f9fafb'; e.currentTarget.style.color = '#1f2937'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#4b5563'; }}
                    >
                      <User size={15} style={{ color: '#9ca3af' }} />
                      <span>My Account</span>
                    </div>

                    <div 
                      onClick={() => { setShowProfileMenu(false); navigate('/settings'); }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        color: '#4b5563',
                        cursor: 'pointer',
                        fontWeight: 500,
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f9fafb'; e.currentTarget.style.color = '#1f2937'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#4b5563'; }}
                    >
                      <Settings size={15} style={{ color: '#9ca3af' }} />
                      <span>Account Settings</span>
                    </div>

                    <div style={{ borderTop: '1px solid #f3f4f6', margin: '6px 0' }} />

                    <button 
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '8px 10px',
                        border: 'none',
                        backgroundColor: 'transparent',
                        color: '#ef4444',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        borderRadius: '8px',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#fef2f2'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >
                      <LogOut size={15} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Outlet */}
        <div className="erp-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
