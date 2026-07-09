import React, { useState } from 'react';
import ServerHealthGrid from '../components/ServerHealthGrid';

export default function MonitoringServerStatus() {
  const [health] = useState({ cpu: 24, ram: 7.6, disk: 44, latency: 12 });

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Server Status Telemetry</h2>
        <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#6b7280' }}>Track virtual machine load parameters, database network latency, and memory utilization thresholds.</p>
      </div>

      <ServerHealthGrid healthData={health} />
    </div>
  );
}
