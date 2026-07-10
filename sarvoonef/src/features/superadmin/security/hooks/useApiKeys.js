import { useState, useEffect } from 'react';
import { getApiKeys, generateApiKey, revokeApiKey } from '../api/security.api';

export const useApiKeys = () => {
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchKeys = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getApiKeys();
      if (res.data && res.data.success) {
        setApiKeys(res.data.data || []);
      } else {
        throw new Error('Failed to load API keys.');
      }
    } catch (err) {
      console.error(err);
      setError('Error loading API keys. Please check connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (name) => {
    try {
      const res = await generateApiKey(name);
      if (res.data && res.data.success) {
        setApiKeys(prev => [...prev, res.data.data]);
        alert('API Key generated successfully.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to generate API Key.');
    }
  };

  const handleRevoke = async (id) => {
    if (confirm('Revoke this API Key permanently? Actions using this key will immediately fail.')) {
      try {
        const res = await revokeApiKey(id);
        if (res.data && res.data.success) {
          setApiKeys(prev => prev.map(k => k.id === id ? { ...k, status: 'Revoked' } : k));
          alert('API Key revoked successfully.');
        }
      } catch (err) {
        console.error(err);
        alert('Failed to revoke API Key.');
      }
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  return {
    apiKeys,
    loading,
    error,
    handleAdd,
    handleRevoke,
    refetch: fetchKeys
  };
};
