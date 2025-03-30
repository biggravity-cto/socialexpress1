
import React, { useState, useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import DesktopSidebar from './DesktopSidebar';
import MobileSidebar from './MobileSidebar';
import DesktopHeader from './DesktopHeader';
import NotificationButton from './NotificationButton';

const AuthenticatedLayout = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Format the page title from the route
  const getPageTitle = () => {
    if (location.pathname === '/content') return 'Content';
    return location.pathname.substring(1).replace(/-/g, ' ') || 'Dashboard';
  };

  // State for sidebar control with localStorage persistence
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const savedState = localStorage.getItem('sidebarState');
    if (savedState !== null) {
      return savedState === 'open';
    }
    return !isMobile; // Default state based on device
  });

  // Auto-collapse sidebar on mobile, and respect user preference on desktop
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  // Save sidebar state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('sidebarState', sidebarOpen ? 'open' : 'closed');
  }, [sidebarOpen]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <DesktopSidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />
      
      {/* Mobile Sidebar */}
      <MobileSidebar 
        title={getPageTitle()} 
        notificationButton={<NotificationButton />} 
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Desktop Header */}
        <DesktopHeader title={getPageTitle()} />
        
        {/* Content with padding for mobile header */}
        <div className="flex-1 overflow-auto pt-14 md:pt-0">
          <div className="p-4 md:p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
