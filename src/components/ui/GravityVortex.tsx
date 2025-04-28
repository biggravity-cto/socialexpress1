
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const GravityVortex: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Particle[] = [];
    const particleCount = 400; // Increased for more density
    
    const colors = [
      '#3BFFCB', // brand green
      '#95D4E3', // brand primary
      '#FFFFFF'  // white for stars
    ];

    class Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      angle: number;
      radius: number;
      speed: number;
      rotation: number;

      constructor() {
        this.radius = Math.random() * (Math.max(canvas.width, canvas.height));
        this.angle = Math.random() * Math.PI * 2;
        this.x = canvas.width / 2 + Math.cos(this.angle) * this.radius;
        this.y = canvas.height / 2 + Math.sin(this.angle) * this.radius;
        this.size = Math.random() * 2 + 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speed = (Math.random() * 2 + 1) * 0.5;
        this.rotation = 0;
      }

      update() {
        // Update rotation angle
        this.rotation += this.speed * 0.02;
        
        // Calculate new position with spiral effect
        this.radius -= this.speed * 2;
        
        // Update position with spinning effect
        const spinFactor = this.rotation * 0.3;
        this.x = canvas.width / 2 + Math.cos(this.angle + spinFactor) * this.radius;
        this.y = canvas.height / 2 + Math.sin(this.angle + spinFactor) * this.radius;
        
        // Reset particle when it reaches center
        if (this.radius < 0) {
          this.radius = Math.max(canvas.width, canvas.height);
          this.angle = Math.random() * Math.PI * 2;
          this.rotation = 0;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        
        // Fade particles based on distance from center
        const distanceFromCenter = Math.sqrt(
          Math.pow(this.x - canvas.width / 2, 2) + 
          Math.pow(this.y - canvas.height / 2, 2)
        );
        const maxDistance = Math.max(canvas.width, canvas.height) / 2;
        const opacity = Math.min(1, distanceFromCenter / maxDistance);
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

      // Clear canvas with slight trail effect
      ctx.fillStyle = 'rgba(10, 14, 28, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <div className="relative w-full h-full">
        <canvas ref={canvasRef} className="absolute inset-0" />
        
        {/* Subtle radial gradient overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: [
              'radial-gradient(circle at 50% 50%, rgba(59,255,203,0.1) 0%, rgba(10,14,28,0.95) 70%)',
              'radial-gradient(circle at 50% 50%, rgba(59,255,203,0.15) 0%, rgba(10,14,28,0.9) 75%)',
              'radial-gradient(circle at 50% 50%, rgba(59,255,203,0.1) 0%, rgba(10,14,28,0.95) 70%)',
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default GravityVortex;
