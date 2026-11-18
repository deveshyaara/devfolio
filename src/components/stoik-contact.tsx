import Link from 'next/link';
import CopyEmailButton from '@/components/copy-email-button';

const EMAIL = 'tiwaridewesh234@gmail.com';

/**
 * StoikContact — Faithful replication of the reference's panoramic sky footer
 * (`.stoik-footer` from `ysuriadesign/index.html`) using an original pure CSS/SVG
 * daylight sky & cumulus horizon (zero copied raster photography) and Devesh Tiwari's
 * verified contact channels. Rendered as a React Server Component with a minimal
 * client island for the Copy Email button.
 */
export default function StoikContact() {
  return (
    <footer
      id="contact"
      className="w-full relative overflow-hidden"
      style={{ backgroundColor: '#F1F1F1', color: '#0A0A0A' }}
    >
      {/* Panoramic Daylight Sky Banner (exact visual language of .stoik-footer-hero, 100% original CSS/SVG) */}
      <div
        className="relative w-full min-h-[420px] md:min-h-[500px] flex items-end overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, #7AB3F5 0%, #A9CEF8 36%, #D6E7FA 72%, #ECEFF3 100%)',
        }}
      >
        {/* Soft Cumulus Cloud Layers (original vector atmospheric composition) */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 520"
          preserveAspectRatio="xMidYMax slice"
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
        >
          <defs>
            <filter id="cloudBlur" x="-15%" y="-15%" width="130%" height="130%">
              <feGaussianBlur stdDeviation="24" />
            </filter>
            <linearGradient id="cloudWhite" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#E6EEF7" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <g filter="url(#cloudBlur)" fill="url(#cloudWhite)">
            <ellipse cx="180" cy="430" rx="280" ry="120" />
            <ellipse cx="440" cy="460" rx="240" ry="110" />
            <ellipse cx="760" cy="410" rx="310" ry="135" />
            <ellipse cx="1120" cy="440" rx="300" ry="130" />
            <ellipse cx="1360" cy="400" rx="240" ry="115" />
            <ellipse cx="620" cy="310" rx="190" ry="70" opacity="0.65" />
            <ellipse cx="1040" cy="290" rx="210" ry="75" opacity="0.55" />
          </g>
        </svg>

        {/* Subtle Architectural Grid Lines across the Sky Horizon */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to right, rgba(10,10,10,0.06) 0 1px, transparent 1px calc(100% / 6))',
          }}
        />

        {/* Foreground Footer Content (mirrors .stoik-footer-content 2-col bottom-aligned layout) */}
        <div className="relative z-[2] w-full max-w-[1360px] mx-auto px-5 sm:px-8 md:px-14 py-12 md:py-16 grid lg:grid-cols-[1.35fr_1fr] gap-10 lg:gap-20 items-end">
          {/* Left: Giant Editorial Headline */}
          <div>
            <div className="inline-flex items-center gap-2.5 mb-5">
              <span className="stoik-rot-square" aria-hidden="true" />
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-black/65">
                Open to SDE &amp; AI Engineering Opportunities
              </span>
            </div>
            <h2
              className="font-medium text-[#0A0A0A] m-0"
              style={{
                fontSize: 'clamp(42px, 6.8vw, 108px)',
                lineHeight: 0.95,
                letterSpacing: '-0.038em',
              }}
            >
              Have a challenge?
              <br />
              Let&apos;s build it.
            </h2>
          </div>

          {/* Right: Direct Email + Chamfered CTA + Social Links */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-black/50 mb-1.5">
                Email
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="text-[20px] sm:text-[24px] md:text-[26px] font-semibold tracking-[-0.02em] text-[#0A0A0A] hover:text-[#0052FF] transition-colors break-all"
              >
                {EMAIL}
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}&su=Engineering%20Opportunity`}
                target="_blank"
                rel="noopener noreferrer"
                className="stoik-chamfer inline-flex items-center gap-2.5 bg-[#0A0A0A] hover:bg-[#0052FF] text-white px-6 py-3.5 text-[13px] font-semibold tracking-[0.02em] transition-colors"
              >
                <span>Mail me</span>
                <svg
                  viewBox="0 0 24 24"
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>

              <CopyEmailButton email={EMAIL} />
            </div>

            <div className="flex flex-wrap items-center gap-5 pt-1 text-[13px] font-medium text-black/75">
              <a
                href="https://github.com/deveshyaara"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0052FF] transition-colors"
              >
                GitHub →
              </a>
              <a
                href="https://www.linkedin.com/in/deveshcodes/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0052FF] transition-colors"
              >
                LinkedIn →
              </a>
              <Link href="/resume" className="hover:text-[#0052FF] transition-colors">
                Resume →
              </Link>
              <a
                href="/devesh_resume.pdf"
                download="Devesh_Tiwari_Resume.pdf"
                className="hover:text-[#0052FF] transition-colors"
              >
                PDF CV ↓
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Identity Strip (exact reference .stoik-footer-bottom) */}
      <div className="w-full border-t border-black/10 bg-[#F1F1F1] pb-20 md:pb-5">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 md:px-14 py-5 flex flex-wrap items-center justify-between gap-3 text-[11.5px] text-black/55">
          <span>©2026 Devesh Tiwari. All Rights Reserved.</span>
          <span className="font-mono">
            Bengaluru, IN · Backend · Full-Stack · AI/ML
          </span>
          <a
            href={`mailto:${EMAIL}`}
            className="font-medium text-black/85 hover:text-[#0052FF] transition-colors"
          >
            {EMAIL}
          </a>
        </div>
      </div>
    </footer>
  );
}
