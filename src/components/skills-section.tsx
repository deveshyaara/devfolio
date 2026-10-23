"use client";

import { skills } from '@/lib/data';
import { useRef, useEffect, useState, useCallback, memo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const TOTAL_FRAMES = 40;
// Images are loaded in batches to avoid saturating the network on initial load.
// The first frame is loaded immediately when the section enters the viewport.
const LOAD_BATCH_SIZE = 8;

// ---------------------------------------------------------------------------
// Intersection-observer–gated image-sequence loader
// ---------------------------------------------------------------------------
function useImageSequence(
  frameCount: number,
  isNearViewport: boolean
) {
  // Sparse array: images[i] is set only once that frame has decoded.
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    Array(frameCount).fill(null)
  );
  const [loadedCount, setLoadedCount] = useState(0);
  const loadingStarted = useRef(false);

  useEffect(() => {
    // Don't start until the section is near the viewport.
    if (!isNearViewport || loadingStarted.current) return;
    loadingStarted.current = true;

    let cancelled = false;

    /**
     * Load a single frame by index.
     * Resolves once the image has finished decoding (or rejects on error).
     */
    const loadFrame = (i: number): Promise<void> => {
      return new Promise((resolve) => {
        // Already loaded?
        if (imagesRef.current[i]) { resolve(); return; }

        const img = new Image();
        const frameNum = String(i + 1).padStart(3, '0');
        img.src = `/sequence2/ezgif-frame-${frameNum}.jpg`;
        img.onload = () => {
          if (cancelled) { resolve(); return; }
          imagesRef.current[i] = img;
          setLoadedCount((c) => c + 1);
          resolve();
        };
        img.onerror = () => resolve(); // tolerate missing frames gracefully
      });
    };

    /**
     * Load frames in sequential batches so the browser doesn't open dozens of
     * connections at once.  First frame is always loaded alone so the canvas
     * can render frame 0 as soon as possible.
     */
    const run = async () => {
      // Frame 0 first — makes the canvas appear quickly.
      await loadFrame(0);
      if (cancelled) return;

      // Remaining frames in batches.
      for (let start = 1; start < frameCount; start += LOAD_BATCH_SIZE) {
        if (cancelled) break;
        const end = Math.min(start + LOAD_BATCH_SIZE, frameCount);
        await Promise.all(
          Array.from({ length: end - start }, (_, k) => loadFrame(start + k))
        );
      }
    };

    run();
    return () => { cancelled = true; };
  }, [isNearViewport, frameCount]);

  return { imagesRef, loadedCount };
}

// ---------------------------------------------------------------------------
// SkillCard — memoised to avoid re-renders when parent scroll state changes
// ---------------------------------------------------------------------------
const SkillCard = memo(function SkillCard({
  skill,
  index,
}: {
  skill: (typeof skills)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.02,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        scale: 1.05,
        y: -6,
        transition: { type: 'spring', stiffness: 400, damping: 25 },
      }}
      className="group cursor-pointer"
    >
      <div className="relative p-5 rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-sm border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] overflow-hidden">
        {/* Animated gradient background on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12" />
        </div>

        <div className="relative flex flex-col items-center gap-3">
          {/* Icon container */}
          <div className="relative p-3.5 rounded-xl bg-white/[0.05] group-hover:bg-cyan-500/10 transition-all duration-300">
            <skill.icon className="w-6 h-6 text-white/70 group-hover:text-cyan-400 transition-colors duration-300" />
            {/* Icon glow */}
            <div className="absolute inset-0 rounded-xl bg-cyan-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Skill name */}
          <span className="text-xs font-medium text-white/60 group-hover:text-white transition-colors duration-300 tracking-wide text-center">
            {skill.name}
          </span>
        </div>
      </div>
    </motion.div>
  );
});

// ---------------------------------------------------------------------------
// Main section
// ---------------------------------------------------------------------------
export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationContainerRef = useRef<HTMLDivElement>(null);

  // Track whether this section is near the viewport so we start loading images
  // only when the user is approaching — not on initial page load.
  // Initialise to true immediately when IntersectionObserver is unavailable
  // (SSR / old browsers) so images start loading without needing setState.
  const [isNearViewport, setIsNearViewport] = useState(
    () => typeof IntersectionObserver === 'undefined'
  );

  // RAF handle for coalescing scroll-driven draws.
  const pendingDraw = useRef<number | null>(null);
  // Cache the last drawn frame index so resize can redraw correctly.
  const lastFrameIndex = useRef(0);
  // Canvas logical size — updated on resize, used by drawFrame.
  const canvasSize = useRef({ w: 0, h: 0 });

  // Start observing ~1.5 screen-heights before the section enters the viewport.
  useEffect(() => {
    // If already true (IO unavailable), nothing to do.
    if (isNearViewport) return;
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: '150% 0px' } // start loading 1.5× viewport height early
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isNearViewport]);

  const { imagesRef, loadedCount } = useImageSequence(TOTAL_FRAMES, isNearViewport);
  const isLoaded = loadedCount > 0; // show canvas as soon as frame 0 is ready

  // Framer Motion scroll tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const frameProgress = useTransform(smoothProgress, [0, 0.45], [0, TOTAL_FRAMES - 1]);

  // 3D transforms for skills grid appearance
  const skillsRotateX = useTransform(smoothProgress, [0.35, 0.6], [20, 0]);
  const skillsScale   = useTransform(smoothProgress, [0.35, 0.6], [0.9, 1]);
  const skillsOpacity = useTransform(smoothProgress, [0.3, 0.45], [0, 1]);
  const skillsY       = useTransform(smoothProgress, [0.35, 0.6], [60, 0]);

  // Canvas visibility transforms
  const canvasOpacity = useTransform(smoothProgress, [0.35, 0.5], [1, 0]);
  const canvasScale   = useTransform(smoothProgress, [0.35, 0.5], [1, 0.95]);
  const canvasY       = useTransform(smoothProgress, [0.35, 0.5], [0, -30]);

  // ---------------------------------------------------------------------------
  // drawFrame — renders a single frame onto the canvas.
  // Canvas dimensions are NOT recomputed here; they are set once in the resize
  // handler to avoid layout reflows on every scroll event.
  // ---------------------------------------------------------------------------
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imagesRef.current[frameIndex];
    if (!canvas || !ctx || !img) return;

    const { w, h } = canvasSize.current;
    ctx.clearRect(0, 0, w, h);

    // Maintain aspect ratio (letter-box / pillar-box)
    const imgAspect    = img.width / img.height;
    const canvasAspect = w / h;
    let drawWidth: number, drawHeight: number, drawX: number, drawY: number;
    if (imgAspect > canvasAspect) {
      drawWidth  = w * 0.95;
      drawHeight = drawWidth / imgAspect;
    } else {
      drawHeight = h * 0.95;
      drawWidth  = drawHeight * imgAspect;
    }
    drawX = (w - drawWidth) / 2;
    drawY = (h - drawHeight) / 2;
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  }, [imagesRef]);

  // ---------------------------------------------------------------------------
  // Resize handler — updates canvas backing-store dimensions once and redraws.
  // ---------------------------------------------------------------------------
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Cap DPR at 2 to avoid huge backing buffers on high-DPI mobile screens.
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w   = canvas.parentElement?.clientWidth  || 800;
    const h   = canvas.parentElement?.clientHeight || 500;

    canvas.width  = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width  = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    canvasSize.current = { w, h };
    drawFrame(lastFrameIndex.current);
  }, [drawFrame]);

  // Register resize listener.
  useEffect(() => {
    handleResize(); // initial sizing
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // ---------------------------------------------------------------------------
  // Scroll-driven canvas updates.
  // Coalesce rapid scroll events into a single RAF tick to avoid drawing
  // multiple frames per browser frame (a common source of jank).
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!isLoaded) return;

    // Draw frame 0 as soon as it is ready.
    drawFrame(0);

    const unsubscribe = frameProgress.on('change', (latest) => {
      // Clamp and floor to a valid frame index.
      const idx = Math.max(0, Math.min(Math.floor(latest), TOTAL_FRAMES - 1));
      lastFrameIndex.current = idx;

      // Skip if this frame image hasn't loaded yet.
      if (!imagesRef.current[idx]) return;

      // Coalesce into a single RAF — cancel any previously scheduled draw.
      if (pendingDraw.current !== null) {
        cancelAnimationFrame(pendingDraw.current);
      }
      pendingDraw.current = requestAnimationFrame(() => {
        pendingDraw.current = null;
        drawFrame(idx);
      });
    });

    return () => {
      unsubscribe();
      if (pendingDraw.current !== null) {
        cancelAnimationFrame(pendingDraw.current);
        pendingDraw.current = null;
      }
    };
  }, [isLoaded, frameProgress, drawFrame, imagesRef]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full"
      style={{ backgroundColor: '#050505', height: '220vh' }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">

        {/* Section header */}
        <div className="flex-shrink-0 pt-8 pb-4 px-4 text-center z-30 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              Skills &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Technologies
              </span>
            </h2>
            <p className="mt-3 text-white/40 text-sm md:text-base max-w-xl mx-auto">
              The tools and technologies I use to bring ideas to life
            </p>
          </motion.div>
        </div>

        {/* Animation area */}
        <div ref={animationContainerRef} className="flex-1 relative overflow-hidden">
          {/* Ambient blurs — subtle, no blur-[100px] which is expensive */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl" />
          </div>

          {/* Canvas — frame-sequence animation */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center px-2"
            style={{ opacity: canvasOpacity, scale: canvasScale, y: canvasY }}
          >
            <div className="relative w-full h-full max-w-6xl mx-auto flex items-center justify-center">
              <canvas
                ref={canvasRef}
                className="w-full h-auto max-h-[85vh] object-contain"
              />

              {/* Spinner shown until frame 0 is decoded */}
              {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-2 border-white/20 border-t-cyan-400 rounded-full animate-spin" />
                    <span className="text-white/40 text-xs tracking-wider">Loading…</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Skills grid */}
          <motion.div
            className="absolute inset-0 flex items-start justify-center pt-4 px-4 md:px-8 overflow-y-auto scrollbar-hide"
            style={{
              opacity: skillsOpacity,
              y: skillsY,
              perspective: 1000,
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <motion.div
              className="w-full max-w-5xl pb-20"
              style={{
                rotateX: skillsRotateX,
                scale: skillsScale,
                transformStyle: 'preserve-3d',
                transformOrigin: 'center top',
              }}
            >
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 md:gap-4">
                {skills.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-20"
          style={{ opacity: useTransform(smoothProgress, [0, 0.15], [1, 0]) }}
        >
          <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <motion.div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5">
            <motion.div
              className="w-1 h-1 bg-cyan-400/80 rounded-full"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="absolute right-4 top-1/2 -translate-y-1/2 w-0.5 h-20 bg-white/10 rounded-full overflow-hidden z-20"
          style={{ opacity: useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]) }}
        >
          <motion.div
            className="w-full bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full"
            style={{ height: useTransform(smoothProgress, [0, 1], ['0%', '100%']) }}
          />
        </motion.div>
      </div>
    </section>
  );
}
