"use client";
import { motion } from "framer-motion";

export function Section({
  id, label, title, intro, alt = false, wide = false, children,
}: { id: string; label: string; title: string; intro?: string; alt?: boolean; wide?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} className="py-24 px-6" style={{ background: alt ? "var(--bg-secondary)" : "var(--bg-primary)" }}>
      <motion.div
        className={`${wide ? "max-w-5xl" : "max-w-3xl"} mx-auto`}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="section-label">{label}</span>
        <h2 className="font-serif font-medium mt-3 mb-3"
          style={{ fontSize: "clamp(1.9rem,4vw,2.6rem)", color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
          {title}
        </h2>
        {intro && <p className="text-base mb-10 max-w-xl" style={{ color: "var(--text-muted)" }}>{intro}</p>}
        {!intro && <div className="mb-10" />}
        {children}
      </motion.div>
    </section>
  );
}
