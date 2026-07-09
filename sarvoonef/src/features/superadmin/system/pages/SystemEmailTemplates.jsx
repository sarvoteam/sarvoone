import React, { useState } from 'react';
import TemplateSelector from '../components/TemplateSelector';

const initialTemplates = [
  { id: 1, name: 'Welcome & Onboarding Email', subject: 'Welcome to Sarvo One - Setup your store!', target: 'New Merchant Signup' },
  { id: 2, name: 'Invoice Receipt Invoice', subject: 'Your subscription invoice is ready - {{invoice_no}}', target: 'Billing Contacts' },
  { id: 3, name: 'Security Password Reset', subject: 'Reset your account security credential passcode', target: 'All Users Request' },
  { id: 4, name: 'Account Suspension Notice', subject: 'Alert: Your storefront account has been suspended', target: 'Suspended Businesses' }
];

export default function SystemEmailTemplates() {
  const [templates, setTemplates] = useState(initialTemplates);

  const handleEditTemplate = (template) => {
    const nextSubject = prompt(`Edit Subject for ${template.name}:`, template.subject);
    if (nextSubject) {
      setTemplates(templates.map(t => t.id === template.id ? { ...t, subject: nextSubject } : t));
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>System Email Templates</h2>
        <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#6b7280' }}>Configure default transactional HTML templates sent by the backend SMTP notifier.</p>
      </div>

      <TemplateSelector templates={templates} onSelectTemplate={handleEditTemplate} />
    </div>
  );
}
