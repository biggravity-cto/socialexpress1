
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MessageSquare, Settings, Library, Plus, ArrowRight, ClipboardCheck, BrainCircuit, LineChart, Image, Video, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { motion } from 'framer-motion';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-resort-800 mb-1">Welcome Back</h1>
          <p className="text-resort-500">Here's what's happening with your social media</p>
        </div>
        <div className="flex items-center space-x-2">
          {/* Notification Panel - Mobile View */}
          <div className="block md:hidden">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <MessageSquare className="h-5 w-5" />
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
          
          <Link to="/calendar">
            <Button className="bg-ocean-600 hover:bg-ocean-700 shadow-sm">
              <Plus className="mr-1.5 h-4 w-4" /> Create Content
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: "Content Calendar",
            description: "View and manage your upcoming content schedule",
            icon: <Calendar className="h-6 w-6 text-purple-600" />,
            path: "/calendar",
            color: "from-purple-50 to-white",
            delay: 0
          },
          {
            title: "Content Library",
            description: "Browse and manage your content assets",
            icon: <Library className="h-6 w-6 text-blue-600" />,
            path: "/content-library",
            color: "from-blue-50 to-white",
            delay: 1
          },
          {
            title: "Approvals",
            description: "Review pending content approvals and workflows",
            icon: <ClipboardCheck className="h-6 w-6 text-green-600" />,
            path: "/approvals",
            color: "from-green-50 to-white",
            delay: 2
          },
          {
            title: "Messages",
            description: "Manage comments and direct messages",
            icon: <MessageSquare className="h-6 w-6 text-amber-600" />,
            path: "/messages",
            color: "from-amber-50 to-white",
            delay: 3
          }
        ].map((item, index) => (
          <AnimatedCard
            key={index}
            className={`hover:shadow transition-all duration-300 bg-gradient-to-br ${item.color} border-none`}
            delay={item.delay}
          >
            <div className="flex flex-col h-full">
              <div className="p-3 rounded-xl bg-white inline-block mb-4 shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-lg font-medium text-resort-800 mb-2">{item.title}</h3>
              <p className="text-resort-600 text-sm mb-4">{item.description}</p>
              <div className="mt-auto">
                <Link to={item.path}>
                  <Button variant="ghost" className="text-ocean-600 hover:text-ocean-700 hover:bg-ocean-50 p-0">
                    Go to {item.title} <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Notification Panel - Desktop View */}
        <div className="lg:col-span-1 hidden md:block">
          <Card className="p-0 overflow-hidden h-full">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-medium text-resort-800">Recent Activity</h3>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              <RecentActivity />
            </div>
          </Card>
        </div>
        
        {/* AI Tools - Expanded to fill column */}
        <div className="lg:col-span-2">
          <Card className="p-6 bg-white/80 backdrop-blur-sm h-full">
            <h3 className="text-lg font-medium text-resort-800 mb-4">AI Tools</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link to="/campaigns" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-purple-50 mr-3">
                    <BrainCircuit className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-resort-800">Campaigns</p>
                    <p className="text-xs text-resort-500">Create data-driven marketing campaigns</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-resort-400" />
              </Link>
              
              <Link to="/market-intelligence" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-blue-50 mr-3">
                    <LineChart className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-resort-800">Market Intelligence</p>
                    <p className="text-xs text-resort-500">Monitor trends and track competitors</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-resort-400" />
              </Link>
              
              <Link to="/content-library" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-green-50 mr-3">
                    <Image className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-resort-800">Content Generator</p>
                    <p className="text-xs text-resort-500">Create AI images, videos and posts</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-resort-400" />
              </Link>
              
              <Link to="/settings" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-amber-50 mr-3">
                    <Settings className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-resort-800">Settings</p>
                    <p className="text-xs text-resort-500">Configure integrations and preferences</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-resort-400" />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
