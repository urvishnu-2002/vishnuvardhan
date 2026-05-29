import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Linkedin, MapPin, Send, MessageSquare, Globe, ChevronRight, X, User, CheckCircle, AlertTriangle } from 'lucide-react';
import Magnetic from '../components/Magnetic';
import { API_BASE_URL } from '../services/api';

const Contact = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: '', text: '' });
    const location = useLocation();

    const handleOpenForm = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setIsFormOpen(true);
    };

    useEffect(() => {
        if (isFormOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [isFormOpen]);

    useEffect(() => {
        if (location.hash === '#freelance') {
            setTimeout(() => {
                const element = document.getElementById('freelance');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                setIsFormOpen(true);
            }, 180);
        }
    }, [location.hash]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: '', text: '' });

        try {
            const response = await fetch(`${API_BASE_URL}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (data.success) {
                setSubmitStatus({ type: 'success', text: 'Transmission successful. I will respond shortly.' });
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => {
                    setIsFormOpen(false);
                    setSubmitStatus({ type: '', text: '' });
                }, 3000);
            } else {
                setSubmitStatus({ type: 'error', text: data.message || 'Transmission failed.' });
            }
        } catch (err) {
            setSubmitStatus({ type: 'error', text: 'Network connection failed. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

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
                        id="freelance"
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

                        <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full justify-center relative z-20">
                            <button onClick={handleOpenForm} type="button" className="cyber-btn px-10 py-5 text-sm cursor-pointer relative z-20">
                                Send Message <Send size={18} />
                            </button>
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

                {/* Message Modal Overlay - Standard Inline Rendering */}
                <AnimatePresence>
                    {isFormOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md font-mono"
                            onClick={() => !isSubmitting && setIsFormOpen(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0, y: 30 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                                transition={{ type: "spring", damping: 25, stiffness: 250 }}
                                onClick={(e) => e.stopPropagation()}
                                className="relative w-full max-w-2xl bg-[rgba(15,23,42,0.95)] rounded-2xl border border-[rgba(16,185,129,0.3)] shadow-[0_0_50px_rgba(16,185,129,0.25)] overflow-hidden"
                            >
                                {/* Grid texture inside modal */}
                                <div className="absolute inset-0 pointer-events-none bg-grid-pattern opacity-[0.08] z-0"></div>

                                {/* Top Laser Accent Line */}
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--color-cyber-emerald-bright)] to-transparent z-10" />

                                <div className="relative p-8 md:p-10 z-10">
                                    {/* Close Button */}
                                    <button
                                        onClick={() => !isSubmitting && setIsFormOpen(false)}
                                        className="absolute top-6 right-6 p-2 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] text-slate-400 hover:text-[var(--color-cyber-emerald)] hover:border-[var(--color-cyber-emerald)] transition-all hover:scale-105"
                                        aria-label="Close Modal"
                                    >
                                        <X size={18} />
                                    </button>

                                    {/* Modal Header */}
                                    <div className="mb-8 border-b border-[rgba(255,255,255,0.05)] pb-5">
                                        <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest flex items-center gap-3">
                                            <MessageSquare size={22} className="text-[var(--color-cyber-emerald)] animate-pulse" />
                                            <span>DIRECT_TRANSMISSION</span>
                                        </h2>
                                        <p className="text-[var(--color-cyber-text-muted)] mt-1.5 text-xs">ESTABLISHING SECURE CONNECTION CORE...</p>
                                    </div>

                                    {submitStatus.text && (
                                        <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-xs shadow-lg border ${submitStatus.type === 'success' ? 'bg-[var(--color-cyber-emerald)]/10 border-[var(--color-cyber-emerald)]/50 text-[var(--color-cyber-emerald)]' : 'bg-red-500/10 border-red-500/50 text-red-400'}`}>
                                            {submitStatus.type === 'success' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
                                            <span className="tracking-wider">{submitStatus.text}</span>
                                        </div>
                                    )}

                                    {/* Form */}
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest flex items-center gap-1.5">
                                                    <span>&gt; NAME_ID</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    required
                                                    placeholder="john_doe..."
                                                    className="w-full bg-[rgba(2,6,23,0.7)] border border-[rgba(255,255,255,0.05)] focus:border-[var(--color-cyber-emerald)] focus:shadow-[0_0_15px_var(--color-cyber-emerald-glow)] rounded-lg px-4 py-3 text-white outline-none transition-all text-xs font-mono"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest flex items-center gap-1.5">
                                                    <span>&gt; EMAIL_COORDS</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                    placeholder="john@example.com..."
                                                    className="w-full bg-[rgba(2,6,23,0.7)] border border-[rgba(255,255,255,0.05)] focus:border-[var(--color-cyber-emerald)] focus:shadow-[0_0_15px_var(--color-cyber-emerald-glow)] rounded-lg px-4 py-3 text-white outline-none transition-all text-xs font-mono"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest flex items-center gap-1.5">
                                                <span>&gt; PACKET_BODY</span>
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                required
                                                rows="5"
                                                placeholder="enter message parameters..."
                                                className="w-full bg-[rgba(2,6,23,0.7)] border border-[rgba(255,255,255,0.05)] focus:border-[var(--color-cyber-emerald)] focus:shadow-[0_0_15px_var(--color-cyber-emerald-glow)] rounded-lg px-4 py-3 text-white outline-none transition-all text-xs font-mono resize-none"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                            className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-cyber-emerald)] text-black hover:bg-emerald-400 transition-all font-black uppercase tracking-widest text-xs shadow-[0_0_20px_var(--color-cyber-emerald-glow)] hover:shadow-[0_0_30px_var(--color-cyber-emerald)] cursor-pointer relative z-20"
                                        >
                                            {isSubmitting ? 'TRANSMITTING...' : <><Send size={14} /> INITIALIZE_TRANSFER</>}
                                        </button>
                                    </form>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Contact;
