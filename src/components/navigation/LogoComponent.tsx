
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import OrbitalAnimation from '../ui/OrbitalAnimation';

interface LogoComponentProps {
  isScrolled?: boolean;
  isHeroLogo?: boolean;
}

const LogoComponent: React.FC<LogoComponentProps> = ({ isScrolled, isHeroLogo = false }) => {
  // Always ensure good contrast - white text when on dark background (not scrolled)
  const textColorClass = isScrolled ? "text-space-dark" : "text-white";
  
  if (isHeroLogo) {
    return (
      <motion.div 
        className="flex items-center space-x-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.span 
          className={`${textColorClass} text-2xl md:text-3xl font-display font-bold tracking-[0.2em] rounded-md`}
        >
          BIG GRAVITY
        </motion.span>
      </motion.div>
    );
  }
  
  return (
    <Link to="/" className="flex-shrink-0 mr-4 relative">
      {isScrolled ? (
        <motion.div 
          className="flex items-center space-x-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative" style={{ width: '40px', height: '40px' }}>
            <div className="relative w-full h-full flex items-center justify-center">
              <span className="text-3xl font-medium bg-gradient-to-r from-brand-green to-brand-primary inline-block bg-clip-text text-transparent font-serif relative z-10">
                g
              </span>
              <span className="text-xl font-medium bg-gradient-to-r from-brand-green to-brand-primary absolute -top-2 -right-2 bg-clip-text text-transparent font-serif relative z-10">
                b
              </span>
              <div className="absolute inset-0 pointer-events-none">
                <OrbitalAnimation type="compact" brandColors={true} />
              </div>
            </div>
          </div>
          <motion.span 
            className="text-space-dark text-xl font-display font-bold tracking-[0.2em]"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            BIG GRAVITY
          </motion.span>
        </motion.div>
      ) : (
        <motion.div 
          className="relative"
          style={{ width: '40px', height: '40px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <span className="text-3xl font-medium bg-gradient-to-r from-brand-green to-brand-primary inline-block bg-clip-text text-transparent font-serif relative z-10">
              g
            </span>
            <span className="text-xl font-medium bg-gradient-to-r from-brand-green to-brand-primary absolute -top-2 -right-2 bg-clip-text text-transparent font-serif relative z-10">
              b
            </span>
            <div className="absolute inset-0 pointer-events-none">
              <OrbitalAnimation type="compact" brandColors={true} />
            </div>
          </div>
        </motion.div>
      )}
    </Link>
  );
};

export default LogoComponent;
