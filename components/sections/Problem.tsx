"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Search, Bot, User } from "lucide-react";
import content from "@/data/landing-content.json";

export function Problem() {
    return (
        <section className="py-32 px-4 relative overflow-hidden">
            <div className="container mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6">
                        {content.problem.headline}<br />
                        <span className="text-accent-primary">{content.problem.headlineHighlight}</span>
                    </h2>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        {content.problem.subheadline}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* The Old Way */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="p-8 rounded-3xl bg-surface-100 border border-white/10 relative overflow-hidden group"
                    >
                        <div className="text-sm text-white/40 font-mono mb-6 uppercase tracking-wider">{content.problem.oldWay.title}</div>

                        {/* Mock Search Bar */}
                        <div className="bg-white/5 rounded-full p-3 flex items-center gap-3 mb-8 border border-white/5">
                            <Search className="w-4 h-4 text-white/40" />
                            <div className="h-2 w-32 bg-white/10 rounded-full" />
                        </div>

                        {/* Mock SERP Results */}
                        <div className="space-y-6 opacity-50 group-hover:opacity-70 transition-opacity duration-500">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-6 h-6 rounded-full bg-white/5" />
                                        <div className="space-y-1">
                                            <div className="h-1.5 w-24 bg-white/20 rounded-full" />
                                            <div className="h-1.5 w-32 bg-white/10 rounded-full" />
                                        </div>
                                    </div>
                                    <div className="h-3 w-3/4 bg-[#8AB4F8]/40 rounded mb-1" /> {/* Blue Link Color */}
                                    <div className="h-2 w-full bg-white/10 rounded" />
                                    <div className="h-2 w-2/3 bg-white/10 rounded" />
                                </div>
                            ))}
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-surface-100 via-transparent to-transparent" />
                        <div className="absolute bottom-8 left-0 right-0 text-center text-white/40 font-medium">
                            {content.problem.oldWay.footer}
                        </div>
                    </motion.div>

                    {/* The New Way */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative p-8 rounded-3xl bg-surface-100 border border-accent-primary/30 shadow-[0_0_50px_-20px_var(--accent-primary)] flex flex-col h-full min-h-[400px]"
                    >
                        <div className="absolute -top-4 -right-4 bg-accent-primary text-white px-4 py-1 rounded-full text-sm font-bold transform rotate-12 shadow-lg shadow-accent-primary/20 z-10">
                            {content.problem.newWay.winnerBadge}
                        </div>
                        <div className="text-sm text-accent-primary font-mono mb-6 uppercase tracking-wider">{content.problem.newWay.title}</div>

                        {/* Chat Interface */}
                        <div className="flex-1 flex flex-col gap-6">
                            {/* User Message */}
                            <div className="flex items-end justify-end gap-3">
                                <div className="bg-surface-200 text-white/80 px-4 py-3 rounded-2xl rounded-br-sm text-sm max-w-[80%] border border-white/5">
                                    {content.problem.newWay.userMessage}
                                </div>
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/5">
                                    <User className="w-4 h-4 text-white/60" />
                                </div>
                            </div>

                            {/* AI Response */}
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center shrink-0 mt-1 border border-accent-primary/20">
                                    <Bot className="w-4 h-4 text-accent-primary" />
                                </div>
                                <div className="space-y-4 max-w-[90%]">
                                    <div className="text-white/90 text-sm leading-relaxed">
                                        {content.problem.newWay.aiResponse}
                                    </div>

                                    {/* The "Single Answer" Visual */}
                                    <div className="bg-white/5 rounded-xl p-4 border border-accent-primary/20 relative overflow-hidden">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-primary" />
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-6 h-6 rounded-lg bg-accent-primary/20 flex items-center justify-center text-accent-primary font-bold text-sm">1</div>
                                            <div className="font-bold text-white">{content.problem.newWay.singleAnswerTitle}</div>
                                        </div>
                                        <div className="text-xs text-white/50 pl-9">
                                            {content.problem.newWay.singleAnswerDesc}
                                        </div>
                                    </div>

                                    {/* Faded "Others" */}
                                    <div className="pl-1 opacity-30 grayscale flex items-center gap-3">
                                        <div className="w-1 h-1 rounded-full bg-white/50" />
                                        <div className="text-xs text-white/40">Other options mentioned only for comparison...</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
