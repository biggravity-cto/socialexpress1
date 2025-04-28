
import { useEffect } from 'react';
import { useCanvas } from './useCanvas';
import { Orbital } from './Orbital';
import { Planet } from './Planet';
import { Logo } from './Logo';
import { CanvasConfig } from './types';

export const useOrbitalAnimation = () => {
  const { canvasRef, resizeCanvas } = useCanvas();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const config: CanvasConfig | null = resizeCanvas();
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

  return { canvasRef };
};
