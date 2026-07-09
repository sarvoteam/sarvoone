import React, { useState } from 'react';
import WebhookEventTable from '../components/WebhookEventTable';
import { Plus } from 'lucide-react';

const initialEndpoints = [
  { id: 1, url: 'https://api.vogueapparel.com/webhooks/sarvo', events: 'tenant.created, billing.failed', secret: 'whsec_9012...', status: 'Active' },
  { id: 2, url: 'https://sync.techhub.in/webhooks/callback', events: 'product.sync, inventory.alert', secret: 'whsec_78fa...', status: 'Active' }
];

export default function DeveloperWebhooks() {
  const [endpoints, setEndpoints] = useState(initialEndpoints);

  const handlePing = (url) => {
    alert(`Sending test ping payload to webhook subscriber: ${url}`);
  };

  const handleDelete = (id) => {
    if (confirm('Delete webhook subscription? Webhook notification events will stop firing.')) {
      setEndpoints(endpoints.filter(e => e.id !== id));
    }
  };

  const handleCreate = () => {
    const url = prompt('Enter Webhook Target URL:');
    const events = prompt('Enter trigger events (comma-separated):');
    if (url) {
      setEndpoints([...endpoints, {
        id: Date.now(),
        url,
        events: events || 'all',
        secret: `whsec_${Math.random().toString(36).substring(2, 8)}...`,
        status: 'Active'
      }]);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Developer Webhooks</h2>
          <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#6b7280' }}>Register webhook subscription endpoints to dispatch instant notifications on database mutations.</p>
        </div>

        <button 
          onClick={handleCreate}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#7c3aed', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
        >
          <Plus size={16} /> Add Webhook
        </button>
      </div>

      <WebhookEventTable endpoints={endpoints} onPing={handlePing} onDelete={handleDelete} />
    </div>
  );
}
