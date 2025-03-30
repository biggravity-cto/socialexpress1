
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, BrainCircuit, MessageSquare } from 'lucide-react';

interface HeroSectionProps {
  scrollToFeatures: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToFeatures }) => {
  return (
    <div className="relative pt-28 pb-20 md:pt-32 md:pb-24 overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Simplify Your Social Media Management
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-lg">
              BG Social Express is an all-in-one platform for hospitality brands to create, schedule, and analyze content across all social channels with AI-powered tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login">
                <Button size="lg" className="bg-ocean-600 hover:bg-ocean-700 text-white px-8">
                  Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" onClick={scrollToFeatures}>
                Explore Features
              </Button>
            </div>
            
            <div className="mt-12 flex flex-wrap gap-8">
              <div className="flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-ocean-600" />
                <span className="text-slate-700">AI-Powered Content Creation</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-ocean-600" />
                <span className="text-slate-700">Smart Scheduling</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-ocean-600" />
                <span className="text-slate-700">Unified Social Inbox</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="bg-ocean-600 h-12 flex items-center px-4">
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
