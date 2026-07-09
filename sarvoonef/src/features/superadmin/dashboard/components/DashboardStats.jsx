import React from 'react';
import { TrendingUp, Users, DollarSign, Activity, ShieldAlert } from 'lucide-react';

export default function DashboardStats({ stats, loading }) {
  const mrr = stats ? `₹${stats.mrr.toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : '₹5,45,230.00';
  const companies = stats ? `${stats.businesses} Companies` : '142 Companies';
  const branches = stats ? `${stats.branches} Branches` : '348 Branches';
  const supportRate = stats ? `${stats.supportRate}%` : '98.4%';

  return (
    <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
      
      {/* MRR */}
      <div style={{ padding: '16px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>Monthly Recurring Revenue</span>
          <div style={{ color: '#10b981', padding: '4px', borderRadius: '6px', backgroundColor: '#d1fae5' }}><DollarSign size={16} /></div>
        </div>
        <div style={{ fontSize: '22px', fontWeight: 700, color: '#1f2937' }}>{mrr}</div>
        <div style={{ fontSize: '11px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
          <TrendingUp size={12} /> +21.1% vs last month
        </div>
      </div>

      {/* Active Businesses */}
      <div style={{ padding: '16px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>Active Businesses</span>
          <div style={{ color: '#7c3aed', padding: '4px', borderRadius: '6px', backgroundColor: '#f3e8ff' }}><Users size={16} /></div>
        </div>
        <div style={{ fontSize: '22px', fontWeight: 700, color: '#1f2937' }}>{companies}</div>
        <div style={{ fontSize: '11px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
          <TrendingUp size={12} /> +7 new signups this week
        </div>
      </div>

      {/* Active Branches */}
      <div style={{ padding: '16px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>Total Active Branches</span>
          <div style={{ color: '#0ea5e9', padding: '4px', borderRadius: '6px', backgroundColor: '#e0f2fe' }}><Activity size={16} /></div>
        </div>
        <div style={{ fontSize: '22px', fontWeight: 700, color: '#1f2937' }}>{branches}</div>
        <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '6px' }}>Across 12 Categories</div>
      </div>

      {/* Resolution Rate */}
      <div style={{ padding: '16px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>Support Resolution Rate</span>
          <div style={{ color: '#d97706', padding: '4px', borderRadius: '6px', backgroundColor: '#fef3c7' }}><ShieldAlert size={16} /></div>
        </div>
        <div style={{ fontSize: '22px', fontWeight: 700, color: '#1f2937' }}>{supportRate}</div>
        <div style={{ fontSize: '11px', color: '#10b981', marginTop: '6px' }}>Avg response time: 24 mins</div>
      </div>

    </section>
  );
}
