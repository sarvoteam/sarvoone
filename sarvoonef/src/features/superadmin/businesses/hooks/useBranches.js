import { useState, useEffect } from 'react';
import { getBranchesApi, createBranchApi } from '../api/branches.api';
import { getBusinessesApi } from '../api/businesses.api';
import { transformBranchList } from '../services/branches.service';

export const useBranches = () => {
  const [branches, setBranches] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMap, setStatusMap] = useState({});

  const fetchBranchesAndBusinesses = () => {
    setLoading(true);
    Promise.all([getBranchesApi(), getBusinessesApi()])
      .then(([branchesRes, businessesRes]) => {
        if (businessesRes.data && businessesRes.data.success) {
          setBusinesses(businessesRes.data.data);
        }
        if (branchesRes.data && branchesRes.data.success) {
          setBusinessesAndBranches(branchesRes.data.data);
        }
      })
      .catch(err => {
        console.error('Failed to fetch data:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const setBusinessesAndBranches = (items) => {
    const list = transformBranchList(items, statusMap);
    setBranches(list);
  };

  useEffect(() => {
    fetchBranchesAndBusinesses();
  }, [statusMap]);

  const toggleBranchStatus = (id) => {
    const target = branches.find(b => b.id === id);
    if (!target) return;
    const nextStatus = target.status === 'Active' ? 'Inactive' : 'Active';
    setStatusMap(prev => ({
      ...prev,
      [id]: nextStatus
    }));
    alert(`Branch "${target.branchName}" is now ${nextStatus}`);
  };

  const onboardBranch = (name, address, phone, businessId) => {
    if (!name || !businessId) {
      alert("Branch Name and Business selection are required.");
      return Promise.reject(new Error("Missing required fields"));
    }
    return createBranchApi({ name, address, phone, businessId })
      .then(() => {
        alert("Branch onboarded successfully!");
        fetchBranchesAndBusinesses();
      })
      .catch(err => {
        alert("Failed to onboard branch");
        console.error(err);
        throw err;
      });
  };

  return {
    branches,
    businesses,
    loading,
    toggleBranchStatus,
    onboardBranch
  };
};
