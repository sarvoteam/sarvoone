import React, { useState } from 'react';
import { BookOpen, Scale, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import './GeneralLedger.css';

const ledgerAccounts = [
  { id: '1010', code: '1010', name: 'Cash at Bank', type: 'Asset', balance: 15430, transactions: [
    { date: '2026-07-01', ref: 'JE-001', desc: 'Opening Balance Contribution', debit: 10000, credit: 0, bal: 10000 },
    { date: '2026-07-02', ref: 'INV-2026-009', desc: 'Cash Sale Received - Emily Lynch', debit: 1250, credit: 0, bal: 11250 },
    { date: '2026-07-03', ref: 'BILL-1002', desc: 'Supplier Payment - Astra Dist.', debit: 0, credit: 2800, bal: 8450 },
    { date: '2026-07-05', ref: 'JE-003', desc: 'Additional Capital Infusion', debit: 5000, credit: 0, bal: 13450 },
    { date: '2026-07-07', ref: 'REC-088', desc: 'Invoice Clearing Payment Rec.', debit: 1980, credit: 0, bal: 15430 }
  ]},
  { id: '1200', code: '1200', name: 'Accounts Receivable', type: 'Asset', balance: 3200, transactions: [
    { date: '2026-07-02', ref: 'INV-2026-007', desc: 'Credit Sale - Alexander M.', debit: 1250, credit: 0, bal: 1250 },
    { date: '2026-07-04', ref: 'INV-2026-008', desc: 'Credit Sale - John Doe', debit: 3200, credit: 0, bal: 4450 },
    { date: '2026-07-05', ref: 'REC-087', desc: 'Invoice Payment Received', debit: 0, credit: 1250, bal: 3200 }
  ]},
  { id: '1300', code: '1300', name: 'Stock Inventory', type: 'Asset', balance: 4500, transactions: [
    { date: '2026-07-01', ref: 'JE-001', desc: 'Opening Stock Balance', debit: 4000, credit: 0, bal: 4000 },
    { date: '2026-07-03', ref: 'BILL-1002', desc: 'Inventory Supply Restock', debit: 2800, credit: 0, bal: 6800 },
    { date: '2026-07-06', ref: 'COGS-002', desc: 'Cost of Goods Sold Deduction', debit: 0, credit: 2300, bal: 4500 }
  ]},
  { id: '2000', code: '2000', name: 'Accounts Payable', type: 'Liability', balance: 2800, transactions: [
    { date: '2026-07-03', ref: 'BILL-1002', desc: 'Purchased Inventory on Account', debit: 0, credit: 2800, bal: 2800 }
  ]},
  { id: '3000', code: '3000', name: 'Owner\'s Equity (Capital)', type: 'Equity', balance: 15000, transactions: [
    { date: '2026-07-01', ref: 'JE-001', desc: 'Opening Equity Deposit', debit: 0, credit: 10000, bal: 10000 },
    { date: '2026-07-05', ref: 'JE-003', desc: 'Additional Owner Investment', debit: 0, credit: 5000, bal: 15000 }
  ]},
  { id: '4000', code: '4000', name: 'Sales Revenue', type: 'Revenue', balance: 15230, transactions: [
    { date: '2026-07-02', ref: 'INV-2026-009', desc: 'Cash Sale Record', debit: 0, credit: 1250, bal: 1250 },
    { date: '2026-07-02', ref: 'INV-2026-007', desc: 'Credit Sale Record', debit: 0, credit: 1250, bal: 2500 },
    { date: '2026-07-04', ref: 'INV-2026-008', desc: 'Credit Sale Record', debit: 0, credit: 3200, bal: 5700 },
    { date: '2026-07-07', ref: 'INV-2026-010', desc: 'POS Wholesale Clearance', debit: 0, credit: 9530, bal: 15230 }
  ]},
  { id: '5000', code: '5000', name: 'Cost of Goods Sold', type: 'Expense', balance: 6900, transactions: [
    { date: '2026-07-02', ref: 'COGS-001', desc: 'Cost of Goods - Cash Sale', debit: 900, credit: 0, bal: 900 },
    { date: '2026-07-06', ref: 'COGS-002', desc: 'Cost of Goods - Credit Sales', debit: 6000, credit: 0, bal: 6900 }
  ]}
];

export default function GeneralLedger() {
  const [selectedAcc, setSelectedAcc] = useState(ledgerAccounts[0]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Ledger Headers */}
      <div className="ledger-summary-header">
        <div className="ledger-summary-card">
          <span className="ledger-card-label">Total Assets Balance</span>
          <span className="ledger-card-value">₹23,130.00</span>
        </div>
        <div className="ledger-summary-card">
          <span className="ledger-card-label">Liabilities + Equity</span>
          <span className="ledger-card-value">₹17,800.00</span>
        </div>
        <div className="ledger-summary-card" style={{ borderLeft: '4px solid #10b981' }}>
          <span className="ledger-card-label">Trial Balance Status</span>
          <span className="ledger-card-value" style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Scale size={18} /> Balanced
          </span>
        </div>
      </div>

      <div className="ledger-container">
        {/* Left Side Ledger Accounts List */}
        <div className="ledger-accounts-panel">
          <h3 className="ledger-panel-title">General Ledger Accounts</h3>
          <div className="ledger-account-list">
            {ledgerAccounts.map(acc => (
              <div 
                key={acc.id} 
                className={`ledger-account-item ${selectedAcc.id === acc.id ? 'active' : ''}`}
                onClick={() => setSelectedAcc(acc)}
              >
                <div className="account-info">
                  <span className="account-code">{acc.code} • {acc.type}</span>
                  <span className="account-name">{acc.name}</span>
                </div>
                <span className="account-balance">₹{acc.balance.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side Ledger Transaction Details */}
        <div className="ledger-transactions-panel">
          <div style={{ borderBottom: '1px solid #f3f4f6', paddingBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#1f2937' }}>
              Ledger Account Activity: {selectedAcc.name} ({selectedAcc.code})
            </h3>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280' }}>
              Account Type: {selectedAcc.type}
            </span>
          </div>

          <div className="dashboard-table-wrapper">
            <table className="ledger-transactions-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Reference</th>
                  <th>Description</th>
                  <th style={{ textAlign: 'right' }}>Debit (₹)</th>
                  <th style={{ textAlign: 'right' }}>Credit (₹)</th>
                  <th style={{ textAlign: 'right' }}>Running Balance (₹)</th>
                </tr>
              </thead>
              <tbody>
                {selectedAcc.transactions.map((t, idx) => (
                  <tr key={idx}>
                    <td>{t.date}</td>
                    <td style={{ fontWeight: 600, color: '#4b5563' }}>{t.ref}</td>
                    <td>{t.desc}</td>
                    <td style={{ textAlign: 'right' }} className="text-debit">
                      {t.debit > 0 ? `+${t.debit.toFixed(2)}` : '-'}
                    </td>
                    <td style={{ textAlign: 'right' }} className="text-credit">
                      {t.credit > 0 ? `-${t.credit.toFixed(2)}` : '-'}
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 700, color: '#111827' }}>
                      ₹{t.bal.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
