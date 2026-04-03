import React from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Database, Brain, Linkedin, BadgeCheck, FileCode2, BarChart, Layout, Cpu, Globe, Rocket, GraduationCap, ChevronRight } from 'lucide-react';

const About = () => {
    const services = [
        {
            icon: Globe,
            title: "Full-Stack Development",
            desc: "Architecting scalable web applications from ground zero using Django and modern JS frameworks."
        },
        {
            icon: Cpu,
            title: "API Integration",
            desc: "Engineering high-performance REST APIs and third-party integrations with absolute structural integrity."
        },
        {
            icon: BarChart,
            title: "Data Analytics",
            desc: "Transforming complex datasets into actionable business intelligence through KPI dashboarding."
        },
        {
            icon: Rocket,
            title: "Performance Optimization",
            desc: "Auditing and improving application responsiveness and load times for elite user experiences."
        }
    ];

    return (
        <section className="min-h-screen pt-32 pb-32 px-6 md:px-12 max-w-6xl mx-auto overflow-hidden">
            {/* Header / Bio Segment */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-20 text-center md:text-left flex flex-col md:flex-row items-center gap-12 md:gap-20"
            >
                <div className="flex-1">
                    <h1 className="text-4xl md:text-7xl font-black text-[var(--color-cyber-text-main)] mb-8 tracking-tight">
                        Technical <span className="text-gradient-emerald">Arsenal</span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-[var(--color-cyber-text-muted)] leading-relaxed font-medium border-l-4 border-[var(--color-cyber-emerald)] pl-8 py-4 bg-gradient-to-r from-[var(--color-cyber-emerald)]/5 to-transparent rounded-r-3xl mb-8">
                        Results-driven <span className="text-white font-bold">Full-Stack Web Developer</span> with 1+ years of experience designing and deploying scalable web applications using Django and modern JavaScript frameworks. Proven expertise in building high-performance systems, optimizing APIs, and improving user experience. Strong background in data-driven decision-making through hands-on experience in supply chain analytics at <span className="text-white font-bold">Amazon</span>.
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
                </div>

                <div className="relative group w-48 h-48 md:w-72 md:h-72 flex-shrink-0">
                    <div className="absolute -inset-4 bg-gradient-to-tr from-[var(--color-cyber-emerald)] to-blue-600 rounded-[2rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative w-full h-full rounded-[2rem] border-2 border-[var(--color-cyber-slate-700)] overflow-hidden shadow-2xl group-hover:border-[var(--color-cyber-emerald)] transition-colors duration-500">
                        <img 
                            src="/assets/images/vv.jpg" 
                            alt="Vishnuvardhan" 
                            className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Section: Freelance Services */}
            <div className="mb-32">
                <h3 className="text-2xl font-black mb-12 text-[var(--color-cyber-text-main)] flex items-center gap-4">
                    <span className="h-[1px] flex-grow bg-[var(--color-cyber-slate-800)]"></span>
                    Expert Freelance Services
                    <span className="h-[1px] flex-grow bg-[var(--color-cyber-slate-800)]"></span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, i) => (
                        <motion.div 
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="cyber-glass p-8 rounded-3xl border border-[var(--color-cyber-slate-800)] hover:border-[var(--color-cyber-emerald)]/50 transition-all group"
                        >
                            <service.icon className="text-[var(--color-cyber-emerald)] mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform" size={32} />
                            <h4 className="text-white font-bold text-lg mb-3 uppercase tracking-wider">{service.title}</h4>
                            <p className="text-sm text-[var(--color-cyber-text-muted)] leading-relaxed font-medium">{service.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Section: Academic Roots */}
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="w-full mb-24"
            >
                <h3 className="text-2xl font-black mb-10 text-[var(--color-cyber-text-main)] flex items-center gap-3">
                    <BadgeCheck className="text-[var(--color-cyber-emerald)]" size={26} /> Educational Trajectory
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* B.Tech */}
                    <div className="cyber-glass p-8 rounded-2xl border border-[var(--color-cyber-slate-800)] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-[0.05] group-hover:opacity-[0.15] transition-opacity">
                            <GraduationCap size={80} />
                        </div>
                        <p className="text-[var(--color-cyber-emerald)] font-mono text-[10px] font-black tracking-widest uppercase mb-4">2020 – 2024</p>
                        <h4 className="text-lg font-bold text-white mb-2 leading-tight">Bachelor of Technology</h4>
                        <p className="text-sm text-[var(--color-cyber-text-muted)] mb-4 font-medium">Computer Science & Engineering</p>
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--color-cyber-slate-700)]">
                            <span className="text-[10px] font-mono text-[var(--color-cyber-text-muted)] uppercase">CGPA</span>
                            <span className="text-lg font-black text-[var(--color-cyber-emerald)]">7.04</span>
                        </div>
                    </div>

                    {/* Intermediate */}
                    <div className="cyber-glass p-8 rounded-2xl border border-[var(--color-cyber-slate-800)] relative group">
                        <p className="text-[var(--color-cyber-text-muted)] font-mono text-[10px] font-black tracking-widest uppercase mb-4">2018 – 2020</p>
                        <h4 className="text-lg font-bold text-white mb-2 leading-tight">Intermediate (MPC)</h4>
                        <p className="text-sm text-[var(--color-cyber-text-muted)] mb-4 font-medium">Sri Vaishnavi Abhyaas Junior College</p>
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--color-cyber-slate-700)]">
                            <span className="text-[10px] font-mono text-[var(--color-cyber-text-muted)] uppercase">CGPA</span>
                            <span className="text-lg font-black text-white">9.25</span>
                        </div>
                    </div>

                    {/* SSC */}
                    <div className="cyber-glass p-8 rounded-2xl border border-[var(--color-cyber-slate-800)] relative group">
                        <p className="text-[var(--color-cyber-text-muted)] font-mono text-[10px] font-black tracking-widest uppercase mb-4">2017 – 2018</p>
                        <h4 className="text-lg font-bold text-white mb-2 leading-tight">SSC</h4>
                        <p className="text-sm text-[var(--color-cyber-text-muted)] mb-4 font-medium">Ashara Sree Model High School</p>
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--color-cyber-slate-700)]">
                            <span className="text-[10px] font-mono text-[var(--color-cyber-text-muted)] uppercase">CGPA</span>
                            <span className="text-lg font-black text-white">9.7</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Section: Skills Matrix */}
            <div className="mb-32">
                <h3 className="text-2xl font-black mb-10 text-[var(--color-cyber-text-main)] text-center">Core Proficiencies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Dev Stack */}
                    <div className="cyber-card group">
                        <h4 className="text-[12px] text-[var(--color-cyber-emerald)] uppercase tracking-widest mb-6 font-black flex items-center gap-2">
                            <Code size={18}/> Development Stack
                        </h4>
                        <div className="flex flex-wrap gap-2.5">
                            {["Python", "JavaScript", "HTML5", "CSS3", "Django", "Flask", "React.js", "REST APIs", "Git", "GitHub"].map(s => 
                                <span key={s} className="text-[11px] font-bold text-white bg-[var(--color-cyber-slate-800)] px-4 py-2 rounded-xl border border-[var(--color-cyber-slate-700)] group-hover:border-[var(--color-cyber-emerald)]/30 transition-all hover:scale-105 hover:bg-[var(--color-cyber-emerald)]/10">{s}</span>
                            )}
                        </div>
                    </div>

                    {/* DataStack */}
                    <div className="cyber-card group">
                        <h4 className="text-[12px] text-blue-400 uppercase tracking-widest mb-6 font-black flex items-center gap-2">
                            <Database size={18}/> Data & Operations
                        </h4>
                        <div className="flex flex-wrap gap-2.5">
                            {["MySQL", "SQL", "Advanced Excel", "KPI Dashboards", "Data Analysis", "Performance Optimization"].map(s => 
                                <span key={s} className="text-[11px] font-bold text-white bg-[var(--color-cyber-slate-800)] px-4 py-2 rounded-xl border border-[var(--color-cyber-slate-700)] group-hover:border-blue-400/30 transition-all hover:scale-105 hover:bg-blue-400/10">{s}</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Section: Certifications */}
            <div className="mt-16">
                <h3 className="text-2xl font-black mb-12 text-[var(--color-cyber-text-main)] text-center">Certified Credentials</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { text: "A.I. & Machine Learning Bootcamp", org: "Udemy", status: "Ongoing" },
                        { text: "Data Science Specialization", org: "Udemy", status: "Ongoing" },
                        { text: "Learning Python", org: "LinkedIn Learning" },
                        { text: "Data Analytics Job Simulation", org: "Deloitte Australia" },
                        { text: "Technology Job Simulation", org: "Deloitte Australia" },
                        { text: "Cyber Security & Ethical Hacking", org: "DITTO" },
                        { text: "E-commerce Website Dev", org: "Great Learning" }
                    ].map((cert, idx) => (
                        <motion.div 
                            key={idx}
                            whileHover={{ y: -5 }}
                            className="cyber-glass p-6 rounded-2xl border border-[var(--color-cyber-slate-800)] hover:border-[var(--color-cyber-emerald)] group flex flex-col justify-between"
                        >
                            <div>
                                <h4 className="text-white font-bold text-sm mb-2 group-hover:text-[var(--color-cyber-emerald)] transition-colors">{cert.text}</h4>
                                <p className="text-[10px] text-[var(--color-cyber-text-muted)] font-mono uppercase tracking-widest">{cert.org}</p>
                            </div>
                            {cert.status && (
                                <span className="mt-4 px-2 py-1 bg-[var(--color-cyber-emerald)]/10 text-[var(--color-cyber-emerald)] text-[9px] font-black rounded w-fit uppercase tracking-tighter">{cert.status}</span>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Logistics & Interests Footer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24">
                <div className="cyber-glass p-8 rounded-3xl border border-[var(--color-cyber-slate-800)] flex flex-col gap-4">
                    <h4 className="text-[10px] text-[var(--color-cyber-emerald)] uppercase tracking-widest font-black">Native Languages</h4>
                    <div className="flex gap-3 flex-wrap">
                        {["English", "Telugu", "Hindi", "Kannada"].map(l => <span key={l} className="text-xs font-mono text-white px-3 py-1 bg-white/5 rounded-full">{l}</span>)}
                    </div>
                </div>
                <div className="cyber-glass p-8 rounded-3xl border border-[var(--color-cyber-slate-800)] flex flex-col gap-4">
                    <h4 className="text-[10px] text-blue-400 uppercase tracking-widest font-black">Interests</h4>
                    <div className="flex gap-3 flex-wrap">
                        {["Cooking", "Gaming", "Continuous Learning", "Technology Exploration"].map(i => <span key={i} className="text-xs font-mono text-white px-3 py-1 bg-white/5 rounded-full">{i}</span>)}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;