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
    try {
      const user = JSON.parse(sessionStorage.getItem('sarvo_user') || '{}');
      role = user.role;
    } catch (e) {}

    if (role === 'SUPER_ADMIN' || role === 'Super Admin') {
      return <Navigate to="/superadmin/analytics" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
