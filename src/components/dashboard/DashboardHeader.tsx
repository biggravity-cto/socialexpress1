
import React from 'react';
import { Button } from '@/components/ui/button';
import { BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardHeaderProps {
  onAIButtonClick: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onAIButtonClick }) => {
  // Get current time to customize greeting
  const currentHour = new Date().getHours();
  let greeting = "Good morning";
  
  if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good afternoon";
  } else if (currentHour >= 17) {
    greeting = "Good evening";
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-resort-800 mb-2">
            {greeting}, <span className="text-ocean-600">Alex</span>
          </h1>
          <p className="text-resort-600 max-w-xl">
            Your AI Hospitality Marketing Hub—Turn Guest Data into Revenue.
          </p>
          <p className="text-resort-600 mt-2 max-w-xl">
            Smarter Hotel Marketing Starts Here—More Bookings, Better Guest Engagement.
          </p>
        </div>
        <Button 
          onClick={onAIButtonClick}
          className="bg-ocean-600 hover:bg-ocean-700 py-6 shadow-sm"
        >
          <BrainCircuit className="mr-2 h-5 w-5" />
          Chat with AI Marketing Manager
        </Button>
      </div>
    </motion.div>
  );
};

export default DashboardHeader;
