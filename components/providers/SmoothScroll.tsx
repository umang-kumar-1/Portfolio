"use client";
import { useEffect } from "react";
import Lenis from "lenis";

// Lenis: inertia-based smooth scrolling for the whole page.
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1 });
    return () => lenis.destroy();
  }, []);
  return <>{children}</>;
}
