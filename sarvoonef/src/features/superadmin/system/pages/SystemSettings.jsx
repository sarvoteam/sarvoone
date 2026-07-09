import React from 'react';
import BrandingSettings from '../components/BrandingSettings';

export default function SystemSettings() {
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>System Settings</h2>
        <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#6b7280' }}>Configure global naming headers, whitelabel options, API endpoint domains, and host variables.</p>
      </div>

      <BrandingSettings />
    </div>
  );
}
