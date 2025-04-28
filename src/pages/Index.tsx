
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroSection from '@/components/landing/HeroSection';
import Footer from '@/components/landing/Footer';
import ScrollToTopButton from '@/components/landing/ScrollToTopButton';
import PillarsSection from '@/components/landing/PillarsSection';
import PackagesSection from '@/components/landing/PackagesSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import ProcessSection from '@/components/landing/ProcessSection';
import FinalCtaSection from '@/components/landing/FinalCtaSection';

const Index = () => {
  // Refs for scrolling
  const featuresRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // For subtle background motion effect
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5]);
  const backgroundY = useTransform(scrollY, [0, 500], [0, -50]);

  useEffect(() => {
    const checkScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden bg-gradient-to-b from-[#0a0a14] to-[#1c1c2e]">
        {/* Decorative elements */}
        <motion.div
          className="absolute inset-0 -z-10 overflow-hidden"
          style={{ opacity, y: backgroundY }}
        >
          {/* Animated background elements with space-inspired design */}
          <motion.div 
            animate={{ 
              x: [0, 10, 0], 
              y: [0, 15, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 20,
              ease: "easeInOut"
            }}
            className="absolute top-0 right-[10%] w-96 h-96 rounded-full blur-[100px] bg-ocean-500/20"
          />
          <motion.div 
            animate={{ 
              x: [0, -10, 0], 
              y: [0, 10, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 15,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute top-[20%] left-[5%] w-80 h-80 rounded-full blur-[100px] bg-purple-500/20"
          />
          <motion.div 
            animate={{ 
              x: [0, 15, 0], 
              y: [0, -10, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 18,
              ease: "easeInOut",
              delay: 5
            }}
            className="absolute bottom-[20%] right-[15%] w-64 h-64 rounded-full blur-[100px] bg-blue-400/30"
          />
          
          {/* Stars effect */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover opacity-10"></div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <HeroSection />
        </motion.div>
        
        <motion.div 
          id="pillars"
          ref={featuresRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-10%" }}
        >
          <PillarsSection />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-10%" }}
          id="packages"
        >
          <PackagesSection />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-10%" }}
          id="testimonials"
        >
          <TestimonialsSection />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-10%" }}
          id="process"
        >
          <ProcessSection />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-10%" }}
        >
          <FinalCtaSection />
        </motion.div>
        
        <Footer />
      </div>
      <ScrollToTopButton isVisible={isScrolled} />
    </div>
  );
};

export default Index;

