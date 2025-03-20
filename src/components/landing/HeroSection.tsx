
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowDown } from 'lucide-react';
import BlurredSection from '@/components/ui/BlurredSection';
import GlassPanel from '@/components/ui/GlassPanel';
import { CheckCircle, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  scrollToFeatures: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToFeatures }) => {
  return (
    <section className="relative pt-20 md:pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-ocean-50 text-ocean-600 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              AI-Powered Social Media Management
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-resort-900 mb-6 leading-tight tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Elevate Your Resort's <span className="text-ocean-600">Digital Presence</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-resort-600 mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Streamline your hospitality marketing with our all-in-one platform. Create stunning content, manage campaigns, and analyze performance—all in one place.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Link to="/dashboard">
              <Button className="bg-ocean-600 hover:bg-ocean-700 text-white px-8 py-6 rounded-lg text-lg transition-all duration-300 shadow-sm hover:shadow">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              onClick={scrollToFeatures}
              className="px-8 py-6 rounded-lg text-lg bg-white/70 backdrop-blur-sm transition-all duration-300"
            >
              Explore Features <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
        
        <motion.div 
          className="relative mt-8 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <BlurredSection intensity="strong" color="bg-white/20" className="rounded-2xl overflow-hidden shadow-xl">
            <img 
              src="/placeholder.svg" 
              alt="ResortFlux Dashboard Preview" 
              className="w-full h-auto rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-resort-900/20 to-transparent rounded-2xl"></div>
          </BlurredSection>
          
          {/* Floating elements */}
          <div className="absolute -left-4 top-1/4 transform -translate-y-1/2 hidden md:block">
            <GlassPanel className="p-4 animate-pulse-slow">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-ocean-100">
                  <CheckCircle className="h-5 w-5 text-ocean-600" />
                </div>
                <div className="text-sm font-medium text-resort-800">Post Scheduled</div>
              </div>
            </GlassPanel>
          </div>
          
          <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 hidden md:block">
            <GlassPanel className="p-4 animate-pulse-slow" style={{ animationDelay: '1s' }}>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-green-100">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-sm font-medium text-resort-800">+27% Engagement</div>
              </div>
            </GlassPanel>
          </div>
        </motion.div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-ocean-100 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sand-100 rounded-full filter blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default HeroSection;
