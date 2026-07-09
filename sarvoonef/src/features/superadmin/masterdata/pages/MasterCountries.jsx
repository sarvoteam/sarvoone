import React, { useState } from 'react';
import CountryGrid from '../components/CountryGrid';

const initialCountries = [
  { id: 1, name: 'India', iso: 'IN', currency: 'INR', symbol: '₹', status: 'Active' },
  { id: 2, name: 'United Arab Emirates', iso: 'AE', currency: 'AED', symbol: 'د.إ', status: 'Active' },
  { id: 3, name: 'Saudi Arabia', iso: 'SA', currency: 'SAR', symbol: 'ر.س', status: 'Active' },
  { id: 4, name: 'United States', iso: 'US', currency: 'USD', symbol: '$', status: 'Inactive' }
];

export default function MasterCountries() {
  const [countries, setCountries] = useState(initialCountries);

  const handleToggle = (id) => {
    setCountries(countries.map(c => {
      if (c.id === id) {
        const nextStatus = c.status === 'Active' ? 'Inactive' : 'Active';
        alert(`Operations in ${c.name} set to ${nextStatus}`);
        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Master Operating Countries</h2>
        <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#6b7280' }}>Define country listings, taxation currencies, and symbol rules used in invoicing layouts.</p>
      </div>

      <CountryGrid countries={countries} onToggleCountry={handleToggle} />
    </div>
  );
}
