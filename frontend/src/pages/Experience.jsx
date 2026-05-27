import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Activity, Server, TrendingUp, CheckCircle, Component, MonitorIcon, GitBranch, Terminal, ChevronRight } from 'lucide-react';

const DataPulse = ({ delay = 0 }) => (
    <motion.div
        initial={{ top: "0%", opacity: 0 }}
        animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear", delay }}
        className="absolute left-[3px] md:left-[3px] w-[2px] h-24 bg-gradient-to-b from-transparent via-[var(--color-cyber-emerald)] to-transparent z-10"
    />
);

const Experience = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    const experienceData = [
        {
            company: "Priyansh Technologies",
            location: "Hyderabad, India",
            role: "Associate IT Engineer (Web Developer)",
            period: "Dec 2025 – Present",
            icon: Server,
            achievements: [
                "Engineered and deployed a scalable multi-vendor e-commerce platform (ShopSphere) using Django, enabling real-time inventory management.",
                "Improved application responsiveness by 30% through optimized REST API integration and efficient backend architecture.",
                "Designed responsive UI systems ensuring cross-browser compatibility and mobile-first performance optimization.",
                "Delivered the SmartXML Solutions website, enhancing usability and reducing page load time through optimized frontend design.",
                "Developed the HPE IT Solutions corporate website, ensuring professional UI/UX and full responsiveness across devices.",
                "Collaborated with cross-functional stakeholders to translate business requirements into scalable technical solutions.",
                "Implemented frontend optimization techniques that reduced load time and improved overall user engagement."
            ],
            tech: ["Django", "Python", "REST API", "React", "UI/UX Optimization"]
        },
        {
            company: "Amazon",
            location: "Hyderabad, India",
            role: "ROC Specialist (Supply Chain Operations & Data Analyst)",
            period: "Aug 2024 – Dec 2025",
            icon: Activity,
            achievements: [
                "Monitored and analysed real-time logistics operations, ensuring seamless execution across multiple transportation networks.",
                "Tracked KPIs such as AHT, SLA, and TAT, enabling data-driven operational decisions through dashboard reporting.",
                "Resolved high-priority escalations within SLA timelines, maintaining operational continuity in high-pressure environments.",
                "Identified process inefficiencies and improved workflows, enhancing productivity and reducing delays.",
                "Generated analytical reports for leadership, supporting strategic decision-making and performance tracking.",
                "Led After-Hours Logistics Optimization initiative, improving operational coverage and asset utilization.",
                "Designed Empty Mile Reduction Strategy, reducing transportation inefficiencies and operational costs."
            ],
            tech: ["Data Analytics", "KPI Dashboards", "Supply Chain Optimization", "Process Improvement", "Logistics Operations"]
        }
    ];


    return (
        <section className="min-h-screen pt-32 pb-32 px-6 md:px-12 max-w-6xl mx-auto" ref={containerRef}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-24 pl-6"
            >
                <div className="status-badge w-fit mb-6">
                    <div className="status-dot"></div>
                    Professional Deployment Log
                </div>
                <h1 className="text-4xl md:text-7xl font-black text-[var(--color-cyber-text-main)] mb-6 tracking-tight">
                    Professional <span className="text-gradient-emerald">Journey</span>
                </h1>
                <p className="text-[var(--color-cyber-text-muted)] text-xl max-w-3xl leading-relaxed font-medium mb-10">
                    A technical illuminated timeline defining software engineering deliverables and high-stakes enterprise logistics optimization.
                </p>

                <a
                    href="/assets/resume.pdf"
                    download="Vishnuvardhan_Resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="cyber-btn w-fit group shadow-[0_0_20px_var(--color-cyber-emerald-glow)] hover:shadow-[0_0_35px_var(--color-cyber-emerald)] transition-all duration-500"
                >
                    DOWNLOAD RESUME <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
            </motion.div>

            <div className="relative pl-6 md:pl-12 space-y-32 w-full">
                
                {/* Timeline Line */}
                <div className="absolute left-[3px] md:left-[3px] top-4 bottom-0 w-[2px] bg-[var(--color-cyber-slate-800)] rounded-full z-0"></div>
                <motion.div 
                    className="absolute left-[3px] md:left-[3px] top-4 w-[2px] bg-[var(--color-cyber-emerald)] shadow-[0_0_20px_var(--color-cyber-emerald)] rounded-full z-10"
                    style={{ height: lineHeight }}
                ></motion.div>
                
                {/* Animated Data Pulses */}
                <DataPulse delay={0} />
                <DataPulse delay={2} />

                {experienceData.map((exp, idx) => (
                    <motion.div 
                        key={exp.period}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative"
                    >
                        <div className="absolute -left-[32px] md:-left-[48px] w-10 h-10 rounded-full bg-[var(--color-cyber-slate-950)] flex items-center justify-center border-2 border-[var(--color-cyber-emerald)] shadow-[0_0_30px_var(--color-cyber-emerald-glow)] z-20">
                            <exp.icon size={18} className="text-[var(--color-cyber-emerald)]" />
                        </div>
                    
                        <div className="cyber-card group ml-6 md:ml-4 p-8 md:p-12 lg:p-16 border-[var(--color-cyber-slate-800)] hover:border-[var(--color-cyber-emerald)] transition-all overflow-hidden relative">
                            {/* Watermark Icon */}
                            <div className="absolute top-1/2 -right-16 -translate-y-1/2 p-32 opacity-[0.02] group-hover:opacity-[0.05] pointer-events-none transform rotate-12 transition-all duration-1000 group-hover:rotate-0 group-hover:scale-110">
                                <exp.icon size={280} className="text-[var(--color-cyber-emerald)]" />
                            </div>

                            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-10 relative z-10 gap-6">
                                <div>
                                    <h2 className="text-2xl md:text-4xl font-black text-white group-hover:text-[var(--color-cyber-emerald)] transition-colors leading-tight">{exp.role}</h2>
                                    <div className="flex items-center gap-3 mt-3">
                                        <h3 className="text-xl text-[var(--color-cyber-text-muted)] font-mono tracking-tight">{exp.company}</h3>
                                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyber-slate-700)]"></span>
                                        <span className="text-[12px] text-[var(--color-cyber-slate-500)] font-bold uppercase tracking-widest">{exp.location}</span>
                                    </div>
                                </div>
                                <span className="inline-block px-4 py-2 rounded-xl text-[11px] font-mono font-black border border-[var(--color-cyber-emerald)]/30 text-[var(--color-cyber-emerald)] bg-[var(--color-cyber-emerald)]/5 uppercase tracking-widest shadow-lg">
                                    {exp.period}
                                </span>
                            </div>

                            <div className="space-y-8 relative z-10">
                                <ul className="space-y-5">
                                    {exp.achievements.map((item, i) => (
                                        <li key={i} className="flex gap-4 text-[var(--color-cyber-text-muted)] text-base md:text-lg leading-relaxed group/item">
                                            <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--color-cyber-emerald)] flex-shrink-0 group-hover/item:scale-150 transition-transform shadow-[0_0_5px_var(--color-cyber-emerald)]" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="pt-8 border-t border-[var(--color-cyber-slate-800)] flex flex-wrap gap-3">
                                    <Terminal size={14} className="text-[var(--color-cyber-emerald)] self-center mr-2" />
                                    {exp.tech.map(t => (
                                        <span key={t} className="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest bg-[var(--color-cyber-slate-950)] border border-[var(--color-cyber-slate-700)] group-hover:border-[var(--color-cyber-emerald)]/30 transition-colors">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Experience;