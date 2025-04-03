
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const DashboardHeader: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-resort-800 mb-1">
          Welcome{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ' Back'}
        </h1>
        <p className="text-resort-500">Here's your AI powered marketing dashboard</p>
      </div>
      <div className="flex items-center space-x-2">
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
