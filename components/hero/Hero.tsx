"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp, ChevronDown, Copy, Check, ThumbsUp, ThumbsDown, RotateCcw, Plus,
  FolderGit2, Cpu, Briefcase, GraduationCap, Mail, FileDown, ArrowUpRight, Sparkles,
} from "lucide-react";
import { ClaudeLogo } from "@/components/icons/ClaudeLogo";
import { GithubIcon, LinkedinIcon } from "@/components/icons/Icons";
import { personal, social } from "@/data/portfolioData";
import { answer, type Answer } from "@/data/chatEngine";

const THINKING_WORDS = ["Thinking", "Pondering", "Reading the resume", "Connecting dots", "Composing"];

const CHIPS = [
  { label: "Projects", prompt: "What have you built?", icon: FolderGit2 },
  { label: "Skills", prompt: "What's your tech stack?", icon: Cpu },
  { label: "Experience", prompt: "Tell me about your experience", icon: Briefcase },
  { label: "Education", prompt: "What's your education?", icon: GraduationCap },
  { label: "Contact", prompt: "How can I contact you?", icon: Mail },
];

interface Msg { id: number; role: "user" | "assistant"; text: string; ans?: Answer; done?: boolean; }

function greeting() {
  const h = new Date().getHours();
  return h < 5 ? "Burning the midnight oil" : h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}

function inline(s: string) {
  return s.split(/(\*\*[^*]+\*\*)/g).map((p, i) =>
    p.startsWith("**") && p.endsWith("**")
      ? <strong key={i} style={{ fontWeight: 600, color: "var(--text-primary)" }}>{p.slice(2, -2)}</strong>
      : <span key={i}>{p}</span>
  );
}

function Markdown({ text }: { text: string }) {
  const blocks = text.split("\n\n");
  return (
    <div className="space-y-3">
      {blocks.map((b, i) => {
        const lines = b.split("\n");
        if (lines.every(l => l.startsWith("- "))) {
          return (
            <ul key={i} className="space-y-1.5 pl-1">
              {lines.map((l, j) => (
                <li key={j} className="flex gap-2.5">
                  <span className="mt-[0.6em] w-1 h-1 rounded-full shrink-0" style={{ background: "#D97757" }} />
                  <span>{inline(l.slice(2))}</span>
                </li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{lines.map((l, j) => <span key={j}>{j > 0 && <br />}{inline(l)}</span>)}</p>;
      })}
    </div>
  );
}

function go(target: string) {
  if (target === "resume") {
    const a = document.createElement("a");
    a.href = social.resumePdf; a.download = ""; a.click();
    return;
  }
  document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
}

function Thinking() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI(v => (v + 1) % THINKING_WORDS.length), 900); return () => clearInterval(t); }, []);
  return (
    <div className="flex items-center gap-2.5">
      <ClaudeLogo size={20} spin />
      <span className="text-sm font-sans" style={{ color: "var(--text-muted)" }}>{THINKING_WORDS[i]}…</span>
    </div>
  );
}

function AssistantMessage({ m, onFollowUp, onRetry }: { m: Msg; onFollowUp: (q: string) => void; onRetry: () => void }) {
  const [copied, setCopied] = useState(false);
  const [vote, setVote] = useState<"up" | "down" | null>(null);
  const copy = () => {
    navigator.clipboard?.writeText(m.text.replace(/\*\*/g, ""));
    setCopied(true); setTimeout(() => setCopied(false), 1500);
  };
  const iconBtn = "p-1.5 rounded-lg transition-colors hover:bg-[rgba(217,119,87,0.10)]";
  return (
    <div className="flex gap-3.5">
      <div className="pt-1 shrink-0"><ClaudeLogo size={22} spin={!m.done} /></div>
      <div className="min-w-0 flex-1">
        {m.text === "" ? <Thinking /> : (
          <div className="font-serif text-[1.05rem] leading-[1.7]" style={{ color: "var(--text-primary)" }}>
            <Markdown text={m.text} />
            {!m.done && <span className="inline-block w-[2px] h-[1.1em] align-middle ml-0.5 blink" style={{ background: "#D97757" }} />}
          </div>
        )}

        {m.done && m.ans?.artifacts && (
          <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {m.ans.artifacts.map(a => (
              <button key={a.title} onClick={() => go(a.target)}
                className="group flex items-center gap-3 text-left p-3.5 rounded-2xl transition-all hover:-translate-y-0.5"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-warm)", boxShadow: "0 1px 3px rgba(20,20,19,0.05)" }}>
                <span className="w-10 h-10 rounded-xl grid place-items-center shrink-0" style={{ background: `${a.accent}1f` }}>
                  <Sparkles size={16} style={{ color: a.accent }} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium truncate font-sans" style={{ color: "var(--text-primary)" }}>{a.title}</span>
                  <span className="block mono-label mt-0.5">Artifact · {a.kind}</span>
                </span>
                <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: "var(--text-muted)" }} />
              </button>
            ))}
          </div>
        )}

        {m.done && (
          <div className="flex items-center gap-0.5 mt-3" style={{ color: "var(--text-muted)" }}>
            <button className={iconBtn} onClick={copy} aria-label="Copy">{copied ? <Check size={14} /> : <Copy size={14} />}</button>
            <button className={iconBtn} onClick={() => setVote("up")} aria-label="Good response"><ThumbsUp size={14} style={vote === "up" ? { color: "#D97757" } : {}} /></button>
            <button className={iconBtn} onClick={() => setVote("down")} aria-label="Bad response"><ThumbsDown size={14} style={vote === "down" ? { color: "#D97757" } : {}} /></button>
            <button className={iconBtn} onClick={onRetry} aria-label="Retry"><RotateCcw size={14} /></button>
          </div>
        )}

        {m.done && m.ans?.followUps && (
          <div className="flex flex-wrap gap-2 mt-4">
            {m.ans.followUps.map(f => (
              <button key={f} onClick={() => onFollowUp(f)}
                className="px-3.5 py-1.5 rounded-full text-[0.8rem] font-sans transition-colors hover:bg-[rgba(217,119,87,0.10)]"
                style={{ color: "var(--text-secondary)", border: "1px solid var(--border-warm)" }}>
                {f}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function Hero() {
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [busy, setBusy] = useState(false);
  const [hello, setHello] = useState("Hello");
  const idRef = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatting = msgs.length > 0;

  useEffect(() => {
    setHello(greeting());
    const currentTimers = timers.current;
    return () => {
      currentTimers.forEach(clearTimeout);
    };
  }, []);
  useEffect(() => {
    if (chatting) endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs, chatting]);

  const ask = (q: string) => {
    const question = q.trim();
    if (!question || busy) return;
    const ans = answer(question);
    const uid = ++idRef.current, aid = ++idRef.current;
    setBusy(true); setInput("");
    setMsgs(m => [...m, { id: uid, role: "user", text: question }, { id: aid, role: "assistant", text: "" }]);

    // "thinking" pause, then stream the reply in word-sized chunks
    const words = ans.text.split(/(\s+)/);
    let n = 0;
    const tick = () => {
      n = Math.min(n + 2, words.length);
      const finished = n >= words.length;
      setMsgs(m => m.map(x => x.id === aid ? { ...x, text: words.slice(0, n).join(""), ans, done: finished } : x));
      if (finished) setBusy(false);
      else timers.current.push(setTimeout(tick, 22));
    };
    timers.current.push(setTimeout(tick, 1100));
  };

  const retry = (aid: number) => {
    const i = msgs.findIndex(m => m.id === aid);
    const prev = msgs[i - 1];
    if (prev && !busy) { setMsgs(m => m.slice(0, i - 1)); setTimeout(() => ask(prev.text), 0); }
  };

  const reset = () => { timers.current.forEach(clearTimeout); setMsgs([]); setBusy(false); setInput(""); };

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); ask(input); }
  };

  const composer = (
    <div className="w-full">
      <div className="rounded-[28px] p-3 transition-shadow focus-within:shadow-[0_6px_32px_rgba(217,119,87,0.16)]"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-warm)", boxShadow: "0 4px 24px rgba(20,20,19,0.06)" }}>
        <textarea
          ref={inputRef} rows={1} value={input}
          onChange={e => setInput(e.target.value)} onKeyDown={onKey}
          placeholder={chatting ? "Reply to Umang…" : "How can Umang help you today?"}
          className="w-full resize-none bg-transparent outline-none px-3 pt-2 pb-3 text-[1rem] font-sans"
          style={{ color: "var(--text-primary)" }}
          aria-label="Ask about Umang Kumar"
        />
        <div className="flex items-center justify-between">
          <span className="p-2 rounded-xl" style={{ color: "var(--text-muted)" }}><Plus size={18} /></span>
          <div className="flex items-center gap-2">
            <span className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-[0.8rem] font-sans rounded-xl" style={{ color: "var(--text-secondary)" }}>
              Umang 5.5 <ChevronDown size={14} />
            </span>
            <button onClick={() => ask(input)} disabled={!input.trim() || busy}
              className="w-9 h-9 rounded-xl grid place-items-center transition-all disabled:opacity-35 hover:scale-105"
              style={{ background: "#D97757", color: "#fff" }} aria-label="Send">
              <ArrowUp size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative min-h-screen flex flex-col items-center overflow-hidden pt-28 pb-16 px-5"
      style={{ background: "var(--bg-primary)" }}>
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[780px] h-[520px] pointer-events-none opacity-[0.16]"
        style={{ background: "radial-gradient(ellipse, #D97757 0%, transparent 65%)", filter: "blur(70px)" }} />

      <div className={`relative z-10 w-full max-w-[44rem] flex-1 flex flex-col ${chatting ? "" : "justify-center"}`}>
        {!chatting ? (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full mb-8"
              style={{ background: "rgba(217,119,87,0.10)", border: "1px solid rgba(217,119,87,0.20)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#788C5D" }} />
              <span className="mono-label" style={{ color: "#D97757" }}>Available for opportunities</span>
            </div>

            <h1 className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 font-serif font-normal text-center"
              style={{ fontSize: "clamp(2.2rem, 6vw, 3.6rem)", color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              <ClaudeLogo size={52} spin className="shrink-0" />
              <span>{hello}, I&apos;m {personal.nickname}</span>
            </h1>
            <p className="font-sans text-base md:text-lg mt-5 text-center" style={{ color: "var(--text-secondary)" }}>
              {personal.title}
            </p>
            <p className="font-serif italic text-center mt-2 mb-9 max-w-lg" style={{ color: "var(--text-muted)" }}>
              &ldquo;{personal.tagline}&rdquo;
            </p>

            {composer}

            <div className="flex flex-wrap justify-center gap-2.5 mt-5">
              {CHIPS.map(({ label, prompt, icon: Icon }) => (
                <button key={label} onClick={() => ask(prompt)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-sans transition-all hover:-translate-y-0.5 hover:border-[#D97757]"
                  style={{ background: "var(--bg-card)", color: "var(--text-secondary)", border: "1px solid var(--border-warm)" }}>
                  <Icon size={14} style={{ color: "#D97757" }} />
                  {label}
                </button>
              ))}
              <button onClick={() => go("resume")}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-sans transition-all hover:-translate-y-0.5"
                style={{ background: "#D97757", color: "#fff" }}>
                <FileDown size={14} /> Resume
              </button>
            </div>

            <div className="flex items-center gap-4 mt-10">
              <a href={social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                className="p-2.5 rounded-xl transition-transform hover:scale-110"
                style={{ background: "var(--bg-surface)", color: "var(--text-secondary)" }}><GithubIcon className="w-4 h-4" /></a>
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="p-2.5 rounded-xl transition-transform hover:scale-110"
                style={{ background: "var(--bg-surface)", color: "var(--text-secondary)" }}><LinkedinIcon className="w-4 h-4" /></a>
              <a href={`mailto:${personal.email}`} className="font-mono text-xs link-underline" style={{ color: "var(--text-muted)" }}>
                {personal.email}
              </a>
            </div>
          </motion.div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8 pb-4" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
              <div className="flex items-center gap-2 font-sans text-sm" style={{ color: "var(--text-secondary)" }}>
                <ClaudeLogo size={18} /> Chat with Umang
              </div>
              <button onClick={reset} className="flex items-center gap-1.5 text-sm font-sans px-3 py-1.5 rounded-xl hover:bg-[rgba(217,119,87,0.10)] transition-colors"
                style={{ color: "var(--text-secondary)" }}>
                <Plus size={14} /> New chat
              </button>
            </div>

            <div className="flex-1 space-y-9">
              <AnimatePresence initial={false}>
                {msgs.map(m => (
                  <motion.div key={m.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                    {m.role === "user" ? (
                      <div className="flex justify-end">
                        <div className="max-w-[85%] px-4 py-2.5 rounded-2xl font-sans text-[0.95rem]"
                          style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>{m.text}</div>
                      </div>
                    ) : (
                      <AssistantMessage m={m} onFollowUp={ask} onRetry={() => retry(m.id)} />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div ref={endRef} className="sticky bottom-4 mt-10 pt-4"
              style={{ background: "linear-gradient(to top, var(--bg-primary) 70%, transparent)" }}>
              {composer}
              <p className="text-center mono-label mt-3" style={{ textTransform: "none", letterSpacing: "0.02em" }}>
                This assistant answers only from Umang's resume.
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
