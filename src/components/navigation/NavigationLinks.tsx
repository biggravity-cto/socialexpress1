
import React from 'react';
import { motion } from 'framer-motion';

interface NavigationLinksProps {
  scrollToSection: (sectionId: string) => void;
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({ scrollToSection }) => {
  return (
    <div className="hidden md:flex items-center space-x-6">
      <NavLink label="Features" sectionId="features" scrollToSection={scrollToSection} />
      <NavLink label="Pricing" sectionId="pricing" scrollToSection={scrollToSection} />
      <NavLink label="Success Stories" sectionId="testimonials" scrollToSection={scrollToSection} />
      <NavLink label="FAQ" sectionId="faq" scrollToSection={scrollToSection} />
    </div>
  );
};

interface NavLinkProps {
  label: string;
  sectionId: string;
  scrollToSection: (sectionId: string) => void;
}

const NavLink: React.FC<NavLinkProps> = ({ label, sectionId, scrollToSection }) => {
  return (
    <motion.button 
      onClick={() => scrollToSection(sectionId)} 
      className="text-gray-600 hover:text-gray-900 relative group"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {label}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-ocean-500 group-hover:w-full transition-all duration-300"></span>
    </motion.button>
  );
};

export default NavigationLinks;
