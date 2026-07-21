import React from 'react';
import Hero from '../components/Hero';
import HighwaySkills from '../components/HighwaySkills';
import AboutDesk from '../components/AboutDesk';
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

      {/* 3. About / Principal's Desk */}
      <AboutDesk />

      {/* 4. HUD System Metrics & Achievements Bar */}
      <MetricsBar />

      {/* 5. Projects Grid & Film Reel */}
      <ProjectsGrid />

      {/* 6. GitHub Activity & Repository Stream HUD */}
      <GithubActivityWidget />

      {/* 7. CTA Section */}
      <CTA />
    </div>
  );
}
