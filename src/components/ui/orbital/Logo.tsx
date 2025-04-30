
import React, { useEffect, useRef } from 'react';
import { useCanvas } from './useCanvas';
import { Planet } from './Planet';
import { Orbital } from './Orbital';
import { CanvasConfig } from './types';

interface LogoAnimationProps {
  type?: 'compact' | 'default';
  brandColors?: boolean;
}

const LogoAnimation: React.FC<LogoAnimationProps> = ({ 
  type = 'compact',
  brandColors = true 
}) => {
  const { canvasRef, resizeCanvas } = useCanvas();
  const animationRef = useRef<number | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const config: CanvasConfig | null = resizeCanvas();
    if (!config) return;
    
    // Smaller number of objects for compact mode
    const planetCount = type === 'compact' ? 3 : 5;
    const orbitalCount = type === 'compact' ? 0 : 3;
    
    // Adjust orbital size based on type
    const orbitSizeMultiplier = type === 'compact' ? 0.5 : 1;
    
    // Create planets (main orbs)
    const planets = Array.from({ length: planetCount }, () => 
      new Planet(config, orbitSizeMultiplier)
    );
    
    // Create orbitals (trails)
    const orbitals = Array.from({ length: orbitalCount }, () => 
      new Orbital(config, orbitSizeMultiplier)
    );
    
    // Set brand colors if requested
    if (brandColors) {
      const brandColors = ['#1EAEDB', '#33C3F0', '#4DC5DE'];
      planets.forEach((planet, idx) => {
        planet.color = brandColors[idx % brandColors.length];
      });
    }
    
    const animate = () => {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      planets.forEach(planet => {
        planet.update(config.centerX, config.centerY);
        planet.draw(ctx);
      });
      
      orbitals.forEach(orbital => {
        orbital.update(config.centerX, config.centerY);
        orbital.draw(ctx);
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [type, brandColors]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full" 
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }} 
    />
  );
};

export default LogoAnimation;
