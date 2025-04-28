
import React from 'react';
import { useOrbitalAnimation } from './orbital/useOrbitalAnimation';

interface OrbitalAnimationProps {
  type?: 'default' | 'compact';
}

const OrbitalAnimation: React.FC<OrbitalAnimationProps> = ({ type = 'default' }) => {
  const { canvasRef } = useOrbitalAnimation(type);
  
  return (
    <div className="w-full h-full overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default OrbitalAnimation;
