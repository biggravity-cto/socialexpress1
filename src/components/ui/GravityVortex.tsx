
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

    // Center point
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Colors for stars and particles
    const colors = [
      '#3BFFCB', // brand green
      '#95D4E3', // brand primary
      '#FFFFFF'  // white for stars
    ];

    // Create linear gradient for wormhole edges
    const gradientRadius = Math.max(canvas.width, canvas.height) * 0.5;
    const gradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, gradientRadius
    );
    gradient.addColorStop(0, 'rgba(10, 14, 28, 0)');
    gradient.addColorStop(0.7, 'rgba(10, 14, 28, 0.4)');
    gradient.addColorStop(1, 'rgba(10, 14, 28, 0.9)');

    const stars: Star[] = [];
    const starCount = 800; // Increased for more stars
    const ringParticles: RingParticle[] = [];
    const ringParticleCount = 200;

    class Star {
      x: number;
      y: number;
      z: number;
      prevZ: number;
      size: number;
      color: string;
      speed: number;
      opacity: number;

      constructor() {
        this.z = Math.random() * 2000 + 500; // Stars start far away
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * canvas.width * 2;
        
        this.x = centerX + Math.cos(angle) * (radius / (this.z * 0.001));
        this.y = centerY + Math.sin(angle) * (radius / (this.z * 0.001));
        this.prevZ = this.z;
        this.size = Math.random() * 2 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speed = Math.random() * 15 + 5; // Faster speed for wormhole effect
        this.opacity = Math.random() * 0.8 + 0.2;
      }

      update() {
        this.prevZ = this.z;
        this.z -= this.speed;
        
        if (this.z < 0) {
          this.z = 2000;
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * canvas.width * 2;
          
          this.x = centerX + Math.cos(angle) * (radius / (this.z * 0.001));
          this.y = centerY + Math.sin(angle) * (radius / (this.z * 0.001));
          this.prevZ = this.z;
        }
        
        // Update position based on z-change (perspective)
        const factor = this.speed / this.z;
        this.x = this.x + (this.x - centerX) * factor;
        this.y = this.y + (this.y - centerY) * factor;
      }

      draw() {
        const sx = (this.x - centerX) * (800 / this.prevZ) + centerX;
        const sy = (this.y - centerY) * (800 / this.prevZ) + centerY;
        const ex = (this.x - centerX) * (800 / this.z) + centerX;
        const ey = (this.y - centerY) * (800 / this.z) + centerY;
        
        if (!ctx) return;
        
        const alpha = Math.min(1, 800 / this.z);
        
        // Draw star streak
        if (this.z < 1500) { // Only draw streaks for closer stars
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(ex, ey);
          ctx.strokeStyle = this.color;
          ctx.lineWidth = this.size * (alpha * 0.5);
          ctx.globalAlpha = alpha * this.opacity * 0.8;
          ctx.stroke();
        }
        
        // Draw star point
        ctx.beginPath();
        ctx.arc(ex, ey, this.size * alpha, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = alpha * this.opacity;
        ctx.fill();
        
        ctx.globalAlpha = 1;
      }
    }

    class RingParticle {
      angle: number;
      radius: number;
      z: number;
      size: number;
      color: string;
      speed: number;
      opacity: number;
      
      constructor() {
        this.angle = Math.random() * Math.PI * 2;
        this.radius = Math.random() * 200 + 100;
        this.z = Math.random() * 1500 + 500;
        this.size = Math.random() * 3 + 1;
        this.color = colors[Math.floor(Math.random() * (colors.length - 1))]; // No white for ring particles
        this.speed = Math.random() * 10 + 5;
        this.opacity = Math.random() * 0.5 + 0.3;
      }
      
      update() {
        this.z -= this.speed;
        
        if (this.z < 0) {
          this.z = 1500 + Math.random() * 500;
        }
      }
      
      draw() {
        if (!ctx) return;
        
        // Calculate perspective scale based on z-distance
        const perspective = 800 / this.z;
        const scaledRadius = this.radius * perspective;
        
        const x = centerX + Math.cos(this.angle) * scaledRadius;
        const y = centerY + Math.sin(this.angle) * scaledRadius;
        
        const alpha = Math.min(1, 800 / this.z) * this.opacity;
        
        ctx.beginPath();
        ctx.arc(x, y, this.size * perspective, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
        
        ctx.globalAlpha = 1;
      }
    }

    // Initialize stars
    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }
    
    // Initialize ring particles
    for (let i = 0; i < ringParticleCount; i++) {
      ringParticles.push(new RingParticle());
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return;

      // Clear canvas with slight trail effect
      ctx.fillStyle = 'rgba(10, 14, 28, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw tunnel effect (darker edges)
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars
      stars.forEach(star => {
        star.update();
        star.draw();
      });
      
      // Update and draw ring particles
      ringParticles.forEach(particle => {
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
