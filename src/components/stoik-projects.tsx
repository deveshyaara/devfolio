'use client';

import { useEffect, useRef, useState } from 'react';
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
  onCursorActive,
}: {
  project: FeaturedCaseStudy;
  onCursorActive: (active: boolean) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [animate, setAnimate] = useState(true);

  const dragState = useRef({
    dragging: false,
    startX: 0,
    currentX: 0,
  });

  const slideCount = project.slides.length;

  const computeTranslateForIdx = (idx: number) => {
    const el = containerRef.current;
    if (!el) return 0;
    const w = el.offsetWidth;
    const isMobile = window.innerWidth <= 809;
    const peek = isMobile ? 1 : 0.7;
    const sW = w * peek;
    const trackW = slideCount * sW;
    if (trackW <= w) return 0;
    const centered = w * 0.5 - (idx + 0.5) * sW;
    const min = -(trackW - w);
    const max = 0;
    return Math.max(min, Math.min(max, centered));
  };

  const snapTo = (newIdx: number) => {
    const clamped = Math.max(0, Math.min(slideCount - 1, newIdx));
    setActiveIdx(clamped);
    const nextX = computeTranslateForIdx(clamped);
    dragState.current.currentX = nextX;
    setAnimate(true);
    setTranslateX(nextX);
  };

  useEffect(() => {
    const onResize = () => {
      const nextX = computeTranslateForIdx(activeIdx);
      dragState.current.currentX = nextX;
      setAnimate(false);
      setTranslateX(nextX);
    };
    onResize();
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx, slideCount]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('a, button')) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    dragState.current.dragging = true;
    dragState.current.startX = e.clientX - dragState.current.currentX;
    setAnimate(false);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.dragging) return;
    let x = e.clientX - dragState.current.startX;
    const min = computeTranslateForIdx(slideCount - 1);
    const max = computeTranslateForIdx(0);
    if (x > max) x = max + (x - max) * 0.35;
    if (x < min) x = min + (x - min) * 0.35;
    dragState.current.currentX = x;
    setTranslateX(x);
  };

  const handlePointerUp = () => {
    if (!dragState.current.dragging) return;
    dragState.current.dragging = false;
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i < slideCount; i++) {
      const d = Math.abs(computeTranslateForIdx(i) - dragState.current.currentX);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    }
    snapTo(best);
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => onCursorActive(true)}
      onMouseLeave={() => onCursorActive(false)}
      className="relative w-full h-full overflow-hidden bg-[#0A0A0C] select-none touch-pan-y md:cursor-none"
    >
      {/* Track */}
      <div
        ref={trackRef}
        className="flex h-full will-change-transform"
        style={{
          transform: `translate3d(${translateX}px, 0, 0)`,
          transition: animate ? 'transform 360ms cubic-bezier(0.2, 0.7, 0.2, 1)' : 'none',
        }}
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
        <span className="px-2.5 py-1 bg-black/75 backdrop-blur-md text-white font-mono text-[10px] tracking-[0.1em] uppercase">
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

      {/* Dark Translucent Bottom Info Panel (mirrors .stoik-project-info from reference index.html) */}
      <div
        className="absolute inset-x-0 bottom-0 z-[6] grid md:grid-cols-[1.05fr_1.45fr] gap-3 md:gap-8 p-4 sm:p-5 md:px-7 md:py-5 text-white"
        style={{
          background: 'rgba(10, 10, 10, 0.92)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
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
  const [cursorOn, setCursorOn] = useState(false);

  // Scroll-driven sticky 3D-tilt card animation (exact port of setupProjectCardTilt from stoik.js)
  useEffect(() => {
    const onScroll = () => {
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

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Follow pointer for circular electric-blue DRAG cursor
  useEffect(() => {
    const move = (e: PointerEvent) => {
      const el = dragCursorRef.current;
      if (!el) return;
      el.style.transform = `translate3d(${e.clientX - 36}px, ${e.clientY - 36}px, 0)`;
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return (
    <section id="projects" className="w-full py-20 md:py-32" style={{ backgroundColor: '#E5E5E5' }}>
      {/* Circular Electric-Blue DRAG Cursor (exact reference .stoik-drag-cursor) */}
      <div
        ref={dragCursorRef}
        className={`stoik-drag-cursor ${cursorOn ? 'is-on' : ''}`}
        aria-hidden="true"
      >
        <svg className="w-3 h-3 block flex-shrink-0" viewBox="0 0 14 14" aria-hidden="true">
          <path
            d="M9 3 L5 7 L9 11"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="leading-none">DRAG</span>
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
              <PeekCarousel project={project} onCursorActive={setCursorOn} />
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
