
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface LogoComponentProps {
  isScrolled?: boolean;
}

const LogoComponent: React.FC<LogoComponentProps> = ({ isScrolled }) => {
  // Always ensure good contrast - white text when on dark background (not scrolled)
  const textColorClass = isScrolled ? "text-space-dark" : "text-white";

  return (
    <Link to="/" className="flex-shrink-0 mr-4">
      <motion.span 
        className={`${textColorClass} text-xl md:text-2xl font-display font-bold tracking-[0.2em] rounded-md`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        BIG GRAVITY
      </motion.span>
    </Link>
  );
};

export default LogoComponent;
