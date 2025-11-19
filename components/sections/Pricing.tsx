"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "../ui/Button";
import content from "@/data/landing-content.json";

export function Pricing() {
    const [annual, setAnnual] = React.useState(true);

    return (
        <section className="py-32 px-4">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">{content.pricing.headline}</h2>
                    <div className="flex items-center justify-center gap-4">
                        <span className={`text-sm ${!annual ? "text-white" : "text-white/40"}`}>{content.pricing.toggleMonthly}</span>
                        <button
                            onClick={() => setAnnual(!annual)}
                            className="relative w-14 h-8 rounded-full bg-white/10 transition-colors hover:bg-white/20"
                        >
                            <motion.div
                                animate={{ x: annual ? 26 : 4 }}
                                className="absolute top-1 left-0 w-6 h-6 rounded-full bg-white shadow-lg"
                            />
                        </button>
                        <span className={`text-sm ${annual ? "text-white" : "text-white/40"}`}>{content.pricing.toggleAnnual} <span className="text-accent-primary text-xs ml-1 font-bold">{content.pricing.annualDiscount}</span></span>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {content.pricing.plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`relative p-8 rounded-3xl border flex flex-col ${plan.popular
                                ? "bg-white/5 border-accent-primary/50 shadow-[0_0_40px_-10px_rgba(99,102,241,0.3)]"
                                : "bg-black border-white/10"
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent-primary text-white text-xs font-bold uppercase tracking-wider">
                                    {content.pricing.popularBadge}
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                                <p className="text-white/40 text-sm h-10">{plan.desc}</p>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-end gap-1">
                                    <span className="text-4xl font-bold text-white">${plan.price}</span>
                                    {plan.price !== "Custom" && <span className="text-white/40 mb-1">/mo</span>}
                                </div>
                            </div>

                            <div className="flex-1 space-y-4 mb-8">
                                {plan.features.map((feature, f) => (
                                    <div key={f} className="flex items-center gap-3 text-sm text-white/80">
                                        <Check className="w-4 h-4 text-accent-primary" />
                                        {feature}
                                    </div>
                                ))}
                            </div>

                            <Button variant={plan.popular ? "primary" : "outline"} className="w-full">
                                {content.pricing.cta}
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
