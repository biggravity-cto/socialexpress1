
export interface OrbitalObject {
  x: number;
  y: number;
  size: number;
  angle: number;
  speed: number;
  distance: number;
  color: string;
  trail?: { x: number; y: number }[];
  trailLength?: number;
}

export interface CanvasConfig {
  width: number;
  height: number;
  centerX: number;
  centerY: number;
}
