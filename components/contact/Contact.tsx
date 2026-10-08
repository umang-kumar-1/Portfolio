"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/Icons";
import { personal, social } from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // GSAP: staggered scroll-reveal for the detail cards + magnetic "Email me" button.
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-item",
        { y: 48, opacity: 0, scale: 0.94 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.15, ease: "power3.out", clearProps: "transform",
          scrollTrigger: { trigger: ".contact-cards", start: "top 90%", once: true },
        });
      const btn = root.querySelector<HTMLElement>(".magnetic");
      if (!btn) return;
      const move = (e: MouseEvent) => {
        const r = btn.getBoundingClientRect();
        gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.4, duration: 0.4, ease: "power3.out" });
      };
      const leave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
      btn.addEventListener("mousemove", move);
      btn.addEventListener("mouseleave", leave);
      return () => { btn.removeEventListener("mousemove", move); btn.removeEventListener("mouseleave", leave); };
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={ref} className="py-28 px-6 relative overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      {/* Warm glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center bottom, rgba(217,119,87,0.07) 0%, transparent 60%)" }} />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }} className="flex items-center justify-center gap-3 mb-12">
          <div className="h-px w-16" style={{ background: "var(--border-warm)" }} />
          <span className="section-label">Contact</span>
          <div className="h-px w-16" style={{ background: "var(--border-warm)" }} />
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden mb-4">
          <motion.h2
            className="font-serif font-semibold leading-tight"
            style={{ fontSize: "clamp(2rem,6vw,4rem)", color: "var(--text-primary)", letterSpacing: "-0.02em" }}
            initial={{ y: "100%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.22,1,0.36,1] }}
          >
            Let&apos;s{" "}
            <span className="italic" style={{ color: "#D97757" }}>work together.</span>
          </motion.h2>
        </div>

        <motion.p
          className="text-base leading-relaxed max-w-lg mx-auto mb-12"
          style={{ color: "var(--text-secondary)" }}
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.22,1,0.36,1] }}
        >
          I&apos;m open to software developer roles where I can work with React, SharePoint and Microsoft Graph. Email me and I&apos;ll get back to you.
        </motion.p>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.22,1,0.36,1] }}
          className="mb-12"
        >
          <a
            href={`mailto:${personal.email}`}
            className="magnetic inline-flex items-center gap-3 px-9 py-4 rounded-2xl font-medium text-base hover:shadow-xl"
            style={{
              background: "#D97757",
              color: "#fff",
              boxShadow: "0 8px 32px rgba(217,119,87,0.32)",
            }}
            data-cursor="SEND"
          >
            <Mail size={18} />
            Email me
          </a>
        </motion.div>

        {/* Contact details */}
        <div className="contact-cards grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
          {[
            { href: `mailto:${personal.email}`, label: "Email", value: personal.email, Icon: Mail },
            { href: `tel:${personal.phone.replace(/\s/g, "")}`, label: "Phone", value: personal.phone, Icon: Phone },
          ].map(({ href, label, value, Icon }) => (
            <div key={label} className="contact-item">
            <a href={href}
              className="warm-card p-5 flex items-center gap-4 group hover:-translate-y-1 hover:border-[rgba(217,119,87,0.35)]"
              style={{ textDecoration: "none" }}>
              <div className="p-2.5 rounded-xl shrink-0 transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110"
                style={{ background: "rgba(217,119,87,0.10)" }}>
                <Icon size={18} style={{ color: "#D97757" }} />
              </div>
              <div className="text-left min-w-0">
                <div className="mono-label text-[0.6rem]">{label}</div>
                <div className="text-sm font-medium break-all" style={{ color: "var(--text-primary)" }}>{value}</div>
              </div>
            </a>
            </div>
          ))}
        </div>

        {/* Social links */}
        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}
        >
          <a href={social.github} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all hover:scale-[1.04]"
            style={{ background: "var(--bg-surface)", color: "var(--text-secondary)", border: "1px solid var(--border-warm)" }}
            aria-label="GitHub">
            <GithubIcon className="w-4 h-4" /> GitHub
          </a>
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all hover:scale-[1.04]"
            style={{ background: "var(--bg-surface)", color: "var(--text-secondary)", border: "1px solid var(--border-warm)" }}
            aria-label="LinkedIn">
            <LinkedinIcon className="w-4 h-4" /> LinkedIn
          </a>
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
            style={{ background: "var(--bg-surface)", color: "var(--text-muted)", border: "1px solid var(--border-warm)" }}>
            <MapPin size={14} /> {personal.location}
          </div>
        </motion.div>

        <motion.div className="flex flex-wrap items-center justify-center gap-3 mt-6"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.7 }}>
          <a href={social.resumePdf} download className="px-4 py-2 rounded-xl text-sm link-underline" style={{ color: "var(--text-secondary)" }}>
            Resume — React / Full-stack (PDF)
          </a>
          <a href={social.resumeSharePointPdf} download className="px-4 py-2 rounded-xl text-sm link-underline" style={{ color: "var(--text-secondary)" }}>
            Resume — SharePoint / Power Platform (PDF)
          </a>
        </motion.div>
      </div>
    </section>
  );
}
