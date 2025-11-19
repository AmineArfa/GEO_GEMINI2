"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DemoContainer } from "@/components/demo/DemoContainer";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { Benefits } from "@/components/sections/Benefits";
import { UseCases } from "@/components/sections/UseCases";
import { Roadmap } from "@/components/sections/Roadmap";
import { SocialProof } from "@/components/sections/SocialProof";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";
import { WorldMap } from "@/components/viz/WorldMap";
import { Button } from "@/components/ui/Button";
import { AnimatedGrid } from "@/components/ui/AnimatedGrid";
import { useAnalytics } from "@/hooks/useAnalytics";
import content from "@/data/landing-content.json";

export default function Home() {
  const { track } = useAnalytics();
  const [showExitIntent, setShowExitIntent] = React.useState(false);
  const [hasExited, setHasExited] = React.useState(false);

  React.useEffect(() => {
    track("hero_viewed");

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasExited) {
        setShowExitIntent(true);
        track("exit_intent_triggered");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasExited, track]);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-accent-primary selection:text-white">
      <AnimatedGrid />
      {/* Navigation (Simple Overlay) */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="text-xl font-bold text-white tracking-tight">{content.nav.brand}</div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
          {content.nav.links.map((link, i) => (
            <a key={i} href={link.href} className="hover:text-white transition-colors">{link.label}</a>
          ))}
          <Button size="sm" variant="primary">{content.nav.cta}</Button>
        </div>
      </nav>

      <DemoContainer />

      <Problem />

      <Solution />

      <Benefits />

      {/* Map Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">{content.map.headline}</h2>
            <p className="text-white/60">{content.map.subheadline}</p>
          </div>
          <WorldMap />
        </div>
      </section>

      <UseCases />

      <Roadmap />

      <SocialProof />

      <Pricing />

      <FAQ />

      <Footer />

      {/* Exit Intent Modal */}
      <AnimatePresence>
        {showExitIntent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 shadow-2xl"
            >
              <button
                onClick={() => {
                  setShowExitIntent(false);
                  setHasExited(true);
                }}
                className="absolute top-4 right-4 text-white/40 hover:text-white"
              >
                ✕
              </button>
              <div className="text-center">
                <div className="text-4xl mb-4">{content.exitIntent.emoji}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{content.exitIntent.headline}</h3>
                <p className="text-white/60 mb-8">
                  {content.exitIntent.subheadline}
                </p>
                <Button
                  className="w-full"
                  onClick={() => {
                    setShowExitIntent(false);
                    setHasExited(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  {content.exitIntent.cta}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
