import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Terminal as TerminalIcon, FileText, ExternalLink, Sparkles } from 'lucide-react';
import TiltCard from './TiltCard';

export default function TerminalBentoSection() {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState([
    { cmd: 'whoami', output: 'Aaditya Verma — CSE (AI/ML) Student & Full-Stack Developer' },
    { 
      cmd: 'cat about.json', 
      output: `{\n  "location": "Panchkula, Haryana, India",\n  "education": "2nd Year B.Tech CSE (AI/ML) — SIET",\n  "roles": ["AUTONEX President", "TPO Coordinator"],\n  "passion": "Building AI-native apps that scale",\n  "status": "Shipping & Automating"\n}`
    },
    { cmd: 'ls skills/', output: 'React · Node.js · Python · Supabase · Flask · PyTorch · Tailwind' },
    { cmd: 'echo $MOTTO', output: '"If it\'s worth shipping, it\'s worth building robustly."' }
  ]);
  const [celebration, setCelebration] = useState(false);
  const terminalLogsRef = useRef(null);

  useEffect(() => {
    if (terminalLogsRef.current) {
      terminalLogsRef.current.scrollTop = terminalLogsRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommand = (e) => {
    if (e.key !== 'Enter') return;
    const trimmed = input.trim().toLowerCase();
    if (!trimmed) return;

    let res = '';
    if (trimmed === 'help') {
      res = 'Commands: whoami, cat about.json, ls skills, cat resume, sudo hire, contact, clear';
    } else if (trimmed === 'cat resume' || trimmed === 'resume') {
      res = 'Downloading Aaditya_Verma_CV.pdf...';
      setTimeout(() => {
        const a = document.createElement('a');
        a.href = '/assets/AadityaCV.pdf';
        a.download = 'Aaditya_Verma_CV.pdf';
        a.click();
      }, 400);
    } else if (trimmed === 'sudo hire' || trimmed === 'hire') {
      setCelebration(true);
      res = '🎉 SUDO HIRE GRANTED! Offer accepted. Let\'s build something epic.';
      setTimeout(() => setCelebration(false), 3500);
    } else if (trimmed === 'contact' || trimmed === 'email') {
      res = 'Opening email client (aadityaverma2824@gmail.com)...';
      setTimeout(() => {
        window.location.href = 'mailto:aadityaverma2824@gmail.com';
      }, 500);
    } else if (trimmed === 'clear') {
      setLogs([]);
      setInput('');
      return;
    } else {
      res = `zsh: command not found: ${trimmed}. Type 'help' for available commands.`;
    }

    setLogs(prev => [...prev, { cmd: trimmed, output: res }]);
    setInput('');
  };

  return (
    <section className="relative w-full max-w-5xl mx-auto my-20 px-6 select-none font-mono z-10">
      
      {/* Anchor Point for Circuit Trace */}
      <div id="path-bento" className="w-3 h-3 bg-[#d4c97a] rotate-45 border border-[#0a0a0a] absolute -top-10 left-1/2 -translate-x-1/2 z-20 shadow-[0_0_10px_#d4c97a]" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left 6 Columns: Interactive Embedded macOS Terminal Window */}
        <div className="lg:col-span-6 flex flex-col h-full">
          <TiltCard maxTilt={4} scale={1.01} className="h-full flex flex-col">
            <div className="bg-[#0e0e0e] border border-[#2a2a2a] hover:border-[#d4c97a]/40 rounded-[8px] overflow-hidden flex flex-col justify-between h-full shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-colors">
              
              {/* Window Header Bar */}
              <div className="bg-[#161616] border-b border-[#222] px-4 py-3 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="text-[11px] text-stone-400 font-bold ml-2">
                    aaditya@portfolio:~
                  </span>
                </div>
                <div className="text-[9px] text-[#d4c97a] uppercase tracking-widest font-semibold flex items-center gap-1">
                  <TerminalIcon className="w-3 h-3" />
                  <span>INTERACTIVE CLI</span>
                </div>
              </div>

              {/* Terminal Log Output Area */}
              <div 
                ref={terminalLogsRef} 
                className="p-5 flex-1 min-h-[300px] overflow-y-auto space-y-4 text-xs terminal-scrollbar bg-[#080808]"
              >
                {celebration && (
                  <div className="bg-[#d4c97a] text-[#0a0a0a] p-2 text-center font-bold text-xs rounded animate-bounce">
                    <Sparkles className="w-4 h-4 inline mr-1" />
                    🎉 SUDO HIRE GRANTED! OFFER ACCEPTED 🎉
                  </div>
                )}

                {logs.map((log, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center gap-2 text-[#d4c97a] font-bold">
                      <span>&gt;</span>
                      <span>{log.cmd}</span>
                    </div>
                    <div className="text-stone-300 pl-4 whitespace-pre-wrap leading-relaxed font-sans text-[11px]">
                      {log.output}
                    </div>
                  </div>
                ))}
              </div>

              {/* Terminal Active Prompt Input Line */}
              <div className="px-4 py-3.5 bg-[#121212] border-t border-[#222] flex items-center gap-2 text-xs shrink-0">
                <span className="text-[#d4c97a] font-bold">&gt;</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleCommand}
                  placeholder="type 'cat resume' or 'sudo hire'..."
                  className="flex-1 bg-transparent text-stone-100 placeholder-stone-600 focus:outline-none font-mono"
                />
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Right 6 Columns: Editorial Narrative & Stats Bento Grid */}
        <div className="lg:col-span-6 flex flex-col gap-6 justify-between h-full">
          
          {/* Top Editorial Narrative Card */}
          <TiltCard maxTilt={4} scale={1.01} className="flex-1">
            <div className="project-glass bg-[#0e0e0e]/90 border border-white/10 hover:border-[#d4c97a]/40 p-6 md:p-8 rounded-[8px] shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-all h-full flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-stone-100 tracking-tight mb-3 leading-tight">
                Building systems, <br />
                <span className="italic text-[#d4c97a] font-light">one line at a time</span>
              </h2>
              <p className="font-sans text-xs md:text-sm text-stone-300 leading-relaxed text-justify mb-4">
                I'm a 2nd year Computer Science student specializing in <strong className="text-stone-100 font-mono">AI/ML</strong> at SIET Panchkula. I split my time between training deep neural classifiers and engineering clean, automated web applications.
              </p>
              <p className="font-sans text-xs md:text-sm text-stone-400 leading-relaxed text-justify">
                As <strong className="text-[#d4c97a] font-mono">AUTONEX Robotics Club President</strong> and TPO Skill Coordinator, I thrive on challenges that push technical precision into high-impact user experiences.
              </p>
            </div>
          </TiltCard>

          {/* Bottom Row: Stats Card & Download Resume CTA Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Stats Summary Card */}
            <TiltCard maxTilt={6} scale={1.02} className="h-full">
              <div className="bg-[#0e0e0e] border border-[#2a2a2a] hover:border-[#d4c97a]/40 p-6 rounded-[8px] flex flex-col justify-between h-full shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all">
                <div className="space-y-3">
                  <div>
                    <div className="text-2xl md:text-3xl font-heading font-extrabold text-[#d4c97a]">6+</div>
                    <div className="text-[10px] text-stone-500 uppercase tracking-widest">SHIPPED PROJECTS</div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-heading font-extrabold text-stone-100">15+</div>
                    <div className="text-[10px] text-stone-500 uppercase tracking-widest">TECHNOLOGIES</div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-heading font-extrabold text-emerald-400 italic">3rd</div>
                    <div className="text-[10px] text-stone-500 uppercase tracking-widest">HACKATHON WINNER</div>
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* Interactive Download Resume Card */}
            <TiltCard maxTilt={6} scale={1.02} className="h-full">
              <a
                href="/assets/AadityaCV.pdf"
                download
                className="bg-[#121212] hover:bg-[#181818] border border-[#d4c97a]/40 hover:border-[#d4c97a] p-6 rounded-[8px] flex flex-col items-center justify-center text-center h-full group shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-[#1c1c1c] border border-[#d4c97a] text-[#d4c97a] group-hover:bg-[#d4c97a] group-hover:text-[#0a0a0a] flex items-center justify-center mb-4 transition-all duration-300 shadow-[0_0_15px_rgba(212,201,122,0.2)]">
                  <Download className="w-6 h-6 group-hover:translate-y-0.5 transition-transform" />
                </div>
                <span className="text-[10px] text-stone-400 uppercase tracking-widest mb-1 group-hover:text-stone-200">
                  GRAB A COPY
                </span>
                <span className="font-heading font-bold text-base md:text-lg text-stone-100 group-hover:text-[#d4c97a] transition-colors">
                  Download Resume
                </span>
              </a>
            </TiltCard>

          </div>
        </div>

      </div>
    </section>
  );
}
