
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
    <div className="min-h-screen bg-space-dark">
      <div className="relative overflow-hidden">
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
          className="bg-space-blue"
        >
          <PillarsSection />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-10%" }}
          id="packages"
          className="bg-space-dark"
        >
          <PackagesSection />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-10%" }}
          id="testimonials"
          className="bg-space-blue"
        >
          <TestimonialsSection />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-10%" }}
          id="process"
          className="bg-space-dark"
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
