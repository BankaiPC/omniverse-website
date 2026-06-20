'use client';

import { useEffect, useRef } from 'react';

interface ParticleSwarmProps {
  className?: string;
}

// Simple seeded PRNG
function seededRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

// 2D Perlin-like smooth noise
function smoothNoise(x: number, y: number, t: number): number {
  return (
    Math.sin(x * 0.8 + t * 0.3) * Math.cos(y * 0.6 + t * 0.2) +
    Math.sin(x * 0.3 - y * 0.4 + t * 0.15) * 0.5 +
    Math.cos(x * 0.5 + y * 0.7 - t * 0.1) * 0.3
  );
}

export default function ParticleSwarm({ className = '' }: ParticleSwarmProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    // Palette — monochrome dominant, lila accent minority (Dark Elf)
    const PALETTE = [
      { r: 229, g: 229, b: 229 }, // text white
      { r: 229, g: 229, b: 229 },
      { r: 113, g: 113, b: 122 }, // muted gray
      { r: 161, g: 161, b: 170 }, // mid gray
      { r: 109, g: 40,  b: 217 }, // accent lila — minority
    ];

    const rng = seededRng(42);

    // Universe orbs — each one is a "universe" bubble
    const universes = Array.from({ length: 90 }, (_, i) => {
      const c = PALETTE[Math.floor(rng() * PALETTE.length)];
      return {
        x: rng() * canvas.width,
        y: rng() * canvas.height,
        vx: (rng() - 0.5) * 0.35,
        vy: (rng() - 0.5) * 0.35,
        r: 1.2 + rng() * 3.8,
        phase: rng() * Math.PI * 2,
        speed: 0.006 + rng() * 0.014,
        noiseOffX: rng() * 100,
        noiseOffY: rng() * 100,
        color: c,
      };
    });

    // Macro nebulae — large glowing background halos
    const macros = Array.from({ length: 7 }, () => {
      const c = PALETTE[Math.floor(rng() * PALETTE.length)];
      return {
        x: rng() * canvas.width,
        y: rng() * canvas.height,
        r: 80 + rng() * 160,
        phase: rng() * Math.PI * 2,
        speed: 0.0006 + rng() * 0.0015,
        color: c,
      };
    });

    let t = 0;

    const draw = () => {
      // Fade trail — slight void color so past frames ghost
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(10, 10, 11, 0.16)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Macro nebulae (deepest layer)
      ctx.globalCompositeOperation = 'lighter';
      macros.forEach(m => {
        const pulse = 0.7 + Math.sin(t * m.speed + m.phase) * 0.3;
        const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * pulse);
        g.addColorStop(0,   `rgba(${m.color.r},${m.color.g},${m.color.b},0.055)`);
        g.addColorStop(0.4, `rgba(${m.color.r},${m.color.g},${m.color.b},0.018)`);
        g.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r * pulse, 0, Math.PI * 2);
        ctx.fill();
      });

      // Universe bubbles
      universes.forEach(u => {
        // Procedural drift — noise field shifts velocity each frame
        const nx = smoothNoise(u.x * 0.004 + u.noiseOffX, u.y * 0.004, t * 0.008);
        const ny = smoothNoise(u.x * 0.004, u.y * 0.004 + u.noiseOffY, t * 0.008);
        u.x += u.vx + nx * 0.25;
        u.y += u.vy + ny * 0.25;

        // Wrap edges
        if (u.x < -20) u.x = canvas.width + 20;
        if (u.x > canvas.width + 20) u.x = -20;
        if (u.y < -20) u.y = canvas.height + 20;
        if (u.y > canvas.height + 20) u.y = -20;

        const pulse = Math.max(0.4, u.r + Math.sin(t * u.speed + u.phase) * 1.8);
        const c = u.color;

        // Outer glow halo
        const glow = ctx.createRadialGradient(u.x, u.y, 0, u.x, u.y, pulse * 6);
        glow.addColorStop(0,   `rgba(${c.r},${c.g},${c.b},0.22)`);
        glow.addColorStop(0.35,`rgba(${c.r},${c.g},${c.b},0.07)`);
        glow.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(u.x, u.y, pulse * 6, 0, Math.PI * 2);
        ctx.fill();

        // Core bubble — soft nebula glow instead of glass-marble highlight
        const sphere = ctx.createRadialGradient(
          u.x - pulse * 0.25, u.y - pulse * 0.25, 0,
          u.x, u.y, pulse
        );
        sphere.addColorStop(0,    `rgba(255,255,255,0.45)`);
        sphere.addColorStop(0.35, `rgba(${c.r},${c.g},${c.b},0.6)`);
        sphere.addColorStop(0.75, `rgba(${c.r},${c.g},${c.b},0.25)`);
        sphere.addColorStop(1,    `rgba(${c.r},${c.g},${c.b},0.0)`);
        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = sphere;
        ctx.beginPath();
        ctx.arc(u.x, u.y, pulse, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = 'source-over';
      t++;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => resize();
    window.addEventListener('resize', handleResize);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
}
