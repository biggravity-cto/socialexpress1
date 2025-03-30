
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import PublicNavbar from '@/components/navigation/PublicNavbar';

const PublicLayout = ({ isLoginPage }: { isLoginPage: boolean }) => {
  const location = useLocation();
  const isConfirmationPage = location.pathname === '/email-confirmation';
  
  // Don't show navbar on auth or confirmation pages
  const hideNavbar = isLoginPage || isConfirmationPage;
  
  return (
    <div className="min-h-screen w-full">
      {!hideNavbar && <div className="sticky top-0 z-50">
        <PublicNavbar />
      </div>}
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
