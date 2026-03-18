"use client";

import { useEffect, useRef, useCallback } from "react";

const REPEL_R = 130;
const REPEL_F = 0.06;
const BG_COUNT = 220;

interface Particle {
  x: number; y: number;
  bx: number; by: number;
  vx: number; vy: number;
  r: number;
  a: number;
  ad: number;
}

function bgParticles(w: number, h: number) {
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < BG_COUNT; i++) {
    pts.push({ x: Math.random() * w, y: Math.random() * h });
  }
  return pts;
}

function spawn(w: number, h: number): Particle[] {
  const bgPts = bgParticles(w, h);

  const makeBg = (pt: { x: number; y: number }): Particle => ({
    x: pt.x,
    y: pt.y,
    bx: pt.x, by: pt.y,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    r: 1 + Math.random() * 1.8,
    a: 0.2 + Math.random() * 0.35,
    ad: (Math.random() > 0.5 ? 1 : -1) * (0.002 + Math.random() * 0.004),
  });

  return bgPts.map((p) => makeBg(p));
}

export default function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);
  const parts = useRef<Particle[]>([]);
  const mouse = useRef({ x: -9999, y: -9999 });
  const anim = useRef(0);
  const sz = useRef({ w: 0, h: 0 });

  const resize = useCallback(() => {
    const c = ref.current;
    if (!c) return;
    const dpr = window.devicePixelRatio || 1;
    const w = c.parentElement?.clientWidth || window.innerWidth;
    const h = c.parentElement?.clientHeight || window.innerHeight;
    sz.current = { w, h };
    c.width = w * dpr;
    c.height = h * dpr;
    c.style.width = `${w}px`;
    c.style.height = `${h}px`;
    const ctx = c.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    parts.current = spawn(w, h);
  }, []);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    const c = ref.current;
    if (!c) return;

    const onMove = (e: MouseEvent) => {
      const r = c.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
    const onTouch = (e: TouchEvent) => {
      const r = c.getBoundingClientRect();
      const t = e.touches[0];
      if (t) mouse.current = { x: t.clientX - r.left, y: t.clientY - r.top };
    };

    c.addEventListener("mousemove", onMove);
    c.addEventListener("mouseleave", onLeave);
    c.addEventListener("touchmove", onTouch, { passive: true });
    c.addEventListener("touchend", onLeave);

    const ctx = c.getContext("2d");
    if (!ctx) return;

    const loop = () => {
      const { w, h } = sz.current;
      ctx.clearRect(0, 0, w, h);
      const mx = mouse.current.x, my = mouse.current.y;

      for (const p of parts.current) {
        p.vx += (p.bx - p.x) * 0.008;
        p.vy += (p.by - p.y) * 0.008;

        // Mouse repulsion
        const dx = p.x - mx, dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_R && dist > 0) {
          const f = ((REPEL_R - dist) / REPEL_R) * REPEL_F;
          p.vx += (dx / dist) * f * 8;
          p.vy += (dy / dist) * f * 8;
        }

        const jitter = 0.04;
        p.vx += (Math.random() - 0.5) * jitter;
        p.vy += (Math.random() - 0.5) * jitter;
        p.vx *= 0.9; p.vy *= 0.9;
        p.x += p.vx; p.y += p.vy;

        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        // Alpha pulsation
        p.a += p.ad;
        const maxA = 0.65;
        const minA = 0.15;
        if (p.a > maxA) { p.a = maxA; p.ad *= -1; }
        if (p.a < minA) { p.a = minA; p.ad *= -1; }

        // Main dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230,184,0,${p.a})`;
        ctx.fill();
      }
      anim.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(anim.current);
      window.removeEventListener("resize", resize);
      c.removeEventListener("mousemove", onMove);
      c.removeEventListener("mouseleave", onLeave);
      c.removeEventListener("touchmove", onTouch);
      c.removeEventListener("touchend", onLeave);
    };
  }, [resize]);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}
