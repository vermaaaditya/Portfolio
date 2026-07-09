import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Terminal } from 'lucide-react';

// Custom GitHub Icon SVG to bypass missing brand icons in newer lucide-react
const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.2 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const allProjects = [
  {
    id: 'internly',
    name: 'Internly',
    role: 'Creator & Developer',
    description: 'Full-stack automated internship aggregator scraping LinkedIn, Internshala, and Unstop. Built with a relevance scoring engine (0–10) and blacklist filters, featuring batch upserts to Supabase and a real-time React Kanban dashboard.',
    tech: ['React.js', 'Node.js', 'Supabase', 'Cheerio', 'SHA-256 UUIDs', 'Vercel'],
    liveLink: 'https://internly-eta.vercel.app',
    githubLink: 'https://github.com/vermaaaditya'
  },
  {
    id: 'krishivision',
    name: 'KrishiVision',
    role: 'Project Lead',
    description: 'AI-powered crop disease identifier that detects plant leaf diseases from user uploads. Built for BuildHub Hackathon 2026, securing 3rd place overall. Integrates a React frontend with a Flask API running a trained MobileNetV2 model.',
    tech: ['React.js', 'Flask', 'MobileNetV2', 'Python', 'PlantVillage Dataset', 'Firebase Storage'],
    liveLink: null,
    githubLink: 'https://github.com/vermaaaditya'
  },
  {
    id: 'siettpo',
    name: 'SIET Training & Placement Portal',
    role: 'Lead Architect',
    description: 'The official Training & Placement Cell web portal for SIET Panchkula. Built to streamline placement statistics, coordinator contact info, and training details. Live in production and actively maintained.',
    tech: ['React.js', 'Vite', 'Tailwind CSS', 'Vercel CI/CD', 'Production Deploy'],
    liveLink: 'https://siettpo.vercel.app',
    githubLink: 'https://github.com/vermaaaditya'
  },
  {
    id: 'siet-website',
    name: 'SIET Official Website',
    role: 'Frontend Contributor',
    description: "Contributed to the design, feature definition, UI development, and deployment of the official institutional website for the State Institute of Engineering & Technology, Panchkula. Live in production at sietpanchkula.ac.in.",
    tech: ['HTML/CSS', 'JavaScript', 'Responsive Design', 'Vite', 'Production Support'],
    liveLink: 'https://sietpanchkula.ac.in',
    githubLink: null
  },
  {
    id: 'autonex-site',
    name: 'AUTONEX Club Web Portal',
    role: 'Co-Founder & President',
    description: 'Official portal for the Robotics & Automation Club at SIET Panchkula. Represents club initiatives, handles workshop registrations, displays robotics projects, and manages club member records.',
    tech: ['React.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Lucide Icons'],
    liveLink: null,
    githubLink: 'https://github.com/vermaaaditya'
  },
  {
    id: 'northjobs',
    name: 'NorthJobs',
    role: 'Creator',
    description: 'Automated government job aggregator scraping North Indian recruitment notices, parsing qualifications, and compiling them into a unified search directory for students.',
    tech: ['Next.js', 'Supabase', 'React.js', 'Cheerio Web Scraper', 'Node.js Cron'],
    liveLink: null,
    githubLink: 'https://github.com/vermaaaditya'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

export default function Projects() {
  // Scroll to top on page mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-brand-bg text-stone-200 py-16 px-6 relative overflow-hidden select-none">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Navigation back */}
        <div className="mb-10">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#d4c97a] hover:text-stone-100 transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* Header Title */}
        <div className="border-b border-brand-border pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold uppercase tracking-tighter mb-2 text-stone-100">
              Project Vault
            </h1>
            <p className="font-mono text-xs text-stone-500 uppercase tracking-widest">
              A COMPLETE LOG OF SHIPPED APPLICATIONS & WORKSHOPS
            </p>
          </div>
          <div className="font-mono text-xs text-[#d4c97a] uppercase tracking-wider flex items-center gap-2">
            <Terminal className="w-4.5 h-4.5" />
            <span>AI-Native Compilation: OK</span>
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {allProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="project-glass p-6 md:p-8 flex flex-col justify-between rounded-[4px] border border-white/5 hover:border-[#d4c97a]/30 hover:shadow-[0_0_25px_rgba(212,201,122,0.05)] transition-all duration-300 relative group"
            >
              <div>
                {/* Header info */}
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div>
                    <span className="font-mono text-[10px] text-[#d4c97a] uppercase tracking-widest block mb-1">
                      {project.role}
                    </span>
                    <h2 className="font-heading font-bold text-xl md:text-2xl text-stone-100 group-hover:text-[#d4c97a] transition-colors">
                      {project.name}
                    </h2>
                  </div>
                  
                  {/* Action Links */}
                  <div className="flex items-center gap-3 shrink-0">
                    {project.githubLink && (
                      <a 
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stone-500 hover:text-stone-100 transition-colors"
                      >
                        <GithubIcon className="w-4.5 h-4.5" />
                      </a>
                    )}
                    {project.liveLink && (
                      <a 
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stone-500 hover:text-[#d4c97a] transition-colors"
                      >
                        <ExternalLink className="w-4.5 h-4.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-stone-300 font-sans text-xs md:text-sm leading-relaxed mb-8 text-justify">
                  {project.description}
                </p>
              </div>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((tag) => (
                  <span 
                    key={tag}
                    className="font-mono text-[10px] text-stone-400 bg-white/5 border border-white/5 rounded-[2px] px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
