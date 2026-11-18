import type { CSSProperties } from 'react';
import Image from 'next/image';
import profilePhoto from '../../public/profile-photo.jpg';
import SectionRevealObserver from '@/components/section-reveal-observer';

const HEADLINE_WORDS =
  'Engineering scalable systems, full-stack products, and AI tools that ship.'.split(' ');

const STAT_CARDS = [
  {
    value: '8.76',
    label: 'B.E. CSE CGPA / 10 · Sambhram Institute of Technology',
    delay: '0s',
  },
  {
    value: '+108%',
    label: 'OSCode Event Attendance Growth (120 → 250+)',
    delay: '0.4s',
  },
  {
    value: '80%',
    label: 'Admin Effort Reduced via QR Check-In Automation',
    delay: '0.8s',
  },
];

const EXPERIENCE = [
  {
    role: 'SDE / Teaching Assistant Intern',
    company: 'AlgoUniversity',
    location: 'Bengaluru, IN',
    period: 'Nov 2026 – Present',
    summary:
      'Mentoring engineering students in Data Structures, Algorithms, and System Design; conducting code reviews and debugging full-stack software architectures.',
    active: true,
  },
  {
    role: 'Creative Lead',
    company: 'OSCode, SAIT Chapter',
    location: 'Bengaluru, IN',
    period: 'September 2025 – September 2026',
    summary:
      'Completed one-year tenure: grew event attendance from ~120 to 250+ participants (+108%) and engineered an automated Next.js + Supabase QR check-in and certificate platform that reduced administrative effort by ~80%.',
    active: false,
  },
  {
    role: 'Data Analyst Intern',
    company: 'Bluestock.in',
    location: 'Remote',
    period: 'Apr 2025 – May 2025',
    summary:
      'Built an automated Python/Pandas ETL pipeline into a PostgreSQL star-schema warehouse, Isolation Forest + K-Means scoring models, and an HMAC-authenticated Django REST API with Redis rate limiting.',
    active: false,
  },
  {
    role: 'AI Intern',
    company: 'Coincent.ai',
    location: 'Remote',
    period: 'Jun 2024 – Aug 2024',
    summary:
      'Engineered an NLP text classification system in TensorFlow and fine-tuned a Vision Transformer (ViT) architecture achieving +15% classification gain over baseline CNNs.',
    active: false,
  },
];

export default function StoikAbout() {
  return (
    <section
      id="about"
      className="w-full py-24 md:py-36"
      style={{ backgroundColor: '#ECECEC' }}
    >
      <SectionRevealObserver
        targetId="about"
        readyClass="stoik-about-words-ready"
        delayedClass="stoik-about-cards-ready"
        delayMs={380}
        threshold={0.16}
      />
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Top Tag — rotating electric-blue square + label */}
        <div className="flex items-center gap-3 mb-10">
          <span className="stoik-rot-square" aria-hidden="true" />
          <span className="text-[13px] font-medium tracking-[-0.01em] text-[#0A0A0A]">
            About
          </span>
        </div>

        {/* Word-by-word blur reveal editorial headline (exact reference motion) */}
        <h2
          className="font-medium text-[#0A0A0A] max-w-[1100px] mb-14 md:mb-20"
          style={{
            fontSize: 'clamp(28px, 4.8vw, 68px)',
            lineHeight: 0.98,
            letterSpacing: '-0.045em',
          }}
        >
          {HEADLINE_WORDS.map((word, idx) => (
            <span
              key={`${word}-${idx}`}
              className="stoik-about-word"
              style={{ transitionDelay: `${idx * 75}ms` }}
            >
              {word}
            </span>
          ))}
        </h2>

        {/* 3 Stoik Stat Cards (v3 layout: big number top-left, rotating blue square top-right, label bottom-right) */}
        <div className="grid sm:grid-cols-3 gap-4 md:gap-6 mb-20 md:mb-28">
          {STAT_CARDS.map((stat, i) => (
            <div
              key={stat.value}
              className="stoik-chamfer stoik-about-stat-card relative bg-white border border-black/10 p-6 md:p-7 min-h-[172px] flex flex-col justify-between"
              style={{
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  className="font-semibold text-[#0A0A0A] tracking-[-0.03em] leading-none"
                  style={{ fontSize: 'clamp(40px, 4vw, 56px)' }}
                >
                  {stat.value}
                </span>
                <span
                  className="stoik-rot-square mt-1"
                  style={{ '--stoik-rot-delay': stat.delay } as CSSProperties}
                  aria-hidden="true"
                />
              </div>
              <p className="text-[12.5px] leading-[1.4] text-black/60 text-right max-w-[230px] self-end m-0">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Two-column Bio + Devesh Portrait & Experience Timeline */}
        <div className="grid lg:grid-cols-[0.88fr_1.12fr] gap-12 lg:gap-16 items-start">
          {/* Left: Portrait + Education Facts */}
          <div className="flex flex-col gap-6">
            <div className="stoik-chamfer-lg relative w-full aspect-[4/4.6] overflow-hidden bg-[#0038D0] border border-black/10">
              <Image
                src={profilePhoto}
                alt="Devesh Tiwari — Software Engineer"
                fill
                sizes="(max-width: 1024px) 100vw, 44vw"
                className="object-cover object-top"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1 bg-[#0052FF]"
              />
            </div>

            <div className="bg-white border border-black/10 stoik-chamfer p-6 space-y-3">
              <div className="flex items-center justify-between border-b border-black/10 pb-3">
                <span className="text-label">Education</span>
                <span className="font-mono text-[11px] font-medium text-[#0052FF]">
                  2023 – 2027
                </span>
              </div>
              <div className="text-[16px] font-medium tracking-[-0.02em] text-[#0A0A0A]">
                B.E. Computer Science and Engineering
              </div>
              <div className="text-[13.5px] text-black/65">
                Sambhram Institute of Technology · Bengaluru, Karnataka
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-black/10 text-[12px] font-mono">
                <span className="text-black/55">CGPA: 8.76 / 10</span>
                <span className="text-[#0A0A0A] font-medium">No Active Backlogs</span>
              </div>
            </div>
          </div>

          {/* Right: Narrative + Experience */}
          <div className="flex flex-col gap-10">
            <div className="space-y-4 text-[15px] sm:text-[16px] leading-[1.62] text-black/75">
              <p>
                I&apos;m a Computer Science and Engineering student passionate about
                building scalable software systems, full-stack products, AI-powered
                applications, and intelligent developer tools.
              </p>
              <p>
                My engineering spans low-latency backend APIs in Java, Spring Boot,
                Node.js, and Python; full-stack Next.js and React platforms; multi-OS
                Smart TV ecosystems like HackTV; and applied Generative AI pipelines
                using LangGraph, RAG, FAISS, and TensorFlow.
              </p>
            </div>

            {/* Experience List */}
            <div>
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-black/15">
                <div className="flex items-center gap-2.5">
                  <span
                    className="stoik-rot-square"
                    style={{ '--stoik-rot-delay': '1.2s' } as CSSProperties}
                    aria-hidden="true"
                  />
                  <span className="text-label text-[#0A0A0A]">Experience</span>
                </div>
                <span className="font-mono text-[11px] text-black/45">
                  04 VERIFIED ROLES
                </span>
              </div>

              <div className="space-y-4">
                {EXPERIENCE.map((exp) => (
                  <article
                    key={`${exp.company}-${exp.period}`}
                    className="stoik-chamfer bg-white border border-black/10 p-5 sm:p-6 transition-colors hover:border-[#0052FF]/50"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1.5">
                      <h3 className="text-[16px] sm:text-[17px] font-medium tracking-[-0.02em] text-[#0A0A0A]">
                        {exp.company}
                      </h3>
                      <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-black/50">
                        {exp.active ? 'Active' : 'Completed'}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-[13px] font-medium text-[#0052FF]">
                        {`${exp.role} | ${exp.period}`}
                      </span>
                      <span className="text-black/30">·</span>
                      <span className="text-[12px] text-black/55">{exp.location}</span>
                      {exp.active && (
                        <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-emerald-700 bg-emerald-500/10 px-2 py-0.5">
                          <span className="w-1.5 h-1.5 bg-emerald-500" />
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-[13.5px] leading-[1.55] text-black/68 m-0">
                      {exp.summary}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
