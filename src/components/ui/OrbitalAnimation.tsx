
import React from 'react';
import { useOrbitalAnimation } from './orbital/useOrbitalAnimation';

const OrbitalAnimation: React.FC = () => {
  const { canvasRef } = useOrbitalAnimation();
  
  return (
    <div className="w-full h-full overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default OrbitalAnimation;
