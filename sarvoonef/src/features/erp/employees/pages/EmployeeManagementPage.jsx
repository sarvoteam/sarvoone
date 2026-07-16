import React, { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import { fetchEmployeesApi } from '../api/employeesApi';
import OnboardStaffModal from '../components/OnboardStaffModal';
import SalarySlipModal from '../components/SalarySlipModal';
import RecordPaymentModal from '../components/RecordPaymentModal';
import EmployeeTable from '../components/EmployeeTable';

export default function EmployeeManagementPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [search, setSearch] = useState('');
  const [showOnboardModal, setShowOnboardModal] = useState(false);
  const [selectedEmpForSlip, setSelectedEmpForSlip] = useState(null);
  const [selectedEmpForPayment, setSelectedEmpForPayment] = useState(null);

  const loadEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchEmployeesApi();
      if (response.data && response.data.success) {
        setEmployees(response.data.data);
      } else {
        setError('Failed to load employee records.');
      }
    } catch (err) {
      console.error('Error fetching employees:', err);
      setError('Failed to fetch records from backend. Please ensure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleGenerateSlip = (employee) => {
    setSelectedEmpForSlip(employee);
  };

  const handleRecordPayment = (employee) => {
    setSelectedEmpForPayment(employee);
  };

  // Filter employees
  const filtered = employees.filter(e => {
    const name = e.name || '';
    const role = e.role || '';
    return name.toLowerCase().includes(search.toLowerCase()) || 
           role.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '520px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', boxShadow: '0 4px 20px -2px rgba(49, 16, 132, 0.04), 0 2px 8px -1px rgba(49, 16, 132, 0.02)' }}>
      
      {/* Top Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>Staff Registry & Payroll Records</h2>
          <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#64748b' }}>Track and manage staff onboard profiles and record monthly payroll payouts.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search style={{ position: 'absolute', left: '12px', color: '#94a3b8' }} size={16} />
            <input 
              type="text" 
              placeholder="Search staff..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: '9px 12px 9px 36px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', width: '220px', outline: 'none', transition: 'border-color 0.15s ease', boxSizing: 'border-box' }}
              onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
              onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
            />
          </div>
          <button 
            onClick={() => setShowOnboardModal(true)}
            className="btn-primary" 
            style={{ padding: '9px 18px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={16} /> Onboard Staff
          </button>
        </div>
      </div>

      {/* Employee List Table */}
      <EmployeeTable 
        employees={filtered}
        loading={loading}
        error={error}
        onReload={loadEmployees}
        onGenerateSlip={handleGenerateSlip}
        onRecordPayment={handleRecordPayment}
      />

      {/* Onboard Staff Modal */}
      <OnboardStaffModal 
        isOpen={showOnboardModal}
        onClose={() => setShowOnboardModal(false)}
        onSuccess={loadEmployees}
      />

      {/* Salary Slip Modal */}
      <SalarySlipModal 
        isOpen={selectedEmpForSlip !== null}
        onClose={() => setSelectedEmpForSlip(null)}
        employee={selectedEmpForSlip}
      />

      {/* Record Salary Payment Modal */}
      <RecordPaymentModal 
        isOpen={selectedEmpForPayment !== null}
        onClose={() => setSelectedEmpForPayment(null)}
        employee={selectedEmpForPayment}
        onSuccess={loadEmployees}
      />

    </div>
  );
}

