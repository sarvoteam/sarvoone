import React, { useState } from 'react';
import RoleMatrix from '../components/RoleMatrix';

const roles = [
  { id: 1, name: 'Super Admin', code: 'SUPER_ADMIN' },
  { id: 2, name: 'Business Owner', code: 'BUSINESS_OWNER' },
  { id: 3, name: 'Auditor', code: 'AUDITOR' },
  { id: 4, name: 'Support Rep', code: 'SUPPORT_REP' }
];

const permissions = [
  { id: 'manage_businesses', label: 'Manage Businesses', description: 'Suspend, create, edit businesses' },
  { id: 'manage_users', label: 'Manage Users', description: 'Reset PW, delete logins, roles' },
  { id: 'view_financials', label: 'View Revenues', description: 'Access bills, payments & tables' },
  { id: 'manage_system', label: 'Edit System', description: 'Modify SMTP, gateways settings' }
];

const initialMatrix = {
  SUPER_ADMIN: { manage_businesses: true, manage_users: true, view_financials: true, manage_system: true },
  BUSINESS_OWNER: { manage_businesses: false, manage_users: true, view_financials: true, manage_system: false },
  AUDITOR: { manage_businesses: false, manage_users: false, view_financials: true, manage_system: false },
  SUPPORT_REP: { manage_businesses: true, manage_users: false, view_financials: false, manage_system: false }
};

export default function UserRoles() {
  const [matrix, setMatrix] = useState(initialMatrix);

  const handleToggle = (roleCode, permissionId) => {
    setMatrix(prev => {
      const rolePerms = prev[roleCode] || {};
      const nextVal = !rolePerms[permissionId];
      alert(`Updated "${roleCode}" permission "${permissionId}" to: ${nextVal ? 'ENABLED' : 'DISABLED'}`);
      return {
        ...prev,
        [roleCode]: {
          ...rolePerms,
          [permissionId]: nextVal
        }
      };
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Role Authorization Rules</h2>
        <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#6b7280' }}>Configure granular permission parameters for system credentials and staff support roles.</p>
      </div>

      <RoleMatrix 
        roles={roles} 
        permissions={permissions} 
        matrix={matrix} 
        onTogglePermission={handleToggle} 
      />
    </div>
  );
}
