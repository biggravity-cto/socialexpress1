
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, Sparkles, BrainCircuit, CalendarDays, BarChart3 } from 'lucide-react';

interface HeroSectionProps {
  scrollToFeatures: () => void;
}

const HeroSection = ({ scrollToFeatures }: HeroSectionProps) => {
  return (
    <section className="relative py-20 md:py-28 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
            <Sparkles className="h-4 w-4 mr-1.5" />
            <span>Introducing AI-Powered Marketing</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Redefine Hospitality Marketing <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-ocean-600 to-ocean-500">Intelligence</span>
          </h1>
          
          <p className="text-xl text-gray-600 mx-auto">
            A sophisticated digital marketing platform designed exclusively for luxury hospitality brands. Streamline strategic marketing with AI-driven content creation, data-informed campaigns, and actionable brand intelligence.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-2 justify-center">
            <Button size="lg" className="h-12 px-6 bg-ocean-600 hover:bg-ocean-700">
              Request Early Access
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-6" onClick={scrollToFeatures}>
              Explore Features
            </Button>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 pt-6 text-sm text-gray-500 justify-center">
            <div className="flex items-center">
              <BrainCircuit className="h-5 w-5 text-ocean-500 mr-2" />
              <span>AI-Powered Tools</span>
            </div>
            <div className="flex items-center">
              <CalendarDays className="h-5 w-5 text-ocean-500 mr-2" />
              <span>Unified Calendar</span>
            </div>
            <div className="flex items-center">
              <BarChart3 className="h-5 w-5 text-ocean-500 mr-2" />
              <span>Brand Intelligence</span>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="mt-16 pt-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-sm text-gray-500 mb-6">Trusted by leading hospitality brands worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {['Luxury Resort Group', 'Wellness Retreat Collection', 'City Hotels International', 'Premium Spa Network', 'Island Getaways'].map((brand, index) => (
              <div key={index} className="text-gray-400 font-medium text-base">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
