import React from 'react';
import LoginHistoryTable from '../components/LoginHistoryTable';
import { useLoginHistory } from '../hooks/useLoginHistory';
import { Loader2 } from 'lucide-react';

export default function SecurityLoginHistory() {
  const { attempts, loading, error } = useLoginHistory();

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Login Attempt History</h2>
        <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#6b7280' }}>Audit successful and failed login entries, browser headers, and locations.</p>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0', gap: '12px', color: '#6b7280' }}>
          <Loader2 className="animate-spin" size={24} style={{ color: '#7c3aed' }} />
          <span style={{ fontSize: '14px' }}>Loading login history...</span>
        </div>
      ) : error ? (
        <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fee2e2', color: '#b91c1c', padding: '16px', borderRadius: '8px', fontSize: '13.5px', textAlign: 'center' }}>
          {error}
        </div>
      ) : (
        <LoginHistoryTable attempts={attempts} />
      )}
    </div>
  );
}
