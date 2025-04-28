
import { useEffect, useRef } from 'react';
import { CanvasConfig } from './types';

export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    
    const parent = canvas.parentElement;
    if (!parent) return null;
    
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
    
    const config: CanvasConfig = {
      width: canvas.width,
      height: canvas.height,
      centerX: canvas.width / 2,
      centerY: canvas.height / 2
    };
    
    return config;
  };
  
  useEffect(() => {
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);
  
  return { canvasRef, resizeCanvas };
};
