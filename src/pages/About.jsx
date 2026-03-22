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
                className="mb-10 text-center md:text-left flex flex-col md:flex-row items-center gap-10 md:gap-14"
            >
                <div className="flex-1">
                    <h1 className="text-4xl md:text-6xl font-black text-[var(--color-cyber-text-main)] mb-8 tracking-tight">
                        Technical <span className="text-gradient-emerald">Arsenal</span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-[var(--color-cyber-text-muted)] leading-relaxed font-medium border-l-4 border-[var(--color-cyber-emerald)] pl-8 py-2 bg-gradient-to-r from-[var(--color-cyber-emerald)]/5 to-transparent rounded-r-2xl">
                        I am a results-driven <span className="text-white font-bold tracking-wide">Full-stack Developer</span> and Computer Science graduate (pursuing M.Tech) with a unique blend of technical engineering and operational strategy. With hands-on experience building scalable <span className="text-white font-bold tracking-wide">Django</span> applications at Priyansh Technologies and optimizing high-stakes supply chain operations at <span className="text-white font-bold tracking-wide">Amazon</span>, I bridge the gap between robust code and data-driven decision-making. My expertise spans the entire development lifecycle—from frontend aesthetics in <span className="text-white font-bold tracking-wide">React</span> to backend architecture and complex data analytics.
                    </p>
                </div>

                <div className="relative group w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
                    <div className="absolute -inset-1.5 bg-gradient-to-r from-[var(--color-cyber-emerald)] to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-200"></div>
                    <img 
                        src="/assets/images/vv.jpg" 
                        alt="Vishnuvardhan" 
                        className="relative w-full h-full object-cover rounded-2xl border-2 border-[var(--color-cyber-slate-700)] shadow-2xl transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                </div>
            </motion.div>

            {/* Section: Education Timeline Segment */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full cyber-glass flex flex-col border border-[var(--color-cyber-slate-700)] rounded-2xl bg-[var(--color-cyber-slate-800)] p-8 md:p-10 mb-12 shadow-lg"
            >
                <h3 className="text-2xl font-black mb-8 text-[var(--color-cyber-text-main)] flex items-center gap-3">
                    <BadgeCheck className="text-[var(--color-cyber-emerald)]" size={26} /> Academic Roots
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <div className="space-y-6">
                        {/* Masters */}
                        <div className="relative pl-6 border-l-2 border-[var(--color-cyber-slate-700)] hover:border-[var(--color-cyber-emerald)] transition-colors group pb-2">
                            <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-[var(--color-cyber-emerald)] shadow-[0_0_10px_var(--color-cyber-emerald)] animate-pulse"></div>
                            <h4 className="text-base font-bold text-white leading-tight mb-1 group-hover:text-[var(--color-cyber-emerald)] transition-colors">Malla Reddy Vishwavidyapeeth</h4>
                            <p className="text-[11px] text-[var(--color-cyber-emerald)] font-mono mb-2 uppercase tracking-wide font-black border border-[var(--color-cyber-emerald)]/30 inline-block px-2 py-0.5 rounded bg-[var(--color-cyber-emerald)]/10">Aug 2025 – Present</p>
                            <p className="text-[13px] text-[var(--color-cyber-text-muted)] font-medium">Master of Technology - MTech, Computer Science</p>
                        </div>

                        {/* Bachelors */}
                        <div className="relative pl-6 border-l-2 border-[var(--color-cyber-slate-700)] hover:border-[var(--color-cyber-text-main)] transition-colors group pb-2">
                            <div className="absolute -left-[6px] top-1.5 w-[10px] h-[10px] rounded-full bg-[var(--color-cyber-text-main)] group-hover:shadow-[0_0_8px_white]"></div>
                            <h4 className="text-base font-bold text-[var(--color-cyber-text-main)] leading-tight mb-1">Malla Reddy Institute of Technology & Science</h4>
                            <p className="text-[11px] text-[var(--color-cyber-slate-400)] font-mono mb-2 uppercase tracking-wide">Nov 2020 – Jun 2024</p>
                            <p className="text-[13px] text-[var(--color-cyber-text-muted)] mb-3 font-medium">B.Tech Computer Science</p>
                            <span className="text-[10px] font-black text-[var(--color-cyber-text-main)] px-3 py-1 rounded border border-[var(--color-cyber-slate-700)] tracking-widest inline-block shadow-sm">7.04 CGPA</span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Intermediate */}
                        <div className="relative pl-6 border-l-2 border-[var(--color-cyber-slate-700)] hover:border-[var(--color-cyber-text-muted)] transition-colors group pb-2">
                            <div className="absolute -left-[6px] top-1.5 w-[10px] h-[10px] rounded-full bg-[var(--color-cyber-text-muted)]"></div>
                            <h4 className="text-base font-bold text-[var(--color-cyber-text-muted)] leading-tight mb-1 group-hover:text-white transition-colors">Sri Vaishnavi Housing Estates</h4>
                            <p className="text-[11px] text-[var(--color-cyber-slate-400)] font-mono mb-2 uppercase tracking-wide">May 2018 – Mar 2020</p>
                            <p className="text-[13px] text-[var(--color-cyber-slate-500)] mb-3 font-medium group-hover:text-[var(--color-cyber-text-muted)] transition-colors">High School Diploma (MPC)</p>
                            <span className="text-[10px] font-black text-[var(--color-cyber-slate-400)] px-3 py-1 rounded border border-[var(--color-cyber-slate-800)] tracking-widest inline-block group-hover:border-[var(--color-cyber-slate-600)] transition-colors">9.25 CGPA</span>
                        </div>

                        {/* SSC */}
                        <div className="relative pl-6 border-l-2 border-[var(--color-cyber-slate-700)] hover:border-[var(--color-cyber-slate-500)] transition-colors group">
                            <div className="absolute -left-[6px] top-1.5 w-[10px] h-[10px] rounded-full bg-[var(--color-cyber-slate-600)]"></div>
                            <h4 className="text-base font-bold text-[var(--color-cyber-slate-500)] leading-tight mb-1 group-hover:text-[var(--color-cyber-slate-400)] transition-colors">Akshara Sree</h4>
                            <p className="text-[11px] text-[var(--color-cyber-slate-400)] font-mono mb-2 uppercase tracking-wide">Jun 2015 – Mar 2018</p>
                            <p className="text-[13px] text-[var(--color-cyber-slate-600)] group-hover:text-[var(--color-cyber-slate-500)] transition-colors">High School Diploma</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Section: Elaborated Skills Matrix */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-12"
            >
                <h3 className="text-2xl font-black mb-6 text-[var(--color-cyber-text-main)] text-center">Core Proficiencies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Frontend & Mobile Architecture */}
                    <div className="cyber-glass rounded-2xl p-6 border border-[var(--color-cyber-slate-700)] bg-[var(--color-cyber-slate-800)]/70 hover:border-[var(--color-cyber-emerald)] hover:shadow-[0_0_20px_var(--color-cyber-emerald-glow)] transition-all group">
                         <h4 className="text-[12px] text-[var(--color-cyber-emerald)] uppercase tracking-widest mb-4 font-black flex items-center gap-2"><Code size={16}/> Frontend & Mobile</h4>
                         <div className="flex flex-wrap gap-2">
                             {["React.js", "JavaScript", "HTML5", "CSS3", "Bootstrap", "Web Design", "Android Dev", "Mobile Apps"].map(s => 
                                 <span key={s} className="text-[11px] font-bold text-white bg-[var(--color-cyber-slate-700)] px-3 py-1.5 rounded border border-[var(--color-cyber-slate-600)] group-hover:border-[var(--color-cyber-emerald)]/40 transition-colors drop-shadow-sm">{s}</span>
                             )}
                         </div>
                    </div>

                    {/* Backend & Systems Interface */}
                    <div className="cyber-glass rounded-2xl p-6 border border-[var(--color-cyber-slate-700)] bg-[var(--color-cyber-slate-800)]/70 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all group">
                         <h4 className="text-[12px] text-purple-400 uppercase tracking-widest mb-4 font-black flex items-center gap-2 drop-shadow-sm"><Server size={16}/> Backend & Architecture</h4>
                         <div className="flex flex-wrap gap-2">
                             {["Python", "Django REST", "Flask", "Java", "MongoDB", "MySQL", "SQL", "OOP", "Data Structures", "Full-Stack"].map(s => 
                                 <span key={s} className="text-[11px] font-bold text-white bg-[var(--color-cyber-slate-700)] px-3 py-1.5 rounded border border-[var(--color-cyber-slate-600)] group-hover:border-purple-500/40 transition-colors drop-shadow-sm">{s}</span>
                             )}
                         </div>
                    </div>
                    
                    {/* Data Science & Intelligence */}
                    <div className="cyber-glass rounded-2xl p-6 border border-[var(--color-cyber-slate-700)] bg-[var(--color-cyber-slate-800)]/70 hover:border-[#0a66c2]/50 hover:shadow-[0_0_20px_rgba(10,102,194,0.15)] transition-all group">
                         <h4 className="text-[12px] text-[#0a66c2] uppercase tracking-widest mb-4 font-black flex items-center gap-2 drop-shadow-sm"><Database size={16}/> Data & Analytics</h4>
                         <div className="flex flex-wrap gap-2">
                             {["Analytics", "Data Modeling", "Tableau", "Excel", "Data Analysis", "Spreadsheets", "Data-driven Decisions"].map(s => 
                                 <span key={s} className="text-[11px] font-bold text-white bg-[var(--color-cyber-slate-700)] px-3 py-1.5 rounded border border-[var(--color-cyber-slate-600)] group-hover:border-[#0a66c2]/40 transition-colors drop-shadow-sm">{s}</span>
                             )}
                         </div>
                    </div>
                    
                    {/* Enterprise Operations & Logistics */}
                    <div className="cyber-glass rounded-2xl p-6 border border-[var(--color-cyber-slate-700)] bg-[var(--color-cyber-slate-800)]/70 hover:border-[var(--color-cyber-text-main)] hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all group">
                         <h4 className="text-[12px] text-[var(--color-cyber-text-muted)] uppercase tracking-widest mb-4 font-black flex items-center gap-2"><BarChart size={16}/> Operations & Logistics</h4>
                         <div className="flex flex-wrap gap-2">
                             {["Supply Chain", "Transportation", "Capacity Planning", "Process Improvement", "Performance Metrics", "Freight Optimization", "Communication", "Problem Solving"].map(s => 
                                 <span key={s} className="text-[11px] font-bold text-white bg-[var(--color-cyber-slate-700)] px-3 py-1.5 rounded border border-[var(--color-cyber-slate-600)] group-hover:border-[var(--color-cyber-text-main)]/30 transition-colors drop-shadow-sm">{s}</span>
                             )}
                         </div>
                    </div>
                </div>
            </motion.div>

            {/* Section: Other Specs Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"
            >
                <div className="cyber-glass rounded-2xl p-6 md:p-8 border border-[var(--color-cyber-slate-700)] bg-[var(--color-cyber-slate-800)]/50 flex flex-col justify-center relative overflow-hidden group hover:border-[var(--color-cyber-emerald)] transition-colors">
                     <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-cyber-emerald)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     <h4 className="text-[10px] text-[var(--color-cyber-emerald)] uppercase tracking-widest mb-3 font-black relative z-10">Linguistics Module</h4>
                     <p className="text-[var(--color-cyber-text-main)] text-sm md:text-base font-mono leading-relaxed tracking-wide relative z-10 w-full flex justify-between flex-wrap gap-2">
                        <span className="bg-white/5 px-2 py-1 rounded">English</span>
                        <span className="bg-white/5 px-2 py-1 rounded">Telugu</span>
                        <span className="bg-white/5 px-2 py-1 rounded">Hindi</span>
                        <span className="bg-white/5 px-2 py-1 rounded">Kannada</span>
                     </p>
                </div>
                <div className="cyber-glass rounded-2xl p-6 md:p-8 border border-[var(--color-cyber-slate-700)] bg-[var(--color-cyber-slate-800)]/50 flex flex-col justify-center relative overflow-hidden group hover:border-[var(--color-cyber-text-main)] transition-colors">
                     <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     <h4 className="text-[10px] text-[var(--color-cyber-text-muted)] uppercase tracking-widest mb-3 font-black relative z-10">Interests</h4>
                     <p className="text-[var(--color-cyber-text-main)] text-sm md:text-base font-mono leading-relaxed tracking-wide relative z-10 w-full flex justify-between flex-wrap gap-2">
                        <span className="bg-white/5 px-2 py-1 rounded">Cooking</span>
                        <span className="bg-white/5 px-2 py-1 rounded">Gaming</span>
                        <span className="bg-white/5 px-2 py-1 rounded">Enhancing New Skills</span>
                     </p>
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
                <h3 className="text-[12px] font-mono uppercase tracking-widest text-[var(--color-cyber-text-muted)] mb-8 text-center flex items-center justify-center gap-4">
                    <span className="h-[1px] w-8 sm:w-16 bg-[var(--color-cyber-slate-700)]"></span>
                    Certified Credentials
                    <span className="h-[1px] w-8 sm:w-16 bg-[var(--color-cyber-slate-700)]"></span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-6">
                    {[
                        { icon: Brain, text: "AI Tools Workshop", style: "text-[var(--color-cyber-emerald)] shadow-[0_0_5px_var(--color-cyber-emerald)]", textStyle: "text-white" },
                        { icon: Linkedin, text: "Programming Foundations: Data Structures", style: "text-[#0a66c2] shadow-[0_0_5px_rgba(10,102,194,0.5)] bg-white rounded-sm", textStyle: "text-white" },
                        { icon: Linkedin, text: "Learning the Python 3 Standard Library", style: "text-[#0a66c2] shadow-[0_0_5px_rgba(10,102,194,0.5)] bg-white rounded-sm", textStyle: "text-white" },
                        { icon: Linkedin, text: "Python Object-Oriented Programming", style: "text-[#0a66c2] shadow-[0_0_5px_rgba(10,102,194,0.5)] bg-white rounded-sm", textStyle: "text-white" },
                        { icon: Linkedin, text: "Python Essential Training", style: "text-[#0a66c2] shadow-[0_0_5px_rgba(10,102,194,0.5)] bg-white rounded-sm", textStyle: "text-white" },
                        { icon: Code, text: "Python (Basic)", style: "text-[var(--color-cyber-emerald)] shadow-[0_0_5px_var(--color-cyber-emerald)]", textStyle: "text-white" },
                        { icon: Linkedin, text: "Learning Python", style: "text-[#0a66c2] shadow-[0_0_5px_rgba(10,102,194,0.5)] bg-white rounded-sm", textStyle: "text-white" },
                        { icon: Linkedin, text: "Learning Data Analytics Part 2", style: "text-[#0a66c2] shadow-[0_0_5px_rgba(10,102,194,0.5)] bg-white rounded-sm", textStyle: "text-white" },
                        { icon: Linkedin, text: "Learning Data Analytics: 1 Foundations", style: "text-[#0a66c2] shadow-[0_0_5px_rgba(10,102,194,0.5)] bg-white rounded-sm", textStyle: "text-white" },
                        { icon: Linkedin, text: "Intro to Career Skills in Data Analytics", style: "text-[#0a66c2] shadow-[0_0_5px_rgba(10,102,194,0.5)] bg-white rounded-sm", textStyle: "text-white" },
                        { icon: BadgeCheck, text: "Deloitte Australia - Tech Job Simulation", style: "text-[var(--color-cyber-text-muted)]", textStyle: "text-[var(--color-cyber-text-main)]" },
                        { icon: BadgeCheck, text: "Deloitte Australia - Data Analytics Job Simulation", style: "text-[var(--color-cyber-text-muted)]", textStyle: "text-[var(--color-cyber-text-main)]" },
                        { icon: FileCode2, text: "JavaScript projects", style: "text-[var(--color-cyber-text-muted)]", textStyle: "text-[var(--color-cyber-text-main)]" },
                        { icon: FileCode2, text: "Packages in python", style: "text-[var(--color-cyber-text-muted)]", textStyle: "text-[var(--color-cyber-text-main)]" },
                        { icon: FileCode2, text: "Android App with Python", style: "text-[var(--color-cyber-text-muted)]", textStyle: "text-[var(--color-cyber-text-main)]" },
                        { icon: FileCode2, text: "Python fundamentals for beginners", style: "text-[var(--color-cyber-text-muted)]", textStyle: "text-[var(--color-cyber-text-main)]" },
                        { icon: FileCode2, text: "Introduction to JavaScript", style: "text-[var(--color-cyber-text-muted)]", textStyle: "text-[var(--color-cyber-text-main)]" },
                        { icon: FileCode2, text: "Ecommerce Website with HTML & CSS", style: "text-[var(--color-cyber-text-muted)]", textStyle: "text-[var(--color-cyber-text-main)]" },
                        { icon: FileCode2, text: "Front End development - CSS", style: "text-[var(--color-cyber-text-muted)]", textStyle: "text-[var(--color-cyber-text-main)]" },
                        { icon: FileCode2, text: "Front End development - HTML", style: "text-[var(--color-cyber-text-muted)]", textStyle: "text-[var(--color-cyber-text-main)]" }
                    ].map((cert, idx) => {
                        const Icon = cert.icon;
                        return (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.08 }}
                                className="cyber-glass group relative overflow-hidden rounded-xl p-6 border border-[var(--color-cyber-slate-700)] bg-[var(--color-cyber-slate-900)] hover:border-[var(--color-cyber-emerald)] shadow-lg hover:shadow-[0_0_20px_var(--color-cyber-emerald-glow)] hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center gap-4"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-cyber-emerald)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-cyber-emerald)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                
                                <Icon size={32} className={`${cert.style} z-10 transition-transform duration-500 group-hover:scale-110`} />
                                <span className={`text-[12px] sm:text-[13px] font-black uppercase tracking-widest leading-relaxed z-10 transition-colors duration-300 ${cert.textStyle}`}>
                                    {cert.text}
                                </span>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </section>
    );
};

export default About;