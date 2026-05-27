import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };
        
        const handleMouseOver = (e) => {
            if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.cyber-card') || e.target.closest('.cyber-btn') || e.target.closest('.lucide')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            height: 32,
            width: 32,
            backgroundColor: "transparent",
            border: "1px solid rgba(16, 185, 129, 0.5)",
            transition: { type: "tween", ease: "backOut", duration: 0.15 }
        },
        hover: {
            x: mousePosition.x - 32,
            y: mousePosition.y - 32,
            height: 64,
            width: 64,
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            border: "1px solid rgba(16, 185, 129, 0.8)",
            mixBlendMode: "screen",
            transition: { type: "tween", ease: "backOut", duration: 0.15 }
        }
    };

    return (
        <div className="hidden min-[1024px]:block">
            {/* Inner Precision Dot */}
            <motion.div 
                className="fixed top-0 left-0 w-2 h-2 bg-[var(--color-cyber-emerald)] rounded-full pointer-events-none z-[9999] shadow-[0_0_10px_var(--color-cyber-emerald)]"
                animate={{ x: mousePosition.x - 4, y: mousePosition.y - 4 }}
                transition={{ type: "tween", ease: "linear", duration: 0 }}
            />
            {/* Outer Tracker Ring */}
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998]"
                variants={variants}
                animate={isHovering ? "hover" : "default"}
            />
        </div>
    );
};

export default CustomCursor;
