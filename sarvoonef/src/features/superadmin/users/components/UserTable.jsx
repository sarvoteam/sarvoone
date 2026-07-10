import React from 'react';
import { UserCheck, Mail, Shield, Key, Ban, CheckCircle } from 'lucide-react';

export default function UserTable({ users, onResetPassword, onToggleStatus }) {
  return (
    <div style={{ 
      backgroundColor: '#fff', 
      borderRadius: '12px', 
      border: '1px solid #e5e7eb', 
      overflowX: 'auto', 
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)' 
    }}>
      <table style={{ width: '100%', minWidth: '950px', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'center' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f3f4f6', backgroundColor: '#fafafa' }}>
            <th style={{ padding: '16px 20px', color: '#4b5563', fontWeight: 600, fontSize: '12.5px', whiteSpace: 'nowrap', textAlign: 'center' }}>Full Name</th>
            <th style={{ padding: '16px 20px', color: '#4b5563', fontWeight: 600, fontSize: '12.5px', whiteSpace: 'nowrap', textAlign: 'center' }}>Email Address</th>
            <th style={{ padding: '16px 20px', color: '#4b5563', fontWeight: 600, fontSize: '12.5px', whiteSpace: 'nowrap', textAlign: 'center' }}>System Role</th>
            <th style={{ padding: '16px 20px', color: '#4b5563', fontWeight: 600, fontSize: '12.5px', whiteSpace: 'nowrap', textAlign: 'center' }}>Date Registered</th>
            <th style={{ padding: '16px 20px', color: '#4b5563', fontWeight: 600, fontSize: '12.5px', whiteSpace: 'nowrap', textAlign: 'center' }}>Status</th>
            <th style={{ padding: '16px 20px', color: '#4b5563', fontWeight: 600, fontSize: '12.5px', whiteSpace: 'nowrap', textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background-color 0.15s ease' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fafafa'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
              {/* Full Name */}
              <td style={{ padding: '16px 20px', verticalAlign: 'middle', textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
                  <div style={{ 
                    width: '38px', 
                    height: '38px', 
                    borderRadius: '50%', 
                    backgroundColor: u.roleCode === 'SUPER_ADMIN' ? '#f5f3ff' : '#f0f9ff', 
                    color: u.roleCode === 'SUPER_ADMIN' ? '#7c3aed' : '#0284c7', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <UserCheck size={18} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <div style={{ fontWeight: 600, color: '#1f2937', whiteSpace: 'nowrap' }}>{u.name}</div>
                    <div style={{ fontSize: '11px', color: '#9ca3af', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>ID: {u.id.substring(0, 8)}</div>
                  </div>
                </div>
              </td>

              {/* Email Address */}
              <td style={{ padding: '16px 20px', verticalAlign: 'middle', textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#4b5563', whiteSpace: 'nowrap', textAlign: 'left' }}>
                  <Mail size={13} style={{ color: '#9ca3af', flexShrink: 0 }} />
                  <span>{u.email}</span>
                </div>
              </td>

              {/* System Role */}
              <td style={{ padding: '16px 20px', verticalAlign: 'middle', textAlign: 'center' }}>
                <span style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  fontSize: '11.5px', 
                  fontWeight: 600,
                  padding: '5px 12px',
                  borderRadius: '20px',
                  backgroundColor: u.roleCode === 'SUPER_ADMIN' ? '#f5f3ff' : '#f0f9ff',
                  color: u.roleCode === 'SUPER_ADMIN' ? '#7c3aed' : '#0369a1',
                  border: `1px solid ${u.roleCode === 'SUPER_ADMIN' ? '#ddd6fe' : '#bae6fd'}`,
                  whiteSpace: 'nowrap'
                }}>
                  <Shield size={12} />
                  {u.role}
                </span>
              </td>

              {/* Date Registered */}
              <td style={{ padding: '16px 20px', verticalAlign: 'middle', textAlign: 'center', color: '#4b5563', whiteSpace: 'nowrap' }}>
                {u.joinedDate}
              </td>

              {/* Status */}
              <td style={{ padding: '16px 20px', verticalAlign: 'middle', textAlign: 'center' }}>
                <span style={{ 
                  display: 'inline-flex',
                  padding: '5px 12px', 
                  borderRadius: '20px', 
                  fontSize: '11.5px', 
                  fontWeight: 600, 
                  backgroundColor: u.status === 'Active' ? '#ecfdf5' : '#fef2f2',
                  color: u.status === 'Active' ? '#047857' : '#b91c1c',
                  border: `1px solid ${u.status === 'Active' ? '#a7f3d0' : '#fecaca'}`,
                  whiteSpace: 'nowrap'
                }}>
                  {u.status}
                </span>
              </td>

              {/* Actions */}
              <td style={{ padding: '16px 20px', verticalAlign: 'middle', textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', gap: '8px', whiteSpace: 'nowrap' }}>
                  <button 
                    onClick={() => onResetPassword(u.id, u.name)}
                    title="Reset Password"
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '4px',
                      border: '1px solid #d1d5db', 
                      padding: '6px 12px', 
                      borderRadius: '8px', 
                      fontSize: '12px', 
                      fontWeight: 600, 
                      color: '#374151', 
                      cursor: 'pointer', 
                      backgroundColor: '#fff',
                      transition: 'all 0.15s ease',
                      outline: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#9ca3af';
                      e.currentTarget.style.backgroundColor = '#f9fafb';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#d1d5db';
                      e.currentTarget.style.backgroundColor = '#fff';
                    }}
                  >
                    <Key size={12} /> Reset PW
                  </button>
                  <button 
                    onClick={() => onToggleStatus(u.id)}
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '4px',
                      border: `1px solid ${u.status === 'Active' ? '#fcd34d' : '#a7f3d0'}`, 
                      padding: '6px 12px', 
                      borderRadius: '8px', 
                      fontSize: '12px', 
                      fontWeight: 600, 
                      color: u.status === 'Active' ? '#b45309' : '#047857', 
                      cursor: 'pointer', 
                      backgroundColor: u.status === 'Active' ? '#fffbeb' : '#f0fdf4',
                      transition: 'all 0.15s ease',
                      outline: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = 'brightness(0.97)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = 'none';
                    }}
                  >
                    {u.status === 'Active' ? <Ban size={12} /> : <CheckCircle size={12} />}
                    {u.status === 'Active' ? 'Suspend' : 'Activate'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
