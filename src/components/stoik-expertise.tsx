'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';

type ExpertiseRow = {
  title: string;
  summary: string;
  stack: string[];
  image: string;
};

// 8 engineering disciplines paired exclusively with Devesh's own project visuals
const EXPERTISE_ROWS: ExpertiseRow[] = [
  {
    title: 'Backend Architecture',
    summary: 'RESTful APIs, microservices, JWT/RBAC auth, Redis rate limiting & high-throughput servers.',
    stack: ['Java', 'Spring Boot', 'Node.js', 'Express', 'Python'],
    image: '/project_1.png',
  },
  {
    title: 'Full-Stack Systems',
    summary: 'End-to-end typed web products from relational schemas to responsive UI architectures.',
    stack: ['Next.js', 'React', 'TypeScript', 'JavaScript', 'SQL'],
    image: '/ai-finance-platform-image.png',
  },
  {
    title: 'AI / ML & RAG',
    summary: 'Autonomous LangGraph agents, FAISS vector retrieval, TensorFlow NLP & Vision Transformers.',
    stack: ['LangGraph', 'RAG', 'Generative AI', 'TensorFlow', 'NLP', 'Deep Learning'],
    image: '/portfolio.png',
  },
  {
    title: 'Smart TV Ecosystems',
    summary: 'Cross-platform TV engineering across Android TV (ExoPlayer), LG webOS & WebSocket control decks.',
    stack: ['Android TV', 'LG webOS', 'React', 'TypeScript', 'WebSockets'],
    image: '/hacktv.svg',
  },
  {
    title: 'Cloud & DevOps',
    summary: 'Containerized deployments, GCP Vertex AI workflows, CI/CD pipelines & serverless jobs.',
    stack: ['GCP', 'Docker', 'Firebase', 'Supabase', 'CI/CD'],
    image: '/project-5.png',
  },
  {
    title: 'Database Engineering',
    summary: 'Normalized PostgreSQL star schemas, MongoDB document modeling & query optimization.',
    stack: ['PostgreSQL', 'MongoDB', 'Supabase', 'SQL', 'Firebase'],
    image: '/proctored.jpeg',
  },
  {
    title: 'System Design & DSA',
    summary: 'Scalable distributed systems, core data structures, algorithms & clean OOP contracts.',
    stack: ['System Design', 'DSA', 'OOP', 'C++', 'Java'],
    image: '/hacktv-architecture.svg',
  },
  {
    title: 'Security & Decentralized',
    summary: 'Ethereum smart-record integrity, HMAC-SHA256 APIs & penetration testing fundamentals.',
    stack: ['Ethereum', 'JWT', 'HMAC-SHA256', 'Penetration Testing'],
    image: '/healthlink.png',
  },
];

const SKILL_GROUPS = [
  {
    category: 'Languages',
    items: ['Java', 'Python', 'C++', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    category: 'Frontend & Frameworks',
    items: ['React', 'Next.js', 'Node.js', 'Express', 'Spring Boot'],
  },
  {
    category: 'Databases & Cloud',
    items: ['PostgreSQL', 'MongoDB', 'Supabase', 'Firebase', 'GCP', 'Docker'],
  },
  {
    category: 'AI / ML & Foundations',
    items: [
      'TensorFlow',
      'NLP',
      'Deep Learning',
      'Generative AI',
      'RAG',
      'LangGraph',
      'DSA',
      'OOP',
      'System Design',
    ],
  },
];

// Magnetic detent curve ported directly from reference stoik.js lines 1076-1084
function magnetIdx(raw: number): number {
  const i = Math.round(raw);
  const d = raw - i;
  const s = d < 0 ? -1 : 1;
  const a = Math.abs(d) * 2;
  const eased = Math.pow(a, 3) * 0.5;
  return i + s * eased;
}

export default function StoikExpertise() {
  const trackRef = useRef<HTMLDivElement>(null);
  const wheelWrapRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [wheelDeg, setWheelDeg] = useState(270);
  const [dialInView, setDialInView] = useState(false);
  const [radius, setRadius] = useState(260);

  const N = EXPERTISE_ROWS.length;
  const STEP_DEG = 360 / N;

  // Build 96 minor + 8 major dial ticks once (mirrors buildDialSvg in stoik.js)
  const dialTicks = useMemo(() => {
    const minor: { x1: number; y1: number; x2: number; y2: number }[] = [];
    const major: { x1: number; y1: number; x2: number; y2: number }[] = [];
    const rOuter = 478;
    const rMinor = 466;
    const rMajor = 446;

    for (let k = 0; k < 96; k++) {
      const rad = (((k / 96) * 360 - 90) * Math.PI) / 180;
      minor.push({
        x1: 500 + rMinor * Math.cos(rad),
        y1: 500 + rMinor * Math.sin(rad),
        x2: 500 + rOuter * Math.cos(rad),
        y2: 500 + rOuter * Math.sin(rad),
      });
    }
    for (let k = 0; k < N; k++) {
      const rad = (((k / N) * 360 - 90) * Math.PI) / 180;
      major.push({
        x1: 500 + rMajor * Math.cos(rad),
        y1: 500 + rMajor * Math.sin(rad),
        x2: 500 + rOuter * Math.cos(rad),
        y2: 500 + rOuter * Math.sin(rad),
      });
    }
    return { minor, major };
  }, [N]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateRadius = () => {
      const w = wheelWrapRef.current?.offsetWidth ?? 640;
      if (w > 50) setRadius(w * 0.4);
    };

    const onScroll = () => {
      if (window.innerWidth <= 960) return;
      const rect = track.getBoundingClientRect();
      const totalScroll = track.offsetHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const progress = Math.max(0, Math.min(1, -rect.top / totalScroll));
      const rawIdx = progress * (N - 1);
      const mag = magnetIdx(rawIdx);
      setWheelDeg(270 - mag * STEP_DEG);
      setActiveIdx(Math.max(0, Math.min(N - 1, Math.round(rawIdx))));
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => setDialInView(en.isIntersecting));
      },
      { threshold: 0.12 }
    );
    io.observe(track);

    const onResize = () => {
      updateRadius();
      onScroll();
    };

    updateRadius();
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [N, STEP_DEG]);

  const jumpToItem = (idx: number) => {
    setActiveIdx(idx);
    setWheelDeg(270 - idx * STEP_DEG);
    const track = trackRef.current;
    if (track && window.innerWidth > 960) {
      const totalScroll = track.offsetHeight - window.innerHeight;
      const targetTop =
        track.getBoundingClientRect().top + window.scrollY + (idx / (N - 1)) * totalScroll;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  };

  const activeRow = EXPERTISE_ROWS[activeIdx] ?? EXPERTISE_ROWS[0];

  return (
    <section id="expertise" className="w-full" style={{ backgroundColor: '#ECECEC' }}>
      {/* Scroll-Lock Rotating Wheel + Tactile SVG Dial (exact reference architecture) */}
      <div ref={trackRef} className="stoik-solutions-custom">
        <div className="stoik-sol-sticky">
          {/* Left column: Giant heading + active discipline summary */}
          <div className="flex-shrink-0 w-full lg:w-[clamp(260px,28%,420px)] relative z-[3]">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="stoik-rot-square" aria-hidden="true" />
              <span className="text-[13px] font-medium text-[#0A0A0A]">Technical Expertise</span>
            </div>
            <h2
              className="font-medium text-[#0A0A0A] m-0"
              style={{
                fontSize: 'clamp(48px, 7.6vw, 118px)',
                lineHeight: 0.92,
                letterSpacing: '-0.035em',
              }}
            >
              Expertise
            </h2>

            {/* Active discipline detail card */}
            <div className="mt-7 p-5 bg-white/85 backdrop-blur-md border border-black/10 stoik-chamfer max-w-[360px]">
              <div className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-[#0052FF] mb-2">
                0{activeIdx + 1} / 0{N} · Active Discipline
              </div>
              <p className="text-[13.5px] leading-[1.52] text-black/75 mb-3">
                {activeRow.summary}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {activeRow.stack.map((tech) => (
                  <span key={tech} className="tag-outline">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Center column: Interactive list of 8 disciplines */}
          <div className="flex flex-col gap-3 lg:gap-[clamp(14px,1.5vw,26px)] lg:pl-[clamp(48px,7vw,140px)] relative z-[3] w-full lg:w-auto">
            {EXPERTISE_ROWS.map((row, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={row.title}
                  type="button"
                  onClick={() => jumpToItem(idx)}
                  className="text-left font-medium transition-all duration-300 cursor-pointer bg-transparent border-0 p-0 whitespace-nowrap"
                  style={{
                    fontSize: 'clamp(17px, 1.55vw, 26px)',
                    lineHeight: 1.25,
                    letterSpacing: '-0.018em',
                    color: isActive ? 'rgba(10, 10, 10, 0.95)' : 'rgba(10, 10, 10, 0.24)',
                    transform: isActive ? 'translateX(10px)' : 'translateX(0)',
                  }}
                >
                  <span
                    className="inline-block font-mono text-[11px] mr-3 align-middle"
                    style={{ color: isActive ? '#0052FF' : 'rgba(10,10,10,0.28)' }}
                  >
                    0{idx + 1}
                  </span>
                  {row.title}
                </button>
              );
            })}
          </div>

          {/* Right: Tactile Rotating SVG Dial + Counter-Rotating Chamfered Preview Wheel */}
          <div ref={wheelWrapRef} className="stoik-sol-wheel-wrap" aria-hidden="true">
            <div className={`stoik-sol-dial ${dialInView ? 'in-view' : ''}`}>
              <div
                className="stoik-sol-dial-rot"
                style={{ transform: `rotate(${wheelDeg.toFixed(2)}deg)` }}
              >
                <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                  {dialTicks.minor.map((t, idx) => (
                    <line
                      key={`m-${idx}`}
                      className="tick"
                      x1={t.x1.toFixed(1)}
                      y1={t.y1.toFixed(1)}
                      x2={t.x2.toFixed(1)}
                      y2={t.y2.toFixed(1)}
                    />
                  ))}
                  {dialTicks.major.map((t, idx) => (
                    <line
                      key={`M-${idx}`}
                      className="tick major"
                      x1={t.x1.toFixed(1)}
                      y1={t.y1.toFixed(1)}
                      x2={t.x2.toFixed(1)}
                      y2={t.y2.toFixed(1)}
                    />
                  ))}
                </svg>
              </div>
            </div>

            <div
              className="stoik-sol-wheel"
              style={{ transform: `rotate(${wheelDeg.toFixed(2)}deg)` }}
            >
              {EXPERTISE_ROWS.map((row, i) => {
                const rad = (i * STEP_DEG * Math.PI) / 180;
                const bx = (radius * Math.sin(rad)).toFixed(2);
                const by = (-radius * Math.cos(rad)).toFixed(2);
                const isActive = i === activeIdx;
                return (
                  <div
                    key={row.title}
                    className={`stoik-sol-wheel-img ${isActive ? 'active' : ''}`}
                    style={{
                      transform: `translate(calc(-50% + ${bx}px), calc(-50% + ${by}px)) rotate(${(
                        -wheelDeg
                      ).toFixed(2)}deg)`,
                    }}
                  >
                    <div className="stoik-chamfer relative w-full h-full overflow-hidden border border-black/15 bg-[#0A0A0C]">
                      <Image
                        src={row.image}
                        alt={row.title}
                        fill
                        sizes="220px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Full Verified Technical Stack Matrix */}
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12 pb-24 pt-12 border-t border-black/10">
        <div className="flex items-center justify-between mb-8">
          <span className="text-label text-[#0A0A0A]">Complete Technical Stack</span>
          <span className="font-mono text-[11px] text-black/45">26 CORE TECHNOLOGIES</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.category}
              className="stoik-chamfer bg-white border border-black/10 p-5 flex flex-col gap-3.5"
            >
              <div className="flex items-center justify-between border-b border-black/10 pb-2.5">
                <span className="text-[12px] font-semibold tracking-[-0.01em] text-[#0A0A0A]">
                  {group.category}
                </span>
                <span className="text-[#0052FF] font-mono text-xs font-bold">*</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((skill) => (
                  <span key={skill} className="tag-outline">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
