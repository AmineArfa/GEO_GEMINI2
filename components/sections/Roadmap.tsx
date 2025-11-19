"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Search, Zap, Trophy, Shield } from "lucide-react";
import content from "@/data/landing-content.json";

const ICONS = [Search, Zap, Trophy, Shield];
const COLORS = [
    { color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
    { color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
    { color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
    { color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" }
];

export function Roadmap() {
    return (
        <section className="py-32 px-4 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent-primary/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="text-center mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50"
                    >
                        {content.roadmap.headline}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-white/60 text-lg max-w-2xl mx-auto"
                    >
                        {content.roadmap.subheadline}
                    </motion.p>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:block relative h-[600px]">
                    {/* Central Rail */}
                    <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <div className="absolute top-1/2 left-0 w-full h-px bg-accent-primary/50 blur-[2px]" />

                    <div className="grid grid-cols-4 gap-8 h-full">
                        {content.roadmap.steps.map((step, i) => {
                            const isTop = i % 2 === 0;
                            const Icon = ICONS[i];
                            const colors = COLORS[i];
                            return (
                                <div key={i} className="relative h-full">
                                    {/* Connector Line */}
                                    <svg className={`absolute left-1/2 -translate-x-1/2 w-px h-1/2 stroke-white/20 ${isTop ? 'top-0' : 'bottom-0'}`} overflow="visible">
                                        <motion.line
                                            x1="0" y1={isTop ? "100%" : "0%"}
                                            x2="0" y2={isTop ? "0%" : "100%"}
                                            strokeWidth="1"
                                            strokeDasharray="4 4"
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            whileInView={{ pathLength: 1, opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: i * 0.2 }}
                                        />
                                        {/* Glowing Dot on Rail */}
                                        <circle cx="0" cy={isTop ? "100%" : "0%"} r="4" className="fill-black stroke-white stroke-2" />
                                    </svg>

                                    {/* Card */}
                                    <motion.div
                                        initial={{ opacity: 0, y: isTop ? -50 : 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.2 + 0.3, type: "spring", stiffness: 50 }}
                                        className={`absolute left-0 right-0 ${isTop ? 'top-12' : 'bottom-12'}`}
                                    >
                                        <div className={`group relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border ${colors.border} hover:bg-white/10 transition-all duration-500 hover:-translate-y-2`}>
                                            {/* Step Number Background */}
                                            <div className="absolute -right-4 -top-6 text-8xl font-bold text-white/5 select-none font-mono">
                                                {step.id}
                                            </div>

                                            <div className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                                <Icon className={`w-6 h-6 ${colors.color}`} />
                                            </div>

                                            <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                                            <p className="text-white/60 leading-relaxed">{step.desc}</p>

                                            {/* Bottom Glow Line */}
                                            <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${colors.color.split('-')[1]}-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                        </div>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden space-y-12 relative pl-8">
                    {/* Vertical Rail */}
                    <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-accent-primary/0 via-accent-primary/50 to-accent-primary/0" />

                    {content.roadmap.steps.map((step, i) => {
                        const Icon = ICONS[i];
                        const colors = COLORS[i];
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative"
                            >
                                {/* Dot */}
                                <div className="absolute left-[-16px] top-8 w-8 h-8 rounded-full bg-black border border-white/20 flex items-center justify-center z-10">
                                    <div className={`w-3 h-3 rounded-full ${colors.bg.replace('/10', '')}`} />
                                </div>

                                <div className={`p-6 rounded-xl bg-white/5 border ${colors.border} backdrop-blur-sm`}>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
                                            <Icon className={`w-5 h-5 ${colors.color}`} />
                                        </div>
                                        <span className="text-4xl font-bold text-white/10 font-mono">{step.id}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                    <p className="text-white/60 text-sm">{step.desc}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
