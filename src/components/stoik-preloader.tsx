'use client';

import { useEffect, useState } from 'react';

const TOTAL_PIXELS = 8;

/**
 * StoikPreloader — Faithful 8-pixel-block preloader from the reference template.
 * Dismisses once the Spline 3D scene signals readiness or after a crisp cap.
 */
export default function StoikPreloader() {
  const [progress, setProgress] = useState(0.08);
  const [fading, setFading] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    let dismissed = false;
    let current = 0.08;
    let target = 0.25;
    let rafId = 0;

    const finish = () => {
      if (dismissed) return;
      dismissed = true;
      target = 1;
      setProgress(1);
      window.setTimeout(() => {
        setFading(true);
        window.setTimeout(() => setRemoved(true), 600);
      }, 180);
    };

    const tick = () => {
      if (dismissed) return;
      if (current < target) {
        current = Math.min(target, current + 0.032);
        setProgress(current);
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onSplineReady = () => {
      target = 1;
      window.setTimeout(finish, 180);
    };
    window.addEventListener('stoik:spline-ready', onSplineReady, { once: true });

    const start = performance.now();
    const crawl = window.setInterval(() => {
      if (dismissed) {
        window.clearInterval(crawl);
        return;
      }
      const elapsed = (performance.now() - start) / 1400;
      target = Math.max(target, Math.min(0.94, 0.1 + elapsed * 0.84));
    }, 60);

    // Crisp cap so visitors never wait unnecessarily (mobile skips Spline too)
    const capMs = window.innerWidth < 810 ? 750 : 1650;
    const capTimer = window.setTimeout(finish, capMs);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearInterval(crawl);
      window.clearTimeout(capTimer);
      window.removeEventListener('stoik:spline-ready', onSplineReady);
    };
  }, []);

  if (removed) return null;

  const filledCount = Math.min(TOTAL_PIXELS, Math.round(progress * TOTAL_PIXELS));

  return (
    <div id="stoik-loader" className={fading ? 'is-out' : ''} aria-hidden="true">
      <div className="stoik-loader-logo">Devesh Tiwari</div>
      <div className="flex flex-col items-center">
        <div className="stoik-loader-pixels">
          {Array.from({ length: TOTAL_PIXELS }).map((_, i) => (
            <div
              key={i}
              className={`stoik-loader-pixel ${i < filledCount ? 'is-filled' : ''}`}
            />
          ))}
        </div>
        <div className="stoik-loader-percent">{Math.round(progress * 100)}%</div>
      </div>
    </div>
  );
}
