export function drawCanvas(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = '#0a74ff';
  ctx.fillRect(10, 10, 120, 80);

  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 4;
  ctx.strokeRect(10, 10, 120, 80);

  ctx.fillStyle = 'white';
  ctx.font = '16px Arial';
  ctx.fillText('Canvas text', 20, 50);
}
