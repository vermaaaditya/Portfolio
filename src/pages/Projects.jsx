import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Terminal, Filter, X, Cpu, Layers, Code2, Copy, Check } from 'lucide-react';
import TiltCard from '../components/TiltCard';

const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.2 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const projectSnippets = {
  internly: `// Cheerio Scraping & SHA-256 Relevance Scoring Engine (Internly)
const cheerio = require('cheerio');
const crypto = require('crypto');

export async function processListing(rawHtml, userPreferences) {
  const $ = cheerio.load(rawHtml);
  const title = $('.job-title').text().trim();
  const company = $('.company-name').text().trim();
  
  // Deduplication via SHA-256 Hash
  const hashId = crypto.createHash('sha256').update(\`\${title}-\${company}\`).digest('hex');

  // Relevance Scoring Engine (0 - 10)
  let score = 5;
  if (userPreferences.skills.some(skill => title.toLowerCase().includes(skill))) score += 3;
  if (userPreferences.blacklist.some(b => company.toLowerCase().includes(b))) score = 0;

  return { hashId, title, company, score: Math.min(score, 10) };
}`,

  krishivision: `# PyTorch MobileNetV2 Leaf Disease Inference Engine (KrishiVision API)
import torch
import torchvision.transforms as transforms
from PIL import Image
import io

model = torch.load('krishivision_mobilenet_v2.pth', map_location='cpu')
model.eval()

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

def predict_crop_disease(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    tensor = transform(img).unsqueeze(0)
    with torch.no_grad():
        outputs = model(tensor)
        confidence, predicted = torch.max(outputs, 1)
    return {"class_id": int(predicted.item()), "confidence": float(confidence.item())}`,

  siettpo: `// Production Build & Vendor Chunk Optimization (SIET TPO Portal)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'framer-motion'],
          icons: ['lucide-react']
        }
      }
    }
  }
});`,

  northjobs: `// Supabase Government Gazette Scraper Batch Upsert (NorthJobs)
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export async function upsertNotices(notices) {
  const { data, error } = await supabase
    .from('recruitment_notices')
    .upsert(notices, { onConflict: 'hash_id', ignoreDuplicates: true });
  
  if (error) console.error('[err] Batch upsert failed:', error);
  return data;
}`
};

const allProjects = [
  {
    id: 'internly',
    name: 'Internly',
    role: 'Creator & Developer',
    category: 'Full-Stack & Scraping',
    description: 'Full-stack automated internship aggregator scraping LinkedIn, Internshala, and Unstop. Built with a relevance scoring engine (0–10) and blacklist filters, featuring batch upserts to Supabase and a real-time React Kanban dashboard.',
    highlights: ['Multi-platform Cheerio Web Scraping', 'Automated SHA-256 UUID Deduplication', 'Supabase Relational Database & Row-Level Security', 'Real-time React Kanban Drag-and-Drop Board'],
    tech: ['React.js', 'Node.js', 'Supabase', 'Cheerio', 'SHA-256 UUIDs', 'Vercel'],
    liveLink: 'https://internly-eta.vercel.app',
    githubLink: 'https://github.com/vermaaaditya'
  },
  {
    id: 'krishivision',
    name: 'KrishiVision',
    role: 'Project Lead (3rd Place Hackathon)',
    category: 'AI & ML',
    description: 'AI-powered crop disease identifier that detects plant leaf diseases from user uploads. Built for BuildHub Hackathon 2026, securing 3rd place overall. Integrates a React frontend with a Flask API running a trained MobileNetV2 model.',
    highlights: ['BuildHub Hackathon 2026 3rd Place Winner', 'Fine-tuned MobileNetV2 Deep Learning Convolutional Neural Network', 'PlantVillage Dataset Trained Model (98.4% accuracy)', 'Flask RESTful Inference Engine API'],
    tech: ['React.js', 'Flask', 'MobileNetV2', 'Python', 'PlantVillage Dataset', 'Firebase Storage'],
    liveLink: null,
    githubLink: 'https://github.com/vermaaaditya'
  },
  {
    id: 'siettpo',
    name: 'SIET Training & Placement Portal',
    role: 'Lead Architect',
    category: 'Production Web',
    description: 'The official Training & Placement Cell web portal for SIET Panchkula. Built to streamline placement statistics, coordinator contact info, and training details. Live in production and actively maintained.',
    highlights: ['Production Deployment for SIET Institutional TPO', 'Interactive Placement Metrics & Past Recruiter Showcase', 'Vite & Tailwind CSS Optimized Fast Loading Bundle', 'Automated CI/CD Pipeline via Vercel'],
    tech: ['React.js', 'Vite', 'Tailwind CSS', 'Vercel CI/CD', 'Production Deploy'],
    liveLink: 'https://siettpo.vercel.app',
    githubLink: 'https://github.com/vermaaaditya'
  },
  {
    id: 'siet-website',
    name: 'SIET Official Website',
    role: 'Frontend Contributor',
    category: 'Production Web',
    description: "Contributed to the design, feature definition, UI development, and deployment of the official institutional website for the State Institute of Engineering & Technology, Panchkula. Live in production at sietpanchkula.ac.in.",
    highlights: ['Official Government Institution Portal', 'Accessible UI & Fully Responsive Cross-Device Grid', 'High-traffic Production Hosting & Performance Audit'],
    tech: ['HTML/CSS', 'JavaScript', 'Responsive Design', 'Vite', 'Production Support'],
    liveLink: 'https://sietpanchkula.ac.in',
    githubLink: null
  },
  {
    id: 'autonex-site',
    name: 'AUTONEX Club Web Portal',
    role: 'Co-Founder & President',
    category: 'Production Web',
    description: 'Official portal for the Robotics & Automation Club at SIET Panchkula. Represents club initiatives, handles workshop registrations, displays robotics projects, and manages club member records.',
    highlights: ['Official Portal for AUTONEX Robotics Club', 'Workshop Registration & Event Showcase System', 'Framer Motion Cyberpunk Cybernetic Micro-animations'],
    tech: ['React.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Lucide Icons'],
    liveLink: null,
    githubLink: 'https://github.com/vermaaaditya'
  },
  {
    id: 'northjobs',
    name: 'NorthJobs',
    role: 'Creator',
    category: 'Full-Stack & Scraping',
    description: 'Automated government job aggregator scraping North Indian recruitment notices, parsing qualifications, and compiling them into a unified search directory for students.',
    highlights: ['North Indian Government Gazette Scraper', 'Node.js Automated Scheduled Cron Jobs', 'Next.js Server Side Rendered Search Index'],
    tech: ['Next.js', 'Supabase', 'React.js', 'Cheerio Web Scraper', 'Node.js Cron'],
    liveLink: null,
    githubLink: 'https://github.com/vermaaaditya'
  }
];

const categories = ['ALL', 'Full-Stack & Scraping', 'AI & ML', 'Production Web'];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalTab, setModalTab] = useState('overview'); // 'overview' | 'code'
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setModalTab('overview');
    setCopiedSnippet(false);
  };

  const handleCopySnippet = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 1500);
  };

  const filteredProjects = activeCategory === 'ALL'
    ? allProjects
    : allProjects.filter(p => p.category === activeCategory);

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
        <div className="border-b border-brand-border pb-8 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
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

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-white/5 font-mono text-xs">
          <div className="flex items-center gap-2 text-stone-500 mr-2 uppercase tracking-wider text-[11px]">
            <Filter className="w-3.5 h-3.5 text-[#d4c97a]" />
            <span>FILTER:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-[3px] uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#d4c97a] text-[#0a0a0a] font-bold shadow-[0_0_15px_rgba(212,201,122,0.3)]'
                  : 'bg-[#141414] text-stone-400 hover:text-stone-100 border border-[#2a2a2a]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid with 3D Tilt Micro-Interactions */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <TiltCard maxTilt={8} scale={1.02}>
                  <div
                    onClick={() => handleOpenModal(project)}
                    className="project-glass p-6 md:p-8 flex flex-col justify-between rounded-[4px] border border-white/5 hover:border-[#d4c97a]/40 hover:shadow-[0_0_25px_rgba(212,201,122,0.08)] transition-all duration-300 relative group cursor-pointer h-full"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-mono text-[9px] text-[#d4c97a] bg-[#d4c97a]/10 border border-[#d4c97a]/30 px-2 py-0.5 rounded uppercase tracking-widest">
                          {project.category}
                        </span>
                        <span className="font-mono text-[10px] text-stone-600 uppercase tracking-widest group-hover:text-stone-300 transition-colors flex items-center gap-1">
                          <Code2 className="w-3 h-3 text-[#d4c97a]" />
                          SPEC & CODE &rarr;
                        </span>
                      </div>

                      {/* Header info */}
                      <div className="flex justify-between items-start gap-4 mb-4">
                        <div>
                          <span className="font-mono text-[10px] text-stone-400 uppercase tracking-widest block mb-1">
                            {project.role}
                          </span>
                          <h2 className="font-heading font-bold text-xl md:text-2xl text-stone-100 group-hover:text-[#d4c97a] transition-colors">
                            {project.name}
                          </h2>
                        </div>
                        
                        {/* Action Links */}
                        <div 
                          className="flex items-center gap-3 shrink-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {project.githubLink && (
                            <a 
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-stone-500 hover:text-stone-100 transition-colors p-1"
                              title="GitHub Code"
                            >
                              <GithubIcon className="w-4.5 h-4.5" />
                            </a>
                          )}
                          {project.liveLink && (
                            <a 
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-stone-500 hover:text-[#d4c97a] transition-colors p-1"
                              title="Live Demo"
                            >
                              <ExternalLink className="w-4.5 h-4.5" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-stone-300 font-sans text-xs md:text-sm leading-relaxed mb-6 text-justify">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                      {project.tech.map((tag) => (
                        <span 
                          key={tag}
                          className="font-mono text-[10px] text-stone-400 bg-white/5 border border-white/5 rounded-[2px] px-2 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Deep-Dive Project Detail Drawer Modal + Live Architecture Code Snippet Viewer */}
      <AnimatePresence>
        {selectedProject && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-[#0e0e0e] border border-[#d4c97a]/50 rounded-[6px] shadow-[0_0_50px_rgba(212,201,122,0.15)] overflow-hidden font-mono select-none relative"
            >
              {/* Header */}
              <div className="bg-[#141414] border-b border-[#222] px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5 border border-[#333] rounded px-2 py-1 bg-[#0a0a0a]">
                    <button
                      onClick={() => setModalTab('overview')}
                      className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded transition-colors ${
                        modalTab === 'overview' ? 'bg-[#d4c97a] text-[#0a0a0a]' : 'text-stone-400 hover:text-stone-100'
                      }`}
                    >
                      OVERVIEW
                    </button>
                    <button
                      onClick={() => setModalTab('code')}
                      className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded transition-colors flex items-center gap-1 ${
                        modalTab === 'code' ? 'bg-[#d4c97a] text-[#0a0a0a]' : 'text-stone-400 hover:text-stone-100'
                      }`}
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      CODE SNIPPET
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-stone-400 hover:text-stone-100 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body Content */}
              <div className="p-6 md:p-8 space-y-6 max-h-[75vh] overflow-y-auto terminal-scrollbar">
                {modalTab === 'overview' ? (
                  <>
                    <div>
                      <span className="text-[10px] text-stone-500 uppercase tracking-widest block mb-1">
                        {selectedProject.role}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-stone-100">
                        {selectedProject.name}
                      </h2>
                    </div>

                    <div>
                      <h4 className="text-xs text-[#d4c97a] font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5" />
                        PROJECT OVERVIEW
                      </h4>
                      <p className="font-sans text-xs md:text-sm text-stone-300 leading-relaxed text-justify">
                        {selectedProject.description}
                      </p>
                    </div>

                    {selectedProject.highlights && (
                      <div>
                        <h4 className="text-xs text-[#d4c97a] font-bold uppercase tracking-wider mb-2">
                          KEY ARCHITECTURAL HIGHLIGHTS
                        </h4>
                        <ul className="space-y-2">
                          {selectedProject.highlights.map((h, i) => (
                            <li key={i} className="text-xs text-stone-300 flex items-start gap-2.5 font-sans">
                              <span className="text-[#d4c97a] font-mono mt-0.5">&gt;</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div>
                      <h4 className="text-xs text-stone-400 font-bold uppercase tracking-wider mb-2">
                        STATION & TECH STACK
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs text-stone-300 bg-white/5 border border-white/10 px-3 py-1 rounded-[2px]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-xs text-[#d4c97a] font-bold uppercase tracking-wider flex items-center gap-2">
                        <Code2 className="w-4 h-4" />
                        ARCHITECTURE CODE PIPELINE ({selectedProject.name})
                      </h4>
                      {projectSnippets[selectedProject.id] && (
                        <button
                          onClick={() => handleCopySnippet(projectSnippets[selectedProject.id])}
                          className="bg-[#181818] hover:bg-[#222] text-[#d4c97a] border border-[#d4c97a]/40 px-3 py-1 rounded text-xs uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          {copiedSnippet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedSnippet ? 'COPIED!' : 'COPY CODE'}</span>
                        </button>
                      )}
                    </div>

                    {projectSnippets[selectedProject.id] ? (
                      <div className="bg-[#050505] border border-[#222] rounded-[4px] p-4 font-mono text-[11px] leading-relaxed text-stone-300 overflow-x-auto terminal-scrollbar">
                        <pre className="whitespace-pre">{projectSnippets[selectedProject.id]}</pre>
                      </div>
                    ) : (
                      <div className="p-8 text-center text-stone-500 text-xs uppercase tracking-wider">
                        Source snippet proprietary or NDA protected for institutional release.
                      </div>
                    )}
                  </div>
                )}

                {/* Footer Action Links */}
                <div className="pt-4 border-t border-[#222] flex flex-wrap gap-4 items-center">
                  {selectedProject.liveLink && (
                    <a
                      href={selectedProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#d4c97a] text-[#0a0a0a] font-bold text-xs uppercase px-5 py-2.5 rounded-[3px] hover:bg-white transition-colors inline-flex items-center gap-2"
                    >
                      <span>LAUNCH LIVE SYSTEM</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#0a0a0a]" />
                    </a>
                  )}
                  {selectedProject.githubLink && (
                    <a
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#141414] text-stone-300 border border-[#2a2a2a] hover:border-stone-400 font-bold text-xs uppercase px-5 py-2.5 rounded-[3px] transition-colors inline-flex items-center gap-2"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>VIEW CODE ON GITHUB</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
