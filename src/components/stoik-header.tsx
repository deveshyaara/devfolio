'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SCRAMBLE_CHARS =
  '!@#%^&*<>?/|~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const navLinks = [
  { name: 'Work',      href: '#projects' },
  { name: 'About',     href: '#about' },
  { name: 'Expertise', href: '#expertise' },
  { name: 'Approach',  href: '#approach' },
  { name: 'Contact',   href: '#contact' },
];

function ScrambleNavLink({
  name,
  href,
  active,
}: {
  name: string;
  href: string;
  active: boolean;
}) {
  const [label, setLabel] = React.useState(name);
  const rafRef = React.useRef<number | null>(null);

  const handleEnter = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    let frame = 0;
    const totalFrames = 20;

    const tick = () => {
      frame++;
      const revealed = Math.floor((frame / totalFrames) * name.length);
      let out = '';
      for (let i = 0; i < name.length; i++) {
        out +=
          i < revealed
            ? name[i]
            : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
      setLabel(out);
      if (frame < totalFrames) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setLabel(name);
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const handleLeave = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setLabel(name);
  };

  React.useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <Link
      href={href}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      aria-current={active ? 'location' : undefined}
      className={`inline-flex items-center px-2 py-1 text-[12px] font-medium tracking-[0.02em] transition-colors duration-150 hover:text-[#0052FF] ${
        active ? 'text-[#0052FF]' : 'text-[#0A0A0A]'
      }`}
    >
      <span className={active ? 'opacity-90 mr-1' : 'opacity-45 mr-1'}>[</span>
      <span className="font-mono text-[11.5px]">{label}</span>
      <span className={active ? 'opacity-90 ml-1' : 'opacity-45 ml-1'}>]</span>
    </Link>
  );
}

export default function StoikHeader() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [cardPinnedTop, setCardPinnedTop] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string>('');

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const heroEl = document.getElementById('hero');
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        setCardPinnedTop(rect.bottom < window.innerHeight * 0.45);
      } else {
        setCardPinnedTop(window.scrollY > window.innerHeight * 0.55);
      }
    };

    const sectionIds = ['about', 'projects', 'expertise', 'approach', 'contact'];
    const sectionEls = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveSection(`#${visible[0].target.id}`);
        } else if (window.scrollY < 240) {
          setActiveSection('');
        }
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0.05, 0.25, 0.5] }
    );

    sectionEls.forEach((el) => observer.observe(el));

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <>
      {/* Top 4px electric-blue architectural line — exact reference detail */}
      <div
        aria-hidden
        className="fixed top-0 inset-x-0 h-[4px] z-[110]"
        style={{ backgroundColor: '#0052FF' }}
      />

      {/* Sticky Header */}
      <header
        className="fixed top-[4px] inset-x-0 z-[100] transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(236, 236, 236, 0.86)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(10,10,10,0.08)' : '1px solid transparent',
        }}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 h-14">
          {/* Top-left brand mark matching reference .stoik-heading-top */}
          <Link
            href="#hero"
            className="flex items-center gap-2 text-[17px] font-semibold tracking-[-0.025em] leading-none text-[#0A0A0A]"
          >
            <span>Devesh Tiwari</span>
            <span className="text-[#0052FF] text-xs font-mono align-super">®</span>
          </Link>

          {/* Desktop nav + inline social icons (shifts left slightly when card pins top-right) */}
          <div
            className="hidden md:flex items-center gap-4 lg:gap-7 transition-all duration-500"
            style={{
              marginRight: cardPinnedTop ? 'clamp(285px, 24vw, 375px)' : '0px',
            }}
          >
            <nav className="flex items-center gap-3 lg:gap-6" aria-label="Primary">
              {navLinks.map((link) => (
                <ScrambleNavLink
                  key={link.name}
                  name={link.name}
                  href={link.href}
                  active={activeSection === link.href}
                />
              ))}
              <Link
                href="/resume"
                className="inline-flex items-center px-2 py-1 text-[12px] font-medium tracking-[0.02em] text-[#0A0A0A] transition-colors duration-150 hover:text-[#0052FF]"
              >
                <span className="opacity-45 mr-1">[</span>
                <span className="font-mono text-[11.5px]">Resume</span>
                <span className="opacity-45 ml-1">]</span>
              </Link>
            </nav>

            {/* Social icons inline right next to nav (mirrors .stoik-header-socials) */}
            <div className="flex items-center gap-1 pl-2 border-l border-black/15">
              <a
                href="https://github.com/deveshyaara"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 inline-flex items-center justify-center text-[#0A0A0A]/75 hover:text-[#0052FF] transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-[19px] h-[19px] fill-current" aria-hidden="true">
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.16 1.18a10.94 10.94 0 0 1 5.76 0c2.19-1.49 3.16-1.18 3.16-1.18.62 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/deveshcodes/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 inline-flex items-center justify-center text-[#0A0A0A]/75 hover:text-[#0052FF] transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current" aria-hidden="true">
                  <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.58c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95V21h-4V9Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden p-2 text-[#0A0A0A]"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Floating Glassmorphic "Talk to Devesh" Pinned CTA Card (exact reference .stoik-hero-card) */}
      <aside
        aria-label="Quick contact card"
        className={`stoik-hero-card ${cardPinnedTop ? 'stoik-card-pinned-top' : ''}`}
      >
        <div className="stoik-hero-card-inner">
          {/* Devesh's OWN square portrait */}
          <div className="relative w-[76px] h-[76px] sm:w-[88px] sm:h-[88px] flex-shrink-0 bg-[#0A0A0A] overflow-hidden">
            <Image
              src="/profile-photo.jpg"
              alt="Devesh Tiwari"
              fill
              priority
              sizes="88px"
              className="object-cover object-top"
            />
          </div>

          <div className="flex flex-col justify-between items-start flex-1 min-w-0 py-0.5 relative z-10">
            <div>
              <p className="text-[16px] sm:text-[18px] font-medium tracking-[-0.02em] leading-[1.05] text-[#0A0A0A] m-0">
                Talk to Devesh
              </p>
              <p className="text-[9.5px] font-mono uppercase tracking-[0.06em] text-black/55 mt-1 m-0">
                SDE · Full-Stack · AI/ML
              </p>
            </div>

            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              <a
                href="mailto:tiwaridewesh234@gmail.com?subject=Engineering%20Inquiry"
                className="stoik-cta-button"
              >
                <span>Mail me</span>
                <span aria-hidden>→</span>
              </a>
              <a
                href="https://github.com/deveshyaara"
                target="_blank"
                rel="noopener noreferrer"
                className="stoik-cta-button is-dark"
              >
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Subtle architectural corner mark */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-3 -bottom-3 w-16 h-16 opacity-[0.07]"
          >
            <svg viewBox="0 0 64 64" className="w-full h-full stroke-[#0A0A0A]" fill="none" strokeWidth="1.5">
              <rect x="6" y="6" width="52" height="52" />
              <line x1="6" y1="32" x2="58" y2="32" />
              <line x1="32" y1="6" x2="32" y2="58" />
              <circle cx="32" cy="32" r="14" />
            </svg>
          </div>
        </div>
      </aside>

      {/* Mobile full-screen drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[95] flex flex-col pt-20 px-6 pb-28"
            style={{ backgroundColor: '#ECECEC' }}
          >
            <nav className="flex flex-col gap-6 mt-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-3xl font-medium tracking-[-0.03em] text-[#0A0A0A] border-b border-black/10 pb-3"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/resume"
                onClick={() => setOpen(false)}
                className="text-3xl font-medium tracking-[-0.03em] text-[#0052FF] border-b border-black/10 pb-3"
              >
                Resume →
              </Link>
              <a
                href="/devesh_resume.pdf"
                download="Devesh_Tiwari_Resume.pdf"
                onClick={() => setOpen(false)}
                className="stoik-chamfer inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium bg-[#0A0A0A] text-white w-fit mt-2"
              >
                Download PDF Resume ↓
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
