"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import { ArrowRight } from "lucide-react";

import content from "@/data/landing-content.json";

export function UseCases() {
    const [activeTab, setActiveTab] = React.useState(content.useCases.industries[0].id);

    return (
        <section className="py-32 px-4">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">{content.useCases.headline}</h2>
                    <div className="flex flex-wrap justify-center gap-2">
                        {content.useCases.industries.map((industry) => (
                            <button
                                key={industry.id}
                                onClick={() => setActiveTab(industry.id)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === industry.id
                                    ? "bg-white text-black"
                                    : "bg-white/5 text-white/60 hover:bg-white/10"
                                    }`}
                            >
                                {industry.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="relative min-h-[400px] bg-surface-100 border border-white/10 rounded-3xl p-8 md:p-16 overflow-hidden">
                    <AnimatePresence mode="wait">
                        {content.useCases.industries.map((industry) => (
                            industry.id === activeTab && (
                                <motion.div
                                    key={industry.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="flex flex-col md:flex-row items-center gap-12"
                                >
                                    <div className="flex-1 space-y-6">
                                        <h3 className="text-3xl md:text-4xl font-bold text-white">{industry.title}</h3>
                                        <p className="text-xl text-white/60 leading-relaxed">
                                            {industry.content}
                                        </p>
                                        <Button variant="ghost" className="pl-0 hover:pl-4 transition-all">
                                            Discover Success Stories <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                    <div className="flex-1 w-full aspect-video bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 rounded-2xl border border-white/10 flex items-center justify-center">
                                        {/* Placeholder for industry image */}
                                        <div className="text-white/20 font-mono text-lg">
                                            {industry.label} Visualization
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
