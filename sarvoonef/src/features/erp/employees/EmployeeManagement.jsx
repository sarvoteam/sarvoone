import React, { useState } from 'react';
import { Search, Plus, Calendar, BadgeDollarSign, ShieldAlert } from 'lucide-react';

const initialEmployees = [
  { id: 1, name: 'Emily Lynch', role: 'Production Line Expert', email: 'e.lynch@gmail.com', attendance: 'Present', checkIn: '09:00 AM', salary: 3800 },
  { id: 2, name: 'Alexander Medvedev', role: 'Sales Man, Accountant', email: 'alex.med@gmail.com', attendance: 'Present', checkIn: '08:45 AM', salary: 3200 },
  { id: 3, name: 'Marques Brownley', role: 'Data Analyst', email: 'mkbhd@gmail.com', attendance: 'Absent', checkIn: '--', salary: 4500 },
  { id: 4, name: 'Anastasia Golovko', role: 'Stock Accountant', email: 'anastasia@outlook.com', attendance: 'Present', checkIn: '09:15 AM', salary: 2900 }
];

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [search, setSearch] = useState('');

  const filtered = employees.filter(e => 
    e.name.toLowerCase().includes(search.toLowerCase()) || 
    e.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Staff Registry & Payroll Records</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search style={{ position: 'absolute', left: '10px', color: '#9ca3af' }} size={16} />
            <input 
              type="text" 
              placeholder="Search staff..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: '8px 12px 8px 32px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', width: '200px', outline: 'none' }}
            />
          </div>
          <button className="btn-primary" style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}>
            <Plus size={16} /> Onboard Staff
          </button>
        </div>
      </div>

      <div className="dashboard-table-wrapper">
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f3f4f6' }}>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Employee Details</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Shift Check-In</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Today Attendance</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Basic Monthly Salary</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600, textAlign: 'right' }}>Payroll Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(e => (
              <tr key={e.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#eff6ff', color: '#1d4ed8', display: 'flex', alignItems: 'center', justify: 'center', fontWeight: 'bold' }}>
                      {e.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: '#1f2937' }}>{e.name}</div>
                      <div style={{ fontSize: '11px', color: '#9ca3af' }}>{e.role}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '12px', fontWeight: 600, color: '#4b5563' }}>{e.checkIn}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '11px', 
                    fontWeight: 700, 
                    backgroundColor: e.attendance === 'Present' ? '#d1fae5' : '#fee2e2',
                    color: e.attendance === 'Present' ? '#065f46' : '#b91c1c'
                  }}>
                    {e.attendance}
                  </span>
                </td>
                <td style={{ padding: '12px', fontWeight: 700 }}>₹{e.salary.toLocaleString()}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <button 
                    onClick={() => alert(`Generating pay slip for ${e.name} of amount ₹${e.salary}...`)}
                    style={{ border: '1px solid #e5e7eb', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, color: '#7c3aed', cursor: 'pointer', backgroundColor: '#fff' }}
                  >
                    Generate Salary Slip
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
