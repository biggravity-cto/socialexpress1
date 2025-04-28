
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const OrbitalAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Resize canvas to match parent container
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Center point (big "bg" logo position)
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Create orbital objects
    const orbitals: Orbital[] = [];
    const orbitCount = 7; // Number of orbiting objects
    
    class Orbital {
      x: number;
      y: number;
      size: number;
      angle: number;
      speed: number;
      distance: number;
      color: string;
      trail: {x: number, y: number}[];
      trailLength: number;
      
      constructor() {
        this.distance = Math.random() * 150 + 100;
        this.angle = Math.random() * Math.PI * 2;
        this.x = centerX + Math.cos(this.angle) * this.distance;
        this.y = centerY + Math.sin(this.angle) * this.distance;
        this.size = Math.random() * 3 + 2;
        this.speed = (Math.random() * 0.01 + 0.005) * (Math.random() > 0.5 ? 1 : -1);
        this.color = Math.random() > 0.7 ? '#3BFFCB' : '#95D4E3';
        this.trail = [];
        this.trailLength = Math.floor(Math.random() * 15) + 5;
      }
      
      update() {
        // Update angle and position
        this.angle += this.speed;
        this.x = centerX + Math.cos(this.angle) * this.distance;
        this.y = centerY + Math.sin(this.angle) * this.distance;
        
        // Add current position to trail
        this.trail.push({x: this.x, y: this.y});
        
        // Remove oldest trail positions if trail is too long
        if (this.trail.length > this.trailLength) {
          this.trail.shift();
        }
      }
      
      draw() {
        if (!ctx) return;
        
        // Draw trail
        if (this.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(this.trail[0].x, this.trail[0].y);
          
          for (let i = 1; i < this.trail.length; i++) {
            ctx.lineTo(this.trail[i].x, this.trail[i].y);
          }
          
          ctx.strokeStyle = this.color;
          ctx.lineWidth = this.size / 2;
          ctx.globalAlpha = 0.5;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
        
        // Draw orbital object
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }
    
    // Create orbital objects
    for (let i = 0; i < orbitCount; i++) {
      orbitals.push(new Orbital());
    }
    
    // Draw "bg" logo in the center
    const drawLogo = () => {
      if (!ctx) return;
      
      ctx.save();
      ctx.font = "bold 120px Space Grotesk";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      // Draw 'b' character
      ctx.fillStyle = "rgba(59, 255, 203, 0.15)";
      ctx.fillText("b", centerX - 30, centerY);
      
      // Draw superscript 'g'
      ctx.font = "bold 60px Space Grotesk";
      ctx.fillStyle = "rgba(149, 212, 227, 0.15)";
      ctx.fillText("g", centerX + 30, centerY - 30);
      
      ctx.restore();
    };
    
    // Animation loop
    const animate = () => {
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw the logo
      drawLogo();
      
      // Update and draw all orbitals
      orbitals.forEach(orbital => {
        orbital.update();
        orbital.draw();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export default OrbitalAnimation;
