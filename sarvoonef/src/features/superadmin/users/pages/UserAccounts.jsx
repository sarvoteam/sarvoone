import React from 'react';
import UserTable from '../components/UserTable';
import { Search, Loader2 } from 'lucide-react';
import { useUserAccounts } from '../hooks/useUserAccounts';

export default function UserAccounts() {
  const {
    users,
    loading,
    error,
    search,
    setSearch,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    toggleStatus,
    resetPassword
  } = useUserAccounts();

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>System User Accounts</h2>
        <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#6b7280' }}>Monitor registered system credentials, modify user authorization roles, and toggle account activation status.</p>
      </div>

      {/* Search & Dynamic Dropdown Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '18px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', flex: 1, minWidth: '280px' }}>
          <Search style={{ position: 'absolute', left: '12px', color: '#9ca3af' }} size={16} />
          <input 
            type="text" 
            placeholder="Search by name, email..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '10px 12px 10px 38px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13.5px', outline: 'none' }}
          />
        </div>

        {/* Role Filter */}
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          style={{
            padding: '10px 16px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '13.5px',
            outline: 'none',
            backgroundColor: '#fff',
            color: '#374151',
            cursor: 'pointer',
            fontWeight: 500,
            minWidth: '150px'
          }}
        >
          <option value="">All Roles</option>
          <option value="SUPER_ADMIN">Super Admin</option>
          <option value="BUSINESS_OWNER">Business Owner</option>
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: '10px 16px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '13.5px',
            outline: 'none',
            backgroundColor: '#fff',
            color: '#374151',
            cursor: 'pointer',
            fontWeight: 500,
            minWidth: '140px'
          }}
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Suspended">Suspended</option>
        </select>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0', gap: '12px', color: '#6b7280' }}>
          <Loader2 className="animate-spin" size={24} style={{ color: '#7c3aed' }} />
          <span style={{ fontSize: '14px' }}>Loading accounts...</span>
        </div>
      ) : error ? (
        <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fee2e2', color: '#b91c1c', padding: '16px', borderRadius: '8px', fontSize: '13.5px', textAlign: 'center' }}>
          {error}
        </div>
      ) : (
        <UserTable 
          users={users} 
          onResetPassword={resetPassword} 
          onToggleStatus={toggleStatus} 
        />
      )}
    </div>
  );
}
