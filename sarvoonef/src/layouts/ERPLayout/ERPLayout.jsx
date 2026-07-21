import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate, useLocation, useParams } from 'react-router-dom';
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
  ShieldAlert,
  ArrowLeftRight,
  Settings,
  LogOut,
  User,
  RefreshCw,
  ShoppingCart,
  FileText,
  Crown
} from 'lucide-react';
import './ERPLayout.css';

export default function ERPLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { businessSlug } = useParams();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getPath = (route) => {
    return `/${businessSlug || 'dashboard'}/${route}`;
  };

  const isActive = (route) => {
    return location.pathname === getPath(route);
  };
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);

  const [user, setUser] = useState({
    name: 'Emily Lynch',
    email: 'superadmin@sarvo.com',
    role: 'Super Admin',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120'
  });

  // Close profile menu on outside clicks
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  // Load user session on mount
  useEffect(() => {
    const savedUser = sessionStorage.getItem('sarvo_user');
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
    sales: false,
    superAdmin: false
  });

  const toggleSubmenu = (menu) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const handleLogout = () => {
    sessionStorage.removeItem('sarvo_token');
    sessionStorage.removeItem('sarvo_user');
    navigate('/');
  };

  return (
    <div className="erp-layout">
      {/* Sidebar Navigation */}
      <aside className={`erp-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div 
            className="logo-container" 
            onClick={() => isCollapsed && setIsCollapsed(false)}
            style={{ cursor: isCollapsed ? 'pointer' : 'default' }}
          >
            <div className="logo-box">S</div>
            {!isCollapsed && <span className="brand-name">Sarvo One</span>}
          </div>
          {!isCollapsed && (
            <button 
              className="sidebar-toggle-btn" 
              onClick={() => setIsCollapsed(!isCollapsed)}
              title="Toggle Sidebar"
            >
              <Menu size={18} />
            </button>
          )}
        </div>

        {/* Sidebar Menu Items */}
        <nav className="sidebar-menu">
          <div 
            className={`menu-item ${isActive('dashboard') ? 'active' : ''}`}
            onClick={() => navigate(getPath('dashboard'))}
          >
            <div className="menu-item-left">
              <LayoutDashboard className="menu-item-icon" size={18} />
              {!isCollapsed && <span>Dashboard</span>}
            </div>
          </div>

          {/* Product Catalog Standalone */}
          <div 
            className={`menu-item ${isActive('products') ? 'active' : ''}`}
            onClick={() => navigate(getPath('products'))}
          >
            <div className="menu-item-left">
              <Database className="menu-item-icon" size={18} />
              {!isCollapsed && <span>Product Catalog</span>}
            </div>
          </div>

          {/* Inventory Items Standalone */}
          <div 
            className={`menu-item ${isActive('inventory') ? 'active' : ''}`}
            onClick={() => navigate(getPath('inventory'))}
          >
            <div className="menu-item-left">
              <Package className="menu-item-icon" size={18} />
              {!isCollapsed && <span>Inventory Items</span>}
            </div>
          </div>

          {/* POS Billing Terminal Standalone */}
          <div 
            className={`menu-item ${isActive('pos') ? 'active' : ''}`}
            onClick={() => navigate(getPath('pos'))}
          >
            <div className="menu-item-left">
              <ShoppingCart className="menu-item-icon" size={18} />
              {!isCollapsed && <span>POS Billing Terminal</span>}
            </div>
          </div>

          {/* Sales Invoices Standalone */}
          <div 
            className={`menu-item ${isActive('sales') ? 'active' : ''}`}
            onClick={() => navigate(getPath('sales'))}
          >
            <div className="menu-item-left">
              <FileText className="menu-item-icon" size={18} />
              {!isCollapsed && <span>Sales Invoices</span>}
            </div>
          </div>

          {/* Purchase Orders Standalone */}
          <div 
            className={`menu-item ${isActive('purchases') ? 'active' : ''}`}
            onClick={() => navigate(getPath('purchases'))}
          >
            <div className="menu-item-left">
              <TrendingUp className="menu-item-icon" size={18} />
              {!isCollapsed && <span>Purchase Orders</span>}
            </div>
          </div>

          {/* Standalone navigation links */}
          <div 
            className={`menu-item ${isActive('employees') ? 'active' : ''}`}
            onClick={() => navigate(getPath('employees'))}
          >
            <div className="menu-item-left">
              <ShieldCheck className="menu-item-icon" size={18} />
              {!isCollapsed && <span>Employee Payroll</span>}
            </div>
          </div>

          <div 
            className={`menu-item ${isActive('reports') ? 'active' : ''}`}
            onClick={() => navigate(getPath('reports'))}
          >
            <div className="menu-item-left">
              <ArrowLeftRight className="menu-item-icon" size={18} />
              {!isCollapsed && <span>Reports & Charts</span>}
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
                  className={`submenu-item ${isActive('ledger') ? 'active' : ''}`}
                  onClick={() => navigate(getPath('ledger'))}
                  style={{ cursor: 'pointer' }}
                >
                  General Ledger
                </div>
                <div 
                  className={`submenu-item ${isActive('journal') ? 'active' : ''}`}
                  onClick={() => navigate(getPath('journal'))}
                  style={{ cursor: 'pointer' }}
                >
                  Journal Entries
                </div>
                <div 
                  className={`submenu-item ${isActive('taxation') ? 'active' : ''}`}
                  onClick={() => navigate(getPath('taxation'))}
                  style={{ cursor: 'pointer' }}
                >
                  GST & Taxation
                </div>
              </div>
            )}
          </div>

          <div 
            className={`menu-item ${isActive('branches') ? 'active' : ''}`}
            onClick={() => navigate(getPath('branches'))}
          >
            <div className="menu-item-left">
              <RefreshCw className="menu-item-icon" size={18} />
              {!isCollapsed && <span>Branches List</span>}
            </div>
          </div>

          <div 
            className={`menu-item ${isActive('settings') ? 'active' : ''}`}
            onClick={() => navigate(getPath('settings'))}
          >
            <div className="menu-item-left">
              <Settings className="menu-item-icon" size={18} />
              {!isCollapsed && <span>General Settings</span>}
            </div>
          </div>

          {/* Super Admin Accordion */}
          {user && (user.role === 'Super Admin' || user.role === 'SUPER_ADMIN') && (
            <div className="menu-item-wrapper" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', marginTop: '10px', paddingTop: '10px' }}>
              <div className="menu-item" onClick={() => toggleSubmenu('superAdmin')}>
                <div className="menu-item-left">
                  <ShieldAlert className="menu-item-icon" style={{ color: '#c084fc' }} size={18} />
                  {!isCollapsed && <span style={{ fontWeight: 600, color: '#c084fc' }}>Super Admin Portal</span>}
                </div>
                {!isCollapsed && (expandedMenus.superAdmin ? <ChevronDown size={14} style={{ color: '#c084fc' }} /> : <ChevronRight size={14} style={{ color: '#c084fc' }} />)}
              </div>
              {!isCollapsed && expandedMenus.superAdmin && (
                <div className="menu-submenu">
                  <div 
                    className={`submenu-item ${location.pathname === '/superadmin/analytics' ? 'active' : ''}`}
                    onClick={() => navigate('/superadmin/analytics')}
                    style={{ cursor: 'pointer', paddingLeft: '32px' }}
                  >
                    Platform Analytics
                  </div>
                  <div 
                    className={`submenu-item ${location.pathname === '/superadmin/businesses' ? 'active' : ''}`}
                    onClick={() => navigate('/superadmin/businesses')}
                    style={{ cursor: 'pointer', paddingLeft: '32px' }}
                  >
                    Business Accounts
                  </div>
                  <div 
                    className={`submenu-item ${location.pathname === '/superadmin/subscriptions' ? 'active' : ''}`}
                    onClick={() => navigate('/superadmin/subscriptions')}
                    style={{ cursor: 'pointer', paddingLeft: '32px' }}
                  >
                    Subscription Tiers
                  </div>
                  <div 
                    className={`submenu-item ${location.pathname === '/superadmin/support' ? 'active' : ''}`}
                    onClick={() => navigate('/superadmin/support')}
                    style={{ cursor: 'pointer', paddingLeft: '32px' }}
                  >
                    Support Tickets
                  </div>
                </div>
              )}
            </div>
          )}
        </nav>
      </aside>

      {/* Main Workspace Frame */}
      <main className="erp-main">
        {/* Header Dashboard Navigation */}
        <header className="erp-header">
          <div className="header-left" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: '#059669', color: '#ffffff', padding: '4px 10px', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px', boxShadow: '0 2px 4px rgba(5, 150, 105, 0.15)' }}>
              <span className="pulse-dot" style={{ backgroundColor: '#a7f3d0' }}></span>
              Live Node
            </span>
            <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: '#7c3aed', color: '#ffffff', padding: '4px 10px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(124, 58, 237, 0.15)' }}>
              Role: {user.role || 'Super Admin'}
            </span>
            <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: '#d97706', color: '#ffffff', padding: '4px 10px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(217, 119, 6, 0.15)' }}>
              Financial Year: 2026-27
            </span>
          </div>

          {/* Right Header Controls */}
          <div className="header-right">
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
              ref={profileMenuRef}
              onClick={(e) => {
                e.stopPropagation();
                setShowProfileMenu(!showProfileMenu);
              }}
              style={{ position: 'relative' }}
            >
              <div 
                className="avatar-letter" 
                style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  background: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)', 
                  color: '#ffffff', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontWeight: 700, 
                  fontSize: '14px', 
                  border: '1.5px solid #e2e8f0',
                  boxShadow: '0 2px 8px rgba(124, 58, 237, 0.2)' 
                }}
              >
                {(user.name || 'U').charAt(0).toUpperCase()}
              </div>
              <div 
                className={`profile-dropdown-card ${showProfileMenu ? 'active' : ''}`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Premium Profile Info Header */}
                <div className="profile-dropdown-header">
                  <div 
                    style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)', 
                      color: '#ffffff', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontWeight: 700, 
                      fontSize: '18px', 
                      border: '1.5px solid #cbd5e1',
                      marginRight: '4px'
                    }}
                  >
                    {(user.name || 'U').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="profile-dropdown-name">{user.name}</div>
                    <div className="profile-dropdown-email">{user.email}</div>
                    <div className="profile-dropdown-role">{user.role}</div>
                  </div>
                </div>
 
                {/* Actions Links */}
                <div className="profile-dropdown-actions">
                  <div 
                    onClick={() => { setShowProfileMenu(false); navigate(getPath('my-account')); }}
                    className="profile-dropdown-item"
                  >
                    <User size={15} />
                    <span>My Account</span>
                  </div>
 
                  <div 
                    onClick={() => { setShowProfileMenu(false); navigate(getPath('settings')); }}
                    className="profile-dropdown-item"
                  >
                    <Settings size={15} />
                    <span>Account Settings</span>
                  </div>
 
                  <div className="profile-dropdown-divider" />
 
                  <button 
                    onClick={handleLogout}
                    className="profile-dropdown-signout"
                  >
                    <LogOut size={15} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
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
