import React from 'react';
import { motion } from 'framer-motion';
import VinylPlayer from './VinylPlayer';

export default function AboutDesk() {
  const roles = [
    "Co-Founder & President @ AUTONEX",
    "Google Student Ambassador 2026",
    "Training & Placement Coordinator",
    "2nd Year B.Tech CSE (AI/ML) @ SIET"
  ];

  return (
    <section className="relative w-full max-w-5xl mx-auto my-24 px-6 select-none z-10">
      {/* Frame border background shadow */}
      <div className="absolute inset-0 bg-[#0d0d0d] border-4 border-brand-border translate-x-3 translate-y-3 z-0" />

      {/* Main Card Frame with Glassmorphism */}
      <div className="relative project-glass border border-white/10 rounded-[4px] p-8 md:p-12 z-10 flex flex-col md:flex-row gap-10 items-center">
        
        {/* Desk Portrait Image Container */}
        <div className="relative shrink-0 z-20">
          <motion.div
            whileHover={{ rotate: 0, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="relative w-64 h-64 md:w-80 md:h-80 bg-[#0a0a0a] border-4 border-brand-border shadow-2xl overflow-hidden -rotate-[2deg] cursor-pointer"
          >
            <img 
              src="/assets/aaditya_portrait.png" 
              alt="Aaditya Verma Desk Portrait" 
              className="w-full h-full object-cover filter grayscale contrast-115 hover:grayscale-0 transition-all duration-300"
            />
            {/* Inner frame shadow */}
            <div className="absolute inset-0 border-2 border-[#111] pointer-events-none" />
          </motion.div>

          <VinylPlayer />
        </div>

        {/* Text Contents */}
        <div className="flex-grow flex flex-col justify-center text-center md:text-left">
          <p className="font-mono text-[#d4c97a] text-xs uppercase tracking-widest mb-2">
            SECURE DESK TRANSCRIPT
          </p>
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-stone-100 tracking-tight mb-4">
            From the Desk of Aaditya Verma
          </h2>
          
          <blockquote className="text-stone-300 font-sans leading-relaxed text-sm md:text-base border-l-2 md:border-l-4 border-brand-border md:pl-6 pl-0 italic mb-8 max-w-2xl text-justify">
            "I build software that automates the boring stuff and systems that scale. As an CSE AI/ML student, I split my time training classifiers and engineering clean, high-performance web applications. I write code AI-natively, ship fast, and build club communities that survive the compiler. If it's worth shipping, it's worth building robustly."
          </blockquote>

          {/* Role tags layout */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {roles.map((role, idx) => (
              <span
                key={idx}
                className="bg-[#161616] border border-[#2a2a2a] text-stone-300 font-mono text-[11px] md:text-xs py-1.5 px-3 uppercase tracking-wider shadow-sm"
              >
                {role}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
