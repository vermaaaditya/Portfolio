import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';

// Showcasing only the 3 specific projects requested by the user
const featuredProjects = [
  {
    id: 'internly',
    name: 'Internly',
    description: 'Full-stack automated internship aggregator scraping LinkedIn, Internshala, and Unstop, with ATS matching and Kanban dashboard.',
    tech: ['React', 'Node.js', 'Supabase', 'Cheerio'],
    link: 'https://internlyeta.vercel.app'
  },
  {
    id: 'siettpo',
    name: 'TPC Web Portal',
    description: 'Official Training & Placement Cell portal for SIET Panchkula, live in production and actively maintained by the development team.',
    tech: ['React', 'Vite', 'Tailwind', 'Vercel'],
    link: 'https://siettpo.vercel.app'
  },
  {
    id: 'siet-website',
    name: 'SIET Official Website',
    description: "Contributed to features, UI development, and deployment of SIET Panchkula's official institutional portal",
    tech: ['HTML/CSS', 'React', 'Responsive', 'Vite'],
    link: 'https://sietpanchkula.ac.in'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

export default function ProjectsGrid() {
  return (
    <section className="relative w-full max-w-5xl mx-auto my-24 px-6 select-none z-10">

      {/* Header */}
      <div className="mb-12 text-center md:text-left">
        <p className="font-mono text-[#d4c97a] text-xs uppercase tracking-widest mb-2">
          CURATED APPLICATIONS
        </p>
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-stone-100 tracking-tight">
          Selected Works
        </h2>
      </div>

      {/* Grid Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {featuredProjects.map((project) => (
          <motion.div
            key={project.id}
            variants={cardVariants}
            whileHover={{ y: -4 }}
            className="project-glass p-6 flex flex-col justify-between h-full rounded-[4px] relative group hover:border-[#d4c97a]/30 hover:shadow-[0_0_20px_rgba(212,201,122,0.06)] transition-all duration-300 cursor-pointer"
          >
            {/* Top Row: Title & Link */}
            <div>
              <div className="flex justify-between items-start gap-4 mb-3">
                <h3 className="font-heading font-semibold text-lg md:text-xl text-stone-200 group-hover:text-[#d4c97a] transition-colors">
                  {project.name}
                </h3>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-500 hover:text-[#d4c97a] transition-colors shrink-0 pt-1"
                  >
                    <ExternalLink className="w-4.5 h-4.5" />
                  </a>
                )}
              </div>

              {/* Description */}
              <p className="text-stone-400 font-sans text-xs md:text-sm leading-relaxed mb-6">
                {project.description}
              </p>
            </div>

            {/* Bottom Row: Tech Tags */}
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {project.tech.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] text-stone-400 bg-white/5 border border-white/5 rounded-[2px] px-2 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Action footer link */}
      <div className="mt-12 flex flex-col items-center relative z-20">
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
