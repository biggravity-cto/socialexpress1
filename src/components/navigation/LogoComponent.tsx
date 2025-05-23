
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
    <Link to="/" className="flex-shrink-0 mr-8 relative">
      {isScrolled ? (
        <motion.div 
          className="flex items-center space-x-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative border border-gray-300 bg-transparent flex items-center justify-center" style={{ width: '56px', height: '56px' }}>
            {/* Logo positioned correctly within the box with more padding */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative" style={{ width: '36px', height: '36px' }}>
                <span className="text-3xl font-bold text-space-dark font-serif absolute bottom-0 left-0">
                  g
                </span>
                <span className="text-2xl font-normal italic text-space-dark font-serif absolute" style={{ bottom: '7px', left: '19px' }}>
                  b
                </span>
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
          className="relative border border-white/50 bg-transparent flex items-center justify-center"
          style={{ width: '56px', height: '56px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo positioned correctly within the box with more padding */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative" style={{ width: '36px', height: '36px' }}>
              <span className="text-3xl font-bold text-white font-serif absolute bottom-0 left-0">
                g
              </span>
              <span className="text-2xl font-normal italic text-white font-serif absolute" style={{ bottom: '7px', left: '19px' }}>
                b
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </Link>
  );
};

export default LogoComponent;
