
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LogoComponent: React.FC = () => {
  return (
    <Link to="/" className="flex-shrink-0 mr-4">
      <motion.span 
        className="text-white text-xl sm:text-2xl md:text-3xl font-display"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Big Gravity
      </motion.span>
    </Link>
  );
};

export default LogoComponent;
