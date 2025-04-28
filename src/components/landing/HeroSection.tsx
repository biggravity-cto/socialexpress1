
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, Star } from 'lucide-react';

const HeroSection: React.FC = () => {
  const scrollToPillars = () => {
    document.getElementById('pillars')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPackages = () => {
    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center">
          {/* Hero Text Content */}
          <div className="w-full md:w-1/2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              <h2 className="text-lg md:text-xl font-medium text-brand-primary uppercase tracking-widest mb-2">
                Ignite & Inspire
              </h2>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Imagine your resort filled with the world's most discerning travelers—from{' '}
                <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                  Seoul to San Francisco
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mt-6 max-w-lg leading-relaxed">
                We turn platform mastery into packed rooms and sold-out experiences. Starting with Korea, expanding across Asia-Pacific and the U.S.
              </p>
              
              <div className="flex items-center pt-2">
                <span className="flex items-center gap-0.5">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                </span>
                <span className="ml-2 text-sm font-medium text-gray-600">
                  Trusted by 50+ luxury resorts & lifestyle brands
                </span>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button 
                size="lg" 
                className="relative group overflow-hidden bg-gradient-to-r from-brand-primary to-brand-secondary text-white hover:opacity-90"
                onClick={scrollToPillars}
              >
                <span className="relative z-10">See How We Filled 40% More Rooms</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={scrollToPackages}
                className="border-brand-primary hover:bg-brand-primary/5 group"
              >
                Explore Tailored Packages
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>
          
          {/* Hero Image */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full md:w-1/2 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-brand-primary/20 shadow-2xl shadow-brand-primary/10">
              {/* Overlay metrics */}
              <div className="absolute top-6 right-6 backdrop-blur-md bg-white/90 p-4 rounded-xl z-10 text-sm font-medium">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-brand-secondary">+35%</span>
                  <span className="text-gray-600">Higher Occupancy</span>
                </div>
              </div>
              <div className="absolute bottom-6 left-6 backdrop-blur-md bg-white/90 p-4 rounded-xl z-10 text-sm font-medium">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-brand-secondary">+50%</span>
                  <span className="text-gray-600">Social Engagement</span>
                </div>
              </div>
              
              {/* Main image */}
              <img 
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Luxury resort with infinity pool overlooking ocean" 
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
