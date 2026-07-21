import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Command, Menu, X, Download, ArrowUpRight, Volume2 } from 'lucide-react';

export default function Navbar({ onOpenCommandPalette }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
      setScrolled(window.scrollY > 40);

      if (isHome) {
        const sections = [
          { id: 'hero-section', name: 'hero' },
          { id: 'path-skills', name: 'skills' },
          { id: 'about-section', name: 'about' },
          { id: 'film-reel-section', name: 'projects' },
          { id: 'path-cta', name: 'contact' }
        ];

        for (const sec of sections) {
          const el = document.getElementById(sec.id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
              setActiveSection(sec.name);
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    if (!isHome) {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: '// HERO', id: 'hero-section', key: 'hero' },
    { label: '// SKILLS', id: 'path-skills', key: 'skills' },
    { label: '// ABOUT', id: 'about-section', key: 'about' },
    { label: '// PROJECTS', id: 'film-reel-section', key: 'projects' },
    { label: '// CONTACT', id: 'path-cta', key: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#2a2a2a] shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
            : 'py-5 bg-transparent border-b border-transparent'
        }`}
      >
        {/* Solid Gold Top Scroll Progress Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/5 pointer-events-none">
          <div
            className="h-full bg-[#d4c97a] transition-all duration-150 ease-out shadow-[0_0_10px_#d4c97a]"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* Logo & Equalizer Waveform */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-stone-100 hover:text-[#d4c97a] transition-colors group cursor-pointer"
            >
              <div className="w-7 h-7 rounded-[3px] bg-[#161616] border border-[#333] group-hover:border-[#d4c97a] flex items-center justify-center text-[#d4c97a] transition-colors">
                <Terminal className="w-3.5 h-3.5" />
              </div>
              <span className="hidden sm:inline">AADITYA VERMA</span>
              <span className="text-[10px] text-stone-500 font-normal">v4.8</span>
            </Link>

            {/* Audio Waveform Equalizer Visualizer */}
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-[#121212] border border-[#2a2a2a] hover:border-[#d4c97a]/50 rounded-[3px] cursor-pointer transition-colors"
              title="Toggle Audio Visualizer Waveform"
            >
              <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudio ? 'text-[#d4c97a]' : 'text-stone-500'}`} />
              <div className="flex items-end gap-[2px] h-3.5 w-6">
                {[0.4, 0.9, 0.6, 1.0, 0.5].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={isPlayingAudio ? { height: ['20%', '100%', '40%', '90%', '20%'] } : { height: `${h * 100}%` }}
                    transition={isPlayingAudio ? { duration: 0.6 + i * 0.1, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
                    className="w-[3px] bg-[#d4c97a] rounded-full"
                  />
                ))}
              </div>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 font-mono text-xs uppercase tracking-wider">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => scrollToSection(link.id)}
                className={`transition-colors cursor-pointer relative py-1 ${
                  activeSection === link.key
                    ? 'text-[#d4c97a] font-bold'
                    : 'text-stone-400 hover:text-stone-100'
                }`}
              >
                {link.label}
                {activeSection === link.key && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#d4c97a] shadow-[0_0_8px_#d4c97a]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}

            {isHome && (
              <Link
                to="/projects"
                className="text-stone-400 hover:text-[#d4c97a] transition-colors flex items-center gap-1"
              >
                VAULT <ArrowUpRight className="w-3 h-3" />
              </Link>
            )}
          </nav>

          {/* Right Action Trigger Buttons */}
          <div className="flex items-center gap-3">
            {/* Ctrl+K Command Palette Badge */}
            <button
              onClick={onOpenCommandPalette}
              className="hidden sm:inline-flex items-center gap-2 bg-[#141414] hover:bg-[#1a1a1a] text-stone-300 hover:text-[#d4c97a] border border-[#2a2a2a] hover:border-[#d4c97a]/60 px-3 py-1.5 rounded-[4px] font-mono text-[11px] uppercase tracking-wider transition-all cursor-pointer shadow-sm group"
              title="Open Command Palette (Ctrl+K)"
            >
              <Command className="w-3.5 h-3.5 text-[#d4c97a] group-hover:rotate-12 transition-transform" />
              <span>COMMAND</span>
              <kbd className="hidden lg:inline-block bg-[#222] text-stone-400 px-1.5 py-0.5 text-[9px] rounded font-mono border border-stone-700">
                ⌘K
              </kbd>
            </button>

            {/* CV Download CTA */}
            <a
              href="/assets/AadityaCV.pdf"
              download
              className="bg-[#d4c97a] text-[#0a0a0a] hover:bg-stone-100 font-mono text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-[3px] transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#0a0a0a]" />
              <span className="hidden sm:inline">RESUME</span>
            </a>

            {/* Mobile Menu Toggle button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-stone-300 hover:text-stone-100 p-1.5 rounded-[3px] bg-[#141414] border border-[#2a2a2a]"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#d4c97a]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] bg-[#0d0d0d]/95 backdrop-blur-xl border-b border-[#2a2a2a] z-30 p-6 flex flex-col gap-4 font-mono text-sm uppercase tracking-wider md:hidden shadow-2xl"
          >
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => scrollToSection(link.id)}
                className={`text-left py-2 border-b border-white/5 flex justify-between items-center ${
                  activeSection === link.key ? 'text-[#d4c97a] font-bold' : 'text-stone-300'
                }`}
              >
                <span>{link.label}</span>
                {activeSection === link.key && (
                  <span className="w-2 h-2 rounded-full bg-[#d4c97a]" />
                )}
              </button>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommandPalette();
              }}
              className="w-full mt-2 bg-[#161616] text-[#d4c97a] border border-[#d4c97a]/40 py-3 rounded-[3px] flex items-center justify-center gap-2 font-bold"
            >
              <Command className="w-4 h-4" />
              OPEN COMMAND PALETTE (CTRL+K)
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
