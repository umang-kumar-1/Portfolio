// portfolioData.ts — SINGLE SOURCE OF TRUTH
// Sources: Resume/ReactJs Resume, Resume/Sharepoint Resume, and Resume/another project (Claude Feedback Tool, Classic Feedback Tool).
// Do not add claims that are not in those files.

export interface PersonalInfo {
  name: string; nickname: string; title: string; tagline: string;
  summary: string; location: string; email: string; phone: string;
}
export interface Social { github: string; linkedin: string; resumePdf: string; resumeSharePointPdf: string; }
export interface Stat { value: string; label: string; }
export interface Bullet { lead?: string; text: string; }
export interface Experience {
  period: string; role: string; company: string; location: string;
  current?: boolean; bullets: Bullet[];
}
export interface Education { degree: string; institution: string; university: string; period: string; }
export interface Project {
  id: string; title: string; role?: string; category: string; accentColor: string;
  summary: string; bullets: string[]; tags: string[]; featured: boolean;
}
export interface SkillGroup { category: string; items: string[]; color: string; }
export interface SEOMeta { title: string; description: string; keywords: string[]; }

export const personal: PersonalInfo = {
  name: "Umang Kumar",
  nickname: "Umang",
  title: "Software Developer",
  tagline: "Building SharePoint-backed platforms and governed AI workflows.",
  summary:
    "Software Developer with 1 year of experience. I independently lead WebStudio, a multi-tenant CMS platform that integrates React with SharePoint and Microsoft Graph API, and I build reusable UI components and automation tooling. I also built a Claude Agent SDK platform that turns plain-language feedback into reviewed pull requests, and a SharePoint (SPFx) feedback tool. I'm comfortable across the stack, from React front-end architecture to backend API integration and cloud configuration, with growing exposure to Power Automate, Spring Boot and AI agent tooling.",
  location: "Noida, India",
  email: "official.umangkumar@gmail.com",
  phone: "+91 7618652940",
};

export const social: Social = {
  github: "https://github.com/umang-kumar-1",
  linkedin: "https://www.linkedin.com/in/umangkumar01",
  resumePdf: "/resume/Umang_Kumar_Resume.pdf",
  resumeSharePointPdf: "/resume/Umang_Kumar_Resume_SharePoint.pdf",
};

export const stats: Stat[] = [
  { value: "1 yr", label: "Professional experience" },
  { value: "3", label: "Live production sites (WebStudio)" },
  { value: "3–4", label: "Projects using my image component" },
];

export const experiences: Experience[] = [
  {
    period: "Sep 2025 – Present",
    role: "Software Developer",
    company: "Smalsus Infolabs Private Limited",
    location: "Greater Noida",
    current: true,
    bullets: [
      { lead: "Lead & independently develop", text: "WebStudio, a multi-tenant CMS platform provisioning SharePoint-backed sites paired with a synchronized public React front-end — currently powering 3 live production sites, including two for German clients." },
      { lead: "Build reusable, production-grade React components", text: "— e.g. an image management tool with cropping, rotation, metadata handling, folder-based organization and search — integrated into 3-4 projects including WebStudio, SVD, and the Task Management tool." },
      { lead: "Integrate React applications with backend services", text: "via a custom PHP layer and Microsoft Graph API, including Azure AD app registration and application-level permissions for secure public data access." },
      { lead: "Prototype new architecture and AI-driven features", text: "— including an alternative domain-hosting approach for SharePoint-backed sites and AI agents for translation and theme generation." },
      { lead: "Build AI-assisted developer tooling", text: "— the Claude Feedback Tool (Claude Agent SDK) and the Classic Feedback Tool for SharePoint (SPFx 1.21); see Projects." },
      { lead: "Maintain and stabilize", text: "an internal Operational Task Management Tool (OTM) by resolving bugs and functionality issues; contribute to workspace/marketplace components on the SVD project and internal tooling (deployment, backups, AI/MCP R&D)." },
    ],
  },
];

export const education: Education[] = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Accurate Institute of Management and Technology, Greater Noida",
    university: "Dr. A.P.J. Abdul Kalam Technical University, Lucknow",
    period: "2025 – Present",
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "D.S. College, Aligarh",
    university: "Raja Mahendra Pratap Singh State University, Aligarh",
    period: "2022 – 2025",
  },
];

export const projects: Project[] = [
  {
    id: "webstudio-cms",
    title: "WebStudio",
    role: "Lead Developer",
    category: "Multi-Tenant CMS Platform",
    accentColor: "#D97757",
    summary: "A platform that spins up a dedicated SharePoint site per client, with a live read-only React front-end kept in sync with it. Currently powers 3 live production sites, including two for German clients (a political organization and a consulting firm).",
    bullets: [
      "Sole developer. Auto-creates the required lists/libraries via PnP JS if not already present, then provisions a new CMS site end-to-end.",
      "Built an exact-mirror React app as a live public preview: SharePoint stays fully editable while the React app remains read-only, synced through a Graph API-powered PHP backend (including document/image access via drive IDs).",
      "Configured Azure AD app registrations with application-level Sites.ReadWrite.All, validated with Graph Explorer; new client sites spin up quickly via .env-based configuration.",
      "Added AI features: a translation agent (English by default, translatable to German, Spanish and French) and a theme-generation agent with manual override.",
      "R&D: an alternative architecture that hosts the editable/view site on the client's own domain via Azure, using SharePoint's delegated permission for a public access token and MSAL-based admin authentication for edit mode.",
    ],
    tags: ["React JS", "SharePoint", "PnP JS", "PHP", "Microsoft Graph API", "Azure AD", "MSAL"],
    featured: true,
  },
  {
    id: "claude-feedback-tool",
    title: "Claude Feedback Tool",
    role: "Solo project · ~29.6k lines of TypeScript",
    category: "AI Feedback-to-Code Platform",
    accentColor: "#C6613F",
    summary: "A local AI development workflow where a non-technical user describes a change in plain language, and Claude takes it through analysis, plan, approval, implementation, validation and a pull request in a governed way.",
    bullets: [
      "End-to-end workflow on the Claude Agent SDK: Feedback → Analysis → Clarification → Impact Plan → Approval → Implementation → Validation → Review → PR, so non-developers can ship changes without knowing code or git.",
      "Host-enforced safety: analysis and planning are read-only, writes are allowed only after the exact plan is approved, a scope fence limits Claude to the files the plan declares, and a command guard blocks unsafe shell operations.",
      "A \"grill\" step where the AI asks clarifying questions before coding, then an impact analysis that marks unverifiable items as \"unknown\" rather than \"safe\".",
      "Governance layer: change classes, CR-numbered change specs, policy-pack checks, decision log, role tiers (commenter / requester / approver), audit trail and approval locking.",
      "Automated validation: runs the project's own build, type-check, tests and lint, reports real exit codes, and compares failures with the last commit to show whether the change caused them.",
      "Automated Git/GitHub: one branch per change (cr/<year>-<nnnn>), descriptive commits, PR creation, unsaved-work detection and one-click undo/rollback.",
      "Simple mode (plain language, screenshot attachments, multilingual answers, try-it-before-approve) alongside an Expert mode with full diffs and logs.",
      "Project auto-discovery (SPFx, Vite, npm scripts), dev-server launch, secrets redaction, per-project locking, token/usage tracking, and test fakes (fake agent, fake GitHub) across 13 test files.",
    ],
    tags: ["Claude Agent SDK", "TypeScript", "Node.js", "Express 5", "React 19", "Vite 6", "Zod", "MSAL", "GitHub PR automation"],
    featured: true,
  },
  {
    id: "classic-feedback-tool",
    title: "Classic Feedback Tool for SharePoint",
    role: "SPFx 1.21 · ~6.2k lines of TypeScript",
    category: "In-Page Visual Feedback Tool",
    accentColor: "#788C5D",
    summary: "A SharePoint Framework solution where a reviewer draws a box on any area of a page, captures and annotates a screenshot, and the task is created directly in the tenant's existing task list. No provisioning and no new list needed.",
    bullets: [
      "Dual-host SPFx solution (Web Part + Application Customizer) sharing all services and components, so one package works on every page of a site without page edits.",
      "Schema-adaptive task service: reads the target list's actual columns, maps values to what exists, retries after dropping rejected fields, and reports what was dropped. Works across differently structured task lists.",
      "Sites, categories and priorities come dynamically from the tenant's SmartMetadata list. Nothing is hard-coded.",
      "Fixed html2canvas failures on modern CSS (oklch, oklab, color-mix from Tailwind v4) with a document-patching pipeline; a single offscreen-canvas readback cut capture time from ~500 ms to ~1 ms.",
      "Area-selection UX: drag-to-capture, element fallback, multi-screenshot support (including popups) and a per-screenshot annotation editor.",
      "Resilient CSS selectors (volatile classes filtered, uniqueness verified) anchor each task to its element and page. Rendering through a portal on body at a high z-index solves SharePoint stacking-context issues.",
    ],
    tags: ["SPFx 1.21", "React 17", "TypeScript 5.3", "PnPjs v4", "Fluent UI", "html2canvas", "Gulp"],
    featured: true,
  },
  {
    id: "image-management",
    title: "SharePoint Image Management Component",
    category: "Reusable Component",
    accentColor: "#6A9BCC",
    summary: "A reusable component for a site's picture library: upload, crop, rotate, transform and edit metadata, with folder-wise organization and fast, friendly search. Integrated into 3-4 projects (WebStudio, SVD, Task Management tool).",
    bullets: [],
    tags: ["React", "SharePoint", "JavaScript"],
    featured: false,
  },
  {
    id: "teams-chat-exporter",
    title: "MS Teams Chat Exporter",
    category: "Integration Tool",
    accentColor: "#B99278",
    summary: "A dynamic tool to export Teams chats and shared resources with year/date-wise filtering, authenticated per logged-in user using Graph permissions (Chat.ReadWrite.All, Chat.Read, Channel access).",
    bullets: [],
    tags: ["Microsoft Graph API", "Azure AD", "JavaScript"],
    featured: false,
  },
];

export const skillGroups: SkillGroup[] = [
  { category: "AI & Agents", color: "#D97757", items: ["Claude Agent SDK", "Agentic workflows", "Prompt engineering", "Human-in-the-loop approval", "AI guardrails & permission enforcement", "AI Agents & MCP"] },
  { category: "Frontend", color: "#6A9BCC", items: ["React 17/19", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "Vite", "Fluent UI"] },
  { category: "Backend & APIs", color: "#B99278", items: ["Node.js", "Express", "REST APIs", "Zod", "PHP", "PnP JS / SharePoint REST"] },
  { category: "SharePoint & Microsoft 365", color: "#788C5D", items: ["SPFx", "Site & Tenant Administration", "Groups & Permission Levels", "App Catalog deployment", "Power Automate (in progress)"] },
  { category: "Cloud & Identity", color: "#9E8B70", items: ["Microsoft Graph API", "Azure AD App Registrations", "Application/Delegated Permissions", "MSAL"] },
  { category: "Growing", color: "#C8C5BE", items: ["Core Java", "Spring Boot (basics)", "PostgreSQL (basics)"] },
  { category: "Practices", color: "#87867F", items: ["Git / GitHub PR automation", "CI-style validation", "Unit testing with fakes", "Gulp", "ESLint", "Data Structures & Algorithms"] },
];

export const seoMeta: SEOMeta = {
  title: "Umang Kumar — Software Developer",
  description: "Portfolio of Umang Kumar, a Software Developer building SharePoint-backed platforms with React and Microsoft Graph API, and governed AI workflows with the Claude Agent SDK. Based in Noida, India.",
  keywords: ["Umang Kumar", "Software Developer", "React JS", "Claude Agent SDK", "SharePoint", "SPFx", "Microsoft Graph API", "PnP JS", "Azure AD", "Noida India", "Portfolio"],
};
