import React from 'react';
import { MapPin, Users, Activity, BarChart2 } from 'lucide-react';

export default function BranchGrid({ branches, onToggleBranch }) {
  if (branches.length === 0) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', color: '#6b7280', fontSize: '13px' }}>
        No branches found. Click "Add Branch" to register a branch under an active business.
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
      {branches.map(br => (
        <div key={br.id} style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '11px', color: '#7c3aed', fontWeight: 700, textTransform: 'uppercase' }}>{br.businessName}</span>
              <h4 style={{ margin: '2px 0 0 0', fontSize: '14.5px', fontWeight: 700, color: '#1f2937' }}>{br.branchName}</h4>
            </div>
            <span style={{ 
              padding: '3px 8px', 
              borderRadius: '6px', 
              fontSize: '10px', 
              fontWeight: 700, 
              backgroundColor: br.status === 'Active' ? '#d1fae5' : '#fee2e2',
              color: br.status === 'Active' ? '#065f46' : '#b91c1c'
            }}>
              {br.status}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: '#4b5563', borderTop: '1px solid #f3f4f6', paddingTop: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={14} style={{ color: '#9ca3af' }} />
              <span>{br.location}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Users size={14} style={{ color: '#9ca3af' }} />
              <span>{br.staffCount} Staff Members</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BarChart2 size={14} style={{ color: '#9ca3af' }} />
              <span>Monthly Sales: <strong>₹{br.monthlySales.toLocaleString()}</strong></span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', borderTop: '1px dotted #f3f4f6', paddingTop: '10px' }}>
            <button 
              onClick={() => onToggleBranch(br.id)}
              style={{ flex: 1, border: '1px solid #e5e7eb', padding: '6px', borderRadius: '6px', fontSize: '11.5px', fontWeight: 600, color: '#4b5563', cursor: 'pointer', backgroundColor: '#fff' }}
            >
              Toggle Status
            </button>
            <button 
              onClick={() => alert(`Showing analytics for ${br.branchName}...`)}
              style={{ border: '1px solid #e5e7eb', padding: '6px 10px', borderRadius: '6px', fontSize: '11.5px', color: '#7c3aed', cursor: 'pointer', backgroundColor: '#f5f3ff', border: 'none', fontWeight: 600 }}
            >
              Analytics
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
