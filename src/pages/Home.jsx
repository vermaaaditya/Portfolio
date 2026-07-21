import React from 'react';
import Hero from '../components/Hero';
import HighwaySkills from '../components/HighwaySkills';
import AboutDesk from '../components/AboutDesk';
import TerminalBentoSection from '../components/TerminalBentoSection';
import MetricsBar from '../components/MetricsBar';
import ProjectsGrid from '../components/ProjectsGrid';
import GithubActivityWidget from '../components/GithubActivityWidget';
import CTA from '../components/CTA';

export default function Home() {
  return (
    <div className="w-full relative flex flex-col items-center pt-14">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Highway Skills Marquee */}
      <HighwaySkills />

      {/* 3. From the Desk (Portrait & Vinyl Music Player) */}
      <AboutDesk />

      {/* 4. Embedded Terminal & Editorial Bento Grid Section */}
      <TerminalBentoSection />

      {/* 5. HUD System Metrics & Achievements Bar */}
      <MetricsBar />

      {/* 6. Projects Grid & Film Reel */}
      <ProjectsGrid />

      {/* 7. GitHub Activity & Repository Stream HUD */}
      <GithubActivityWidget />

      {/* 8. CTA Section */}
      <CTA />
    </div>
  );
}
