import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Rocket, Cpu, Users, Terminal } from 'lucide-react';
import TiltCard from './TiltCard';

const metrics = [
  {
    icon: Trophy,
    value: "3rd Place",
    label: "BuildHub Hackathon '26",
    description: "KrishiVision AI Disease Identifier"
  },
  {
    icon: Rocket,
    value: "6+",
    label: "Shipped Applications",
    description: "Production web & automation tools"
  },
  {
    icon: Cpu,
    value: "100%",
    label: "Automated Aggregator",
    description: "Scraping relevance engine (Internly)"
  },
  {
    icon: Users,
    value: "President",
    label: "AUTONEX Club",
    description: "Robotics & Automation Leader"
  }
];

export default function MetricsBar() {
  return (
    <section className="relative w-full max-w-5xl mx-auto my-16 px-6 select-none z-10">
      <div className="relative project-glass border border-white/10 rounded-[4px] p-6 md:p-8 bg-[#0d0d0d]/80 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.8)]">
        
        {/* HUD top header line */}
        <div className="flex justify-between items-center border-b border-brand-border/60 pb-4 mb-6 font-mono text-[10px] text-stone-500 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#d4c97a]" />
            <span className="text-stone-300 font-bold">SYSTEM METRICS & ACHIEVEMENTS</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-500">REALTIME DATA: VERIFIED</span>
          </div>
        </div>

        {/* Metrics Grid with 3D Tilt Micro-Interactions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <TiltCard maxTilt={8} scale={1.02}>
                  <div className="bg-[#121212] border border-white/5 hover:border-[#d4c97a]/40 p-5 rounded-[4px] flex flex-col justify-between transition-all duration-300 group relative overflow-hidden h-full">
                    {/* Top gold accent line */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#d4c97a]/40 group-hover:bg-[#d4c97a] transition-colors" />

                    <div className="flex justify-between items-start mb-3">
                      <div className="p-2.5 rounded-[4px] bg-white/5 border border-white/5 text-[#d4c97a]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-[9px] text-stone-600 uppercase tracking-wider">
                        0{idx + 1} // HUD
                      </span>
                    </div>

                    <div>
                      <div className="font-heading font-extrabold text-2xl md:text-3xl text-stone-100 group-hover:text-[#d4c97a] transition-colors mb-1 tracking-tight">
                        {item.value}
                      </div>
                      <div className="font-mono text-xs font-semibold text-stone-300 uppercase tracking-wide mb-1">
                        {item.label}
                      </div>
                      <div className="font-sans text-[11px] text-stone-500 leading-snug">
                        {item.description}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
