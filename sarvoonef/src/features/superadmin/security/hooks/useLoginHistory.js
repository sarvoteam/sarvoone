import { useState, useEffect } from 'react';
import { getLoginHistory } from '../api/security.api';

export const useLoginHistory = () => {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAttempts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getLoginHistory();
      if (res.data && res.data.success) {
        setAttempts(res.data.data || []);
      } else {
        throw new Error('Failed to load login history.');
      }
    } catch (err) {
      console.error(err);
      setError('Error loading login history. Please check connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttempts();
  }, []);

  return {
    attempts,
    loading,
    error,
    refetch: fetchAttempts
  };
};
