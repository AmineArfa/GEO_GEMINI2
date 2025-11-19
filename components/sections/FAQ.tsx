"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import content from "@/data/landing-content.json";

export function FAQ() {
    const [openIndex, setOpenIndex] = React.useState<number | null>(0);

    return (
        <section className="py-32 px-4 bg-black">
            <div className="container mx-auto max-w-3xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">{content.faq.headline}</h2>

                <div className="space-y-4">
                    {content.faq.questions.map((faq, i) => (
                        <div key={i} className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                            >
                                <span className="font-medium text-white text-lg">{faq.q}</span>
                                <Plus className={`w-5 h-5 text-white/40 transition-transform duration-300 ${openIndex === i ? "rotate-45" : ""}`} />
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 text-white/60 leading-relaxed">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
