
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  // Scroll to packages section
  const scrollToPackages = () => {
    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to pillars section
  const scrollToPillars = () => {
    document.getElementById('pillars')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden text-white">
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
              <h2 className="text-lg md:text-xl font-medium text-ocean-300 uppercase tracking-widest mb-2">
                Ignite & Inspire
              </h2>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-white via-ocean-200 to-white bg-clip-text text-transparent">
                Imagine your resort filled with the world's most discerning travelers
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mt-6 max-w-lg leading-relaxed">
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
                <span className="ml-2 text-sm font-medium text-gray-300">
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
                className="relative group overflow-hidden bg-gradient-to-r from-ocean-600 to-ocean-500 hover:from-ocean-500 hover:to-ocean-400"
                onClick={scrollToPillars}
              >
                <span className="relative z-10">See How We Filled 40% More Rooms</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={scrollToPackages}
                className="text-ocean-300 border-ocean-700/50 hover:bg-ocean-900/30 group"
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
            <div className="relative rounded-2xl overflow-hidden border border-ocean-700/30 shadow-2xl shadow-ocean-700/20">
              {/* Overlay metrics */}
              <div className="absolute top-6 right-6 backdrop-blur-md bg-black/50 text-white p-4 rounded-xl z-10 text-sm font-medium">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-ocean-300">+35%</span>
                  <span>Higher Occupancy</span>
                </div>
              </div>
              <div className="absolute bottom-6 left-6 backdrop-blur-md bg-black/50 text-white p-4 rounded-xl z-10 text-sm font-medium">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-ocean-300">+50%</span>
                  <span>Social Engagement</span>
                </div>
              </div>
              
              {/* Main image */}
              <img 
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Luxury resort with infinity pool overlooking ocean" 
                className="w-full h-auto object-cover"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a14]/80 via-transparent to-transparent"></div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-ocean-500/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -left-8 top-1/3 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
