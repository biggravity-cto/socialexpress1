
import React, { useState } from 'react';
import { Link, NavLink, useLocation, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  LayoutDashboard, 
  BarChart3, 
  Calendar, 
  MessagesSquare, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  BellDot, 
  Megaphone,
  CheckCircle,
  Library,
  BrainCircuit,
  LineChart,
  MessageSquare,
  ClipboardCheck,
  Plug,
  Palette,
  UserCircle,
} from 'lucide-react';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarLink, 
  SidebarTrigger, 
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

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  if (location.pathname === '/' || location.pathname === '/login') {
    // Render Public Navbar for Landing and Login pages
    return (
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm py-3">
        <div className="container flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            BG Social Express
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/features" className="text-gray-600 hover:text-gray-900">Features</NavLink>
            <NavLink to="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</NavLink>
            <NavLink to="/blog" className="text-gray-600 hover:text-gray-900">Blog</NavLink>
            <NavLink to="/guides" className="text-gray-600 hover:text-gray-900">Guides</NavLink>
          </div>
          <div className="flex items-center space-x-3">
            <Link to="/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link to="/login">
              <Button>Sign up</Button>
            </Link>
          </div>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          )}
        </div>
        {isMenuOpen && isMobile && (
          <div className="absolute top-16 left-0 right-0 bg-white shadow-md p-4 md:hidden">
            <div className="flex flex-col space-y-4">
              <NavLink to="/features" className="text-gray-600 hover:text-gray-900">Features</NavLink>
              <NavLink to="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</NavLink>
              <NavLink to="/blog" className="text-gray-600 hover:text-gray-900">Blog</NavLink>
              <NavLink to="/guides" className="text-gray-600 hover:text-gray-900">Guides</NavLink>
              <div className="pt-2 border-t border-gray-100">
                <Link to="/login" className="w-full">
                  <Button className="w-full">Log in</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    );
  }

  // Dashboard Navbar with Sidebar
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarContent>
            {/* Dashboard (Standalone) */}
            <SidebarGroup>
              <SidebarLink to="/dashboard" icon={<LayoutDashboard />}>Dashboard</SidebarLink>
            </SidebarGroup>
            
            {/* MARKETING Section - now with static heading */}
            <SidebarGroup>
              <div className="flex items-center px-3 py-2 text-sm font-semibold text-gray-800 uppercase tracking-wider">
                <Megaphone className="mr-2 h-4 w-4" />
                <span>Marketing</span>
              </div>
              <SidebarLink to="/campaigns" icon={<BrainCircuit />}>Campaigns</SidebarLink>
              <SidebarLink to="/calendar" icon={<Calendar />}>Calendar</SidebarLink>
              <SidebarLink to="/content" icon={<Library />}>Library</SidebarLink>
              <SidebarLink to="/approvals" icon={<ClipboardCheck />}>Approvals</SidebarLink>
            </SidebarGroup>
            
            {/* INSIGHTS Section - now with static heading */}
            <SidebarGroup>
              <div className="flex items-center px-3 py-2 text-sm font-semibold text-gray-800 uppercase tracking-wider">
                <BarChart3 className="mr-2 h-4 w-4" />
                <span>Insights</span>
              </div>
              <SidebarLink to="/analytics" icon={<BarChart3 />}>Analytics</SidebarLink>
              <SidebarLink to="/market-intelligence" icon={<LineChart />}>Market Intelligence</SidebarLink>
            </SidebarGroup>
            
            {/* Unified Social Inbox (Moved below INSIGHTS) */}
            <SidebarGroup>
              <SidebarLink to="/messages" icon={<MessageSquare />}>Unified Social Inbox</SidebarLink>
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

export default Navbar;
