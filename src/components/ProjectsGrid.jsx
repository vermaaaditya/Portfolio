import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import FilmReel from './FilmReel';

// All projects with images for the film reel showcase
const allProjects = [
  {
    id: 'internly',
    name: 'Internly',
    role: 'Creator & Developer',
    description: 'Full-stack automated internship aggregator scraping LinkedIn, Internshala, and Unstop. Built with a relevance scoring engine (0–10) and blacklist filters, featuring batch upserts to Supabase and a real-time React Kanban dashboard.',
    tech: ['React.js', 'Node.js', 'Supabase', 'Cheerio', 'SHA-256 UUIDs', 'Vercel'],
    image: '/assets/projects/internly.png',
    liveLink: 'https://internly-eta.vercel.app',
    githubLink: 'https://github.com/vermaaaditya'
  },
  {
    id: 'krishivision',
    name: 'KrishiVision',
    role: 'Project Lead',
    description: 'AI-powered crop disease identifier that detects plant leaf diseases from user uploads. Built for BuildHub Hackathon 2026, securing 3rd place overall. Integrates a React frontend with a Flask API running a trained MobileNetV2 model.',
    tech: ['React.js', 'Flask', 'MobileNetV2', 'Python', 'PlantVillage Dataset', 'Firebase Storage'],
    image: '/assets/projects/krishivision.png',
    liveLink: null,
    githubLink: 'https://github.com/vermaaaditya'
  },
  {
    id: 'siettpo',
    name: 'SIET Training & Placement Portal',
    role: 'Lead Architect',
    description: 'The official Training & Placement Cell web portal for SIET Panchkula. Built to streamline placement statistics, coordinator contact info, and training details. Live in production and actively maintained.',
    tech: ['React.js', 'Vite', 'Tailwind CSS', 'Vercel CI/CD', 'Production Deploy'],
    image: '/assets/projects/siettpo.png',
    liveLink: 'https://siettpo.vercel.app',
    githubLink: 'https://github.com/vermaaaditya'
  },
  {
    id: 'siet-website',
    name: 'SIET Official Website',
    role: 'Frontend Contributor',
    description: "Contributed to the design, feature definition, UI development, and deployment of the official institutional website for the State Institute of Engineering & Technology, Panchkula. Live in production at sietpanchkula.ac.in.",
    tech: ['HTML/CSS', 'JavaScript', 'Responsive Design', 'Vite', 'Production Support'],
    image: '/assets/projects/siet-website.png',
    liveLink: 'https://sietpanchkula.ac.in',
    githubLink: null
  },
  {
    id: 'autonex-site',
    name: 'AUTONEX Club Web Portal',
    role: 'Co-Founder & President',
    description: 'Official portal for the Robotics & Automation Club at SIET Panchkula. Represents club initiatives, handles workshop registrations, displays robotics projects, and manages club member records.',
    tech: ['React.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Lucide Icons'],
    image: '/assets/projects/autonex.png',
    liveLink: null,
    githubLink: 'https://github.com/vermaaaditya'
  },
  {
    id: 'northjobs',
    name: 'NorthJobs',
    role: 'Creator',
    description: 'Automated government job aggregator scraping North Indian recruitment notices, parsing qualifications, and compiling them into a unified search directory for students.',
    tech: ['Next.js', 'Supabase', 'React.js', 'Cheerio Web Scraper', 'Node.js Cron'],
    image: '/assets/projects/northjobs.png',
    liveLink: null,
    githubLink: 'https://github.com/vermaaaditya'
  }
];

export default function ProjectsGrid() {
  return (
    <section className="relative w-full select-none z-10">

      {/* Film Reel */}
      <FilmReel projects={allProjects} />

      {/* Action footer link — View All Projects */}
      <div className="flex flex-col items-center relative z-20 -mt-8 md:mt-0 pb-12">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-[#d4c97a] hover:text-stone-100 bg-[#111111] hover:bg-[#151515] border border-brand-border px-5 py-3 transition-all cursor-pointer shadow-md"
        >
          View All Projects
          <ArrowRight className="w-4 h-4" />
        </Link>

        {/* Path Anchor for Circuit Trace */}
        <div id="path-projects" className="w-3 h-3 bg-brand-bg border-2 border-stone-800 rotate-45 mt-12" />
      </div>
    </section>
  );
}
