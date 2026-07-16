import React from 'react';
import { Loader2, AlertCircle, Users, Receipt, CreditCard } from 'lucide-react';

export default function EmployeeTable({ employees, loading, error, onReload, onGenerateSlip, onRecordPayment }) {
  
  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: '10px', color: '#6b7280', minHeight: '300px' }}>
        <Loader2 className="animate-spin" size={32} style={{ color: '#7c3aed' }} />
        <span style={{ fontSize: '13px', fontWeight: 600 }}>Loading staff records...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: '10px', color: '#dc2626', padding: '20px', textAlign: 'center', minHeight: '300px' }}>
        <AlertCircle size={32} />
        <span style={{ fontSize: '13px', fontWeight: 600 }}>{error}</span>
        <button onClick={onReload} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', marginTop: '10px' }}>Try Again</button>
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, color: '#9ca3af', padding: '20px', textAlign: 'center', minHeight: '300px' }}>
        <Users size={32} style={{ marginBottom: '10px', color: '#cbd5e1' }} />
        <span style={{ fontSize: '13px', fontWeight: 600 }}>No employees onboarded.</span>
        <span style={{ fontSize: '11.5px', marginTop: '2px' }}>Click "Onboard Staff" to register your first worker.</span>
      </div>
    );
  }

  return (
    <div className="dashboard-table-wrapper" style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid rgba(226, 232, 240, 0.8)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left', minWidth: '700px' }}>
        <thead>
          <tr style={{ backgroundColor: '#faf5ff', borderBottom: '2px solid rgba(124, 58, 237, 0.12)' }}>
            <th style={{ width: '45%', padding: '16px 20px', fontSize: '11px', fontWeight: 700, color: '#6b21a8', textTransform: 'uppercase', letterSpacing: '0.6px', borderTopLeftRadius: '12px' }}>Employee Details</th>
            <th style={{ width: '25%', padding: '16px 20px', fontSize: '11px', fontWeight: 700, color: '#6b21a8', textTransform: 'uppercase', letterSpacing: '0.6px', textAlign: 'left' }}>Basic Monthly Salary</th>
            <th style={{ width: '30%', padding: '16px 20px', fontSize: '11px', fontWeight: 700, color: '#6b21a8', textTransform: 'uppercase', letterSpacing: '0.6px', borderTopRightRadius: '12px', textAlign: 'right' }}>Payroll & Payment Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(e => {
            return (
              <tr key={e.id} style={{ borderBottom: '1px solid rgba(124, 58, 237, 0.05)', transition: 'background-color 0.15s ease' }} className="hover:bg-slate-50">
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '12px', 
                      backgroundColor: 'rgba(124, 58, 237, 0.06)', 
                      color: '#7c3aed', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontWeight: 800,
                      fontSize: '15px',
                      border: '1.5px solid rgba(124, 58, 237, 0.12)'
                    }}>
                      {e.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '14px' }}>{e.name}</div>
                      <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px', fontWeight: 500 }}>{e.role}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '14.5px' }}>
                      ₹{e.salary ? e.salary.toLocaleString('en-IN') : '0'}
                    </span>
                    <span style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                      INR / Month
                    </span>
                  </div>
                </td>
                <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <button 
                      onClick={() => onGenerateSlip(e)}
                      style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 16px', 
                        borderRadius: '8px', 
                        fontSize: '12px', 
                        fontWeight: 700, 
                        color: '#7c3aed', 
                        cursor: 'pointer',
                        border: '1px solid rgba(124, 58, 237, 0.25)',
                        backgroundColor: '#ffffff',
                        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(event) => {
                        event.currentTarget.style.backgroundColor = 'rgba(124, 58, 237, 0.04)';
                        event.currentTarget.style.borderColor = '#7c3aed';
                      }}
                      onMouseLeave={(event) => {
                        event.currentTarget.style.backgroundColor = '#ffffff';
                        event.currentTarget.style.borderColor = 'rgba(124, 58, 237, 0.25)';
                      }}
                    >
                      <Receipt size={14} /> Slip
                    </button>
                    <button 
                      onClick={() => onRecordPayment(e)}
                      className="btn-primary"
                      style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 16px', 
                        borderRadius: '8px', 
                        fontSize: '12px', 
                        fontWeight: 700, 
                        cursor: 'pointer',
                        boxShadow: '0 1px 2px 0 rgba(124, 58, 237, 0.3)',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <CreditCard size={14} /> Pay
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

