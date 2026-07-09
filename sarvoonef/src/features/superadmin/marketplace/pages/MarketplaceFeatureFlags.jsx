import React, { useState } from 'react';
import FlagList from '../components/FlagList';
import { Plus } from 'lucide-react';

const initialFlags = [
  { id: 1, name: 'Offline POS Sync Engine', key: 'pos-offline-sync', description: 'Enable background sync engine for retail POS operations during internet outages.', scope: 'Global', enabled: true },
  { id: 2, name: 'UPI Gateway Direct Intents', key: 'upi-gateway-intents', description: 'Trigger UPI application selectors directly during payment checks.', scope: 'Global', enabled: false },
  { id: 3, name: 'AI Inventory Forecasting', key: 'ai-inventory-forecast', description: 'Generate smart inventory triggers based on past transaction sales records.', scope: 'Beta Business', enabled: true },
  { id: 4, name: 'Bulk Product import (XLSX)', key: 'bulk-import-excel', description: 'Enable direct excel spreadsheet uploads in the inventory feature list.', scope: 'Global', enabled: true }
];

export default function MarketplaceFeatureFlags() {
  const [flags, setFlags] = useState(initialFlags);

  const handleToggle = (id) => {
    setFlags(flags.map(f => {
      if (f.id === id) {
        const nextState = !f.enabled;
        alert(`Feature flag "${f.name}" is now: ${nextState ? 'ACTIVE' : 'INACTIVE'}`);
        return { ...f, enabled: nextState };
      }
      return f;
    }));
  };

  const handleAdd = () => {
    const name = prompt('Enter new feature flag name:');
    const key = prompt('Enter flag key (e.g. enable-v3-ui):');
    if (name && key) {
      setFlags([...flags, {
        id: Date.now(),
        name,
        key: key.toLowerCase().replace(/\s+/g, '-'),
        description: 'Custom added feature flag control.',
        scope: 'Global',
        enabled: false
      }]);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Feature Flags</h2>
          <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#6b7280' }}>Deploy runtime feature toggles and control access settings for beta systems.</p>
        </div>

        <button 
          onClick={handleAdd}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#7c3aed', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
        >
          <Plus size={16} /> Add Flag
        </button>
      </div>

      <FlagList flags={flags} onToggleFlag={handleToggle} />
    </div>
  );
}
