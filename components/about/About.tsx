"use client";
import { Mail, Phone, MapPin } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { personal, stats } from "@/data/portfolioData";

export function About() {
  return (
    <Section id="about" label="About" title="A software developer who owns the whole flow." alt>
      <p className="font-serif text-[1.1rem] leading-[1.75] mb-10" style={{ color: "var(--text-secondary)" }}>
        {personal.summary}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
        {stats.map(s => (
          <div key={s.label} className="warm-card p-5">
            <div className="font-serif text-3xl font-medium" style={{ color: "#D97757" }}>{s.value}</div>
            <div className="text-xs mt-1.5 leading-snug" style={{ color: "var(--text-muted)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm" style={{ color: "var(--text-secondary)" }}>
        <a href={`mailto:${personal.email}`} className="flex items-center gap-2 link-underline"><Mail size={14} style={{ color: "#D97757" }} />{personal.email}</a>
        <a href={`tel:${personal.phone}`} className="flex items-center gap-2 link-underline"><Phone size={14} style={{ color: "#D97757" }} />{personal.phone}</a>
        <span className="flex items-center gap-2"><MapPin size={14} style={{ color: "#D97757" }} />{personal.location}</span>
      </div>
    </Section>
  );
}
