'use client';

import { useEffect, useState } from 'react';

const TOTAL_PIXELS = 8;

/**
 * StoikPreloader — Faithful 8-pixel-block preloader from the reference template.
 * Dismisses once the Spline 3D scene signals readiness or after a crisp cap.
 */
export default function StoikPreloader() {
  const [filledCount, setFilledCount] = useState(1);
  const [fading, setFading] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    let dismissed = false;
    let fadeTimer = 0;
    let removeTimer = 0;

    const finish = () => {
      if (dismissed) return;
      dismissed = true;
      setFilledCount(TOTAL_PIXELS);
      fadeTimer = window.setTimeout(() => {
        setFading(true);
        removeTimer = window.setTimeout(() => setRemoved(true), 420);
      }, 100);
    };

    // Crisp stepped pixel progression (max 8 state updates instead of 60fps re-renders)
    const isMobile = window.innerWidth < 810;
    const stepMs = isMobile ? 55 : 105;
    let step = 1;
    const stepper = window.setInterval(() => {
      if (dismissed) {
        window.clearInterval(stepper);
        return;
      }
      step = Math.min(TOTAL_PIXELS - 1, step + 1);
      setFilledCount(step);
    }, stepMs);

    const onSplineReady = () => finish();
    window.addEventListener('stoik:spline-ready', onSplineReady, { once: true });

    // Fast cap so LCP / FCP are never needlessly delayed
    const capTimer = window.setTimeout(finish, isMobile ? 420 : 900);

    return () => {
      window.clearInterval(stepper);
      window.clearTimeout(capTimer);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
      window.removeEventListener('stoik:spline-ready', onSplineReady);
    };
  }, []);

  if (removed) return null;

  const percent = Math.round((filledCount / TOTAL_PIXELS) * 100);

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
        <div className="stoik-loader-percent">{percent}%</div>
      </div>
    </div>
  );
}
