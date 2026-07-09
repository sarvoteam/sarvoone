import React, { useState } from 'react';
import CityTable from '../components/CityTable';
import { Plus } from 'lucide-react';

const initialCities = [
  { id: 1, name: 'New Delhi', state: 'Delhi (DL)', country: 'India' },
  { id: 2, name: 'Mumbai', state: 'Maharashtra (MH)', country: 'India' },
  { id: 3, name: 'Bengaluru', state: 'Karnataka (KA)', country: 'India' },
  { id: 4, name: 'Dubai', state: 'Dubai Emirate', country: 'United Arab Emirates' }
];

export default function MasterCities() {
  const [cities, setCities] = useState(initialCities);

  const handleDelete = (id) => {
    if (confirm('Delete this city mapping? Retail stores located here will not be affected but new ones cannot register under it.')) {
      setCities(cities.filter(c => c.id !== id));
    }
  };

  const handleCreate = () => {
    const name = prompt('Enter city name:');
    const state = prompt('Enter state/region name:');
    const country = prompt('Enter country name:');
    if (name) {
      setCities([...cities, {
        id: Date.now(),
        name,
        state: state || 'Other State',
        country: country || 'India'
      }]);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Master Operating Cities</h2>
          <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#6b7280' }}>Manage list of allowable cities merchants can register branches under.</p>
        </div>

        <button 
          onClick={handleCreate}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#7c3aed', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
        >
          <Plus size={16} /> Add City
        </button>
      </div>

      <CityTable cities={cities} onDelete={handleDelete} />
    </div>
  );
}
