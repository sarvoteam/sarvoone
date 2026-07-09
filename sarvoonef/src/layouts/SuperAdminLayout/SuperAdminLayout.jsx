import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, 
  Bell, 
  History, 
  LogOut, 
  ChevronDown,
  ChevronRight,
  BarChart3, 
  Building2, 
  CreditCard, 
  LifeBuoy,
  User, 
  ShieldAlert,
  ShoppingBag,
  Lock,
  Settings,
  Activity,
  Terminal,
  Megaphone,
  Database
} from 'lucide-react';
import '../ERPLayout/ERPLayout.css';

const menuGroups = [
  {
    title: 'Businesses',
    icon: Building2,
    key: 'businesses',
    items: [
      { label: 'Accounts', path: '/superadmin/businesses/accounts' },
      { label: 'Branches', path: '/superadmin/businesses/branches' },
      { label: 'Categories', path: '/superadmin/businesses/categories' }
    ]
  },
  {
    title: 'Subscriptions',
    icon: CreditCard,
    key: 'subscriptions',
    items: [
      { label: 'Plans', path: '/superadmin/subscriptions/plans' },
      { label: 'Payments', path: '/superadmin/subscriptions/payments' },
      { label: 'Invoices', path: '/superadmin/subscriptions/invoices' },
      { label: 'Coupons', path: '/superadmin/subscriptions/coupons' }
    ]
  },
  {
    title: 'Users',
    icon: User,
    key: 'users',
    items: [
      { label: 'Accounts', path: '/superadmin/users/accounts' },
      { label: 'Roles', path: '/superadmin/users/roles' },
      { label: 'Sessions', path: '/superadmin/users/sessions' }
    ]
  },
  {
    title: 'Support',
    icon: LifeBuoy,
    key: 'support',
    items: [
      { label: 'Tickets', path: '/superadmin/support/tickets' },
      { label: 'Live Chat', path: '/superadmin/support/chat' },
      { label: 'Knowledge Base', path: '/superadmin/support/kb' }
    ]
  },
  {
    title: 'Marketplace',
    icon: ShoppingBag,
    key: 'marketplace',
    items: [
      { label: 'Modules', path: '/superadmin/marketplace/modules' },
      { label: 'Feature Flags', path: '/superadmin/marketplace/flags' }
    ]
  },
  {
    title: 'Reports',
    icon: BarChart3,
    key: 'reports',
    items: [
      { label: 'Revenue', path: '/superadmin/reports/revenue' },
      { label: 'Businesses', path: '/superadmin/reports/businesses' },
      { label: 'Usage', path: '/superadmin/reports/usage' }
    ]
  },
  {
    title: 'Security',
    icon: Lock,
    key: 'security',
    items: [
      { label: 'Audit Logs', path: '/superadmin/security/audit' },
      { label: 'Login History', path: '/superadmin/security/logins' },
      { label: 'API Keys', path: '/superadmin/security/apikeys' }
    ]
  },
  {
    title: 'System',
    icon: Settings,
    key: 'system',
    items: [
      { label: 'Settings', path: '/superadmin/system/settings' },
      { label: 'Notifications', path: '/superadmin/system/notifications' },
      { label: 'Email Templates', path: '/superadmin/system/emails' },
      { label: 'Payment Gateways', path: '/superadmin/system/gateways' }
    ]
  },
  {
    title: 'Monitoring',
    icon: Activity,
    key: 'monitoring',
    items: [
      { label: 'Server Status', path: '/superadmin/monitoring/server' },
      { label: 'Error Logs', path: '/superadmin/monitoring/errors' },
      { label: 'Background Jobs', path: '/superadmin/monitoring/jobs' }
    ]
  },
  {
    title: 'Developers',
    icon: Terminal,
    key: 'developers',
    items: [
      { label: 'APIs', path: '/superadmin/developers/apis' },
      { label: 'Webhooks', path: '/superadmin/developers/webhooks' }
    ]
  },
  {
    title: 'Marketing',
    icon: Megaphone,
    key: 'marketing',
    items: [
      { label: 'Campaigns', path: '/superadmin/marketing/campaigns' },
      { label: 'Announcements', path: '/superadmin/marketing/announcements' }
    ]
  },
  {
    title: 'Master Data',
    icon: Database,
    key: 'masterdata',
    items: [
      { label: 'Categories', path: '/superadmin/masterdata/categories' },
      { label: 'Countries', path: '/superadmin/masterdata/countries' },
      { label: 'Cities', path: '/superadmin/masterdata/cities' }
    ]
  }
];

export default function SuperAdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState({
    businesses: true,
  });

  const [user, setUser] = useState({
    name: 'Super Admin',
    email: 'sarvooneteam@gmail.com',
    role: 'Super Admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120'
  });

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

  const handleLogout = () => {
    sessionStorage.removeItem('sarvo_token');
    sessionStorage.removeItem('sarvo_user');
    navigate('/auth/login');
  };

  const toggleGroup = (groupKey) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupKey]: !prev[groupKey]
    }));
  };

  return (
    <div className="erp-layout">
      {/* Sidebar Navigation */}
      <aside className={`erp-sidebar ${isCollapsed ? 'collapsed' : ''}`} style={{ borderRight: '1px solid #e9d5ff', width: isCollapsed ? '70px' : '260px' }}>
        <div className="sidebar-header" style={{ borderBottom: '1px solid #f3e8ff' }}>
          <div className="logo-container">
            <div className="logo-box" style={{ backgroundColor: '#7c3aed' }}>SA</div>
            {!isCollapsed && <span className="brand-name" style={{ color: '#7c3aed', fontWeight: 800 }}>Sarvo Admin</span>}
          </div>
          <button 
            className="sidebar-toggle-btn" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            title="Toggle Sidebar"
          >
            <Menu size={18} />
          </button>
        </div>

        {/* Sidebar Menu Items */}
        <nav className="sidebar-menu" style={{ paddingTop: '16px', overflowY: 'auto', flex: 1 }}>
          
          {/* Main Dashboard Link */}
          <div 
            className={`menu-item ${location.pathname === '/superadmin/dashboard' ? 'active' : ''}`}
            onClick={() => navigate('/superadmin/dashboard')}
            style={{ 
              backgroundColor: location.pathname === '/superadmin/dashboard' ? '#f5f3ff' : 'transparent',
              color: location.pathname === '/superadmin/dashboard' ? '#7c3aed' : '#4b5563',
              cursor: 'pointer',
              marginBottom: '6px'
            }}
          >
            <div className="menu-item-left">
              <BarChart3 className="menu-item-icon" size={18} style={{ color: location.pathname === '/superadmin/dashboard' ? '#7c3aed' : '#6b7280' }} />
              {!isCollapsed && <span style={{ fontWeight: location.pathname === '/superadmin/dashboard' ? 600 : 500 }}>Dashboard</span>}
            </div>
          </div>

          {/* Collapsible Accordion Groups */}
          {menuGroups.map(group => {
            const Icon = group.icon;
            const isOpen = !!expandedGroups[group.key];
            const hasActiveChild = group.items.some(item => location.pathname === item.path);

            return (
              <div key={group.key} className="menu-item-wrapper" style={{ marginBottom: '4px' }}>
                <div 
                  className={`menu-item ${hasActiveChild ? 'active' : ''}`}
                  onClick={() => {
                    if (isCollapsed) {
                      // If collapsed, navigate to the first sub-item directly
                      navigate(group.items[0].path);
                    } else {
                      toggleGroup(group.key);
                    }
                  }}
                  style={{
                    backgroundColor: hasActiveChild && !isOpen ? '#f5f3ff' : 'transparent',
                    color: hasActiveChild ? '#7c3aed' : '#4b5563',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div className="menu-item-left">
                    <Icon className="menu-item-icon" size={18} style={{ color: hasActiveChild ? '#7c3aed' : '#6b7280' }} />
                    {!isCollapsed && <span style={{ fontWeight: hasActiveChild ? 600 : 500 }}>{group.title}</span>}
                  </div>
                  {!isCollapsed && (
                    isOpen ? <ChevronDown size={14} style={{ color: '#9ca3af' }} /> : <ChevronRight size={14} style={{ color: '#9ca3af' }} />
                  )}
                </div>

                {/* Submenu links */}
                {isOpen && !isCollapsed && (
                  <div className="menu-submenu" style={{ display: 'flex', flexDirection: 'column', paddingLeft: '32px', gap: '2px', marginTop: '2px' }}>
                    {group.items.map(item => {
                      const isSubActive = location.pathname === item.path;
                      return (
                        <div
                          key={item.path}
                          onClick={() => navigate(item.path)}
                          className={`submenu-item ${isSubActive ? 'active' : ''}`}
                          style={{
                            padding: '6px 12px',
                            fontSize: '12.5px',
                            color: isSubActive ? '#7c3aed' : '#6b7280',
                            fontWeight: isSubActive ? 600 : 500,
                            borderRadius: '6px',
                            cursor: 'pointer',
                            backgroundColor: isSubActive ? '#f5f3ff' : 'transparent'
                          }}
                        >
                          {item.label}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

        </nav>
      </aside>

      {/* Main Workspace Frame */}
      <main className="erp-main">
        {/* Header Dashboard Navigation */}
        <header className="erp-header" style={{ borderBottom: '1px solid #f3e8ff' }}>
          <div className="header-left">
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#7c3aed', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldAlert size={16} /> SYSTEM MANAGEMENT CONSOLE
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
              </button>
            </div>

            {/* Profile Dropdown */}
            <div 
              className="user-profile"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              style={{ position: 'relative' }}
            >
              <img 
                src={user.avatar} 
                alt="Avatar" 
                className="avatar-img"
                style={{ border: '2px solid #7c3aed' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', fontSize: '12px', textAlign: 'left' }}>
                <span style={{ fontWeight: 600, color: '#1f2937' }}>{user.name}</span>
                <span style={{ fontSize: '10px', color: '#7c3aed', fontWeight: 600 }}>{user.role}</span>
              </div>

              {showProfileMenu && (
                <div 
                  style={{
                    position: 'absolute',
                    top: '40px',
                    right: 0,
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    width: '160px',
                    padding: '6px 0',
                    zIndex: 100,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div 
                    onClick={handleLogout}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 14px',
                      fontSize: '13px',
                      color: '#ef4444',
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    <LogOut size={14} /> Log Out
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Viewport */}
        <div className="erp-content" style={{ backgroundColor: '#f9fafb' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
