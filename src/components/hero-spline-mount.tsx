'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const SplineScene = dynamic(() => import('@/components/spline-scene'), {
  ssr: false,
});

/**
 * Minimal client boundary that binds the lazy-loaded 3D Spline viewer
 * to the server-rendered `#hero` section element.
 */
export default function HeroSplineMount() {
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    heroRef.current = document.getElementById('hero');
  }, []);

  return <SplineScene heroRef={heroRef} />;
}
