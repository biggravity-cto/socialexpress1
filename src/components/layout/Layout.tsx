
import React, { useState, useEffect } from 'react';
import { useLocation, Link, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar,
  Library, 
  MessageSquare, 
  ClipboardCheck,
  BarChart3, 
  Settings, 
  Users, 
  LogOut,
  Menu,
  ChevronLeft,
  ChevronRight,
  BrainCircuit,
  LineChart,
  Bell,
  Megaphone,
  ChevronDown,
  PanelLeft,
  Plug,
  Palette,
  UserCircle,
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from '@/components/ui/badge';
import RecentActivity from '../dashboard/RecentActivity';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

// Reorganized menu structure with new grouping
const navItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
    standalone: true
  },
  {
    group: "Marketing",
    icon: <Megaphone className="h-5 w-5" />,
    items: [
      {
        name: 'Campaigns',
        path: '/campaigns',
        icon: <BrainCircuit className="h-5 w-5" />,
        description: 'Strategic planning & briefs'
      },
      {
        name: 'Calendar',
        path: '/calendar',
        icon: <Calendar className="h-5 w-5" />,
        description: 'Visual scheduling & planning'
      },
      {
        name: 'Library',
        path: '/content',
        icon: <Library className="h-5 w-5" />,
        description: 'Content creation, AI tools & assets'
      },
      {
        name: 'Approvals',
        path: '/approvals',
        icon: <ClipboardCheck className="h-5 w-5" />,
        description: 'Workflow for campaigns & content'
      }
    ]
  },
  {
    name: 'Messages',
    path: '/messages',
    icon: <MessageSquare className="h-5 w-5" />,
    standalone: true
  },
  {
    group: "Insights",
    icon: <BarChart3 className="h-5 w-5" />,
    items: [
      {
        name: 'Analytics',
        path: '/analytics',
        icon: <BarChart3 className="h-5 w-5" />,
        description: 'Performance tracking & ROI'
      },
      {
        name: 'Market Intelligence',
        path: '/market-intelligence',
        icon: <LineChart className="h-5 w-5" />,
        description: 'Competitor & trend analysis'
      }
    ]
  }
];

const settingsItems = [
  {
    name: 'Team',
    path: '/team',
    icon: <Users className="h-5 w-5" />,
  },
  {
    name: 'Integrations',
    path: '/integrations',
    icon: <Plug className="h-5 w-5" />,
  },
  {
    name: 'Brand Kit',
    path: '/brand-kit',
    icon: <Palette className="h-5 w-5" />,
  },
  {
    name: 'Account',
    path: '/account',
    icon: <UserCircle className="h-5 w-5" />,
  }
];

const Layout = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const isPublicPage = ['/', '/login', '/features', '/pricing', '/blog', '/guides', '/case-studies'].includes(location.pathname);
  const isLoginPage = location.pathname === '/login';
  
  // State for sidebar control with localStorage persistence
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const savedState = localStorage.getItem('sidebarState');
    if (savedState !== null) {
      return savedState === 'open';
    }
    return !isMobile; // Default state based on device
  });

  // State for expanded section groups
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    Marketing: true,
    Insights: true
  });

  // Toggle section group expanded state
  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

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

  // The sidebar content - reused in both desktop and mobile
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex h-14 items-center px-4 border-b border-gray-100 justify-between">
        <span className="font-bold text-lg tracking-tight text-resort-800">
          {sidebarOpen ? 'BG Social Express' : 'BG'}
        </span>
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:flex hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto py-2">
        <nav className="space-y-1 px-2">
          {navItems.map((item, idx) => {
            // Standalone items
            if (item.standalone) {
              return (
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
              );
            }
            
            // Group items
            if (item.group) {
              const isExpanded = expandedGroups[item.group];
              return (
                <div key={item.group} className="space-y-1">
                  <Collapsible 
                    open={isExpanded} 
                    onOpenChange={() => toggleGroup(item.group)}
                    className="w-full"
                  >
                    <CollapsibleTrigger asChild>
                      <button 
                        className={`w-full flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md transition-colors text-gray-600 hover:bg-gray-100 ${
                          item.items?.some(subItem => location.pathname === subItem.path) ? "bg-gray-100" : ""
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="mr-3">{item.icon}</span>
                          {sidebarOpen && (
                            <span className="font-semibold uppercase text-xs tracking-wider">{item.group}</span>
                          )}
                        </div>
                        {sidebarOpen && <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`} />}
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-1 mt-1">
                      {item.items?.map(subItem => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={`flex items-center px-2 py-2 ${sidebarOpen ? 'pl-10' : 'pl-2 justify-center'} text-sm font-medium rounded-md transition-colors ${
                            location.pathname === subItem.path 
                              ? "bg-ocean-50 text-ocean-600" 
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          <span className={sidebarOpen ? "mr-3" : ""}>{subItem.icon}</span>
                          {sidebarOpen && <span>{subItem.name}</span>}
                        </Link>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              );
            }
            
            return null;
          })}
        </nav>
      </div>
      
      <div className="border-t border-gray-100 pt-2">
        {/* Settings section with expandable items */}
        <div className="px-2">
          <Collapsible className="w-full">
            <CollapsibleTrigger asChild>
              <Link
                to="/settings"
                className={`flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === '/settings' || settingsItems.some(item => location.pathname === item.path)
                    ? "bg-ocean-50 text-ocean-600" 
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center">
                  <Settings className="h-5 w-5 mr-3" />
                  {sidebarOpen && <span>Settings</span>}
                </div>
                {sidebarOpen && <ChevronDown className="h-4 w-4" />}
              </Link>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 mt-1">
              {settingsItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-2 py-2 ${sidebarOpen ? 'pl-10' : 'pl-2 justify-center'} text-sm font-medium rounded-md transition-colors ${
                    location.pathname === item.path 
                      ? "bg-ocean-50 text-ocean-600" 
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className={sidebarOpen ? "mr-3" : ""}>{item.icon}</span>
                  {sidebarOpen && <span>{item.name}</span>}
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  );

  // For public pages like home, login, pricing, etc.
  if (isPublicPage) {
    return (
      <div className="min-h-screen w-full">
        {!isLoginPage && <div className="sticky top-0 z-50">
          {/* Navbar component would be here */}
        </div>}
        <main className="w-full">
          <Outlet />
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
            {location.pathname === '/content' ? 'Content' : 
             location.pathname.substring(1).replace('-', ' ') || 'Dashboard'}
          </h1>
          
          {/* Notification Bell */}
          <div className="ml-auto">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="relative mr-2">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-red-500 text-white">5</Badge>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-medium text-resort-800">Recent Activity</h3>
                </div>
                <RecentActivity compact={true} />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <SheetContent 
          side="left" 
          className="p-0 w-full sm:w-80 max-w-full border-r border-gray-100 bg-white"
        >
          <SidebarContent />
        </SheetContent>
      </Sheet>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center h-14 px-4 border-b border-gray-100 justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-resort-800 capitalize">
              {location.pathname === '/content' ? 'Content' : 
               location.pathname.substring(1).replace(/-/g, ' ') || 'Dashboard'}
            </h1>
          </div>
          
          {/* Notification Bell */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-red-500 text-white">5</Badge>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-medium text-resort-800">Recent Activity</h3>
              </div>
              <RecentActivity compact={true} />
            </PopoverContent>
          </Popover>
        </div>
        
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

export default Layout;
