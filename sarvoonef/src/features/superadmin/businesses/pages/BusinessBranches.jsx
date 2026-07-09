import React, { useState } from 'react';
import BranchGrid from '../components/BranchGrid';
import OnboardBranchModal from '../components/OnboardBranchModal';
import { useBranches } from '../hooks/useBranches';
import { Plus } from 'lucide-react';

export default function BusinessBranches() {
  const { branches, businesses, loading, toggleBranchStatus, onboardBranch } = useBranches();
  const [filter, setFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddBranchClick = () => {
    if (businesses.length === 0) {
      alert("No businesses found! Onboard a business first in the Accounts tab.");
      return;
    }
    setIsModalOpen(true);
  };

  const filtered = branches.filter(b => {
    if (filter === 'All') return true;
    return b.status === filter;
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Business Branches</h2>
          <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#6b7280' }}>Track branch distributions, staff metrics, and active operating sites across India.</p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            style={{ border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '12.5px', padding: '6px 12px', outline: 'none', fontWeight: 600, color: '#4b5563' }}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active Only</option>
            <option value="Inactive">Inactive Only</option>
          </select>

          <button 
            onClick={handleAddBranchClick}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#7c3aed', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
          >
            <Plus size={16} /> Add Branch
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
          Loading branches...
        </div>
      ) : (
        <BranchGrid branches={filtered} onToggleBranch={toggleBranchStatus} />
      )}

      {/* Onboard Branch Modal */}
      <OnboardBranchModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onboardBranch}
        businesses={businesses}
      />
    </div>
  );
}
