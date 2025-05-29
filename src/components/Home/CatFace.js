import React, { useRef, useEffect } from 'react';

export default function CatFace() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 600;

    const scale = 60;
    const offsetX = 50;
    const offsetY = 550;

    const convert = ([x, y]) => ({ x: x * scale + offsetX, y: offsetY - y * scale });

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

    const animate = () => {
      const time = Date.now() * 0.002;
      const earOffset = Math.sin(time) * 0.15;
      const whiskerOffset = Math.cos(time * 1.5) * 0.1;

      const points = { ...basePoints };

      // Animate left ear tip (O)
      points.O = [1.4 + earOffset, 6.9 + earOffset];

      // Animate right ear tip (P)
      points.P = [7 - earOffset, 6.9 + earOffset];

      // Animate whisker tips
      points.A = [0 + whiskerOffset, 2.95];
      points.B = [0.3 + whiskerOffset, 1.6];
      points.C = [1.2 + whiskerOffset, 0];

      points.I = [8.5 - whiskerOffset, 2.95];
      points.J = [8.2 - whiskerOffset, 1.6];
      points.K = [7.2 - whiskerOffset, 0];

      const convertedPoints = Object.fromEntries(
        Object.entries(points).map(([name, coords]) => [name, convert(coords)])
      );

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#00b4d8';
      ctx.fillStyle = '#70ee9c';
      ctx.lineWidth = 4;

      lines.forEach(([a, b]) => {
        const p1 = convertedPoints[a];
        const p2 = convertedPoints[b];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      Object.entries(convertedPoints).forEach(([name, { x, y }]) => {
        if (!['S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'α'].includes(name)) {
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <canvas ref={canvasRef} style={{ background: 'transparent', borderRadius: '8px' }} />
  );
}