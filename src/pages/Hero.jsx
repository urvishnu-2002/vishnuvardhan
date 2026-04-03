import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Terminal, Database, Server, ChevronRight, Briefcase, Code, GraduationCap, TrendingUp, Activity, MonitorSmartphone, LayoutDashboard, Sparkles, Zap, Cpu, Globe } from 'lucide-react';

const BOOT_SEQUENCE = [
    "> INITIALIZING V_PORTFOLIO_OS v3.0",
    "> [OK] Full-Stack Developer Kernel Loaded",
    "> [OK] Django & React Frameworks Ready",
    "> [OK] Supply Chain Data Analytics Engine Online",
    "> [SYSTEM] Portfolio Status: PRODUCTION READY",
    "> [INFO] AI & ML Detection algorithms online.",
    "> [SECURE] Secure Medical Database Tunnel Established.",
    "> Awaiting Client Input..."
];

const DecodingText = ({ text, className }) => {
    const [displayText, setDisplayText] = useState('');
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';

    useEffect(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(
                text.split('')
                    .map((char, index) => {
                        if (index < iteration) return text[index];
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join('')
            );

            if (iteration >= text.length) clearInterval(interval);
            iteration += 1 / 3;
        }, 30);
        return () => clearInterval(interval);
    }, [text]);

    return <span className={className}>{displayText}</span>;
};

const TerminalVisualization = () => {
    const [lines, setLines] = useState([]);

    useEffect(() => {
        let currentLine = 0;
        setLines([]);
        const interval = setInterval(() => {
            if (currentLine < BOOT_SEQUENCE.length) {
                const nextLine = BOOT_SEQUENCE[currentLine];
                if (nextLine) {
                    setLines(prev => [...prev, nextLine]);
                }
                currentLine++;
            } else {
                clearInterval(interval);
            }
        }, 600);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full max-w-lg mx-auto bg-black/90 backdrop-blur-xl rounded-xl border border-[var(--color-cyber-slate-700)] shadow-[0_20px_60px_rgba(0,0,0,1)] overflow-hidden font-mono text-[10px] sm:text-xs h-[300px] flex flex-col relative z-20 pointer-events-auto group">
            <div className="bg-[var(--color-cyber-slate-900)] px-4 py-3 flex items-center justify-between border-b border-[var(--color-cyber-slate-700)]">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-[var(--color-cyber-emerald)] shadow-[0_0_8px_var(--color-cyber-emerald)]"></div>
                </div>
                <span className="text-[var(--color-cyber-text-muted)] text-[9px] uppercase tracking-widest font-black">vv_root@terminal:~</span>
            </div>
            <div className="p-5 text-[var(--color-cyber-emerald)] flex-grow flex flex-col gap-2 overflow-hidden shadow-inner font-bold">
                {lines.map((line, i) => (
                    line ? (
                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={i} className={line.includes("[SECURE]") ? "text-blue-400" : line.includes("Awaiting") ? "text-white animate-pulse" : ""}>
                            {line}
                        </motion.div>
                    ) : null
                ))}
                {lines.length < BOOT_SEQUENCE.length && (
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-2 h-4 bg-[var(--color-cyber-emerald)] mt-1 shadow-[0_0_8px_var(--color-cyber-emerald)]"></motion.div>
                )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-cyber-emerald)]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
    );
};

const FloatingNodes = () => {
    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <motion.div animate={{ y: [-20, 20, -20], x: [-20, 20, -20] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-[var(--color-cyber-emerald)] opacity-[0.03] blur-[120px]" />
            <motion.div animate={{ y: [20, -20, 20], x: [20, -20, 20] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-[10%] right-[10%] w-[60vw] h-[60vw] rounded-full bg-blue-500 opacity-[0.02] blur-[150px]" />

            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_70%)]" />
        </div>
    );
};

const MatrixCard = ({ title, icon: Icon, items, link, linkText, delay = 0 }) => {
    let x = useMotionValue(0);
    let y = useMotionValue(0);

    const handleMouseMove = (e) => {
        let rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay, type: "spring", bounce: 0.3 }}
            onMouseMove={handleMouseMove}
            className="group relative flex flex-col md:flex-row gap-8 md:gap-12 p-8 md:p-12 lg:p-16 bg-[var(--color-cyber-slate-900)] overflow-hidden cursor-pointer cyber-card"
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                style={{
                    background: useMotionTemplate`radial-gradient(600px circle at ${x}px ${y}px, rgba(16, 185, 129, 0.15), transparent 80%)`
                }}
            />

            <div className="relative z-10 flex flex-col items-start gap-4 md:w-1/3 pointer-events-none">
                <div className="w-16 h-16 rounded-2xl cyber-glass border border-[var(--color-cyber-emerald)]/30 flex items-center justify-center bg-[var(--color-cyber-slate-800)]/80 shadow-[0_0_30px_rgba(16,185,129,0.15)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <Icon size={32} className="text-[var(--color-cyber-emerald)]" />
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-widest uppercase mt-2 leading-tight">{title}</h3>

                <Link to={link} className="flex items-center gap-4 mt-6 group/link pointer-events-auto cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-cyber-slate-800)] border border-[var(--color-cyber-slate-700)] flex items-center justify-center group-hover/link:bg-[var(--color-cyber-emerald)] group-hover/link:text-black group-hover/link:shadow-[0_0_15px_var(--color-cyber-emerald)] text-[var(--color-cyber-emerald)] transition-all duration-300">
                        <ChevronRight size={18} className="group-hover/link:translate-x-0.5 transition-transform" />
                    </div>
                    <span className="text-[11px] lg:text-[12px] font-black text-[var(--color-cyber-text-muted)] group-hover/link:text-[var(--color-cyber-emerald)] uppercase tracking-widest transition-colors">{linkText}</span>
                </Link>
            </div>

            <div className="relative z-10 flex flex-col gap-8 md:w-2/3 md:border-l border-[var(--color-cyber-slate-700)]/60 md:pl-12 pt-6 md:pt-0 pointer-events-none">
                {items.map((item, idx) => (
                    <div key={idx} className="relative pl-6 border-l-2 border-[var(--color-cyber-slate-700)] group-hover:border-l-[var(--color-cyber-emerald)] transition-colors duration-500">
                        <div className="absolute -left-[9px] top-[6px] w-4 h-4 rounded-full bg-[var(--color-cyber-slate-900)] border-2 border-[var(--color-cyber-slate-500)] group-hover:border-[var(--color-cyber-emerald)] group-hover:bg-[var(--color-cyber-emerald)] transition-colors duration-500 shadow-[0_0_10px_transparent] group-hover:shadow-[0_0_10px_var(--color-cyber-emerald)]"></div>
                        <h4 className="text-white font-bold text-base lg:text-lg tracking-wide uppercase">{item.title}</h4>
                        <p className="text-[var(--color-cyber-text-muted)] text-[14px] lg:text-[15px] mt-2.5 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                ))}
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 right-10 opacity-[0.02] group-hover:opacity-[0.08] group-hover:-translate-x-8 transition-all duration-1000 pointer-events-none z-0">
                <Icon size={280} />
            </div>
        </motion.div>
    );
};

const Hero = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <section className="relative flex flex-col pt-[58vh] px-6 md:px-12 overflow-hidden bg-[var(--color-cyber-slate-950)] min-h-screen">
            <FloatingNodes />

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 items-center w-full min-h-[70vh] relative z-20">
                    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="flex flex-col w-full relative z-20">
                        <motion.div variants={itemVariants} className="mb-6">
                            <Link to="/contact">
                                <motion.div
                                    className="status-badge w-fit mb-8 group/badge"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="status-dot-container">
                                        <div className="status-sonar"></div>
                                        <div className="status-dot"></div>
                                    </div>
                                    <span className="group-hover/badge:hidden">Available for Freelance Projects</span>
                                    <span className="hidden group-hover/badge:inline-flex items-center gap-2">
                                        Hire Me Now / Start a project <ChevronRight size={14} className="animate-bounce-x" />
                                    </span>
                                </motion.div>
                            </Link>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mb-8 max-w-4xl">
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-[var(--color-cyber-text-main)]">
                                <DecodingText text="Full-Stack Web Developer" className="text-gradient-emerald" />
                            </h1>
                        </motion.div>

                        <motion.div variants={itemVariants} className="relative w-full overflow-hidden py-4 -mx-6 px-6 mb-8 group">
                            {/* Gradient Fades for Smooth Edges */}
                            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[var(--color-cyber-slate-950)] to-transparent z-10" />
                            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[var(--color-cyber-slate-950)] to-transparent z-10" />

                            <motion.div
                                animate={{ x: ["0%", "-50%"] }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                className="flex gap-4 w-fit"
                            >
                                {[...Array(2)].map((_, i) => (
                                    <div key={i} className="flex gap-4 pr-4">
                                        {['Python', 'JavaScript', 'Django', 'React.js', 'REST APIs', 'MySQL / SQL', 'Data Analysis', 'Performance Tuning'].map((skill, idx) => (
                                            <span key={idx} className="flex items-center gap-2 px-6 py-2.5 rounded-xl cyber-glass text-[11px] font-mono font-black text-[var(--color-cyber-emerald)] border border-[var(--color-cyber-slate-700)] shadow-xl uppercase tracking-[0.2em] whitespace-nowrap group/skill hover:border-[var(--color-cyber-emerald)] transition-colors">
                                                {skill.includes('Python') ? <Terminal size={14} /> :
                                                    skill.includes('Django') ? <Server size={14} /> :
                                                        skill.includes('React') ? <Sparkles size={14} /> :
                                                            skill.includes('Performance') ? <Zap size={14} /> :
                                                                skill.includes('REST') ? <LayoutDashboard size={14} /> :
                                                                    skill.includes('Data') ? <Cpu size={14} /> :
                                                                        <Globe size={14} />}
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="max-w-xl space-y-6 mb-8">
                            <p className="text-lg md:text-xl text-[var(--color-cyber-text-muted)] leading-relaxed font-medium border-l-2 border-[var(--color-cyber-emerald)]/30 pl-6">
                                Results-driven <span className="text-white">Full-Stack Web Developer</span> with 1+ years of experience designing and deploying scalable web applications using <span className="text-white">Django</span> and modern JavaScript frameworks.
                            </p>
                            <div className="flex flex-wrap gap-4 items-center">
                                <Link to="/contact" className="cyber-btn w-fit group">
                                    Start a Project <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <a
                                    href="/assets/resume.pdf"
                                    download="Vishnuvardhan_Resume.pdf"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="cyber-btn w-fit group shadow-[0_0_20px_var(--color-cyber-emerald-glow)] hover:shadow-[0_0_35px_var(--color-cyber-emerald)] transition-all duration-500"
                                >
                                    DOWNLOAD RESUME <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} transition={{ duration: 1.5, delay: 1, type: "spring" }} className="hidden lg:flex justify-end items-center relative w-full pointer-events-none">
                        <div className="relative w-full max-w-[550px]">
                            <TerminalVisualization />

                            {/* Floating Widgets with enhanced animations */}
                            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-12 -left-12 z-30">
                                <div className="cyber-glass p-4 rounded-2xl border border-[var(--color-cyber-emerald)]/30 shadow-2xl backdrop-blur-2xl">
                                    <Activity className="text-[var(--color-cyber-emerald)] mb-2" size={24} />
                                    <div className="text-[10px] font-black uppercase tracking-widest text-[var(--color-cyber-text-muted)]">Response Rate</div>
                                    <div className="text-2xl font-black text-white">99.9%</div>
                                </div>
                            </motion.div>

                            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute -bottom-10 -right-10 z-30">
                                <div className="cyber-glass p-4 rounded-2xl border border-blue-500/30 shadow-2xl backdrop-blur-2xl">
                                    <TrendingUp className="text-blue-400 mb-2" size={24} />
                                    <div className="text-[10px] font-black uppercase tracking-widest text-[var(--color-cyber-text-muted)]">Efficiency</div>
                                    <div className="text-2xl font-black text-white">10/10</div>
                                </div>
                            </motion.div>

                            <div className="absolute -inset-10 border border-[var(--color-cyber-slate-700)]/20 rounded-[40px] pointer-events-none z-0 hidden xl:block"></div>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-20 mb-32 relative z-50">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-cyber-emerald)] to-transparent opacity-30"></div>

                    <div className="flex flex-col gap-12 max-w-5xl mx-auto py-24">
                        <MatrixCard
                            title="Experience"
                            icon={Briefcase}
                            delay={0}
                            items={[
                                { title: "Priyansh Technologies", desc: "Engineering scalable multi-vendor e-commerce platforms and high-performance corporate solutions using Django." },
                                { title: "Amazon Operations", desc: "Supply chain data analyst optimizing logistics networks and resolving high-priority escalations via KPI tracking." }
                            ]}
                            link="/experience"
                            linkText="View Full Log"
                        />

                        <MatrixCard
                            title="Technical Core"
                            icon={Zap}
                            delay={0.15}
                            items={[
                                { title: "Full-Stack Web", desc: "Expertise in Python/Django backends and React/JavaScript frontends for high-performance systems." },
                                { title: "Data Intelligence", desc: "Optimization of internal workflows and API integration delivering data-driven business objectives." }
                            ]}
                            link="/about"
                            linkText="Inspect Stack"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;