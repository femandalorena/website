import React, { useRef, useEffect, useState } from 'react';

export default function CatFace() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;

    let animationFrameId;
    let width, height;

    // Base points dimensions (approx)
    const baseWidth = 8.5;
    const baseHeight = 7;

    // Convert base coords to canvas coords dynamically
    const convert = (scale, offsetX, offsetY, point) => ({
      x: point[0] * scale + offsetX,
      y: offsetY - point[1] * scale,
    });

    const basePoints = {
      A: [0, 2.95], B: [0.3, 1.6], C: [1.2, 0], D: [2.8, 1.4], E: [2.8, 2.7], F: [4.2, 2],
      G: [5.8, 1.4], H: [5.8, 2.7], I: [8.5, 2.95], J: [8.2, 1.6], K: [7.2, 0],
      L: [4.2, 4], M: [3, 5.8], N: [5.6, 5.8], O: [1.4, 6.9], P: [7, 6.9],
      Q: [1, 4.5], R: [7.4, 4.5],
      S: [0.5, 2.9], T: [3.7, 2.7], U: [4.2, 2.7], V: [4.7, 2.7], W: [8, 2.9],
      X: [3.5, 1.4], Y: [4.9, 1.4], Z: [3.5, 0.5], α: [4.9, 0.5],
    };

    const lines = [
      ['A', 'S'], ['S', 'E'], ['B', 'E'], ['C', 'D'], ['E', 'D'], ['S', 'Q'], ['Q', 'O'],
      ['O', 'M'], ['M', 'Q'], ['M', 'N'], ['N', 'P'], ['N', 'R'], ['N', 'L'], ['M', 'L'],
      ['L', 'R'], ['L', 'E'], ['L', 'H'], ['R', 'W'], ['W', 'I'], ['H', 'W'], ['H', 'J'],
      ['H', 'G'], ['G', 'K'], ['G', 'α'], ['α', 'Z'], ['Z', 'D'], ['D', 'X'], ['X', 'F'],
      ['F', 'Y'], ['Y', 'G'], ['L', 'U'], ['U', 'T'], ['U', 'V'], ['T', 'F'], ['V', 'F'],
      ['P', 'R'], ['Q', 'L']
    ];

    // Animation & draw function
    const animate = () => {
      if (!canvas || !container) return;

      width = container.clientWidth;
      height = container.clientHeight;

      // Set canvas pixel size for high-DPI screens
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform before scaling
      ctx.scale(dpr, dpr);

      // Calculate scale so cat fits nicely with some padding (10%)
      const scaleX = (width * 0.8) / baseWidth;
      const scaleY = (height * 0.8) / baseHeight;
      const scale = Math.min(scaleX, scaleY);

      // Center cat horizontally and vertically
      const catWidthPx = baseWidth * scale;
      const catHeightPx = baseHeight * scale;
      const offsetX = (width - catWidthPx) / 2;
      const offsetY = (height + catHeightPx) / 2; // Y-axis inverted in convert

      // Calculate animation offsets
      const time = Date.now() * 0.002;
      const earOffset = Math.sin(time) * 0.15;
      const whiskerOffset = Math.cos(time * 1.5) * 0.1;

      const points = { ...basePoints };

      // Animate ears
      points.O = [1.4 + earOffset, 6.9 + earOffset];
      points.P = [7 - earOffset, 6.9 + earOffset];

      // Animate whiskers
      points.A = [0 + whiskerOffset, 2.95];
      points.B = [0.3 + whiskerOffset, 1.6];
      points.C = [1.2 + whiskerOffset, 0];
      points.I = [8.5 - whiskerOffset, 2.95];
      points.J = [8.2 - whiskerOffset, 1.6];
      points.K = [7.2 - whiskerOffset, 0];

      const convertedPoints = Object.fromEntries(
        Object.entries(points).map(([name, coords]) => [name, convert(scale, offsetX, offsetY, coords)])
      );

      ctx.clearRect(0, 0, width, height);

      ctx.lineWidth = hovered ? 8 : 6;
      ctx.strokeStyle = '#00b4d8';

      lines.forEach(([a, b]) => {
        const p1 = convertedPoints[a];
        const p2 = convertedPoints[b];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      ctx.fillStyle = 'white';
      ctx.shadowColor = hovered ? 'var(--electric-blue)' : 'white';
      ctx.shadowBlur = hovered ? 20 : 12;

      Object.entries(convertedPoints).forEach(([name, { x, y }]) => {
        if (!['S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'α'].includes(name)) {
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.shadowBlur = 0;
      ctx.shadowColor = 'transparent';

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [hovered]);

  return (
    <div
      ref={containerRef}
      className="cat-face"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ transition: 'transform 0.3s ease', transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
    >
      <canvas ref={canvasRef} style={{ background: 'transparent', borderRadius: '8px', display: 'block' }} />
    </div>
  );
}
