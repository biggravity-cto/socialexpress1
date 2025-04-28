
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface NavigationLinksProps {
  scrollToSection?: (sectionId: string) => void;
  isScrolled?: boolean;
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({ scrollToSection, isScrolled }) => {
  return (
    <div className="hidden md:flex items-center space-x-8 ml-16">
      <NavLink label="About" to="/about" isScrolled={isScrolled} />
      <NavLink label="Offerings" to="/offerings" isScrolled={isScrolled} />
      <NavLink label="Case Studies" to="/case-studies" isScrolled={isScrolled} />
      <NavLink label="Team" to="/team" isScrolled={isScrolled} />
      <NavLink label="Contact" to="/contact" isScrolled={isScrolled} />
    </div>
  );
};

interface NavLinkProps {
  label: string;
  to: string;
  isScrolled?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ label, to, isScrolled }) => {
  // White text when on hero (not scrolled), dark text when scrolled
  const textColorClass = isScrolled 
    ? "text-space-dark" 
    : "text-white";

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Link 
        to={to} 
        className={`${textColorClass} hover:text-brand-green relative group font-medium text-base`}
      >
        {label}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-green group-hover:w-full transition-all duration-300" />
      </Link>
    </motion.div>
  );
};

export default NavigationLinks;
