import React from 'react';
import { Globe, ShieldAlert } from 'lucide-react';

export default function CountryGrid({ countries, onToggleCountry }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
      {countries.map(c => (
        <div key={c.id} style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={18} style={{ color: '#7c3aed' }} />
              <strong style={{ fontSize: '14.5px', color: '#1f2937' }}>{c.name}</strong>
            </div>
            <span style={{ 
              padding: '3px 8px', 
              borderRadius: '6px', 
              fontSize: '10px', 
              fontWeight: 700, 
              backgroundColor: c.status === 'Active' ? '#d1fae5' : '#fee2e2',
              color: c.status === 'Active' ? '#065f46' : '#b91c1c'
            }}>
              {c.status}
            </span>
          </div>

          <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12.5px', color: '#4b5563' }}>
            <div>ISO Code: <strong style={{ color: '#1f2937' }}>{c.iso}</strong></div>
            <div>Currency Code: <strong style={{ color: '#1f2937' }}>{c.currency} ({c.symbol})</strong></div>
          </div>

          <button 
            onClick={() => onToggleCountry(c.id)}
            style={{ border: '1px solid #e5e7eb', padding: '6px', borderRadius: '6px', fontSize: '11.5px', fontWeight: 600, color: '#4b5563', cursor: 'pointer', backgroundColor: '#fff', marginTop: '6px' }}
          >
            Toggle Operation Status
          </button>
        </div>
      ))}
    </div>
  );
}
