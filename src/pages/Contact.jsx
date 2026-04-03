import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, MapPin, Send, MessageSquare, Globe, ChevronRight } from 'lucide-react';
import Magnetic from '../components/Magnetic';

const Contact = () => {
    return (
        <section className="relative pt-32 pb-40 px-6 md:px-12 min-h-screen bg-[var(--color-cyber-slate-950)] overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-[var(--color-cyber-emerald)] opacity-[0.02] blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-blue-500 opacity-[0.02] blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-16 text-center"
                >
                    <div className="status-badge w-fit mx-auto mb-6">
                        <div className="status-dot"></div>
                        Signal Established: Ready for Inquiries
                    </div>
                    <h1 className="text-4xl md:text-8xl font-black text-white tracking-tighter mb-6 uppercase">
                        Let's <span className="text-gradient-emerald">Connect</span>
                    </h1>
                    <p className="text-[var(--color-cyber-text-muted)] text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                        Looking for a senior developer to architect your next high-performance system? Let's discuss your objectives and build something exceptional.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
                    {/* Left: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="cyber-card p-10 md:p-16 flex flex-col gap-10 justify-center"
                    >
                        <div className="space-y-12">
                            {[
                                { icon: Mail, label: "Secure Email", v: "i.m.vishnuvardhan2002@gmail.com", href: "mailto:i.m.vishnuvardhan2002@gmail.com" },
                                { icon: Phone, label: "Direct Line", v: "+91 7093262941", href: "tel:+917093262941" },
                                { icon: MapPin, label: "HQ Location", v: "Hyderabad, India", href: null }
                            ].map((item, i) => (
                                <div key={item.label} className="flex items-center gap-6 group/item">
                                    <div className="w-16 h-16 rounded-2xl cyber-glass border border-[var(--color-cyber-slate-700)] group-hover/item:border-[var(--color-cyber-emerald)] group-hover/item:shadow-[0_0_20px_var(--color-cyber-emerald-glow)] transition-all flex items-center justify-center flex-shrink-0">
                                        <item.icon className="text-[var(--color-cyber-emerald)]" size={28} />
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] font-mono text-[var(--color-cyber-text-muted)] uppercase tracking-[0.2em] mb-1 font-black">{item.label}</h4>
                                        {item.href ? (
                                            <a href={item.href} className="text-xl md:text-2xl font-black text-white hover:text-[var(--color-cyber-emerald)] transition-colors break-all">
                                                {item.v}
                                            </a>
                                        ) : (
                                            <p className="text-xl md:text-2xl font-black text-white">{item.v}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: CTA / Socials */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="cyber-card p-10 md:p-16 bg-gradient-to-br from-[var(--color-cyber-emerald)]/5 to-transparent flex flex-col items-center justify-center text-center"
                    >
                        <MessageSquare size={60} className="text-[var(--color-cyber-emerald)] mb-8 opacity-20" />
                        <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tight">Available For Freelance</h3>
                        <p className="text-[var(--color-cyber-text-muted)] mb-10 leading-relaxed font-medium">
                            I am currently open to high-impact projects and full-stack collaborations. Available for remote work across all time zones.
                        </p>

                        <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full justify-center">
                            <Magnetic>
                                <a href="mailto:i.m.vishnuvardhan2002@gmail.com" className="cyber-btn px-10 py-5 text-sm">
                                    Send Message <Send size={18} />
                                </a>
                            </Magnetic>
                            <Magnetic>
                                <a href="https://www.linkedin.com/in/urvishnu/" target="_blank" rel="noreferrer" className="cyber-btn cyber-btn-outline px-10 py-5 text-sm">
                                    LinkedIn <ChevronRight size={18} />
                                </a>
                            </Magnetic>
                        </div>
                    </motion.div>
                </div>


                <a
                    href="/assets/resume.pdf"
                    download="Vishnuvardhan_Resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="cyber-btn w-fit group shadow-[0_0_20px_var(--color-cyber-emerald-glow)] mt-12"
                >
                    DOWNLOAD RESUME <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>

                <div className="mt-24 text-center">
                    <p className="text-[10px] font-mono text-[var(--color-cyber-text-muted)] uppercase tracking-[0.4em] font-black opacity-40">
                        © 2026 ITIKYALA MULINTI VISHNUVARDHAN REDDY // SYSTEM V3.0
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Contact;
