import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Database, Brain, Linkedin, BadgeCheck, FileCode2, BarChart, Layout, Cpu, Globe, Rocket, GraduationCap, ChevronRight } from 'lucide-react';
import { settingService, educationService, certificationService } from '../services/api';

const defaultServices = [
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

const defaultServicesMap = {
    "Full-Stack Development": { icon: Globe, desc: "Architecting scalable web applications from ground zero using Django and modern JS frameworks." },
    "API Integration": { icon: Cpu, desc: "Engineering high-performance REST APIs and third-party integrations with absolute structural integrity." },
    "Data Analytics": { icon: BarChart, desc: "Transforming complex datasets into actionable business intelligence through KPI dashboarding." },
    "Performance Optimization": { icon: Rocket, desc: "Auditing and improving application responsiveness and load times for elite user experiences." }
};

const defaultEducationData = [
    {
        period: "2020 – 2024",
        degree: "Bachelor of Technology",
        field: "Computer Science & Engineering",
        institution: "Malla Reddy Institute of Technology and Science",
        description: "7.04"
    },
    {
        period: "2018 – 2020",
        degree: "Intermediate (MPC)",
        institution: "Sri Vaishnavi Abhyaas Junior College",
        field: "MPC",
        description: "9.25"
    },
    {
        period: "2017 – 2018",
        degree: "SSC",
        institution: "Ashara Sree Model High School",
        field: "General",
        description: "9.7"
    }
];

const defaultSkills = ["Python", "JavaScript", "HTML5", "CSS3", "Django", "Flask", "React.js", "REST APIs", "Git", "GitHub"];
const defaultDataOperations = ["MySQL", "SQL", "Advanced Excel", "KPI Dashboards", "Data Analysis", "Performance Optimization"];

const defaultCertifications = [
    { text: "A.I. & Machine Learning Bootcamp", org: "Udemy", status: "Ongoing" },
    { text: "Data Science Specialization", org: "Udemy", status: "Ongoing" },
    { text: "Learning Python", org: "LinkedIn Learning" },
    { text: "Data Analytics Job Simulation", org: "Deloitte Australia" },
    { text: "Technology Job Simulation", org: "Deloitte Australia" },
    { text: "Cyber Security & Ethical Hacking", org: "DITTO" },
    { text: "E-commerce Website Dev", org: "Great Learning" }
];

const defaultLanguages = ["English", "Telugu", "Hindi", "Kannada"];
const defaultInterests = ["Cooking", "Gaming", "Continuous Learning", "Technology Exploration"];

const defaultBio = "Results-driven Full-Stack Web Developer with 1+ years of experience designing and deploying scalable web applications using Django and modern JavaScript frameworks. Proven expertise in building high-performance systems, optimizing APIs, and improving user experience. Strong background in data-driven decision-making through hands-on experience in supply chain analytics at Amazon.";

const About = () => {
    const [services, setServices] = useState(defaultServices);
    const [educationList, setEducationList] = useState(defaultEducationData);
    const [certifications, setCertifications] = useState(defaultCertifications);
    
    const [bio, setBio] = useState(defaultBio);
    const [skills, setSkills] = useState(defaultSkills);
    const [dataOperations, setDataOperations] = useState(defaultDataOperations);
    const [languages, setLanguages] = useState(defaultLanguages);
    const [interests, setInterests] = useState(defaultInterests);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadAllData = async () => {
            setIsLoading(true);
            try {
                // Fetch settings
                const settingsData = await settingService.getSettings();
                if (settingsData) {
                    if (settingsData.bio) setBio(settingsData.bio);
                    if (settingsData.skills && settingsData.skills.length > 0) {
                        setSkills(settingsData.skills);
                    }
                    if (settingsData.technologies && settingsData.technologies.length > 0) {
                        setDataOperations(settingsData.technologies);
                    }
                    if (settingsData.languages && settingsData.languages.length > 0) {
                        setLanguages(settingsData.languages);
                    }
                    if (settingsData.hobbies && settingsData.hobbies.length > 0) {
                        setInterests(settingsData.hobbies);
                    }
                    if (settingsData.services && settingsData.services.length > 0) {
                        const mappedServices = settingsData.services.map(s => {
                            const matched = defaultServicesMap[s] || { icon: Globe, desc: `Professional software engineering and consultation for ${s}.` };
                            return {
                                icon: matched.icon,
                                title: s,
                                desc: matched.desc
                            };
                        });
                        setServices(mappedServices);
                    }
                }

                // Fetch education
                const backendEdu = await educationService.getEducations();
                if (backendEdu && backendEdu.length > 0) {
                    setEducationList(backendEdu.map(edu => ({
                        period: `${edu.startDate} – ${edu.endDate}`,
                        degree: edu.degree,
                        field: edu.field,
                        institution: edu.institution,
                        location: edu.location || '',
                        description: edu.description
                    })));
                }

                // Fetch certifications
                const backendCerts = await certificationService.getCertifications();
                if (backendCerts && backendCerts.length > 0) {
                    setCertifications(backendCerts.map(cert => ({
                        text: cert.title,
                        org: cert.issuer,
                        status: cert.description || cert.date
                    })));
                }

            } catch (error) {
                console.warn('Failed to fetch About page details from backend, using defaults:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadAllData();
    }, []);

    return (
        <section id="summary" className="min-h-screen pt-32 pb-32 px-6 md:px-12 max-w-6xl mx-auto overflow-hidden">
            {/* Header / Bio Segment */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-20 text-center md:text-left flex flex-col md:flex-row items-center gap-12 md:gap-20"
            >
                <div className="flex-1">
                    <h1 className="text-4xl md:text-7xl font-black text-[var(--color-cyber-text-main)] mb-8 tracking-tight">
                        Technical <span className="text-gradient-emerald">Arsenal</span> {isLoading ? <span className="text-sm font-mono text-emerald-400 animate-pulse">(Syncing...)</span> : ''}
                    </h1>
                    
                    <p className="text-lg md:text-xl text-[var(--color-cyber-text-muted)] leading-relaxed font-medium border-l-4 border-[var(--color-cyber-emerald)] pl-8 py-4 bg-gradient-to-r from-[var(--color-cyber-emerald)]/5 to-transparent rounded-r-3xl mb-8">
                        {bio}
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
                            key={service.title + '-' + i}
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
                id="education"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="w-full mb-24"
            >
                <h3 className="text-2xl font-black mb-10 text-[var(--color-cyber-text-main)] flex items-center gap-3">
                    <BadgeCheck className="text-[var(--color-cyber-emerald)]" size={26} /> Educational Trajectory
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {educationList.map((edu, idx) => (
                        <div key={idx} className="cyber-glass p-8 rounded-2xl border border-[var(--color-cyber-slate-800)] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-[0.05] group-hover:opacity-[0.15] transition-opacity">
                                <GraduationCap size={80} />
                            </div>
                            <p className="text-[var(--color-cyber-emerald)] font-mono text-[10px] font-black tracking-widest uppercase mb-4">{edu.period}</p>
                            <h4 className="text-lg font-bold text-white mb-2 leading-tight">{edu.degree}</h4>
                            <p className="text-sm text-[var(--color-cyber-text-muted)] mb-4 font-medium">{edu.field} • {edu.institution}{edu.location ? ` • ${edu.location}` : ''}</p>
                            {edu.description && (
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--color-cyber-slate-700)]">
                                    <span className="text-[10px] font-mono text-[var(--color-cyber-text-muted)] uppercase">Details / CGPA</span>
                                    <span className="text-lg font-black text-[var(--color-cyber-emerald)]">{edu.description}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Section: Skills Matrix */}
            <div id="skills" className="mb-32">
                <h3 className="text-2xl font-black mb-10 text-[var(--color-cyber-text-main)] text-center">Core Proficiencies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Dev Stack */}
                    <div className="cyber-card group">
                        <h4 className="text-[12px] text-[var(--color-cyber-emerald)] uppercase tracking-widest mb-6 font-black flex items-center gap-2">
                            <Code size={18}/> Development Stack
                        </h4>
                        <div className="flex flex-wrap gap-2.5">
                            {skills.map(s => 
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
                            {dataOperations.map(s => 
                                <span key={s} className="text-[11px] font-bold text-white bg-[var(--color-cyber-slate-800)] px-4 py-2 rounded-xl border border-[var(--color-cyber-slate-700)] group-hover:border-blue-400/30 transition-all hover:scale-105 hover:bg-blue-400/10">{s}</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Section: Certifications */}
            <div id="certifications" className="mt-16">
                <h3 className="text-2xl font-black mb-12 text-[var(--color-cyber-text-main)] text-center">Certified Credentials</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certifications.map((cert, idx) => (
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
            <div id="interests" className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24">
                <div className="cyber-glass p-8 rounded-3xl border border-[var(--color-cyber-slate-800)] flex flex-col gap-4">
                    <h4 className="text-[10px] text-[var(--color-cyber-emerald)] uppercase tracking-widest font-black">Native Languages</h4>
                    <div className="flex gap-3 flex-wrap">
                        {languages.map(l => <span key={l} className="text-xs font-mono text-white px-3 py-1 bg-white/5 rounded-full">{l}</span>)}
                    </div>
                </div>
                <div className="cyber-glass p-8 rounded-3xl border border-[var(--color-cyber-slate-800)] flex flex-col gap-4">
                    <h4 className="text-[10px] text-blue-400 uppercase tracking-widest font-black">Interests</h4>
                    <div className="flex gap-3 flex-wrap">
                        {interests.map(i => <span key={i} className="text-xs font-mono text-white px-3 py-1 bg-white/5 rounded-full">{i}</span>)}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;