"use client";
import { Briefcase, GraduationCap } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { experiences, education } from "@/data/portfolioData";

export function Experience() {
  return (
    <Section id="journey" label="Experience & Education" title="Where I've worked and studied.">
      {experiences.map(e => (
        <div key={e.company} className="warm-card p-6 md:p-7 mb-5">
          <div className="flex items-start gap-3.5 mb-5">
            <div className="p-2.5 rounded-xl" style={{ background: "rgba(217,119,87,0.10)" }}>
              <Briefcase size={17} style={{ color: "#D97757" }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-serif text-xl font-medium" style={{ color: "var(--text-primary)" }}>{e.role}</h3>
                {e.current && (
                  <span className="px-2 py-0.5 rounded-full font-mono text-[0.6rem] uppercase"
                    style={{ background: "rgba(120,140,93,0.14)", color: "#788C5D" }}>Current</span>
                )}
              </div>
              <div className="text-sm mt-0.5" style={{ color: "#D97757" }}>{e.company}, {e.location}</div>
              <div className="mono-label mt-1">{e.period}</div>
            </div>
          </div>
          <ul className="space-y-3">
            {e.bullets.map((b, i) => (
              <li key={i} className="flex gap-3 text-[0.95rem] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                <span className="mt-[0.65em] w-1 h-1 rounded-full shrink-0" style={{ background: "#D97757" }} />
                <span>
                  {b.lead && <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>{b.lead} </strong>}
                  {b.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="grid sm:grid-cols-2 gap-5">
        {education.map(e => (
          <div key={e.degree} className="warm-card p-6">
            <div className="p-2.5 rounded-xl w-fit mb-4" style={{ background: "rgba(106,155,204,0.12)" }}>
              <GraduationCap size={17} style={{ color: "#6A9BCC" }} />
            </div>
            <h3 className="font-serif text-lg font-medium leading-snug" style={{ color: "var(--text-primary)" }}>{e.degree}</h3>
            <div className="mono-label mt-1.5 mb-3">{e.period}</div>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{e.institution}</p>
            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{e.university}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
