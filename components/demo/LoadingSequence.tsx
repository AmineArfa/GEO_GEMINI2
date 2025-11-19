"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Globe, Bot, FileSearch, Users, Sparkles, CheckCircle2 } from "lucide-react";

interface LoadingSequenceProps {
    url: string;
    onComplete: () => void;
}

const STEPS = [
    { id: 1, label: "Fetching brand footprint", icon: Globe, duration: 4000 },
    { id: 2, label: "Querying AI assistants", icon: Bot, duration: 6000 },
    { id: 3, label: "Extracting descriptors", icon: FileSearch, duration: 5000 },
    { id: 4, label: "Identifying competitors", icon: Users, duration: 5000 },
    { id: 5, label: "Preparing insights", icon: Sparkles, duration: 4000 },
];

export function LoadingSequence({ url, onComplete }: LoadingSequenceProps) {
    const [currentStep, setCurrentStep] = React.useState(0);

    React.useEffect(() => {
        let isMounted = true;

        const runSteps = async () => {
            for (let i = 0; i < STEPS.length; i++) {
                if (!isMounted) return;
                setCurrentStep(i);
                await new Promise(resolve => setTimeout(resolve, STEPS[i].duration));
            }
            if (isMounted) onComplete();
        };

        runSteps();

        return () => { isMounted = false; };
    }, [onComplete]);

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 overflow-hidden">
                {/* Favicon Reveal Animation */}
                <div className="flex justify-center mb-8">
                    <div className="relative w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl font-bold text-white/20"
                        >
                            {url.charAt(0).toUpperCase()}
                        </motion.div>
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-tr from-accent-primary/20 to-accent-cyan/20"
                            animate={{ opacity: [0.2, 0.5, 0.2] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>
                </div>

                {/* Steps */}
                <div className="space-y-6">
                    {STEPS.map((step, index) => {
                        const Icon = step.icon;
                        const isActive = index === currentStep;
                        const isCompleted = index < currentStep;

                        return (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0.3, x: -20 }}
                                animate={{
                                    opacity: isActive || isCompleted ? 1 : 0.3,
                                    x: 0,
                                    scale: isActive ? 1.02 : 1
                                }}
                                className="flex items-center gap-4"
                            >
                                <div className={`relative flex items-center justify-center w-10 h-10 rounded-full border transition-colors duration-500 ${isActive ? "border-accent-primary bg-accent-primary/10 text-accent-primary" :
                                        isCompleted ? "border-green-500 bg-green-500/10 text-green-500" :
                                            "border-white/10 bg-white/5 text-white/20"
                                    }`}>
                                    {isCompleted ? (
                                        <CheckCircle2 className="w-5 h-5" />
                                    ) : (
                                        <Icon className="w-5 h-5" />
                                    )}
                                    {isActive && (
                                        <div className="absolute inset-0 rounded-full border-2 border-accent-primary border-t-transparent animate-spin" />
                                    )}
                                </div>

                                <div className="flex-1">
                                    <div className={`text-sm font-medium transition-colors duration-300 ${isActive ? "text-white" : "text-white/40"
                                        }`}>
                                        {step.label}
                                    </div>
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-bar"
                                            className="h-1 bg-accent-primary/50 rounded-full mt-2 overflow-hidden"
                                        >
                                            <motion.div
                                                initial={{ width: "0%" }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: step.duration / 1000, ease: "linear" }}
                                                className="h-full bg-accent-primary"
                                            />
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
