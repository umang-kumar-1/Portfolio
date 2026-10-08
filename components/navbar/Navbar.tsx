"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { personal } from "@/data/portfolioData";
import { ClaudeLogo } from "@/components/icons/ClaudeLogo";

const NAV_ITEMS = [
  { num: "01", label: "About", href: "#about" },
  { num: "02", label: "Experience", href: "#journey" },
  { num: "03", label: "Projects", href: "#projects" },
  { num: "04", label: "Skills", href: "#stack" },
  { num: "05", label: "Contact", href: "#contact" },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_ITEMS.map(n => n.href.slice(1));
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.3 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <div className="fixed inset-x-0 top-4 z-[900] flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22,1,0.36,1] }}
        className="w-full max-w-3xl pointer-events-auto"
      >
        <div
          className="flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-300"
          style={{
            background: scrolled
              ? theme === "dark"
                ? "rgba(31,30,29,0.88)"
                : "rgba(250,249,245,0.88)"
              : theme === "dark"
                ? "rgba(31,30,29,0.5)"
                : "rgba(250,249,245,0.5)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid var(--border-warm)",
            boxShadow: scrolled ? "0 4px 24px rgba(20,20,19,0.08)" : "none",
          }}
        >
          {/* Logo / Name */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 font-serif text-lg font-medium tracking-tight transition-colors"
            style={{ color: "var(--text-primary)" }}
          >
            <ClaudeLogo size={20} />{personal.nickname}
          </button>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(item => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <li key={item.href}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    className="relative flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm transition-all duration-200"
                    style={{
                      color: isActive ? "#D97757" : "var(--text-secondary)",
                      background: isActive ? "rgba(217,119,87,0.08)" : "transparent",
                    }}
                  >
                    <span className="font-mono text-[0.6rem] opacity-60">{item.num}</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl transition-all duration-200 hover:bg-[rgba(217,119,87,0.10)]"
              style={{ color: "var(--text-secondary)" }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              className="md:hidden p-2 rounded-xl transition-all"
              style={{ color: "var(--text-secondary)" }}
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[899] flex flex-col items-center justify-center"
            style={{ background: "var(--bg-primary)" }}
          >
            <button
              className="absolute top-6 right-6 p-3"
              onClick={() => setMobileOpen(false)}
              style={{ color: "var(--text-secondary)" }}
            >
              <X size={24} />
            </button>
            <nav>
              <ul className="flex flex-col items-center gap-6">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 30, opacity: 0 }}
                    transition={{ delay: i * 0.07, ease: [0.22,1,0.36,1] }}
                  >
                    <button
                      onClick={() => scrollTo(item.href)}
                      className="font-serif text-4xl font-medium tracking-tight transition-colors hover:text-[#D97757]"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
