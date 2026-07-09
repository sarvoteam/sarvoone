import React from 'react';
import { Search, Plus } from 'lucide-react';

export default function BusinessFilters({ search, setSearch, onOnboard }) {
  return (
    <div style={{ display: 'flex', gap: '12px', marginBottom: '18px', alignItems: 'center' }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', flex: 1 }}>
        <Search style={{ position: 'absolute', left: '12px', color: '#9ca3af' }} size={16} />
        <input 
          type="text" 
          placeholder="Search business name, owner name or email..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: '100%', padding: '10px 12px 10px 38px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13.5px', outline: 'none' }}
        />
      </div>
      <button 
        onClick={onOnboard}
        style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#7c3aed', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', height: '40px' }}
      >
        <Plus size={16} /> Onboard Storefront
      </button>
    </div>
  );
}
