import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Minimize2, Maximize2, Sparkles, Check, Copy } from 'lucide-react';

export default function CyberTerminalModal({ isOpen, onClose }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'sys', text: 'AV_OS [Version 4.8.0]' },
    { type: 'sys', text: 'Type "help" to view available terminal commands.' },
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [celebration, setCelebration] = useState(false);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdStr) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    // Add to command history
    setCommandHistory(prev => [...prev, cmdStr]);
    setHistoryIndex(-1);

    const newLogs = [{ type: 'user', text: `guest@aadityaverma:~$ ${cmdStr}` }];

    switch (trimmed) {
      case 'help':
        newLogs.push({
          type: 'res',
          text: `AVAILABLE COMMANDS:
  help             - Show this help menu
  ls               - List sections and directories
  ls projects      - List all shipped applications
  cat resume       - Display summary & download resume
  cat bio          - Display engineer biography
  sudo hire        - Trigger secret hiring celebration
  contact          - Send an email / open contact info
  clear            - Clear the terminal screen
  whoami           - Display guest session info
  exit             - Close the terminal shell`
        });
        break;

      case 'ls':
        newLogs.push({
          type: 'res',
          text: `drwxr-xr-x  projects/
drwxr-xr-x  skills/
drwxr-xr-x  about/
-rw-r--r--  resume.txt
-rw-r--r--  bio.md
-rwxr-xr-x  contact.sh`
        });
        break;

      case 'ls projects':
      case 'projects':
        newLogs.push({
          type: 'res',
          text: `SHIPPED APPLICATIONS:
  1. Internly         [Full-Stack Scraping Engine & Kanban]
  2. KrishiVision     [3rd Place Hackathon AI Crop Disease Identifier]
  3. SIET TPO Portal  [Production Institutional Web App]
  4. SIET Main Site   [Official College Website]
  5. AUTONEX Portal   [Robotics Club Web Portal]
  6. NorthJobs        [Government Recruitment Notice Aggregator]`
        });
        break;

      case 'cat resume':
      case 'cat resume.txt':
      case 'resume':
        newLogs.push({
          type: 'res',
          text: `Aaditya Verma — B.Tech CSE (AI/ML) Student & Full-Stack Engineer
Skills: React, Node.js, Python, Flask, Supabase, Tailwind, Scraping
Downloading resume...`
        });
        setTimeout(() => {
          const a = document.createElement('a');
          a.href = '/assets/AadityaCV.pdf';
          a.download = 'Aaditya_Verma_CV.pdf';
          a.click();
        }, 500);
        break;

      case 'cat bio':
      case 'cat bio.md':
      case 'bio':
        newLogs.push({
          type: 'res',
          text: `"I build software that automates the boring stuff and systems that scale. As a CSE AI/ML student at SIET Panchkula, I train neural classifiers and build robust full-stack applications. President of AUTONEX Robotics Club."`
        });
        break;

      case 'sudo hire':
      case 'hire':
        setCelebration(true);
        newLogs.push({
          type: 'success',
          text: `[SUDO_ACCESS_GRANTED]
🎉 OFFER ACCEPTED! Thank you for considering Aaditya Verma!
Initiating contract & scheduling onboarding meeting...`
        });
        setTimeout(() => setCelebration(false), 4000);
        break;

      case 'contact':
      case 'email':
        newLogs.push({
          type: 'res',
          text: `Email: aadityaverma2824@gmail.com
GitHub: github.com/vermaaaditya
LinkedIn: linkedin.com/in/aadityaverma2824
Opening default email client...`
        });
        setTimeout(() => {
          window.location.href = 'mailto:aadityaverma2824@gmail.com';
        }, 800);
        break;

      case 'whoami':
        newLogs.push({
          type: 'res',
          text: `User: guest@portfolio-session
Role: Recruiter / Engineer Visitor
Permissions: Read, Execute, Hire`
        });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
        onClose();
        setInput('');
        return;

      default:
        newLogs.push({
          type: 'err',
          text: `zsh: command not found: ${trimmed}. Type "help" for a list of available commands.`
        });
        break;
    }

    setHistory(prev => [...prev, ...newLogs]);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInput(commandHistory[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIndex(nextIdx);
          setInput(commandHistory[nextIdx]);
        } else {
          setHistoryIndex(-1);
          setInput('');
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none font-mono"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl bg-[#0a0a0a] border border-[#d4c97a]/50 rounded-[6px] shadow-[0_0_50px_rgba(212,201,122,0.15)] overflow-hidden relative"
        >
          {/* Easter Egg Celebration Banner */}
          {celebration && (
            <div className="bg-[#d4c97a] text-[#0a0a0a] px-4 py-2 text-center text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 animate-bounce">
              <Sparkles className="w-4 h-4" />
              🎉 SUDO HIRE ACTIVATED! OFFER ACCEPTED 🎉
            </div>
          )}

          {/* Terminal Window Bar */}
          <div className="bg-[#141414] border-b border-[#262626] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5 mr-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block cursor-pointer" onClick={onClose} />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <Terminal className="w-4 h-4 text-[#d4c97a]" />
              <span className="text-xs font-bold text-stone-200 uppercase tracking-wider">
                bash - guest@aadityaverma:~
              </span>
            </div>
            <button onClick={onClose} className="text-stone-400 hover:text-stone-100 p-1">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Terminal Output Log Area */}
          <div className="p-4 md:p-6 h-[340px] overflow-y-auto space-y-2 text-xs terminal-scrollbar bg-[#080808]">
            {history.map((item, i) => (
              <div key={i} className="whitespace-pre-wrap leading-relaxed">
                {item.type === 'sys' && <span className="text-stone-500">{item.text}</span>}
                {item.type === 'user' && <span className="text-[#d4c97a] font-bold">{item.text}</span>}
                {item.type === 'res' && <span className="text-stone-300">{item.text}</span>}
                {item.type === 'success' && <span className="text-emerald-400 font-bold">{item.text}</span>}
                {item.type === 'err' && <span className="text-rose-400">{item.text}</span>}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Terminal Input Line */}
          <div className="p-3 bg-[#111111] border-t border-[#222] flex items-center gap-2 text-xs">
            <span className="text-[#d4c97a] font-bold">guest@aadityaverma:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type 'help' or 'sudo hire'..."
              className="flex-1 bg-transparent text-stone-100 placeholder-stone-600 focus:outline-none font-mono"
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
