"use client";

import * as React from "react";
import { motion } from "framer-motion";
import content from "@/data/landing-content.json";

export function Benefits() {
    return (
        <section className="py-32 px-4 border-y border-white/5 bg-black/50 backdrop-blur-sm">
            <div className="container mx-auto max-w-6xl">
                <div className="grid md:grid-cols-3 gap-12">
                    {content.benefits.stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="text-center"
                        >
                            <div className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 mb-4">
                                {stat.value}
                            </div>
                            <div className="text-xl font-semibold text-white mb-2">{stat.label}</div>
                            <div className="text-white/40 text-sm max-w-[200px] mx-auto">{stat.desc}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
