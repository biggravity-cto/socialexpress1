
import { OrbitalObject, CanvasConfig } from './types';

export class Orbital implements OrbitalObject {
  x: number;
  y: number;
  size: number;
  angle: number;
  speed: number;
  distance: number;
  color: string;
  trail: { x: number; y: number }[];
  trailLength: number;

  constructor(config: CanvasConfig) {
    const { centerX, centerY } = config;
    // Smaller radius to orbit closely around the bg text
    this.distance = Math.random() * 80 + 40; 
    this.angle = Math.random() * Math.PI * 2;
    this.x = centerX + Math.cos(this.angle) * this.distance;
    this.y = centerY + Math.sin(this.angle) * this.distance;
    this.size = Math.random() * 3 + 1;
    this.speed = (Math.random() * 0.02 + 0.01) * (Math.random() > 0.5 ? 1 : -1);
    this.color = Math.random() > 0.7 ? '#3BFFCB' : '#95D4E3';
    this.trail = [];
    this.trailLength = Math.floor(Math.random() * 15) + 10;
  }

  update(centerX: number, centerY: number) {
    this.angle += this.speed;
    this.x = centerX + Math.cos(this.angle) * this.distance;
    this.y = centerY + Math.sin(this.angle) * this.distance;
    
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > this.trailLength) {
      this.trail.shift();
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.trail.length > 1) {
      ctx.beginPath();
      ctx.moveTo(this.trail[0].x, this.trail[0].y);
      
      for (let i = 1; i < this.trail.length; i++) {
        ctx.lineTo(this.trail[i].x, this.trail[i].y);
      }
      
      ctx.strokeStyle = this.color;
      ctx.lineWidth = this.size / 2;
      ctx.globalAlpha = 0.3;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
