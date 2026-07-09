import React, { useState } from 'react';
import ApiKeyList from '../components/ApiKeyList';
import { Plus } from 'lucide-react';

const initialKeys = [
  { id: 1, name: 'Production Backend API Sync', token: 'sk_live_51P8d...', scopes: 'Read/Write (Full)', created: '2026-07-08', status: 'Active' },
  { id: 2, name: 'Zapier Webhook Integration', token: 'sk_live_90Ha...', scopes: 'Read Only (Metrics)', created: '2026-07-09', status: 'Active' },
  { id: 3, name: 'Analytics Sync Dashboard', token: 'sk_test_7a1F...', scopes: 'Read Only', created: '2026-07-09', status: 'Revoked' }
];

export default function SecurityApiKeys() {
  const [apiKeys, setApiKeys] = useState(initialKeys);

  const handleRevoke = (id) => {
    if (confirm('Revoke this API Key permanently? Actions using this key will immediately fail.')) {
      setApiKeys(apiKeys.map(k => k.id === id ? { ...k, status: 'Revoked' } : k));
    }
  };

  const handleAdd = () => {
    const name = prompt('Enter API Key name/description:');
    if (name) {
      setApiKeys([...apiKeys, {
        id: Date.now(),
        name,
        token: `sk_live_${Math.random().toString(36).substring(2, 8)}...`,
        scopes: 'Read/Write (Default)',
        created: new Date().toISOString().split('T')[0],
        status: 'Active'
      }]);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Developer API Keys</h2>
          <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#6b7280' }}>Generate, rotate, and audit client API tokens used for external third-party integrations.</p>
        </div>

        <button 
          onClick={handleAdd}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#7c3aed', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
        >
          <Plus size={16} /> Generate Key
        </button>
      </div>

      <ApiKeyList apiKeys={apiKeys} onRevoke={handleRevoke} />
    </div>
  );
}
