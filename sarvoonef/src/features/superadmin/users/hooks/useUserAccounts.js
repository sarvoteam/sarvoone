import { useState, useEffect } from 'react';
import { getUsersAccounts, toggleUserStatus, resetUserPassword, updateUserRole } from '../api/users.api';

export const useUserAccounts = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getUsersAccounts();
      if (res.data && res.data.success) {
        setUsers(res.data.data.users || []);
        setRoles(res.data.data.roles || []);
      } else {
        throw new Error('Failed to load user accounts.');
      }
    } catch (err) {
      console.error(err);
      setError('Error loading system user accounts. Please check connection.');
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id) => {
    try {
      const res = await toggleUserStatus(id);
      if (res.data && res.data.success) {
        const updatedStatus = res.data.data.status;
        setUsers(prevUsers => prevUsers.map(u => {
          if (u.id === id) {
            alert(`User account for "${u.name}" is now ${updatedStatus}`);
            return { ...u, status: updatedStatus };
          }
          return u;
        }));
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update account status. Please try again.');
    }
  };

  const resetPassword = async (id, name) => {
    if (window.confirm(`Reset password for user "${name}" to default: "reset2026"?`)) {
      try {
        const res = await resetUserPassword(id);
        if (res.data && res.data.success) {
          alert(`Password for user "${name}" has been reset to "reset2026".`);
        }
      } catch (err) {
        console.error(err);
        alert('Failed to reset user password. Please try again.');
      }
    }
  };

  const updateRole = async (id, roleCode) => {
    try {
      const res = await updateUserRole(id, roleCode);
      if (res.data && res.data.success) {
        const selectedRoleObj = roles.find(r => r.code === roleCode);
        const displayRoleName = selectedRoleObj ? selectedRoleObj.name : roleCode;
        
        setUsers(prevUsers => prevUsers.map(u => {
          if (u.id === id) {
            alert(`Role for "${u.name}" has been updated to "${displayRoleName}"`);
            return { ...u, role: displayRoleName, roleCode: roleCode };
          }
          return u;
        }));
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update user role. Please try again.');
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = (
      (u.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(search.toLowerCase()) ||
      (u.role || '').toLowerCase().includes(search.toLowerCase())
    );
    const matchesRole = roleFilter === '' || u.roleCode === roleFilter;
    const matchesStatus = statusFilter === '' || u.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return {
    users: filteredUsers,
    roles,
    loading,
    error,
    search,
    setSearch,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    toggleStatus,
    resetPassword,
    updateRole,
    refetch: fetchUsers
  };
};
