import React from 'react';
import ApiKeyList from '../components/ApiKeyList';
import { useApiKeys } from '../hooks/useApiKeys';
import { Plus, Loader2 } from 'lucide-react';

export default function SecurityApiKeys() {
  const { apiKeys, loading, error, handleAdd, handleRevoke } = useApiKeys();

  const handleAddKey = () => {
    const name = prompt('Enter API Key name/description:');
    if (name) {
      handleAdd(name);
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
          onClick={handleAddKey}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#7c3aed', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
        >
          <Plus size={16} /> Generate Key
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0', gap: '12px', color: '#6b7280' }}>
          <Loader2 className="animate-spin" size={24} style={{ color: '#7c3aed' }} />
          <span style={{ fontSize: '14px' }}>Loading API keys...</span>
        </div>
      ) : error ? (
        <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fee2e2', color: '#b91c1c', padding: '16px', borderRadius: '8px', fontSize: '13.5px', textAlign: 'center' }}>
          {error}
        </div>
      ) : (
        <ApiKeyList apiKeys={apiKeys} onRevoke={handleRevoke} />
      )}
    </div>
  );
}
