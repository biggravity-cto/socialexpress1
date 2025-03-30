
import React from 'react';
import { useLocation } from 'react-router-dom';
import AuthenticatedLayout from './AuthenticatedLayout';
import PublicLayout from './PublicLayout';

const Layout = () => {
  const location = useLocation();
  const isPublicPage = ['/', '/login', '/features', '/pricing', '/blog', '/guides', '/case-studies'].includes(location.pathname);
  const isLoginPage = location.pathname === '/login';
  
  // For public pages like home, login, pricing, etc.
  if (isPublicPage) {
    return <PublicLayout isLoginPage={isLoginPage} />;
  }

  // For authenticated pages (dashboard, calendar, etc.)
  return <AuthenticatedLayout />;
};

export default Layout;
