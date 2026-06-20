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

    // Palette — monochrome dominant, lila accent, one warm core
    const PALETTE = [
      { r: 229, g: 229, b: 229 }, // text white
      { r: 229, g: 229, b: 229 },
      { r: 161, g: 161, b: 170 }, // mid gray
      { r: 109, g: 40,  b: 217 }, // accent lila
      { r: 125, g: 211, b: 252 }, // cool cyan — minority
    ];
    const WARM = { r: 251, g: 191, b: 110 };

    const rng = seededRng(42);

    // Tiny static starfield specks — quiet backdrop texture, barely moving
    const stars = Array.from({ length: 50 }, () => ({
      x: rng() * canvas.width,
      y: rng() * canvas.height,
      r: 0.4 + rng() * 1,
      twinklePhase: rng() * Math.PI * 2,
      twinkleSpeed: 0.003 + rng() * 0.004, // very slow, smooth — not a flicker
    }));

    // Feature bubbles — few, large, calm. Each one a visible galaxy inside a glass sphere.
    const features = Array.from({ length: 9 }, (_, i) => {
      const c = i === 0 ? WARM : PALETTE[Math.floor(rng() * PALETTE.length)];
      return {
        x: rng() * canvas.width,
        y: rng() * canvas.height,
        vx: (rng() - 0.5) * 0.05,
        vy: (rng() - 0.5) * 0.05,
        r: 30 + rng() * 55,
        phase: rng() * Math.PI * 2,
        speed: 0.002 + rng() * 0.003,
        noiseOffX: rng() * 100,
        noiseOffY: rng() * 100,
        galaxyRot: rng() * Math.PI * 2,
        color: c,
      };
    });

    // Macro nebulae — large soft background halos
    const macros = Array.from({ length: 5 }, () => {
      const c = PALETTE[Math.floor(rng() * PALETTE.length)];
      return {
        x: rng() * canvas.width,
        y: rng() * canvas.height,
        r: 90 + rng() * 170,
        phase: rng() * Math.PI * 2,
        speed: 0.0005 + rng() * 0.0012,
        color: c,
      };
    });

    let t = 0;

    const draw = () => {
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(10, 10, 11, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Very gentle, slow dolly — continuous and smooth, no sudden jumps
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const zoom = 1 + Math.sin(t * 0.0009) * 0.06;
      const panX = Math.sin(t * 0.00035) * 30;
      const panY = Math.cos(t * 0.00028) * 20;
      ctx.save();
      ctx.translate(cx + panX, cy + panY);
      ctx.scale(zoom, zoom);
      ctx.translate(-cx, -cy);

      // Macro nebulae (deepest layer)
      ctx.globalCompositeOperation = 'lighter';
      macros.forEach(m => {
        const pulse = 0.75 + Math.sin(t * m.speed + m.phase) * 0.25;
        const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * pulse);
        g.addColorStop(0,   `rgba(${m.color.r},${m.color.g},${m.color.b},0.05)`);
        g.addColorStop(0.4, `rgba(${m.color.r},${m.color.g},${m.color.b},0.016)`);
        g.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r * pulse, 0, Math.PI * 2);
        ctx.fill();
      });

      // Tiny stars — fixed position, very slow smooth brightness drift (no flicker)
      stars.forEach(s => {
        const tw = 0.5 + Math.sin(t * s.twinkleSpeed + s.twinklePhase) * 0.4;
        ctx.fillStyle = `rgba(255,255,255,${0.25 * tw})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Feature bubbles — large, calm galaxy-in-glass spheres.
      // Normal blending (not 'lighter') so they read as distinct glass
      // objects instead of blown-out light sources.
      ctx.globalCompositeOperation = 'source-over';
      features.forEach(f => {
        const nx = smoothNoise(f.x * 0.003 + f.noiseOffX, f.y * 0.003, t * 0.004);
        const ny = smoothNoise(f.x * 0.003, f.y * 0.003 + f.noiseOffY, t * 0.004);
        f.x += f.vx + nx * 0.05;
        f.y += f.vy + ny * 0.05;
        if (f.x < -f.r) f.x = canvas.width + f.r;
        if (f.x > canvas.width + f.r) f.x = -f.r;
        if (f.y < -f.r) f.y = canvas.height + f.r;
        if (f.y > canvas.height + f.r) f.y = -f.r;

        const pulse = f.r + Math.sin(t * f.speed + f.phase) * f.r * 0.04;
        const c = f.color;

        // Very subtle ambient glow — just enough to feel lit, not enough
        // to wash out the bubble's edge
        ctx.globalCompositeOperation = 'lighter';
        const ambient = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, pulse * 1.25);
        ambient.addColorStop(0,   `rgba(${c.r},${c.g},${c.b},0.06)`);
        ambient.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = ambient;
        ctx.beginPath();
        ctx.arc(f.x, f.y, pulse * 1.25, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';

        // Everything below is clipped to the circle so the galaxy stays
        // contained inside the sphere — this is what makes it read as a
        // bubble rather than a blob.
        ctx.save();
        ctx.beginPath();
        ctx.arc(f.x, f.y, pulse, 0, Math.PI * 2);
        ctx.clip();

        // Colorful nebula fill inside the bubble
        const nebula = ctx.createRadialGradient(
          f.x - pulse * 0.25, f.y - pulse * 0.25, 0,
          f.x, f.y, pulse * 1.3
        );
        nebula.addColorStop(0,    'rgba(255,255,255,0.5)');
        nebula.addColorStop(0.22, `rgba(${c.r},${c.g},${c.b},0.55)`);
        nebula.addColorStop(0.55, 'rgba(90,50,170,0.32)');
        nebula.addColorStop(1,    'rgba(8,8,22,0.5)');
        ctx.fillStyle = nebula;
        ctx.fillRect(f.x - pulse, f.y - pulse, pulse * 2, pulse * 2);

        // Spiral arms, slow smooth rotation, no flicker
        f.galaxyRot += 0.0009;
        ctx.save();
        ctx.translate(f.x, f.y);
        ctx.rotate(f.galaxyRot);
        for (let arm = 0; arm < 2; arm++) {
          ctx.beginPath();
          const armOffset = arm * Math.PI;
          for (let a = 0; a <= Math.PI * 1.5; a += 0.18) {
            const rr = (a / (Math.PI * 1.5)) * pulse * 0.85;
            const ang = a + armOffset;
            const x = Math.cos(ang) * rr;
            const y = Math.sin(ang) * rr * 0.5;
            if (a === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = 'rgba(255,255,255,0.45)';
          ctx.lineWidth = Math.max(0.6, pulse * 0.035);
          ctx.stroke();
        }
        // Bright core
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.beginPath();
        ctx.arc(0, 0, Math.max(1.2, pulse * 0.07), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore(); // undo translate/rotate, stay clipped

        // A few tiny stars scattered inside, seeded so they stay put
        const starSeed = seededRng(Math.floor(f.x * 13 + f.y * 7));
        for (let k = 0; k < 5; k++) {
          const sa = starSeed() * Math.PI * 2;
          const sr = starSeed() * pulse * 0.9;
          ctx.fillStyle = 'rgba(255,255,255,0.5)';
          ctx.beginPath();
          ctx.arc(f.x + Math.cos(sa) * sr, f.y + Math.sin(sa) * sr, 0.7, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore(); // remove clip — rim drawn unclipped for a crisp edge

        // Crisp glass rim
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.arc(f.x, f.y, pulse, 0, Math.PI * 2);
        ctx.stroke();

        // Specular highlight arc — top-left crescent, like light catching glass
        ctx.strokeStyle = 'rgba(255,255,255,0.55)';
        ctx.lineWidth = Math.max(1.5, pulse * 0.07);
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(f.x, f.y, pulse * 0.86, Math.PI * 1.08, Math.PI * 1.62);
        ctx.stroke();
      });

      ctx.restore();

      // Vignette behind the title — fixed on screen, dims the field where the
      // text sits so it reads clearly against the bubbles.
      ctx.globalCompositeOperation = 'source-over';
      const vignette = ctx.createRadialGradient(cx, cy * 0.85, 0, cx, cy * 0.85, Math.max(canvas.width, canvas.height) * 0.42);
      vignette.addColorStop(0,   'rgba(10,10,11,0.5)');
      vignette.addColorStop(0.6, 'rgba(10,10,11,0.22)');
      vignette.addColorStop(1,   'rgba(10,10,11,0)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

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
