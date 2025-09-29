'use client';

import { useEffect, useRef } from 'react';
import { Vector3D } from '../lib/Vector3D';
import { Perlin } from '../lib/Perlin';
import { SmallPRNG } from '../lib/SmallPRNG';
import { MouseMonitor } from '../lib/MouseMonitor';
import { Particle } from '../lib/Particle';

interface ParticleSwarmProps {
  className?: string;
}

export default function ParticleSwarm({ className = '' }: ParticleSwarmProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(null);
  const particlesRef = useRef<Particle[]>([]);
  const settingsRef = useRef({
    particleNum: 5000,
    fadeOverlay: true,
    rotateColor: true,
    staticColor: { r: 0, g: 75, b: 50 },
    staticColorString: 'rgba(0, 75, 50, 0.55)'
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Initialize components
    const rctx = new SmallPRNG(+new Date());
    const p = new Perlin();
    const monitor = new MouseMonitor(canvas);
    const bounds = new Vector3D(0, 0, 0);
    let hue = 0;

    // Resize function
    const resize = () => {
      canvas.width = bounds.x = window.innerWidth;
      canvas.height = bounds.y = window.innerHeight;
      
      context.fillStyle = '#000000';
      context.fillRect(0, 0, bounds.x, bounds.y);
    };

    // Initialize perlin noise
    p.init(() => rctx.randomInt(0, 255));

    // Initial resize
    resize();

    // Generate particles
    particlesRef.current = [];
    for (let i = 0; i < settingsRef.current.particleNum; i++) {
      particlesRef.current.push(new Particle(p, bounds, rctx, monitor));
    }

    // Animation loop
    const render = () => {
      context.beginPath();
      
      // Render each particle and trail
      for (let i = 0; i < particlesRef.current.length; i++) {
        particlesRef.current[i].step();
        particlesRef.current[i].render(context);
      }

      context.globalCompositeOperation = 'source-over';
      if (settingsRef.current.fadeOverlay) {
        context.fillStyle = 'rgba(0, 0, 0, .085)';
      } else {
        context.fillStyle = 'rgba(0, 0, 0, 1)';
      }
      context.fillRect(0, 0, bounds.x, bounds.y);

      context.globalCompositeOperation = 'lighter';
      if (settingsRef.current.rotateColor) {
        context.strokeStyle = `hsla(${hue}, 75%, 50%, .55)`;
      } else {
        context.strokeStyle = settingsRef.current.staticColorString;
      }
      context.stroke();
      context.closePath();

      hue = ((hue + .5) % 360);
      animationRef.current = requestAnimationFrame(render);
    };

    // Start animation
    render();

    // Handle resize
    const handleResize = () => resize();
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full ${className}`}
      style={{ cursor: 'crosshair' }}
    />
  );
}
