
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { BellDot, LogOut, Settings, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  SidebarProvider, 
  Sidebar,
  SidebarTrigger 
} from '@/components/ui/sidebar';
import SidebarNavigation from './SidebarNavigation';

const DashboardNavbar = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarNavigation />
        </Sidebar>
        
        <div className="flex-1 min-h-screen">
          <header className="h-14 border-b lg:h-[60px]">
            <div className="flex h-full items-center px-4 md:px-6">
              <SidebarTrigger />
              <div className="ml-auto flex items-center gap-2">
                <Button variant="ghost" size="icon" className="relative">
                  <BellDot className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                    3
                  </span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/settings" className="flex w-full items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/team" className="flex w-full items-center">
                        <Users className="mr-2 h-4 w-4" />
                        <span>Team</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>
          <main className="flex-1"><Outlet /></main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardNavbar;
