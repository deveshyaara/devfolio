'use client';

import { useEffect } from 'react';

interface SectionRevealObserverProps {
  targetId: string;
  readyClass: string;
  delayedClass?: string;
  delayMs?: number;
  threshold?: number;
}

/**
 * Lightweight zero-re-render IntersectionObserver island.
 * Toggles CSS reveal classes directly on a server-rendered section element
 * so static headings, biographies, cards, and SVGs stay React Server Components.
 */
export default function SectionRevealObserver({
  targetId,
  readyClass,
  delayedClass,
  delayMs = 360,
  threshold = 0.14,
}: SectionRevealObserverProps) {
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    let delayTimer = 0;

    const reveal = () => {
      el.classList.add(readyClass);
      if (delayedClass) {
        delayTimer = window.setTimeout(() => {
          el.classList.add(delayedClass);
        }, delayMs);
      }
    };

    if (typeof IntersectionObserver === 'undefined') {
      reveal();
      return () => {
        if (delayTimer) window.clearTimeout(delayTimer);
      };
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal();
            io.disconnect();
            break;
          }
        }
      },
      { threshold }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      if (delayTimer) window.clearTimeout(delayTimer);
    };
  }, [targetId, readyClass, delayedClass, delayMs, threshold]);

  return null;
}
