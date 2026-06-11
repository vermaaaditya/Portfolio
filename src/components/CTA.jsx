import React from 'react';
import { motion } from 'framer-motion';
import { Mail, FileText, ArrowUpRight } from 'lucide-react';

// Custom inline SVG icons to replace removed Lucide brand icons
const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.2 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function CTA() {
  const socialLinks = [
    {
      name: 'GitHub',
      icon: <GithubIcon className="w-5 h-5" />,
      url: 'https://github.com/vermaaaditya'
    },
    {
      name: 'LinkedIn',
      icon: <LinkedinIcon className="w-5 h-5" />,
      url: 'https://linkedin.com/in/aadityaverma2824'
    },
    {
      name: 'Download CV',
      icon: <FileText className="w-5 h-5" />,
      url: '/assets/AadityaCV.pdf',
      download: true
    }
  ];

  return (
    <section className="relative w-full py-28 px-6 flex flex-col justify-center items-center text-center select-none z-10">
      
      {/* Circuit Path End Anchor Point */}
      <div className="relative mb-8 flex flex-col items-center">
        <div id="path-cta" className="w-3.5 h-3.5 bg-[#d4c97a] border-2 border-brand-bg rotate-45 mb-4 z-20" />
        <div className="w-0.5 h-8 border-l border-dashed border-stone-850" />
      </div>

      {/* Subtext */}
      <p className="font-mono text-[#d4c97a] text-xs md:text-sm uppercase tracking-[0.25em] mb-4 opacity-80">
        AVAILABLE FOR COLLABORATIONS
      </p>

      {/* Headline */}
      <h2 className="text-4xl md:text-7xl font-heading font-bold uppercase tracking-tighter text-stone-100 max-w-4xl leading-[0.9] mb-10">
        Let's Build <br /> Something.
      </h2>

      {/* Main Mailto CTA Button */}
      <motion.a
        href="mailto:aadityaverma2824@gmail.com"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex items-center gap-3 bg-[#d4c97a] text-[#0a0a0a] border-3 border-stone-100 font-heading font-extrabold uppercase tracking-wide text-base md:text-lg px-10 py-5 transition-all duration-300 hover:bg-[#0a0a0a] hover:text-[#d4c97a] hover:border-[#d4c97a] shadow-lg cursor-pointer mb-12"
      >
        Get in Touch
        <Mail className="w-5 h-5 shrink-0" />
      </motion.a>

      {/* Social and CV buttons */}
      <div className="flex flex-wrap justify-center gap-4 max-w-lg mb-16">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            download={link.download}
            className="inline-flex items-center gap-2 bg-[#111111] hover:bg-[#1a1a1a] text-stone-300 hover:text-stone-100 font-mono text-xs uppercase tracking-wider border-2 border-brand-border px-4 py-2.5 transition-colors cursor-pointer"
          >
            {link.icon}
            <span>{link.name}</span>
            {!link.download && <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />}
          </a>
        ))}
      </div>

      {/* Footer copyright */}
      <div className="border-t border-[#1a1a1a] pt-8 w-full max-w-xl text-stone-600 font-mono text-[10px] uppercase tracking-widest">
        &copy; 2026 Aaditya Verma. Built AI-Native. All rights reserved.
      </div>
    </section>
  );
}
