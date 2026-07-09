import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Percent, 
  Wallet, 
  AlertTriangle, 
  PackageMinus,
  CalendarCheck,
  Users,
  Briefcase,
  Layers,
  ArrowRightLeft
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  BarChart, 
  Bar 
} from 'recharts';
import './Dashboard.css';

// Chart mock data
const salesData = [
  { month: 'Jan', Sales: 31000, Purchases: 22000, Profit: 9000 },
  { month: 'Feb', Sales: 38000, Purchases: 24000, Profit: 14000 },
  { month: 'Mar', Sales: 42000, Purchases: 25000, Profit: 17000 },
  { month: 'Apr', Sales: 40000, Purchases: 23000, Profit: 17000 },
  { month: 'May', Sales: 48000, Purchases: 27000, Profit: 21000 },
  { month: 'Jun', Sales: 45231, Purchases: 28120, Profit: 17111 },
];

export default function Dashboard() {
  return (
    <div className="dashboard-page" style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* 10 KPI Cards Grid as requested */}
      <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 16px', color: '#1f2937' }}>Business Performance Overview</h2>
      
      <section className="kpi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        
        {/* Today's Sales */}
        <div className="kpi-card" style={{ padding: '16px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>Today's Sales</span>
            <div style={{ color: '#7c3aed', padding: '4px', borderRadius: '6px', backgroundColor: '#f3e8ff' }}><DollarSign size={16} /></div>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937' }}>₹45,231.00</div>
          <div style={{ fontSize: '11px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
            <TrendingUp size={12} /> +12.5% vs yesterday
          </div>
        </div>

        {/* Today's Purchase */}
        <div className="kpi-card" style={{ padding: '16px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>Today's Purchase</span>
            <div style={{ color: '#0891b2', padding: '4px', borderRadius: '6px', backgroundColor: '#ecfeff' }}><ShoppingCart size={16} /></div>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937' }}>₹28,120.00</div>
          <div style={{ fontSize: '11px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
            <TrendingDown size={12} /> -4.2% vs yesterday
          </div>
        </div>

        {/* Profit */}
        <div className="kpi-card" style={{ padding: '16px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>Net Profit</span>
            <div style={{ color: '#10b981', padding: '4px', borderRadius: '6px', backgroundColor: '#d1fae5' }}><Percent size={16} /></div>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937' }}>₹17,111.00</div>
          <div style={{ fontSize: '11px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
            <TrendingUp size={12} /> +8.1% vs last month
          </div>
        </div>

        {/* Expenses */}
        <div className="kpi-card" style={{ padding: '16px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>Expenses</span>
            <div style={{ color: '#ef4444', padding: '4px', borderRadius: '6px', backgroundColor: '#fee2fee' }}><Wallet size={16} /></div>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937' }}>₹6,340.00</div>
          <div style={{ fontSize: '11px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
            <TrendingUp size={12} /> +1.5% vs last month
          </div>
        </div>

        {/* Pending Payments */}
        <div className="kpi-card" style={{ padding: '16px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>Pending Payments</span>
            <div style={{ color: '#d97706', padding: '4px', borderRadius: '6px', backgroundColor: '#fef3c7' }}><AlertTriangle size={16} /></div>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937' }}>₹4,340.00</div>
          <div style={{ fontSize: '11px', color: '#b45309', marginTop: '6px' }}>To Suppliers</div>
        </div>

        {/* Outstanding Receivables */}
        <div className="kpi-card" style={{ padding: '16px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>Outstanding Receivables</span>
            <div style={{ color: '#4f46e5', padding: '4px', borderRadius: '6px', backgroundColor: '#e0e7ff' }}><ArrowRightLeft size={16} /></div>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937' }}>₹9,650.00</div>
          <div style={{ fontSize: '11px', color: '#4338ca', marginTop: '6px' }}>From Customers</div>
        </div>

        {/* Low Stock Products */}
        <div className="kpi-card" style={{ padding: '16px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>Low Stock Products</span>
            <div style={{ color: '#dc2626', padding: '4px', borderRadius: '6px', backgroundColor: '#fee2e2' }}><PackageMinus size={16} /></div>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#dc2626' }}>4 Items</div>
          <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '6px' }}>Reorder levels met</div>
        </div>

        {/* Expiring Medicines */}
        <div className="kpi-card" style={{ padding: '16px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>Expiring Medicines</span>
            <div style={{ color: '#be185d', padding: '4px', borderRadius: '6px', backgroundColor: '#fce7f3' }}><CalendarCheck size={16} /></div>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#be185d' }}>2 Batches</div>
          <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '6px' }}>Expiring within 30 days</div>
        </div>

        {/* Total Customers */}
        <div className="kpi-card" style={{ padding: '16px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>Total Customers</span>
            <div style={{ color: '#0369a1', padding: '4px', borderRadius: '6px', backgroundColor: '#e0f2fe' }}><Users size={16} /></div>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937' }}>148 clients</div>
          <div style={{ fontSize: '11px', color: '#10b981', marginTop: '6px' }}>+4 onboarding today</div>
        </div>

        {/* Total Suppliers */}
        <div className="kpi-card" style={{ padding: '16px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>Total Suppliers</span>
            <div style={{ color: '#0f766e', padding: '4px', borderRadius: '6px', backgroundColor: '#ccfbf1' }}><Briefcase size={16} /></div>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937' }}>36 accounts</div>
          <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '6px' }}>Active partnerships</div>
        </div>

      </section>

      {/* Charts Panels */}
      <section style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '24px' }}>
        {/* Sales vs Purchase graph */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Sales vs Purchase Performance</h3>
          <div style={{ height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPurchases" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0891b2" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#0891b2" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={11} tickLine={false} />
                <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} />
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Area type="monotone" dataKey="Sales" stroke="#7c3aed" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" name="Monthly Sales (₹)" />
                <Area type="monotone" dataKey="Purchases" stroke="#0891b2" strokeWidth={2} fillOpacity={1} fill="url(#colorPurchases)" name="Monthly Purchase (₹)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Immediate Operations Alert */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700 }}>Immediate Alerts</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justify: 'space-between', padding: '10px', backgroundColor: '#fee2e2', borderRadius: '8px', fontSize: '12.5px', color: '#991b1b', fontWeight: 600 }}>
              <span>Paracetamol 500mg (2 left)</span>
              <span>Reorder Alert</span>
            </div>
            <div style={{ display: 'flex', justify: 'space-between', padding: '10px', backgroundColor: '#fee2e2', borderRadius: '8px', fontSize: '12.5px', color: '#991b1b', fontWeight: 600 }}>
              <span>Amoxicillin (Out of Stock)</span>
              <span>Reorder Alert</span>
            </div>
            <div style={{ display: 'flex', justify: 'space-between', padding: '10px', backgroundColor: '#fef3c7', borderRadius: '8px', fontSize: '12.5px', color: '#92400e', fontWeight: 600 }}>
              <span>Aspirin 81mg (Expiring soon)</span>
              <span>Expiry Alert</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Grid for Lists */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Top Selling Products & Category wise */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 700 }}>Category Wise & Top Products</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f3f4f6' }}>
                <th style={{ padding: '8px 0' }}>Product</th>
                <th>Category</th>
                <th>Units Sold</th>
                <th style={{ textAlign: 'right' }}>Revenue</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px 0', fontWeight: 600 }}>Paracetamol 500mg</td>
                <td>Medical</td>
                <td>1,420</td>
                <td style={{ textAlign: 'right', fontWeight: 700 }}>₹42,600</td>
              </tr>
              <tr>
                <td style={{ padding: '10px 0', fontWeight: 600 }}>Amoxicillin 250mg</td>
                <td>Medical</td>
                <td>850</td>
                <td style={{ textAlign: 'right', fontWeight: 700 }}>₹25,500</td>
              </tr>
              <tr>
                <td style={{ padding: '10px 0', fontWeight: 600 }}>LED Bulb 9W Premium</td>
                <td>Hardware</td>
                <td>320</td>
                <td style={{ textAlign: 'right', fontWeight: 700 }}>₹9,600</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Recent Activities & Latest Bills */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 700 }}>Recent Activities & New Logs</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justify: 'space-between', borderBottom: '1px solid #f3f4f6', paddingBottom: '8px' }}>
              <div>
                <strong>New Customer: Marques Brownley</strong>
                <div style={{ fontSize: '11px', color: '#9ca3af' }}>Added manually</div>
              </div>
              <span style={{ color: '#10b981', fontWeight: 700 }}>Onboarded</span>
            </div>
            <div style={{ display: 'flex', justify: 'space-between', borderBottom: '1px solid #f3f4f6', paddingBottom: '8px' }}>
              <div>
                <strong>Invoice INV-2026-009</strong>
                <div style={{ fontSize: '11px', color: '#9ca3af' }}>Cash sale checkout</div>
              </div>
              <span style={{ color: '#7c3aed', fontWeight: 700 }}>₹1,250.00</span>
            </div>
            <div style={{ display: 'flex', justify: 'space-between', borderBottom: '1px solid #f3f4f6', paddingBottom: '8px' }}>
              <div>
                <strong>New Supplier: EcoPack Ltd</strong>
                <div style={{ fontSize: '11px', color: '#9ca3af' }}>Partner account opened</div>
              </div>
              <span style={{ color: '#0369a1', fontWeight: 700 }}>Registered</span>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
}
