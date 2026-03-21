import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, X, Shield, Brain, Layout, ChevronRight, CheckCircle, Component, FileJson, MonitorIcon } from 'lucide-react';

const projectsData = [
    {
        id: "shopsphere",
        title: "ShopSphere",
        category: "E-Commerce",
        icon: Component,
        shortDesc: "High-traffic Django multi-vendor marketplace handling real-time inventory checks and complex authentications.",
        tech: ["Django", "Python", "React", "PostgreSQL", "REST API"],
        github: "#", 
        date: "Priyansh Technologies",
        challenges: [
            "Coordinating absolute data consistency over highly concurrent vendor database read/writes.",
            "Guaranteeing near-zero latency for global inventory status checks during massive flash sales."
        ],
        solutions: [
            "Implemented a sophisticated REST API cache pooling to handle 85% of standard payload requests purely organically.",
            "Engineered robust cart/auth systems isolating sensitive vendor datasets behind strictly encrypted channels."
        ]
    },
    {
        id: "smartxml",
        title: "SmartXML Solutions",
        category: "Architecture",
        icon: FileJson,
        shortDesc: "Automated XML parsing architecture securely mapping legacy unstructured supplier data to modern web clients.",
        tech: ["Python", "XML", "REST API", "Scripts"],
        github: "#", 
        date: "Priyansh Technologies",
        challenges: [
            "Parsing entirely unpredictable XML formats dynamically extracted from legacy corporate providers.",
            "Structuring millions of data points continuously with extremely tight memory constraints natively."
        ],
        solutions: [
            "Architected a custom Python script-layer to execute autonomous XML-to-web data mapping precisely.",
            "Designed a front-end architecture exclusively focused on extraordinarily high-performance structured SEO renders."
        ]
    },
    {
        id: "hpe",
        title: "HPE IT Solutions",
        category: "Corporate UI",
        icon: MonitorIcon,
        shortDesc: "Professional service-oriented platform built utilizing strictly native components guaranteeing absolute responsiveness.",
        tech: ["HTML5", "CSS3", "JavaScript", "UI/UX"],
        github: "#", 
        date: "Priyansh Technologies",
        challenges: [
            "Translating very complex corporate business requirements into simple, functional technical front-end features.",
            "Guaranteeing absolute 100% responsiveness and cross-browser parity across hundreds of mobile views."
        ],
        solutions: [
            "Delivered comprehensive interactive service portfolios and integrated heavy service inquiry forms securely.",
            "Meticulously structured the DOM leveraging pure HTML5 and CSS3 actively avoiding heavy third-party bloat."
        ]
    },
    {
        id: "medicalds",
        title: "Encrypted Medical Search",
        category: "Cybersecurity",
        icon: Shield,
        shortDesc: "A secure website architecture permitting easy and radically safe access to multi-authority medical databases.",
        tech: ["Crypto", "Security", "Web Architecture"],
        github: "#", 
        date: "02/2024 – 05/2024",
        challenges: [
            "Ensuring absolute data privacy across completely independent medical authorities seamlessly.",
            "Implementing complex authorized encryption protocols without sacrificing deep native search performance."
        ],
        solutions: [
            "Architected a robust encryption standard permitting queries to run on ciphertexts strictly directly.",
            "Established a secure access-control proxy verifying multi-authority credentials identically."
        ]
    },
    {
        id: "fakedetector",
        title: "AI Statement Detector",
        category: "Machine Learning",
        icon: Brain,
        shortDesc: "A dense algorithmic platform determining fake statements made by public figures strictly utilizing Artificial Intelligence models.",
        tech: ["Python", "Machine Learning", "NLP", "AI"],
        github: "#",
        date: "08/2023 – 11/2023",
        challenges: [
            "Processing totally unpredictable natural language structures and dialects effectively.",
            "Tuning subjective models on highly opinionated and fragmented political datasets."
        ],
        solutions: [
            "Deployed an AI-based NLP evaluation pipeline to parse and classify complex statements dynamically.",
            "Utilized intelligent correlation algorithms to historically contextualize public statements against concrete baseline truths."
        ]
    },
    {
        id: "restaurante",
        title: "EBT Restaurant Platform",
        category: "Frontend Design",
        icon: Layout,
        shortDesc: "Constructed a highly responsive aesthetic static corporate website for a restaurant.",
        tech: ["HTML5", "CSS3", "JavaScript"],
        github: "#",
        date: "04/2023 – 04/2023",
        challenges: [
            "Designing an effortlessly intuitive UI/UX specifically targeting fluid food visualization.",
            "Ensuring immediate cross-browser compatibility heavily across hundreds of mobile viewpoints natively."
        ],
        solutions: [
            "Leveraged HTML5 and CSS3 native features enforcing fluid, unbreakable responsive grids.",
            "Implemented remarkably lightweight JavaScript micro-interactions vastly enhancing native customer menu browsing."
        ]
    }
];

const TiltCard = ({ project, onClick }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

    // Calculate dynamic glowing shadow mapping inverse to cursor tracking tilt parameters
    const shadowPositionX = useTransform(mouseXSpring, [-0.5, 0.5], ["-20px", "20px"]);
    const shadowPositionY = useTransform(mouseYSpring, [-0.5, 0.5], ["-20px", "20px"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => onClick(project)}
            className="relative group min-[1024px]:cursor-none cursor-pointer h-[320px]"
        >
            <div className="cyber-card flex flex-col h-full inset-0 absolute transform transition-all duration-300 min-[1024px]:pointer-events-none">
                <div style={{ transform: "translateZ(40px)" }} className="flex flex-col h-full transition-transform duration-300 group-hover:scale-[1.02]">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 rounded-xl bg-[var(--color-cyber-slate-900)] flex items-center justify-center border border-[var(--color-cyber-slate-700)] group-hover:border-[var(--color-cyber-emerald)] transition-colors shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_15px_var(--color-cyber-emerald-glow)]">
                            <project.icon size={22} className="text-[var(--color-cyber-text-muted)] group-hover:text-[var(--color-cyber-emerald)] transition-colors" />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest px-2 py-1 bg-[var(--color-cyber-emerald-glow)] rounded">{project.category}</span>
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-cyber-text-main)] mb-1 group-hover:text-[var(--color-cyber-emerald)] transition-colors">{project.title}</h3>
                    <p className="text-[10px] sm:text-[11px] text-[var(--color-cyber-slate-400)] mb-3 font-mono">{project.date}</p>
                    <p className="text-[13px] sm:text-sm text-[var(--color-cyber-text-muted)] leading-relaxed mb-6 flex-grow">
                        {project.shortDesc}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto relative z-10 min-[1024px]:pointer-events-none pointer-events-auto">
                        {project.tech.map((t, i) => (
                            <span key={i} className="px-2 py-1 text-[9px] sm:text-[10px] font-mono rounded bg-[var(--color-cyber-slate-900)] text-[var(--color-cyber-text-muted)] border border-[var(--color-cyber-slate-700)]">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Extremely Dynamic Interactive Glow Shadow mapping to the physical mouse constraints */}
            <motion.div 
                className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-screen" 
                style={{ 
                    transform: "translateZ(1px)",
                    boxShadow: useTransform(() => `0 0 50px rgba(16, 185, 129, 0.1), inset ${shadowPositionX.get()} ${shadowPositionY.get()} 40px rgba(16, 185, 129, 0.1)`)
                }}
            />
            {/* Main Cyber Border Overlay */}
            <div 
                className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-[var(--color-cyber-emerald)]" 
                style={{ transform: "translateZ(1px)" }}
            />
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
                transition={{ duration: 0.6 }}
                className="mb-16 text-center md:text-left pt-6"
            >
                <h1 className="text-4xl md:text-6xl font-black text-[var(--color-cyber-text-main)] mb-4 tracking-tight">
                    Full Technical <span className="text-gradient-emerald">Showcase</span>
                </h1>
                <p className="text-[var(--color-cyber-text-muted)] text-lg max-w-3xl mx-auto md:mx-0 leading-relaxed">
                    Interactive deep-dives spanning professional corporate UI architectures, Django e-commerce deployments, and complex AI machine learning side-projects.
                    <span className="block mt-2 text-[12px] uppercase tracking-widest text-[var(--color-cyber-emerald)]">Hover cards to interact · Click for abstracts</span>
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: "1000px" }}>
                {projectsData.map((project, index) => (
                    <motion.div 
                        key={project.id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="h-full"
                    >
                        <TiltCard project={project} onClick={setSelectedProject} />
                    </motion.div>
                ))}
            </div>

            {/* Cinematic Spring Modal Portal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[var(--color-cyber-slate-950)]/70 backdrop-blur-md min-[1024px]:cursor-none"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            transition={{ type: "spring", damping: 20, stiffness: 220, bounce: 0.4 }}
                            className="cyber-card relative w-full max-w-3xl overflow-y-auto max-h-[90vh] shadow-[0_30px_60px_rgba(0,0,0,0.8)] border-[var(--color-cyber-emerald)] bg-[var(--color-cyber-slate-900)] overflow-x-hidden p-6 sm:p-10 pointer-events-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full cyber-glass flex items-center justify-center text-[var(--color-cyber-emerald)] border border-[var(--color-cyber-emerald)] hover:bg-[var(--color-cyber-emerald)] hover:text-black transition-colors shadow-[0_0_15px_var(--color-cyber-emerald-glow)] z-50 min-[1024px]:cursor-none"
                            >
                                <X size={20} />
                            </button>

                            <div className="mb-8">
                                <span className="inline-block px-3 py-1 text-xs font-mono font-bold text-[var(--color-cyber-emerald)] bg-[var(--color-cyber-emerald-glow)] rounded-md mb-4 uppercase tracking-widest border border-[var(--color-cyber-emerald)] shadow-sm">
                                    {selectedProject.category}
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-black text-white mb-2 tracking-tight">{selectedProject.title}</h2>
                                <p className="text-[var(--color-cyber-slate-400)] font-mono text-[12px] mb-4 uppercase tracking-widest">{selectedProject.date}</p>
                                <p className="text-[var(--color-cyber-text-muted)] text-[15px] sm:text-lg leading-relaxed max-w-2xl px-1 font-medium">
                                    {selectedProject.shortDesc}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 mb-10">
                                <div className="space-y-4 bg-[var(--color-cyber-slate-800)]/80 p-6 rounded-2xl border border-[var(--color-cyber-slate-700)] shadow-inner">
                                    <h4 className="text-lg font-black text-white flex items-center gap-2 uppercase tracking-wide">
                                        <Shield size={18} className="text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.5)]" /> Architectural Challenges
                                    </h4>
                                    <ul className="space-y-3">
                                        {selectedProject.challenges.map((challenge, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm text-[var(--color-cyber-text-muted)] leading-relaxed">
                                                <ChevronRight size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                                                <span>{challenge}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="space-y-4 bg-[var(--color-cyber-emerald-glow)] p-6 rounded-2xl border border-[var(--color-cyber-emerald)] relative overflow-hidden shadow-[0_0_20px_var(--color-cyber-emerald-glow)]">
                                    <div className="absolute -bottom-10 -right-10 opacity-10 pointer-events-none transform -rotate-12 scale-110">
                                        <selectedProject.icon size={130} />
                                    </div>
                                    <h4 className="text-lg font-black text-white flex items-center gap-2 relative z-10 uppercase tracking-wide text-shadow">
                                        <CheckCircle size={18} className="text-[var(--color-cyber-emerald)]" /> Engineered Solutions
                                    </h4>
                                    <ul className="space-y-3 relative z-10">
                                        {selectedProject.solutions.map((solution, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm text-white font-medium leading-relaxed drop-shadow-sm">
                                                <ChevronRight size={16} className="text-[var(--color-cyber-emerald)] mt-0.5 flex-shrink-0 drop-shadow-md" />
                                                <span>{solution}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-[var(--color-cyber-slate-700)]">
                                <div className="flex flex-wrap gap-2 w-full">
                                    {selectedProject.tech.map((t, i) => (
                                        <span key={i} className="px-3 py-1.5 text-[10px] sm:text-[11px] font-mono font-bold rounded bg-[var(--color-cyber-slate-950)] text-[var(--color-cyber-emerald)] border border-[var(--color-cyber-slate-700)] uppercase tracking-widest shadow-sm">
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