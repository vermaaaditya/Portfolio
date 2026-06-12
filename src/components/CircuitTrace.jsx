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

      const coords = anchors.map(id => {
        const el = document.getElementById(id);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2 + window.scrollX,
          y: rect.top + rect.height / 2 + window.scrollY
        };
      }).filter(Boolean);

      if (coords.length < 2) return;

      let d = `M ${coords[0].x} ${coords[0].y}`;
      const newBranches = [];

      for (let i = 0; i < coords.length - 1; i++) {
        const p1 = coords[i];
        const p2 = coords[i + 1];

        const midY = (p1.y + p2.y) / 2;
        const distanceY = Math.abs(p2.y - p1.y);
        const dynamicOffset = Math.min(distanceY * 0.4, 250); 
        
        // Split the offset controls so we can manipulate them independently
        let startOffset = i % 2 === 0 ? dynamicOffset : -dynamicOffset;
        let endOffset = i % 2 === 0 ? -dynamicOffset : dynamicOffset;

        // 🎯 THE FIX: Intercept the very last segment (Projects -> CTA)
        if (i === coords.length - 2) {
          // This flips the polarity of the final S-curve so it diverts the other way
          startOffset = -startOffset;
          endOffset = -endOffset;
          
          /* PRO-TIP: If an S-curve still feels awkward at the very end of the page, 
            you can change it into a smooth "C" curve that bows out cleanly to one side 
            and hooks back to the center by making both offsets the same sign:
            */
            startOffset = -dynamicOffset; 
            endOffset = -dynamicOffset;
          
        }

        // Apply the modified offsets to the Bezier curve
        d += ` C ${p1.x + startOffset} ${midY}, ${p2.x + endOffset} ${midY}, ${p2.x} ${p2.y}`;

        // Add matching curved branches offshooting from the main line
        if (i < coords.length - 2) {
          const branchDir = i % 2 === 0 ? -1 : 1;
          const branchX = p2.x + branchDir * 120; 
          const branchY = midY + 40;
          
          newBranches.push({
            path: `M ${p2.x} ${midY} C ${p2.x + branchDir * 40} ${midY}, ${branchX} ${branchY - 20}, ${branchX} ${branchY}`,
            circle: { x: branchX, y: branchY }
          });
        }
      }
      setPathData(d);
      setBranches(newBranches);
    };

    const timer = setTimeout(calculatePath, 250);

    window.addEventListener('resize', calculatePath);
    const observer = new MutationObserver(calculatePath);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculatePath);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!pathData || !containerRef.current) return;

    const paths = containerRef.current.querySelectorAll('.circuit-path');
    const triggers = [];

    paths.forEach(path => {
      const length = path.getTotalLength();

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length
      });

      const anim = gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
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
        {pathData && (
          <>
            <path
              d={pathData}
              className="circuit-path drop-shadow-[0_0_12px_rgba(212,201,122,0.8)]"
              fill="none"
              stroke="#d4c97a"
              strokeWidth="6"
              strokeOpacity="0.4"
              strokeLinecap="round"
            />
            <path
              d={pathData}
              className="circuit-path drop-shadow-[0_0_2px_rgba(255,255,255,0.8)]"
              fill="none"
              stroke="#d4c97a"
              strokeWidth="2"
              strokeOpacity="1"
              strokeLinecap="round"
            />
          </>
        )}

        {branches.map((b, idx) => (
          <g key={idx}>
            <path
              d={b.path}
              className="drop-shadow-[0_0_8px_rgba(212,201,122,0.6)]"
              fill="none"
              stroke="#d4c97a"
              strokeWidth="4"
              strokeOpacity="0.25"
              strokeLinecap="round"
            />
            <path
              d={b.path}
              fill="none"
              stroke="#d4c97a"
              strokeWidth="1"
              strokeOpacity="0.7"
              strokeLinecap="round"
            />
            <circle
              cx={b.circle.x}
              cy={b.circle.y}
              r="5"
              fill="#0a0a0a"
              stroke="#d4c97a"
              strokeWidth="2"
              className="drop-shadow-[0_0_10px_rgba(212,201,122,0.9)]"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
