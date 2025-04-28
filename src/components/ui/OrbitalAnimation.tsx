
import React from 'react';
import { useOrbitalAnimation } from './orbital/useOrbitalAnimation';

const OrbitalAnimation: React.FC = () => {
  const { canvasRef } = useOrbitalAnimation();
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export default OrbitalAnimation;
