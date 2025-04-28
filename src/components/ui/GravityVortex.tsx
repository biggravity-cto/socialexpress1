
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
    const particleCount = 600; // Increased for more density
    const colors = [
      '#3BFFCB', // brand green
      '#95D4E3', // brand primary
      '#FFFFFF'  // white for stars
    ];

    // Center point of the wormhole
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    class Particle {
      x: number;
      y: number;
      z: number;
      size: number;
      color: string;
      speed: number;
      initialX: number;
      initialY: number;
      brightness: number;

      constructor() {
        // Use 3D space to create the illusion of forward movement
        this.z = Math.random() * 1000;
        
        // Random positions within a circular area
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 200 + 50;
        this.initialX = Math.cos(angle) * distance;
        this.initialY = Math.sin(angle) * distance;
        
        // Project 3D to 2D
        const scale = 1000 / (this.z + 1000);
        this.x = centerX + this.initialX * scale;
        this.y = centerY + this.initialY * scale;
        
        this.size = Math.random() * 2 + 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speed = Math.random() * 15 + 5;
        this.brightness = 0.2 + Math.random() * 0.8;
      }

      update() {
        // Move particles forward (decrease Z)
        this.z -= this.speed;
        
        // Reset particles that move too close
        if (this.z < 0) {
          this.z = 1000;
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 200 + 50;
          this.initialX = Math.cos(angle) * distance;
          this.initialY = Math.sin(angle) * distance;
        }
        
        // Project updated 3D position to 2D
        const scale = 1000 / (this.z + 1000);
        this.x = centerX + this.initialX * scale;
        this.y = centerY + this.initialY * scale;
        
        // Make particles grow as they get closer
        this.size = (1000 - this.z) * 0.005;
        
        // Adjust brightness based on distance
        this.brightness = (1000 - this.z) / 1000;
      }

      draw() {
        if (!ctx) return;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Create a gradient for each particle for a glowing effect
        const alpha = this.brightness * 0.9;
        if (this.color === '#FFFFFF') {
          // Stars just get brighter
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        } else {
          // Color particles get gradient based on position
          const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
          gradient.addColorStop(0, this.color);
          gradient.addColorStop(1, `rgba(10, 14, 28, 0)`);
          ctx.fillStyle = gradient;
        }
        
        ctx.fill();
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
      ctx.fillStyle = 'rgba(10, 14, 28, 0.2)';
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
              'radial-gradient(circle at 50% 50%, rgba(59,255,203,0.15) 0%, rgba(10,14,28,0.95) 70%)',
              'radial-gradient(circle at 50% 50%, rgba(59,255,203,0.2) 0%, rgba(10,14,28,0.9) 75%)',
              'radial-gradient(circle at 50% 50%, rgba(59,255,203,0.15) 0%, rgba(10,14,28,0.95) 70%)',
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default GravityVortex;
