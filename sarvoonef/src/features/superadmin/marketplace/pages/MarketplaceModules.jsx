import React, { useState } from 'react';
import ModuleGrid from '../components/ModuleGrid';

const initialModules = [
  { id: 1, name: 'Razorpay Payment Gateway', description: 'Enable direct Razorpay API checkout and refund integrations for Indian merchants.', pricing: 'Free (Core)', status: 'Enabled' },
  { id: 2, name: 'Stripe Global Payments', description: 'Enable multi-currency Stripe checkouts and card payments processing.', pricing: '₹499/mo addon', status: 'Enabled' },
  { id: 3, name: 'WhatsApp Business Broadcasts', description: 'Send automated transaction messages and receipts to customers via WhatsApp APIs.', pricing: '₹999/mo addon', status: 'Disabled' },
  { id: 4, name: 'E-Way Billing India', description: 'Integrate directly with government NIC portals to print GST compliant E-Way bills.', pricing: '₹1499/mo addon', status: 'Disabled' }
];

export default function MarketplaceModules() {
  const [modules, setModules] = useState(initialModules);

  const handleToggle = (id) => {
    setModules(modules.map(m => {
      if (m.id === id) {
        const nextStatus = m.status === 'Enabled' ? 'Disabled' : 'Enabled';
        alert(`Module "${m.name}" is now ${nextStatus}`);
        return { ...m, status: nextStatus };
      }
      return m;
    }));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Marketplace Modules</h2>
        <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#6b7280' }}>Activate optional API plugins, integration add-ons, and pricing packages globally.</p>
      </div>

      <ModuleGrid modules={modules} onToggleModule={handleToggle} />
    </div>
  );
}
