import { useState, useEffect, useCallback } from 'react';
import { fetchBranchesApi, createBranchApi } from '../api/branchesApi';

export const useBranches = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBranches = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchBranchesApi();
      if (response.data && response.data.success) {
        setBranches(response.data.data);
      } else {
        setError('Failed to fetch branches list.');
      }
    } catch (err) {
      console.error('Error fetching branches:', err);
      setError(err.response?.data?.message || 'Failed to fetch branches from backend.');
    } finally {
      setLoading(false);
    }
  }, []);

  const registerBranch = useCallback(async (branchData) => {
    try {
      const response = await createBranchApi(branchData);
      if (response.data && response.data.success) {
        await fetchBranches();
        return response.data.data;
      } else {
        throw new Error('Failed to register branch');
      }
    } catch (err) {
      console.error('Error registering branch:', err);
      throw err;
    }
  }, [fetchBranches]);

  useEffect(() => {
    fetchBranches();
  }, [fetchBranches]);

  return {
    branches,
    loading,
    error,
    fetchBranches,
    registerBranch
  };
};
