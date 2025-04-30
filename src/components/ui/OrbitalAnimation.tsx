
import React from 'react';
import LogoAnimation from './orbital/Logo';

interface OrbitalAnimationProps {
  type?: 'default' | 'compact';
  brandColors?: boolean;
}

const OrbitalAnimation: React.FC<OrbitalAnimationProps> = ({ 
  type = 'default',
  brandColors = false
}) => {
  return (
    <div className="w-full h-full overflow-hidden pointer-events-none">
      <LogoAnimation type={type === 'default' ? 'default' : 'compact'} brandColors={brandColors} />
    </div>
  );
};

export default OrbitalAnimation;
