import React, { useEffect, useState, Suspense, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const fullText = "Computer Science and AI/ML Student building intelligent projects and scalable solutions.";

  const [isLoading, setIsLoading] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);
  const [bootStatus, setBootStatus] = useState("Initializing kernel...");

  const [loss, setLoss] = useState(0.0034);
  const [epoch, setEpoch] = useState(2048);
  const [logs, setLogs] = useState([]);
  const [mouseCoords, setMouseCoords] = useState({ x: '0.0000', y: '0.0000' });
  const splineAppRef = useRef(null);
  const terminalRef = useRef(null);

  // Typing effect hook
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  // Loader progress ticker simulation
  useEffect(() => {
    if (!isLoading) {
      setBootProgress(100);
      setBootStatus("Render initialized.");
      return;
    }

    let progress = 0;
    const statusMsgs = [
      { threshold: 0, text: "Initializing kernel..." },
      { threshold: 20, text: "Mapping hardware acceleration..." },
      { threshold: 45, text: "Compiling GLSL vertex shaders..." },
      { threshold: 70, text: "Fetching neural weights..." },
      { threshold: 88, text: "Building mesh geometry..." }
    ];

    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 5) + 2;
      if (progress >= 99) {
        progress = 99;
        clearInterval(interval);
      }
      setBootProgress(progress);

      const msg = [...statusMsgs].reverse().find(m => progress >= m.threshold);
      if (msg) setBootStatus(msg.text);
    }, 80);

    return () => clearInterval(interval);
  }, [isLoading]);

  // Diagnostics simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setLoss(l => +(l + (Math.random() - 0.5) * 0.0001).toFixed(6));
      setEpoch(e => e + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Live Terminal Logs simulator
  useEffect(() => {
    const bootLogs = [
      "[sys] kernel version 4.0.9 loading...",
      "[sys] webgl2 standard context established.",
      "[sys] vertex shaders compiled successfully.",
      "[sys] mapping neural network layers: [512, 1024, 256]",
      "[sys] synaptic node connections active (n=14,200).",
      "[sys] training status: running feedforward."
    ];

    bootLogs.forEach((log, idx) => {
      setTimeout(() => {
        setLogs(prev => [...prev, log]);
      }, idx * 500);
    });

    let logCounter = 2048;
    const interval = setInterval(() => {
      logCounter++;
      const trainLoss = (0.0034 + (Math.random() - 0.5) * 0.0002).toFixed(6);
      const accuracy = (99.80 + Math.random() * 0.05).toFixed(2);
      const randomLogs = [
        `[train] Epoch ${logCounter} - loss: ${trainLoss} - acc: ${accuracy}%`,
        `[sys] backpropagation computed in ${Math.floor(Math.random() * 8) + 4}ms`,
        `[gpu] vram: ${(17.8 + Math.random() * 0.5).toFixed(1)}GB/24GB - temp: ${Math.floor(68 + Math.random() * 5)}°C`
      ];
      const newLog = randomLogs[Math.floor(Math.random() * randomLogs.length)];
      setLogs(prev => {
        const next = [...prev, newLog];
        if (next.length > 50) next.shift();
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll logs terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  // Mouse coordinates logger
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = ((e.clientX / window.innerWidth) * 200 - 100).toFixed(4);
      const y = (((window.innerHeight - e.clientY) / window.innerHeight) * 200 - 100).toFixed(4);
      setMouseCoords({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleLoad = (splineApp) => {
    splineAppRef.current = splineApp;
    setIsLoading(false);
  };

  const handleScrollDown = () => {
    const nextSection = document.getElementById('path-skills')?.closest('section');
    if (nextSection) {
      const projectsSection = nextSection.nextElementSibling?.nextElementSibling;
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="hero-section"
      className="relative min-h-screen w-full flex flex-col bg-[#0a0a0a] hud-grid overflow-hidden select-none border-b border-brand-border/40"
    >
      {/* Immersive Sci-Fi Grid Overlay Scanline */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#d4c97a]/30 to-transparent pointer-events-none z-10 animate-scanline" />

      {/* 1. TOP HEADER STATUS BAR */}
      <div className="w-full border-b border-brand-border/40 py-2.5 px-6 flex justify-between items-center text-[9px] font-mono text-stone-500 uppercase tracking-widest relative z-30 pointer-events-none bg-[#0a0a0a]/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
          <span>AV_PORTFOLIO // V4.6.9</span>
        </div>
        <div className="hidden md:block text-stone-600">
          [ ENGINE: WEBGL_SPLINE_MESH_CORE ]
        </div>
        <div>
          X: {mouseCoords.x} / Y: {mouseCoords.y}
        </div>
      </div>

      {/* MAIN IMMERSIVE AREA */}
      <div className="relative flex-1 w-full flex items-center justify-center">

        {/* 2. BACKGROUND: 3D SPLINE CANVAS (Full width, fully interactive) */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-auto">
          {/* Radial thematic glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,rgba(168,85,247,0.04)_45%,transparent_80%)] pointer-events-none z-0" />
          
          <div className="w-full h-full max-w-[1200px] flex items-center justify-center relative z-10">
            <Suspense fallback={null}>
              <Spline
                scene="https://prod.spline.design/Fm-tD6aRlFY63N5H/scene.splinecode"
                className="w-full h-full relative z-10 scale-[1.1] md:scale-100"
                onLoad={handleLoad}
              />
            </Suspense>
          </div>
        </div>

        {/* 3. FOREGROUND: BRANDING & COPY (Overlays the 3D model) */}
        {/* pointer-events-none ensures you can drag the 3D brain right through the text */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center pointer-events-none mt-12 md:mt-0">
          
          <div className="max-w-xl relative">
            <div className="absolute -top-6 -left-4 text-stone-700 font-mono text-xs select-none">┌ [SYS_INIT]</div>

            {/* Header Typography with slight drop shadow for legibility over the glowing brain */}
            <div className="mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-heading font-extrabold text-5xl md:text-7xl lg:text-8xl text-stone-100 uppercase tracking-tighter leading-none"
              >
                AADITYA
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="font-heading font-light text-5xl md:text-7xl lg:text-8xl text-stone-300 uppercase tracking-tighter leading-none opacity-80"
              >
                VERMA
              </motion.h1>
            </div>

            {/* Dynamic typing bio */}
            <div className="mb-10 min-h-[60px] border-l-2 border-[#d4c97a]/60 pl-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              <h2 className="text-xs md:text-sm font-sans font-medium tracking-tight text-stone-300 leading-relaxed max-w-md">
                {typedText}
                <span className="inline-block w-[2px] h-4 bg-[#d4c97a] ml-1 align-middle cursor-blink" />
              </h2>
            </div>

            {/* Brutalist CTAs (pointer-events-auto so they can still be clicked!) */}
            <div className="flex flex-wrap gap-4 pointer-events-auto">
              <button
                onClick={handleScrollDown}
                className="bg-[#0a0a0a]/50 backdrop-blur-sm text-[#d4c97a] border border-[#d4c97a] px-6 py-3.5 font-mono text-xs uppercase tracking-widest hover:bg-[#d4c97a] hover:text-[#0a0a0a] transition-all cursor-pointer relative overflow-hidden group"
              >
                <span className="relative z-10">View Projects &darr;</span>
                <span className="absolute inset-0 bg-[#d4c97a]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-200" />
              </button>
              <a
                href="mailto:aadityaverma2824@gmail.com"
                className="bg-[#d4c97a] text-[#0a0a0a] border border-[#d4c97a] px-6 py-3.5 font-mono text-xs uppercase tracking-widest hover:bg-transparent hover:text-[#d4c97a] hover:bg-[#0a0a0a]/50 hover:backdrop-blur-sm transition-all text-center relative overflow-hidden group"
              >
                <span className="relative z-10">Contact Me &rarr;</span>
                <span className="absolute inset-0 bg-transparent group-hover:bg-[#d4c97a]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-200" />
              </a>
            </div>

            <div className="absolute -bottom-10 -left-4 text-stone-700 font-mono text-xs select-none">└ [READY]</div>
          </div>
        </div>

        {/* 4. HUD WIDGETS */}
        {/* TELEMETRY WIDGET */}
        <div className="absolute top-4 right-4 z-20 project-glass p-3 font-mono text-[9px] text-stone-400 border border-brand-border/40 w-[170px] pointer-events-auto hidden lg:block">
          <div className="text-[#d4c97a] font-bold border-b border-brand-border/40 pb-1 mb-1.5 flex justify-between items-center text-[10px]">
            <span>DIAGNOSTICS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between"><span>MODEL:</span><span className="text-stone-200">BRAIN-MESH</span></div>
            <div className="flex justify-between"><span>SHADERS:</span><span className="text-stone-200">GLSL-3D</span></div>
            <div className="flex justify-between"><span>LOSS:</span><span className="text-rose-400 font-bold">{loss.toFixed(6)}</span></div>
            <div className="flex justify-between"><span>EPOCH:</span><span className="text-stone-200 font-bold">{epoch}</span></div>
            <div className="flex justify-between"><span>STATUS:</span><span className="text-emerald-400">OPTIMIZING</span></div>
          </div>
        </div>

        {/* SIMULATED TRAINING LOGS TERMINAL */}
        <div className="absolute bottom-4 left-4 z-20 project-glass p-3 font-mono text-[9px] text-stone-400 border border-brand-border/40 w-[240px] h-[95px] flex flex-col justify-between pointer-events-auto hidden lg:flex">
          <div className="text-[#d4c97a] font-bold border-b border-brand-border/40 pb-1 mb-1 flex justify-between items-center text-[10px]">
            <span>TRAINING FEED</span>
            <span className="text-[7.5px] text-stone-500 uppercase">SYS_LOG</span>
          </div>
          <div ref={terminalRef} className="flex-1 overflow-y-auto terminal-scrollbar space-y-0.5 pr-1 text-stone-400">
            {logs.map((log, idx) => (
              <div key={idx} className="whitespace-nowrap overflow-hidden text-ellipsis leading-tight text-left">
                {log}
              </div>
            ))}
          </div>
        </div>

        {/* INTERACTION STATUS WIDGET */}
        <div className="absolute bottom-4 right-4 z-20 project-glass p-3 font-mono text-[9px] text-stone-400 border border-brand-border/40 w-[150px] flex flex-col gap-1.5 pointer-events-auto hidden lg:flex">
          <div className="text-[#d4c97a] font-bold border-b border-brand-border/40 pb-1.5 mb-0.5 flex justify-between items-center text-[10px]">
            <span>INTERFACE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between"><span>AUTO-SPIN:</span><span className="text-emerald-400 font-bold font-mono">ACTIVE</span></div>
            <div className="flex justify-between"><span>DRAG-ORBIT:</span><span className="text-stone-200">ENABLED</span></div>
            <div className="flex justify-between"><span>HOVER-DEFORM:</span><span className="text-stone-200">ENABLED</span></div>
          </div>
        </div>

      </div>

      {/* 5. SCROLL DOWN TRACK INDICATOR */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none hidden lg:flex">
        <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-stone-500 mb-1.5 drop-shadow-md">
          ACTIVATE_SCROLL
        </span>
        <div className="w-0.5 h-6 bg-[#d4c97a]/20 relative overflow-hidden">
          <motion.div
            animate={{ y: [-24, 24] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-[#d4c97a]"
          />
        </div>
      </div>

      {/* 6. S-CURVE CIRCUIT PATH START POINT NODE */}
      <div
        id="path-hero-start"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#d4c97a] rotate-45 border border-[#0a0a0a] z-20"
      />

      {/* 7. CUSTOM SCI-FI BOOT SCREEN LOADER */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 bg-[#0a0a0a] z-50 flex flex-col items-center justify-center font-mono pointer-events-auto"
          >
            <div className="absolute inset-0 hud-grid opacity-20 pointer-events-none" />
            <div className="relative p-7 border border-brand-border project-glass max-w-sm w-full mx-4 flex flex-col items-center">
              <div className="w-12 h-12 border border-stone-800 border-t-[#d4c97a] rounded-full animate-spin mb-6" />
              <h3 className="text-xs uppercase text-stone-400 tracking-[0.2em] mb-2 font-bold">NEURAL BOOT SEQUENCE</h3>
              <div className="w-full h-1 bg-stone-900 border border-brand-border/40 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-[#d4c97a] transition-all duration-150 ease-out"
                  style={{ width: `${bootProgress}%` }}
                />
              </div>
              <div className="flex justify-between w-full text-[9px] text-stone-500 mb-1.5">
                <span>STATUS_CODE:</span>
                <span className="text-stone-300 font-bold">{bootProgress}%</span>
              </div>
              <div className="text-[8px] text-[#d4c97a] h-4 uppercase tracking-wider text-center font-bold">
                &gt; {bootStatus}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
