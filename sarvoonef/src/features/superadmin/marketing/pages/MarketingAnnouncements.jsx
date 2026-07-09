import React from 'react';
import AnnouncementForm from '../components/AnnouncementForm';

export default function MarketingAnnouncements() {
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Platform Bulletins & News</h2>
        <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#6b7280' }}>Configure news boards, system upgrades spotlights, and maintenance alerts displayed on client dashboards.</p>
      </div>

      <AnnouncementForm />
    </div>
  );
}
