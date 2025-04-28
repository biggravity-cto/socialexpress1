
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CalendarDays } from 'lucide-react';

const HeroSection: React.FC = () => {
  const scrollToPackages = () => {
    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a14] to-[#1c1c2e] opacity-95" />
      
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[200%] h-[200%] animate-[spin_20s_linear_infinite] opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-primary via-brand-secondary to-transparent rounded-full blur-3xl" />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-lg md:text-xl font-medium text-brand-primary uppercase tracking-widest">
              Digital Marketing Excellence
            </h2>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight">
              Elevate Your Hospitality Brand's Digital Presence
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mt-6 max-w-2xl mx-auto leading-relaxed">
              Global reach, local expertise. Transforming luxury hospitality brands through data-driven digital marketing.
            </p>
            
            <div className="flex items-center justify-center gap-2">
              <span className="flex items-center gap-0.5">
                <span className="text-brand-primary">★</span>
                <span className="text-brand-primary">★</span>
                <span className="text-brand-primary">★</span>
                <span className="text-brand-primary">★</span>
                <span className="text-brand-primary">★</span>
              </span>
              <span className="ml-2 text-sm font-medium text-gray-300">
                Trusted by 50+ luxury resorts & lifestyle brands
              </span>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <Button 
              size="lg"
              className="relative group overflow-hidden bg-gradient-to-r from-brand-primary to-brand-secondary text-white hover:opacity-90 px-8"
            >
              <CalendarDays className="mr-2 h-5 w-5" />
              <span className="relative z-10">Book a Strategy Call</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
