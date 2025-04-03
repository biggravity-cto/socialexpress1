
import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import PublicNavbar from '@/components/navigation/PublicNavbar';
import { motion } from 'framer-motion';

interface PublicLayoutProps {
  isLoginPage: boolean;
  children: ReactNode;
}

const PublicLayout = ({ isLoginPage, children }: PublicLayoutProps) => {
  const location = useLocation();
  const isConfirmationPage = location.pathname === '/email-confirmation';
  
  // Don't show navbar on auth or confirmation pages
  const hideNavbar = isLoginPage || isConfirmationPage;
  
  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      {!hideNavbar && <PublicNavbar />}
      <motion.main 
        className="w-full flex-1"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
    </div>
  );
};

export default PublicLayout;
