import React from 'react';
import { Navigate } from 'react-router-dom';

// Protect routes that require login
export function AuthGuard({ children }) {
  const isAuthenticated = !!sessionStorage.getItem('sarvo_token');

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}

// Redirect logged-in users away from auth pages (login/register)
export function GuestGuard({ children }) {
  const isAuthenticated = !!sessionStorage.getItem('sarvo_token');

  if (isAuthenticated) {
    let role = '';
    let businessName = '';
    try {
      const user = JSON.parse(sessionStorage.getItem('sarvo_user') || '{}');
      role = user.role;
      businessName = user.businessName || '';
    } catch (e) {}

    if (role === 'SUPER_ADMIN' || role === 'Super Admin') {
      return <Navigate to="/superadmin/analytics" replace />;
    }

    const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const businessSlug = businessName ? slugify(businessName) : 'dashboard';
    return <Navigate to={`/${businessSlug}/dashboard`} replace />;
  }

  return children;
}
