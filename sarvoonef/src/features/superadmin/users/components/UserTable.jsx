import React from 'react';
import { UserCheck, Mail, Shield, Key, Ban, CheckCircle } from 'lucide-react';

export default function UserTable({ users, onResetPassword, onToggleStatus }) {
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f3f4f6', backgroundColor: '#fafafa' }}>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Full Name</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Email Address</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>System Role</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Date Registered</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600 }}>Status</th>
            <th style={{ padding: '14px 16px', color: '#4b5563', fontWeight: 600, textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: u.role === 'Super Admin' ? '#f5f3ff' : '#e0f2fe', color: u.role === 'Super Admin' ? '#7c3aed' : '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <UserCheck size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: '#1f2937' }}>{u.name}</div>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>User-ID: {u.id}0922</div>
                  </div>
                </div>
              </td>
              <td style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4b5563' }}>
                  <Mail size={13} style={{ color: '#9ca3af' }} />
                  <span>{u.email}</span>
                </div>
              </td>
              <td style={{ padding: '14px 16px' }}>
                <span style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '4px', 
                  fontSize: '12px', 
                  fontWeight: 600,
                  color: u.role === 'Super Admin' ? '#7c3aed' : '#0ea5e9'
                }}>
                  <Shield size={12} /> {u.role}
                </span>
              </td>
              <td style={{ padding: '14px 16px', color: '#6b7280' }}>{u.joinedDate}</td>
              <td style={{ padding: '14px 16px' }}>
                <span style={{ 
                  padding: '4px 8px', 
                  borderRadius: '6px', 
                  fontSize: '11px', 
                  fontWeight: 700, 
                  backgroundColor: u.status === 'Active' ? '#d1fae5' : '#fee2e2',
                  color: u.status === 'Active' ? '#065f46' : '#b91c1c'
                }}>
                  {u.status}
                </span>
              </td>
              <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  <button 
                    onClick={() => onResetPassword(u.id, u.name)}
                    title="Reset Password"
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '4px',
                      border: '1px solid #e5e7eb', 
                      padding: '6px 10px', 
                      borderRadius: '6px', 
                      fontSize: '11.5px', 
                      fontWeight: 600, 
                      color: '#4b5563', 
                      cursor: 'pointer', 
                      backgroundColor: '#fff' 
                    }}
                  >
                    <Key size={12} /> Reset PW
                  </button>
                  <button 
                    onClick={() => onToggleStatus(u.id)}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '4px',
                      border: '1px solid #e5e7eb', 
                      padding: '6px 10px', 
                      borderRadius: '6px', 
                      fontSize: '11.5px', 
                      fontWeight: 600, 
                      color: u.status === 'Active' ? '#d97706' : '#059669', 
                      cursor: 'pointer', 
                      backgroundColor: '#fff' 
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
