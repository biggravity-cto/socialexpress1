
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, BrainCircuit, Calendar, MessageSquare, BarChart3, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  scrollToFeatures: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToFeatures }) => {
  return (
    <div className="relative pt-28 pb-20 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-b from-ocean-50/50 to-white">
      <div className="container px-4 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-ocean-100 text-ocean-600 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              AI Marketing Automation for Luxury Hospitality
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 leading-tight">
              The Smarter Way to Fill Your Luxury Resort
            </h1>
            <p className="text-xl text-slate-600 mb-6 max-w-lg">
              Delight Guests • Increase Revenue • Enhance Efficiency
            </p>
            <p className="text-lg text-slate-600 mb-8 max-w-lg">
              Our comprehensive AI-powered marketing platform helps premium resorts attract high-value guests while streamlining operations across all channels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login">
                <Button size="lg" className="bg-ocean-600 hover:bg-ocean-700 text-white px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  Start 14-Day Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" onClick={scrollToFeatures} className="py-6 rounded-xl">
                Explore Features
              </Button>
            </div>
            
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-sm">
                <div className="bg-ocean-50 p-2 rounded-md">
                  <BrainCircuit className="h-5 w-5 text-ocean-600" />
                </div>
                <span className="text-slate-700 font-medium">AI Strategy & Content</span>
              </div>
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-sm">
                <div className="bg-purple-50 p-2 rounded-md">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-slate-700 font-medium">Omnichannel Marketing</span>
              </div>
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-sm">
                <div className="bg-amber-50 p-2 rounded-md">
                  <MessageSquare className="h-5 w-5 text-amber-600" />
                </div>
                <span className="text-slate-700 font-medium">Premium Guest Acquisition</span>
              </div>
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-sm">
                <div className="bg-green-50 p-2 rounded-md">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-slate-700 font-medium">Revenue Optimization</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-ocean-500 to-ocean-600 h-14 flex items-center px-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <img 
                src="/dashboard-preview.png" 
                alt="BG Social Express Dashboard" 
                className="w-full h-auto"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  e.currentTarget.src = "https://placehold.co/600x400/ocean/white?text=BG+Social+Express";
                }}
              />
              
              {/* Floating elements */}
              <motion.div 
                className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4 max-w-[180px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-resort-800">Engagement up 37%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '74%' }}></div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-ocean-500" />
                  <span className="font-medium text-sm text-resort-800">12 posts scheduled</span>
                </div>
              </motion.div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-64 h-64 bg-resort-200 rounded-full opacity-50 blur-3xl"></div>
            <div className="absolute -z-10 -top-6 -left-6 w-48 h-48 bg-ocean-200 rounded-full opacity-50 blur-3xl"></div>
          </motion.div>
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -z-10 w-1/3 h-1/3 bg-gradient-to-bl from-ocean-100 to-transparent opacity-30 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-1/3 h-1/3 bg-gradient-to-tr from-resort-100 to-transparent opacity-30 blur-3xl"></div>
    </div>
  );
};

export default HeroSection;
