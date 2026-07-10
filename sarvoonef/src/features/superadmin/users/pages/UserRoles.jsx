import React from 'react';
import RoleMatrix from '../components/RoleMatrix';
import { Loader2 } from 'lucide-react';
import { useUserRoles } from '../hooks/useUserRoles';

export default function UserRoles() {
  const {
    roles,
    permissions,
    matrix,
    loading,
    error,
    handleToggle
  } = useUserRoles();

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Role Authorization Rules</h2>
        <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#6b7280' }}>Configure granular permission parameters for system credentials and staff support roles.</p>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0', gap: '12px', color: '#6b7280' }}>
          <Loader2 className="animate-spin" size={24} style={{ color: '#7c3aed' }} />
          <span style={{ fontSize: '14px' }}>Loading authorization matrix...</span>
        </div>
      ) : error ? (
        <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fee2e2', color: '#b91c1c', padding: '16px', borderRadius: '8px', fontSize: '13.5px', textAlign: 'center' }}>
          {error}
        </div>
      ) : (
        <RoleMatrix 
          roles={roles} 
          permissions={permissions} 
          matrix={matrix} 
          onTogglePermission={handleToggle} 
        />
      )}
    </div>
  );
}
