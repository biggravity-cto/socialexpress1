
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import PublicNavbar from '@/components/navigation/PublicNavbar';
import { motion } from 'framer-motion';

const PublicLayout = ({ isLoginPage }: { isLoginPage: boolean }) => {
  const location = useLocation();
  const isConfirmationPage = location.pathname === '/email-confirmation';
  
  // Don't show navbar on auth or confirmation pages
  const hideNavbar = isLoginPage || isConfirmationPage;
  
  return (
    <div className="min-h-screen w-full flex flex-col">
      {!hideNavbar && <div className="sticky top-0 z-50">
        <PublicNavbar />
      </div>}
      <motion.main 
        className="w-full flex-1"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>
    </div>
  );
};

export default PublicLayout;
