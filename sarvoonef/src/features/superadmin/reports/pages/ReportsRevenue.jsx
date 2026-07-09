import React from 'react';
import RevenueChart from '../components/RevenueChart';

export default function ReportsRevenue() {
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Revenue Reports</h2>
        <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#6b7280' }}>Track net subscription turnovers, operational payouts, and transaction audits.</p>
      </div>

      <RevenueChart />
    </div>
  );
}
