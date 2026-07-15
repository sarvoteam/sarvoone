import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  Percent, 
  Wallet, 
  AlertTriangle, 
  Layers, 
  Users, 
  Briefcase, 
  ArrowRightLeft,
  Loader2,
  AlertCircle,
  Clock,
  Plus
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import useDashboardStats from '../hooks/useDashboardStats';
import { formatCurrency } from '../../sales/utils/salesFormatter';
import './Dashboard.css';

export default function Dashboard() {
  const {
    summary,
    loading,
    error,
    chartData,
    lowStockAlerts,
    topProducts,
    salesOrders,
    refetch
  } = useDashboardStats();

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 120px)', gap: '12px', color: '#64748b' }}>
        <Loader2 className="animate-spin" size={36} style={{ color: '#7c3aed' }} />
        <span style={{ fontSize: '14px', fontWeight: 600 }}>Loading dashboard statistics...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 120px)', gap: '16px', color: '#ef4444', textAlign: 'center', padding: '24px' }}>
        <AlertCircle size={40} />
        <span style={{ fontWeight: 600, fontSize: '15px' }}>{error}</span>
        <button
          onClick={refetch}
          style={{
            padding: '8px 20px',
            backgroundColor: '#7c3aed',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 6px -1px rgba(124, 58, 237, 0.2)'
          }}
        >
          Retry Connection
        </button>
      </div>
    );
  }

  // Safe variables mapping from summary API
  const salesVal = summary?.sales?.totalAmount || 0;
  const salesCount = summary?.sales?.count || 0;
  const purchasesVal = summary?.purchases?.totalAmount || 0;
  const expensesVal = summary?.expenses?.totalAmount || 0;
  const netRevenue = summary?.financials?.netRevenue || 0;
  const customersCount = summary?.counters?.customers || 0;
  const suppliersCount = summary?.counters?.suppliers || 0;
  const productsCount = summary?.counters?.products || 0;

  // 8 Important KPI Cards Array
  const kpis = [
    {
      title: "Today's Sales Revenue",
      value: formatCurrency(salesVal),
      change: "+12.5% vs yesterday",
      isPositive: true,
      color: "#7c3aed",
      bgColor: "#f5f3ff",
      icon: <DollarSign size={16} />
    },
    {
      title: "Total Transactions",
      value: `${salesCount} invoices`,
      change: "Processed checkout logs",
      isPositive: true,
      color: "#4f46e5",
      bgColor: "#e0e7ff",
      icon: <ArrowRightLeft size={16} />
    },
    {
      title: "Material Purchases",
      value: formatCurrency(purchasesVal),
      change: "-4.2% vs yesterday",
      isPositive: false,
      color: "#0891b2",
      bgColor: "#ecfeff",
      icon: <ShoppingCart size={16} />
    },
    {
      title: "Total Expenses",
      value: formatCurrency(expensesVal),
      change: "+1.5% vs last month",
      isPositive: true,
      color: "#ef4444",
      bgColor: "#fef2f2",
      icon: <Wallet size={16} />
    },
    {
      title: "Net Business Profit",
      value: formatCurrency(netRevenue),
      change: "+8.1% vs last month",
      isPositive: true,
      color: "#10b981",
      bgColor: "#d1fae5",
      icon: <Percent size={16} />
    },
    {
      title: "Products Catalog",
      value: `${productsCount} SKUs`,
      change: "Items registered in catalog",
      isPositive: true,
      color: "#f59e0b",
      bgColor: "#fef3c7",
      icon: <Layers size={16} />
    },
    {
      title: "Total Customers",
      value: `${customersCount} clients`,
      change: "Active user accounts",
      isPositive: true,
      color: "#0284c7",
      bgColor: "#e0f2fe",
      icon: <Users size={16} />
    },
    {
      title: "Partner Suppliers",
      value: `${suppliersCount} accounts`,
      change: "Active vendor relationships",
      isPositive: true,
      color: "#0d9488",
      bgColor: "#ccfbf1",
      icon: <Briefcase size={16} />
    }
  ];

  // Get recent 4 sales orders for activities feed
  const recentActivities = salesOrders.slice(0, 4);

  return (
    <div className="dashboard-page" style={{ padding: '24px', fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Grid of exactly 8 KPI Cards */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {kpis.map((kpi, idx) => (
          <div 
            key={idx} 
            style={{ 
              padding: '14px', 
              background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', 
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(109, 40, 217, 0.12), 0 2px 4px -1px rgba(109, 40, 217, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '86px',
              color: '#fff'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600 }}>{kpi.title}</span>
              <div style={{ color: kpi.color, padding: '5px', borderRadius: '6px', backgroundColor: kpi.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {kpi.icon}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff', letterSpacing: '-0.3px', marginTop: '4px' }}>{kpi.value}</div>
              <div style={{ 
                fontSize: '10px', 
                color: 'rgba(255, 255, 255, 0.75)', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px', 
                marginTop: '4px',
                fontWeight: 600
              }}>
                {kpi.change}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Middle Section: Chart & Operational Alerts */}
      <section style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', flexWrap: 'wrap' }}>
        
        {/* Sales vs Purchase graph */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.01)' }}>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Sales vs Purchase Performance</h3>
          <p style={{ margin: '0 0 20px 0', fontSize: '12px', color: '#64748b' }}>Visualizing monthly cash-ins and stock procurement costs.</p>
          <div style={{ height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPurchases" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0891b2" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#0891b2" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="Sales" stroke="#7c3aed" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSales)" name="Monthly Sales (₹)" />
                <Area type="monotone" dataKey="Purchases" stroke="#0891b2" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPurchases)" name="Monthly Purchases (₹)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Immediate Operations Alert */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.01)', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Operational Warnings</h3>
          <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#64748b' }}>Urgent issues requiring manager intervention.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, overflowY: 'auto' }}>
            {lowStockAlerts.map(alert => (
              <div 
                key={alert.id}
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  padding: '12px', 
                  backgroundColor: alert.alertType === 'Out of Stock' ? '#fef2f2' : '#fffbeb', 
                  borderRadius: '12px',
                  border: '1px solid',
                  borderColor: alert.alertType === 'Out of Stock' ? '#fee2e2' : '#fef3c7'
                }}
              >
                <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: alert.alertType === 'Out of Stock' ? '#991b1b' : '#92400e' }}>
                    {alert.name}
                  </span>
                  <span 
                    style={{ 
                      padding: '2px 6px', 
                      borderRadius: '4px', 
                      fontSize: '10px', 
                      fontWeight: 700, 
                      backgroundColor: alert.alertType === 'Out of Stock' ? '#fee2e2' : '#fef3c7',
                      color: alert.alertType === 'Out of Stock' ? '#ef4444' : '#d97706'
                    }}
                  >
                    {alert.alertType}
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>
                  Category: <span style={{ fontWeight: 600 }}>{alert.category}</span> | Current Stock: <strong style={{ color: '#0f172a' }}>{alert.stock}</strong>
                </div>
              </div>
            ))}

            {lowStockAlerts.length === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '8px', color: '#94a3b8', fontSize: '12.5px', padding: '20px 0' }}>
                <AlertTriangle size={24} />
                <span>All product stock levels are healthy!</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bottom Grid: Top Selling Items & Recent Checkout Activity logs */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', flexWrap: 'wrap' }}>
        
        {/* Top Selling Products */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.01)' }}>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Top Selling Products</h3>
          <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#64748b' }}>Best performers based on transaction volumes.</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                  <th style={{ padding: '10px 8px', color: '#64748b', fontWeight: 600 }}>Product Name</th>
                  <th style={{ padding: '10px 8px', color: '#64748b', fontWeight: 600 }}>Category</th>
                  <th style={{ padding: '10px 8px', color: '#64748b', fontWeight: 600 }}>Units Sold</th>
                  <th style={{ padding: '10px 8px', color: '#64748b', fontWeight: 600, textAlign: 'right' }}>Total Revenue</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((p, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 8px', fontWeight: 700, color: '#334155' }}>{p.name}</td>
                    <td style={{ padding: '12px 8px', color: '#475569' }}>{p.category}</td>
                    <td style={{ padding: '12px 8px', fontWeight: 600, color: '#475569' }}>{p.qty} units</td>
                    <td style={{ padding: '12px 8px', fontWeight: 700, color: '#7c3aed', textAlign: 'right' }}>{formatCurrency(p.revenue)}</td>
                  </tr>
                ))}

                {topProducts.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: '24px', color: '#94a3b8' }}>
                      No checkout data available to determine top products.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activities & Latest Bills */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.01)', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Recent Sales Activities</h3>
          <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#64748b' }}>Latest transactions pushed from POS terminals.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1, overflowY: 'auto' }}>
            {recentActivities.map(activity => {
              const displayId = activity.orderNumber;
              const customerName = activity.customer?.name || 'Walk-in Customer';
              const dateLabel = new Date(activity.createdAt).toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div 
                  key={activity.id} 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    borderBottom: '1px solid #f1f5f9', 
                    paddingBottom: '10px' 
                  }}
                >
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>
                      Invoice {displayId}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                      <Clock size={11} /> {dateLabel} | Customer: <span style={{ fontWeight: 600 }}>{customerName}</span>
                    </div>
                  </div>
                  <span style={{ color: '#7c3aed', fontWeight: 800, fontSize: '14px' }}>
                    {formatCurrency(activity.totalAmount)}
                  </span>
                </div>
              );
            })}

            {recentActivities.length === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '8px', color: '#94a3b8', fontSize: '12.5px', padding: '24px 0' }}>
                <Clock size={24} />
                <span>No checkout activities registered yet.</span>
              </div>
            )}
          </div>
        </div>

      </section>

    </div>
  );
}
