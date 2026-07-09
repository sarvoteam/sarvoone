import React from 'react';
import { ShieldAlert, Check, X } from 'lucide-react';

export default function RoleMatrix({ roles, permissions, matrix, onTogglePermission }) {
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f3f4f6', backgroundColor: '#fafafa' }}>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600, width: '200px' }}>System Role</th>
            {permissions.map(perm => (
              <th key={perm.id} style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600, textAlign: 'center' }}>
                <div style={{ fontSize: '12px' }}>{perm.label}</div>
                <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 'normal' }}>{perm.description}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {roles.map(role => (
            <tr key={role.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldAlert size={16} style={{ color: role.name === 'Super Admin' ? '#7c3aed' : '#4b5563' }} />
                  <div>
                    <div style={{ fontWeight: 600, color: '#1f2937' }}>{role.name}</div>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>{role.code}</div>
                  </div>
                </div>
              </td>
              {permissions.map(perm => {
                const hasPerm = matrix[role.code]?.[perm.id];
                return (
                  <td key={perm.id} style={{ padding: '16px', textAlign: 'center' }}>
                    <button
                      onClick={() => onTogglePermission(role.code, perm.id)}
                      disabled={role.code === 'SUPER_ADMIN'} // Super Admin permissions are locked
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: role.code === 'SUPER_ADMIN' ? 'default' : 'pointer',
                        padding: '6px',
                        borderRadius: '50%',
                        backgroundColor: hasPerm ? '#ecfdf5' : '#fef2f2',
                        color: hasPerm ? '#059669' : '#dc2626',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: role.code === 'SUPER_ADMIN' ? 0.7 : 1
                      }}
                    >
                      {hasPerm ? <Check size={16} /> : <X size={16} />}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
