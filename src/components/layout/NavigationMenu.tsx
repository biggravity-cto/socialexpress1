
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar,
  Library, 
  MessageSquare, 
  ClipboardCheck, 
  Settings, 
  BrainCircuit,
  LineChart,
} from 'lucide-react';

interface NavigationMenuProps {
  sidebarOpen: boolean;
}

// Main navigation items (excluding Settings which will be positioned at bottom)
const mainNavItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />
  },
  {
    name: 'Campaigns',
    path: '/campaigns',
    icon: <BrainCircuit className="h-5 w-5" />
  },
  {
    name: 'AI Marketing Calendar',
    path: '/calendar',
    icon: <Calendar className="h-5 w-5" />
  },
  {
    name: 'Content Studio',
    path: '/content',
    icon: <Library className="h-5 w-5" />
  },
  {
    name: 'Approvals',
    path: '/approvals',
    icon: <ClipboardCheck className="h-5 w-5" />
  },
  {
    name: 'Market Intelligence',
    path: '/market-intelligence',
    icon: <LineChart className="h-5 w-5" />
  },
  {
    name: 'Unified Social Inbox',
    path: '/messages',
    icon: <MessageSquare className="h-5 w-5" />
  }
];

// Settings navigation item (to be positioned at bottom)
const settingsNavItem = {
  name: 'Settings',
  path: '/settings',
  icon: <Settings className="h-5 w-5" />
};

const NavigationMenu: React.FC<NavigationMenuProps> = ({ sidebarOpen }) => {
  const location = useLocation();
  
  // Function to check if a path is active (exact or starts with the path)
  const isPathActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="flex flex-col h-full justify-between">
      {/* Main navigation items */}
      <div className="space-y-1 px-2">
        {mainNavItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
              isPathActive(item.path) 
                ? "bg-ocean-50 text-ocean-600" 
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {sidebarOpen && <span>{item.name}</span>}
          </Link>
        ))}
      </div>
      
      {/* Settings at the bottom */}
      <div className="mt-auto px-2 mb-4">
        <Link
          to={settingsNavItem.path}
          className={`flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
            isPathActive(settingsNavItem.path) 
              ? "bg-ocean-50 text-ocean-600" 
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <span className="mr-3">{settingsNavItem.icon}</span>
          {sidebarOpen && <span>{settingsNavItem.name}</span>}
        </Link>
      </div>
    </nav>
  );
};

export default NavigationMenu;
