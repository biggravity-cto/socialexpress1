
import React, { useEffect } from 'react';
import { useLocation, Navigate, useNavigate, Outlet } from 'react-router-dom';
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
  
  // Check if this is an auth callback URL
  const hasAuthParams = 
    (location.hash && (location.hash.includes('access_token') || location.hash.includes('error'))) || 
    (location.search && (location.search.includes('access_token') || location.search.includes('error')));
  
  // If we're on an authentication path with auth parameters, don't redirect yet
  const isHandlingAuth = isLoginPage && hasAuthParams;
  
  // Redirect to dashboard when user logs in
  useEffect(() => {
    if (user && isLoginPage && !isHandlingAuth) {
      navigate('/dashboard');
    }
  }, [user, isLoginPage, isHandlingAuth, navigate]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }
  
  // For auth callback handling or public pages
  if (isHandlingAuth || isPublicPage) {
    return (
      <PublicLayout isLoginPage={isLoginPage}>
        <Outlet />
      </PublicLayout>
    );
  }

  // Redirect to login if not authenticated and trying to access protected page
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // For authenticated pages (dashboard, calendar, etc.)
  return (
    <AuthenticatedLayout>
      <Outlet />
    </AuthenticatedLayout>
  );
};

export default Layout;
