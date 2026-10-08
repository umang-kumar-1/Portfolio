"use client";
import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine) return;
    document.body.classList.add("cursor-active");
    setVisible(true);

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX; mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      }
      // detect link / button hover
      const target = e.target as HTMLElement;
      const closest = target.closest("a, button, [data-cursor], [role='button']");
      if (closest) {
        const lbl = closest.getAttribute("data-cursor") || "";
        setLabel(lbl);
      } else {
        setLabel("");
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove("cursor-active");
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full z-[9999] pointer-events-none"
        style={{ background: "#D97757", transition: "opacity 0.2s" }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none flex items-center justify-center"
        style={{
          width: label ? 72 : 40,
          height: label ? 72 : 40,
          borderRadius: "50%",
          border: `1.5px solid rgba(217,119,87,${label ? 0.7 : 0.4})`,
          background: label ? "rgba(217,119,87,0.1)" : "transparent",
          transition: "width 0.25s cubic-bezier(0.22,1,0.36,1), height 0.25s cubic-bezier(0.22,1,0.36,1), border-color 0.2s, background 0.2s",
        }}
      >
        {label && (
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#D97757" }}>
            {label}
          </span>
        )}
      </div>
    </>
  );
}
