import React, { useRef, useEffect } from 'react';
import '../styles/AnimatedBackground.css';

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width, height;
    let animationFrameId;
    let catTimer = 0;

    let neurons = [];

    class Neuron {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = 1 + Math.random() * 2;
        this.vx = (Math.random() - 0.5) * 0.1;
        this.vy = (Math.random() - 0.5) * 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(112, 238, 156, 0.2)';
        ctx.shadowColor = 'rgba(112, 238, 156, 0.3)';
        ctx.shadowBlur = 3;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
      }
    }

    function connectNeurons() {
      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          const dx = neurons[i].x - neurons[j].x;
          const dy = neurons[i].y - neurons[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(112, 238, 156, ${1 - dist / 120})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(neurons[i].x, neurons[i].y);
            ctx.lineTo(neurons[j].x, neurons[j].y);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    }

    function drawCatFaceSilhouette() {
      const x = Math.random() * (width - 150);
      const y = Math.random() * (height - 150);

      ctx.save();
      ctx.strokeStyle = 'rgba(112, 238, 156, 0.05)';
      ctx.lineWidth = 1;

      // Head
      ctx.beginPath();
      ctx.moveTo(x + 50, y + 100); // chin
      ctx.lineTo(x + 30, y + 60);  // left cheek
      ctx.lineTo(x + 40, y + 40);  // left ear base
      ctx.lineTo(x + 50, y + 20);  // left ear tip
      ctx.lineTo(x + 60, y + 40);  // left ear base down
      ctx.lineTo(x + 90, y + 40);  // right ear base up
      ctx.lineTo(x + 100, y + 20); // right ear tip
      ctx.lineTo(x + 110, y + 40); // right ear base down
      ctx.lineTo(x + 120, y + 60); // right cheek
      ctx.lineTo(x + 100, y + 100); // chin
      ctx.closePath();
      ctx.stroke();

      // Eyes
      ctx.beginPath();
      ctx.moveTo(x + 60, y + 70);
      ctx.lineTo(x + 65, y + 70);
      ctx.moveTo(x + 90, y + 70);
      ctx.lineTo(x + 95, y + 70);
      ctx.stroke();

      // Nose
      ctx.beginPath();
      ctx.moveTo(x + 78, y + 80);
      ctx.lineTo(x + 82, y + 80);
      ctx.lineTo(x + 80, y + 85);
      ctx.closePath();
      ctx.stroke();

      // Whiskers
      ctx.beginPath();
      // Left
      ctx.moveTo(x + 50, y + 80);
      ctx.lineTo(x + 20, y + 75);
      ctx.moveTo(x + 50, y + 85);
      ctx.lineTo(x + 20, y + 85);
      ctx.moveTo(x + 50, y + 90);
      ctx.lineTo(x + 20, y + 95);
      // Right
      ctx.moveTo(x + 100, y + 80);
      ctx.lineTo(x + 130, y + 75);
      ctx.moveTo(x + 100, y + 85);
      ctx.lineTo(x + 130, y + 85);
      ctx.moveTo(x + 100, y + 90);
      ctx.lineTo(x + 130, y + 95);
      ctx.stroke();

      ctx.restore();
    }

    function init() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      neurons = [];
      for (let i = 0; i < 70; i++) {
        neurons.push(new Neuron());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      neurons.forEach((n) => {
        n.update();
        n.draw();
      });

      connectNeurons();

      if (catTimer <= 0) {
        drawCatFaceSilhouette();
        catTimer = Math.floor(Math.random() * 300) + 200; // every 200–500 frames
      } else {
        catTimer--;
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener('resize', init);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', init);
    };
  }, []);

  return <canvas ref={canvasRef} className="background-canvas" id="top" />;
}
