import React from 'react';
import { MapPin, Trash2 } from 'lucide-react';

export default function CityTable({ cities, onDelete }) {
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f3f4f6', backgroundColor: '#fafafa' }}>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>City Name</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>State / Territory</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Country Mapping</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Status</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600, textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cities.map(ct => (
            <tr key={ct.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ padding: '6px', borderRadius: '6px', backgroundColor: '#f5f3ff', color: '#7c3aed' }}>
                    <MapPin size={14} />
                  </div>
                  <strong style={{ color: '#1f2937' }}>{ct.name}</strong>
                </div>
              </td>
              <td style={{ padding: '14px 16px', color: '#4b5563' }}>{ct.state}</td>
              <td style={{ padding: '14px 16px', color: '#4b5563' }}>{ct.country}</td>
              <td style={{ padding: '14px 16px' }}>
                <span style={{ 
                  padding: '4px 8px', 
                  borderRadius: '6px', 
                  fontSize: '11px', 
                  fontWeight: 700, 
                  backgroundColor: '#d1fae5',
                  color: '#065f46'
                }}>
                  Active
                </span>
              </td>
              <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                <button
                  onClick={() => onDelete(ct.id)}
                  style={{ border: '1px solid #fee2e2', backgroundColor: '#fff', color: '#ef4444', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}
                >
                  <Trash2 size={12} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
