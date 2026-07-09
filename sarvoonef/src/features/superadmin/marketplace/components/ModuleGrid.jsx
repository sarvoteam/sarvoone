import React from 'react';
import { Package, Shield, Settings, Play } from 'lucide-react';

export default function ModuleGrid({ modules, onToggleModule }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
      {modules.map(mod => (
        <div key={mod.id} style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ padding: '8px', backgroundColor: '#f5f3ff', color: '#7c3aed', borderRadius: '8px' }}>
              <Package size={20} />
            </div>
            <span style={{ 
              padding: '3px 8px', 
              borderRadius: '6px', 
              fontSize: '10px', 
              fontWeight: 700, 
              backgroundColor: mod.status === 'Enabled' ? '#d1fae5' : '#f3f4f6',
              color: mod.status === 'Enabled' ? '#065f46' : '#6b7280'
            }}>
              {mod.status}
            </span>
          </div>

          <div>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: 700, color: '#1f2937' }}>{mod.name}</h4>
            <p style={{ margin: 0, fontSize: '12px', color: '#6b7280', lineHeight: '140%' }}>{mod.description}</p>
          </div>

          <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12.5px' }}>
            <span style={{ color: '#4b5563' }}>Pricing: <strong>{mod.pricing}</strong></span>
            <button
              onClick={() => onToggleModule(mod.id)}
              style={{
                border: 'none',
                backgroundColor: mod.status === 'Enabled' ? '#fee2e2' : '#f3e8ff',
                color: mod.status === 'Enabled' ? '#ef4444' : '#7c3aed',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '11.5px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {mod.status === 'Enabled' ? 'Disable' : 'Enable'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
