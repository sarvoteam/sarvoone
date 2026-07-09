import React from 'react';
import { Ticket, Trash2 } from 'lucide-react';

export default function CouponTable({ coupons, onToggleStatus, onDelete }) {
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f3f4f6', backgroundColor: '#fafafa' }}>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Promo Code</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Discount Details</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Usage Limit</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Used Count</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Status</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600, textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map(cop => (
            <tr key={cop.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ padding: '6px', borderRadius: '6px', backgroundColor: '#f5f3ff', color: '#7c3aed' }}>
                    <Ticket size={14} />
                  </div>
                  <strong style={{ color: '#1f2937', fontFamily: 'monospace', fontSize: '14px' }}>{cop.code}</strong>
                </div>
              </td>
              <td style={{ padding: '14px 16px', color: '#4b5563' }}>{cop.discount}</td>
              <td style={{ padding: '14px 16px', color: '#6b7280' }}>{cop.limit}</td>
              <td style={{ padding: '14px 16px', fontWeight: 600, color: '#1f2937' }}>{cop.used}</td>
              <td style={{ padding: '14px 16px' }}>
                <span style={{ 
                  padding: '4px 8px', 
                  borderRadius: '6px', 
                  fontSize: '11px', 
                  fontWeight: 700, 
                  backgroundColor: cop.status === 'Active' ? '#d1fae5' : '#fee2e2',
                  color: cop.status === 'Active' ? '#065f46' : '#b91c1c'
                }}>
                  {cop.status}
                </span>
              </td>
              <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  <button 
                    onClick={() => onToggleStatus(cop.id)}
                    style={{ border: '1px solid #e5e7eb', backgroundColor: '#fff', color: '#4b5563', padding: '6px 12px', borderRadius: '6px', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Toggle
                  </button>
                  <button 
                    onClick={() => onDelete(cop.id)}
                    style={{ border: '1px solid #fee2e2', backgroundColor: '#fff', color: '#ef4444', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
