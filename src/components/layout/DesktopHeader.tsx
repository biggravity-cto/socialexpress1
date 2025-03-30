
import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import RecentActivity from '../dashboard/RecentActivity';

interface DesktopHeaderProps {
  title: string;
}

const DesktopHeader: React.FC<DesktopHeaderProps> = ({ title }) => {
  return (
    <div className="hidden md:flex items-center h-14 px-4 border-b border-gray-100 justify-between">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-resort-800 capitalize">
          {title}
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
  );
};

export default DesktopHeader;
