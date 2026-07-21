import React, { useEffect, useRef } from 'react';
import * as Icons from 'lucide-react';

const lane1Skills = [
  { name: 'React.js', icon: 'Atom' },
  { name: 'Vite', icon: 'Zap' },
  { name: 'Tailwind CSS', icon: 'Wind' },
  { name: 'HTML/CSS', icon: 'Code' },
  { name: 'Node.js', icon: 'Server' },
  { name: 'Express.js', icon: 'Cpu' },
  { name: 'Flask (RESTful API)', icon: 'Terminal' },
  { name: 'Antigravity IDE', icon: 'Brain' },
  { name: 'Claude Code', icon: 'MessageSquare' },
  { name: 'GitHub Copilot', icon: 'Sparkles' },
  { name: 'n8n', icon: 'Share2' },
];

const lane2Skills = [
  { name: 'Python', icon: 'Terminal' },
  { name: 'C', icon: 'Cpu' },
  { name: 'C++', icon: 'Cpu' },
  { name: 'PostgreSQL', icon: 'Database' },
  { name: 'Supabase (relational)', icon: 'Database' },
  { name: 'Firebase Firestore (NoSQL)', icon: 'Database' },
  { name: 'Git', icon: 'GitBranch' },
  { name: 'GitHub', icon: 'GitFork' },
  { name: 'Vercel (CI/CD)', icon: 'Cloud' },
  { name: 'VS Code', icon: 'FileCode' },
];

const renderIcon = (iconName) => {
  const IconComponent = Icons[iconName] || Icons.HelpCircle;
  return <IconComponent className="w-4 h-4 md:w-5 h-5 text-[#d4c97a] shrink-0" />;
};

export default function HighwaySkills() {
  const containerRef = useRef(null);
  const cardRefs1 = useRef([]);
  const cardRefs2 = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth || window.innerWidth;
    
    const cardWidth1 = 250;
    let currentX1 = 0;
    const startPositions1 = lane1Skills.map(() => {
      const pos = currentX1;
      const gap = 270 + Math.random() * 100;
      currentX1 += gap;
      return pos;
    });
    const loopWidth1 = Math.max(currentX1, containerWidth + cardWidth1);

    const cardWidth2 = 230;
    let currentX2 = 0;
    const startPositions2 = lane2Skills.map(() => {
      const pos = currentX2;
      const gap = 250 + Math.random() * 90;
      currentX2 += gap;
      return pos;
    });
    const loopWidth2 = Math.max(currentX2, containerWidth + cardWidth2);

    let offset1 = 0;
    let offset2 = 0;
    let baseSpeed1 = 1.3;
    let baseSpeed2 = 1.0;
    let scrollBoost = 0;
    let lastScrollY = window.scrollY;
    let animationFrameId;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);
      scrollBoost = Math.min(delta * 0.15, 8);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const updatePhysics = () => {
      scrollBoost *= 0.92;

      offset1 += baseSpeed1 + scrollBoost;
      offset2 += baseSpeed2 + scrollBoost * 0.8;

      lane1Skills.forEach((_, index) => {
        const x = ((startPositions1[index] + offset1) % loopWidth1) - cardWidth1;
        const domEl = cardRefs1.current[index];
        if (domEl) {
          domEl.style.transform = `translateX(${x}px)`;
        }
      });

      lane2Skills.forEach((_, index) => {
        const x = loopWidth2 - ((startPositions2[index] + offset2) % loopWidth2) - cardWidth2;
        const domEl = cardRefs2.current[index];
        if (domEl) {
          domEl.style.transform = `translateX(${x}px)`;
        }
      });

      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    animationFrameId = requestAnimationFrame(updatePhysics);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-20 bg-[#0c0c0c] border-y-4 border-brand-border flex flex-col justify-center overflow-hidden select-none"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#151515_1px,transparent_1px)] bg-[size:16px_16px] opacity-40 pointer-events-none" />

      {/* Decorative yellow highway divider shoulders */}
      <div className="absolute top-0 left-0 w-full h-1 bg-yellow-600/20" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-600/20" />

      {/* Dashed Center Line with Anchor */}
      <div className="absolute top-1/2 left-0 w-full h-0 border-t-2 border-dashed border-[#222] -translate-y-1/2 z-10 flex justify-center items-center">
        <div id="path-skills" className="w-2.5 h-2.5 bg-[#d4c97a] rotate-45 border border-brand-bg absolute" />
      </div>

      {/* Lane 1: Left to Right */}
      <div className="relative h-20 w-full flex items-center overflow-hidden mb-6 z-10">
        {lane1Skills.map((skill, idx) => (
          <div
            key={`lane1-${skill.name}`}
            ref={el => cardRefs1.current[idx] = el}
            className="absolute left-0 bg-brand-surface border-2 border-brand-border px-4 py-2.5 flex items-center gap-3 font-heading font-medium tracking-tight text-stone-200 text-sm md:text-base scale-105 shadow-md group hover:border-[#d4c97a]/40 transition-colors"
            style={{ width: '250px' }}
          >
            {renderIcon(skill.icon)}
            <span className="truncate group-hover:text-[#d4c97a] transition-colors">{skill.name}</span>
          </div>
        ))}
      </div>

      {/* Lane 2: Right to Left */}
      <div className="relative h-16 w-full flex items-center overflow-hidden z-10">
        {lane2Skills.map((skill, idx) => (
          <div
            key={`lane2-${skill.name}`}
            ref={el => cardRefs2.current[idx] = el}
            className="absolute left-0 bg-brand-surface border-2 border-brand-border/80 px-3 py-1.5 flex items-center gap-2.5 font-heading font-medium tracking-tight text-stone-300 text-xs md:text-sm scale-95 shadow-sm opacity-90 group hover:border-[#d4c97a]/40 transition-colors"
            style={{ width: '230px' }}
          >
            {renderIcon(skill.icon)}
            <span className="truncate group-hover:text-[#d4c97a] transition-colors">{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
