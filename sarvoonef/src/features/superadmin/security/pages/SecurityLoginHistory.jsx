import React, { useState } from 'react';
import LoginHistoryTable from '../components/LoginHistoryTable';

const initialAttempts = [
  { id: 1, timestamp: '2026-07-09 13:57:06', email: 'sarvooneteam@gmail.com', ip: '103.45.201.88', agent: 'Chrome 125 / Win11', status: 'Success' },
  { id: 2, timestamp: '2026-07-09 13:52:12', email: 'rohit.ghanghav6633@gmail.com', ip: '192.168.1.12', agent: 'Safari / iOS 17', status: 'Success' },
  { id: 3, timestamp: '2026-07-09 12:44:00', email: 'unknown.hacker@gmail.com', ip: '203.0.113.50', agent: 'Curl / Linux', status: 'Failed (Wrong PW)' },
  { id: 4, timestamp: '2026-07-09 09:12:33', email: 'alex.med@gmail.com', ip: '82.90.155.12', agent: 'Firefox / macOS', status: 'Success' }
];

export default function SecurityLoginHistory() {
  const [attempts] = useState(initialAttempts);

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Login Attempt History</h2>
        <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#6b7280' }}>Audit successful and failed login entries, browser headers, and locations.</p>
      </div>

      <LoginHistoryTable attempts={attempts} />
    </div>
  );
}
