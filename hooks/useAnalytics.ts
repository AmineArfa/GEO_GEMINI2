"use client";

import * as React from "react";

type EventName =
    | "hero_viewed"
    | "hero_submit"
    | "loading_started"
    | "result_shown"
    | "cta_clicked"
    | "email_captured"
    | "exit_intent_triggered"
    | "credentials_submitted";

export function useAnalytics() {
    const track = React.useCallback((event: EventName, properties?: Record<string, any>) => {
        // In a real app, this would send data to Segment/Mixpanel/PostHog
        console.log(`[Analytics] ${event}`, properties);

        if (typeof window !== 'undefined' && (window as any).gtag) {
            // Example integration
            // (window as any).gtag('event', event, properties);
        }
    }, []);

    return { track };
}
