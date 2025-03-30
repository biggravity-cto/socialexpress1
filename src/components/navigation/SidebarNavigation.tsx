
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  Calendar, 
  MessageSquare, 
  Users, 
  Settings, 
  LogOut, 
  BellDot, 
  Library,
  BrainCircuit,
  LineChart,
  ClipboardCheck,
  Plug,
  Palette,
  UserCircle,
} from 'lucide-react';
import { 
  SidebarContent, 
  SidebarGroup, 
  SidebarLink, 
  SidebarFooter 
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const SidebarNavigation = () => {
  return (
    <>
      <SidebarContent>
        {/* Flat menu structure in specified order */}
        <SidebarGroup>
          <SidebarLink to="/dashboard" icon={<LayoutDashboard />}>Dashboard</SidebarLink>
          <SidebarLink to="/campaigns" icon={<BrainCircuit />}>Campaigns</SidebarLink>
          <SidebarLink to="/calendar" icon={<Calendar />}>Calendar</SidebarLink>
          <SidebarLink to="/content" icon={<Library />}>Content Studio</SidebarLink>
          <SidebarLink to="/approvals" icon={<ClipboardCheck />}>Approvals</SidebarLink>
          <SidebarLink to="/messages" icon={<MessageSquare />}>Unified Social Inbox</SidebarLink>
          <SidebarLink to="/analytics" icon={<BarChart3 />}>Analytics</SidebarLink>
          <SidebarLink to="/market-intelligence" icon={<LineChart />}>Market Intelligence</SidebarLink>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {/* Settings Section */}
        <div className="px-3 py-2 border-t border-gray-100">
          <SidebarLink to="/settings" icon={<Settings />}>Settings</SidebarLink>
          <div className="pl-6 space-y-1 mt-1">
            <SidebarLink to="/team" icon={<Users />}>Team</SidebarLink>
            <SidebarLink to="/integrations" icon={<Plug />}>Integrations</SidebarLink>
            <SidebarLink to="/brand-kit" icon={<Palette />}>Brand Kit</SidebarLink>
            <SidebarLink to="/account" icon={<UserCircle />}>Account</SidebarLink>
          </div>
        </div>
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
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
          <Button variant="ghost" size="icon" className="relative">
            <BellDot className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              3
            </span>
          </Button>
        </div>
      </SidebarFooter>
    </>
  );
};

export default SidebarNavigation;
