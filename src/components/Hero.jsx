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

  useEffect(() => {
    const interval = setInterval(() => {
      setLoss(l => +(l + (Math.random() - 0.5) * 0.0001).toFixed(6));
      setEpoch(e => e + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

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

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

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
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#d4c97a]/30 to-transparent pointer-events-none z-10 animate-scanline" />

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

      <div className="flex-1 flex w-full relative">

        <div className="w-full lg:w-[40%] flex flex-col justify-center px-8 md:px-12 py-20 lg:py-0 min-h-[85vh] lg:min-h-0 lg:border-r border-brand-border/40 relative z-20 bg-transparent lg:backdrop-blur-[6px] lg:bg-[#0a0a0a]/50 pointer-events-none lg:pointer-events-auto">
          <div className="absolute inset-0 z-0 opacity-[0.035] pointer-events-none mix-blend-overlay hidden lg:block">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <filter id="leftNoise">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#leftNoise)" />
            </svg>
          </div>

          <div className="relative z-10 max-w-lg pointer-events-auto">
            <div className="absolute -top-6 -left-4 text-stone-700 font-mono text-xs select-none">┌ [SYS_INIT]</div>

            <div className="mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] lg:drop-shadow-none">
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

            <div className="mb-10 min-h-[60px] border-l-2 border-[#d4c97a]/60 pl-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] lg:drop-shadow-none">
              <h2 className="text-xs md:text-sm font-sans font-medium tracking-tight text-stone-300 leading-relaxed max-w-md lg:text-stone-400">
                {typedText}
                <span className="inline-block w-[2px] h-4 bg-[#d4c97a] ml-1 align-middle cursor-blink" />
              </h2>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleScrollDown}
                className="bg-[#0a0a0a]/50 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none text-[#d4c97a] border border-[#d4c97a] px-6 py-3.5 font-mono text-xs uppercase tracking-widest hover:bg-[#d4c97a] hover:text-[#0a0a0a] transition-all cursor-pointer relative overflow-hidden group"
              >
                <span className="relative z-10">View Projects &darr;</span>
                <span className="absolute inset-0 bg-[#d4c97a]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-200" />
              </button>
              <a
                href="mailto:aadityaverma2824@gmail.com"
                className="bg-[#d4c97a] text-[#0a0a0a] border border-[#d4c97a] px-6 py-3.5 font-mono text-xs uppercase tracking-widest hover:bg-transparent hover:text-[#d4c97a] hover:bg-[#0a0a0a]/50 transition-all text-center relative overflow-hidden group"
              >
                <span className="relative z-10">Contact Me &rarr;</span>
                <span className="absolute inset-0 bg-transparent group-hover:bg-[#d4c97a]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-200" />
              </a>
            </div>

            <div className="absolute -bottom-10 -left-4 text-stone-700 font-mono text-xs select-none">└ [READY]</div>
          </div>
        </div>

        <div className="absolute inset-0 lg:relative w-full lg:w-[60%] h-full flex items-center justify-center overflow-hidden z-0 lg:z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/
