import React, { useState } from 'react';
import AuditLogTable from '../components/AuditLogTable';

const initialLogs = [
  { id: 1, timestamp: '2026-07-09 13:50:22', user: 'Emily Lynch (Super Admin)', action: 'Update Plan Price', resource: 'Pro Plan package price to ₹2499', ip: '103.45.201.88' },
  { id: 2, timestamp: '2026-07-09 12:45:10', user: 'System Trigger', action: 'Create Invoice', resource: 'Invoice INV-2026-001 for Sarvo Medical', ip: '127.0.0.1' },
  { id: 3, timestamp: '2026-07-09 11:32:05', user: 'Emily Lynch (Super Admin)', action: 'Suspend Tenant', resource: 'Anastasia Grocery Outlet account', ip: '103.45.201.88' },
  { id: 4, timestamp: '2026-07-08 17:15:44', user: 'Rohit Ghanghav (Merchant)', action: 'Onboard Storefront', resource: 'Vogue Boutique Apparel CP', ip: '192.168.1.12' }
];

export default function SecurityAuditLogs() {
  const [logs] = useState(initialLogs);

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Platform Audit Trail</h2>
        <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#6b7280' }}>Track all mutations, staff action codes, and billing parameter adjustments.</p>
      </div>

      <AuditLogTable logs={logs} />
    </div>
  );
}
