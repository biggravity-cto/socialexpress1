
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  scrollToFeatures: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToFeatures }) => {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center">
          {/* Hero Text Content */}
          <div className="w-full md:w-1/2 space-y-6">
            <div className="inline-flex items-center rounded-full border border-ocean-100 bg-ocean-50 px-3 py-1 text-sm text-ocean-700 mb-4">
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-ocean-500 text-ocean-500" />
                <Star className="h-3.5 w-3.5 fill-ocean-500 text-ocean-500" />
                <Star className="h-3.5 w-3.5 fill-ocean-500 text-ocean-500" />
                <Star className="h-3.5 w-3.5 fill-ocean-500 text-ocean-500" />
                <Star className="h-3.5 w-3.5 fill-ocean-500 text-ocean-500" />
              </span>
              <span className="ml-2 font-medium">Trusted by 5-star hospitality resorts</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-resort-900">
              AI Marketing Made for <span className="text-ocean-600">Hospitality</span>
            </h1>
            
            <p className="text-xl text-resort-600 max-w-lg">
              Turn guest data into revenue with GuestFlow — the all-in-one platform for hotels and resorts to create, manage, and analyze marketing campaigns that increase direct bookings.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="w-full sm:w-auto">
                <Link to="/auth" className="w-full">
                  Get Early Access
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={scrollToFeatures}
                className="w-full sm:w-auto group"
              >
                See How It Works
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            
            <div className="text-sm text-resort-500 pt-2">
              No credit card required • Limited early access spots • Cancel anytime
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="w-full md:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative z-10"
            >
              <div className="relative overflow-hidden rounded-xl shadow-2xl border border-gray-100">
                <div className="absolute top-0 right-0 bg-ocean-600/90 text-white p-3 rounded-bl-xl z-10 text-sm font-medium">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold">+42%</span>
                    <span>Direct Bookings</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 bg-ocean-600/90 text-white p-3 rounded-tr-xl z-10 text-sm font-medium">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold">+67%</span>
                    <span>Guest Engagement</span>
                  </div>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Luxury resort with swimming pool and palm trees" 
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-ocean-700/20 via-transparent to-transparent"></div>
              </div>
            </motion.div>
            
            {/* Decorative elements */}
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-ocean-100/30 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -left-8 top-1/3 w-32 h-32 bg-purple-100/30 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
