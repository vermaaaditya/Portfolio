import React from 'react';
import Hero from '../components/Hero';
import HighwaySkills from '../components/HighwaySkills';
import AboutDesk from '../components/AboutDesk';
import ProjectsGrid from '../components/ProjectsGrid';
import CTA from '../components/CTA';

export default function Home() {
  return (
    <div className="w-full relative flex flex-col items-center">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Highway Skills Marquee */}
      <HighwaySkills />

      {/* 3. About / Principal's Desk */}
      <AboutDesk />

      {/* 4. Projects Grid */}
      <ProjectsGrid />

      {/* 5. CTA Section */}
      <CTA />
    </div>
  );
}
