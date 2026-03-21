import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './pages/Hero';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Experience from './pages/Experience';
import CustomCursor from './components/CustomCursor';

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

    // Hide default cursor globally on large screens for the CustomCursor
    useEffect(() => {
        if (window.innerWidth >= 1024) {
            document.body.style.cursor = 'none';
        }
    }, []);

    return (
        <Router>
            <div className="min-h-screen bg-[var(--color-cyber-slate-900)] text-[var(--color-cyber-text-main)] transition-colors duration-300 relative overflow-hidden">
                {/* Global Scrolling Progress */}
                <motion.div
                    className="fixed top-0 left-0 right-0 h-1 bg-[var(--color-cyber-emerald)] origin-left z-[100] shadow-[0_0_15px_var(--color-cyber-emerald-glow)]"
                    style={{ scaleX }}
                />
                
                {/* Global Grid Noise Pattern */}
                <div className="fixed inset-0 pointer-events-none bg-grid-pattern opacity-60 z-0"></div>

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