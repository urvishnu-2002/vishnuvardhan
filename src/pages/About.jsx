import React from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Database, Brain, Linkedin, BadgeCheck, FileCode2, BarChart } from 'lucide-react';

const About = () => {
    return (
        <section className="min-h-screen pt-32 pb-32 px-6 md:px-12 max-w-5xl mx-auto overflow-hidden">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-10 text-center md:text-left"
            >
                <h1 className="text-4xl md:text-6xl font-black text-[var(--color-cyber-text-main)] mb-4 tracking-tight">
                    Technical <span className="text-gradient-emerald">Arsenal</span>
                </h1>
            </motion.div>

            {/* Bento Grid Architecture */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[130px] md:auto-rows-[160px]"
            >
                {/* Large Education Column */}
                <div className="col-span-2 md:col-span-2 row-span-2 cyber-glass flex flex-col justify-center border border-[var(--color-cyber-slate-700)] rounded-2xl bg-[var(--color-cyber-slate-800)] p-6 md:p-8 space-y-4">
                    <h3 className="text-2xl font-black mb-2 text-[var(--color-cyber-text-main)]">Academic Roots</h3>
                    
                    <div className="relative pl-5 border-l border-[var(--color-cyber-slate-700)] hover:border-[var(--color-cyber-emerald)] transition-colors group">
                        <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[var(--color-cyber-emerald)] shadow-[0_0_8px_var(--color-cyber-emerald)] animate-pulse"></div>
                        <h4 className="text-sm font-bold text-white leading-tight mb-1 group-hover:text-[var(--color-cyber-emerald)] transition-colors">Malla Reddy Institute</h4>
                        <p className="text-[10px] text-[var(--color-cyber-slate-400)] font-mono mb-2 uppercase tracking-wide">11/2020 – 06/2024</p>
                        <p className="text-[13px] text-[var(--color-cyber-text-muted)] mb-2">B.Tech Computer Science</p>
                        <span className="text-[10px] font-black text-[var(--color-cyber-emerald)] bg-[var(--color-cyber-emerald-glow)] px-2.5 py-1 rounded border border-[var(--color-cyber-emerald)] tracking-widest inline-block shadow-sm">7.04 CGPA</span>
                    </div>

                    <div className="relative pl-5 border-l border-[var(--color-cyber-slate-700)] hover:border-[var(--color-cyber-text-muted)] transition-colors">
                        <div className="absolute -left-[4px] top-1.5 w-[7px] h-[7px] rounded-full bg-[var(--color-cyber-text-muted)]"></div>
                        <h4 className="text-sm font-bold text-[var(--color-cyber-text-muted)] leading-tight mb-1">Sri Vaishnavi Abhyaas</h4>
                        <p className="text-[10px] text-[var(--color-cyber-slate-400)] font-mono mb-2 uppercase tracking-wide">06/2018 – 03/2022</p>
                        <span className="text-[9px] font-black text-[var(--color-cyber-text-muted)] px-2 py-0.5 rounded border border-[var(--color-cyber-slate-700)] tracking-widest inline-block">9.25 CGPA (MPC)</span>
                    </div>
                </div>
                
                {/* Animated Skill Pulse Box - Python (Conic Gradient Native Implementation) */}
                <div className="col-span-1 md:col-span-1 row-span-1 relative rounded-2xl p-[1px] overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                    {/* Spinning Gradient Border Layer */}
                    <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_60%,var(--color-cyber-emerald)_100%)] animate-[spin_3s_linear_infinite] opacity-60 group-hover:opacity-100 transition-opacity blur-[1px]"></div>
                    {/* Inner Content Block */}
                    <div className="relative w-full h-full bg-[var(--color-cyber-slate-900)] rounded-[15px] p-6 flex flex-col items-center justify-center animate-pulse-glow z-10 border border-[var(--color-cyber-slate-700)]/50">
                        <Server size={36} className="text-[var(--color-cyber-emerald)] mb-3 relative z-10 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-[pulse_2s_ease-in-out_infinite]" />
                        <h4 className="font-black text-white tracking-widest text-[11px] md:text-sm uppercase relative z-10 drop-shadow-md">Python</h4>
                    </div>
                </div>

                {/* Animated Skill Pulse Box - SQL */}
                <div className="col-span-1 md:col-span-1 row-span-1 relative rounded-2xl p-[1px] overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                    <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_40%,var(--color-cyber-slate-400)_100%)] animate-[spin_5s_linear_infinite] opacity-30 group-hover:opacity-100 transition-opacity blur-[1px]"></div>
                    <div className="relative w-full h-full bg-[var(--color-cyber-slate-900)] rounded-[15px] p-6 flex flex-col items-center justify-center z-10 border border-[var(--color-cyber-slate-700)]/50">
                        <Database size={36} className="text-[var(--color-cyber-text-main)] mb-3 relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
                        <h4 className="font-black text-white tracking-widest text-[11px] md:text-sm uppercase relative z-10 drop-shadow-md">SQL</h4>
                    </div>
                </div>

                {/* Standard Tech Stack Blocks */}
                <div className="col-span-1 row-span-1 cyber-glass rounded-2xl p-4 border border-[var(--color-cyber-slate-700)] flex flex-col items-center justify-center bg-[var(--color-cyber-slate-800)] hover:border-[var(--color-cyber-text-muted)] transition-colors hover:-translate-y-1 overflow-hidden shadow-lg relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-cyber-slate-700)] to-transparent opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    <FileCode2 size={28} className="text-[var(--color-cyber-text-muted)] mb-3 group-hover:text-white transition-colors" />
                    <span className="font-bold text-[var(--color-cyber-text-main)] tracking-widest text-[10px] uppercase">HTML/CSS</span>
                </div>
                <div className="col-span-1 row-span-1 cyber-glass rounded-2xl p-4 border border-[var(--color-cyber-slate-700)] flex flex-col items-center justify-center bg-[var(--color-cyber-slate-800)] hover:border-[var(--color-cyber-emerald)] transition-colors hover:-translate-y-1 shadow-lg relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-cyber-emerald-glow)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Code size={28} className="text-[var(--color-cyber-text-muted)] mb-3 group-hover:text-[var(--color-cyber-emerald)] transition-colors z-10" />
                    <span className="font-bold text-[var(--color-cyber-text-main)] tracking-widest text-[10px] uppercase z-10">JavaScript</span>
                </div>
                <div className="col-span-2 row-span-1 cyber-glass rounded-2xl p-6 border border-[var(--color-cyber-emerald-dark)] flex flex-col sm:flex-row items-center justify-center gap-4 bg-[var(--color-cyber-slate-900)] hover:border-[var(--color-cyber-emerald)] hover:shadow-[0_0_20px_var(--color-cyber-emerald-glow)] transition-all cursor-pointer">
                    <BarChart size={28} className="text-[var(--color-cyber-emerald)] drop-shadow-[0_0_5px_var(--color-cyber-emerald)]" />
                    <div className="text-center sm:text-left">
                        <span className="font-black text-white tracking-widest text-[13px] md:text-sm uppercase block">Data Analytics</span>
                        <span className="text-[10px] text-[var(--color-cyber-text-muted)] font-mono tracking-widest uppercase">Excel & Processing</span>
                    </div>
                </div>

            </motion.div>

            {/* Other Specs Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4"
            >
                <div className="cyber-glass rounded-2xl p-6 md:p-8 border border-[var(--color-cyber-slate-700)] bg-[var(--color-cyber-slate-800)] flex flex-col justify-center">
                     <h4 className="text-[10px] text-[var(--color-cyber-emerald)] uppercase tracking-widest mb-3 font-black">Linguistics</h4>
                     <p className="text-[var(--color-cyber-text-main)] text-sm md:text-base font-mono leading-relaxed tracking-wide">English • Telugu <br/> Hindi • Kannada</p>
                </div>
                <div className="cyber-glass rounded-2xl p-6 md:p-8 border border-[var(--color-cyber-slate-700)] bg-[var(--color-cyber-slate-800)] flex flex-col justify-center">
                     <h4 className="text-[10px] text-[var(--color-cyber-emerald)] uppercase tracking-widest mb-3 font-black">Interests</h4>
                     <p className="text-[var(--color-cyber-text-main)] text-sm md:text-base font-mono leading-relaxed tracking-wide">Cooking • Gaming <br/> Continuous Architecture Testing</p>
                </div>
            </motion.div>

            {/* Infinite Certifications Marquee (Hover-Paused) */}
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mt-16"
            >
                <h3 className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-cyber-text-muted)] mb-4 text-center">Certified Credentials</h3>
                <div className="relative w-full overflow-hidden cyber-glass border-y border-[var(--color-cyber-slate-700)] py-5 flex bg-[var(--color-cyber-slate-900)]/50 mask-image-gradient group/marquee cursor-ew-resize">
                    <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[var(--color-cyber-slate-900)] to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[var(--color-cyber-slate-900)] to-transparent z-10 pointer-events-none"></div>

                    {/* Marquee explicitly pauses on hover purely using generic css group selectors */}
                    <div className="flex gap-12 sm:gap-20 animate-marquee whitespace-nowrap px-8 items-center group-hover/marquee:[animation-play-state:paused] transition-all duration-300">
                        {[1, 2].map((iter) => (
                            <React.Fragment key={iter}>
                                <div className="flex items-center gap-3 hover:-translate-y-1 transition-transform cursor-pointer">
                                    <Brain size={18} className="text-[var(--color-cyber-emerald)] shadow-[0_0_5px_var(--color-cyber-emerald)]" />
                                    <span className="text-[12px] md:text-sm font-black text-white uppercase tracking-widest drop-shadow-md">Udemy: Data Science Bootcamp</span>
                                </div>
                                <div className="flex items-center gap-3 hover:-translate-y-1 transition-transform cursor-pointer">
                                    <Linkedin size={18} className="text-[#0a66c2] shadow-[0_0_5px_rgba(10,102,194,0.5)] bg-white rounded-sm" />
                                    <span className="text-[12px] md:text-sm font-black text-white uppercase tracking-widest drop-shadow-md">Learning Python (LinkedIn)</span>
                                </div>
                                <div className="flex items-center gap-3 hover:-translate-y-1 transition-transform cursor-pointer">
                                    <BadgeCheck size={18} className="text-[var(--color-cyber-emerald)] shadow-[0_0_5px_var(--color-cyber-emerald)]" />
                                    <span className="text-[12px] md:text-sm font-black text-[var(--color-cyber-text-main)] uppercase tracking-widest drop-shadow-md">Deloitte: Australia Data Simulation</span>
                                </div>
                                <div className="flex items-center gap-3 hover:-translate-y-1 transition-transform cursor-pointer">
                                    <BadgeCheck size={18} className="text-[var(--color-cyber-text-muted)]" />
                                    <span className="text-[12px] md:text-sm font-black text-[var(--color-cyber-text-main)] uppercase tracking-widest drop-shadow-md">Deloitte: Tech Simulation</span>
                                </div>
                                <div className="flex items-center gap-3 hover:-translate-y-1 transition-transform cursor-pointer">
                                    <Brain size={18} className="text-[var(--color-cyber-emerald)] shadow-[0_0_5px_var(--color-cyber-emerald)]" />
                                    <span className="text-[12px] md:text-sm font-black text-[var(--color-cyber-text-main)] uppercase tracking-widest drop-shadow-md">DITTO Security: Ethical Hacking</span>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default About;