
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import AuthenticatedLayout from './AuthenticatedLayout';
import PublicLayout from './PublicLayout';
import { useAuth } from '@/contexts/AuthContext';

const Layout = () => {
  const location = useLocation();
  const { user, loading } = useAuth();
  
  const publicPages = ['/', '/login', '/auth', '/features', '/pricing', '/blog', '/guides', '/case-studies'];
  const isPublicPage = publicPages.includes(location.pathname);
  const isLoginPage = location.pathname === '/login' || location.pathname === '/auth';
  
  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ocean-600"></div>
      </div>
    );
  }
  
  // For public pages like home, login, pricing, etc.
  if (isPublicPage) {
    return <PublicLayout isLoginPage={isLoginPage} />;
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // For authenticated pages (dashboard, calendar, etc.)
  return <AuthenticatedLayout />;
};

export default Layout;
