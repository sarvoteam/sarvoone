import React, { useState } from 'react';
import { Plus, Trash2, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import './JournalEntries.css';

const initialEntries = [
  { id: 1, date: '2026-07-01', ref: 'JE-001', desc: 'Company Setup opening entries', lines: [
    { account: '1010 - Cash at Bank', debit: 10000, credit: 0 },
    { account: '1300 - Stock Inventory', debit: 4000, credit: 0 },
    { account: '3000 - Owner\'s Equity', debit: 0, credit: 14000 }
  ]},
  { id: 2, date: '2026-07-03', ref: 'JE-002', desc: 'Restock purchase on account', lines: [
    { account: '1300 - Stock Inventory', debit: 2800, credit: 0 },
    { account: '2000 - Accounts Payable', debit: 0, credit: 2800 }
  ]},
  { id: 3, date: '2026-07-05', ref: 'JE-003', desc: 'Additional cash capital infusion', lines: [
    { account: '1010 - Cash at Bank', debit: 5000, credit: 0 },
    { account: '3000 - Owner\'s Equity', debit: 0, credit: 5000 }
  ]}
];

const accountOptions = [
  '1010 - Cash at Bank',
  '1200 - Accounts Receivable',
  '1300 - Stock Inventory',
  '2000 - Accounts Payable',
  '3000 - Owner\'s Equity',
  '4000 - Sales Revenue',
  '5000 - Cost of Goods Sold'
];

export default function JournalEntries() {
  const [entries, setEntries] = useState(initialEntries);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [date, setDate] = useState('2026-07-08');
  const [ref, setRef] = useState('');
  const [desc, setDesc] = useState('');
  const [formLines, setFormLines] = useState([
    { account: '1010 - Cash at Bank', debit: 0, credit: 0 },
    { account: '3000 - Owner\'s Equity', debit: 0, credit: 0 }
  ]);

  const handleAddLine = () => {
    setFormLines([...formLines, { account: '1010 - Cash at Bank', debit: 0, credit: 0 }]);
  };

  const handleRemoveLine = (idx) => {
    if (formLines.length <= 2) return;
    setFormLines(formLines.filter((_, i) => i !== idx));
  };

  const handleLineChange = (idx, field, value) => {
    const updated = formLines.map((line, i) => {
      if (i === idx) {
        return { 
          ...line, 
          [field]: field === 'account' ? value : Number(value) 
        };
      }
      return line;
    });
    setFormLines(updated);
  };

  // Math totals
  const totalDebit = formLines.reduce((sum, line) => sum + line.debit, 0);
  const totalCredit = formLines.reduce((sum, line) => sum + line.credit, 0);
  const isBalanced = totalDebit > 0 && totalDebit === totalCredit;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isBalanced) return;
    if (!ref || !desc) {
      alert('Please fill in Reference and Description.');
      return;
    }

    const newEntry = {
      id: Date.now(),
      date,
      ref,
      desc,
      lines: formLines.filter(line => line.debit > 0 || line.credit > 0)
    };

    setEntries([newEntry, ...entries]);
    setIsModalOpen(false);
    
    // Reset form
    setRef('');
    setDesc('');
    setFormLines([
      { account: '1010 - Cash at Bank', debit: 0, credit: 0 },
      { account: '3000 - Owner\'s Equity', debit: 0, credit: 0 }
    ]);
  };

  return (
    <div className="journal-container">
      <div className="journal-header-bar">
        <h2 className="journal-title">Double Entry Journal Logs</h2>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={16} />
          <span>New Journal Entry</span>
        </button>
      </div>

      <div className="dashboard-table-wrapper">
        <table className="journal-entries-table">
          <thead>
            <tr>
              <th style={{ width: '100px' }}>Date</th>
              <th style={{ width: '100px' }}>Reference</th>
              <th>Narration / Account Entries</th>
              <th style={{ textRight: 'right', width: '120px', textAlign: 'right' }}>Debit (₹)</th>
              <th style={{ textRight: 'right', width: '120px', textAlign: 'right' }}>Credit (₹)</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(entry => (
              <tr key={entry.id}>
                <td style={{ fontWeight: 600, color: '#4b5563' }}>{entry.date}</td>
                <td style={{ fontWeight: 700, color: '#111827' }}>{entry.ref}</td>
                <td>
                  <div style={{ fontWeight: 600, color: '#1f2937', marginBottom: '6px' }}>{entry.desc}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {entry.lines.map((line, idx) => (
                      <div key={idx} style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        paddingLeft: line.credit > 0 ? '20px' : '0px',
                        fontSize: '12px',
                        color: line.credit > 0 ? '#6b7280' : '#374151'
                      }}>
                        <span>{line.account}</span>
                        <div style={{ display: 'flex', gap: '30px' }}>
                          <span style={{ width: '80px', textAlign: 'right' }}>
                            {line.debit > 0 ? `₹${line.debit.toFixed(2)}` : ''}
                          </span>
                          <span style={{ width: '80px', textAlign: 'right' }}>
                            {line.credit > 0 ? `₹${line.credit.toFixed(2)}` : ''}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
                <td></td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form Dialog */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            width: '100%',
            maxWidth: '650px',
            borderRadius: '16px',
            padding: '24px',
            boxSizing: 'border-box',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
          }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f3f4f6', paddingBottom: '12px', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Record Journal Entry</h3>
              <button className="drawer-close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4b5563', marginBottom: '6px' }}>Date</label>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4b5563', marginBottom: '6px' }}>Reference (e.g. JE-004)</label>
                  <input type="text" placeholder="JE-004" value={ref} onChange={(e) => setRef(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4b5563', marginBottom: '6px' }}>Description / Narration</label>
                <input type="text" placeholder="Record cash payment for rent office" value={desc} onChange={(e) => setDesc(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px', boxSizing: 'border-box' }} />
              </div>

              {/* Dynamic Ledger Lines */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '10px', borderBottom: '1px solid #f3f4f6', paddingBottom: '6px' }}>
                  Entry Lines
                </label>
                <div style={{ maxHeight: '200px', overflowY: 'auto', paddingRight: '4px' }}>
                  {formLines.map((line, idx) => (
                    <div key={idx} className="double-entry-row">
                      <select 
                        value={line.account} 
                        onChange={(e) => handleLineChange(idx, 'account', e.target.value)}
                        style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', width: '100%', backgroundColor: '#fff' }}
                      >
                        {accountOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                      <input 
                        type="number" 
                        placeholder="Debit (₹)" 
                        value={line.debit || ''} 
                        onChange={(e) => handleLineChange(idx, 'debit', e.target.value)}
                        style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px', width: '100%', boxSizing: 'border-box' }}
                        disabled={line.credit > 0}
                      />
                      <input 
                        type="number" 
                        placeholder="Credit (₹)" 
                        value={line.credit || ''} 
                        onChange={(e) => handleLineChange(idx, 'credit', e.target.value)}
                        style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px', width: '100%', boxSizing: 'border-box' }}
                        disabled={line.debit > 0}
                      />
                      <button 
                        type="button" 
                        className="trash-btn" 
                        onClick={() => handleRemoveLine(idx)}
                        disabled={formLines.length <= 2}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <button type="button" className="btn-secondary" onClick={handleAddLine} style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px' }}>
                  <Plus size={14} /> Add Line
                </button>
              </div>

              {/* Balanced Status bar */}
              <div className={`balance-status-bar ${isBalanced ? 'balanced' : 'unbalanced'}`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {isBalanced ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  <span>{isBalanced ? 'Balanced: Ready to Post' : 'Unbalanced: Debits must equal Credits (and be greater than 0)'}</span>
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <span>Debit: ₹{totalDebit.toFixed(2)}</span>
                  <span>Credit: ₹{totalCredit.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '14px' }}>
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: '12px' }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={!isBalanced} style={{ flex: 1, padding: '12px', display: 'flex', justifyContent: 'center', opacity: isBalanced ? 1 : 0.5, cursor: isBalanced ? 'pointer' : 'not-allowed' }}>
                  Post Ledger Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
