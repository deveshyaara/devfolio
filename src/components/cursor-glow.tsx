'use client';

import { useEffect, useRef } from 'react';

/**
 * Subtle cursor glow that follows mouse movements.
 * Uses transform on a fixed element (no DOM thrashing).
 * Cleans up its own event listener on unmount.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId = 0;
    let nextX = -400;
    let nextY = -400;

    const flush = () => {
      rafId = 0;
      el.style.transform = `translate3d(${nextX - 200}px, ${nextY - 200}px, 0)`;
    };

    const move = (e: PointerEvent) => {
      nextX = e.clientX;
      nextY = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(flush);
      }
    };

    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        pointerEvents: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        width: 400,
        height: 400,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(0,82,255,0.045) 0%, transparent 65%)',
        zIndex: 40,
        transform: 'translate3d(-400px, -400px, 0)',
        willChange: 'transform',
      }}
    />
  );
}
