import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, ArrowUp, Shield } from 'lucide-react';
import { settingService } from '../services/api';

const Footer = () => {
    const [settings, setSettings] = useState({
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        location: 'Hyderabad, India'
    });

    useEffect(() => {
        const fetchSettings = async () => {
            const data = await settingService.getSettings();
            if (data) {
                setSettings({
                    github: data.github || 'https://github.com',
                    linkedin: data.linkedin || 'https://linkedin.com',
                    twitter: data.twitter || 'https://twitter.com',
                    location: data.location || 'Hyderabad, India'
                });
            }
        };
        fetchSettings();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative w-full border-t border-[rgba(16,185,129,0.15)] bg-[rgba(2,6,23,0.98)] py-5 px-6 sm:px-12 md:px-16 z-10 overflow-hidden font-mono text-[10px] select-none">
            {/* Minimal Glow Divider */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(16,185,129,0.25)] to-transparent"></div>

            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* Left Side: Brand, Copyright & Live State */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-[var(--color-cyber-text-main)]">
                        <span className="font-black tracking-widest text-[10px]">Vishnuvardhan <span className="text-[var(--color-cyber-emerald)]">//</span> Portfolio</span>
                    </div>

                    <span className="text-[rgba(255,255,255,0.08)] hidden xs:inline">/</span>

                    <div className="hidden xs:flex items-center gap-1.5 text-[var(--color-cyber-text-muted)]">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-cyber-emerald)] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--color-cyber-emerald)]"></span>
                        </span>
                        <span className="text-[9px] uppercase">ONLINE</span>
                    </div>

                    <span className="text-[rgba(255,255,255,0.08)] hidden sm:inline">/</span>
                    <span className="text-[var(--color-cyber-text-muted)] text-[9px] hidden sm:inline uppercase">{settings.location}</span>
                </div>

                {/* Center Side: Intentionally left empty so the floating Navigation Dock sits here without overlap */}
                <div className="flex-grow hidden md:block"></div>

                {/* Right Side: Social Nodes, Admin & Scroll Action */}
                <div className="flex items-center gap-4 text-[var(--color-cyber-text-muted)]">

                    {/* Social links */}
                    <div className="flex items-center gap-2">
                        {settings.github && (
                            <a
                                href={settings.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-7 h-7 rounded bg-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.05)] hover:border-[var(--color-cyber-emerald)] hover:bg-[rgba(16,185,129,0.03)] flex items-center justify-center text-[var(--color-cyber-text-muted)] hover:text-[var(--color-cyber-emerald)] transition-all duration-300"
                                aria-label="GitHub"
                            >
                                <Github size={12} />
                            </a>
                        )}
                        {settings.linkedin && (
                            <a
                                href={settings.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-7 h-7 rounded bg-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.05)] hover:border-[var(--color-cyber-emerald)] hover:bg-[rgba(16,185,129,0.03)] flex items-center justify-center text-[var(--color-cyber-text-muted)] hover:text-[var(--color-cyber-emerald)] transition-all duration-300"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={12} />
                            </a>
                        )}
                        {settings.twitter && (
                            <a
                                href={settings.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-7 h-7 rounded bg-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.05)] hover:border-[var(--color-cyber-emerald)] hover:bg-[rgba(16,185,129,0.03)] flex items-center justify-center text-[var(--color-cyber-text-muted)] hover:text-[var(--color-cyber-emerald)] transition-all duration-300"
                                aria-label="Twitter"
                            >
                                <Twitter size={12} />
                            </a>
                        )}
                    </div>

                    <span className="text-[rgba(255,255,255,0.08)]">/</span>

                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-1 hover:text-[var(--color-cyber-emerald)] transition-colors group cursor-none"
                    >
                        <span className="text-[9px]">UP()</span>
                        <ArrowUp size={10} className="group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
