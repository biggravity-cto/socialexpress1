
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  MessageSquare, 
  Settings, 
  Library, 
  Plus, 
  ArrowRight, 
  ClipboardCheck, 
  BrainCircuit, 
  LineChart, 
  Image, 
  Video, 
  FileText, 
  Sparkles 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-resort-800 mb-1">
            Welcome{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ' Back'}
          </h1>
          <p className="text-resort-500">Here's what's happening with your social media</p>
        </div>
        <div className="flex items-center space-x-2">
          <Link to="/content">
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
            title: "Content Studio",
            description: "Browse and manage your content assets",
            icon: <Library className="h-6 w-6 text-blue-600" />,
            path: "/content",
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
            title: "Unified Social Inbox",
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
              
              <Link to="/content" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-green-50 mr-3">
                    <Image className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-resort-800">Image Generator</p>
                    <p className="text-xs text-resort-500">Create AI-powered images for your content</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-resort-400" />
              </Link>
              
              <Link to="/content" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-red-50 mr-3">
                    <Video className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-resort-800">Video Generator</p>
                    <p className="text-xs text-resort-500">Create engaging AI-powered videos</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-resort-400" />
              </Link>
              
              <Link to="/content" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-indigo-50 mr-3">
                    <FileText className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-resort-800">Text Generator</p>
                    <p className="text-xs text-resort-500">Create compelling copy for posts</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-resort-400" />
              </Link>
              
              <Link to="/settings" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-amber-50 mr-3">
                    <Sparkles className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-resort-800">Smart Suggestions</p>
                    <p className="text-xs text-resort-500">Get AI recommendations based on analytics</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-resort-400" />
              </Link>
            </div>
          </Card>
        </div>
        
        <div>
          <Card className="bg-white/80 backdrop-blur-sm h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-medium text-resort-800">Recent Activity</h3>
              <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">3 new</Badge>
            </div>
            <RecentActivity compact={true} />
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
