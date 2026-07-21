import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import NoiseOverlay from './components/NoiseOverlay';
import CircuitTrace from './components/CircuitTrace';
import Navbar from './components/Navbar';
import CommandPalette from './components/CommandPalette';
import ParallaxBackground from './components/ParallaxBackground';
import CyberTerminalModal from './components/CyberTerminalModal';
import { Terminal } from 'lucide-react';

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-200 antialiased overflow-x-clip relative">
      {/* Interactive Parallax Background & Cursor Glow Spotlight */}
      <ParallaxBackground />

      {/* Floating Glass Header Navbar */}
      <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

      {/* Global Terminal Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      {/* Interactive Mini Cyber Terminal Shell Modal */}
      <CyberTerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      {/* Floating Bottom-Right Cyber CLI Shell Launcher Button */}
      <button
        onClick={() => setIsTerminalOpen(true)}
        className="fixed bottom-6 right-6 z-30 bg-[#0e0e0e] hover:bg-[#141414] text-[#d4c97a] border border-[#d4c97a]/50 p-3 rounded-full shadow-[0_0_20px_rgba(212,201,122,0.2)] hover:shadow-[0_0_30px_rgba(212,201,122,0.4)] transition-all cursor-pointer group flex items-center gap-2"
        title="Open Interactive Cyber Terminal Shell (CLI)"
      >
        <Terminal className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        <span className="hidden md:inline font-mono text-[10px] font-bold uppercase tracking-wider pr-1">CLI</span>
      </button>

      {/* Premium film grain texture */}
      <NoiseOverlay />

      {/* Conditionally render Scroll SVG circuit trace on home page only */}
      {isHome && <CircuitTrace />}

      {/* Router views */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
