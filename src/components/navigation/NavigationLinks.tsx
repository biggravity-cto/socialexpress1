
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface NavigationLinksProps {
  scrollToSection?: (sectionId: string) => void;
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({ scrollToSection }) => {
  return (
    <div className="hidden md:flex items-center space-x-6">
      <NavLink label="About" to="/about" />
      <NavLink label="Offerings" to="/offerings" />
      <NavLink label="Case Studies" to="/case-studies" />
      <NavLink label="Team" to="/team" />
      <NavLink label="Contact" to="/contact" />
    </div>
  );
};

interface NavLinkProps {
  label: string;
  to: string;
}

const NavLink: React.FC<NavLinkProps> = ({ label, to }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Link 
        to={to} 
        className="text-space-dark hover:text-brand-green relative group font-medium"
      >
        {label}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-green group-hover:w-full transition-all duration-300" />
      </Link>
    </motion.div>
  );
};

export default NavigationLinks;
