import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Linkedin, MapPin, Send, MessageSquare, Globe, ChevronRight, X, User, CheckCircle, AlertTriangle } from 'lucide-react';
import Magnetic from '../components/Magnetic';

const Contact = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: '', text: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: '', text: '' });

        try {
            const response = await fetch('http://localhost:5000/api/messages', {
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
                            <button onClick={() => setIsFormOpen(true)} type="button" className="cyber-btn px-10 py-5 text-sm cursor-pointer relative z-20">
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

                {/* Message Modal Overlay */}
                <AnimatePresence>
                    {isFormOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md"
                            onClick={() => !isSubmitting && setIsFormOpen(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="relative w-full max-w-2xl bg-[#0f172a] rounded-2xl border border-[var(--color-cyber-slate-800)] shadow-[0_0_50px_rgba(16,185,129,0.15)] overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-cyber-emerald)] to-transparent" />
                                <div className="p-8 md:p-10">
                                    <div className="flex justify-between items-start mb-8">
                                        <div>
                                            <h2 className="text-2xl font-black text-white uppercase tracking-widest flex items-center gap-3">
                                                <MessageSquare size={24} className="text-[var(--color-cyber-emerald)]"/> Direct Transmission
                                            </h2>
                                            <p className="text-slate-400 mt-2 font-mono text-sm">Send a secure message directly to my inbox.</p>
                                        </div>
                                        <button onClick={() => !isSubmitting && setIsFormOpen(false)} className="p-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                                            <X size={20} />
                                        </button>
                                    </div>

                                    {submitStatus.text && (
                                        <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 font-mono text-sm shadow-lg border ${submitStatus.type === 'success' ? 'bg-[var(--color-cyber-emerald)]/10 border-[var(--color-cyber-emerald)]/50 text-[var(--color-cyber-emerald)]' : 'bg-red-500/10 border-red-500/50 text-red-400'}`}>
                                            {submitStatus.type === 'success' ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
                                            {submitStatus.text}
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest flex items-center gap-2"><User size={14}/> Name</label>
                                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="John Doe" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-[var(--color-cyber-emerald)] focus:ring-1 focus:ring-[var(--color-cyber-emerald)] outline-none transition-all font-medium text-sm" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest flex items-center gap-2"><Mail size={14}/> Email</label>
                                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="john@example.com" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-[var(--color-cyber-emerald)] focus:ring-1 focus:ring-[var(--color-cyber-emerald)] outline-none transition-all font-medium text-sm" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-mono font-bold text-[var(--color-cyber-emerald)] uppercase tracking-widest flex items-center gap-2"><MessageSquare size={14}/> Message</label>
                                            <textarea name="message" value={formData.message} onChange={handleInputChange} required rows="5" placeholder="Project details, inquiries, or just saying hello..." className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-[var(--color-cyber-emerald)] focus:ring-1 focus:ring-[var(--color-cyber-emerald)] outline-none transition-all font-medium text-sm resize-y" />
                                        </div>
                                        <button 
                                            type="submit" 
                                            onClick={handleSubmit} 
                                            disabled={isSubmitting} 
                                            className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-cyber-emerald)] text-black hover:bg-emerald-400 transition-all font-black uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] cursor-pointer relative z-20"
                                        >
                                            {isSubmitting ? 'Transmitting...' : <><Send size={18} /> Initialize Transfer</>}
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
