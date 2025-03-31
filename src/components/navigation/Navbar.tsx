
import React from 'react';
import { useLocation } from 'react-router-dom';
import PublicNavbar from './PublicNavbar';
import DashboardNavbar from './DashboardNavbar';

const Navbar = () => {
  const location = useLocation();

  // Check if we're on the public pages
  if (location.pathname === '/' || location.pathname === '/login' || 
      location.pathname === '/features' || location.pathname === '/pricing' || 
      location.pathname === '/blog' || location.pathname === '/guides' ||
      location.pathname === '/auth' || location.pathname === '/email-confirmation') {
    return <PublicNavbar />;
  }

  // Otherwise, return the dashboard navbar
  return <DashboardNavbar />;
};

export default Navbar;
