
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import EarlyAccessModal from './EarlyAccessModal';

interface HeroSectionProps {
  scrollToFeatures: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToFeatures }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <section className="py-8 md:py-12 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block px-4 py-1.5 bg-ocean-50 text-ocean-600 rounded-full text-sm font-medium"
            >
              Hospitality Marketing Reimagined
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-resort-900 leading-tight"
            >
              Elevate Your <span className="text-ocean-600">Hotel's</span> Digital Experience
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg text-resort-700 max-w-lg"
            >
              Delight guests, drive revenues, and increase team efficiency with our AI-powered digital marketing platform designed exclusively for hotels, resorts, and hospitality brands.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                className="py-6 px-6 bg-ocean-600 hover:bg-ocean-700"
                onClick={() => setIsModalOpen(true)}
              >
                Request Early Access
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                className="py-6 px-6 border-ocean-200 text-ocean-700 hover:bg-ocean-50"
                onClick={scrollToFeatures}
              >
                Explore Features
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-2 text-sm text-resort-600"
            >
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>No credit card required</span>
              <span className="mx-2">•</span>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>14-day free trial</span>
              <span className="mx-2">•</span>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Cancel anytime</span>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-yellow-100 rounded-full filter blur-xl opacity-70"></div>
              <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-ocean-100 rounded-full filter blur-xl opacity-70"></div>
              
              <div className="relative bg-white rounded-xl overflow-hidden shadow-xl border border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1980&q=80" 
                  alt="Dashboard Preview" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-resort-800">Bookings increased by 27% this month</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <EarlyAccessModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>
  );
};

export default HeroSection;
