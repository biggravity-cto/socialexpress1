
import React from 'react';
import { useCanvas } from './orbital/useCanvas';
import { Orbital } from './orbital/Orbital';
import { Planet } from './orbital/Planet';
import { Logo } from './orbital/Logo';

const OrbitalAnimation: React.FC = () => {
  const { canvasRef, resizeCanvas } = useCanvas();
  
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const config = resizeCanvas();
    if (!config) return;
    
    const orbitals: Orbital[] = Array.from({ length: 7 }, () => new Orbital(config));
    const planets: Planet[] = Array.from({ length: 3 }, () => new Planet(config));
    
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      Logo.draw(ctx, config.centerX, config.centerY);
      
      planets.forEach(planet => {
        planet.update(config.centerX, config.centerY);
        planet.draw(ctx);
      });
      
      orbitals.forEach(orbital => {
        orbital.update(config.centerX, config.centerY);
        orbital.draw(ctx);
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export default OrbitalAnimation;
