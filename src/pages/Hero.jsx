import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Terminal, Database, Server, ChevronRight, Briefcase, Code, GraduationCap, TrendingUp, Activity, MonitorSmartphone, LayoutDashboard } from 'lucide-react';

const BOOT_SEQUENCE = [
    "> INITIALIZING V_PORTFOLIO_OS v2.0",
    "> [OK] Loaded Core Architecture: React + Tailwind",
    "> [OK] Established Database Connection: PostgreSQL",
    "> [OK] Mounting Django REST API handlers",
    "> [SYSTEM] ROC Transport Operations module loaded.",
    "> [INFO] Empty Mile Reduction algorithms online.",
    "> [OK] NLP AI Statement pipeline ready.",
    "> [SECURE] End-to-End Encrypted Tunnel Established.",
    "> Awaiting User Input..."
];

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
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full max-w-lg mx-auto bg-black/80 backdrop-blur-md rounded-xl border border-[var(--color-cyber-slate-700)] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden font-mono text-[10px] sm:text-xs h-[300px] flex flex-col relative z-20 pointer-events-auto">
            <div className="bg-[var(--color-cyber-slate-900)] px-4 py-3 flex items-center justify-between border-b border-[var(--color-cyber-slate-700)]">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]"></div>
                    <div className="w-3 h-3 rounded-full bg-[var(--color-cyber-emerald)] shadow-[0_0_5px_var(--color-cyber-emerald)]"></div>
                </div>
                <span className="text-[var(--color-cyber-text-muted)] text-[9px] uppercase tracking-widest font-black">vv_admin@system:~</span>
            </div>
            <div className="p-5 text-[var(--color-cyber-emerald)] flex-grow flex flex-col gap-2 overflow-hidden shadow-inner font-bold">
                {lines.map((line, i) => (
                    line ? (
                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={i} className={line.includes("[SECURE]") ? "text-blue-400 drop-shadow-[0_0_2px_rgba(96,165,250,0.8)]" : line.includes("User Input") ? "text-white animate-pulse" : ""}>
                            {line}
                        </motion.div>
                    ) : null
                ))}
                {lines.length < BOOT_SEQUENCE.length && (
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-2 h-4 bg-[var(--color-cyber-emerald)] mt-1 shadow-[0_0_8px_var(--color-cyber-emerald)]"></motion.div>
                )}
            </div>
        </div>
    );
};

const ServerMetrics = () => (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 3, duration: 1 }} className="absolute top-[15%] -left-16 bg-[var(--color-cyber-slate-900)]/80 backdrop-blur-xl border border-[var(--color-cyber-slate-700)] rounded-xl py-3 px-4 z-30 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hidden xl:flex flex-col gap-3 pointer-events-none hover:border-[var(--color-cyber-emerald)] transition-colors">
        <h4 className="text-[8px] font-mono text-[var(--color-cyber-text-muted)] uppercase tracking-widest font-black text-center">Engine Load</h4>
        <div className="flex items-center gap-3">
            <Activity className="text-[var(--color-cyber-emerald)]" size={16} />
            <div className="w-24 bg-[var(--color-cyber-slate-950)] h-1.5 rounded-full overflow-hidden border border-[var(--color-cyber-slate-800)]">
                <motion.div animate={{ width: ["40%", "80%", "30%", "95%", "60%"] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="h-full bg-[var(--color-cyber-emerald)] shadow-[0_0_5px_var(--color-cyber-emerald)]" />
            </div>
            <span className="text-[10px] text-white font-mono font-bold tracking-widest">OPT</span>
        </div>
    </motion.div>
);

const MemoryWidget = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.5, duration: 1 }} className="absolute -bottom-6 -right-8 w-36 bg-[var(--color-cyber-slate-800)]/90 backdrop-blur-xl border border-[var(--color-cyber-emerald)]/50 rounded-xl shadow-[0_20px_40px_rgba(16,185,129,0.15)] flex flex-col justify-center items-center py-4 z-30 animate-[pulse-glow_4s_infinite] pointer-events-none hidden xl:flex">
        <TrendingUp className="text-[var(--color-cyber-emerald)] mb-1" size={20} />
        <span className="text-2xl font-black text-white drop-shadow-sm">99.8%</span>
        <span className="text-[8px] uppercase tracking-widest text-[var(--color-cyber-emerald)] font-mono font-bold text-center mt-1">SLA Efficiency<br />Metrics Online</span>
    </motion.div>
);

const FloatingNodes = () => {
    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden hidden md:block flex-shrink-0">
            <motion.div animate={{ y: [-20, 20, -20], x: [-20, 20, -20], scale: [1, 1.1, 1] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[10%] left-[20%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-[var(--color-cyber-emerald)] opacity-[0.02] blur-[100px]" />
            <motion.div animate={{ y: [20, -20, 20], x: [20, -20, 20], scale: [1, 1.2, 1] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-[10%] right-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-[var(--color-cyber-emerald)] opacity-[0.02] blur-[120px]" />

            <motion.div animate={{ y: [0, -40, 0], x: [0, 20, 0], rotate: [0, 10, -10, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[15%] right-[5%] opacity-40 mix-blend-screen">
                <div className="w-28 h-28 rounded-full border border-[var(--color-cyber-emerald)]/30 flex flex-col items-center justify-center bg-[var(--color-cyber-emerald-glow)]/10 backdrop-blur-md shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                    <Database size={36} className="text-[var(--color-cyber-emerald)]" />
                    <span className="text-[9px] font-mono mt-2 text-[var(--color-cyber-emerald)] uppercase font-bold tracking-widest">SQL</span>
                </div>
            </motion.div>

            <motion.div animate={{ y: [0, 30, 0], x: [0, -30, 0], rotate: [0, -15, 10, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-[50%] left-[2%] opacity-30 mix-blend-screen">
                <div className="w-32 h-32 rounded-full border border-[var(--color-cyber-slate-700)] flex flex-col items-center justify-center bg-[var(--color-cyber-slate-800)]/40 backdrop-blur-md shadow-inner">
                    <Server size={40} className="text-[var(--color-cyber-text-muted)] drop-shadow-md" />
                    <span className="text-[9px] font-mono mt-2 text-[var(--color-cyber-text-muted)] uppercase font-bold tracking-widest text-center">Django<br />Architecture</span>
                </div>
            </motion.div>

            <motion.div animate={{ y: [0, -20, 0], x: [0, -20, 0], scale: [1, 1.1, 1], rotate: [0, 90, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute top-[20%] left-[20%] opacity-20">
                <LayoutDashboard size={40} className="text-[var(--color-cyber-text-muted)]" />
            </motion.div>

            <motion.div animate={{ y: [0, 40, 0], x: [0, 10, 0], scale: [1, 0.9, 1] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 4 }} className="absolute bottom-[30%] right-[30%] opacity-20">
                <MonitorSmartphone size={50} className="text-[var(--color-cyber-emerald)] drop-shadow-[0_0_10px_var(--color-cyber-emerald)]" />
            </motion.div>
        </div>
    );
};

// Premium Interactive Spotlight Matrix Array Card - Horizontal Configuration
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
            className="group relative flex flex-col md:flex-row gap-8 md:gap-12 p-8 md:p-12 lg:p-16 bg-[var(--color-cyber-slate-900)] rounded-3xl border border-[var(--color-cyber-slate-700)] overflow-hidden cursor-pointer"
        >
            {/* Dynamic CSS Spotlight tied via useMotionTemplate physically tracking raw Cartesian coordinates */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                style={{
                    background: useMotionTemplate`radial-gradient(600px circle at ${x}px ${y}px, rgba(16, 185, 129, 0.12), transparent 80%)`
                }}
            />
            {/* Dynamic Interactive Border Stroke Highlight tracking inner movement */}
            <motion.div
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                style={{
                    border: '1px solid transparent',
                    background: useMotionTemplate`radial-gradient(300px circle at ${x}px ${y}px, var(--color-cyber-emerald), transparent 70%) border-box`,
                    WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude'
                }}
            />

            {/* Left Column Component */}
            <div className="relative z-10 flex flex-col items-start gap-4 md:w-1/3 pointer-events-none">
                <div className="w-16 h-16 rounded-2xl cyber-glass border border-[var(--color-cyber-emerald)]/30 flex items-center justify-center bg-[var(--color-cyber-slate-800)]/80 shadow-[0_0_30px_rgba(16,185,129,0.15)] group-hover:scale-110 transition-transform duration-500">
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

            {/* Right Column Component - Abstracted Technical Schematics */}
            <div className="relative z-10 flex flex-col gap-8 md:w-2/3 md:border-l border-[var(--color-cyber-slate-700)]/60 md:pl-12 pt-6 md:pt-0 pointer-events-none">
                {items.map((item, idx) => (
                    <div key={idx} className="relative pl-6 border-l-2 border-[var(--color-cyber-slate-700)] group-hover:border-l-[var(--color-cyber-emerald)] transition-colors duration-500">
                        <div className="absolute -left-[9px] top-[6px] w-4 h-4 rounded-full bg-[var(--color-cyber-slate-900)] border-2 border-[var(--color-cyber-slate-500)] group-hover:border-[var(--color-cyber-emerald)] group-hover:bg-[var(--color-cyber-emerald)] transition-colors duration-500 shadow-[0_0_10px_transparent] group-hover:shadow-[0_0_10px_var(--color-cyber-emerald)]"></div>
                        <h4 className="text-white font-bold text-base lg:text-lg tracking-wide uppercase">{item.title}</h4>
                        <p className="text-[var(--color-cyber-text-muted)] text-[14px] lg:text-[15px] mt-2.5 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                ))}
            </div>

            {/* Watermark Background Graphic Engine */}
            <div className="absolute top-1/2 -translate-y-1/2 right-10 opacity-[0.02] group-hover:opacity-[0.04] group-hover:-translate-x-4 transition-all duration-700 pointer-events-none z-0">
                <Icon size={280} />
            </div>
        </motion.div>
    );
};

const DashboardMatrix = () => {
    return (
        <div className="mt-24 mb-32 w-full pt-16 relative z-50">
            {/* Illuminated border accent executing structural separation */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-cyber-emerald)] to-transparent opacity-50 shadow-[0_0_10px_var(--color-cyber-emerald)]"></div>

            <div className="flex flex-col gap-10 max-w-5xl mx-auto px-4 sm:px-0 pb-10">
                <MatrixCard
                    title="Experience Context"
                    icon={Briefcase}
                    delay={0}
                    items={[
                        { title: "Priyansh Tech", desc: "Architecting massive scalable Django workflows and native corporate UX parameters organically." },
                        { title: "Amazon ROC", desc: "Monitored EU logistics datasets natively, isolating physical efficiencies via algorithmic operations." }
                    ]}
                    link="/experience"
                    linkText="Boot Operations Log"
                />

                <MatrixCard
                    title="Projects Abstract"
                    icon={Code}
                    delay={0.15}
                    items={[
                        { title: "Enterprise Logic", desc: "Engineered ShopSphere multi-vendor kernels and algorithmic SmartXML mapping pipelines." },
                        { title: "AI & Cryptography", desc: "Built end-to-end encrypted medical proxies natively alongside real-time NLP statement parsers." }
                    ]}
                    link="/projects"
                    linkText="Execute Modules"
                />

                <MatrixCard
                    title="Technical Engine"
                    icon={GraduationCap}
                    delay={0.3}
                    items={[
                        { title: "Academic Framework", desc: "Malla Reddy Institute CSE graduate entirely grounded in native functional architectural designs." },
                        { title: "Core Capabilities", desc: "Python, SQL, React/JS platforms. Fully licensed and authenticated precisely by LinkedIn & Deloitte." }
                    ]}
                    link="/about"
                    linkText="Inspect Architecture"
                />
            </div>
        </div>
    );
};

const Hero = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <section className="relative flex flex-col pt-20 px-6 md:px-12 overflow-hidden bg-[var(--color-cyber-slate-900)]">

            <FloatingNodes />

            <div className="relative z-10 max-w-7xl mx-auto w-full">

                <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center mt-[40vh] sm:mt-[45vh] md:mt-[50vh] lg:mt-[48vh] min-[1280px]:mt-[45vh] w-full min-h-[50vh] relative z-20">
                    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="flex flex-col w-full relative z-20 pointer-events-none">
                        <motion.div variants={itemVariants} className="flex gap-2.5 mb-8 flex-wrap">
                            <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-full cyber-glass text-[10px] md:text-[11px] font-mono font-bold text-[var(--color-cyber-emerald)] border border-[var(--color-cyber-slate-700)] shadow-sm uppercase tracking-widest backdrop-blur-xl bg-[var(--color-cyber-slate-800)]/80 relative overflow-hidden">
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-cyber-emerald-glow)] to-transparent translate-x-[-100%] animate-[marquee_3s_linear_infinite]"></span>
                                <Terminal size={14} className="relative z-10" /> Full-Stack
                            </span>
                            <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-full cyber-glass text-[10px] md:text-[11px] font-mono font-bold text-[var(--color-cyber-emerald)] border border-[var(--color-cyber-slate-700)] shadow-sm uppercase tracking-widest backdrop-blur-xl bg-[var(--color-cyber-slate-800)]/80 relative overflow-hidden">
                                <Server size={14} className="relative z-10" /> Python / Django
                            </span>
                            <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-full cyber-glass text-[10px] md:text-[11px] font-mono font-bold text-[var(--color-cyber-emerald)] border border-[var(--color-cyber-slate-700)] shadow-sm uppercase tracking-widest backdrop-blur-xl bg-[var(--color-cyber-slate-800)]/80 relative overflow-hidden">
                                <Database size={14} className="relative z-10" /> Data Analytics
                            </span>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mb-6 max-w-2xl relative group">
                            <h1 className="text-5xl sm:text-7xl lg:text-7xl xl:text-8xl font-black leading-[1.05] tracking-tight text-[var(--color-cyber-text-main)] pointer-events-auto cursor-default">
                                Full-Stack <br className="hidden md:block" />
                                <span className="text-gradient-emerald relative inline-block">Web Developer.</span>
                            </h1>
                        </motion.div>

                        <motion.div variants={itemVariants} className="max-w-xl space-y-4 mb-10">
                            <p className="text-lg md:text-xl text-[var(--color-cyber-text-muted)] leading-relaxed font-medium">
                                Computer Science graduate with a proven track record of engineering high-traffic Django applications and professional corporate architectures. Combines hands-on experience in massive-scale real-time supply chain operations at Amazon with absolute technical expertise in Python, SQL, and JavaScript natively.
                            </p>
                        </motion.div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, scale: 0.9, x: 40 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 1.2, delay: 0.8, type: "spring", stiffness: 100 }} className="hidden lg:flex justify-end items-center relative w-full pt-10 lg:pt-0 pointer-events-none">
                        <div className="relative w-full max-w-[500px] xl:max-w-[550px]">
                            <TerminalVisualization />
                            <ServerMetrics />
                            <MemoryWidget />

                            <div className="absolute -inset-8 border border-[var(--color-cyber-slate-700)]/30 rounded-3xl pointer-events-none z-0 hidden xl:block"></div>
                            <div className="absolute top-1/2 -right-20 w-16 border-t border-[var(--color-cyber-slate-700)] border-dashed hidden xl:block"></div>
                            <div className="absolute -bottom-20 left-1/2 h-16 border-l border-[var(--color-cyber-slate-700)] border-dashed hidden xl:block"></div>
                        </div>
                    </motion.div>
                </div>

                <DashboardMatrix />

            </div>
        </section>
    );
};

export default Hero;