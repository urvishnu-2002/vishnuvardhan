import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, MapPin, Send } from 'lucide-react';
import Magnetic from '../components/Magnetic';

const Contact = () => {
    return (
        <section className="relative pt-32 pb-40 px-6 md:px-12 min-h-screen bg-[var(--color-cyber-slate-900)] overflow-hidden">
            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-[var(--color-cyber-text-main)] tracking-tight mb-4">
                        Let's <span className="text-gradient-emerald">Connect</span>
                    </h1>
                    <p className="text-[var(--color-cyber-text-muted)] text-lg max-w-xl mx-auto leading-relaxed">
                        Looking for a developer who understands both complex full-stack codebase architecture and real-world supply chain logistics? Let's build something scalable.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.2 }}
                    className="cyber-card w-full max-w-2xl bg-[var(--color-cyber-slate-800)] border-[var(--color-cyber-slate-700)] shadow-[0_10px_40px_rgba(0,0,0,0.5)] p-8 md:p-12 relative overflow-hidden group hover:border-[var(--color-cyber-emerald)] transition-colors"
                >
                    <div className="absolute -top-32 -right-32 w-64 h-64 bg-[var(--color-cyber-emerald)] opacity-[0.03] rounded-full blur-[80px] group-hover:opacity-10 transition-opacity pointer-events-none"></div>

                    <div className="flex flex-col gap-8 relative z-10">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 group/item">
                            <div className="w-14 h-14 rounded-full cyber-glass flex items-center justify-center border border-[var(--color-cyber-slate-700)] group-hover/item:border-[var(--color-cyber-emerald)] group-hover/item:shadow-[0_0_15px_var(--color-cyber-emerald-glow)] transition-all flex-shrink-0">
                                <Mail className="text-[var(--color-cyber-emerald)]" size={24} />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-mono text-[var(--color-cyber-text-muted)] uppercase tracking-widest mb-1">Email</h4>
                                <a href="mailto:i.m.vishnuvardhan2002@gmail.com" className="text-sm sm:text-lg md:text-xl font-bold text-white hover:text-[var(--color-cyber-emerald)] transition-colors break-all">
                                    i.m.vishnuvardhan2002@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 group/item">
                            <div className="w-14 h-14 rounded-full cyber-glass flex items-center justify-center border border-[var(--color-cyber-slate-700)] group-hover/item:border-[var(--color-cyber-emerald)] group-hover/item:shadow-[0_0_15px_var(--color-cyber-emerald-glow)] transition-all flex-shrink-0">
                                <Phone className="text-[var(--color-cyber-emerald)]" size={24} />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-mono text-[var(--color-cyber-text-muted)] uppercase tracking-widest mb-1">Phone</h4>
                                <a href="tel:+917093262941" className="text-lg md:text-xl font-bold text-white hover:text-[var(--color-cyber-emerald)] transition-colors">
                                    +91 7093262941
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 sm:gap-6 group/item">
                            <div className="w-14 h-14 rounded-full cyber-glass flex items-center justify-center border border-[var(--color-cyber-slate-700)] group-hover/item:border-[var(--color-cyber-emerald)] group-hover/item:shadow-[0_0_15px_var(--color-cyber-emerald-glow)] transition-all flex-shrink-0">
                                <MapPin className="text-[var(--color-cyber-emerald)]" size={24} />
                            </div>
                            <div className="flex flex-col">
                                <h4 className="text-[10px] font-mono text-[var(--color-cyber-text-muted)] uppercase tracking-widest mb-1">Location</h4>
                                <p className="text-lg md:text-xl font-bold text-white">
                                    Hyderabad, India
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center border-t border-[var(--color-cyber-slate-700)] pt-8 relative z-10 w-full">
                        <Magnetic>
                            <a href="mailto:i.m.vishnuvardhan2002@gmail.com" className="cyber-btn w-full sm:w-auto shadow-[0_0_20px_var(--color-cyber-emerald-glow)]">
                                <Send size={18} /> Send Mail
                            </a>
                        </Magnetic>
                        <Magnetic>
                            <a href="https://www.linkedin.com/in/urvishnu/" target="_blank" rel="noreferrer" className="cyber-btn cyber-btn-outline w-full sm:w-auto px-10">
                                <Linkedin size={18} /> LinkedIn
                            </a>
                        </Magnetic>
                    </div>

                </motion.div>

                <div className="mt-20 text-center relative z-10 px-4">
                    <p className="text-[10px] sm:text-xs font-mono text-[var(--color-cyber-text-muted)] uppercase tracking-widest mt-4">
                        © 2026 ITIKYALA MULINTI VISHNUVARDHAN REDDY
                    </p>
                </div>

            </div>
        </section>
    );
};

export default Contact;
