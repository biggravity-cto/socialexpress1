
import React from 'react';
import { useLocation } from 'react-router-dom';
import PublicNavbar from './PublicNavbar';
import DashboardNavbar from './DashboardNavbar';

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;

  // Check if we're on the public pages
  const publicPaths = ['/', '/login', '/features', '/pricing', '/blog', '/guides',
      '/auth', '/email-confirmation', '/about', '/offerings', '/case-studies', 
      '/team', '/contact', '/book-call'];
      
  const isPublicPage = publicPaths.some(publicPath => 
    path === publicPath || path.startsWith(`${publicPath}/`));

  if (isPublicPage) {
    return <PublicNavbar />;
  }

  // Otherwise, return the dashboard navbar
  return <DashboardNavbar />;
};

export default Navbar;
