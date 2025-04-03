
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, Sparkles, BarChart3, CalendarDays, BrainCircuit } from 'lucide-react';

interface HeroSectionProps {
  scrollToFeatures: () => void;
}

const HeroSection = ({ scrollToFeatures }: HeroSectionProps) => {
  return (
    <section className="relative py-20 md:py-28 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
              <Sparkles className="h-4 w-4 mr-1.5" />
              <span>Introducing AI-Powered Marketing</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Elevate Your <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Hospitality Brand</span> with GuestFlow
            </h1>
            
            <p className="text-xl text-gray-600 max-w-xl">
              The all-in-one digital marketing platform designed exclusively for resorts, hotels, and spas. Simplify your workflow with AI-powered content creation, campaign management, and brand intelligence.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Button size="lg" className="h-12 px-6 bg-blue-600 hover:bg-blue-700">
                Start Free Trial
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-6" onClick={scrollToFeatures}>
                Explore Features
              </Button>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 pt-6 text-sm text-gray-500">
              <div className="flex items-center">
                <BrainCircuit className="h-5 w-5 text-blue-500 mr-2" />
                <span>AI-Powered Tools</span>
              </div>
              <div className="flex items-center">
                <CalendarDays className="h-5 w-5 text-green-500 mr-2" />
                <span>Unified Calendar</span>
              </div>
              <div className="flex items-center">
                <BarChart3 className="h-5 w-5 text-purple-500 mr-2" />
                <span>Brand Intelligence</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl border border-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1562664377-709f2c337eb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80" 
                alt="GuestFlow Dashboard" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="glass p-4 rounded-lg">
                  <p className="text-sm font-medium">GuestFlow Analytics Dashboard</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-5 -right-5 -z-10 w-full h-full rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 opacity-20 blur-xl"></div>
          </motion.div>
        </div>
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
