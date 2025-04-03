import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, Sparkles, BrainCircuit, CalendarDays, BarChart3 } from 'lucide-react';
import EarlyAccessModal from './EarlyAccessModal';

interface HeroSectionProps {
  scrollToFeatures: () => void;
}

const HeroSection = ({ scrollToFeatures }: HeroSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <section className="relative py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-ocean-50 text-ocean-600 border border-ocean-100"
          >
            <Sparkles className="h-4 w-4 mr-1.5 text-ocean-500" />
            <span>Limited Spots Available</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
          >
            Redefine Hospitality Marketing <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-ocean-600 to-ocean-500">Intelligence</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="text-xl text-gray-600 mx-auto"
          >
            Delight guests, drive revenues, and increase team efficiency with our AI-powered digital marketing platform designed exclusively for hotels, resorts, and hospitality brands.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-wrap gap-4 pt-2 justify-center"
          >
            <Button 
              size="lg" 
              className="h-12 px-6 bg-ocean-600 hover:bg-ocean-700 transition-all duration-300 shadow-md hover:shadow-lg"
              onClick={() => setIsModalOpen(true)}
            >
              Request Early Access
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-12 px-6 transition-all duration-300 hover:bg-gray-50" 
              onClick={scrollToFeatures}
            >
              Explore Features
            </Button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="flex flex-wrap items-center gap-4 pt-6 text-sm text-gray-500 justify-center"
          >
            <motion.div 
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="flex items-center"
            >
              <BrainCircuit className="h-5 w-5 text-ocean-500 mr-2" />
              <span>AI-Powered Tools</span>
            </motion.div>
            <motion.div 
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="flex items-center"
            >
              <CalendarDays className="h-5 w-5 text-ocean-500 mr-2" />
              <span>Unified Calendar</span>
            </motion.div>
            <motion.div 
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="flex items-center"
            >
              <BarChart3 className="h-5 w-5 text-ocean-500 mr-2" />
              <span>Brand Intelligence</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.7 }}
        className="mt-16 pt-8 border-t border-gray-100"
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-sm text-gray-500 mb-6">Trusted by leading hospitality brands worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {['Resort Group', 'Wellness Retreat Collection', 'City Hotels International', 'Premium Spa Network', 'Island Getaways'].map((brand, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, color: '#0EA5E9' }}
                className="text-gray-400 font-medium text-base transition-all duration-300"
              >
                {brand}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Early Access Modal */}
      <EarlyAccessModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>
  );
};

export default HeroSection;
