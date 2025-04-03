
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LogoComponent: React.FC = () => {
  return (
    <Link to="/" className="flex-shrink-0 pl-1 mr-auto">
      <motion.span 
        className="text-resort-800 text-lg sm:text-xl md:text-2xl font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Guest<span className="bg-gradient-to-r from-ocean-600 to-ocean-500 bg-clip-text text-transparent">Flow AI</span>
      </motion.span>
    </Link>
  );
};

export default LogoComponent;
