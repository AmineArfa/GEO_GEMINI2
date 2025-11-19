"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function SocialProof() {
    return (
        <section className="py-20 px-4 border-y border-white/5 bg-white/[0.02]">
            <div className="container mx-auto max-w-6xl text-center">
                <p className="text-sm text-white/40 uppercase tracking-widest mb-8">Trusted by forward-thinking companies</p>

                <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 mb-16">
                    {/* Placeholder Logos */}
                    {["Google Reviews", "G2", "Capterra", "Trustpilot"].map((name, i) => (
                        <div key={i} className="text-xl font-bold text-white">{name}</div>
                    ))}
                </div>

                <div className="grid md:grid-cols-3 gap-8 text-left">
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-6 rounded-2xl bg-black border border-white/10"
                        >
                            <div className="flex gap-1 text-yellow-500 mb-4">
                                {[1, 2, 3, 4, 5].map((star) => <Star key={star} className="w-4 h-4 fill-current" />)}
                            </div>
                            <p className="text-white/80 mb-6">
                                "Since using Vyzz, our AI mentions have tripled. We are finally showing up where our customers are searching."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/10" />
                                <div>
                                    <div className="text-sm font-bold text-white">Sarah Jenkins</div>
                                    <div className="text-xs text-white/40">CMO, TechFlow</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
