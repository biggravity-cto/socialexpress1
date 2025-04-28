
import { useEffect } from 'react';
import { useCanvas } from './useCanvas';
import { Orbital } from './Orbital';
import { Planet } from './Planet';
import { CanvasConfig } from './types';

export const useOrbitalAnimation = (type: 'default' | 'compact' = 'default') => {
  const { canvasRef, resizeCanvas } = useCanvas();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const config: CanvasConfig | null = resizeCanvas();
    if (!config) return;
    
    // Create focused orbital effects
    const planetCount = type === 'compact' ? 3 : 3;
    const orbitalCount = type === 'compact' ? 3 : 6;
    
    // Adjust orbital size based on type
    const orbitSizeMultiplier = type === 'compact' ? 0.6 : 1;
    
    const orbitals: Orbital[] = Array.from({ length: orbitalCount }, () => 
      new Orbital(config, orbitSizeMultiplier)
    );
    
    const planets: Planet[] = Array.from({ length: planetCount }, () => 
      new Planet(config, orbitSizeMultiplier)
    );
    
    // Set brand colors for compact orbitals
    if (type === 'compact') {
      const brandColors = ['#1EAEDB', '#33C3F0', '#4DC5DE'];
      planets.forEach((planet, idx) => {
        planet.color = brandColors[idx % brandColors.length];
      });
    }
    
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
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
  }, [type]);

  return { canvasRef };
};
