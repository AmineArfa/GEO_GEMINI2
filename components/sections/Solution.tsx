"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ScanSearch, TrendingUp, ShieldCheck } from "lucide-react";

import content from "@/data/landing-content.json";

const ICONS = [ScanSearch, TrendingUp, ShieldCheck];

export function Solution() {
    return (
        <section className="py-32 px-4 relative">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        {content.solution.headline} <br />
                        <span className="text-gradient">{content.solution.headlineHighlight}</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-white/60 text-lg"
                    >
                        {content.solution.subheadline}
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {content.solution.features.map((feature, i) => {
                        const Icon = ICONS[i] || ScanSearch;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary mb-6 group-hover:scale-110 transition-transform">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-white/60 leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
