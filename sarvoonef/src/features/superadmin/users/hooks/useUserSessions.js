import { useState, useEffect } from 'react';
import { getActiveSessions, revokeSession, revokeAllOtherSessions } from '../api/users.api';

export const useUserSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getActiveSessions();
      if (res.data && res.data.success) {
        setSessions(res.data.data);
      } else {
        throw new Error('Failed to retrieve login session logs.');
      }
    } catch (err) {
      console.error(err);
      setError('Error loading active system sessions.');
    } finally {
      setLoading(false);
    }
  };

  const handleRevoke = async (id, userName) => {
    if (confirm(`Are you sure you want to terminate the login session for: ${userName}?`)) {
      try {
        const res = await revokeSession(id);
        if (res.data && res.data.success) {
          setSessions(prevSessions => prevSessions.filter(s => s.id !== id));
          alert(`Session for "${userName}" terminated successfully.`);
        }
      } catch (err) {
        console.error(err);
        alert('Failed to revoke session. Please try again.');
      }
    }
  };

  const handleRevokeAll = async () => {
    if (confirm('Warning: This will log out all other active system sessions. Proceed?')) {
      try {
        const res = await revokeAllOtherSessions();
        if (res.data && res.data.success) {
          alert('All other remote user sessions terminated.');
          fetchSessions();
        }
      } catch (err) {
        console.error(err);
        alert('Failed to revoke other sessions. Please try again.');
      }
    }
  };

  return {
    sessions,
    loading,
    error,
    handleRevoke,
    handleRevokeAll,
    refetch: fetchSessions
  };
};
