
import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarInset,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { LayoutDashboard, Calendar, Image, BarChart3, Settings, Users, LogOut } from 'lucide-react';
import Navbar from '../navigation/Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />
  },
  {
    name: 'Calendar',
    path: '/calendar',
    icon: <Calendar className="h-5 w-5" />
  },
  {
    name: 'Posts',
    path: '/posts',
    icon: <Image className="h-5 w-5" />
  },
  {
    name: 'Analytics',
    path: '/analytics',
    icon: <BarChart3 className="h-5 w-5" />
  },
  {
    name: 'Team',
    path: '/team',
    icon: <Users className="h-5 w-5" />
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: <Settings className="h-5 w-5" />
  }
];

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isPublicPage = ['/', '/login', '/features', '/pricing', '/blog', '/guides', '/case-studies'].includes(location.pathname);
  const isLoginPage = location.pathname === '/login';

  // For public pages like home, login, pricing, etc.
  if (isPublicPage) {
    return (
      <div className="min-h-screen w-full">
        {!isLoginPage && <Navbar />}
        <main className="w-full">
          {children}
        </main>
      </div>
    );
  }

  // For authenticated pages (dashboard, calendar, etc.)
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar variant="inset" collapsible="icon">
          <SidebarHeader className="flex h-14 items-center px-4">
            <span className="font-bold text-lg tracking-tight text-sidebar-foreground">Resort<span className="text-ocean-600">Flux</span></span>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    asChild 
                    tooltip={item.name}
                    isActive={location.pathname === item.path}
                  >
                    <a href={item.path}>
                      {item.icon}
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Logout">
                  <a href="/login">
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset className="flex-1 overflow-auto">
          <div className="flex items-center h-14 px-4 border-b border-gray-100">
            <SidebarTrigger className="mr-2" />
            <h1 className="text-xl font-semibold text-resort-800 capitalize">
              {location.pathname.substring(1) || 'Dashboard'}
            </h1>
          </div>
          <div className="p-4 md:p-6">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
