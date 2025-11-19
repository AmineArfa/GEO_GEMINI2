"use client";

import * as React from "react";
import { AnimatePresence } from "framer-motion";
import { LoadingSequence } from "./LoadingSequence";
import { ResultsModal } from "./ResultsModal";
import { Hero } from "../hero/Hero";
import { Trophy, Eye, Target, TrendingUp } from "lucide-react";

// Mock Data
const MOCK_RESULTS = {
    summary: "Your brand is recognized as a reliable enterprise solution, often recommended for scalability and security. However, AI models frequently compare you against legacy providers rather than modern innovators.",
    adjectives: ["Reliable", "Secure", "Enterprise-grade", "Complex", "Established"],
    competitors: ["competitor-a.com", "startup-b.io", "legacy-c.net"]
};

export function DemoContainer() {
    const [status, setStatus] = React.useState<"idle" | "loading" | "results">("idle");
    const [url, setUrl] = React.useState("");

    const handleStart = (inputUrl: string) => {
        setUrl(inputUrl);
        setStatus("loading");
    };

    const handleComplete = () => {
        setStatus("results");
    };

    const handleClose = () => {
        setStatus("idle");
        setUrl("");
    };

    return (
        <>
            {status === "idle" && (
                <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-32 overflow-hidden">
                    {/* Re-using Hero logic here but passing the handler */}
                    {/* Actually, better to just render Hero and pass props if Hero was designed that way, 
               but Hero has its own internal state/structure. 
               Let's refactor Hero to accept onSubmit or just use Hero's internal UrlInput to trigger this parent.
               
               Wait, Hero is a section. DemoContainer should probably wrap the Hero or be triggered by it.
               Let's make DemoContainer the main page wrapper or have it overlay.
               
               Actually, the prompt says:
               Flow: Hero input field -> Loading Sequence -> Results.
               
               So when user types in Hero, the Hero content should probably fade out or be replaced by the Loading Sequence.
           */}
                    <HeroWrapper onAnalyze={handleStart} />
                </section>
            )}

            {status === "loading" && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl">
                    <LoadingSequence url={url} onComplete={handleComplete} />
                </div>
            )}

            <AnimatePresence>
                {status === "results" && (
                    <ResultsModal data={MOCK_RESULTS} onClose={handleClose} />
                )}
            </AnimatePresence>
        </>
    );
}

import { motion } from "framer-motion";
import { UrlInput } from "../hero/UrlInput";

function HeroWrapper({ onAnalyze }: { onAnalyze: (url: string) => void }) {
    return (
        <div className="relative w-full flex flex-col items-center">
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
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
                    <span className="text-sm font-medium text-white/80">AI Visibility is the new SEO</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1]"
                >
                    Be the business <br />
                    <span className="text-gradient">ChatGPT recommends.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="text-xl md:text-2xl text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed"
                >
                    Track your ranking. Get more deals. Generate more profit.
                    <br />
                    See how AI assistants perceive your brand in seconds.
                </motion.p>

                <UrlInput onSubmit={onAnalyze} />

                {/* Trust Stats */}
                <div className="mt-24 w-full max-w-5xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
                        {[
                            { label: "Preferred Answer", value: "#1", icon: Trophy, desc: "Become the top AI recommendation" },
                            { label: "Brand Visibility", value: "+80%", icon: Eye, desc: "Increase mentions across models" },
                            { label: "User Intent", value: "3.5x", icon: Target, desc: "Higher quality traffic than SEO" },
                            { label: "Revenue Impact", value: "+28%", icon: TrendingUp, desc: "Growth from AI-driven leads" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-black/40 backdrop-blur-md p-6 md:p-8 flex flex-col items-center justify-center group hover:bg-white/5 transition-colors cursor-default">
                                <stat.icon className="w-6 h-6 text-accent-primary mb-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">{stat.value}</div>
                                <div className="text-sm text-white/60 font-medium text-center mb-1">{stat.label}</div>
                                <div className="text-xs text-white/30 text-center">{stat.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
