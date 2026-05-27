import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './pages/Hero';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Experience from './pages/Experience';
import CustomCursor from './components/CustomCursor';

const NoiseOverlay = () => <div className="noise-bg" />;

const PageWrapper = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.98, translateY: 10 }}
        animate={{ opacity: 1, scale: 1, translateY: 0 }}
        exit={{ opacity: 0, scale: 0.98, translateY: -10 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
        {children}
    </motion.div>
);

function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageWrapper><Hero /></PageWrapper>} />
                <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
                <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
                <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
                <Route path="/experience" element={<PageWrapper><Experience /></PageWrapper>} />
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        // Initialize Lenis for smooth scrolling
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Hide default cursor globally on large screens
        if (window.innerWidth >= 1024) {
            document.body.style.cursor = 'none';
        }

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <Router>
            <div className="min-h-screen bg-[var(--color-cyber-slate-950)] text-[var(--color-cyber-text-main)] transition-colors duration-300 relative overflow-hidden">
                <NoiseOverlay />
                
                {/* Global Scrolling Progress Bar */}
                <motion.div
                    className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-cyber-emerald)] to-[var(--color-cyber-emerald-bright)] origin-left z-[100] shadow-[0_0_15px_var(--color-cyber-emerald-glow)]"
                    style={{ scaleX }}
                />
                
                {/* Global Grid Noise Pattern */}
                <div className="fixed inset-0 pointer-events-none bg-grid-pattern opacity-40 z-0"></div>

                <CustomCursor />
                
                <div className="relative z-10 w-full h-full cursor-none min-[1024px]:cursor-none">
                    <Navbar />
                    <AnimatedRoutes />
                </div>
            </div>
        </Router>
    );
}

export default App;