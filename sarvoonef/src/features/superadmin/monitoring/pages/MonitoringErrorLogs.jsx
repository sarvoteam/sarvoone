import React, { useState } from 'react';
import ErrorLogConsole from '../components/ErrorLogConsole';

const initialLogs = [
  { id: 1, severity: 'FATAL', timestamp: '2026-07-09 13:58:22', message: 'PrismaClientInitializationError: Can\'t reach database server at supabase.db.co', file: 'prisma/client.js', line: 12, hits: 2 },
  { id: 2, severity: 'WARNING', timestamp: '2026-07-09 13:54:10', message: 'SMTPConnectionError: Connection timeout during email delivery queue check', file: 'services/email.js', line: 45, hits: 14 },
  { id: 3, severity: 'WARNING', timestamp: '2026-07-09 13:52:05', message: 'RazorpaySignatureVerificationError: Invalid HMAC signature returned from webhook callback', file: 'controllers/razorpay.js', line: 102, hits: 1 }
];

export default function MonitoringErrorLogs() {
  const [logs] = useState(initialLogs);

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>System Exception Logs</h2>
        <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#6b7280' }}>Audit unhandled runtime exceptions, compiler warnings, and prisma connection failures.</p>
      </div>

      <ErrorLogConsole logs={logs} />
    </div>
  );
}
