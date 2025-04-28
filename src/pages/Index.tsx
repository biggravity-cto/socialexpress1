
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroSection from '@/components/landing/HeroSection';
import Footer from '@/components/landing/Footer';
import ScrollToTopButton from '@/components/landing/ScrollToTopButton';
import ServicesSection from '@/components/landing/ServicesSection';
import TeamSection from '@/components/landing/TeamSection';
import PricingSection from '@/components/landing/PricingSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import FinalCtaSection from '@/components/landing/FinalCtaSection';

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
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
      <div className="relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <HeroSection />
        </motion.div>
        
        <motion.div 
          id="services"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-10%" }}
        >
          <ServicesSection />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-10%" }}
          id="pricing"
        >
          <PricingSection />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-10%" }}
          id="team"
        >
          <TeamSection />
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
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-10%" }}
          className="bg-space-dark"
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
