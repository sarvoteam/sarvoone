import React from 'react';
import { MapPin, RefreshCw } from 'lucide-react';

export default function BranchCard({ branch, onSync }) {
  const shortId = branch.id ? branch.id.slice(0, 8).toUpperCase() : 'N/A';
  
  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '180px' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px', gap: '8px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#1f2937', wordBreak: 'break-word' }}>{branch.name}</h3>
            <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 700 }}>ID: {shortId}</span>
          </div>
          <span style={{ 
            padding: '2px 8px', 
            borderRadius: '4px', 
            fontSize: '10px', 
            fontWeight: 700, 
            backgroundColor: '#d1fae5',
            color: '#065f46',
            whiteSpace: 'nowrap'
          }}>
            Online
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#4b5563', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={14} style={{ color: '#9ca3af', flexShrink: 0 }} />
            <span>{branch.address || 'No Address Provided'}</span>
          </div>
          {branch.phone && (
            <div>Phone: <strong>{branch.phone}</strong></div>
          )}
        </div>
      </div>

      <button 
        onClick={() => onSync(branch.name)}
        style={{ 
          width: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '8px', 
          padding: '8px', 
          border: '1px solid #e5e7eb', 
          borderRadius: '8px', 
          backgroundColor: '#ffffff', 
          fontSize: '12px', 
          fontWeight: 600, 
          color: '#7c3aed', 
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f3e8ff'; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; }}
      >
        <RefreshCw size={14} /> Sync Stocks
      </button>
    </div>
  );
}
