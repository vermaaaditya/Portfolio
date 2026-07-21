import React, { useEffect, useState } from 'react';
import { ExternalLink, Activity } from 'lucide-react';
import TiltCard from './TiltCard';

const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.2 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function GithubActivityWidget() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchGithubData() {
      try {
        const profileRes = await fetch('https://api.github.com/users/vermaaaditya');
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setProfile(profileData);
        }
      } catch (err) {
        console.warn('GitHub API fetch fallback:', err);
      }
    }

    fetchGithubData();
  }, []);

  // Synthetic 52-week contribution activity grid cells
  const contributionGrid = Array.from({ length: 48 }, (_, i) => {
    const level = (i * 7 + 3) % 5;
    return level;
  });

  return (
    <section className="relative w-full max-w-5xl mx-auto my-16 px-6 select-none z-10 font-mono">
      <TiltCard maxTilt={5} scale={1.01}>
        <div className="relative project-glass border border-[#d4c97a]/30 rounded-[6px] p-6 md:p-8 bg-[#0d0d0d]/90 backdrop-blur-xl shadow-[0_0_40px_rgba(212,201,122,0.08)]">
          
          {/* Top HUD Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-brand-border/60 pb-4 mb-6 gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-white/5 border border-white/10 text-[#d4c97a]">
                <GithubIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-base md:text-lg text-stone-100 uppercase tracking-tight flex items-center gap-2">
                  GITHUB ACTIVITY & HUD STREAM
                </h3>
                <p className="text-[10px] text-stone-500 uppercase tracking-widest">
                  @vermaaaditya // LIVE TELEMETRY
                </p>
              </div>
            </div>

            <a
              href="https://github.com/vermaaaditya"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-[#d4c97a] hover:text-white bg-[#141414] border border-[#2a2a2a] px-3.5 py-1.5 rounded transition-colors w-fit"
            >
              <span>VIEW GITHUB PROFILE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* GitHub Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-[#121212] border border-white/5 p-4 rounded text-center">
              <div className="text-xl md:text-2xl font-bold text-stone-100 mb-0.5">
                {profile ? profile.public_repos : '15'}
              </div>
              <div className="text-[10px] text-stone-500 uppercase tracking-wider">Public Repos</div>
            </div>
            <div className="bg-[#121212] border border-white/5 p-4 rounded text-center">
              <div className="text-xl md:text-2xl font-bold text-[#d4c97a] mb-0.5">
                {profile ? profile.followers : '2'}
              </div>
              <div className="text-[10px] text-stone-500 uppercase tracking-wider">Followers</div>
            </div>
            <div className="bg-[#121212] border border-white/5 p-4 rounded text-center">
              <div className="text-xl md:text-2xl font-bold text-emerald-400 mb-0.5">
                500+
              </div>
              <div className="text-[10px] text-stone-500 uppercase tracking-wider">2026 Commits</div>
            </div>
            <div className="bg-[#121212] border border-white/5 p-4 rounded text-center">
              <div className="text-xl md:text-2xl font-bold text-indigo-400 mb-0.5 flex items-center justify-center gap-1">
                <Activity className="w-5 h-5 text-emerald-500 animate-pulse" />
                <span>ACTIVE</span>
              </div>
              <div className="text-[10px] text-stone-500 uppercase tracking-wider">Streak Status</div>
            </div>
          </div>

          {/* Contribution Heatmap Matrix Grid */}
          <div className="bg-[#111111] border border-white/5 p-4 rounded">
            <div className="flex justify-between items-center mb-3 text-[10px] text-stone-400 uppercase tracking-widest">
              <span>COMMIT CONTRIBUTION MATRIX</span>
              <span className="text-[#d4c97a]">LAST 52 WEEKS</span>
            </div>
            <div className="grid grid-cols-12 gap-1.5">
              {contributionGrid.map((lvl, idx) => {
                const bgColors = [
                  'bg-[#1a1a1a]',
                  'bg-[#d4c97a]/30',
                  'bg-[#d4c97a]/50',
                  'bg-[#d4c97a]/80',
                  'bg-[#d4c97a]'
                ];
                return (
                  <div
                    key={idx}
                    className={`h-4 rounded-[2px] ${bgColors[lvl]} border border-white/5 transition-transform hover:scale-125 cursor-pointer`}
                    title={`Week ${idx + 1}: ${lvl * 3 + 2} contributions`}
                  />
                );
              })}
            </div>
          </div>

        </div>
      </TiltCard>
    </section>
  );
}
