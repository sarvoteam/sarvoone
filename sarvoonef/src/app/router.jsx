import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import ERPLayout from '../layouts/ERPLayout/ERPLayout';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';
import ForgotPassword from '../features/auth/pages/ForgotPassword';
import { AuthGuard, GuestGuard } from '../features/auth/components/AuthGuard';
import { appRoutes } from '../routes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthGuard>
        <ERPLayout />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />
      },
      ...appRoutes
    ]
  },
  {
    path: '/auth',
    element: (
      <GuestGuard>
        <AuthLayout />
      </GuestGuard>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" replace />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />
      }
    ]
  }
]);
