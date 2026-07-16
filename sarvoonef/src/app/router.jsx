import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import ERPLayout from '../layouts/ERPLayout/ERPLayout';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';
import ForgotPassword from '../features/auth/pages/ForgotPassword';
import LandingPage from '../features/landing/pages/LandingPage';
import { AuthGuard, GuestGuard } from '../features/auth/components/AuthGuard';
import { appRoutes, superAdminRoutes } from '../routes';
import SuperAdminLayout from '../layouts/SuperAdminLayout/SuperAdminLayout';

import PublicShopPage from '../features/customers/stores/pages/PublicShopPage';
import PublicProductsPage from '../features/customers/products/pages/PublicProductsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicProductsPage />
  },
  {
    path: '/about',
    element: <LandingPage />
  },
  {
    path: '/:businessSlug',
    children: [
      {
        index: true,
        element: <PublicShopPage />
      },
      {
        element: (
          <AuthGuard>
            <ERPLayout />
          </AuthGuard>
        ),
        children: [
          ...appRoutes
        ]
      }
    ]
  },
  {
    path: '/superadmin',
    element: (
      <AuthGuard>
        <SuperAdminLayout />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/superadmin/analytics" replace />
      },
      ...superAdminRoutes
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
