import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  AnimatePresence,
} from 'framer-motion';
import { ExternalLink } from 'lucide-react';

// Custom GitHub Icon SVG to bypass missing brand icons in newer lucide-react
const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.2 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// Sprocket strip component — renders a row of film sprocket holes
function SprocketStrip({ position }) {
  return (
    <div
      className={`absolute left-0 right-0 h-6 flex items-center justify-between px-2 bg-[#0a0a0a] z-10 pointer-events-none ${
        position === 'top' ? 'top-0' : 'bottom-0'
      }`}
    >
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="w-3 h-3 rounded-sm border border-white/10 bg-[#050505] shrink-0"
        />
      ))}
    </div>
  );
}

// Mobile fallback: vertical stack of project cards
function MobileProjectStack({ projects }) {
  return (
    <div className="flex flex-col gap-6 px-4 py-8">
      {projects.map((project, i) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className="rounded-sm overflow-hidden border border-white/5 bg-[#111111]/60 backdrop-blur-sm"
        >
          {/* Project image */}
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Project info */}
          <div className="p-5">
            <span className="font-mono text-[10px] text-[#d4c97a] uppercase tracking-widest block mb-1">
              {project.role}
            </span>
            <h3 className="font-heading font-bold text-lg text-stone-100 mb-2">
              {project.name}
            </h3>
            <p className="text-stone-400 font-sans text-xs leading-relaxed mb-4">
              {project.description}
            </p>
            <p className="text-[10px] font-mono text-stone-500 mb-3">
              {project.tech.join(' · ')}
            </p>
            <div className="flex gap-4">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-500 hover:text-stone-100 transition-colors"
                  aria-label={`GitHub repository for ${project.name}`}
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-500 hover:text-[#d4c97a] transition-colors"
                  aria-label={`Live demo for ${project.name}`}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function FilmReel({ projects }) {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  // Dynamic wrapper height: scales with project count.
  // Each project gets ~100vh of scroll distance so the page stays pinned
  // until every frame has been scrolled through.
  const wrapperHeight = `${100 + projects.length * 100}vh`;

  // Scroll-to-track mapping
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map vertical scroll → horizontal pixel offset.
  // Each frame = 50vw + 48px gap (mx-6 = 24px each side).
  // We use a callback so it recalculates on every tick with actual viewport width.
  const trackX = useTransform(scrollYProgress, (latest) => {
    if (typeof window === 'undefined') return 0;
    const vw = window.innerWidth;
    const frameW = vw * 0.5;       // 50vw per frame
    const gap = 48;                 // mx-6 = 24px * 2 sides
    const step = frameW + gap;
    const maxOffset = (projects.length - 1) * step;
    return -latest * maxOffset;
  });

  // Apply spring physics for smooth motion (disabled for reduced motion)
  const smoothX = useSpring(trackX, {
    stiffness: prefersReducedMotion ? 300 : 100,
    damping: prefersReducedMotion ? 40 : 30,
    mass: prefersReducedMotion ? 0.1 : 0.8,
  });

  // Derive active index from scroll progress — single source of truth
  const activeIndex = useTransform(scrollYProgress, (v) =>
    Math.min(projects.length - 1, Math.round(v * (projects.length - 1)))
  );

  // Fade out details panel and progress indicator when entering or exiting the sticky block
  const detailsOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const unsubscribe = activeIndex.on('change', (v) => setActive(v));
    return unsubscribe;
  }, [activeIndex]);

  const currentProject = projects[active];

  return (
    <>
      {/* Desktop: Film Reel — hidden on mobile */}
      <section
        ref={containerRef}
        className="relative hidden md:block"
        style={{ height: wrapperHeight }}
        id="film-reel-section"
      >
        {/* Sticky viewport — the page locks here until all frames are scrolled */}
        <div className="sticky top-0 h-screen overflow-hidden bg-[#0a0a0a] flex flex-col justify-center">

          {/* Sprocket holes — top */}
          <SprocketStrip position="top" />

          {/* Film grain vignette overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-[5]"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)',
            }}
          />

          {/* Section header — inside sticky so it stays locked */}
          <div className="absolute top-8 left-0 right-0 z-20 text-center pointer-events-none">
            <p className="font-mono text-[#d4c97a] text-xs uppercase tracking-widest mb-2">
              CURATED APPLICATIONS
            </p>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-stone-100 tracking-tight">
              Selected Works
            </h2>
          </div>

          {/* Horizontal track */}
          <motion.div
            style={{ x: prefersReducedMotion ? trackX : smoothX, willChange: 'transform' }}
            className="flex flex-row items-center"
          >
            {/* Left padding — centers the first frame */}
            <div className="shrink-0" style={{ width: '25vw' }} />

            {projects.map((project, i) => (
              <div key={project.id} className="relative shrink-0 mx-6">
                {/* Film edge marking */}
                <span className="absolute -top-5 left-2 text-[10px] font-heading tracking-widest text-white/20 select-none pointer-events-none">
                  35MM · {String(i + 1).padStart(2, '0')}
                </span>

                {/* Frame */}
                <motion.div
                  className="relative aspect-[16/9] w-[50vw] overflow-hidden rounded-sm border border-white/5"
                  animate={
                    prefersReducedMotion
                      ? {
                          filter:
                            i === active
                              ? 'grayscale(0) brightness(1) contrast(1)'
                              : 'grayscale(1) brightness(0.5) contrast(0.75)',
                        }
                      : {
                          filter:
                            i === active
                              ? 'grayscale(0) brightness(1) contrast(1)'
                              : 'grayscale(1) brightness(0.5) contrast(0.75)',
                          scale: i === active ? 1.05 : 1,
                        }
                  }
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 0.4, ease: 'easeOut' }
                  }
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    draggable="false"
                  />

                  {/* Subtle frame overlay — darken inactive frames */}
                  {i !== active && (
                    <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                  )}
                </motion.div>

                {/* Frame number bottom marking */}
                <span className="absolute -bottom-5 right-2 text-[10px] font-heading tracking-widest text-white/15 select-none pointer-events-none">
                  ◄ {String(i + 1).padStart(2, '0')}A
                </span>
              </div>
            ))}

            {/* Right padding — centers the last frame */}
            <div className="shrink-0" style={{ width: '25vw' }} />
          </motion.div>

          {/* Sprocket holes — bottom */}
          <SprocketStrip position="bottom" />

          {/* ─── Details Panel ─── */}
          {/* INSIDE the sticky container with absolute positioning */}
          {/* so it stays locked to the viewport while pinned, */}
          {/* and scrolls away naturally when the section ends. */}
          {/* ─── Details Panel ─── */}
          {/* INSIDE the sticky container with absolute positioning */}
          {/* so it stays locked to the viewport while pinned, */}
          {/* and scrolls away naturally when the section ends. */}
          <motion.div
            style={{ opacity: detailsOpacity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[90vw] max-w-2xl text-center z-20 pointer-events-none"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.25 }}
                className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/5 rounded-sm px-6 py-5 pointer-events-auto"
              >
                {/* Role tag */}
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 block mb-1">
                  {currentProject.role}
                </span>

                {/* Title */}
                <h3 className="font-heading text-lg text-[#d4c97a] mb-1.5">
                  {currentProject.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-stone-400 leading-relaxed mb-2 max-w-lg mx-auto">
                  {currentProject.description}
                </p>

                {/* Tech stack */}
                <p className="text-xs font-mono text-white/30 mb-3">
                  {currentProject.tech.join(' · ')}
                </p>

                {/* Links */}
                <div className="flex gap-5 justify-center items-center">
                  {currentProject.githubLink && (
                    <a
                      href={currentProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-stone-500 hover:text-stone-100 transition-colors uppercase tracking-wider"
                      aria-label={`GitHub repository for ${currentProject.name}`}
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      GitHub
                    </a>
                  )}
                  {currentProject.liveLink && (
                    <a
                      href={currentProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-stone-500 hover:text-[#d4c97a] transition-colors uppercase tracking-wider"
                      aria-label={`Live demo for ${currentProject.name}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* ─── Scroll progress indicator ─── */}
          {/* Also INSIDE the sticky container — stays locked, doesn't leak */}
          <motion.div
            style={{ opacity: indicatorOpacity }}
            className="absolute top-1/2 right-6 -translate-y-1/2 z-20 flex flex-col gap-2 pointer-events-none"
          >
            {projects.map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 rounded-full"
                animate={{
                  height: i === active ? 20 : 8,
                  backgroundColor: i === active ? '#d4c97a' : 'rgba(255,255,255,0.15)',
                }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mobile: Vertical fallback — shown only on small screens */}
      <div className="block md:hidden">
        <MobileProjectStack projects={projects} />
      </div>
    </>
  );
}
