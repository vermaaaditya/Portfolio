import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import NoiseOverlay from './components/NoiseOverlay';
import CircuitTrace from './components/CircuitTrace';

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-200 antialiased overflow-x-hidden relative">
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
