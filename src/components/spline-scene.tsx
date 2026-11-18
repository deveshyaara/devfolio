'use client';

import { useEffect, useRef, useState } from 'react';

interface SplineSceneProps {
  heroRef: React.RefObject<HTMLElement | null>;
}

/**
 * SplineScene — Integrates the ORIGINAL Yogi Suria / Stoik 3D Spline neoclassical
 * marble philosopher statue (`/assets/scene.splinecode`) via the local patched
 * `@splinetool/viewer` Web Component (`/assets/vendor/spline-viewer.js`) and local
 * Draco WebAssembly decoder (`/assets/vendor/draco/`).
 *
 * Implements window-level cursor forwarding (from `stoik.js`) so the marble bust
 * tracks mouse movement seamlessly across the entire hero viewport.
 */
export default function SplineScene({ heroRef }: SplineSceneProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'fallback'>('loading');

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const enterFallback = () => {
      const frame = window.requestAnimationFrame(() => {
        setStatus('fallback');
        window.dispatchEvent(new Event('stoik:spline-ready'));
      });
      return () => window.cancelAnimationFrame(frame);
    };

    // Match reference mobile optimization: skip heavy 7.6MB Spline scene on <810px
    if (window.innerWidth < 810) {
      return enterFallback();
    }

    // Verify WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl =
        testCanvas.getContext('webgl2') ||
        testCanvas.getContext('webgl') ||
        testCanvas.getContext('experimental-webgl');
      if (!gl) {
        return enterFallback();
      }
    } catch {
      return enterFallback();
    }

    let cancelled = false;
    let viewerEl: HTMLElement | null = null;
    let logoInterval: number | null = null;
    const hostEl = hostRef.current;

    const mountViewer = () => {
      if (cancelled || !hostEl) return;
      hostEl.innerHTML = '';

      const viewer = document.createElement('spline-viewer');
      viewer.className = 'stoik-spline-body';
      viewer.setAttribute('url', '/assets/scene.splinecode');
      viewer.setAttribute('events-target', 'global');
      viewer.setAttribute('loading-anim-type', 'none');
      viewer.style.cssText =
        'position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:auto;';

      const onLoadComplete = () => {
        if (cancelled) return;
        setStatus('ready');
        window.dispatchEvent(new Event('stoik:spline-ready'));
      };

      viewer.addEventListener('load-complete', onLoadComplete);
      hostEl.appendChild(viewer);
      viewerEl = viewer;

      // Remove Spline logo inside shadowRoot once rendered + detect canvas readiness
      let checks = 0;
      logoInterval = window.setInterval(() => {
        checks++;
        const shadow = viewer.shadowRoot;
        if (shadow) {
          const logo = shadow.querySelector('#logo');
          if (logo) logo.remove();
          const canvas = shadow.querySelector('canvas');
          if (canvas && canvas.width > 0 && checks > 4) {
            onLoadComplete();
          }
        }
        if (checks > 40 && logoInterval) {
          window.clearInterval(logoInterval);
          logoInterval = null;
          onLoadComplete();
        }
      }, 150);
    };

    // Load local vendor spline-viewer.js module once
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-stoik-spline="true"]'
    );

    if (typeof customElements !== 'undefined' && customElements.get('spline-viewer')) {
      mountViewer();
    } else if (existingScript) {
      existingScript.addEventListener('load', mountViewer, { once: true });
      customElements.whenDefined('spline-viewer').then(mountViewer).catch(() => {});
    } else {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = '/assets/vendor/spline-viewer.js';
      script.dataset.stoikSpline = 'true';
      script.onload = () => {
        customElements
          .whenDefined('spline-viewer')
          .then(mountViewer)
          .catch(() => {
            if (!cancelled) {
              setStatus('fallback');
              window.dispatchEvent(new Event('stoik:spline-ready'));
            }
          });
      };
      script.onerror = () => {
        if (!cancelled) {
          setStatus('fallback');
          window.dispatchEvent(new Event('stoik:spline-ready'));
        }
      };
      document.head.appendChild(script);
    }

    let heroVisible = true;
    const heroEl = heroRef.current;
    const heroObserver =
      typeof IntersectionObserver !== 'undefined' && heroEl
        ? new IntersectionObserver(
            (entries) => {
              heroVisible = entries[0]?.isIntersecting ?? true;
            },
            { threshold: 0.01 }
          )
        : null;
    if (heroObserver && heroEl) heroObserver.observe(heroEl);

    // Forward window-level mousemove/pointermove inside hero bounds to Spline canvas
    // (mirrors setupGlobalSplineCursorForward in reference stoik.js)
    const forwardCursor = (e: MouseEvent) => {
      if (!viewerEl || !heroVisible) return;
      const hero = heroRef.current;
      if (hero) {
        const hr = hero.getBoundingClientRect();
        if (
          e.clientX < hr.left ||
          e.clientX > hr.right ||
          e.clientY < hr.top ||
          e.clientY > hr.bottom
        ) {
          return;
        }
      }
      const canvas = viewerEl.shadowRoot?.querySelector('canvas');
      const target = canvas || viewerEl;
      if (!target || e.target === target) return;
      try {
        const fwd = new MouseEvent(e.type, {
          bubbles: true,
          cancelable: true,
          clientX: e.clientX,
          clientY: e.clientY,
          screenX: e.screenX,
          screenY: e.screenY,
          movementX: e.movementX,
          movementY: e.movementY,
          button: e.button,
          buttons: e.buttons,
          view: window,
        });
        target.dispatchEvent(fwd);
      } catch {
        // Ignore synthetic event errors
      }
    };

    window.addEventListener('mousemove', forwardCursor, true);
    window.addEventListener('pointermove', forwardCursor, true);

    return () => {
      cancelled = true;
      heroObserver?.disconnect();
      if (logoInterval) window.clearInterval(logoInterval);
      window.removeEventListener('mousemove', forwardCursor, true);
      window.removeEventListener('pointermove', forwardCursor, true);
      if (hostEl) hostEl.innerHTML = '';
    };
  }, [heroRef]);

  if (status === 'fallback') {
    return null;
  }

  return (
    <div
      ref={hostRef}
      aria-label="Interactive 3D neoclassical marble sculpture"
      className="pointer-events-auto absolute top-0 bottom-0 left-1/2 -translate-x-1/2 z-[8]"
      style={{
        width: 'clamp(420px, 78vw, 1080px)',
        maxWidth: '100%',
        height: '100%',
      }}
    />
  );
}
