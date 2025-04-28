
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const GravityVortex: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to fill parent
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    // Initial resize
    resizeCanvas();
    
    // Handle window resize
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    const particles: Particle[] = [];
    const particleCount = 250;

    // Particle colors
    const colors = [
      '#3BFFCB', // brand green
      '#95D4E3', // brand primary
      '#3EDBB2', // brand secondary
      '#FFFFFF'  // white
    ];

    // Create particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      angle: number;
      centerX: number;
      centerY: number;
      distance: number;
      intensity: number;

      constructor() {
        this.centerX = canvas.width / 2;
        this.centerY = canvas.height / 2;
        // Start particles at a random position in the outer area
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * (Math.max(canvas.width, canvas.height)) + 100;
        this.x = this.centerX + Math.cos(angle) * distance;
        this.y = this.centerY + Math.sin(angle) * distance;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.angle = Math.atan2(this.y - this.centerY, this.x - this.centerX);
        this.distance = Math.sqrt(
          Math.pow(this.x - this.centerX, 2) + 
          Math.pow(this.y - this.centerY, 2)
        );
        this.intensity = Math.random() * 2 + 0.5;
      }

      update() {
        // Move particles towards center with increasing speed as they get closer
        const pullFactor = 0.02;
        const speed = Math.max(2, 15 - this.distance / 100);
        
        this.x += Math.cos(this.angle) * -speed * pullFactor * this.intensity;
        this.y += Math.sin(this.angle) * -speed * pullFactor * this.intensity;
        
        // Recalculate angle and distance
        this.angle = Math.atan2(this.y - this.centerY, this.x - this.centerX);
        this.distance = Math.sqrt(
          Math.pow(this.x - this.centerX, 2) + 
          Math.pow(this.y - this.centerY, 2)
        );
        
        // If particle reaches center, reset it to the outside
        if (this.distance < 5) {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.max(canvas.width, canvas.height) + 100;
          this.x = this.centerX + Math.cos(angle) * distance;
          this.y = this.centerY + Math.sin(angle) * distance;
          this.distance = distance;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        
        // Fade particles as they get closer to the center
        const opacity = Math.min(1, this.distance / 300);
        ctx.globalAlpha = opacity;
        
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return;

      // Clear canvas with a slight trail effect for deep space feeling
      ctx.fillStyle = 'rgba(10, 12, 20, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <div className="relative w-full h-full">
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0"
        />
        
        {/* Deep space gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-space-dark/50 to-space-dark" />
        
        {/* Brand colors glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: [
              'radial-gradient(circle at 50% 50%, rgba(59,255,203,0.15) 0%, rgba(149,212,227,0.05) 40%, transparent 70%)',
              'radial-gradient(circle at 50% 50%, rgba(59,255,203,0.2) 0%, rgba(149,212,227,0.1) 50%, transparent 75%)',
              'radial-gradient(circle at 50% 50%, rgba(59,255,203,0.15) 0%, rgba(149,212,227,0.05) 40%, transparent 70%)',
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default GravityVortex;
