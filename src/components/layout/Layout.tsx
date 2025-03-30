
import React, { useEffect } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import AuthenticatedLayout from './AuthenticatedLayout';
import PublicLayout from './PublicLayout';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  
  const publicPages = ['/', '/login', '/auth', '/email-confirmation', '/features', '/pricing', '/blog', '/guides', '/case-studies'];
  const isPublicPage = publicPages.includes(location.pathname);
  const isLoginPage = location.pathname === '/login' || location.pathname === '/auth' || location.pathname === '/email-confirmation';
  
  // Redirect to dashboard when user logs in
  useEffect(() => {
    if (user && isLoginPage) {
      navigate('/dashboard');
    }
  }, [user, isLoginPage, navigate]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
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
