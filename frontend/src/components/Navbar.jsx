import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User, Folder, Briefcase, Mail, Moon, Sun } from "lucide-react";
import logo from "../assets/logo-vv.png";

const Navbar = () => {
    const location = useLocation();
    const [isGlass, setIsGlass] = useState(false);
    const [isDark, setIsDark] = useState(true);

    const isHomePath = location.pathname === '/' || location.pathname === '';
    const [isLogoCentered, setIsLogoCentered] = useState(isHomePath);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark) || !savedTheme) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        }

        const handleScroll = () => {
            const scrollY = window.pageYOffset;
            setIsGlass(scrollY > 20);
            if (window.location.pathname === '/' || window.location.pathname === '') {
                setIsLogoCentered(scrollY < 120);
            } else {
                setIsLogoCentered(false);
            }
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    const toggleTheme = () => {
        setIsDark(prev => {
            const next = !prev;
            if (next) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
            return next;
        });
    };

    const navLinks = [
        { name: "Home", path: "/", icon: Home },
        { name: "About", path: "/about", icon: User },
        { name: "Projects", path: "/projects", icon: Folder },
        { name: "Experience", path: "/experience", icon: Briefcase },
        { name: "Contact", path: "/contact", icon: Mail },
    ];

    return (
        <>
            {/* The Animated Fixed Logo */}
            <Link
                to="/"
                className={`fixed z-[60] overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isLogoCentered
                    ? "top-[35vh] left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[4] md:scale-[5] pointer-events-none h-[52px] md:h-[60px]"
                    : "top-[17px] md:top-[15px] left-6 md:left-8 translate-x-0 translate-y-0 scale-100 hover:opacity-80 h-[32px] md:h-[38px]"
                    }`}
            >
                <img
                    src={logo}
                    alt="VV"
                    className={`h-[52px] md:h-[60px] w-auto max-w-none mix-blend-plus-lighter transition-all ${!isDark ? 'brightness-50 opacity-80 mix-blend-normal' : ''}`}
                />
            </Link>

            {/* Desktop / Global Top Header */}
            <header
                className={`fixed top-0 left-0 w-full z-50 h-[68px] px-4 sm:px-6 flex justify-between items-center transition-all duration-300 ${isGlass ? 'cyber-glass border-b border-[var(--color-cyber-slate-700)]' : 'bg-transparent'}`}
            >
                <div className="w-4"></div>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center pointer-events-none w-full px-2">
                    <h2 className={`text-[12px] min-[380px]:text-[14px] sm:text-lg font-black tracking-wider sm:tracking-widest text-gradient-emerald transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap ${!isLogoCentered ? 'translate-y-0 opacity-100' : 'translate-y-[40px] opacity-0'
                        }`}>
                        VISHNUVARDHAN
                    </h2>
                </div>

                <div className="flex items-center gap-4 sm:gap-5 justify-end">
                    <Link
                        to="/contact"
                        className="cyber-btn inline-flex text-[10px] px-4 py-2 sm:text-xs sm:px-6 sm:py-2.5 rounded-full shadow-[0_0_15px_var(--color-cyber-emerald-glow)] hover:shadow-[0_0_25px_var(--color-cyber-emerald)] transition-all duration-300 uppercase font-black"
                    >
                        Hire Now
                    </Link>
                </div>
            </header>

            {/* Bottom Dock */}
            <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-[420px]">
                <div className="cyber-glass rounded-[32px] px-6 py-3 flex justify-between items-center border border-[var(--color-cyber-slate-700)]">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.path;
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`flex flex-col items-center gap-1 transition-colors duration-200 ${isActive ? 'text-[var(--color-cyber-emerald)]' : 'text-[var(--color-cyber-text-muted)] hover:text-[var(--color-cyber-text-main)]'}`}
                            >
                                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                                <span className="text-[10px] font-medium" style={{ color: "inherit" }}>{link.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </>
    );
};

export default Navbar;