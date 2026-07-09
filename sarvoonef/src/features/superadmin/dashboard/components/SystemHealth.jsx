import React from 'react';
import { Cpu, Clock, HardDrive } from 'lucide-react';

export default function SystemHealth() {
  return (
    <section style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
      <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700, color: '#374151' }}>System & Infrastructure Health</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ color: '#0ea5e9', backgroundColor: '#e0f2fe', padding: '10px', borderRadius: '50%' }}><Cpu size={20} /></div>
          <div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>Database CPU Utilization</div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#1f2937' }}>12% <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 'normal' }}>(Healthy)</span></div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ color: '#10b981', backgroundColor: '#d1fae5', padding: '10px', borderRadius: '50%' }}><Clock size={20} /></div>
          <div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>Average Request Latency</div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#1f2937' }}>42ms <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 'normal' }}>(Optimal)</span></div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ color: '#8b5cf6', backgroundColor: '#f3e8ff', padding: '10px', borderRadius: '50%' }}><HardDrive size={20} /></div>
          <div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>Shared Storage capacity</div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#1f2937' }}>24.5 GB / 100 GB</div>
          </div>
        </div>
      </div>
    </section>
  );
}
