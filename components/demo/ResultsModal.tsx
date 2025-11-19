"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { X, Share2, Download } from "lucide-react";

interface ResultsModalProps {
    data: {
        summary: string;
        adjectives: string[];
        competitors: string[];
    };
    onClose: () => void;
}

export function ResultsModal({ data, onClose }: ResultsModalProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-white/10 bg-[#0A0A0A]/80 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-green-500" />
                        <span className="text-sm font-medium text-white/60">Analysis Complete</span>
                    </div>
                    <button onClick={onClose} className="p-2 text-white/40 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Left Column: Score & Summary */}
                    <div>
                        <div className="mb-8">
                            <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">AI Visibility Score</h3>
                            <div className="flex items-end gap-4">
                                <div className="text-7xl font-bold text-white">72<span className="text-3xl text-white/40">/100</span></div>
                                <div className="pb-2 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-sm font-medium border border-green-500/20">
                                    Good Visibility
                                </div>
                            </div>
                            <div className="mt-4 h-2 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "72%" }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="h-full bg-gradient-to-r from-accent-primary to-accent-cyan"
                                />
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-3">AI Summary</h3>
                            <p className="text-lg text-white/80 leading-relaxed">
                                {data.summary}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-3">Brand Adjectives</h3>
                            <div className="flex flex-wrap gap-2">
                                {data.adjectives.map((adj, i) => (
                                    <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-white/70">
                                        {adj}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Competitors & Actions */}
                    <div className="space-y-8">
                        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                            <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">Top Competitors</h3>
                            <div className="space-y-3">
                                {data.competitors.map((comp, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                                        <span className="text-white/80">{comp}</span>
                                        <span className="text-xs text-white/40">Rank #{i + 1}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 rounded-xl bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 border border-accent-primary/20">
                            <h3 className="text-lg font-semibold text-white mb-2">Unlock Full Report</h3>
                            <p className="text-sm text-white/60 mb-4">Get detailed insights on how to improve your ranking and beat your competitors.</p>
                            <Button className="w-full">Get Full Report</Button>
                        </div>

                        <div className="flex gap-4">
                            <Button variant="outline" className="flex-1">
                                <Share2 className="w-4 h-4 mr-2" /> Share
                            </Button>
                            <Button variant="outline" className="flex-1">
                                <Download className="w-4 h-4 mr-2" /> Export
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
