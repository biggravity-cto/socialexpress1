
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  LineChart,
  Calendar,
  Library, 
  ClipboardCheck, 
  BarChart,
  BrainCircuit,
  MessageSquare, 
  Settings,
  Sparkles
} from 'lucide-react';

interface NavigationMenuProps {
  sidebarOpen: boolean;
  onItemClick?: () => void; // Add callback for menu item click
}

// Main navigation items (excluding Settings which will be positioned at bottom)
const mainNavItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />
  },
  {
    name: 'Brand Intelligence',
    path: '/brand-intelligence',
    icon: <LineChart className="h-5 w-5" />
  },
  {
    name: 'Analytics & Insights',
    path: '/analytics',
    icon: <BarChart className="h-5 w-5" />
  },
  {
    name: 'Marketing Calendar',
    path: '/calendar',
    icon: <Calendar className="h-5 w-5" />
  },
  {
    name: 'Campaigns',
    path: '/campaigns',
    icon: <BrainCircuit className="h-5 w-5" />
  },
  {
    name: 'AI Content Studio',
    path: '/content',
    icon: <Sparkles className="h-5 w-5" />
  },
  {
    name: 'Approvals',
    path: '/approvals',
    icon: <ClipboardCheck className="h-5 w-5" />
  },
  {
    name: 'Unified Inbox',
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

const NavigationMenu: React.FC<NavigationMenuProps> = ({ sidebarOpen, onItemClick }) => {
  const location = useLocation();
  
  // Function to check if a path is active (exact or starts with the path)
  const isPathActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Handle menu item click
  const handleItemClick = () => {
    if (onItemClick) {
      onItemClick();
    }
  };

  return (
    <nav className="flex flex-col h-full justify-between">
      {/* Main navigation items */}
      <div className="space-y-1 px-2">
        {mainNavItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={handleItemClick}
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
          onClick={handleItemClick}
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
