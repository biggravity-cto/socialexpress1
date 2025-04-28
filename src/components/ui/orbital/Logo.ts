
export class Logo {
  static draw(ctx: CanvasRenderingContext2D, centerX: number, centerY: number) {
    ctx.save();
    
    // Draw 'b' character
    ctx.font = "bold 100px Space Grotesk";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(59, 255, 203, 0.1)";
    ctx.fillText("b", centerX - 20, centerY);
    
    // Draw superscript 'g'
    ctx.font = "bold 50px Space Grotesk";
    ctx.fillStyle = "rgba(149, 212, 227, 0.1)";
    ctx.fillText("g", centerX + 20, centerY - 25);
    
    ctx.restore();
  }
}
