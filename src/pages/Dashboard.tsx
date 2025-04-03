
import React from 'react';
import { motion } from 'framer-motion';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import QuickAccessGrid from '@/components/dashboard/QuickAccessGrid';
import AIToolsSection from '@/components/dashboard/AIToolsSection';
import RecentActivityCard from '@/components/dashboard/RecentActivityCard';
import { Button } from '@/components/ui/button';
import { LineChart, BarChart3, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {[
        { 
          title: 'Content Engagement', 
          value: '78%', 
          change: '+12%', 
          icon: <TrendingUp className="h-5 w-5 text-emerald-500" />,
          color: 'bg-emerald-50 border-emerald-100'
        },
        { 
          title: 'Audience Growth', 
          value: '2,456', 
          change: '+256', 
          icon: <Users className="h-5 w-5 text-blue-500" />,
          color: 'bg-blue-50 border-blue-100'
        },
        { 
          title: 'Campaign ROI', 
          value: '182%', 
          change: '+24%', 
          icon: <BarChart3 className="h-5 w-5 text-purple-500" />,
          color: 'bg-purple-50 border-purple-100'
        },
        { 
          title: 'Brand Sentiment', 
          value: '92%', 
          change: '+7%', 
          icon: <LineChart className="h-5 w-5 text-amber-500" />,
          color: 'bg-amber-50 border-amber-100'
        }
      ].map((metric, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`rounded-xl p-4 border shadow-sm ${metric.color}`}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
            <div className="p-2 rounded-full bg-white shadow-sm">
              {metric.icon}
            </div>
          </div>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold mr-2">{metric.value}</span>
            <span className="text-xs font-medium text-emerald-600">{metric.change}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const RecommendedActions = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      className="mb-8 p-4 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-purple-50"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-3">
        <div>
          <h3 className="text-lg font-medium text-resort-800">Recommended Actions</h3>
          <p className="text-sm text-resort-500">AI-powered suggestions to optimize your marketing</p>
        </div>
        <Button variant="outline" className="mt-2 md:mt-0 bg-white">
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          {
            title: "Create a wellness campaign",
            description: "Your audience shows high interest in wellness content",
            path: "/campaigns",
            color: "border-purple-100 bg-white"
          },
          {
            title: "Optimize posting schedule",
            description: "Your audience is most active between 6-8 PM",
            path: "/calendar",
            color: "border-blue-100 bg-white"
          },
          {
            title: "Respond to trending topic",
            description: "Eco-friendly amenities are trending in your industry",
            path: "/content",
            color: "border-green-100 bg-white"
          }
        ].map((action, index) => (
          <Link key={index} to={action.path} className="block">
            <div className={`p-4 rounded-lg border ${action.color} hover:shadow-md transition-shadow duration-200`}>
              <h4 className="font-medium text-resort-800">{action.title}</h4>
              <p className="text-sm text-resort-500 mt-1">{action.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <DashboardHeader />
      
      <DashboardMetrics />
      
      <RecommendedActions />
      
      <QuickAccessGrid />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <AIToolsSection />
        </div>
        
        <div>
          <RecentActivityCard />
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
