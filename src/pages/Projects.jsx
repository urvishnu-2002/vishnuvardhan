import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, X, Shield, Brain, Layout, ChevronRight, CheckCircle, Component, FileJson, MonitorIcon, Zap, Search, AlertTriangle, Utensils } from 'lucide-react';

const projectsData = [
    {
        id: "shopsphere",
        title: "ShopSphere Marketplace",
        category: "E-Commerce",
        icon: Component,
        image: "/assets/images/shopsphere.png",
        shortDesc: "High-traffic Django multi-vendor marketplace handling real-time inventory and complex concurrent authentications.",
        tech: ["Django", "Python", "React", "REST API", "PostgreSQL"],
        date: "Priyansh Technologies",
        challenges: [
            "Coordinating data consistency over highly concurrent vendor database read/writes.",
            "Guaranteeing near-zero latency for global inventory status checks."
        ],
        solutions: [
            "Implemented REST API cache pooling to handle 85% of standard payload requests.",
            "Engineered robust auth systems isolating sensitive vendor datasets behind encrypted channels."
        ]
    },
    {
        id: "medicalds",
        title: "Encrypted Medical Search",
        category: "Cybersecurity",
        icon: Shield,
        shortDesc: "A secure architecture permitting radically safe access to multi-authority medical databases via encrypted queries.",
        tech: ["Python", "Cryptography", "Security Protocols", "MySQL"],
        date: "Feb 2024 – May 2024",
        challenges: [
            "Ensuring absolute data privacy across independent medical authorities.",
            "Implementing authorized encryption without sacrificing deep search performance."
        ],
        solutions: [
            "Architected encryption standard permitting queries to run on ciphertexts directly.",
            "Established a secure access-control proxy verifying multi-authority credentials."
        ]
    },
    {
        id: "fakedetector",
        title: "AI Statement Detection",
        category: "Machine Learning",
        icon: Brain,
        shortDesc: "Algorithmic platform determining fake statements by public figures utilizing NLP and historical AI models.",
        tech: ["Python", "Machine Learning", "NLP", "AI Modeling"],
        date: "Aug 2023 – Nov 2023",
        challenges: [
            "Processing unpredictable natural language structures and dialects effectively.",
            "Tuning models on highly opinionated and fragmented political datasets."
        ],
        solutions: [
            "Deployed an AI-based NLP evaluation pipeline to classify complex statements dynamically.",
            "Utilized correlation algorithms to contextualize statements against concrete baseline truths."
        ]
    },
    {
        id: "smartxml",
        title: "SmartXML Architecture",
        category: "Data Engineering",
        icon: FileJson,
        image: "/assets/images/smartxml.png",
        shortDesc: "Automated XML parsing architecture securely mapping legacy supplier data to modern web clients.",
        tech: ["Python", "XML Parsing", "REST API", "Automation"],
        date: "Priyansh Technologies",
        challenges: [
            "Parsing unpredictable XML formats from legacy corporate providers.",
            "Structuring millions of data points continuously with tight memory constraints."
        ],
        solutions: [
            "Architected custom Python scripts for autonomous XML-to-web data mapping.",
            "Designed high-performance structured SEO renders for front-end architecture."
        ]
    },
    {
        id: "hpe",
        title: "HPE IT Solutions",
        category: "Enterprise UI",
        icon: MonitorIcon,
        image: "/assets/images/hpeitsolutions.png",
        shortDesc: "Professional service-oriented platform built with native components for absolute responsiveness and SEO.",
        tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
        date: "Priyansh Technologies",
        challenges: [
            "Translating complex corporate requirements into simple front-end features.",
            "Guaranteeing 100% responsiveness across all mobile views."
        ],
        solutions: [
            "Delivered comprehensive interactive portfolios with integrated service inquiry forms.",
            "Structured DOM leveraging pure HTML5/CSS3 avoiding third-party bloat."
        ]
    },
    {
        id: "restaurante",
        title: "Restaurant EBT Platform",
        category: "Frontend",
        icon: Utensils,
        shortDesc: "Highly responsive aesthetic platform for fluid food visualization and customer interaction.",
        tech: ["HTML5", "CSS3", "JavaScript", "UI UX"],
        date: "Apr 2023",
        challenges: [
            "Designing intuitive UI targeting fluid food visualization.",
            "Ensuring immediate cross-browser compatibility across mobile viewpoints."
        ],
        solutions: [
            "Leveraged HTML5/CSS3 native features for unbreakable responsive grids.",
            "Implemented lightweight JS micro-interactions enhancing menu browsing."
        ]
    }
];

const ProjectScanReveal = () => (
    <motion.div
        initial={{ top: "-100%" }}
        whileInView={{ top: "100%" }}
        transition={{ duration: 1.5, ease: "linear" }}
        className="absolute left-0 right-0 h-[2px] bg-[var(--color-cyber-emerald)] shadow-[0_0_15px_var(--color-cyber-emerald)] z-20 pointer-events-none opacity-40"
    />
);

const ProjectCard = ({ project, onClick }) => {
    return (
        <motion.div
            layoutId={project.id}
            onClick={() => onClick(project)}
            className="group relative cyber-card overflow-hidden cursor-pointer h-[450px] flex flex-col"
            whileHover={{ y: -10 }}
        >
            <ProjectScanReveal />
            
            <div className="relative h-48 mb-6 overflow-hidden rounded-xl border border-[var(--color-cyber-slate-800)] group-hover:border-[var(--color-cyber-emerald)]/30 transition-colors bg-[var(--color-cyber-slate-950)]">
                {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--color-cyber-slate-900)] to-black">
                        <project.icon size={48} className="text-[var(--color-cyber-text-muted)] opacity-30" />
                    </div>
                )}
                <div className="absolute top-4 left-4 z-10">
                    <span className="text-[10px] font-mono font-black text-[var(--color-cyber-emerald)] uppercase tracking-widest px-3 py-1 bg-black/80 backdrop-blur-md border border-[var(--color-cyber-emerald)]/30 rounded-full">{project.category}</span>
                </div>
            </div>

            <div className="flex flex-col flex-grow px-2">
                <h3 className="text-2xl font-black text-white mb-2 group-hover:text-[var(--color-cyber-emerald)] transition-colors tracking-tight uppercase">{project.title}</h3>
                <p className="text-[11px] text-[var(--color-cyber-slate-500)] mb-4 font-mono font-bold tracking-widest">{project.date}</p>
                
                <p className="text-sm text-[var(--color-cyber-text-muted)] leading-relaxed mb-6 line-clamp-3 font-medium">
                    {project.shortDesc}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto pb-4">
                    {project.tech.slice(0, 4).map((t, i) => (
                        <span key={i} className="px-2 py-1 text-[9px] font-mono font-black rounded-lg bg-[var(--color-cyber-slate-950)] text-[var(--color-cyber-text-muted)] border border-[var(--color-cyber-slate-800)] group-hover:border-[var(--color-cyber-emerald)]/20 transition-colors uppercase tracking-widest">
                            {t}
                        </span>
                    ))}
                    {project.tech.length > 4 && <span className="text-[9px] font-mono text-[var(--color-cyber-slate-500)] flex items-center">+{project.tech.length - 4} more</span>}
                </div>
            </div>

            {/* Hover Background Accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-cyber-emerald)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </motion.div>
    );
};

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <section className="min-h-screen pt-32 pb-32 px-6 md:px-12 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-20"
            >
                <div className="status-badge w-fit mb-6">
                    <div className="status-dot"></div>
                    Project Repository Verified
                </div>
                <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight">
                    Technical <span className="text-gradient-emerald">Showcase</span>
                </h1>
                <p className="text-[var(--color-cyber-text-muted)] text-xl max-w-3xl leading-relaxed font-medium">
                    Architectural deep-dives into mission-critical e-commerce platforms, AI-driven linguistics systems, and high-fidelity enterprise UI deployments.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsData.map((project, index) => (
                    <ProjectCard key={project.id} project={project} onClick={setSelectedProject} />
                ))}
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            layoutId={selectedProject.id}
                            className="cyber-card relative w-full max-w-4xl overflow-y-auto max-h-[90vh] bg-[var(--color-cyber-slate-900)] p-0 border-[var(--color-cyber-emerald)]/50 shadow-[0_0_100px_rgba(0,0,0,1)]"
                            onClick={(e) => e.stopPropagation()}
                            data-lenis-prevent
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-6 right-6 w-12 h-12 rounded-full cyber-glass flex items-center justify-center text-[var(--color-cyber-emerald)] border border-[var(--color-cyber-emerald)]/50 hover:bg-[var(--color-cyber-emerald)] hover:text-black transition-all group z-[110] shadow-2xl"
                            >
                                <X size={24} />
                            </button>

                            {selectedProject.image ? (
                                <div className="w-full h-80 overflow-hidden border-b border-[var(--color-cyber-slate-800)] relative">
                                    <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-cyber-slate-900)] to-transparent" />
                                </div>
                            ) : (
                                <div className="w-full h-40 bg-[var(--color-cyber-slate-950)] border-b border-[var(--color-cyber-slate-800)]" />
                            )}

                            <div className="p-8 md:p-12 lg:p-16">
                                <div className="mb-12">
                                    <span className="inline-block px-4 py-1.5 text-[10px] font-black text-[var(--color-cyber-emerald)] bg-[var(--color-cyber-emerald)]/10 rounded-full mb-6 uppercase tracking-widest border border-[var(--color-cyber-emerald)]/30 shadow-lg">
                                        {selectedProject.category}
                                    </span>
                                    <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase">{selectedProject.title}</h2>
                                    <p className="text-[var(--color-cyber-emerald)] font-mono text-[11px] mb-8 uppercase tracking-[0.2em] font-black">{selectedProject.date}</p>

                                    <p className="text-xl md:text-2xl text-[var(--color-cyber-text-muted)] leading-relaxed font-medium border-l-4 border-[var(--color-cyber-emerald)] pl-8 py-2">
                                        {selectedProject.shortDesc}
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-10 mb-12">
                                    <div className="space-y-6">
                                        <h4 className="text-lg font-black text-white flex items-center gap-3 uppercase tracking-[0.1em]">
                                            <AlertTriangle size={20} className="text-amber-400" /> Architectural Hurdles
                                        </h4>
                                        <ul className="space-y-4">
                                            {selectedProject.challenges.map((challenge, idx) => (
                                                <li key={idx} className="flex items-start gap-4 text-sm text-[var(--color-cyber-text-muted)] leading-relaxed font-medium">
                                                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                                                    <span>{challenge}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-lg font-black text-white flex items-center gap-3 uppercase tracking-[0.1em]">
                                            <CheckCircle size={20} className="text-[var(--color-cyber-emerald)]" /> Engineered Solutions
                                        </h4>
                                        <ul className="space-y-4">
                                            {selectedProject.solutions.map((solution, idx) => (
                                                <li key={idx} className="flex items-start gap-4 text-sm text-white leading-relaxed font-bold">
                                                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--color-cyber-emerald)] flex-shrink-0 shadow-[0_0_5px_var(--color-cyber-emerald)]" />
                                                    <span>{solution}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="pt-10 border-t border-[var(--color-cyber-slate-800)] flex flex-wrap gap-3">
                                    {selectedProject.tech.map((t, i) => (
                                        <span key={i} className="px-4 py-2 text-[10px] font-black rounded-xl bg-[var(--color-cyber-slate-950)] text-[var(--color-cyber-emerald)] border border-[var(--color-cyber-slate-800)] uppercase tracking-widest shadow-inner">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;