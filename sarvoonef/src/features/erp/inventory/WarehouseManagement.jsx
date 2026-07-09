import React, { useState } from 'react';
import { Plus, Home, MapPin, Package } from 'lucide-react';

const initialWarehouses = [
  { id: 1, name: 'Central Warehouse', code: 'WH-MAIN', location: 'Industrial Zone A, Hub', totalCapacity: '50,000 units', currentStock: '34,200 units', manager: 'John Stark' },
  { id: 2, name: 'City Retail Depot', code: 'WH-CITY', location: 'Commercial Area Block C', totalCapacity: '15,000 units', currentStock: '8,400 units', manager: 'Bruce Banner' },
  { id: 3, name: 'Medical Storage Cold Wing', code: 'WH-MED-COLD', location: 'Specialty Zone B (Temp Controlled)', totalCapacity: '5,000 units', currentStock: '2,100 units', manager: 'Dr. Stephen Strange' }
];

export default function WarehouseManagement() {
  const [warehouses, setWarehouses] = useState(initialWarehouses);

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Warehouses & Depot Management</h2>
        <button className="btn-primary" style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}>
          <Plus size={16} /> Add Warehouse
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {warehouses.map(wh => (
          <div key={wh.id} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', backgroundColor: '#f9fafb', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div style={{ backgroundColor: '#7c3aed', color: '#fff', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justify: 'center' }}>
                <Home size={20} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#1f2937' }}>{wh.name}</h3>
                <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 700 }}>{wh.code}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#4b5563', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={14} style={{ color: '#9ca3af' }} />
                <span>{wh.location}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Package size={14} style={{ color: '#9ca3af' }} />
                <span>Stock: <strong>{wh.currentStock}</strong> / {wh.totalCapacity}</span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '12px', fontSize: '12px', color: '#6b7280', display: 'flex', justify: 'space-between' }}>
              <span>Manager: <strong>{wh.manager}</strong></span>
              <span style={{ color: '#7c3aed', fontWeight: 700, cursor: 'pointer' }}>View Stocks</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
