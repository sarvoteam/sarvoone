import React from 'react';
import { Cpu, HardDrive, Network, Layers } from 'lucide-react';

export default function ServerHealthGrid({ healthData }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
      
      {/* CPU */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px', display: 'flex', gap: '14px', alignItems: 'center' }}>
        <div style={{ padding: '10px', backgroundColor: '#e0f2fe', color: '#0ea5e9', borderRadius: '8px' }}>
          <Cpu size={20} />
        </div>
        <div>
          <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 600 }}>CPU UTILIZATION</div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#1f2937' }}>{healthData.cpu}%</div>
          <span style={{ fontSize: '10px', color: '#059669', fontWeight: 600 }}>Optimal (8 cores)</span>
        </div>
      </div>

      {/* Memory */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px', display: 'flex', gap: '14px', alignItems: 'center' }}>
        <div style={{ padding: '10px', backgroundColor: '#f5f3ff', color: '#7c3aed', borderRadius: '8px' }}>
          <Layers size={20} />
        </div>
        <div>
          <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 600 }}>RAM USAGE</div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#1f2937' }}>{healthData.ram} GB</div>
          <span style={{ fontSize: '10px', color: '#059669', fontWeight: 600 }}>Available: 8.4 GB</span>
        </div>
      </div>

      {/* Disk */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px', display: 'flex', gap: '14px', alignItems: 'center' }}>
        <div style={{ padding: '10px', backgroundColor: '#ecfdf5', color: '#10b981', borderRadius: '8px' }}>
          <HardDrive size={20} />
        </div>
        <div>
          <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 600 }}>SSD STORAGE</div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#1f2937' }}>{healthData.disk}%</div>
          <span style={{ fontSize: '10px', color: '#059669', fontWeight: 600 }}>Free: 140 GB</span>
        </div>
      </div>

      {/* Network Latency */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px', display: 'flex', gap: '14px', alignItems: 'center' }}>
        <div style={{ padding: '10px', backgroundColor: '#fff7ed', color: '#f97316', borderRadius: '8px' }}>
          <Network size={20} />
        </div>
        <div>
          <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 600 }}>DB LATENCY</div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#1f2937' }}>{healthData.latency} ms</div>
          <span style={{ fontSize: '10px', color: '#059669', fontWeight: 600 }}>Supabase Conn OK</span>
        </div>
      </div>

    </div>
  );
}
