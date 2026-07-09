import React, { useState } from 'react';
import UserTable from '../components/UserTable';
import { Search } from 'lucide-react';

const initialUsers = [
  { id: 1, name: 'Emily Lynch', email: 'sarvooneteam@gmail.com', role: 'Super Admin', status: 'Active', joinedDate: '2026-07-08' },
  { id: 2, name: 'Rohit Ghanghav', email: 'rohit.ghanghav6633@gmail.com', role: 'Business Owner', status: 'Active', joinedDate: '2026-07-09' },
  { id: 3, name: 'Alexander Medvedev', email: 'alex.med@gmail.com', role: 'Business Owner', status: 'Active', joinedDate: '2026-07-09' },
  { id: 4, name: 'Anastasia Golovko', email: 'anastasia@outlook.com', role: 'Business Owner', status: 'Suspended', joinedDate: '2026-07-09' }
];

export default function UserAccounts() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');

  const toggleStatus = (id) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        const newStatus = u.status === 'Active' ? 'Suspended' : 'Active';
        alert(`User account for "${u.name}" is now ${newStatus}`);
        return { ...u, status: newStatus };
      }
      return u;
    }));
  };

  const resetPassword = (id, name) => {
    if (window.confirm(`Reset password for user "${name}" to default: "reset2026"?`)) {
      alert(`Password for user "${name}" has been reset to "reset2026".`);
    }
  };

  const filtered = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>System User Accounts</h2>
        <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#6b7280' }}>Monitor registered system credentials, modify user authorization roles, and toggle account activation status.</p>
      </div>

      {/* Search Filter */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '18px' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', flex: 1 }}>
          <Search style={{ position: 'absolute', left: '12px', color: '#9ca3af' }} size={16} />
          <input 
            type="text" 
            placeholder="Search by name, email, or authorization role..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '10px 12px 10px 38px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13.5px', outline: 'none' }}
          />
        </div>
      </div>

      <UserTable 
        users={filtered} 
        onResetPassword={resetPassword} 
        onToggleStatus={toggleStatus} 
      />
    </div>
  );
}
