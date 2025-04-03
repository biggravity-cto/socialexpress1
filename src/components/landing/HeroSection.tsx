
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, BrainCircuit, Calendar, MessageSquare, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import EarlyAccessModal from './EarlyAccessModal';

interface HeroSectionProps {
  scrollToFeatures: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToFeatures }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  const featureItemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="relative pt-28 pb-20 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-b from-ocean-50/50 via-ocean-50/30 to-white">
      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span 
            className="inline-block bg-ocean-100 text-ocean-600 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            variants={itemVariants}
          >
            AI Powered Guest Journeys
          </motion.span>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 leading-tight"
            variants={itemVariants}
          >
            The AI Marketing & Sales Platform for Hospitality Resorts
          </motion.h1>
          
          <motion.p 
            className="text-xl text-slate-600 mb-6"
            variants={itemVariants}
          >
            Delight Guests • Increase Revenue • Enhance Efficiency
          </motion.p>
          
          <motion.p 
            className="text-lg text-slate-600 mb-8 mx-auto max-w-2xl"
            variants={itemVariants}
          >
            Our comprehensive AI-powered marketing platform helps premium resorts attract high-value guests while streamlining operations across all channels.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10"
          >
            <Button 
              onClick={openModal}
              size="lg" 
              className="bg-ocean-600 hover:bg-ocean-700 h-12 px-8 rounded-lg w-full sm:w-auto
              transition-all duration-300 transform hover:scale-105"
            >
              Request Early Access <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              onClick={scrollToFeatures} 
              className="h-12 px-8 rounded-lg border-ocean-300 text-ocean-700 w-full sm:w-auto
              hover:bg-ocean-50 hover:border-ocean-400 transition-all duration-300"
            >
              Explore Features
            </Button>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            <motion.div 
              className="flex flex-col items-center gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:translate-y-[-5px]"
              variants={featureItemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="bg-ocean-50 p-2 rounded-md">
                <BrainCircuit className="h-5 w-5 text-ocean-600" />
              </div>
              <span className="text-slate-700 font-medium text-center">AI Strategy & Content</span>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:translate-y-[-5px]"
              variants={featureItemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="bg-purple-50 p-2 rounded-md">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-slate-700 font-medium text-center">Omnichannel Marketing</span>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:translate-y-[-5px]"
              variants={featureItemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="bg-amber-50 p-2 rounded-md">
                <MessageSquare className="h-5 w-5 text-amber-600" />
              </div>
              <span className="text-slate-700 font-medium text-center">Premium Guest Acquisition</span>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:translate-y-[-5px]"
              variants={featureItemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="bg-green-50 p-2 rounded-md">
                <BarChart3 className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-slate-700 font-medium text-center">Revenue Optimization</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Background decorations with animations */}
      <motion.div 
        className="absolute top-0 right-0 -z-10 w-1/3 h-1/3 bg-gradient-to-bl from-ocean-100 to-transparent opacity-30 blur-3xl"
        animate={{ 
          opacity: [0.2, 0.3, 0.2],
          scale: [1, 1.05, 1],
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 -z-10 w-1/3 h-1/3 bg-gradient-to-tr from-resort-100 to-transparent opacity-30 blur-3xl"
        animate={{ 
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      />
      
      {/* Early Access Modal */}
      <EarlyAccessModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};

export default HeroSection;
