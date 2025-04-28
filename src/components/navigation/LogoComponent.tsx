
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LogoComponent: React.FC = () => {
  return (
    <Link to="/" className="flex-shrink-0 mr-4">
      <motion.span 
        className="text-gray-900 text-xl sm:text-2xl md:text-3xl font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Big<span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">Gravity</span>
      </motion.span>
    </Link>
  );
};

export default LogoComponent;
