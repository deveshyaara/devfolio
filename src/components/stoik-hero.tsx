'use client';

import { useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const SplineScene = dynamic(() => import('@/components/spline-scene'), {
  ssr: false,
});

type ReelCardItem = {
  id: string;
  title: string;
  tag: string;
  image: string;
};

// Row 1 & Row 2 use EXCLUSIVELY Devesh Tiwari's own project screenshots & bespoke HackTV visuals
const ROW_1_REELS: ReelCardItem[] = [
  { id: 'hacktv-1', title: 'HackTV', tag: 'Smart TV Ecosystem', image: '/hacktv.svg' },
  { id: 'wealthwise', title: 'WealthWise', tag: 'AI Finance Platform', image: '/ai-finance-platform-image.png' },
  { id: 'devfolio', title: 'DevFolio', tag: 'LangGraph + RAG', image: '/portfolio.png' },
  { id: 'hacktv-ctrl', title: 'HackTV Deck', tag: 'React / TS Control', image: '/hacktv-control.svg' },
  { id: 'nlp', title: 'NLP Classifier', tag: 'TensorFlow + FastAPI', image: '/ai-showcase.jpeg' },
];

const ROW_2_REELS: ReelCardItem[] = [
  { id: 'ecommerce', title: 'E-Commerce API', tag: 'Node · Express · Mongo', image: '/project_1.png' },
  { id: 'healthlink', title: 'HealthLink', tag: 'Ethereum Records', image: '/healthlink.png' },
  { id: 'proctored', title: 'ProctorED', tag: 'Online Exam Suite', image: '/proctored.jpeg' },
  { id: 'qrmapper', title: 'QR Mapper', tag: 'Next.js + Supabase', image: '/project-5.png' },
  { id: 'guruos', title: 'GuruOS', tag: 'Rust · Hyprland · Ollama', image: '/guruos.png' },
];

type ProofTickerItem = {
  badge: string;
  handle: string;
  text: string;
  verifiedColor: 'blue' | 'gold';
  href: string;
};

// 100% genuine, verified engineering credentials, technologies, & achievements
const PROOF_TICKER: ProofTickerItem[] = [
  {
    badge: 'HackTV Flagship',
    handle: 'Android TV · webOS · React/TS',
    text: 'Unified Smart TV media ecosystem with real-time WebSocket control center',
    verifiedColor: 'blue',
    href: '#projects',
  },
  {
    badge: 'AlgoUniversity',
    handle: 'SDE / TA Intern · Nov 2026–Present',
    text: 'Mentoring engineers in DSA, System Design, and scalable backend architecture',
    verifiedColor: 'blue',
    href: '#about',
  },
  {
    badge: 'OSCode, SAIT Chapter',
    handle: 'Creative Lead | September 2025 – September 2026',
    text: 'Completed 1-yr tenure: grew attendance +108% (~120 → 250+) and cut admin effort ~80% via QR automation',
    verifiedColor: 'gold',
    href: '#about',
  },
  {
    badge: 'Sambhram Institute of Technology',
    handle: 'B.E. CSE · 2023–2027',
    text: 'CGPA 8.76 / 10 — Strong foundations in OOP, DSA, OS, and System Design',
    verifiedColor: 'blue',
    href: '#about',
  },
  {
    badge: 'WealthWise',
    handle: 'Next.js · Supabase · Gemini',
    text: 'Live AI personal finance platform with Gemini receipt parsing & analytics',
    verifiedColor: 'blue',
    href: 'https://wealthwise.devesh.co.in/',
  },
  {
    badge: 'EY Techathon 6.0',
    handle: 'Ernst & Young',
    text: 'Top 5000 national shortlist with a perfect score in Round 1',
    verifiedColor: 'gold',
    href: '#approach',
  },
  {
    badge: 'VOIS for Tech 2.0',
    handle: 'Edunet Foundation',
    text: 'National Finalist — Top 75 teams nationwide across 12-week mentorship',
    verifiedColor: 'gold',
    href: '#approach',
  },
  {
    badge: 'Google Cloud',
    handle: 'Applied Generative AI & Vertex AI',
    text: 'Certified in LLM application engineering, prompt design & RAG pipelines',
    verifiedColor: 'blue',
    href: '#expertise',
  },
  {
    badge: 'Coincent.ai',
    handle: 'AI Intern · Jun–Aug 2024',
    text: 'Built TensorFlow NLP classifiers and fine-tuned Vision Transformers (+15% over CNN)',
    verifiedColor: 'blue',
    href: '#about',
  },
];

export default function StoikHero() {
  const heroRef = useRef<HTMLElement | null>(null);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full min-h-[100svh] h-[100svh] overflow-hidden flex flex-col justify-between"
      style={{ backgroundColor: '#E1E1E1' }}
    >
      {/* Top-Left Display Headline (mirrors .stoik-hero-display in reference index.html) */}
      <div
        className="relative z-[10] pointer-events-none px-5 sm:px-8 md:px-12"
        style={{ paddingTop: 'clamp(84px, 12vh, 148px)' }}
      >
        <div className="max-w-[min(92vw,560px)]">
          <div className="inline-flex items-center gap-2.5 mb-4 pointer-events-auto">
            <span className="stoik-rot-square" aria-hidden="true" />
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-black/65">
              Devesh Tiwari · Software Engineer
            </span>
          </div>

          <h1
            className="text-[#0A0A0A] font-medium m-0"
            style={{
              fontSize: 'clamp(30px, 3.8vw, 64px)',
              lineHeight: 1.08,
              letterSpacing: '-0.028em',
            }}
          >
            Building systems.
            <br />
            Creating intelligent
            <br />
            experiences.
          </h1>

          <p className="mt-4 max-w-[410px] text-[13.5px] sm:text-[15px] leading-[1.5] text-black/65 font-normal">
            Backend · Full-Stack · AI/ML — Computer Science &amp; Engineering student
            architecting scalable software systems, AI applications, and intelligent developer tools.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2.5 pointer-events-auto">
            <a
              href="#projects"
              className="stoik-chamfer-sm inline-flex items-center gap-2 px-4 py-2.5 bg-[#0A0A0A] text-white text-[12px] font-medium tracking-[0.02em] transition-colors hover:bg-[#0052FF]"
            >
              <span>Explore Work</span>
              <span aria-hidden>↓</span>
            </a>
            <a
              href="https://wealthwise.devesh.co.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="stoik-chamfer-sm inline-flex items-center gap-2 px-4 py-2.5 bg-white/75 backdrop-blur-md border border-black/15 text-[#0A0A0A] text-[12px] font-medium tracking-[0.02em] transition-colors hover:border-[#0052FF] hover:text-[#0052FF]"
            >
              <span>WealthWise Live</span>
              <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* ORIGINAL 3D Spline Neoclassical Marble Philosopher Sculpture (z-index: 8) */}
      <SplineScene heroRef={heroRef} />

      {/* Dual-Row Opposing Breathing Project Reels BEHIND the 3D Sculpture (z-index: 4) */}
      <div className="stoik-carousel-overlay" aria-label="Featured projects preview reel">
        {/* Row 1 — scrolls LEFT */}
        <div className="stoik-carousel-row is-top">
          <div className="stoik-carousel-track is-left">
            {[...ROW_1_REELS, ...ROW_1_REELS].map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="stoik-carousel-card">
                <Image
                  src={item.image}
                  alt={`${item.title} — ${item.tag}`}
                  fill
                  sizes="(max-width: 809px) 220px, 330px"
                  className="object-cover"
                  priority={idx < 4}
                />
                <div
                  className="absolute inset-x-0 bottom-0 px-3 py-2 flex items-center justify-between"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.0) 100%)',
                  }}
                >
                  <span className="text-[11px] font-medium text-white tracking-[-0.01em]">
                    {item.title}
                  </span>
                  <span className="text-[9.5px] font-mono uppercase tracking-[0.06em] text-white/70">
                    {item.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls RIGHT */}
        <div className="stoik-carousel-row is-bottom">
          <div className="stoik-carousel-track is-right">
            {[...ROW_2_REELS, ...ROW_2_REELS].map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="stoik-carousel-card">
                <Image
                  src={item.image}
                  alt={`${item.title} — ${item.tag}`}
                  fill
                  sizes="(max-width: 809px) 220px, 330px"
                  className="object-cover"
                />
                <div
                  className="absolute inset-x-0 bottom-0 px-3 py-2 flex items-center justify-between"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.0) 100%)',
                  }}
                >
                  <span className="text-[11px] font-medium text-white tracking-[-0.01em]">
                    {item.title}
                  </span>
                  <span className="text-[9.5px] font-mono uppercase tracking-[0.06em] text-white/70">
                    {item.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Glassmorphic Engineering & Verified Achievements Ticker (mirrors .tt-ticker) */}
      <div className="relative z-[9] w-full">
        <div className="tt-ticker" role="region" aria-label="Verified engineering highlights">
          <div className="tt-track">
            {[...PROOF_TICKER, ...PROOF_TICKER].map((item, i) => {
              const isExternal = item.href.startsWith('http');
              return (
                <a
                  key={`${item.badge}-${i}`}
                  href={item.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="tt-item"
                >
                  {/* Monogram square icon */}
                  <span className="w-8 h-8 flex items-center justify-center bg-[#0A0A0A] text-white text-[11px] font-mono font-semibold flex-shrink-0">
                    {item.badge.slice(0, 2).toUpperCase()}
                  </span>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <div className="flex items-center gap-1.5 whitespace-nowrap">
                      <span className="text-[11px] font-semibold text-[#0A0A0A] leading-none">
                        {item.badge}
                      </span>
                      <svg
                        viewBox="0 0 22 22"
                        className="w-3.5 h-3.5 flex-shrink-0"
                        style={{
                          fill: item.verifiedColor === 'gold' ? '#D18800' : '#0052FF',
                        }}
                        aria-hidden="true"
                      >
                        <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
                      </svg>
                      <span className="text-[10.5px] font-mono text-black/45 leading-none">
                        {item.handle}
                      </span>
                    </div>
                    <span className="tt-text text-[12.5px] font-medium text-black/80 leading-[1.2] whitespace-nowrap transition-colors">
                      {item.text}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
