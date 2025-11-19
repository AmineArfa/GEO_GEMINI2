"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function AnimatedGrid() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* 1. Ambient Gradient Blobs */}
            <div className="absolute inset-0 opacity-30">
                {/* Primary Blob (Indigo) */}
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-0 left-0 w-[800px] h-[800px] bg-accent-primary/30 rounded-full blur-[120px] mix-blend-screen"
                />

                {/* Secondary Blob (Purple) */}
                <motion.div
                    animate={{
                        x: [0, -100, 0],
                        y: [0, 100, 0],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2,
                    }}
                    className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent-secondary/20 rounded-full blur-[100px] mix-blend-screen"
                />

                {/* Accent Blob (Cyan) */}
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 50, 0],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 5,
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-cyan/20 rounded-full blur-[90px] mix-blend-screen"
                />
            </div>

            {/* 2. Interactive Mouse Glow */}
            <div
                className="absolute w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] pointer-events-none transition-opacity duration-500"
                style={{
                    left: mousePosition.x - 300,
                    top: mousePosition.y - 300,
                    opacity: 0.1,
                }}
            />

            {/* 3. Modern Grid Layer */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
                    backgroundSize: "60px 60px",
                    maskImage: "radial-gradient(circle at center, black 60%, transparent 100%)",
                    WebkitMaskImage: "radial-gradient(circle at center, black 60%, transparent 100%)",
                }}
            />

            {/* 4. Floating Particles */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            x: Math.random() * 1000,
                            y: Math.random() * 1000,
                            opacity: Math.random() * 0.5 + 0.2,
                        }}
                        animate={{
                            y: [null, Math.random() * -100],
                            opacity: [null, 0],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 5,
                        }}
                        className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
                    />
                ))}
            </div>

            {/* 5. Vignette Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] opacity-80" />
        </div>
    );
}
