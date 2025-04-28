
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

    const particles: Particle[] = [];
    const particleCount = 700; // Increased count for more density

    class Particle {
      x: number;
      y: number;
      z: number;
      size: number;
      color: string;
      speed: number;
      opacity: number;

      constructor() {
        // Create particles in 3D space ahead of viewer
        this.z = Math.random() * 1200 + 200; // Starting further out
        
        // Random distribution around center axis
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * (400 - this.z / 10); // Particles closer to center as they get closer to viewer
        this.x = centerX + Math.cos(angle) * radius;
        this.y = centerY + Math.sin(angle) * radius;
        
        this.size = Math.random() * 3 + 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speed = Math.random() * 6 + 8; // Faster movement
        this.opacity = Math.random() * 0.7 + 0.3;
      }

      update() {
        // Move particles toward viewer (decrease z)
        this.z -= this.speed;
        
        // Particles get larger and faster as they approach
        this.size = Math.max(0.5, (1000 - this.z) / 150);
        
        // Reset particles that reach the viewer
        if (this.z < 0) {
          this.z = 1200;
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 300;
          this.x = centerX + Math.cos(angle) * radius;
          this.y = centerY + Math.sin(angle) * radius;
          this.opacity = Math.random() * 0.7 + 0.3;
        }
        
        // Calculate perspective
        const perspective = 800 / (800 + this.z);
        
        // Update position based on perspective
        this.x = centerX + (this.x - centerX) * perspective;
        this.y = centerY + (this.y - centerY) * perspective;
      }

      draw() {
        if (!ctx) return;
        
        const brightness = Math.min(1, (1000 - this.z) / 1000);
        
        // Draw star/particle with glow effect
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        if (this.color === '#FFFFFF') {
          // Stars
          ctx.fillStyle = `rgba(255, 255, 255, ${brightness * this.opacity})`;
        } else {
          // Create gradient for particles
          const gradient = ctx.createRadialGradient(
            this.x, this.y, 0, 
            this.x, this.y, this.size * 2
          );
          gradient.addColorStop(0, this.color);
          gradient.addColorStop(1, 'rgba(10, 14, 28, 0)');
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
      ctx.fillStyle = 'rgba(10, 14, 28, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
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
