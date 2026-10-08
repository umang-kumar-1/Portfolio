"use client";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { skillGroups } from "@/data/portfolioData";

export function Skills() {
  return (
    <Section id="stack" label="Skills" title="Tools I work with." wide>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, i) => (
          <motion.div
            key={g.category}
            className="warm-card p-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: (i % 3) * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full" style={{ background: g.color }} />
              <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{g.category}</h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map(item => (
                <span key={item} className="px-2.5 py-1 rounded-lg text-[0.8rem] leading-snug"
                  style={{ background: "var(--bg-surface)", color: "var(--text-secondary)" }}>{item}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
