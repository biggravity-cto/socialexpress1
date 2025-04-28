
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CalendarDays } from 'lucide-react';
import GravityVortex from '@/components/ui/GravityVortex';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <GravityVortex />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <span className="inline-block text-ocean-200 text-lg font-medium tracking-wider mb-4">
            KOREAN MARKET SPECIALISTS
          </span>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-display tracking-tight">
            Unlock the Korean Tourism Market
          </h1>
          
          <p className="text-xl md:text-2xl text-ocean-100 max-w-2xl mx-auto leading-relaxed">
            Empower your luxury hospitality brand with data-driven strategies and cultural expertise.
          </p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <Button 
              size="lg"
              className="relative group bg-ocean-500 hover:bg-ocean-600 text-white font-medium px-8 py-6 h-auto text-lg"
            >
              <CalendarDays className="mr-2 h-5 w-5" />
              Book a Strategy Call
            </Button>
          </motion.div>
          
          <div className="mt-12">
            <p className="text-ocean-200 text-sm font-medium mb-2">Trusted by Leading Brands</p>
            <div className="flex items-center justify-center gap-2">
              <span className="flex items-center gap-0.5">
                {[1,2,3,4,5].map((star) => (
                  <span key={star} className="text-brand-primary">★</span>
                ))}
              </span>
              <span className="text-ocean-200 text-sm">
                50+ Luxury Resorts & Lifestyle Brands
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
