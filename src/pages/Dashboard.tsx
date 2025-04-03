
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import QuickAccessGrid from '@/components/dashboard/QuickAccessGrid';
import AIToolsSection from '@/components/dashboard/AIToolsSection';
import RecentActivityCard from '@/components/dashboard/RecentActivityCard';
import DashboardMetrics from '@/components/dashboard/DashboardMetrics';
import RecommendedActions from '@/components/dashboard/RecommendedActions';
import AIMarketingManagerDialog from '@/components/dashboard/AIMarketingManagerDialog';

const Dashboard = () => {
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <DashboardHeader onAIButtonClick={() => setIsAIModalOpen(true)} />
      
      <QuickAccessGrid />
      
      <DashboardMetrics />
      
      <RecommendedActions />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <AIToolsSection />
        </div>
        
        <div>
          <RecentActivityCard />
        </div>
      </div>
      
      <AIMarketingManagerDialog open={isAIModalOpen} onOpenChange={setIsAIModalOpen} />
    </motion.div>
  );
};

export default Dashboard;
