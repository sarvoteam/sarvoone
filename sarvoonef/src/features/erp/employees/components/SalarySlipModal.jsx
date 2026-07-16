import React from 'react';
import { X, Printer, CheckCircle } from 'lucide-react';

export default function SalarySlipModal({ isOpen, onClose, employee }) {
  if (!isOpen || !employee) return null;

  // Salary calculations
  const basic = employee.salary;
  const hra = Math.round(basic * 0.40);
  const allowance = Math.round(basic * 0.15);
  const totalEarnings = basic + hra + allowance;

  const pf = Math.round(basic * 0.12);
  const pt = 200; // standard professional tax
  const totalDeductions = pf + pt;

  const netSalary = totalEarnings - totalDeductions;

  const handlePrint = () => {
    window.print();
  };

  const todayStr = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)' }}>
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #printable-salary-slip, #printable-salary-slip * {
              visibility: visible;
            }
            #printable-salary-slip {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              border: none !important;
              box-shadow: none !important;
              padding: 0 !important;
            }
          }
        `}
      </style>
      
      <div 
        id="printable-salary-slip"
        style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '580px', borderRadius: '16px', padding: '28px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)', maxHeight: '90vh', overflowY: 'auto', boxSizing: 'border-box', fontFamily: 'system-ui, -apple-system, sans-serif', border: '1px solid #e2e8f0' }}
      >
        
        {/* Top Header Actions (Hidden on print via standard CSS or print media) */}
        <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>Salary Slip</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={handlePrint}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '12.5px', fontWeight: 700, color: '#475569', cursor: 'pointer', backgroundColor: '#fff' }}
            >
              <Printer size={15} /> Print Slip
            </button>
            <button 
              onClick={onClose}
              style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8', padding: '4px' }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Slip Body */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#7c3aed', letterSpacing: '-0.5px' }}>Sarvo One Retailers</h2>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>Bandra BKC, Mumbai | Corporate Office Ledger</p>
            <div style={{ display: 'inline-block', marginTop: '12px', padding: '4px 10px', backgroundColor: '#d1fae5', borderRadius: '12px', fontSize: '11px', fontWeight: 800, color: '#065f46' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle size={12} /> Paid Ledger Statement
              </div>
            </div>
          </div>

          {/* Employee Metadata */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #e2e8f0', fontSize: '12.5px' }}>
            <div>
              <div style={{ color: '#64748b', marginBottom: '2px' }}>Employee Name</div>
              <div style={{ fontWeight: 700, color: '#1e293b' }}>{employee.name}</div>
            </div>
            <div>
              <div style={{ color: '#64748b', marginBottom: '2px' }}>Designation / Role</div>
              <div style={{ fontWeight: 700, color: '#1e293b' }}>{employee.role}</div>
            </div>
            <div>
              <div style={{ color: '#64748b', marginBottom: '2px' }}>Email Address</div>
              <div style={{ fontWeight: 600, color: '#334155' }}>{employee.email || 'N/A'}</div>
            </div>
            <div>
              <div style={{ color: '#64748b', marginBottom: '2px' }}>Statement Date</div>
              <div style={{ fontWeight: 600, color: '#334155' }}>{todayStr}</div>
            </div>
          </div>

          {/* Details Table */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
            
            {/* Earnings */}
            <div>
              <h4 style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: 800, color: '#0f172a', borderBottom: '2px solid #7c3aed', paddingBottom: '6px' }}>EARNINGS</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                  <span>Basic Salary:</span>
                  <span style={{ fontWeight: 600, color: '#1e293b' }}>₹{basic.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                  <span>HRA (40%):</span>
                  <span style={{ fontWeight: 600, color: '#1e293b' }}>₹{hra.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                  <span>Special Allowance:</span>
                  <span style={{ fontWeight: 600, color: '#1e293b' }}>₹{allowance.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#0f172a', borderTop: '1px dashed #cbd5e1', paddingTop: '8px', marginTop: '4px' }}>
                  <span>Gross Earnings:</span>
                  <span>₹{totalEarnings.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Deductions */}
            <div>
              <h4 style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: 800, color: '#0f172a', borderBottom: '2px solid #ef4444', paddingBottom: '6px' }}>DEDUCTIONS</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                  <span>Provident Fund (PF):</span>
                  <span style={{ fontWeight: 600, color: '#1e293b' }}>₹{pf.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                  <span>Professional Tax (PT):</span>
                  <span style={{ fontWeight: 600, color: '#1e293b' }}>₹{pt.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569', minHeight: '18px' }}>
                  <span>&nbsp;</span>
                  <span>&nbsp;</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#0f172a', borderTop: '1px dashed #cbd5e1', paddingTop: '8px', marginTop: '4px' }}>
                  <span>Total Deductions:</span>
                  <span>₹{totalDeductions.toLocaleString()}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Net Pay summary */}
          <div style={{ backgroundColor: 'rgba(124, 58, 237, 0.05)', border: '1px solid rgba(124, 58, 237, 0.15)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Net Monthly Take-home</span>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>₹{netSalary.toLocaleString()}</div>
            </div>
            <div style={{ textAlign: 'right', fontSize: '11.5px', color: '#64748b' }}>
              <div>Reference ID: PAY-{employee.id.slice(0, 8).toUpperCase()}</div>
              <div>Authorized Signatory</div>
            </div>
          </div>

          {/* Footer note */}
          <div style={{ textAlign: 'center', fontSize: '11px', color: '#94a3b8', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
            This is a computer-generated document and does not require a physical signature.
          </div>

        </div>

      </div>
    </div>
  );
}
