import React, { useState } from 'react';
import { Plus, MapPin, RefreshCw } from 'lucide-react';

const initialBranches = [
  { id: 1, name: 'Mumbai Head Office Depot', code: 'BR-MUM-01', address: 'Bandra Kurla Complex, Mumbai', phone: '022-88229900', status: 'Online' },
  { id: 2, name: 'Pune Sub-Branch Store', code: 'BR-PUN-02', address: 'Kothrud Central Main Rd, Pune', phone: '020-33004488', status: 'Online' },
  { id: 3, name: 'Delhi Retail Outlet', code: 'BR-DEL-03', address: 'Connaught Place, New Delhi', phone: '011-55501431', status: 'Offline' }
];

export default function BranchManagement() {
  const [branches, setBranches] = useState(initialBranches);

  const handleSync = (name) => {
    alert(`Initiating stock synchronization for branch "${name}"...`);
  };

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Multi-Branch Directory Settings</h2>
        <button className="btn-primary" style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}>
          <Plus size={16} /> Register Branch
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {branches.map(br => (
          <div key={br.id} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', backgroundColor: '#f9fafb' }}>
            <div style={{ display: 'flex', alignItems: 'center', justify: 'space-between', marginBottom: '12px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#1f2937' }}>{br.name}</h3>
                <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 700 }}>{br.code}</span>
              </div>
              <span style={{ 
                padding: '2px 8px', 
                borderRadius: '4px', 
                fontSize: '10px', 
                fontWeight: 700, 
                backgroundColor: br.status === 'Online' ? '#d1fae5' : '#fee2e2',
                color: br.status === 'Online' ? '#065f46' : '#b91c1c'
              }}>
                {br.status}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#4b5563', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={14} style={{ color: '#9ca3af' }} />
                <span>{br.address}</span>
              </div>
              <div>Phone: <strong>{br.phone}</strong></div>
            </div>

            <button 
              onClick={() => handleSync(br.name)}
              disabled={br.status === 'Offline'}
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
                color: br.status === 'Offline' ? '#9ca3af' : '#7c3aed', 
                cursor: br.status === 'Offline' ? 'not-allowed' : 'pointer' 
              }}
            >
              <RefreshCw size={14} /> Sync Stocks
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
