import React, { useRef, useEffect } from 'react';
import '../styles/AnimatedBackground.css';

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width, height, dpr;
    let animationFrameId;
    let catTimer = 0;
    const neurons = [];

    class Neuron {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = 0.8 + Math.random() * 2.5;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.pulse = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulse += 0.02;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        const alpha = 0.1 + Math.sin(this.pulse) * 0.05;
        ctx.fillStyle = `rgba(112, 238, 156, ${alpha})`;
        ctx.shadowColor = 'rgba(112, 238, 156, 0.15)';
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
          if (dist < 130) {
            ctx.beginPath();
            const alpha = 0.05 + (1 - dist / 130) * 0.3;
            ctx.strokeStyle = `rgba(112, 238, 156, ${alpha})`;
            ctx.lineWidth = 0.3;
            ctx.moveTo(neurons[i].x, neurons[i].y);
            ctx.lineTo(neurons[j].x, neurons[j].y);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    }

    function drawCatFace(x, y, scale = 1) {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.strokeStyle = 'rgba(112, 238, 156, 0.07)';
      ctx.lineWidth = 1;

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

      // Whiskers
      ctx.beginPath();
      ctx.moveTo(20, 35); ctx.lineTo(5, 34);
      ctx.moveTo(20, 37); ctx.lineTo(5, 37);
      ctx.moveTo(20, 39); ctx.lineTo(5, 40);
      ctx.moveTo(60, 35); ctx.lineTo(75, 34);
      ctx.moveTo(60, 37); ctx.lineTo(75, 37);
      ctx.moveTo(60, 39); ctx.lineTo(75, 40);
      ctx.stroke();

      ctx.restore();
    }

    function drawRandomCat() {
      const catX = Math.random() * (width - 80);
      const catY = Math.random() * (height - 80);
      drawCatFace(catX, catY, 1.2);
    }

    function initCanvas() {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      neurons.length = 0;
      for (let i = 0; i < 120; i++) {
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
        drawRandomCat();
        catTimer = Math.floor(Math.random() * 400) + 400;
      } else {
        catTimer--;
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    initCanvas();
    animate();
    window.addEventListener('resize', initCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', initCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="background-canvas" id="top" />;
}
