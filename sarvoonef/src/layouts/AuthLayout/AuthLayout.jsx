import React from 'react';
import { Outlet } from 'react-router-dom';
import './AuthLayout.css';

export default function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-logo-box">S</div>
          <h1 className="auth-title">Sarvo One</h1>
          <p className="auth-subtitle">Retail, Wholesale & Medical Store Systems</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
