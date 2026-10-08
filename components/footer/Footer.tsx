"use client";
import { motion } from "framer-motion";
import { personal } from "@/data/portfolioData";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-10 px-6" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-warm)" }}>
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <div className="font-serif font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>
            {personal.name}<span style={{ color: "#D97757" }}>.</span>
          </div>
          <div className="text-xs" style={{ color: "var(--text-muted)" }}>{personal.title}</div>
        </div>
        <div className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
          &copy; {year} {personal.name}
        </div>
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all hover:scale-[1.04]"
          style={{ background: "var(--bg-card)", color: "var(--text-secondary)", border: "1px solid var(--border-warm)" }}
          whileHover={{ y: -2 }}
          aria-label="Back to top"
        >
          <ArrowUp size={14} />
          Back to top
        </motion.button>
      </div>
    </footer>
  );
}
