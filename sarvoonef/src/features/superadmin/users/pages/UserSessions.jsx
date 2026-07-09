import React, { useState } from 'react';
import SessionList from '../components/SessionList';

const initialSessions = [
  { id: 1, browser: 'Chrome 125', os: 'Windows 11', device: 'Desktop', userName: 'Emily Lynch', email: 'sarvooneteam@gmail.com', ip: '103.45.201.88', location: 'New Delhi, DL', lastActive: 'Active Now' },
  { id: 2, browser: 'Safari Mobile', os: 'iOS 17.4', device: 'Mobile', userName: 'Rohit Ghanghav', email: 'rohit.ghanghav6633@gmail.com', ip: '192.168.1.12', location: 'Mumbai, MH', lastActive: '2 mins ago' },
  { id: 3, browser: 'Firefox Developer Edition', os: 'macOS Sonoma', device: 'Desktop', userName: 'Alexander Medvedev', email: 'alex.med@gmail.com', ip: '82.90.155.12', location: 'Saint Petersburg, RU', lastActive: '15 mins ago' },
  { id: 4, browser: 'Chrome Mobile', os: 'Android 14', device: 'Mobile', userName: 'Anastasia Golovko', email: 'anastasia@outlook.com', ip: '94.22.40.103', location: 'Kiev, UA', lastActive: '1 hour ago' }
];

export default function UserSessions() {
  const [sessions, setSessions] = useState(initialSessions);

  const handleRevoke = (id, userName) => {
    if (confirm(`Are you sure you want to terminate the login session for: ${userName}?`)) {
      setSessions(sessions.filter(s => s.id !== id));
      alert(`Session for "${userName}" terminated successfully.`);
    }
  };

  const handleRevokeAll = () => {
    if (confirm('Warning: This will log out all other active system sessions. Proceed?')) {
      // Keep only current session (id: 1)
      setSessions(sessions.filter(s => s.id === 1));
      alert('All other remote user sessions terminated.');
    }
  };

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

      <SessionList sessions={sessions} onRevoke={handleRevoke} />
    </div>
  );
}
