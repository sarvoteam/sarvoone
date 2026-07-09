import React, { useState } from 'react';
import { FileText, Download, TrendingUp, Calendar, ChevronRight } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const reportTypes = [
  { title: 'Inventory Valuation Report', desc: 'Summary of current stock value, assets value, and margin potential.', type: 'Inventory' },
  { title: 'GST Liability GSTR-1 Ledger', desc: 'Calculate quarterly sales taxes, ITC margins, and invoice tallies.', type: 'Tax' },
  { title: 'Sales Summary Sheet', desc: 'Categorized sales volume, customer totals, and invoice registers.', type: 'Sales' },
  { title: 'Loss & Gain Statement', desc: 'Profit margins statement comparing expenses to sales revenues.', type: 'Finance' }
];

const annualComparison = [
  { year: '2022', Sales: 240000, Expenses: 180000 },
  { year: '2023', Sales: 310000, Expenses: 220000 },
  { year: '2024', Sales: 420000, Expenses: 270000 },
  { year: '2025', Sales: 560000, Expenses: 310000 }
];

export default function Reports() {
  const [reports, setReports] = useState(reportTypes);

  const handleExport = (title) => {
    alert(`Generating & exporting "${title}" in PDF/Excel format...`);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', fontFamily: 'system-ui, sans-serif' }}>
      {/* Left panel: List reports templates */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
        <h2 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Available Audit Reports</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {reports.map((rep, idx) => (
            <div key={idx} style={{ border: '1px solid #f3f4f6', borderRadius: '8px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9fafb' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: '#f3e8ff', color: '#7c3aed', width: '36px', height: '36px', borderRadius: '6px', display: 'flex', alignItems: 'center', justify: 'center', flexShrink: 0 }}>
                  <FileText size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', marginBottom: '2px' }}>{rep.title}</div>
                  <div style={{ fontSize: '12px', color: '#6b7280', lineHeight: '135%' }}>{rep.desc}</div>
                </div>
              </div>
              <button 
                onClick={() => handleExport(rep.title)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7c3aed', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justify: 'center' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#eff6ff'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                title="Download Report"
              >
                <Download size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel: Analytical charts summaries */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Annual Revenue vs Expense</h2>
        
        <div style={{ flex: 1, minHeight: '260px', width: '100%' }}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={annualComparison} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="year" stroke="#9ca3af" fontSize={11} tickLine={false} />
              <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="Sales" fill="#7c3aed" radius={[4, 4, 0, 0]} name="Sales (₹)" />
              <Bar dataKey="Expenses" fill="#0891b2" radius={[4, 4, 0, 0]} name="Expenses (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '14px', display: 'flex', justify: 'space-between', fontSize: '12px', color: '#6b7280' }}>
          <span>Fiscal Calendar: **April - March**</span>
          <span style={{ color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={14} /> +33.3% Compound Growth
          </span>
        </div>
      </div>
    </div>
  );
}
