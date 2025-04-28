
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CalendarDays } from 'lucide-react';
import GravityVortex from '@/components/ui/GravityVortex';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-space-dark">
      <GravityVortex />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <span className="inline-block text-brand-green text-lg font-medium tracking-wider mb-4">
            AI-POWERED TRANSFORMATION
            <span className="ml-2 text-sm align-text-top">b<sup>g</sup></span>
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-display tracking-tight leading-tight">
            Helping brands reach Asian markets
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Understand, attract, and profit from Korean and other Asian tourism markets.
          </p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <Button 
              size="lg"
              className="relative group bg-gradient-to-r from-brand-green to-brand-primary hover:opacity-90 text-space-dark font-medium px-8 py-6 h-auto text-lg shadow-glow"
            >
              <CalendarDays className="mr-2 h-5 w-5" />
              Book a Strategy Call
            </Button>
          </motion.div>
          
          <div className="mt-12">
            <p className="text-gray-400 text-sm font-medium mb-2">Trusted by Leading Brands</p>
            <div className="flex items-center justify-center gap-2">
              <span className="flex items-center gap-0.5">
                {[1,2,3,4,5].map((star) => (
                  <span key={star} className="text-brand-green">★</span>
                ))}
              </span>
              <span className="text-gray-400 text-sm">
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
