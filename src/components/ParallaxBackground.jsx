import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const floatingElements = [
  { text: "01000001 01010110", top: "15%", left: "8%", speed: 0.15 },
  { text: "[sys_kernel_v4.8]", top: "28%", left: "85%", speed: -0.1 },
  { text: "weights.bin // 99.8%", top: "45%", left: "5%", speed: 0.18 },
  { text: "fn infer_disease()", top: "62%", left: "88%", speed: -0.15 },
  { text: "CHEERIO_SCRAPER_OK", top: "78%", left: "10%", speed: 0.12 },
  { text: "0x7F8C4A // SUPABASE", top: "90%", left: "82%", speed: -0.08 },
];

export default function ParallaxBackground() {
  const spotlightRef = useRef(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    let animationFrameId;
    const handleMouseMove = (e) => {
      animationFrameId = requestAnimationFrame(() => {
        if (spotlightRef.current) {
          spotlightRef.current.style.transform = `translate3d(${e.clientX - 300}px, ${e.clientY - 300}px, 0)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* GPU Accelerated Direct DOM Spotlight (Zero React Re-renders) */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-15 mix-blend-screen will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(212,201,122,0.15) 0%, rgba(99,102,241,0.05) 45%, transparent 70%)',
          transform: 'translate3d(-300px, -300px, 0)'
        }}
      />

      {/* Floating Parallax Sci-Fi Text Elements */}
      {floatingElements.map((el, idx) => {
        const y = useTransform(scrollY, (value) => value * el.speed);
        return (
          <motion.div
            key={idx}
            style={{ y, top: el.top, left: el.left }}
            className="absolute font-mono text-[10px] text-stone-700/30 uppercase tracking-widest hidden lg:block will-change-transform"
          >
            {el.text}
          </motion.div>
        );
      })}
    </div>
  );
}
