
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Image, 
  BarChart3, 
  Settings, 
  Users, 
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Library,
  ClipboardCheck
} from 'lucide-react';
import Navbar from '../navigation/Navbar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
}

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
    name: 'Content Library',
    path: '/content-library',
    icon: <Library className="h-5 w-5" />
  },
  {
    name: 'Analytics',
    path: '/analytics',
    icon: <BarChart3 className="h-5 w-5" />
  },
  {
    name: 'Approvals',
    path: '/approvals',
    icon: <ClipboardCheck className="h-5 w-5" />
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

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const isPublicPage = ['/', '/login', '/features', '/pricing', '/blog', '/guides', '/case-studies'].includes(location.pathname);
  const isLoginPage = location.pathname === '/login';
  const [sidebarOpen, setSidebarOpen] = React.useState(!isMobile);

  // Auto-collapse sidebar on mobile, auto-expand on desktop
  React.useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  // The sidebar content - reused in both desktop and mobile
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex h-14 items-center px-4 border-b border-gray-100">
        <span className="font-bold text-lg tracking-tight text-resort-800">BG Social<span className="text-ocean-600">Express</span></span>
      </div>
      
      <div className="flex-1 overflow-auto py-2">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname === item.path 
                  ? "bg-ocean-50 text-ocean-600" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {sidebarOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="border-t border-gray-100 p-2">
        <Link
          to="/login"
          className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
        >
          <LogOut className="h-5 w-5 mr-3" />
          {sidebarOpen && <span>Logout</span>}
        </Link>
      </div>
    </div>
  );

  // For public pages like home, login, pricing, etc.
  if (isPublicPage) {
    return (
      <div className="min-h-screen w-full">
        {!isLoginPage && <Navbar />}
        <main className="w-full">
          {children}
        </main>
      </div>
    );
  }

  // For authenticated pages (dashboard, calendar, etc.)
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <div 
        className={`hidden md:flex transition-all duration-300 flex-col border-r border-gray-100 bg-white ${
          sidebarOpen ? 'w-64' : 'w-16'
        }`}
      >
        <SidebarContent />
        
        {/* Desktop collapse toggle button */}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute bottom-4 right-0 translate-x-1/2 bg-white p-1.5 rounded-full border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>
      
      {/* Mobile Sidebar */}
      <Sheet>
        <div className="md:hidden fixed top-0 left-0 right-0 z-10 h-14 bg-white border-b border-gray-100 flex items-center px-4">
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2 border-gray-200 text-gray-700">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <h1 className="text-xl font-semibold text-resort-800 capitalize">
            {location.pathname.substring(1) || 'Dashboard'}
          </h1>
        </div>
        <SheetContent 
          side="left" 
          className="p-0 w-64 border-r border-gray-100 bg-white"
        >
          <SidebarContent />
        </SheetContent>
      </Sheet>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center h-14 px-4 border-b border-gray-100">
          <h1 className="text-xl font-semibold text-resort-800 capitalize">
            {location.pathname.substring(1) || 'Dashboard'}
          </h1>
        </div>
        
        {/* Content with padding for mobile header */}
        <div className="flex-1 overflow-auto pt-14 md:pt-0">
          <div className="p-4 md:p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
