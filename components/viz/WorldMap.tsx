"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ComposableMap, Geographies, Geography, Marker, Graticule, Line } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const REGIONS = [
    { id: "sf", name: "San Francisco", coordinates: [-122.4, 37.7] as [number, number], rank: "#1", sentiment: "+18%", insight: "Tech epicenter dominance." },
    { id: "ny", name: "New York", coordinates: [-74.0, 40.7] as [number, number], rank: "#2", sentiment: "+15%", insight: "Finance AI adoption high." },
    { id: "ldn", name: "London", coordinates: [-0.1, 51.5] as [number, number], rank: "#3", sentiment: "+12%", insight: "Strong regulatory trust." },
    { id: "ber", name: "Berlin", coordinates: [13.4, 52.5] as [number, number], rank: "#5", sentiment: "+9%", insight: "Growing startup ecosystem." },
    { id: "dxb", name: "Dubai", coordinates: [55.2, 25.2] as [number, number], rank: "#4", sentiment: "+14%", insight: "Government AI initiatives." },
    { id: "sg", name: "Singapore", coordinates: [103.8, 1.3] as [number, number], rank: "#2", sentiment: "+16%", insight: "Asian innovation hub." },
    { id: "tky", name: "Tokyo", coordinates: [139.6, 35.6] as [number, number], rank: "#3", sentiment: "+11%", insight: "Robotics integration." },
    { id: "syd", name: "Sydney", coordinates: [151.2, -33.8] as [number, number], rank: "#6", sentiment: "+8%", insight: "Pacific market leader." },
    { id: "sp", name: "São Paulo", coordinates: [-46.6, -23.5] as [number, number], rank: "#7", sentiment: "+10%", insight: "LatAm adoption surging." },
    { id: "cpt", name: "Cape Town", coordinates: [18.4, -33.9] as [number, number], rank: "#8", sentiment: "+7%", insight: "Emerging African tech." },
    { id: "tor", name: "Toronto", coordinates: [-79.3, 43.6] as [number, number], rank: "#4", sentiment: "+13%", insight: "Deep learning research hub." },
    { id: "par", name: "Paris", coordinates: [2.3, 48.8] as [number, number], rank: "#5", sentiment: "+11%", insight: "Open source AI capital." },
    { id: "tlv", name: "Tel Aviv", coordinates: [34.8, 32.1] as [number, number], rank: "#3", sentiment: "+14%", insight: "Cybersecurity AI focus." },
    { id: "blr", name: "Bangalore", coordinates: [77.6, 12.9] as [number, number], rank: "#6", sentiment: "+12%", insight: "IT services transformation." },
    { id: "sel", name: "Seoul", coordinates: [127.0, 37.6] as [number, number], rank: "#2", sentiment: "+15%", insight: "Hardware AI integration." },
];

// Central hub for connections (e.g., abstract center or HQ)
const HUB_COORDINATES: [number, number] = [-40, 35]; // Mid-Atlantic roughly

export function WorldMap() {
    const [hoveredRegion, setHoveredRegion] = React.useState<string | null>(null);
    const [lockedRegion, setLockedRegion] = React.useState<string | null>(null);

    // Prioritize hover over lock for exploration
    const activeRegionId = hoveredRegion || lockedRegion;
    const activeRegionData = REGIONS.find(r => r.id === activeRegionId);

    const handleMarkerClick = (id: string) => {
        if (lockedRegion === id) {
            setLockedRegion(null); // Unlock if clicking the same one
        } else {
            setLockedRegion(id); // Lock new one
        }
    };

    return (
        <div className="relative w-full aspect-[2/1] bg-[#050505] rounded-3xl border border-white/10 overflow-hidden shadow-2xl group/map">
            {/* Subtle radial gradient background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,30,40,0.4)_0%,rgba(5,5,5,1)_100%)] pointer-events-none" />

            <ComposableMap
                projection="geoEqualEarth"
                projectionConfig={{
                    scale: 180,
                }}
                style={{
                    width: "100%",
                    height: "100%",
                }}
            >
                <Graticule stroke="rgba(255,255,255,0.08)" />

                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill="#1e293b"
                                stroke="#334155"
                                strokeWidth={0.5}
                                style={{
                                    default: { outline: "none" },
                                    hover: { fill: "#334155", outline: "none" },
                                    pressed: { fill: "#334155", outline: "none" },
                                }}
                            />
                        ))
                    }
                </Geographies>

                {/* Connection Lines */}
                {REGIONS.map((region) => (
                    <Line
                        key={`line-${region.id}`}
                        from={HUB_COORDINATES}
                        to={region.coordinates}
                        stroke="#6366f1"
                        strokeWidth={1}
                        strokeOpacity={0.2}
                        strokeLinecap="round"
                    />
                ))}

                {/* Markers */}
                {REGIONS.map((region) => {
                    const isActive = activeRegionId === region.id;
                    const isLocked = lockedRegion === region.id;

                    return (
                        <Marker
                            key={region.id}
                            coordinates={region.coordinates}
                            className="outline-none"
                        >
                            <g
                                className="group/marker cursor-pointer outline-none"
                                onMouseEnter={() => setHoveredRegion(region.id)}
                                onMouseLeave={() => setHoveredRegion(null)}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleMarkerClick(region.id);
                                }}
                                style={{ pointerEvents: 'all' }}
                            >
                                {/* Outer Glow / Ping */}
                                <circle
                                    r={isActive ? 24 : 12}
                                    fill={isActive ? "#00E5FF" : "#6366f1"}
                                    opacity={isActive ? 0.2 : 0.1}
                                    className={isActive ? "animate-pulse" : ""}
                                />

                                {/* Middle Ring */}
                                <circle
                                    r={isActive ? 12 : 0}
                                    fill="none"
                                    stroke={isActive ? "#00E5FF" : "transparent"}
                                    strokeWidth={1}
                                    opacity={0.6}
                                />

                                {/* Core Dot */}
                                <circle
                                    r={6}
                                    fill={isActive ? "#00E5FF" : "#ffffff"}
                                    className="transition-colors duration-300"
                                />

                                {/* Locked Indicator */}
                                {isLocked && (
                                    <circle r={30} fill="none" stroke="#00E5FF" strokeWidth={1} strokeDasharray="4 4" className="animate-[spin_10s_linear_infinite]" />
                                )}
                            </g>
                        </Marker>
                    );
                })}
            </ComposableMap>

            {/* Floating Info Card for Active Region */}
            <AnimatePresence>
                {activeRegionData && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-8 left-8 z-20"
                    >
                        <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-2xl w-80 relative overflow-hidden">
                            {/* Card Glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-cyan/10 blur-[40px] rounded-full -translate-y-1/2 translate-x-1/2" />

                            <div className="flex items-center justify-between mb-6 relative z-10">
                                <div className="text-xl font-bold text-white flex items-center gap-3">
                                    <span className={`w-2 h-2 rounded-full ${lockedRegion === activeRegionData.id ? 'bg-accent-cyan shadow-[0_0_10px_#06b6d4]' : 'bg-white/50'}`} />
                                    {activeRegionData.name}
                                </div>
                                <div className="text-xs font-mono text-accent-cyan bg-accent-cyan/10 px-2 py-1 rounded border border-accent-cyan/20">
                                    {lockedRegion === activeRegionData.id ? 'LOCKED' : 'LIVE'}
                                </div>
                            </div>

                            <div className="space-y-5 relative z-10">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                                        <div className="text-xs text-white/50 mb-1 uppercase tracking-wider">Rank</div>
                                        <div className="text-2xl font-bold text-white">{activeRegionData.rank}</div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                                        <div className="text-xs text-white/50 mb-1 uppercase tracking-wider">Sentiment</div>
                                        <div className="text-2xl font-bold text-green-400">{activeRegionData.sentiment}</div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-white/10">
                                    <div className="text-xs text-accent-primary font-bold mb-2 uppercase tracking-wider flex items-center gap-2">
                                        <span className="w-1 h-1 bg-accent-primary rounded-full" />
                                        AI Insight
                                    </div>
                                    <div className="text-sm text-white/80 leading-relaxed font-light">
                                        "{activeRegionData.insight}"
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
