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

    const move = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
    };

    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
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
          'radial-gradient(circle, rgba(0,82,255,0.055) 0%, transparent 65%)',
        zIndex: 9999,
        mixBlendMode: 'multiply',
        willChange: 'transform',
      }}
    />
  );
}
