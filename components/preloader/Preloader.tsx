"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personal } from "@/data/portfolioData";
import { ClaudeLogo } from "@/components/icons/ClaudeLogo";

const STATUS_LINES = [
  "Thinking...",
  "Reading the resume...",
  "Gathering projects...",
  "Composing...",
  "Ready.",
];

interface PreloaderProps { onComplete: () => void; }

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const duration = 2800;
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(Math.round(pct));
      setStatusIdx(Math.min(Math.floor(pct / 20), STATUS_LINES.length - 1));
      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => { setDone(true); setTimeout(onComplete, 700); }, 300);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [onComplete]);

  const nameParts = personal.name.split(" ");

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
          style={{ background: "var(--bg-primary)" }}
          exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.7, ease: [0.22,1,0.36,1] } }}
        >
          {/* Grain overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-40"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")" }}
          />

          <div className="mb-10"><ClaudeLogo size={56} spin /></div>

          {/* Name reveal */}
          <div className="overflow-hidden flex gap-3 mb-6">
            {nameParts.map((word, wi) => (
              <motion.span
                key={wi}
                className="block font-serif text-4xl md:text-5xl font-medium tracking-tight"
                style={{ color: "var(--text-primary)" }}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: wi * 0.18, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Progress bar */}
          <div className="w-48 h-px mb-4 rounded-full overflow-hidden" style={{ background: "var(--border-warm)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #D97757, #E89B7A)" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.05 }}
            />
          </div>

          {/* Status + percentage */}
          <div className="flex items-center gap-4">
            <span className="mono-label" style={{ color: "var(--text-muted)" }}>
              {STATUS_LINES[statusIdx]}
            </span>
            <span className="mono-label" style={{ color: "#D97757" }}>{progress}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
