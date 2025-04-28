
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const logoRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-space-dark">
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-space-dark via-brand-primary/20 to-space-dark animate-gradient-x"
        style={{
          backgroundSize: '200% 200%',
          animation: 'gradient 15s ease infinite',
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <div className="relative inline-block" ref={logoRef}>
            <div className="relative">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-6xl font-medium tracking-tight bg-gradient-to-r from-brand-green to-brand-primary inline-block bg-clip-text text-transparent font-serif"
                style={{ fontFamily: "Georgia, serif" }}
              >
                g
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-3xl font-medium tracking-tight bg-gradient-to-r from-brand-green to-brand-primary absolute -top-3 -right-4 bg-clip-text text-transparent font-serif"
                style={{ fontFamily: "Georgia, serif" }}
              >
                b
              </motion.span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 font-display tracking-tight leading-tight">
            Empowering brands to reach the <span className="text-brand-green">Korean</span> market
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Understand, attract, and <span className="text-brand-green font-bold">delight</span> Korean tourists
          </p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <Link to="/book-call">
              <Button 
                size="lg"
                className="relative group bg-gradient-to-r from-brand-green to-brand-primary hover:opacity-90 text-space-dark font-medium px-8 py-6 h-auto text-lg shadow-glow"
              >
                <CalendarDays className="mr-2 h-5 w-5" />
                Book a Strategy Call
              </Button>
            </Link>
          </motion.div>
          
          <div className="mt-12">
            <p className="text-gray-400 text-sm font-medium mb-2">Trusted by Leading Brands</p>
            <div className="flex items-center justify-center gap-2">
              <span className="flex items-center gap-0.5">
                {[1,2,3,4,5].map((star) => (
                  <span key={star} className="text-brand-green">★</span>
                ))}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
