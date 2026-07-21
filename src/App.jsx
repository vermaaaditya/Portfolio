import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import NoiseOverlay from './components/NoiseOverlay';
import CircuitTrace from './components/CircuitTrace';
import Navbar from './components/Navbar';
import CommandPalette from './components/CommandPalette';
import ParallaxBackground from './components/ParallaxBackground';

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

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
