import React from 'react';
import SessionList from '../components/SessionList';
import { Loader2 } from 'lucide-react';
import { useUserSessions } from '../hooks/useUserSessions';

export default function UserSessions() {
  const {
    sessions,
    loading,
    error,
    handleRevoke,
    handleRevokeAll
  } = useUserSessions();

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Active User Sessions</h2>
          <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#6b7280' }}>Audit active user agents, IP footprints, and trigger remote token terminations.</p>
        </div>

        <button 
          onClick={handleRevokeAll}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
        >
          Revoke All Others
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0', gap: '12px', color: '#6b7280' }}>
          <Loader2 className="animate-spin" size={24} style={{ color: '#7c3aed' }} />
          <span style={{ fontSize: '14px' }}>Loading session parameters...</span>
        </div>
      ) : error ? (
        <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fee2e2', color: '#b91c1c', padding: '16px', borderRadius: '8px', fontSize: '13.5px', textAlign: 'center' }}>
          {error}
        </div>
      ) : (
        <SessionList sessions={sessions} onRevoke={handleRevoke} />
      )}
    </div>
  );
}
