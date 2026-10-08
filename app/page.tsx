"use client";

import { useEffect } from "react";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { Preloader } from "@/components/preloader/Preloader";
import { Navbar } from "@/components/navbar/Navbar";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { Experience } from "@/components/experience/Experience";
import { Projects } from "@/components/projects/Projects";
import { Skills } from "@/components/skills/Skills";
import { Contact } from "@/components/contact/Contact";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  // Always open at the top: stop the browser restoring an old scroll position.
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    const html = document.documentElement;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    if (window.location.hash) history.replaceState(null, "", window.location.pathname);
    requestAnimationFrame(() => { html.style.scrollBehavior = ""; });
  }, []);

  return (
    <>
      <Preloader onComplete={() => { window.scrollTo(0, 0); }} />
      <CustomCursor />
      <Navbar />
      <main className="relative min-h-screen">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
