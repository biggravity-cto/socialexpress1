
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavigationMenu from './NavigationMenu';

interface DesktopSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div 
      className={`hidden md:flex transition-all duration-300 flex-col border-r border-gray-100 bg-white ${
        sidebarOpen ? 'w-64' : 'w-16'
      }`}
    >
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
          <NavigationMenu sidebarOpen={sidebarOpen} />
        </div>
      </div>
    </div>
  );
};

export default DesktopSidebar;
