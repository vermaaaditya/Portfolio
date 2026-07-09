import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Terminal } from 'lucide-react';
import FilmReel from '../components/FilmReel';

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

export default function Projects() {
  // Scroll to top on page mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] text-stone-200 relative overflow-hidden select-none">

      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      {/* Floating Navigation — back link */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed top-6 left-6 z-30"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#d4c97a] hover:text-stone-100 transition-colors group cursor-pointer bg-[#0a0a0a]/70 backdrop-blur-sm border border-white/5 px-4 py-2.5 rounded-sm"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </motion.div>

      {/* Floating Header — Project Vault title */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="fixed top-6 right-6 z-30 hidden md:flex items-center gap-3 bg-[#0a0a0a]/70 backdrop-blur-sm border border-white/5 px-4 py-2.5 rounded-sm"
      >
        <Terminal className="w-4 h-4 text-[#d4c97a]" />
        <div className="text-right">
          <span className="block font-heading font-bold text-sm text-stone-100 uppercase tracking-wider">
            Project Vault
          </span>
          <span className="block font-mono text-[9px] text-stone-500 uppercase tracking-widest">
            35MM Film Reel · {allProjects.length} Frames
          </span>
        </div>
      </motion.div>

      {/* Film Reel */}
      <FilmReel projects={allProjects} />
    </div>
  );
}
