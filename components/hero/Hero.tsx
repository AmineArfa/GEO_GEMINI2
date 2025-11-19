"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { UrlInput } from "./UrlInput";
import { Trophy, Eye, Target, TrendingUp, MessageSquare, ArrowRightLeft, Zap } from "lucide-react";

import content from "@/data/landing-content.json";

const STAT_ICONS = [MessageSquare, ArrowRightLeft, Zap, TrendingUp];

export function Hero() {
    const handleAnalyze = (url: string) => {
        console.log("Analyzing:", url);
        // TODO: Trigger demo flow
    };

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-32 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent-primary/20 rounded-full blur-[120px] opacity-50 animate-pulse" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-accent-secondary/10 rounded-full blur-[100px] opacity-30" />
            </div>

            <div className="container mx-auto max-w-5xl text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
                >
                    <span className="flex h-2 w-2 rounded-full bg-accent-cyan animate-pulse" />
                    <span className="text-sm font-medium text-white/80">{content.hero.badge}</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1]"
                >
                    {content.hero.headline} <br />
                    <span className="text-gradient">{content.hero.headlineHighlight}</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="text-xl md:text-2xl text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed"
                >
                    {content.hero.subheadline}
                </motion.p>

                <UrlInput onSubmit={handleAnalyze} />

                {/* Trust Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-24 w-full max-w-5xl mx-auto"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
                        {content.hero.stats.map((stat, i) => {
                            const Icon = STAT_ICONS[i] || MessageSquare;
                            return (
                                <div key={i} className="bg-black/40 backdrop-blur-md p-6 md:p-8 flex flex-col items-center justify-center group hover:bg-white/5 transition-colors cursor-default">
                                    <Icon className="w-6 h-6 text-accent-primary mb-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">{stat.value}</div>
                                    <div className="text-sm text-white/60 font-medium text-center mb-1">{stat.label}</div>
                                    <div className="text-xs text-white/30 text-center">{stat.desc}</div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
