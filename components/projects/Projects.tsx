"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { projects, type Project } from "@/data/portfolioData";

const SHOWN = 3;

function FeaturedCard({ p }: { p: Project }) {
  const [open, setOpen] = useState(false);
  const bullets = open ? p.bullets : p.bullets.slice(0, SHOWN);
  return (
    <article className="warm-card p-6 md:p-8 mb-5">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="mono-label" style={{ color: p.accentColor }}>{p.category}</span>
        {p.role && <span className="mono-label">· {p.role}</span>}
      </div>
      <h3 className="font-serif text-2xl font-medium mb-3" style={{ color: "var(--text-primary)" }}>{p.title}</h3>
      <p className="text-[0.95rem] leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>{p.summary}</p>
      <ul className="space-y-3 mb-4">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            <span className="mt-[0.6em] w-1 h-1 rounded-full shrink-0" style={{ background: p.accentColor }} />
            {b}
          </li>
        ))}
      </ul>
      {p.bullets.length > SHOWN && (
        <button onClick={() => setOpen(o => !o)}
          className="flex items-center gap-1.5 text-sm mb-5 font-medium" style={{ color: p.accentColor }}>
          {open ? "Show less" : `Show ${p.bullets.length - SHOWN} more`}
          <ChevronDown size={15} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      )}
      <div className="flex flex-wrap gap-1.5">{p.tags.map(t => <span key={t} className="terra-tag">{t}</span>)}</div>
    </article>
  );
}

export function Projects() {
  const main = projects.filter(p => p.featured);
  const rest = projects.filter(p => !p.featured);

  return (
    <Section id="projects" label="Projects" title="Things I've built." alt>
      {main.map(p => <FeaturedCard key={p.id} p={p} />)}

      <div className="grid md:grid-cols-2 gap-5">
        {rest.map(p => (
          <article key={p.id} className="warm-card p-6">
            <span className="mono-label" style={{ color: p.accentColor }}>{p.category}</span>
            <h3 className="font-serif text-xl font-medium mt-2 mb-3" style={{ color: "var(--text-primary)" }}>{p.title}</h3>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>{p.summary}</p>
            <div className="flex flex-wrap gap-1.5">{p.tags.map(t => <span key={t} className="terra-tag">{t}</span>)}</div>
          </article>
        ))}
      </div>
    </Section>
  );
}
