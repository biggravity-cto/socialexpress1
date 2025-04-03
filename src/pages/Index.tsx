
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroSection from '@/components/landing/HeroSection';
import FeatureSection from '@/components/landing/FeatureSection';
import CtaSection from '@/components/landing/CtaSection';
import Footer from '@/components/landing/Footer';
import ScrollToTopButton from '@/components/landing/ScrollToTopButton';
import PricingSection from '@/components/landing/PricingSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import FaqSection from '@/components/landing/FaqSection';

const Index = () => {
  // Refs for scrolling
  const featuresRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // For parallax scrolling effect
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -50]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5]);

  useEffect(() => {
    const checkScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  // Scroll to features section
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    featuresSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden">
        {/* Decorative elements */}
        <motion.div
          className="absolute inset-0 -z-10 overflow-hidden"
          style={{ opacity }}
        >
          <motion.div 
            className="absolute top-0 right-[10%] w-72 h-72 bg-ocean-200/20 rounded-full blur-3xl"
            style={{ y: y1 }}
          />
          <motion.div 
            className="absolute top-[20%] left-[5%] w-60 h-60 bg-purple-200/20 rounded-full blur-3xl"
            style={{ y: y2 }}
          />
        </motion.div>
        
        <HeroSection scrollToFeatures={scrollToFeatures} />
        
        <motion.div 
          id="features"
          ref={featuresRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-10%" }}
        >
          <FeatureSection featureRef={featuresRef} />
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
          id="testimonials"
        >
          <TestimonialsSection />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-10%" }}
          id="faq"
        >
          <FaqSection />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-10%" }}
        >
          <CtaSection />
        </motion.div>
        
        <Footer />
      </div>
      <ScrollToTopButton isVisible={isScrolled} />
    </div>
  );
};

export default Index;
