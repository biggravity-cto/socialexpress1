
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Image, 
  BarChart3, 
  Settings, 
  Users, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const navItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />
  },
  {
    name: 'Calendar',
    path: '/calendar',
    icon: <Calendar className="h-5 w-5" />
  },
  {
    name: 'Posts',
    path: '/posts',
    icon: <Image className="h-5 w-5" />
  },
  {
    name: 'Analytics',
    path: '/analytics',
    icon: <BarChart3 className="h-5 w-5" />
  },
  {
    name: 'Team',
    path: '/team',
    icon: <Users className="h-5 w-5" />
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: <Settings className="h-5 w-5" />
  }
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  // Don't show sidebar on the landing page
  if (location.pathname === '/') return null;
  
  const sidebarContent = (
    <div className={cn(
      "h-full flex flex-col justify-between bg-white/50 backdrop-blur-lg border-r border-gray-100",
      collapsed ? "w-20" : "w-64",
      "transition-all duration-300 ease-in-out"
    )}>
      <div>
        <div className={cn(
          "flex items-center h-16 px-4 border-b border-gray-100",
          collapsed ? "justify-center" : "justify-between"
        )}>
          {!collapsed && (
            <Link to="/dashboard" className="flex items-center">
              <span className="font-bold text-xl tracking-tight text-resort-800">Resort<span className="text-ocean-600">Flux</span></span>
            </Link>
          )}
          {collapsed && (
            <Link to="/dashboard" className="flex items-center justify-center">
              <span className="font-bold text-xl tracking-tight text-ocean-600">R</span>
            </Link>
          )}
          {!isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="h-8 w-8"
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4 text-resort-500" />
              ) : (
                <ChevronLeft className="h-4 w-4 text-resort-500" />
              )}
            </Button>
          )}
        </div>

        <nav className="p-3 space-y-1">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={cn(
                "flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200",
                location.pathname === item.path 
                  ? "bg-ocean-50 text-ocean-700" 
                  : "text-resort-600 hover:text-resort-900 hover:bg-resort-50",
                collapsed ? "justify-center" : "justify-start"
              )}
            >
              <span className={cn(
                location.pathname === item.path 
                  ? "text-ocean-600" 
                  : "text-resort-500"
              )}>
                {item.icon}
              </span>
              {!collapsed && (
                <span className="ml-3">{item.name}</span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-3 mt-auto">
        <div className={cn(
          "border-t border-gray-100 pt-3",
          collapsed ? "text-center" : ""
        )}>
          <Link 
            to="/"
            className={cn(
              "flex items-center rounded-md px-3 py-2.5 text-sm font-medium text-resort-600 hover:text-resort-900 hover:bg-resort-50 transition-all duration-200",
              collapsed ? "justify-center" : "justify-start"
            )}
          >
            <LogOut className="h-5 w-5 text-resort-500" />
            {!collapsed && (
              <span className="ml-3">Logout</span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-40 bg-white/80 backdrop-blur-sm shadow-sm"
          onClick={toggleMobileSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {mobileOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={toggleMobileSidebar}
            />
            <div className="fixed inset-y-0 left-0 z-50 w-64 animate-slide-in-right">
              {sidebarContent}
            </div>
          </>
        )}
      </>
    );
  }

  return sidebarContent;
};

export default Sidebar;
