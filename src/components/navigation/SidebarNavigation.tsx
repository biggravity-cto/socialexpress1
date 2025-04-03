
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
  LogOut,
  Users,
  BellDot,
  Sparkles
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
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const SidebarNavigation = () => {
  const { signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
      toast({
        title: "Logout failed",
        description: "An error occurred while logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <SidebarContent>
        {/* Main navigation group */}
        <SidebarGroup>
          <SidebarLink to="/dashboard" icon={<LayoutDashboard />}>Dashboard</SidebarLink>
          <SidebarLink to="/brand-intelligence" icon={<LineChart />}>Brand Intelligence</SidebarLink>
          <SidebarLink to="/analytics" icon={<BarChart />}>Analytics & Insights</SidebarLink>
          <SidebarLink to="/calendar" icon={<Calendar />}>Marketing Calendar</SidebarLink>
          <SidebarLink to="/campaigns" icon={<BrainCircuit />}>Campaigns</SidebarLink>
          <SidebarLink to="/content" icon={<Sparkles />}>AI Content Studio</SidebarLink>
          <SidebarLink to="/approvals" icon={<ClipboardCheck />}>Approvals</SidebarLink>
          <SidebarLink to="/messages" icon={<MessageSquare />}>Unified Inbox</SidebarLink>
        </SidebarGroup>
        
        {/* Settings navigation group (positioned at bottom, above footer) */}
        <SidebarGroup>
          <SidebarLink to="/settings" icon={<Settings />}>Settings</SidebarLink>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
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
                <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={handleLogout}>
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
