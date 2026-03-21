import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Activity, Server, TrendingUp, CheckCircle, Component, MonitorIcon, GitBranch } from 'lucide-react';

const Experience = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    // Calculates the height percentage of the active glowing scroll tracer
    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section className="min-h-screen pt-32 pb-32 px-6 md:px-12 max-w-5xl mx-auto" ref={containerRef}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-20 pl-6"
            >
                <h1 className="text-4xl md:text-6xl font-black text-[var(--color-cyber-text-main)] mb-4 tracking-tight">
                    Professional <span className="text-gradient-emerald">Journey</span>
                </h1>
                <p className="text-[var(--color-cyber-text-muted)] text-lg max-w-2xl leading-relaxed">
                    A technical illuminated timeline defining software engineering deliverables at Priyansh alongside absolute magnitude enterprise logistics handled at Amazon ROC.
                </p>
            </motion.div>

            <div className="relative pl-6 md:pl-10 space-y-24 w-full">
                
                {/* The Absolute Core Timeline Logic (Background Static + Foreground Dynamic Glow) */}
                <div className="absolute left-[3px] md:left-[3px] top-4 bottom-0 w-[2px] bg-[var(--color-cyber-slate-700)]/40 rounded-full z-0"></div>
                <motion.div 
                    className="absolute left-[3px] md:left-[3px] top-4 w-[2px] bg-[var(--color-cyber-emerald)] shadow-[0_0_15px_var(--color-cyber-emerald)] rounded-full z-10"
                    style={{ height: lineHeight }}
                ></motion.div>
                
                {/* Priyansh Technologies */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="relative"
                >
                    <div className="absolute -left-[30px] md:-left-[46px] w-9 h-9 rounded-full bg-[var(--color-cyber-slate-900)] flex items-center justify-center border-2 border-[var(--color-cyber-emerald)] shadow-[0_0_30px_var(--color-cyber-emerald-glow)] z-20">
                        <Server size={14} className="text-[var(--color-cyber-emerald)] animate-pulse" />
                    </div>
                
                    <div className="cyber-card group relative overflow-hidden ml-6 md:ml-4 border-[var(--color-cyber-slate-700)] hover:border-[var(--color-cyber-emerald)] transition-colors shadow-lg hover:shadow-[0_10px_40px_rgba(16,185,129,0.1)]">
                        {/* Decorative Background Node */}
                        <div className="absolute top-1/2 -right-10 -translate-y-1/2 p-24 opacity-[0.02] pointer-events-none transform rotate-12 transition-transform group-hover:rotate-6 group-hover:scale-110 duration-700">
                            <GitBranch size={220} className="text-[var(--color-cyber-emerald)]" />
                        </div>

                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 relative z-10">
                            <div>
                                <h2 className="text-2xl font-bold text-[var(--color-cyber-text-main)] group-hover:text-[var(--color-cyber-emerald)] transition-colors">Associate IT Engineer <span className="text-[var(--color-cyber-text-muted)] text-lg font-normal">/ Web Developer</span></h2>
                                <h3 className="text-lg text-[var(--color-cyber-text-muted)] mt-1 font-mono tracking-tight">Priyansh Technologies, Hyderabad</h3>
                            </div>
                            <span className="inline-block mt-3 md:mt-0 px-3 py-1.5 rounded-md text-[10px] font-mono font-bold bg-[var(--color-cyber-emerald-glow)] text-[var(--color-cyber-emerald)] border border-[var(--color-cyber-emerald)] shadow-[0_0_10px_var(--color-cyber-emerald-glow)] uppercase tracking-widest">
                                12/2025 - Present
                            </span>
                        </div>

                        <div className="space-y-6 text-[var(--color-cyber-text-muted)] relative z-10">
                            <p className="leading-relaxed text-[var(--color-cyber-text-main)] max-w-3xl">
                                Delivering end-to-end digital solutions, cloud integration, and highly scalable web architectures for an IT services firm organically managing multi-industry workflows.
                            </p>
                            
                            <div className="space-y-4">
                                <div className="bg-[var(--color-cyber-slate-900)] p-5 rounded-2xl border border-[var(--color-cyber-slate-700)] group-hover:bg-[var(--color-cyber-slate-800)]/50 transition-colors">
                                    <h4 className="text-[var(--color-cyber-emerald)] font-bold mb-2 flex items-center gap-2 tracking-wide"><Component size={16}/> ShopSphere Application</h4>
                                    <p className="text-sm leading-relaxed">Engineered a robust highly-concurrent Django multi-vendor marketplace. Integrated native REST APIs strictly mapping real-time cross-vendor inventory datasets.</p>
                                </div>
                                <div className="bg-[var(--color-cyber-slate-900)] p-5 rounded-2xl border border-[var(--color-cyber-slate-700)] group-hover:bg-[var(--color-cyber-slate-800)]/50 transition-colors">
                                    <h4 className="text-[var(--color-cyber-emerald)] font-bold mb-2 flex items-center gap-2 tracking-wide"><Server size={16}/> SmartXML Solutions</h4>
                                    <p className="text-sm leading-relaxed">Designed front-end architecture prioritizing structurally absolute SEO layouts. Processed intensive legacy XML mapping parameters autonomously via Python nodes.</p>
                                </div>
                                <div className="bg-[var(--color-cyber-slate-900)] p-5 rounded-2xl border border-[var(--color-cyber-slate-700)] group-hover:bg-[var(--color-cyber-slate-800)]/50 transition-colors">
                                    <h4 className="text-[var(--color-cyber-emerald)] font-bold mb-2 flex items-center gap-2 tracking-wide"><MonitorIcon size={16}/> HPE IT Solutions</h4>
                                    <p className="text-sm leading-relaxed">Built flawlessly-responsive enterprise-level corporate domains utilizing HTML5 and JavaScript mechanics mapped perfectly to business inquiry workflows.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Amazon ROC */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative"
                >
                    <div className="absolute -left-[30px] md:-left-[46px] w-9 h-9 rounded-full bg-[var(--color-cyber-slate-900)] flex items-center justify-center border border-[var(--color-cyber-slate-700)] z-20 group-hover:border-[var(--color-cyber-emerald)] transition-colors duration-500 shadow-[0_0_15px_var(--color-cyber-slate-900)]">
                        <Activity size={14} className="text-[var(--color-cyber-text-muted)] group-hover:text-[var(--color-cyber-emerald)]" />
                    </div>
                
                    <div className="cyber-card group overflow-hidden relative border-[var(--color-cyber-slate-700)] hover:border-[var(--color-cyber-emerald)] transition-colors ml-6 md:ml-4">
                        <div className="absolute top-1/2 right-0 -translate-y-1/2 p-24 opacity-[0.02] pointer-events-none transform -rotate-12 transition-transform group-hover:-rotate-3 group-hover:scale-110 duration-700">
                            <TrendingUp size={280} className="text-[var(--color-cyber-emerald)]" />
                        </div>

                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 relative z-10">
                            <div>
                                <h2 className="text-2xl font-bold text-[var(--color-cyber-text-main)] group-hover:text-[var(--color-cyber-emerald)] transition-colors">ROC Specialist</h2>
                                <h3 className="text-lg text-[var(--color-cyber-text-muted)] mt-1 font-mono tracking-tight">Amazon, Hyderabad</h3>
                            </div>
                            <span className="inline-block mt-3 md:mt-0 px-3 py-1.5 rounded-md text-[10px] uppercase tracking-widest font-mono font-bold bg-[var(--color-cyber-slate-900)] text-[var(--color-cyber-text-muted)] border border-[var(--color-cyber-slate-700)]">
                                08/2024 - 12/2025
                            </span>
                        </div>

                        <p className="text-[var(--color-cyber-text-main)] leading-relaxed mb-6 relative z-10 max-w-3xl">
                            Monitored real-time supply chain operations, analysed precise transportation datasets natively, and resolved severe external escalations aggressively to boost pure on-time delivery statistics massively.
                        </p>

                        {/* Project Highlights */}
                        <div className="space-y-4 mb-8 relative z-10">
                            <div className="bg-[var(--color-cyber-slate-900)] p-4 rounded-xl border border-[var(--color-cyber-slate-700)] flex gap-3 text-[13px] text-[var(--color-cyber-text-muted)] group-hover:bg-[var(--color-cyber-slate-800)]/30 transition-colors">
                                <CheckCircle size={16} className="text-[var(--color-cyber-emerald)] mt-0.5 flex-shrink-0" />
                                <span><strong className="text-[var(--color-cyber-text-main)] block mb-1">Project 1: After-Hours Optimization</strong> Spearheaded a primary pilot project effectively executing isolated logistics runs entirely handling the EU region mathematically outside standard site parameters.</span>
                            </div>
                            <div className="bg-[var(--color-cyber-slate-900)] p-4 rounded-xl border border-[var(--color-cyber-slate-700)] flex gap-3 text-[13px] text-[var(--color-cyber-text-muted)] group-hover:bg-[var(--color-cyber-slate-800)]/30 transition-colors">
                                <CheckCircle size={16} className="text-[var(--color-cyber-emerald)] mt-0.5 flex-shrink-0" />
                                <span><strong className="text-[var(--color-cyber-text-main)] block mb-1">Project 2: Empty Mile Reduction</strong> Deployed rigorous strategic algorithms functionally maximizing total cargo capacity natively on massive return journeys drastically isolating "empty miles" costs.</span>
                            </div>
                        </div>

                        {/* Data Dashboard KPI Layout */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 relative z-10 mt-6 pt-6 border-t border-[var(--color-cyber-slate-700)]">
                            <div className="cyber-glass bg-[var(--color-cyber-slate-900)] rounded-xl py-4 px-3 border border-[var(--color-cyber-slate-700)] flex flex-col items-center text-center">
                                <span className="text-[10px] text-[var(--color-cyber-text-muted)] font-mono uppercase tracking-widest mb-1 font-bold">Latency</span>
                                <span className="text-xl font-black text-white">-15%</span>
                                <span className="text-[8px] text-[var(--color-cyber-text-muted)] font-bold mt-1 uppercase tracking-widest">Optimized Volume</span>
                            </div>
                            
                            <div className="cyber-glass bg-[var(--color-cyber-emerald-glow)] rounded-xl py-4 px-3 border border-[var(--color-cyber-emerald)] shadow-[0_0_20px_var(--color-cyber-emerald-glow)] flex flex-col items-center text-center transform hover:-translate-y-2 z-20 transition-transform cursor-pointer">
                                <span className="text-[10px] text-white font-mono uppercase tracking-widest mb-1 font-bold">Empty Miles</span>
                                <span className="text-2xl font-black text-[var(--color-cyber-emerald)] drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]">20%↓</span>
                                <span className="text-[8px] text-[#34d399] mt-1 font-bold uppercase tracking-widest">Reduction Achieved</span>
                            </div>

                            <div className="cyber-glass bg-[var(--color-cyber-slate-900)] rounded-xl py-4 px-3 border border-[var(--color-cyber-slate-700)] flex flex-col items-center text-center">
                                <span className="text-[10px] text-[var(--color-cyber-text-muted)] font-mono uppercase tracking-widest mb-1 font-bold">Overall SLA</span>
                                <span className="text-xl font-black text-white">99.8%</span>
                                <span className="text-[8px] text-[var(--color-cyber-text-muted)] mt-1 uppercase tracking-widest">High Integrity</span>
                            </div>

                            <div className="cyber-glass bg-[var(--color-cyber-slate-900)] rounded-xl py-4 px-3 border border-[var(--color-cyber-slate-700)] flex flex-col items-center text-center">
                                <span className="text-[10px] text-[var(--color-cyber-text-muted)] font-mono uppercase tracking-widest mb-1 font-bold">TAT Metrics</span>
                                <span className="text-xl font-black text-white"><Activity size={20} className="animate-pulse" /></span>
                                <span className="text-[8px] text-[var(--color-cyber-text-muted)] mt-1 uppercase tracking-widest">Fluid Delivery</span>
                            </div>
                        </div>

                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default Experience;