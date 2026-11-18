'use client';

import { motion } from 'framer-motion';

const ACHIEVEMENTS = [
  {
    title: 'Top 5000 Shortlist — EY Techathon 6.0',
    org: 'Ernst & Young',
    desc: 'Achieved a perfect score in Round 1 and secured a Top 5000 national shortlist position.',
  },
  {
    title: 'National Finalist — VOIS for Tech Innovation Marathon 2.0',
    org: 'Edunet Foundation',
    desc: 'Selected among the Top 75 teams nationally for a 12-week intensive mentorship cohort.',
  },
];

const CERTIFICATIONS = [
  {
    label: 'Google Cloud',
    title: 'Applied Generative AI & Vertex AI (2025)',
    href: 'https://coursera.org/share/e32c1a6e411718423a941a935b2d6f9d',
  },
  {
    label: 'Physics Wallah',
    title: 'System Design, Microservices & Backend Engineering',
  },
  {
    label: 'Forage Simulations',
    title: 'JPMorgan Chase · Wells Fargo · Goldman Sachs · Walmart',
  },
  {
    label: 'COMEDKares & Vtricks',
    title: 'Innovation Cohort · Data Analytics, Core Java & SQL',
  },
];

/**
 * StoikApproach — Exact replication of the reference's "Traditional / Just bring it"
 * dual equal-size white chamfered approach cards + verified achievements & credentials.
 */
export default function StoikApproach() {
  return (
    <section
      id="approach"
      className="w-full py-24 md:py-36"
      style={{ backgroundColor: '#E5E5E5' }}
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Top Tag + Giant Display Heading */}
        <div className="flex items-center gap-3 mb-4">
          <span className="stoik-rot-square" aria-hidden="true" />
          <span className="text-[13px] font-medium text-[#0A0A0A]">
            Traditional / Just bring it
          </span>
        </div>

        <h2
          className="font-medium text-[#0A0A0A] mb-12 md:mb-16"
          style={{
            fontSize: 'clamp(48px, 8.5vw, 136px)',
            lineHeight: 0.92,
            letterSpacing: '-0.038em',
          }}
        >
          Approach
        </h2>

        {/* Exact Reference Equal 2-Column White Chamfered Cards (.stoik-process-two-boxes) */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-7 items-stretch">
          {/* Card 1: Approach 1 — Traditional */}
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="stoik-chamfer bg-white border border-black/10 p-6 sm:p-8 flex flex-col justify-between gap-5 min-h-[420px]"
          >
            <div className="flex flex-col gap-4">
              <span className="inline-flex items-center justify-center w-fit px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] border border-black/15 text-black/70 bg-white">
                Approach 1
              </span>
              <h3
                className="font-medium text-[#1D1D1D] m-0"
                style={{
                  fontSize: 'clamp(28px, 3vw, 42px)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.05,
                }}
              >
                Traditional
              </h3>
              <p className="text-[14.5px] sm:text-[16px] leading-[1.58] text-black/75 m-0">
                Engineering the structured way. Clear problem scoping, data modeling,
                service boundaries, REST/WebSocket contracts, automated testing, and
                clean documentation. Predictable architecture, resilient codebases,
                and zero surprises in production.
              </p>
            </div>

            {/* Original Monochrome Architectural Blueprint Visual (100% original SVG, zero borrowed video) */}
            <div className="relative w-full h-[180px] sm:h-[210px] bg-[#F5F5F4] border border-black/10 overflow-hidden mt-2 flex items-center justify-center">
              <svg
                viewBox="0 0 560 200"
                className="w-full h-full"
                aria-hidden="true"
              >
                <g stroke="#0A0A0A" strokeOpacity="0.08" strokeWidth="1">
                  <line x1="70" y1="0" x2="70" y2="200" />
                  <line x1="140" y1="0" x2="140" y2="200" />
                  <line x1="210" y1="0" x2="210" y2="200" />
                  <line x1="280" y1="0" x2="280" y2="200" />
                  <line x1="350" y1="0" x2="350" y2="200" />
                  <line x1="420" y1="0" x2="420" y2="200" />
                  <line x1="490" y1="0" x2="490" y2="200" />
                  <line x1="0" y1="50" x2="560" y2="50" />
                  <line x1="0" y1="100" x2="560" y2="100" />
                  <line x1="0" y1="150" x2="560" y2="150" />
                </g>
                {/* Blueprint Nodes */}
                <g stroke="#0A0A0A" strokeWidth="1.3" fill="#FFFFFF">
                  <rect x="44" y="70" width="96" height="58" />
                  <rect x="218" y="70" width="124" height="58" />
                  <rect x="420" y="70" width="96" height="58" />
                </g>
                <g stroke="#0A0A0A" strokeWidth="1.2" strokeDasharray="4 4">
                  <line x1="140" y1="99" x2="218" y2="99" />
                  <line x1="342" y1="99" x2="420" y2="99" />
                </g>
                <rect x="218" y="70" width="10" height="10" fill="#0052FF" />
                <text x="92" y="103" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fill="#0A0A0A">
                  SPEC / RFC
                </text>
                <text x="280" y="103" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fill="#0A0A0A">
                  SYSTEM DESIGN
                </text>
                <text x="468" y="103" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fill="#0A0A0A">
                  CI/CD SHIP
                </text>
              </svg>
              <span className="absolute bottom-2.5 left-3 font-mono text-[10px] uppercase tracking-[0.12em] text-black/45 bg-white/85 px-2 py-0.5">
                DSA · OOP · Architecture · Testing
              </span>
            </div>
          </motion.article>

          {/* Card 2: Approach 2 — Just bring it */}
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="stoik-chamfer bg-white border border-black/10 p-6 sm:p-8 flex flex-col justify-between gap-5 min-h-[420px]"
          >
            <div className="flex flex-col gap-4">
              <span className="inline-flex items-center justify-center w-fit px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] border border-black/15 text-black/70 bg-white">
                Approach 2
              </span>
              <h3
                className="font-medium text-[#1D1D1D] m-0"
                style={{
                  fontSize: 'clamp(28px, 3vw, 42px)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.05,
                }}
              >
                Just bring it
              </h3>
              <p className="text-[14.5px] sm:text-[16px] leading-[1.58] text-black/75 m-0">
                Drop the hard technical problem and start shipping. Zero busywork,
                tight feedback loops, rapid prototypes turned into working full-stack
                and AI systems — from multi-OS Smart TV stacks to RAG agents and
                national-finalist hackathon builds.
              </p>
            </div>

            {/* Exact Reference Animated Monochrome Spectrum Bars (.stoik-pbox-spectrum) */}
            <div className="relative w-full h-[180px] sm:h-[210px] bg-[#F5F5F4] border border-black/10 overflow-hidden mt-2">
              <div className="stoik-pbox-spectrum" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <span className="absolute top-2.5 left-3 font-mono text-[10px] uppercase tracking-[0.12em] text-black/55 bg-white/90 px-2 py-0.5">
                High-Cadence Execution · Zero-to-One
              </span>
            </div>
          </motion.article>
        </div>

        {/* Verified Achievements & Certifications Row */}
        <div className="mt-12 grid lg:grid-cols-2 gap-5">
          {/* Achievements */}
          <div className="space-y-4">
            <div className="text-label text-[#0A0A0A] pb-2 border-b border-black/15">
              Verified Recognition
            </div>
            {ACHIEVEMENTS.map((ach) => (
              <div
                key={ach.title}
                className="stoik-chamfer bg-white border border-black/10 p-5 flex gap-4"
              >
                <div className="w-1 bg-[#0052FF] flex-shrink-0" />
                <div>
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-[#0052FF] mb-1">
                    {ach.org}
                  </div>
                  <div className="text-[15px] font-medium tracking-[-0.015em] text-[#0A0A0A] mb-1">
                    {ach.title}
                  </div>
                  <p className="text-[13px] leading-[1.5] text-black/65 m-0">{ach.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="space-y-4">
            <div className="text-label text-[#0A0A0A] pb-2 border-b border-black/15">
              Certifications &amp; Simulations
            </div>
            <div className="stoik-chamfer bg-white border border-black/10 divide-y divide-black/10">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.label}
                  className="p-4 flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-black/50">
                      {cert.label}
                    </div>
                    <div className="text-[14px] font-medium text-[#0A0A0A] mt-0.5">
                      {cert.title}
                    </div>
                  </div>
                  {cert.href && (
                    <a
                      href={cert.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[11px] text-[#0052FF] hover:underline flex-shrink-0"
                    >
                      Verify ↗
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
