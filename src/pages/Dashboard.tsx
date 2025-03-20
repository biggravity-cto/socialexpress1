
import React from 'react';
import Sidebar from '@/components/navigation/Sidebar';
import PerformanceMetrics from '@/components/dashboard/PerformanceMetrics';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Calendar, MessageSquare, Settings, Image, Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { motion } from 'framer-motion';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-resort-50 to-white">
      <Sidebar />
      
      <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 ml-0 md:ml-20 lg:ml-64 transition-all duration-300 overflow-hidden">
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-resort-800 mb-1">Welcome Back</h1>
              <p className="text-resort-500">Here's what's happening with your resort's social media</p>
            </div>
            <div className="flex items-center space-x-2">
              <Link to="/posts">
                <Button className="bg-ocean-600 hover:bg-ocean-700 shadow-sm">
                  <Plus className="mr-1.5 h-4 w-4" /> New Post
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <PerformanceMetrics />
          </div>
          <div>
            <RecentActivity />
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
              title: "Create Post",
              description: "Draft and schedule new social media content",
              icon: <Image className="h-6 w-6 text-blue-600" />,
              path: "/posts",
              color: "from-blue-50 to-white",
              delay: 1
            },
            {
              title: "Analytics",
              description: "Track performance across all platforms",
              icon: <BarChart className="h-6 w-6 text-green-600" />,
              path: "/analytics",
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 p-6 bg-white/80 backdrop-blur-sm">
            <h3 className="text-lg font-medium text-resort-800 mb-4">Recent Performance</h3>
            <div className="flex items-center space-x-4">
              <div className="flex-1 border border-gray-100 rounded-lg p-4">
                <p className="text-sm text-resort-500">Engagement Rate</p>
                <p className="text-2xl font-semibold text-resort-800 mt-1">4.8%</p>
                <div className="flex items-center mt-1 text-green-600 text-xs font-medium">
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  2.1% from last week
                </div>
              </div>
              <div className="flex-1 border border-gray-100 rounded-lg p-4">
                <p className="text-sm text-resort-500">Reach</p>
                <p className="text-2xl font-semibold text-resort-800 mt-1">14.2K</p>
                <div className="flex items-center mt-1 text-green-600 text-xs font-medium">
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  5.3% from last week
                </div>
              </div>
              <div className="flex-1 border border-gray-100 rounded-lg p-4">
                <p className="text-sm text-resort-500">Profile Visits</p>
                <p className="text-2xl font-semibold text-resort-800 mt-1">3.4K</p>
                <div className="flex items-center mt-1 text-red-600 text-xs font-medium">
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M5 12L12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  1.2% from last week
                </div>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-white/80 backdrop-blur-sm">
            <h3 className="text-lg font-medium text-resort-800 mb-4">Quick Settings</h3>
            <div className="space-y-3">
              <Link to="/settings/profile" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-ocean-50 mr-3">
                    <Settings className="h-5 w-5 text-ocean-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-resort-800">Account Settings</p>
                    <p className="text-xs text-resort-500">Update your profile and preferences</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-resort-400" />
              </Link>
              <Link to="/settings/team" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-purple-50 mr-3">
                    <Settings className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-resort-800">Team Settings</p>
                    <p className="text-xs text-resort-500">Manage team members and permissions</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-resort-400" />
              </Link>
              <Link to="/settings/integrations" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-green-50 mr-3">
                    <Settings className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-resort-800">Integrations</p>
                    <p className="text-xs text-resort-500">Connect your social media accounts</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-resort-400" />
              </Link>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
