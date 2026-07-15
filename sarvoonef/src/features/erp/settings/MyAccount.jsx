import React, { useState, useEffect } from 'react';
import { User, Mail, Shield, MapPin, Calendar, Smartphone, Lock, ShieldCheck, CheckCircle2, Award, Activity } from 'lucide-react';

export default function MyAccount() {
  const [user, setUser] = useState({
    name: 'Emily Lynch',
    email: 'superadmin@sarvo.com',
    role: 'Super Admin'
  });

  useEffect(() => {
    const savedUser = sessionStorage.getItem('sarvo_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        // fallback
      }
    }
  }, []);

  return (
    <div style={{ padding: '16px 24px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Styles for dynamic interactions */}
      <style>{`
        .premium-input {
          transition: all 0.2s ease;
        }
        .premium-input:hover {
          border-color: #cbd5e1 !important;
        }
        .permission-card {
          transition: all 0.25s ease;
        }
        .permission-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px -3px rgba(124, 58, 237, 0.1) !important;
          border-color: #c084fc !important;
        }
      `}</style>

      {/* Decorative Banner Header - Height reduced to save vertical space */}
      <div style={{
        height: '90px',
        background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #06b6d4 100%)',
        borderRadius: '12px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 4px 15px -3px rgba(124, 58, 237, 0.15)'
      }}>
        {/* Abstract vector graphics / glassmorphic spheres */}
        <div style={{ position: 'absolute', top: '-35px', right: '-20px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.12)', filter: 'blur(10px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-40px', left: '10%', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', filter: 'blur(15px)' }}></div>
        
        {/* Banner metadata */}
        <div style={{ position: 'absolute', bottom: '12px', right: '20px', color: '#ffffff', textAlign: 'right' }}>
          <div style={{ fontSize: '10px', fontWeight: 600, opacity: 0.8, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Workspace Profile</div>
          <div style={{ fontSize: '16px', fontWeight: 700 }}>Sarvo One ERP</div>
        </div>
      </div>

      {/* Profile Details Container Grid - reduced margins and gaps */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.6fr', gap: '20px', marginTop: '16px' }}>
        
        {/* Left Column: Brief Avatar Card */}
        <div style={{ 
          backgroundColor: '#ffffff', 
          borderRadius: '12px', 
          padding: '20px 16px', 
          border: '1px solid #e2e8f0', 
          boxShadow: '0 4px 15px -3px rgba(0, 0, 0, 0.03)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Initials Circle - smaller avatar to avoid scroll */}
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #a78bfa 0%, #6d28d9 50%, #4c1d95 100%)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '28px',
            border: '4px solid #ffffff',
            boxShadow: '0 8px 16px -3px rgba(109, 40, 217, 0.2)',
            marginTop: '-56px', // Aligns perfectly on top of the card border
            marginBottom: '12px',
            zIndex: 3
          }}>
            {(user.name || 'U').charAt(0).toUpperCase()}
          </div>

          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 2px 0', letterSpacing: '-0.02em' }}>{user.name}</h2>
          <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 12px 0', fontWeight: 500 }}>{user.email}</p>

          <span style={{ 
            fontSize: '10px', 
            fontWeight: 700, 
            background: 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)', 
            color: '#ffffff', 
            padding: '4px 12px', 
            borderRadius: '20px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            boxShadow: '0 2px 8px rgba(124, 58, 237, 0.15)',
            marginBottom: '16px'
          }}>
            {user.role ? user.role.replace('_', ' ') : 'Super Admin'}
          </span>

          <div style={{ borderTop: '1px solid #f1f5f9', width: '100%', paddingTop: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Status</span>
              <span style={{ 
                fontSize: '11px', 
                fontWeight: 700, 
                color: '#10b981',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                backgroundColor: '#ecfdf5',
                padding: '2px 8px',
                borderRadius: '6px'
              }}>
                <span style={{ width: '4px', height: '4px', backgroundColor: '#10b981', borderRadius: '50%', display: 'inline-block' }}></span>
                Active
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Security</span>
              <span style={{ 
                fontSize: '11px', 
                fontWeight: 700, 
                color: '#3b82f6', 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '3px',
                backgroundColor: '#eff6ff',
                padding: '2px 8px',
                borderRadius: '6px'
              }}>
                <ShieldCheck size={12} />
                High
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Auth Status</span>
              <span style={{ 
                fontSize: '11px', 
                fontWeight: 700, 
                color: '#8b5cf6', 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '3px',
                backgroundColor: '#f5f3ff',
                padding: '2px 8px',
                borderRadius: '6px'
              }}>
                <Activity size={11} />
                Verified
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Complete Details Form/Card */}
        <div style={{ 
          backgroundColor: '#ffffff', 
          borderRadius: '12px', 
          padding: '20px 24px', 
          border: '1px solid #e2e8f0', 
          boxShadow: '0 4px 15px -3px rgba(0, 0, 0, 0.03)'
        }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0, letterSpacing: '-0.015em' }}>Primary Profile Details</h3>
            <span style={{ 
              fontSize: '10px', 
              color: '#64748b', 
              backgroundColor: '#f1f5f9', 
              padding: '4px 8px', 
              borderRadius: '6px', 
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              border: '1px solid #e2e8f0'
            }}>
              <Lock size={10} style={{ color: '#64748b' }} />
              Read-Only Mode
            </span>
          </div>

          {/* Details Grid - reduced spacing */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px', marginBottom: '20px' }}>
            
            <div style={{ backgroundColor: '#f8fafc', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', fontWeight: 700, color: '#64748b', letterSpacing: '0.05em' }}>
                <User size={12} style={{ color: '#7c3aed' }} />
                FULL NAME
              </span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
                {user.name}
              </span>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', fontWeight: 700, color: '#64748b', letterSpacing: '0.05em' }}>
                <Mail size={12} style={{ color: '#7c3aed' }} />
                EMAIL ADDRESS
              </span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
                {user.email}
              </span>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', fontWeight: 700, color: '#64748b', letterSpacing: '0.05em' }}>
                <Shield size={12} style={{ color: '#7c3aed' }} />
                ASSIGNED ROLE
              </span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
                {user.role ? user.role.replace('_', ' ') : 'Super Admin'}
              </span>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', fontWeight: 700, color: '#64748b', letterSpacing: '0.05em' }}>
                <MapPin size={12} style={{ color: '#7c3aed' }} />
                ASSIGNED LOCATION
              </span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
                Main Head Office
              </span>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', fontWeight: 700, color: '#64748b', letterSpacing: '0.05em' }}>
                <Smartphone size={12} style={{ color: '#7c3aed' }} />
                CONTACT TELEPHONE
              </span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
                +91 99876 54321
              </span>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', fontWeight: 700, color: '#64748b', letterSpacing: '0.05em' }}>
                <Calendar size={12} style={{ color: '#7c3aed' }} />
                REGISTRATION DATE
              </span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
                January 10, 2026
              </span>
            </div>

          </div>

          {/* Account Permissions Sub-Section - compact layout */}
          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Award size={16} style={{ color: '#7c3aed' }} />
              Active System Privileges & Permissions
            </h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              
              <div className="permission-card" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                padding: '10px 14px', 
                borderRadius: '10px', 
                backgroundColor: '#ffffff', 
                border: '1px solid #e2e8f0',
                borderLeft: '4px solid #7c3aed',
                boxShadow: '0 2px 4px rgba(0,0,0,0.01)'
              }}>
                <CheckCircle2 size={14} style={{ color: '#10b981', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>Full Catalog Access</div>
                  <div style={{ fontSize: '10px', color: '#64748b', marginTop: '1px', fontWeight: 500 }}>Create, update, and manage cataloged products</div>
                </div>
              </div>

              <div className="permission-card" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                padding: '10px 14px', 
                borderRadius: '10px', 
                backgroundColor: '#ffffff', 
                border: '1px solid #e2e8f0',
                borderLeft: '4px solid #7c3aed',
                boxShadow: '0 2px 4px rgba(0,0,0,0.01)'
              }}>
                <CheckCircle2 size={14} style={{ color: '#10b981', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>Inventory Tracking</div>
                  <div style={{ fontSize: '10px', color: '#64748b', marginTop: '1px', fontWeight: 500 }}>Edit and register warehouse storage items</div>
                </div>
              </div>

              <div className="permission-card" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                padding: '10px 14px', 
                borderRadius: '10px', 
                backgroundColor: '#ffffff', 
                border: '1px solid #e2e8f0',
                borderLeft: '4px solid #7c3aed',
                boxShadow: '0 2px 4px rgba(0,0,0,0.01)'
              }}>
                <CheckCircle2 size={14} style={{ color: '#10b981', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>Sales & Invoicing</div>
                  <div style={{ fontSize: '10px', color: '#64748b', marginTop: '1px', fontWeight: 500 }}>Process checkouts and generate receipt records</div>
                </div>
              </div>

              <div className="permission-card" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                padding: '10px 14px', 
                borderRadius: '10px', 
                backgroundColor: '#ffffff', 
                border: '1px solid #e2e8f0',
                borderLeft: '4px solid #7c3aed',
                boxShadow: '0 2px 4px rgba(0,0,0,0.01)'
              }}>
                <CheckCircle2 size={14} style={{ color: '#10b981', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>General Settings Control</div>
                  <div style={{ fontSize: '10px', color: '#64748b', marginTop: '1px', fontWeight: 500 }}>Access system details and general settings</div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
