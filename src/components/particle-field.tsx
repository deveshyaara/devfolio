"use client";

import { useEffect, useRef, useCallback } from "react";

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------
const REPEL_R = 130;
const REPEL_F = 0.06;
// Particle count is scaled by viewport area so large monitors don't run 3×
// the work of a phone. BASE_COUNT targets ~1080p; MOBILE_COUNT caps mobile.
const BASE_COUNT    = 220;
const MOBILE_COUNT  = 90;  // cap for viewports narrower than 768 px
const BASE_AREA     = 1920 * 1080;

interface Particle {
  x: number; y: number;
  bx: number; by: number;
  vx: number; vy: number;
  r: number;
  a: number;
  ad: number;
}

function makeParticle(x: number, y: number): Particle {
  return {
    x, y,
    bx: x, by: y,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    r: 1 + Math.random() * 1.8,
    a: 0.2 + Math.random() * 0.35,
    ad: (Math.random() > 0.5 ? 1 : -1) * (0.002 + Math.random() * 0.004),
  };
}

/** Choose how many particles to spawn based on viewport size. */
function particleCount(w: number, h: number): number {
  if (w < 768) return MOBILE_COUNT;
  const ratio = Math.min((w * h) / BASE_AREA, 1);
  return Math.round(BASE_COUNT * ratio);
}

function spawn(w: number, h: number): Particle[] {
  const n = particleCount(w, h);
  return Array.from({ length: n }, () =>
    makeParticle(Math.random() * w, Math.random() * h)
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function ParticleField() {
  const ref   = useRef<HTMLCanvasElement>(null);
  const parts  = useRef<Particle[]>([]);
  const mouse  = useRef({ x: -9999, y: -9999 });
  const anim   = useRef(0);
  const sz     = useRef({ w: 0, h: 0 });
  // paused = true when document is hidden or prefers-reduced-motion is active
  const paused = useRef(false);

  const resize = useCallback(() => {
    const c = ref.current;
    if (!c) return;
    // Cap DPR at 2 — no visual difference above 2× but doubles GPU memory.
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = c.parentElement?.clientWidth  || window.innerWidth;
    const h = c.parentElement?.clientHeight || window.innerHeight;
    sz.current = { w, h };
    c.width  = w * dpr;
    c.height = h * dpr;
    c.style.width  = `${w}px`;
    c.style.height = `${h}px`;
    const ctx = c.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // Respawn particles for new dimensions
    parts.current = spawn(w, h);
  }, []);

  useEffect(() => {
    // Respect prefers-reduced-motion: don't animate at all if the user has
    // requested reduced motion.
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return; // mount an invisible canvas — no rAF loop

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const c = ref.current;
    if (!c) return;

    // ---- Input handlers ----
    const onMove  = (e: MouseEvent) => {
      const r = c.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
    const onTouch = (e: TouchEvent) => {
      const r = c.getBoundingClientRect();
      const t = e.touches[0];
      if (t) mouse.current = { x: t.clientX - r.left, y: t.clientY - r.top };
    };

    c.addEventListener("mousemove", onMove, { passive: true });
    c.addEventListener("mouseleave", onLeave);
    c.addEventListener("touchmove",  onTouch, { passive: true });
    c.addEventListener("touchend",   onLeave);

    // ---- Pause when tab is hidden ----
    const onVisibility = () => { paused.current = document.hidden; };
    document.addEventListener("visibilitychange", onVisibility);

    const ctx = c.getContext("2d");
    if (!ctx) return;

    // ---- Animation loop ----
    const loop = () => {
      anim.current = requestAnimationFrame(loop);
      if (paused.current) return; // skip work while tab is hidden

      const { w, h } = sz.current;
      ctx.clearRect(0, 0, w, h);
      const mx = mouse.current.x;
      const my = mouse.current.y;

      for (const p of parts.current) {
        // Spring back to base position
        p.vx += (p.bx - p.x) * 0.008;
        p.vy += (p.by - p.y) * 0.008;

        // Mouse repulsion
        const dx   = p.x - mx;
        const dy   = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_R && dist > 0) {
          const f = ((REPEL_R - dist) / REPEL_R) * REPEL_F;
          p.vx += (dx / dist) * f * 8;
          p.vy += (dy / dist) * f * 8;
        }

        // Jitter + damping
        p.vx += (Math.random() - 0.5) * 0.04;
        p.vy += (Math.random() - 0.5) * 0.04;
        p.vx *= 0.9;
        p.vy *= 0.9;
        p.x  += p.vx;
        p.y  += p.vy;

        // Wrap around edges
        if (p.x < -20)     p.x = w + 20;
        if (p.x > w + 20)  p.x = -20;
        if (p.y < -20)     p.y = h + 20;
        if (p.y > h + 20)  p.y = -20;

        // Alpha pulsation
        p.a += p.ad;
        if (p.a > 0.65) { p.a = 0.65; p.ad *= -1; }
        if (p.a < 0.15) { p.a = 0.15; p.ad *= -1; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230,184,0,${p.a})`;
        ctx.fill();
      }
    };
    loop();

    return () => {
      cancelAnimationFrame(anim.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      c.removeEventListener("mousemove",  onMove);
      c.removeEventListener("mouseleave", onLeave);
      c.removeEventListener("touchmove",  onTouch);
      c.removeEventListener("touchend",   onLeave);
    };
  }, [resize]);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" aria-hidden />;
}
