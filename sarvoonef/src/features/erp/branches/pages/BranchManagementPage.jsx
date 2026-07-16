import React, { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { useBranches } from '../hooks/useBranches';
import BranchCard from '../components/BranchCard';
import RegisterBranchModal from '../components/RegisterBranchModal';

export default function BranchManagementPage() {
  const { branches, loading, error, registerBranch } = useBranches();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleSync = (name) => {
    alert(`Initiating stock synchronization for branch "${name}"...`);
  };

  const handleRegister = async (branchData) => {
    await registerBranch(branchData);
  };

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px', fontFamily: 'system-ui, sans-serif', minHeight: '400px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Multi-Branch Directory Settings</h2>
        <button 
          onClick={() => setIsOpenModal(true)}
          className="btn-primary" 
          style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={16} /> Register Branch
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0', gap: '12px' }}>
          <Loader2 className="animate-spin" size={32} style={{ color: '#7c3aed' }} />
          <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: 500 }}>Loading branch directories...</span>
        </div>
      ) : error ? (
        <div style={{ padding: '20px', backgroundColor: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '8px', color: '#b91c1c', fontSize: '14px', textAlign: 'center' }}>
          {error}
        </div>
      ) : branches.length === 0 ? (
        <div style={{ padding: '60px 0', textAlign: 'center', border: '1px dashed #e5e7eb', borderRadius: '12px' }}>
          <span style={{ fontSize: '14px', color: '#6b7280', display: 'block', marginBottom: '16px' }}>No branch registered yet.</span>
          <button 
            onClick={() => setIsOpenModal(true)}
            className="btn-primary"
            style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}
          >
            Register Your First Branch
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {branches.map(br => (
            <BranchCard 
              key={br.id} 
              branch={br} 
              onSync={handleSync} 
            />
          ))}
        </div>
      )}

      <RegisterBranchModal 
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onRegister={handleRegister}
      />
    </div>
  );
}
