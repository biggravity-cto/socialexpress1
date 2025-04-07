
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  BarChart2, 
  Calendar, 
  FileText, 
  Home, 
  LayoutGrid, 
  MessageSquare, 
  CheckCircle, 
  MessageSquareText,
  LineChart,
  BarChart4,
  Database,
  FileBarChart
} from 'lucide-react';

const SidebarNavigation = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  if (!user) return null;

  return (
    <div className="flex flex-col h-full space-y-1 p-2">
      {/* Dashboard Link */}
      <Link
        to="/dashboard"
        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 ${
          isActive('/dashboard') ? 'bg-gray-100 text-gray-900' : ''
        }`}
      >
        <Home className="h-5 w-5" />
        <span className="text-sm font-medium">Dashboard</span>
      </Link>

      {/* Marketing Section */}
      <div className="px-3 py-2">
        <h3 className="mb-2 text-xs font-medium text-gray-500">Marketing</h3>
        <div className="space-y-1">
          <Link
            to="/campaigns"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 ${
              isActive('/campaigns') ? 'bg-gray-100 text-gray-900' : ''
            }`}
          >
            <FileText className="h-5 w-5" />
            <span className="text-sm font-medium">Campaigns</span>
          </Link>
          <Link
            to="/calendar"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 ${
              isActive('/calendar') ? 'bg-gray-100 text-gray-900' : ''
            }`}
          >
            <Calendar className="h-5 w-5" />
            <span className="text-sm font-medium">Calendar</span>
          </Link>
          <Link
            to="/content"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 ${
              isActive('/content') ? 'bg-gray-100 text-gray-900' : ''
            }`}
          >
            <LayoutGrid className="h-5 w-5" />
            <span className="text-sm font-medium">Content</span>
          </Link>
          <Link
            to="/approvals"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 ${
              isActive('/approvals') ? 'bg-gray-100 text-gray-900' : ''
            }`}
          >
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Approvals</span>
          </Link>
        </div>
      </div>

      {/* Insights Section */}
      <div className="px-3 py-2">
        <h3 className="mb-2 text-xs font-medium text-gray-500">Insights</h3>
        <div className="space-y-1">
          <Link
            to="/analytics"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 ${
              isActive('/analytics') ? 'bg-gray-100 text-gray-900' : ''
            }`}
          >
            <LineChart className="h-5 w-5" />
            <span className="text-sm font-medium">Analytics</span>
          </Link>
          <Link
            to="/brand-intelligence"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 ${
              isActive('/brand-intelligence') ? 'bg-gray-100 text-gray-900' : ''
            }`}
          >
            <BarChart2 className="h-5 w-5" />
            <span className="text-sm font-medium">Brand Intelligence</span>
          </Link>
          <Link
            to="/market-intelligence"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 ${
              isActive('/market-intelligence') ? 'bg-gray-100 text-gray-900' : ''
            }`}
          >
            <BarChart4 className="h-5 w-5" />
            <span className="text-sm font-medium">Market Intelligence</span>
          </Link>
          <Link
            to="/bsa-dashboard"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 ${
              isActive('/bsa-dashboard') ? 'bg-gray-100 text-gray-900' : ''
            }`}
          >
            <FileBarChart className="h-5 w-5" />
            <span className="text-sm font-medium">BSA Manager</span>
          </Link>
        </div>
      </div>

      {/* Standalone Section */}
      <div className="px-3 py-2">
        <h3 className="mb-2 text-xs font-medium text-gray-500">Communication</h3>
        <Link
          to="/messages"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 ${
            isActive('/messages') ? 'bg-gray-100 text-gray-900' : ''
          }`}
        >
          <MessageSquareText className="h-5 w-5" />
          <span className="text-sm font-medium">Social Inbox</span>
        </Link>
      </div>
    </div>
  );
};

export default SidebarNavigation;
