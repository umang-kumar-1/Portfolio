import { personal, social, projects, experiences, education, skillGroups } from "./portfolioData";

export interface Artifact { title: string; kind: string; target: string; accent: string; }
export interface Answer { text: string; artifacts?: Artifact[]; followUps?: string[]; }

const has = (q: string, ...words: string[]) => words.some(w => q.includes(w));

export function answer(raw: string): Answer {
  const q = raw.toLowerCase();
  const job = experiences[0];
  const web = projects[0];

  const find = (id: string) => projects.find(p => p.id === id)!;
  const detail = (id: string, n = 4): Answer => {
    const p = find(id);
    return {
      text: `**${p.title}** — ${p.category}${p.role ? ` (${p.role})` : ""}.\n\n${p.summary}\n\n${p.bullets.slice(0, n).map(b => `- ${b}`).join("\n")}`,
      artifacts: [{ title: p.title, kind: "Project", target: "projects", accent: p.accentColor }],
      followUps: ["What else have you built?", "What's your tech stack?"],
    };
  };
  if (has(q, "claude", "agent sdk", "feedback loop", "guardrail")) return detail("claude-feedback-tool");
  if (has(q, "classic", "spfx", "annotation", "screenshot")) return detail("classic-feedback-tool");
  if (has(q, "image", "picture")) return detail("image-management");
  if (has(q, "teams", "exporter")) return detail("teams-chat-exporter");
  if (has(q, "webstudio", "cms", "multi-tenant")) {
    return {
      text: `**${web.title}** — ${web.category}. I'm the ${web.role?.toLowerCase()}.\n\n${web.summary}\n\n${web.bullets.slice(0, 3).map(b => `- ${b}`).join("\n")}`,
      artifacts: [{ title: web.title, kind: "Project", target: "projects", accent: web.accentColor }],
      followUps: ["What else have you built?", "What's your tech stack?"],
    };
  }
  if (has(q, "project", "built", "build", "portfolio", "show")) {
    return {
      text: `I've worked on ${projects.length} key projects:\n\n${projects.map(p => `- **${p.title}** — ${p.category}`).join("\n")}\n\nWebStudio powers 3 live production sites, including two for German clients. The Claude Feedback Tool is a ~29.6k-line TypeScript solo project.`,
      artifacts: projects.map(p => ({ title: p.title, kind: p.category, target: "projects", accent: p.accentColor })),
      followUps: ["Tell me about WebStudio", "Tell me about the Claude Feedback Tool"],
    };
  }
  if (has(q, "skill", "stack", "tech", "language", "know", "tools", "react")) {
    return {
      text: skillGroups.map(g => `**${g.category}** — ${g.items.join(", ")}`).join("\n\n"),
      artifacts: [{ title: "All skills", kind: "Skills", target: "stack", accent: "#6A9BCC" }],
      followUps: ["What have you built?", "Where do you work?"],
    };
  }
  if (has(q, "experience", "work", "job", "company", "smalsus", "career", "journey")) {
    return {
      text: `I'm a **${job.role}** at **${job.company}**, ${job.location} (${job.period}).\n\n${job.bullets.slice(0, 3).map(b => `- **${b.lead}** ${b.text}`).join("\n")}`,
      artifacts: [{ title: "Experience", kind: "Journey", target: "journey", accent: "#788C5D" }],
      followUps: ["Show me your projects", "What's your education?"],
    };
  }
  if (has(q, "education", "study", "college", "degree", "mca", "bca", "university")) {
    return {
      text: education.map(e => `**${e.degree}** (${e.period})\n${e.institution} — ${e.university}`).join("\n\n"),
      artifacts: [{ title: "Education", kind: "Journey", target: "journey", accent: "#788C5D" }],
      followUps: ["Tell me about your experience", "How can I contact you?"],
    };
  }
  if (has(q, "resume", "cv", "download")) {
    return { text: "Sure — my resume is one click away.", artifacts: [{ title: "Umang_Kumar_Resume.pdf", kind: "PDF", target: "resume", accent: "#D97757" }], followUps: ["How can I contact you?"] };
  }
  if (has(q, "contact", "email", "hire", "reach", "phone", "linkedin", "github", "available")) {
    return {
      text: `I'm open to new opportunities. You can reach me here:\n\n- **Email** — ${personal.email}\n- **Phone** — ${personal.phone}\n- **LinkedIn** — ${social.linkedin.replace("https://www.", "")}\n- **GitHub** — ${social.github.replace("https://", "")}`,
      artifacts: [{ title: "Get in touch", kind: "Contact", target: "contact", accent: "#D97757" }],
      followUps: ["Download your resume"],
    };
  }
  if (has(q, "who", "about", "yourself", "hi", "hello", "hey", "umang")) {
    return {
      text: `I'm **${personal.name}**, a ${personal.title} based in ${personal.location}.\n\n${personal.summary}`,
      artifacts: [{ title: "About me", kind: "About", target: "about", accent: "#D97757" }],
      followUps: ["What have you built?", "What's your tech stack?"],
    };
  }
  return {
    text: "I can answer questions about my **projects**, **skills**, **experience**, **education**, or how to **contact** me. Try one of these:",
    followUps: ["What have you built?", "What's your tech stack?", "Tell me about your experience", "How can I contact you?"],
  };
}
