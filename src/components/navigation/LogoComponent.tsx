
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LogoComponent: React.FC = () => {
  return (
    <Link to="/" className="flex-shrink-0 mr-4">
      <motion.span 
        className="text-space-dark text-xl sm:text-2xl md:text-3xl font-display font-bold tracking-[0.2em]"
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
