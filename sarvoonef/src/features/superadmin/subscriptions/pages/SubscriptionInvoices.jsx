import React, { useState } from 'react';
import InvoiceList from '../components/InvoiceList';

const initialInvoices = [
  { id: 1, invoiceNo: 'INV-2026-001', business: 'Sarvo Medical & General Store', date: '2026-07-09', amount: 2499, status: 'Paid' },
  { id: 2, invoiceNo: 'INV-2026-002', business: 'TechHub Devices & Wholesalers', date: '2026-07-08', amount: 5999, status: 'Paid' },
  { id: 3, invoiceNo: 'INV-2026-003', business: 'Vogue Boutique Apparel', date: '2026-07-07', amount: 999, status: 'Paid' },
  { id: 4, invoiceNo: 'INV-2026-004', business: 'Anastasia Grocery Outlet', date: '2026-07-06', amount: 999, status: 'Pending' },
  { id: 5, invoiceNo: 'INV-2026-005', business: 'Sovereign Wellness & Pharma', date: '2026-07-05', amount: 2499, status: 'Paid' }
];

export default function SubscriptionInvoices() {
  const [invoices] = useState(initialInvoices);

  const handleDownload = (invoiceNo) => {
    alert(`Downloading invoice file for: ${invoiceNo}.pdf`);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Platform Invoices</h2>
        <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#6b7280' }}>Review and download official PDF invoices generated for business subscription billing.</p>
      </div>

      <InvoiceList invoices={invoices} onDownload={handleDownload} />
    </div>
  );
}
