
import React from 'react';
import { motion } from 'framer-motion';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import QuickAccessGrid from '@/components/dashboard/QuickAccessGrid';
import AIToolsSection from '@/components/dashboard/AIToolsSection';
import RecentActivityCard from '@/components/dashboard/RecentActivityCard';

const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <DashboardHeader />
      
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
