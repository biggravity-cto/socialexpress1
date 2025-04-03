
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const DashboardHeader: React.FC = () => {
  const { user } = useAuth();
  
  // Get user's first name from full name or email
  const getUserFirstName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name.split(' ')[0];
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return '';
  };
  
  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };
  
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-ocean-50 to-blue-50 border border-ocean-100">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-resort-800 mb-1">
          {getGreeting()}{getUserFirstName() ? `, ${getUserFirstName()}` : ''}
        </h1>
        <p className="text-resort-500">Your AI-powered marketing command center is ready</p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" className="bg-white border-ocean-200 text-ocean-700">
          <Sparkles className="mr-1.5 h-4 w-4 text-amber-500" /> AI Assistant
        </Button>
        <Link to="/content">
          <Button className="bg-ocean-600 hover:bg-ocean-700 shadow-sm">
            <Plus className="mr-1.5 h-4 w-4" /> Create Content
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHeader;
