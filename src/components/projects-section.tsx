"use client";

import Image from 'next/image';
import { useRef, memo } from 'react';
import { projects } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Github, ExternalLink } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// ---------------------------------------------------------------------------
// ProjectCard — memoised to prevent re-renders during parent scroll updates
// ---------------------------------------------------------------------------
const ProjectCard = memo(function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const projectImage = PlaceHolderImages.find((p) => p.id === project.image);

  // Masonry heights cycle through four sizes
  const heights = [
    'min-h-[420px]',
    'min-h-[480px]',
    'min-h-[400px]',
    'min-h-[460px]',
  ] as const;
  const cardHeight = heights[index % heights.length];

  return (
    <motion.div
      className={`${cardHeight} w-full`}
      whileHover={{ scale: 1.03, y: -8 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25, mass: 0.8 }}
    >
      <a
        href={project.liveDemoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full w-full bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 cursor-pointer group"
      >
        {/* Image area */}
        <div className="relative h-[55%] overflow-hidden">
          {projectImage && (
            <Image
              src={projectImage.imageUrl}
              alt={`Screenshot of ${project.title}`}
              fill
              /*
               * All project cards are below-the-fold; use lazy loading.
               * The first two cards might be partially visible without scrolling
               * on very tall viewports, but the visual impact of a slight delay
               * is negligible compared to downloading 8 images immediately.
               */
              loading="lazy"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              data-ai-hint={projectImage.imageHint}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Action buttons — use <button> elements for accessibility */}
          <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
            <button
              type="button"
              aria-label={`Live demo of ${project.title}`}
              className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(project.liveDemoUrl, '_blank', 'noopener,noreferrer');
              }}
            >
              <ExternalLink className="w-5 h-5 text-gray-800" />
            </button>
            <button
              type="button"
              aria-label={`GitHub repository of ${project.title}`}
              className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(project.repoUrl, '_blank', 'noopener,noreferrer');
              }}
            >
              <Github className="w-5 h-5 text-gray-800" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 h-[45%] flex flex-col justify-between bg-white">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
              {project.description}
            </p>
          </div>
          <div className="mt-4">
            <span className="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold group-hover:bg-amber-200 transition-colors duration-200">
              View Project →
            </span>
          </div>
        </div>
      </a>
    </motion.div>
  );
});

// ---------------------------------------------------------------------------
// ProjectsSection
// ---------------------------------------------------------------------------
export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-driven 3D perspective animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start'],
  });

  /*
   * One shared spring drives all 3D transforms.
   * Previously there were two extra useSpring() instances for the column
   * parallax (smoothLeftX / smoothRightX) derived from the *raw* scrollYProgress.
   * Both extra springs were redundant — smoothProgress already smooths the
   * scroll value and the column offsets can derive from it directly.
   */
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const rotateX = useTransform(smoothProgress, [0, 1], [20, 0]);
  const rotateY = useTransform(smoothProgress, [0, 1], [8, 0]);
  const scale   = useTransform(smoothProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(smoothProgress, [0, 0.3], [0.8, 1]);

  // Derive column parallax from the same spring — no extra useSpring needed
  const leftColumnX  = useTransform(smoothProgress, [0, 1], [80, 0]);
  const rightColumnX = useTransform(smoothProgress, [0, 1], [120, 0]);

  const leftColumn  = projects.filter((_, i) => i % 2 === 0);
  const rightColumn = projects.filter((_, i) => i % 2 === 1);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="w-full min-h-screen py-20 md:py-32 relative overflow-hidden"
      style={{ backgroundColor: '#FFD700' }}
    >
      {/*
       * Decorative blurs: reduced from 3 large blur-3xl elements to 2 smaller
       * ones. blur-3xl on very large divs (600 px) creates an expensive GPU
       * composite layer; smaller radii achieve the same ambient glow.
       */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute top-20 left-10 w-56 h-56 bg-amber-300/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-orange-300/30 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 md:px-6 relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.span
            className="inline-block px-4 py-2 bg-black/10 rounded-full text-sm font-medium text-gray-800 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Featured Work
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight mb-6">
            My Projects
          </h2>
          <p className="text-xl text-gray-700/80 max-w-2xl mx-auto">
            A collection of work that showcases my passion for building beautiful,
            functional experiences.
          </p>
        </motion.div>

        {/* Mobile: stacked layout (no 3D — too expensive on mobile GPU) */}
        <div className="flex flex-col gap-8 md:hidden relative z-20">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Desktop: 3D perspective masonry */}
        <motion.div
          style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
          className="relative hidden md:block"
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              scale,
              opacity,
              transformOrigin: 'center top',
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Left column */}
              <motion.div
                className="flex flex-col gap-6 md:gap-8"
                style={{ x: leftColumnX }}
              >
                {leftColumn.map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={i * 2}
                  />
                ))}
              </motion.div>

              {/* Right column — offset for masonry effect */}
              <motion.div
                className="flex flex-col gap-6 md:gap-8 md:mt-16"
                style={{ x: rightColumnX }}
              >
                {rightColumn.map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={i * 2 + 1}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <a
            href="https://github.com/deveshyaara"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
          >
            <Github className="w-5 h-5" />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
