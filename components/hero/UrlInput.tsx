"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";

interface UrlInputProps {
    onSubmit: (url: string) => void;
}

export function UrlInput({ onSubmit }: UrlInputProps) {
    const [url, setUrl] = React.useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (url) onSubmit(url);
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            onSubmit={handleSubmit}
            className="relative w-full max-w-2xl mx-auto"
        >
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-cyan rounded-xl opacity-30 group-hover:opacity-70 blur transition duration-500" />
                <div className="relative flex items-center bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl p-2 transition-all group-focus-within:border-accent-primary/50 group-focus-within:bg-black/90">
                    <div className="pl-4 text-white/40">
                        <Search className="w-5 h-5" />
                    </div>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter your website URL..."
                        className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/30 px-4 h-12 text-lg font-medium"
                    />
                    <Button type="submit" size="md" className="rounded-lg">
                        Analyze <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                </div>
            </div>
            <p className="mt-3 text-center text-sm text-white/40">
                Try <span className="text-white/60">stripe.com</span>, <span className="text-white/60">linear.app</span>, or your own site.
            </p>
        </motion.form>
    );
}
