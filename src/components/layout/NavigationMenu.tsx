
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

// Simplified flat menu structure in specified order
const navItems = [
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
    name: 'Calendar',
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
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: <Settings className="h-5 w-5" />
  }
];

const NavigationMenu: React.FC<NavigationMenuProps> = ({ sidebarOpen }) => {
  const location = useLocation();

  return (
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
  );
};

export default NavigationMenu;
