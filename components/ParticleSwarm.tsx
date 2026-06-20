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

type Vec = { x: number; y: number };

// Organic fractal branch — recursive midpoint displacement, fixed jitter ratios
// per connection so the shape stays stable while endpoints drift each frame.
function branchPoints(a: Vec, b: Vec, offsets: number[]): Vec[] {
  let points: Vec[] = [a, b];
  let idx = 0;
  for (let depth = 0; depth < 2; depth++) {
    const next: Vec[] = [points[0]];
    for (let k = 0; k < points.length - 1; k++) {
      const p1 = points[k];
      const p2 = points[k + 1];
      const mx = (p1.x + p2.x) / 2;
      const my = (p1.y + p2.y) / 2;
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len;
      const ny = dx / len;
      const offset = offsets[idx % offsets.length];
      idx++;
      const amp = len * 0.16;
      next.push({ x: mx + nx * offset * amp, y: my + ny * offset * amp });
      next.push(p2);
    }
    points = next;
  }
  return points;
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

    // Palette — monochrome dominant, lila + a touch of cool cyan and one warm core
    const PALETTE = [
      { r: 229, g: 229, b: 229 }, // text white
      { r: 229, g: 229, b: 229 },
      { r: 113, g: 113, b: 122 }, // muted gray
      { r: 161, g: 161, b: 170 }, // mid gray
      { r: 109, g: 40,  b: 217 }, // accent lila
      { r: 125, g: 211, b: 252 }, // cool cyan — minority, echoes reference mood
    ];
    const WARM = { r: 251, g: 191, b: 110 }; // single warm core accent, used sparingly

    const rng = seededRng(42);

    // Small background bubbles — simple, cheap
    const universes = Array.from({ length: 70 }, () => {
      const c = PALETTE[Math.floor(rng() * PALETTE.length)];
      return {
        x: rng() * canvas.width,
        y: rng() * canvas.height,
        vx: (rng() - 0.5) * 0.35,
        vy: (rng() - 0.5) * 0.35,
        r: 1.2 + rng() * 3.2,
        phase: rng() * Math.PI * 2,
        speed: 0.006 + rng() * 0.014,
        noiseOffX: rng() * 100,
        noiseOffY: rng() * 100,
        color: c,
      };
    });

    // Feature bubbles — bigger, hold an embedded galaxy swirl, anchor the branch network
    const features = Array.from({ length: 16 }, (_, i) => {
      const c = i === 0 ? WARM : PALETTE[Math.floor(rng() * PALETTE.length)];
      return {
        x: rng() * canvas.width,
        y: rng() * canvas.height,
        vx: (rng() - 0.5) * 0.12,
        vy: (rng() - 0.5) * 0.12,
        r: 5 + rng() * 4.5,
        phase: rng() * Math.PI * 2,
        speed: 0.004 + rng() * 0.008,
        noiseOffX: rng() * 100,
        noiseOffY: rng() * 100,
        galaxyRot: rng() * Math.PI * 2,
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

    // Sparse organic branch network between nearest feature bubbles (1-2 each, no dense mesh)
    const connections: { i: number; j: number; offsets: number[]; warm: boolean }[] = [];
    features.forEach((f, i) => {
      const dists = features
        .map((g, j) => ({ j, d: j === i ? Infinity : Math.hypot(f.x - g.x, f.y - g.y) }))
        .sort((a, b) => a.d - b.d)
        .slice(0, 2);
      dists.forEach(({ j }) => {
        if (!connections.some(c => (c.i === i && c.j === j) || (c.i === j && c.j === i))) {
          connections.push({
            i, j,
            offsets: [rng() - 0.5, rng() - 0.5, rng() - 0.5],
            warm: i === 0 || j === 0,
          });
        }
      });
    });

    let t = 0;

    const draw = () => {
      // Fade trail — slight void color so past frames ghost
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(10, 10, 11, 0.16)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Gentle dolly — slow breathing zoom + slow pan, simulates drifting through the field
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const zoom = 1 + Math.sin(t * 0.0028) * 0.16;
      const panX = Math.sin(t * 0.0009) * 70;
      const panY = Math.cos(t * 0.0007) * 48;
      ctx.save();
      ctx.translate(cx + panX, cy + panY);
      ctx.scale(zoom, zoom);
      ctx.translate(-cx, -cy);

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

      // Drift helper — shared by both bubble pools
      const drift = (u: { x: number; y: number; vx: number; vy: number; noiseOffX: number; noiseOffY: number }, strength: number) => {
        const nx = smoothNoise(u.x * 0.004 + u.noiseOffX, u.y * 0.004, t * 0.008);
        const ny = smoothNoise(u.x * 0.004, u.y * 0.004 + u.noiseOffY, t * 0.008);
        u.x += u.vx + nx * strength;
        u.y += u.vy + ny * strength;
        if (u.x < -20) u.x = canvas.width + 20;
        if (u.x > canvas.width + 20) u.x = -20;
        if (u.y < -20) u.y = canvas.height + 20;
        if (u.y > canvas.height + 20) u.y = -20;
      };

      features.forEach(f => drift(f, 0.04));

      // Organic branch network — fractal-jittered veins between feature bubbles
      connections.forEach(({ i, j, offsets, warm }) => {
        const a = features[i];
        const b = features[j];
        const pts = branchPoints(a, b, offsets);
        const c = warm ? WARM : a.color;
        ctx.shadowColor = `rgba(${c.r},${c.g},${c.b},0.5)`;
        ctx.shadowBlur = 4;
        ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},0.16)`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let k = 1; k < pts.length; k++) ctx.lineTo(pts[k].x, pts[k].y);
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // Small background bubbles
      universes.forEach(u => {
        drift(u, 0.12);
        const pulse = Math.max(0.4, u.r + Math.sin(t * u.speed + u.phase) * 1.8);
        const c = u.color;

        const glow = ctx.createRadialGradient(u.x, u.y, 0, u.x, u.y, pulse * 6);
        glow.addColorStop(0,   `rgba(${c.r},${c.g},${c.b},0.22)`);
        glow.addColorStop(0.35,`rgba(${c.r},${c.g},${c.b},0.07)`);
        glow.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(u.x, u.y, pulse * 6, 0, Math.PI * 2);
        ctx.fill();

        const sphere = ctx.createRadialGradient(
          u.x - pulse * 0.25, u.y - pulse * 0.25, 0,
          u.x, u.y, pulse
        );
        sphere.addColorStop(0,    'rgba(255,255,255,0.45)');
        sphere.addColorStop(0.35, `rgba(${c.r},${c.g},${c.b},0.6)`);
        sphere.addColorStop(0.75, `rgba(${c.r},${c.g},${c.b},0.25)`);
        sphere.addColorStop(1,    `rgba(${c.r},${c.g},${c.b},0.0)`);
        ctx.fillStyle = sphere;
        ctx.beginPath();
        ctx.arc(u.x, u.y, pulse, 0, Math.PI * 2);
        ctx.fill();
      });

      // Feature bubbles — each one a tiny visible galaxy inside a glass bubble
      features.forEach(f => {
        const pulse = f.r + Math.sin(t * f.speed + f.phase) * 1.2;
        const c = f.color;

        // Outer glow halo
        const glow = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, pulse * 5);
        glow.addColorStop(0,   `rgba(${c.r},${c.g},${c.b},0.28)`);
        glow.addColorStop(0.35,`rgba(${c.r},${c.g},${c.b},0.09)`);
        glow.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(f.x, f.y, pulse * 5, 0, Math.PI * 2);
        ctx.fill();

        // Glass bubble body
        const sphere = ctx.createRadialGradient(
          f.x - pulse * 0.3, f.y - pulse * 0.3, 0,
          f.x, f.y, pulse
        );
        sphere.addColorStop(0,    'rgba(255,255,255,0.18)');
        sphere.addColorStop(0.6,  `rgba(${c.r},${c.g},${c.b},0.16)`);
        sphere.addColorStop(1,    `rgba(${c.r},${c.g},${c.b},0.04)`);
        ctx.fillStyle = sphere;
        ctx.beginPath();
        ctx.arc(f.x, f.y, pulse, 0, Math.PI * 2);
        ctx.fill();

        // Embedded galaxy swirl — two faint spiral arms, slowly rotating
        f.galaxyRot += 0.0015;
        ctx.save();
        ctx.translate(f.x, f.y);
        ctx.rotate(f.galaxyRot);
        for (let arm = 0; arm < 2; arm++) {
          ctx.beginPath();
          const armOffset = arm * Math.PI;
          for (let a = 0; a <= Math.PI * 1.4; a += 0.22) {
            const rr = (a / (Math.PI * 1.4)) * pulse * 0.8;
            const ang = a + armOffset;
            const x = Math.cos(ang) * rr;
            const y = Math.sin(ang) * rr * 0.5;
            if (a === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = `rgba(255,255,255,0.3)`;
          ctx.lineWidth = Math.max(0.4, pulse * 0.05);
          ctx.stroke();
        }
        // Bright core
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.beginPath();
        ctx.arc(0, 0, Math.max(0.6, pulse * 0.1), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Rim — faint glass edge
        ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},0.25)`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(f.x, f.y, pulse, 0, Math.PI * 2);
        ctx.stroke();
      });

      ctx.restore();

      // Vignette behind the title — drawn outside the dolly transform so it
      // stays fixed on screen, dimming the busy background right where the
      // text sits without flattening the effect elsewhere.
      ctx.globalCompositeOperation = 'source-over';
      const vignette = ctx.createRadialGradient(cx, cy * 0.85, 0, cx, cy * 0.85, Math.max(canvas.width, canvas.height) * 0.42);
      vignette.addColorStop(0,   'rgba(10,10,11,0.55)');
      vignette.addColorStop(0.6, 'rgba(10,10,11,0.25)');
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
