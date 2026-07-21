import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CircuitTrace() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const sparkRef = useRef(null);
  const [pathData, setPathData] = useState('');
  const [stopNodes, setStopNodes] = useState([]);

  useEffect(() => {
    const calculatePath = () => {
      const anchors = [
        'path-hero-start',
        'path-skills',
        'path-about',
        'path-bento',
        'path-projects',
        'path-cta'
      ];

      const coords = anchors
        .map((id, index) => {
          const el = document.getElementById(id);
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return {
            id,
            index,
            x: rect.left + rect.width / 2 + window.scrollX,
            y: rect.top + rect.height / 2 + window.scrollY
          };
        })
        .filter(Boolean);

      if (coords.length < 2) return;

      setStopNodes(coords);

      let d = `M ${coords[0].x} ${coords[0].y}`;

      for (let i = 0; i < coords.length - 1; i++) {
        const p1 = coords[i];
        const p2 = coords[i + 1];
        const dx = Math.abs(p2.x - p1.x);
        const dy = p2.y - p1.y;

        // If anchors are vertically aligned (dx < 25) or close vertically (dy < 120), connect directly with a straight line
        if (dx < 25 || Math.abs(dy) < 120) {
          d += ` L ${p2.x} ${p2.y}`;
        } else {
          const offsetMag = Math.min(Math.abs(dy) * 0.2, window.innerWidth * 0.08, 60);
          const offset = (i % 2 === 0 ? 1 : -1) * offsetMag;

          const cp1x = p1.x + offset;
          const cp1y = p1.y + dy * 0.4;
          const cp2x = p2.x - offset;
          const cp2y = p1.y + dy * 0.6;

          d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
        }
      }

      setPathData(d);
    };

    const timer = setTimeout(calculatePath, 300);
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
    if (!pathData || !containerRef.current || !pathRef.current) return;

    const mainPath = pathRef.current;
    const totalLength = mainPath.getTotalLength();

    gsap.set(mainPath, {
      strokeDasharray: totalLength,
      strokeDashoffset: totalLength
    });

    // Create GSAP Timeline for scroll-synced line draw (Direct DOM updates for 60fps)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.2,
        onUpdate: (self) => {
          if (sparkRef.current && totalLength > 0) {
            const pt = mainPath.getPointAtLength(self.progress * totalLength);
            sparkRef.current.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);
            sparkRef.current.style.opacity = self.progress > 0.005 && self.progress < 0.995 ? '1' : '0';
          }
        }
      }
    });

    tl.to(mainPath, {
      strokeDashoffset: 0,
      ease: 'none'
    });

    // Animate stop nodes scaling when scroll reaches each section
    stopNodes.forEach((node, idx) => {
      const nodeEl = containerRef.current.querySelector(`.stop-node-${idx}`);
      if (nodeEl) {
        const stopProgress = idx / (stopNodes.length - 1);
        gsap.fromTo(
          nodeEl,
          { scale: 0, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 0.35,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: document.body,
              start: `${stopProgress * 100}% top`,
              toggleActions: 'play reverse play reverse'
            }
          }
        );
      }
    });

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, [pathData, stopNodes]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none w-full h-full overflow-hidden">
      <svg className="absolute top-0 left-0 w-full h-full">
        {pathData && (
          <>
            {/* Outer Glow Path */}
            <path
              d={pathData}
              className="drop-shadow-[0_0_12px_rgba(212,201,122,0.6)]"
              fill="none"
              stroke="#d4c97a"
              strokeWidth="5"
              strokeOpacity="0.3"
              strokeLinecap="round"
            />
            {/* Core Solid Line */}
            <path
              ref={pathRef}
              d={pathData}
              className="drop-shadow-[0_0_4px_rgba(212,201,122,0.9)]"
              fill="none"
              stroke="#d4c97a"
              strokeWidth="2.5"
              strokeOpacity="1"
              strokeLinecap="round"
            />
          </>
        )}

        {/* Section Stop Nodes */}
        {stopNodes.map((node, idx) => (
          <g key={node.id} className={`stop-node-${idx}`} transform={`translate(${node.x}, ${node.y})`}>
            <circle
              r="10"
              fill="none"
              stroke="#d4c97a"
              strokeWidth="1.5"
              strokeOpacity="0.6"
            />
            <circle
              r="5"
              fill="#0a0a0a"
              stroke="#d4c97a"
              strokeWidth="2"
              className="drop-shadow-[0_0_10px_#d4c97a]"
            />
            <circle
              r="2"
              fill="#d4c97a"
            />
          </g>
        ))}

        {/* GPU Direct DOM Spark Light Node */}
        <g ref={sparkRef} className="opacity-0 transition-opacity duration-200">
          <circle r="10" fill="#d4c97a" opacity="0.35" className="animate-ping" />
          <circle r="5" fill="#d4c97a" opacity="0.9" />
          <circle r="2.5" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
}
