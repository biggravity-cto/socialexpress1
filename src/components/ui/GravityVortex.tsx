
import React from 'react';
import { motion } from 'framer-motion';

const GravityVortex: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <div className="relative w-full h-full">
        {/* Grid lines */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-ocean-400/20 via-ocean-600/20 to-brand-primary/20" />
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.2) 100%),
                               repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px),
                               repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px)`,
              backgroundSize: '100% 100%, 30px 30px, 30px 30px',
              backgroundPosition: 'center',
              transform: 'perspective(1000px) rotateX(60deg)',
            }}
          />
        </motion.div>
        
        {/* Animated vortex gradient */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 30% 30%, rgba(149,212,227,0.4) 0%, rgba(62,219,178,0.1) 50%, transparent 70%)',
              'radial-gradient(circle at 70% 70%, rgba(149,212,227,0.4) 0%, rgba(62,219,178,0.1) 50%, transparent 70%)',
              'radial-gradient(circle at 30% 30%, rgba(149,212,227,0.4) 0%, rgba(62,219,178,0.1) 50%, transparent 70%)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Light beams */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(45deg, transparent 0%, rgba(149,212,227,0.1) 50%, transparent 100%)'
          }}
          animate={{
            rotate: [0, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
};

export default GravityVortex;
