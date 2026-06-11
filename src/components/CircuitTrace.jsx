import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CircuitTrace() {
  const containerRef = useRef(null);
  const [pathData, setPathData] = useState('');
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const calculatePath = () => {
      const anchors = [
        'path-hero-start',
        'path-skills',
        'path-about',
        'path-projects',
        'path-cta'
      ];

      // Get coords relative to scroll height
      const coords = anchors.map(id => {
        const el = document.getElementById(id);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        return {
          x: rect.left + rect.width / 2 + scrollLeft,
          y: rect.top + rect.height / 2 + scrollTop
        };
      }).filter(Boolean);

      if (coords.length < 2) return;

      // Construct a smooth free-flowing S-curve path
      let d = `M ${coords[0].x} ${coords[0].y}`;
      const newBranches = [];

      for (let i = 0; i < coords.length - 1; i++) {
        const p1 = coords[i];
        const p2 = coords[i + 1];

        // Smooth S-curve control points (midpoint vertical bend)
        const midY = (p1.y + p2.y) / 2;
        d += ` C ${p1.x} ${midY}, ${p2.x} ${midY}, ${p2.x} ${p2.y}`;

        // Add matching curved branches offshooting from the main line
        if (i < coords.length - 2) {
          const branchDir = i % 2 === 0 ? -1 : 1;
          const branchX = p2.x + branchDir * 70;
          const branchY = midY + 60;
          newBranches.push({
            path: `M ${p2.x} ${midY} C ${p2.x} ${midY + 30}, ${branchX} ${midY}, ${branchX} ${branchY}`,
            circle: { x: branchX, y: branchY }
          });
        }
      }

      setPathData(d);
      setBranches(newBranches);
    };

    // Delay slightly to let layout adjust
    const timer = setTimeout(calculatePath, 650);

    window.addEventListener('resize', calculatePath);
    window.addEventListener('load', calculatePath);

    // Watch for dynamic height changes
    const observer = new MutationObserver(calculatePath);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculatePath);
      window.removeEventListener('load', calculatePath);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!pathData || !containerRef.current) return;

    // Target all paths with the .circuit-path class (both core and glow layers)
    const paths = containerRef.current.querySelectorAll('.circuit-path');
    const triggers = [];

    paths.forEach(path => {
      const length = path.getTotalLength();

      // Reset dash offset properties
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length
      });

      // Animate draw progression based on viewport scroll progress
      const anim = gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        }
      });
      
      triggers.push(anim);
    });

    return () => {
      triggers.forEach(anim => {
        if (anim.scrollTrigger) anim.scrollTrigger.kill();
        anim.kill();
      });
    };
  }, [pathData]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none w-full h-full overflow-hidden">
      <svg className="absolute top-0 left-0 w-full h-full">
        {/* Glow Filters */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 2 0" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Glowing Background Trace Path (Thicker, blur matrix applied) */}
        {pathData && (
          <path
            d={pathData}
            className="circuit-path"
            fill="none"
            stroke="#d4c97a"
            strokeWidth="5"
            strokeOpacity="0.4"
            filter="url(#glow)"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* 2. Sharp High-Brightness Core Trace Path */}
        {pathData && (
          <path
            d={pathData}
            className="circuit-path"
            fill="none"
            stroke="#d4c97a"
            strokeWidth="1.75"
            strokeOpacity="0.95"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Decorative Offshoot Branches */}
        {branches.map((b, idx) => (
          <g key={idx}>
            {/* Glow underlayer for branch */}
            <path
              d={b.path}
              fill="none"
              stroke="#d4c97a"
              strokeWidth="3"
              strokeOpacity="0.18"
              filter="url(#glow)"
              strokeLinecap="round"
            />
            {/* Core branch line */}
            <path
              d={b.path}
              fill="none"
              stroke="#d4c97a"
              strokeWidth="0.75"
              strokeOpacity="0.5"
              strokeLinecap="round"
            />
            {/* Terminal nodes */}
            <circle
              cx={b.circle.x}
              cy={b.circle.y}
              r="4.5"
              fill="#0a0a0a"
              stroke="#d4c97a"
              strokeWidth="2"
              strokeOpacity="0.8"
              className="filter drop-shadow-[0_0_4px_rgba(212,201,122,0.6)]"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
