'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';

type FeaturedCaseStudy = {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  tags: string[];
  slides: { src: string; caption: string }[];
  liveUrl?: string;
  repoUrl: string;
  flagship?: boolean;
};

// 100% Devesh Tiwari's real verified projects + own media
const FEATURED_CASES: FeaturedCaseStudy[] = [
  {
    id: 'hacktv',
    title: 'HackTV — Smart TV Ecosystem spanning Android TV, LG webOS & React Control Center',
    subtitle: 'Flagship Systems Project',
    desc: 'Cross-platform Smart TV media ecosystem uniting a Jetpack Compose + ExoPlayer Android TV app, an LG webOS client via Luna APIs, and a real-time React/TypeScript Control Center synchronized over duplex WebSockets and REST APIs.',
    tags: ['FLAGSHIP', 'ANDROID TV', 'LG WEBOS', 'REACT / TS', 'WEBSOCKETS'],
    slides: [
      { src: '/hacktv.svg', caption: 'HackTV Smart TV Interface & Ecosystem Overview' },
      { src: '/hacktv-control.svg', caption: 'React & TypeScript Real-Time WebSocket Control Center' },
      { src: '/hacktv-architecture.svg', caption: 'Multi-OS Smart TV System Topology' },
    ],
    repoUrl: 'https://github.com/deveshyaara',
    flagship: true,
  },
  {
    id: 'wealthwise',
    title: 'WealthWise — AI Personal Finance Platform powered by Google Gemini',
    subtitle: 'Full-Stack AI Product · Live',
    desc: 'Full-stack financial platform built with Next.js, TypeScript, Supabase, Clerk, and Inngest. Features an automated Gemini Vision receipt scanner, multi-account tracking, recurring transaction jobs, anomaly budget alerts, and interactive Recharts analytics.',
    tags: ['NEXT.JS', 'SUPABASE', 'GOOGLE GEMINI', 'CLERK', 'INNGEST'],
    slides: [
      { src: '/ai-finance-platform-image.png', caption: 'WealthWise Live Financial Analytics Dashboard' },
      { src: '/ai-finance-platform-image.png', caption: 'Gemini Receipt Scanning & Budget Automation' },
    ],
    liveUrl: 'https://wealthwise.devesh.co.in/',
    repoUrl: 'https://github.com/deveshyaara/WealthWise',
  },
  {
    id: 'devfolio',
    title: 'DevFolio — Portfolio Platform with Autonomous LangGraph + FAISS RAG Agent',
    subtitle: 'Full-Stack & Generative AI · Live',
    desc: 'Next.js and TypeScript developer portfolio featuring an embedded autonomous AI assistant orchestrated with LangGraph and a FAISS-backed RAG pipeline that indexes GitHub repositories for accurate real-time Q&A.',
    tags: ['NEXT.JS', 'TYPESCRIPT', 'LANGGRAPH', 'FAISS RAG', 'GEMINI'],
    slides: [
      { src: '/portfolio.png', caption: 'DevFolio Interactive Interface & AI Assistant' },
      { src: '/portfolio.png', caption: 'LangGraph Multi-Step Reasoning & RAG Context' },
    ],
    liveUrl: 'https://devfolio-taupe.vercel.app/',
    repoUrl: 'https://github.com/deveshyaara/devfolio',
  },
  {
    id: 'ecommerce-api',
    title: 'E-Commerce Backend API — Scalable RESTful Commerce Engine',
    subtitle: 'Backend Engineering · Documented API',
    desc: 'Production-structured RESTful backend built with Node.js, Express, and MongoDB featuring JWT authentication, role-based access control, inventory & category CRUD, transactional cart mutations, and complete Postman API documentation.',
    tags: ['NODE.JS', 'EXPRESS', 'MONGODB', 'JWT / RBAC', 'REST API'],
    slides: [
      { src: '/project_1.png', caption: 'E-Commerce Backend Architecture & Postman Endpoints' },
      { src: '/project_1.png', caption: 'JWT Auth, RBAC & MongoDB Inventory Schemas' },
    ],
    liveUrl: 'https://documenter.getpostman.com/view/34764585/2sA3JQ3yun',
    repoUrl: 'https://github.com/deveshyaara/E-Commerce-Backend',
  },
];

type MoreProject = {
  id: string;
  title: string;
  tag: string;
  desc: string;
  image: string;
  liveUrl?: string;
  repoUrl?: string;
};

const MORE_PROJECTS: MoreProject[] = [
  {
    id: 'qrmapper',
    title: 'QR Mapper',
    tag: 'Next.js · Supabase',
    desc: 'Event check-in badge-to-ticket QR mapping engine built during the 2025–2026 OSCode tenure that reduced administrative effort by ~80%.',
    image: '/project-5.png',
    liveUrl: 'https://qr-mapper-mu.vercel.app/',
    repoUrl: 'https://github.com/deveshyaara/QR-Mapper',
  },
  {
    id: 'nlp',
    title: 'NLP Text Classifier',
    tag: 'TensorFlow · FastAPI',
    desc: 'Live binary sentiment classifier trained on IMDb reviews served via FastAPI + Next.js frontend.',
    image: '/ai-showcase.jpeg',
    liveUrl: 'https://textclassifier.devesh.co.in/',
    repoUrl: 'https://github.com/deveshyaara/Text-Classifier/tree/main/nlp-text-classifier',
  },
  {
    id: 'healthlink',
    title: 'HealthLink',
    tag: 'Ethereum · Web3',
    desc: 'Decentralized medical records system on Ethereum providing patient-owned access control and audit trails.',
    image: '/healthlink.png',
    liveUrl: 'https://healthlink.devesh.co.in/',
    repoUrl: 'https://github.com/deveshyaara/Healthlink_RPC',
  },
  {
    id: 'proctored',
    title: 'ProctorED',
    tag: 'Full-Stack · EdTech',
    desc: 'Online examination platform with unique test-code distribution, result analytics, and proctoring workflows.',
    image: '/proctored.jpeg',
    liveUrl: 'https://proctored.devesh.co.in/',
    repoUrl: 'https://github.com/deveshyaara/proctor-ed',
  },
  {
    id: 'guruos',
    title: 'GuruOS',
    tag: 'Rust · GTK4 · Ollama',
    desc: 'Custom Arch Linux + Hyprland desktop integrating a local Qwen2.5 LLM assistant via Ollama.',
    image: '/guruos.png',
  },
];

function PeekCarousel({
  project,
  onCursorState,
}: {
  project: FeaturedCaseStudy;
  onCursorState: (visible: boolean, dragging?: boolean, clientX?: number, clientY?: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const activeIdxRef = useRef(0);

  const slideCount = project.slides.length;

  // All high-frequency drag + spring physics live strictly in refs (0 React re-renders per frame)
  const physicsRef = useRef({
    dragging: false,
    pointerId: -1,
    startPointerX: 0,
    startOffsetX: 0,
    posX: 0,
    targetX: 0,
    velX: 0,
    minX: 0,
    maxX: 0,
    slideWidth: 1,
    slideOffsets: [0] as number[],
    samples: [] as { x: number; t: number }[],
    rafId: 0,
    lastFrameTime: 0,
    wheelAccum: 0,
    wheelResetTimer: 0,
  });

  const applyTransform = useCallback((x: number) => {
    const track = trackRef.current;
    if (track) {
      track.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
    }
  }, []);

  const stopLoop = useCallback(() => {
    const p = physicsRef.current;
    if (p.rafId) {
      cancelAnimationFrame(p.rafId);
      p.rafId = 0;
    }
  }, []);

  const startSpring = useCallback(() => {
    const p = physicsRef.current;
    if (p.rafId) return;
    p.lastFrameTime = performance.now();

    const step = (now: number) => {
      if (p.dragging) {
        p.rafId = 0;
        return;
      }
      const dt = Math.min(0.05, Math.max(0.001, (now - p.lastFrameTime) / 1000));
      p.lastFrameTime = now;

      // Critically-damped spring: smooth, responsive, uninterrupted deceleration into target slide
      const stiffness = 175;
      const damping = 24;
      const displacement = p.targetX - p.posX;
      const accel = stiffness * displacement - damping * p.velX;
      p.velX += accel * dt;
      p.posX += p.velX * dt;

      if (Math.abs(p.targetX - p.posX) < 0.3 && Math.abs(p.velX) < 2) {
        p.posX = p.targetX;
        p.velX = 0;
        applyTransform(p.posX);
        p.rafId = 0;
        return;
      }

      applyTransform(p.posX);
      p.rafId = requestAnimationFrame(step);
    };

    p.rafId = requestAnimationFrame(step);
  }, [applyTransform]);

  const measureGeometry = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const w = el.offsetWidth;
    if (w <= 0) return;

    const isMobile = window.innerWidth <= 809;
    const peek = isMobile ? 1 : 0.7;
    const sW = w * peek;
    const trackW = slideCount * sW;
    const min = trackW <= w ? 0 : -(trackW - w);
    const max = 0;

    const offsets: number[] = [];
    for (let i = 0; i < slideCount; i++) {
      const centered = trackW <= w ? 0 : w * 0.5 - (i + 0.5) * sW;
      offsets.push(Math.max(min, Math.min(max, centered)));
    }

    const p = physicsRef.current;
    p.slideOffsets = offsets;
    p.slideWidth = Math.max(1, sW);
    p.minX = min;
    p.maxX = max;

    if (!p.dragging && !p.rafId) {
      const snapped = offsets[activeIdxRef.current] ?? 0;
      p.posX = snapped;
      p.targetX = snapped;
      p.velX = 0;
      applyTransform(snapped);
    }
  }, [applyTransform, slideCount]);

  useEffect(() => {
    const p = physicsRef.current;
    measureGeometry();
    const el = containerRef.current;
    const ro =
      typeof ResizeObserver !== 'undefined' && el
        ? new ResizeObserver(() => measureGeometry())
        : null;
    if (ro && el) ro.observe(el);
    window.addEventListener('resize', measureGeometry, { passive: true });
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', measureGeometry);
      if (p.wheelResetTimer) window.clearTimeout(p.wheelResetTimer);
      stopLoop();
    };
  }, [measureGeometry, stopLoop]);

  const snapTo = useCallback(
    (newIdx: number, initialVel = 0) => {
      const clamped = Math.max(0, Math.min(slideCount - 1, newIdx));
      if (activeIdxRef.current !== clamped) {
        activeIdxRef.current = clamped;
        setActiveIdx(clamped);
      }
      const p = physicsRef.current;
      p.targetX = p.slideOffsets[clamped] ?? 0;
      if (initialVel !== 0) {
        p.velX = initialVel;
      }
      startSpring();
    },
    [slideCount, startSpring]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    if ((e.target as HTMLElement).closest('a, button')) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    const p = physicsRef.current;
    stopLoop();
    p.dragging = true;
    p.pointerId = e.pointerId;
    p.startPointerX = e.clientX;
    p.startOffsetX = p.posX;
    p.targetX = p.posX;
    p.velX = 0;
    p.samples = [{ x: e.clientX, t: performance.now() }];
    onCursorState(true, true, e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const p = physicsRef.current;
    if (!p.dragging) {
      const overInteractive = Boolean((e.target as HTMLElement).closest('a, button'));
      onCursorState(!overInteractive, false, e.clientX, e.clientY);
      return;
    }

    const now = performance.now();
    p.samples.push({ x: e.clientX, t: now });
    // Keep last ~90ms of pointer samples for clean, jitter-free flick velocity
    while (p.samples.length > 2 && now - p.samples[0].t > 90) {
      p.samples.shift();
    }

    let rawX = p.startOffsetX + (e.clientX - p.startPointerX);
    if (rawX > p.maxX) rawX = p.maxX + (rawX - p.maxX) * 0.28;
    if (rawX < p.minX) rawX = p.minX + (rawX - p.minX) * 0.28;

    // 1:1 instant zero-lag GPU transform while actively dragging
    p.posX = rawX;
    p.targetX = rawX;
    applyTransform(rawX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const p = physicsRef.current;
    if (!p.dragging) return;
    p.dragging = false;

    try {
      if (p.pointerId !== -1 && e.currentTarget.hasPointerCapture(p.pointerId)) {
        e.currentTarget.releasePointerCapture(p.pointerId);
      }
    } catch {
      // ignore
    }
    p.pointerId = -1;

    const totalDx = e.clientX - p.startPointerX;
    const now = performance.now();

    // Compute clean average velocity across recent 90ms sample window
    let releaseVel = 0;
    if (p.samples.length >= 2) {
      const first = p.samples[0];
      const last = p.samples[p.samples.length - 1];
      const spanMs = last.t - first.t;
      const idleMs = now - last.t;
      if (spanMs > 4 && idleMs < 110) {
        releaseVel = ((last.x - first.x) / spanMs) * 1000;
        releaseVel = Math.max(-2400, Math.min(2400, releaseVel));
      }
    }

    let targetIdx = activeIdxRef.current;

    if (Math.abs(totalDx) < 6 && slideCount > 1) {
      // Quick click on left/right peeking edge smoothly navigates to adjacent slide
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const relX = (e.clientX - rect.left) / rect.width;
        if (relX > 0.68 && targetIdx < slideCount - 1) targetIdx += 1;
        else if (relX < 0.32 && targetIdx > 0) targetIdx -= 1;
      }
    } else {
      // Advance/rewind cleanly on modest drag (>16% of slide) OR brisk flick (>240px/s)
      const dragThreshold = p.slideWidth * 0.16;
      if (totalDx < -dragThreshold || releaseVel < -240) {
        targetIdx = Math.min(slideCount - 1, activeIdxRef.current + 1);
      } else if (totalDx > dragThreshold || releaseVel > 240) {
        targetIdx = Math.max(0, activeIdxRef.current - 1);
      } else {
        // Fallback: closest slide to momentum-projected position
        const projected = p.posX + releaseVel * 0.14;
        let bestDist = Infinity;
        for (let i = 0; i < p.slideOffsets.length; i++) {
          const d = Math.abs(p.slideOffsets[i] - projected);
          if (d < bestDist) {
            bestDist = d;
            targetIdx = i;
          }
        }
      }
    }

    const overInteractive = Boolean((e.target as HTMLElement).closest('a, button'));
    onCursorState(!overInteractive, false, e.clientX, e.clientY);
    snapTo(targetIdx, releaseVel);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (slideCount <= 1) return;
    // Support horizontal trackpad swipe without hijacking vertical page scroll
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) || Math.abs(e.deltaX) < 6) return;
    const p = physicsRef.current;
    p.wheelAccum += e.deltaX;
    if (p.wheelResetTimer) window.clearTimeout(p.wheelResetTimer);
    p.wheelResetTimer = window.setTimeout(() => {
      p.wheelAccum = 0;
    }, 180);

    if (p.wheelAccum > 55) {
      p.wheelAccum = 0;
      snapTo(activeIdxRef.current + 1);
    } else if (p.wheelAccum < -55) {
      p.wheelAccum = 0;
      snapTo(activeIdxRef.current - 1);
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
      onMouseEnter={(e) => onCursorState(true, false, e.clientX, e.clientY)}
      onMouseLeave={() => {
        if (!physicsRef.current.dragging) {
          onCursorState(false, false);
        }
      }}
      style={{ contain: 'layout style paint' }}
      className="relative w-full h-full overflow-hidden bg-[#0A0A0C] select-none touch-pan-y md:cursor-none"
    >
      {/* Track (1:1 GPU transform while dragging + critically-damped rAF spring on release) */}
      <div
        ref={trackRef}
        className="flex h-full will-change-transform"
        style={{ transform: 'translate3d(0px, 0, 0)' }}
      >
        {project.slides.map((slide, i) => (
          <div
            key={`${project.id}-slide-${i}`}
            className={`stoik-pcar-slide ${i === activeIdx ? 'is-active' : ''}`}
          >
            <Image
              src={slide.src}
              alt={slide.caption}
              fill
              sizes="(max-width: 809px) 100vw, 65vw"
              className="object-cover object-center"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Top-left slide counter + flagship badge */}
      <div className="absolute top-4 left-4 z-[6] flex items-center gap-2 pointer-events-none">
        {project.flagship && <span className="tag-blue">Flagship</span>}
        <span className="px-2.5 py-1 bg-black/85 text-white font-mono text-[10px] tracking-[0.1em] uppercase">
          0{activeIdx + 1} / 0{slideCount}
        </span>
      </div>

      {/* Prev / Next buttons for keyboard, mobile & quick navigation */}
      {slideCount > 1 && (
        <div className="absolute top-4 right-4 z-[7] flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => snapTo(activeIdx - 1)}
            disabled={activeIdx === 0}
            aria-label="Previous slide"
            className="w-8 h-8 flex items-center justify-center bg-white/90 text-[#0A0A0A] disabled:opacity-30 hover:bg-[#0052FF] hover:text-white transition-colors cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => snapTo(activeIdx + 1)}
            disabled={activeIdx === slideCount - 1}
            aria-label="Next slide"
            className="w-8 h-8 flex items-center justify-center bg-white/90 text-[#0A0A0A] disabled:opacity-30 hover:bg-[#0052FF] hover:text-white transition-colors cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Dark Bottom Info Panel (solid near-opaque surface avoids expensive per-frame GPU blur over sliding track) */}
      <div
        className="absolute inset-x-0 bottom-0 z-[6] grid md:grid-cols-[1.05fr_1.45fr] gap-3 md:gap-8 p-4 sm:p-5 md:px-7 md:py-5 text-white"
        style={{
          background: 'rgba(10, 10, 10, 0.94)',
        }}
      >
        <div className="flex flex-col gap-2.5">
          <h3 className="text-[15px] sm:text-[17px] md:text-[19px] font-semibold tracking-[-0.015em] leading-[1.25] m-0">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-[10px] font-mono font-semibold tracking-[0.06em] uppercase bg-white/10 text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3">
          <p className="text-[12.5px] sm:text-[13.5px] leading-[1.52] text-white/72 m-0 line-clamp-3 md:line-clamp-none">
            {project.desc}
          </p>
          <div className="flex flex-wrap items-center gap-2.5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="stoik-chamfer-sm inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0052FF] hover:bg-[#1B4DFF] text-white text-[11.5px] font-medium transition-colors cursor-pointer"
              >
                <ExternalLink size={12} />
                <span>Live Demo</span>
              </a>
            )}
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="stoik-chamfer-sm inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/12 hover:bg-white hover:text-[#0A0A0A] text-white text-[11.5px] font-medium transition-colors cursor-pointer"
            >
              <Github size={12} />
              <span>Source Code</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StoikProjects() {
  const stackWrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dragCursorRef = useRef<HTMLDivElement>(null);

  // Zero-React-re-render cursor state: position & classes mutate DOM directly on rAF
  const cursorRef = useRef({
    x: -100,
    y: -100,
    visible: false,
    dragging: false,
    rafId: 0,
  });

  const flushCursor = useCallback(() => {
    const c = cursorRef.current;
    c.rafId = 0;
    const el = dragCursorRef.current;
    if (el) {
      el.style.transform = `translate3d(${c.x - 36}px, ${c.y - 36}px, 0)`;
    }
  }, []);

  const scheduleCursor = useCallback(() => {
    const c = cursorRef.current;
    if (!c.rafId) {
      c.rafId = requestAnimationFrame(flushCursor);
    }
  }, [flushCursor]);

  const handleCursorState = useCallback(
    (visible: boolean, dragging = false, clientX?: number, clientY?: number) => {
      const c = cursorRef.current;
      const el = dragCursorRef.current;

      if (typeof clientX === 'number' && typeof clientY === 'number') {
        c.x = clientX;
        c.y = clientY;
        if (visible && el && !c.visible) {
          // Snap position immediately before fading in so cursor never flies across screen
          el.style.transform = `translate3d(${c.x - 36}px, ${c.y - 36}px, 0)`;
        }
      }

      if (c.visible !== visible) {
        c.visible = visible;
        el?.classList.toggle('is-on', visible);
      }
      if (c.dragging !== dragging) {
        c.dragging = dragging;
        el?.classList.toggle('is-dragging', dragging);
      }

      if (visible) {
        scheduleCursor();
      }
    },
    [scheduleCursor]
  );

  // Scroll-driven sticky 3D-tilt card animation batched via rAF (exact port of setupProjectCardTilt)
  useEffect(() => {
    let scrollRaf = 0;

    const updateTilt = () => {
      scrollRaf = 0;
      const wrapper = stackWrapperRef.current;
      if (!wrapper) return;
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length < 2) return;

      const isDesktop = window.innerWidth >= 1024;
      if (!isDesktop) {
        cards.forEach((c) => {
          c.style.transform = '';
        });
        return;
      }

      const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
      const wrapperH = wrapper.offsetHeight;
      const cardH = cards[0].offsetHeight || window.innerHeight * 0.72;
      const scrollPerCard = Math.max(1, (wrapperH - cardH) / Math.max(1, cards.length - 1));
      const scrolledIntoWrapper = window.scrollY - wrapperTop;

      for (let i = 0; i < cards.length; i++) {
        if (i < cards.length - 1) {
          const slotStart = i * scrollPerCard;
          const rawT = (scrolledIntoWrapper - slotStart) / scrollPerCard;
          const t = Math.max(0, Math.min(1, rawT));
          const ease = 1 - Math.pow(1 - t, 2.2);
          const rotX = ease * 42;
          const scaleKick = 0.25;
          const scaleT = Math.max(0, (t - scaleKick) / (1 - scaleKick));
          const scaleEase = scaleT * scaleT * scaleT;
          const scale = 1 - scaleEase * 0.28;
          cards[i].style.transform = `perspective(1100px) rotateX(${rotX.toFixed(
            2
          )}deg) scale(${scale.toFixed(3)})`;
        } else {
          cards[i].style.transform = '';
        }
      }
    };

    const scheduleTilt = () => {
      if (!scrollRaf) {
        scrollRaf = requestAnimationFrame(updateTilt);
      }
    };

    window.addEventListener('scroll', scheduleTilt, { passive: true });
    window.addEventListener('resize', scheduleTilt, { passive: true });
    updateTilt();
    return () => {
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      window.removeEventListener('scroll', scheduleTilt);
      window.removeEventListener('resize', scheduleTilt);
    };
  }, []);

  // Zero-lag rAF-batched pointer tracking for DRAG cursor (only active while hovering a card)
  useEffect(() => {
    const c = cursorRef.current;
    const move = (e: PointerEvent) => {
      c.x = e.clientX;
      c.y = e.clientY;
      if (c.visible) {
        scheduleCursor();
      }
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      if (c.rafId) {
        cancelAnimationFrame(c.rafId);
        c.rafId = 0;
      }
    };
  }, [scheduleCursor]);

  return (
    <section id="projects" className="w-full py-20 md:py-32" style={{ backgroundColor: '#E5E5E5' }}>
      {/* Circular Electric-Blue DRAG Cursor (zero React re-renders, GPU-composited inner scale) */}
      <div ref={dragCursorRef} className="stoik-drag-cursor" aria-hidden="true">
        <div className="stoik-drag-cursor-inner">
          <svg className="w-2.5 h-2.5 block flex-shrink-0" viewBox="0 0 14 14" aria-hidden="true">
            <path
              d="M9 3 L5 7 L9 11"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="leading-none">DRAG</span>
          <svg className="w-2.5 h-2.5 block flex-shrink-0" viewBox="0 0 14 14" aria-hidden="true">
            <path
              d="M5 3 L9 7 L5 11"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Giant Section Display Heading (mirrors "Work" in reference) */}
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12 mb-12 md:mb-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="stoik-rot-square" aria-hidden="true" />
          <span className="text-[13px] font-medium text-[#0A0A0A]">Selected Work</span>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2
            className="font-medium text-[#0A0A0A] m-0"
            style={{
              fontSize: 'clamp(52px, 9.5vw, 150px)',
              lineHeight: 0.92,
              letterSpacing: '-0.038em',
            }}
          >
            Work
          </h2>
          <a
            href="https://github.com/deveshyaara"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[12px] uppercase tracking-[0.08em] text-black/65 hover:text-[#0052FF] transition-colors pb-2"
          >
            All repositories on GitHub ↗
          </a>
        </div>
      </div>

      {/* Sticky 3D-Tilt Stack of 4 Flagship Case Studies */}
      <div
        ref={stackWrapperRef}
        className="w-full px-4 sm:px-6 md:px-10 space-y-8 lg:space-y-16"
        style={{ overflow: 'visible' }}
      >
        {FEATURED_CASES.map((project, idx) => (
          <div
            key={project.id}
            ref={(el) => {
              cardRefs.current[idx] = el;
            }}
            className="w-full max-w-[1260px] mx-auto lg:sticky will-change-transform"
            style={{
              top: '14vh',
              height: 'clamp(460px, 72vh, 760px)',
              transformOrigin: 'center 30%',
              zIndex: idx + 1,
            }}
          >
            <div className="w-full h-full overflow-hidden border border-black/15 shadow-[0_24px_64px_rgba(0,0,0,0.12)] stoik-chamfer-lg">
              <PeekCarousel project={project} onCursorState={handleCursorState} />
            </div>
          </div>
        ))}
      </div>

      {/* Additional Shipped Systems Grid (HealthLink, QR Mapper, NLP, ProctorED, GuruOS) */}
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12 mt-24 md:mt-36">
        <div className="flex items-center justify-between border-b border-black/15 pb-4 mb-10">
          <div className="flex items-center gap-2.5">
            <span
              className="stoik-rot-square"
              style={{ '--stoik-rot-delay': '0.8s' } as React.CSSProperties}
              aria-hidden="true"
            />
            <span className="text-label text-[#0A0A0A]">More Shipped Engineering Systems</span>
          </div>
          <span className="font-mono text-[11px] text-black/45">05 PROJECTS</span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MORE_PROJECTS.map((item) => (
            <article
              key={item.id}
              className="group stoik-chamfer bg-white border border-black/10 flex flex-col overflow-hidden transition-colors hover:border-[#0052FF]/50"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#141416]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5 flex flex-col flex-1 gap-2.5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-[17px] font-medium tracking-[-0.02em] text-[#0A0A0A] m-0">
                    {item.title}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#0052FF]">
                    {item.tag}
                  </span>
                </div>
                <p className="text-[13px] leading-[1.52] text-black/65 flex-1 m-0">
                  {item.desc}
                </p>
                {(item.liveUrl || item.repoUrl) && (
                  <div className="flex items-center gap-4 pt-3 border-t border-black/10 text-[12px] font-mono">
                    {item.liveUrl && (
                      <a
                        href={item.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0A0A0A] hover:text-[#0052FF] transition-colors"
                      >
                        Live ↗
                      </a>
                    )}
                    {item.repoUrl && (
                      <a
                        href={item.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black/55 hover:text-[#0052FF] transition-colors"
                      >
                        GitHub ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
