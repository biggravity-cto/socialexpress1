
import { OrbitalObject, CanvasConfig } from './types';

export class Planet implements OrbitalObject {
  x: number;
  y: number;
  size: number;
  angle: number;
  speed: number;
  distance: number;
  color: string;
  rotationSpeed: number;

  constructor(config: CanvasConfig) {
    const { centerX, centerY } = config;
    // Smaller orbit radius to focus around the bg text
    this.distance = Math.random() * 100 + 50;
    this.angle = Math.random() * Math.PI * 2;
    this.x = centerX + Math.cos(this.angle) * this.distance;
    this.y = centerY + Math.sin(this.angle) * this.distance;
    this.size = Math.random() * 6 + 3;
    this.speed = (Math.random() * 0.006 + 0.002) * (Math.random() > 0.5 ? 1 : -1);
    this.color = Math.random() > 0.5 ? '#3BFFCB' : '#95D4E3';
    this.rotationSpeed = Math.random() * 0.05 + 0.01;
  }

  update(centerX: number, centerY: number) {
    this.angle += this.speed;
    this.x = centerX + Math.cos(this.angle) * this.distance;
    this.y = centerY + Math.sin(this.angle) * this.distance;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = 0.7;
    ctx.fill();
    
    const gradient = ctx.createRadialGradient(
      this.x, this.y, this.size * 0.5,
      this.x, this.y, this.size * 2.5
    );
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.globalAlpha = 0.2;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}
