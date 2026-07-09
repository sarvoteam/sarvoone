import React from 'react';
import ResourceMeter from '../components/ResourceMeter';

export default function ReportsUsage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>System Usage Reports</h2>
        <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#6b7280' }}>Monitor API quotas, cloud storage constraints, and email broadcast metrics.</p>
      </div>

      <ResourceMeter />
    </div>
  );
}
