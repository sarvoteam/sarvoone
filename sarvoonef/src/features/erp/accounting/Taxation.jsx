import React, { useState } from 'react';
import { Percent, Plus, ShieldCheck } from 'lucide-react';

const initialTaxes = [
  { id: 1, name: 'GST @ 18%', rate: 18, type: 'State + Central GST', hsnGroup: 'Electronics & Services', status: 'Active' },
  { id: 2, name: 'GST @ 12%', rate: 12, type: 'State + Central GST', hsnGroup: 'Medicines & Medical kits', status: 'Active' },
  { id: 3, name: 'GST @ 5%', rate: 5, type: 'State + Central GST', hsnGroup: 'Supermarket Groceries', status: 'Active' },
  { id: 4, name: 'GST @ 0% Exempt', rate: 0, type: 'Exempt', hsnGroup: 'Essential raw foods', status: 'Active' }
];

export default function Taxation() {
  const [taxes, setTaxes] = useState(initialTaxes);

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>GST & Taxation Settings</h2>
        <button className="btn-primary" style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}>
          <Plus size={16} /> New Tax Rate
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', alignItems: 'start' }}>
        {/* Left Card: Tax summaries */}
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', backgroundColor: '#f9fafb' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 700 }}>Quarterly GST Liability</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justify: 'space-between', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>
              <span style={{ color: '#6b7280' }}>Input Tax Credit (ITC)</span>
              <span style={{ fontWeight: 700, color: '#10b981' }}>+₹3,374.00</span>
            </div>
            <div style={{ display: 'flex', justify: 'space-between', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>
              <span style={{ color: '#6b7280' }}>Output Tax Liability</span>
              <span style={{ fontWeight: 700, color: '#ef4444' }}>-₹8,141.00</span>
            </div>
            <div style={{ display: 'flex', justify: 'space-between', fontWeight: 'bold', fontSize: '14px' }}>
              <span>Net Tax Payable</span>
              <span style={{ color: '#7c3aed' }}>₹4,767.00</span>
            </div>
          </div>
        </div>

        {/* Right Card: Rates table */}
        <div className="dashboard-table-wrapper" style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 700 }}>Active Tax slabs</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f3f4f6' }}>
                <th style={{ padding: '10px', color: '#6b7280', fontWeight: 600 }}>Slab Label</th>
                <th style={{ padding: '10px', color: '#6b7280', fontWeight: 600 }}>Percentage</th>
                <th style={{ padding: '10px', color: '#6b7280', fontWeight: 600 }}>Tax Type</th>
                <th style={{ padding: '10px', color: '#6b7280', fontWeight: 600 }}>Applicable HSN Groups</th>
                <th style={{ padding: '10px', color: '#6b7280', fontWeight: 600, textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {taxes.map(t => (
                <tr key={t.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{t.name}</td>
                  <td style={{ padding: '12px', fontWeight: 700, color: '#7c3aed' }}>{t.rate}%</td>
                  <td style={{ padding: '12px' }}>{t.type}</td>
                  <td style={{ padding: '12px' }}>{t.hsnGroup}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <span style={{ 
                      padding: '2px 6px', 
                      borderRadius: '4px', 
                      fontSize: '11px', 
                      fontWeight: 700, 
                      backgroundColor: '#d1fae5',
                      color: '#065f46'
                    }}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
