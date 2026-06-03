"use client";

import { useEffect, useRef, ReactNode } from "react";

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lenis: { destroy: () => void; raf: (time: number) => void } | null = null;

    const initLenis = async () => {
      try {
        const LenisModule = await import("lenis");
        const Lenis = LenisModule.default;

        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
        }) as { destroy: () => void; raf: (time: number) => void };

        const raf = (time: number) => {
          lenis?.raf(time);
          requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);
      } catch {
        // Lenis failed silently — native scroll used
      }
    };

    initLenis();
    return () => {
      lenis?.destroy();
    };
  }, []);

  return <div ref={scrollRef}>{children}</div>;
}
