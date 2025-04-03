
import React from 'react';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import NavigationMenu from './NavigationMenu';

interface MobileSidebarProps {
  title: string;
  notificationButton: React.ReactNode;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ title, notificationButton }) => {
  return (
    <Sheet>
      <div className="md:hidden fixed top-0 left-0 right-0 z-10 h-14 bg-white border-b border-gray-100 flex items-center px-4">
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="mr-2 border-gray-200 text-gray-700">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <h1 className="text-xl font-semibold text-resort-800 capitalize">
          {title}
        </h1>
        
        {/* Notification Bell */}
        <div className="ml-auto">
          {notificationButton}
        </div>
      </div>
      <SheetContent 
        side="left" 
        className="p-0 w-full sm:w-80 max-w-full border-r border-gray-100 bg-white"
      >
        <div className="flex flex-col h-full">
          <div className="flex h-14 items-center px-4 border-b border-gray-100 justify-between">
            <span className="font-bold text-lg tracking-tight text-resort-800">
              GuestFlow AI
            </span>
          </div>
          
          <div className="flex-1 overflow-auto py-2">
            <NavigationMenu sidebarOpen={true} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
