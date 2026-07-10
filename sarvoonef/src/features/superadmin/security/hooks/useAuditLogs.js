import { useState, useEffect } from 'react';
import { getAuditLogs } from '../api/security.api';

export const useAuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAuditLogs();
      if (res.data && res.data.success) {
        setLogs(res.data.data || []);
      } else {
        throw new Error('Failed to load audit logs.');
      }
    } catch (err) {
      console.error(err);
      setError('Error loading audit trail. Please check connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return {
    logs,
    loading,
    error,
    refetch: fetchLogs
  };
};
