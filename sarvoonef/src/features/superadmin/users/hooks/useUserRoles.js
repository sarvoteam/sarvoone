import { useState, useEffect } from 'react';
import { getRolesMatrix, toggleRolePermission } from '../api/users.api';

export const useUserRoles = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [matrix, setMatrix] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRolesMatrix();
  }, []);

  const fetchRolesMatrix = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getRolesMatrix();
      if (res.data && res.data.success) {
        const { roles, permissions, matrix } = res.data.data;
        setRoles(roles);
        setPermissions(permissions);
        setMatrix(matrix);
      } else {
        throw new Error('Failed to load roles and permissions matrix.');
      }
    } catch (err) {
      console.error(err);
      setError('Error loading role authorization configuration.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (roleCode, permissionId) => {
    try {
      const res = await toggleRolePermission(roleCode, permissionId);
      if (res.data && res.data.success) {
        const nextMatrix = res.data.data;
        const nextVal = nextMatrix[roleCode]?.[permissionId];
        alert(`Updated "${roleCode}" permission "${permissionId}" to: ${nextVal ? 'ENABLED' : 'DISABLED'}`);
        setMatrix(nextMatrix);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update permission parameter. Please try again.');
    }
  };

  return {
    roles,
    permissions,
    matrix,
    loading,
    error,
    handleToggle,
    refetch: fetchRolesMatrix
  };
};
