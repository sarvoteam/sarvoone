import { useState, useEffect } from 'react';
import { getBusinessesApi, onboardBusinessApi, deleteBusinessApi } from '../api/businesses.api';
import { transformBusinessList } from '../services/businesses.service';
import { validateOnboardInputs } from '../validations/businesses.validation';

export const useBusinesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusMap, setStatusMap] = useState({});

  const fetchBusinesses = () => {
    setLoading(true);
    getBusinessesApi()
      .then(res => {
        if (res.data && res.data.success) {
          const items = transformBusinessList(res.data.data, statusMap);
          setBusinesses(items);
        }
      })
      .catch(err => {
        console.error('Failed to fetch businesses:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBusinesses();
  }, [statusMap]);

  const toggleStatus = (id) => {
    const target = businesses.find(b => b.id === id);
    if (!target) return;
    const newStatus = target.status === 'Active' ? 'Suspended' : 'Active';
    setStatusMap(prev => ({
      ...prev,
      [id]: newStatus
    }));
    alert(`Business "${target.name}" status changed to ${newStatus}`);
  };

  const deleteBusiness = (id, name) => {
    if (window.confirm(`Are you sure you want to offboard and delete the business account: ${name}?`)) {
      deleteBusinessApi(id)
        .then(() => {
          alert(`Successfully deleted business: ${name}`);
          fetchBusinesses();
        })
        .catch(err => {
          alert('Failed to delete business');
          console.error(err);
        });
    }
  };

  const onboardBusiness = (payload) => {
    const validation = validateOnboardInputs(payload);
    if (!validation.isValid) {
      alert(`Validation failed:\n${validation.errors.join('\n')}`);
      return Promise.reject(new Error(validation.errors.join(', ')));
    }

    return onboardBusinessApi(payload)
      .then(() => {
        alert("Business onboarded successfully!");
        fetchBusinesses();
      })
      .catch(err => {
        alert("Failed to onboard business");
        console.error(err);
        throw err;
      });
  };

  const filteredBusinesses = businesses.filter(b => 
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.owner.toLowerCase().includes(search.toLowerCase()) ||
    b.email.toLowerCase().includes(search.toLowerCase())
  );

  return {
    businesses: filteredBusinesses,
    rawBusinesses: businesses,
    loading,
    search,
    setSearch,
    toggleStatus,
    deleteBusiness,
    onboardBusiness
  };
};
