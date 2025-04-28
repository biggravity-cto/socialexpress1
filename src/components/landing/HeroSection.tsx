
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CalendarDays } from 'lucide-react';
import GravityVortex from '@/components/ui/GravityVortex';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white">
      <GravityVortex />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <span className="inline-block text-gray-700 text-lg font-medium tracking-wider mb-4">
            INNOVATIVE DIGITAL SOLUTIONS
          </span>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 font-display tracking-tight">
            Harness the Power of Big Gravity
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Data-driven strategies that elevate your brand and transform your digital presence.
          </p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <Button 
              size="lg"
              className="relative group bg-gradient-to-r from-brand-green to-brand-secondary hover:opacity-90 text-gray-900 font-medium px-8 py-6 h-auto text-lg shadow-md"
            >
              <CalendarDays className="mr-2 h-5 w-5" />
              Book a Strategy Call
            </Button>
          </motion.div>
          
          <div className="mt-12">
            <p className="text-gray-600 text-sm font-medium mb-2">Trusted by Leading Brands</p>
            <div className="flex items-center justify-center gap-2">
              <span className="flex items-center gap-0.5">
                {[1,2,3,4,5].map((star) => (
                  <span key={star} className="text-brand-green">★</span>
                ))}
              </span>
              <span className="text-gray-600 text-sm">
                50+ Innovative Companies
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
