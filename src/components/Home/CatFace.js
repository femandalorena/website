import React, { useRef, useEffect } from 'react';

export default function CatFace() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const width = 500;
    const height =500;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    // Draw Cat Face in center of canvas (scale 2 for better details)
    drawCatFace(ctx, width / 2 - 40, height / 2 - 25, 2);

  }, []);

  function drawCatFace(ctx, x, y, scale = 1) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.strokeStyle = 'rgba(112, 238, 156, 0.9)';
    ctx.lineWidth = 1.5;

    // Head and ears
    ctx.beginPath();
    ctx.moveTo(20, 40);
    ctx.lineTo(15, 20);
    ctx.lineTo(25, 30);
    ctx.lineTo(40, 10);
    ctx.lineTo(55, 30);
    ctx.lineTo(65, 20);
    ctx.lineTo(60, 40);
    ctx.closePath();
    ctx.stroke();

    // Eyes
    ctx.beginPath();
    ctx.moveTo(30, 30);
    ctx.lineTo(32, 30);
    ctx.moveTo(50, 30);
    ctx.lineTo(52, 30);
    ctx.stroke();

    // Nose
    ctx.beginPath();
    ctx.moveTo(40, 35);
    ctx.lineTo(42, 35);
    ctx.lineTo(41, 38);
    ctx.closePath();
    ctx.stroke();

    // Whiskers left
    ctx.beginPath();
    ctx.moveTo(20, 35);
    ctx.lineTo(5, 34);
    ctx.moveTo(20, 37);
    ctx.lineTo(5, 37);
    ctx.moveTo(20, 39);
    ctx.lineTo(5, 40);

    // Whiskers right
    ctx.moveTo(60, 35);
    ctx.lineTo(75, 34);
    ctx.moveTo(60, 37);
    ctx.lineTo(75, 37);
    ctx.moveTo(60, 39);
    ctx.lineTo(75, 40);

    ctx.stroke();

    ctx.restore();
  }

  return (
    <canvas
      ref={canvasRef}
      className="cat-face"
      aria-label="Cat face illustration"
      role="img"
    />
  );
}
