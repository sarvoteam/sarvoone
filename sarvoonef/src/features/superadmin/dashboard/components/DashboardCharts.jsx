import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar 
} from 'recharts';

export default function DashboardCharts({ stats }) {
  const chartData = stats && stats.trend ? stats.trend : [
    { month: 'Jan', revenue: 120000, businesses: 80 },
    { month: 'Feb', revenue: 180000, businesses: 95 },
    { month: 'Mar', revenue: 240000, businesses: 110 },
    { month: 'Apr', revenue: 310000, businesses: 122 },
    { month: 'May', revenue: 450000, businesses: 135 },
    { month: 'Jun', revenue: 545230, businesses: 142 },
  ];

  return (
    <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
      {/* Revenue Growth Trend */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700, color: '#374151' }}>Monthly Subscription Revenue</h3>
        <div style={{ height: '260px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={11} tickLine={false} />
              <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} />
              <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" name="MRR (₹)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tenant Signup Trend */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700, color: '#374151' }}>Active Businesses Growth</h3>
        <div style={{ height: '260px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={11} tickLine={false} />
              <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} />
              <Tooltip />
              <Bar dataKey="businesses" fill="#7c3aed" radius={[4, 4, 0, 0]} name="Total Businesses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
