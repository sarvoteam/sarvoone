import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const categoryData = [
  { name: 'Medical', stores: 22 },
  { name: 'Clothing', stores: 45 },
  { name: 'Electronics', stores: 12 },
  { name: 'Grocery', stores: 58 },
  { name: 'Restaurant', stores: 37 }
];

export default function BusinessGrowthStats() {
  return (
    <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
      <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700, color: '#374151' }}>Onboarded Stores by Category Sector</h3>
      <div style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="name" stroke="#9ca3af" fontSize={11} tickLine={false} />
            <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} />
            <Tooltip />
            <Bar dataKey="stores" fill="#7c3aed" radius={[4, 4, 0, 0]} name="Registered Storefronts" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
