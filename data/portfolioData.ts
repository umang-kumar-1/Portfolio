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
export interface Education { degree: string; institution: string; university: string; period: string; note?: string; }
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
  tagline: "I build SharePoint-backed platforms and governed AI workflows.",
  summary:
    "I am a Software Developer with one year of experience. I independently lead WebStudio, a multi-tenant CMS platform that integrates React with SharePoint and Microsoft Graph API, and I build reusable UI components and automation tooling. I have also built an AI platform with the Claude Agent SDK that turns plain-language feedback into reviewed pull requests, and a feedback tool for SharePoint. I am comfortable across the stack, from React front-end architecture to backend API integration and cloud configuration, and I am growing my skills in Power Automate, Spring Boot and AI agent tooling.",
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
  { value: "3", label: "Live production sites on WebStudio" },
  { value: "200+", label: "Problems solved on LeetCode and HackerRank" },
  { value: "8.1", label: "CGPA in BCA (out of 10)" },
];

export const experiences: Experience[] = [
  {
    period: "Sep 2025 – Present",
    role: "Software Developer",
    company: "Smalsus Infolabs Private Limited",
    location: "Greater Noida",
    current: true,
    bullets: [
      { lead: "Lead and independently develop", text: "WebStudio, a multi-tenant CMS platform that provisions SharePoint-backed sites with a synchronized public React front-end. It currently powers 3 live production sites, including two for German clients." },
      { lead: "Build reusable, production-grade React components,", text: "such as an image management tool with cropping, rotation, metadata handling, folder-based organization and search. It is integrated into 3–4 projects, including WebStudio, SVD and the Task Management tool." },
      { lead: "Integrate React applications with backend services", text: "through a custom PHP layer and Microsoft Graph API, including Azure AD app registration and application-level permissions for secure public data access." },
      { lead: "Prototype new architecture and AI-driven features,", text: "including an alternative domain-hosting approach for SharePoint-backed sites and AI agents for translation and theme generation." },
      { lead: "Build AI-assisted developer tools:", text: "the Claude Feedback Tool, which uses the Claude Agent SDK, and the Classic Feedback Tool for SharePoint, which uses SPFx 1.21. See the Projects section for details." },
      { lead: "Maintain and stabilize", text: "an internal Operational Task Management Tool (OTM) by fixing bugs and functional issues. I also contribute to workspace and marketplace components on the SVD project and to internal tooling such as deployment, backups and AI/MCP research." },
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
    note: "CGPA 8.1 / 10 · Graduated in June 2025",
  },
];

export const projects: Project[] = [
  {
    id: "webstudio-cms",
    title: "WebStudio",
    role: "Lead Developer",
    category: "Multi-Tenant CMS Platform",
    accentColor: "#D97757",
    summary: "A platform that creates a dedicated SharePoint site for each client, together with a live, read-only React front-end that stays in sync with it. It currently powers 3 live production sites, including two for German clients (a political organization and a consulting firm).",
    bullets: [
      "I am the sole developer. The platform creates the required lists and libraries with PnP JS if they do not already exist, and then provisions a new CMS site end to end.",
      "I built an exact-mirror React application as a live public preview. SharePoint stays fully editable while the React app remains read-only, and a PHP backend powered by Graph API keeps them in sync, including document and image access through drive IDs.",
      "I configured Azure AD app registrations with application-level Sites.ReadWrite.All permission and validated them with Graph Explorer. New client sites start quickly through .env-based configuration.",
      "I added AI features: a translation agent (English by default, translatable to German, Spanish and French) and a theme-generation agent with manual override.",
      "In R&D, I designed an alternative architecture that hosts the editable site on the client's own domain through Azure. It uses SharePoint's delegated permission to create a public access token, and MSAL-based admin authentication for edit mode.",
    ],
    tags: ["React JS", "SharePoint", "PnP JS", "PHP", "Microsoft Graph API", "Azure AD", "MSAL"],
    featured: true,
  },
  {
    id: "claude-feedback-tool",
    title: "Claude Feedback Tool",
    role: "Solo project · about 29.6k lines of TypeScript",
    category: "AI Feedback-to-Code Platform",
    accentColor: "#C6613F",
    summary: "A local AI development workflow in which a non-technical user describes a change in plain language, and Claude takes it through analysis, planning, approval, implementation, validation and a pull request in a governed way.",
    bullets: [
      "I built an end-to-end workflow on the Claude Agent SDK: Feedback → Analysis → Clarification → Impact Plan → Approval → Implementation → Validation → Review → Pull Request. Non-developers can ship changes without knowing code or Git.",
      "Safety is enforced by the host. Analysis and planning are read-only, writes are allowed only after the exact plan is approved, a scope fence limits Claude to the files the plan declares, and a command guard blocks unsafe shell operations.",
      "A \"grill\" step lets the AI ask clarifying questions before it writes any code. It then creates an impact analysis that marks unverifiable items as \"unknown\" instead of \"safe\".",
      "A governance layer adds change classes, CR-numbered change specs, policy-pack checks, a decision log, role tiers (commenter, requester and approver), an audit trail and approval locking.",
      "Automated validation runs the project's own build, type-check, tests and lint. It reports real exit codes and compares failures with the last commit to show whether the change caused them.",
      "Git and GitHub are automated: one branch per change (cr/<year>-<nnnn>), descriptive commits, pull request creation, unsaved-work detection and one-click undo and rollback.",
      "Simple mode offers plain language, screenshot attachments, multilingual answers and a try-it-before-approve step. Expert mode offers full diffs and logs.",
      "The tool also includes project auto-discovery (SPFx, Vite and npm scripts), dev-server launch, secrets redaction, per-project locking, token and usage tracking, and test fakes (a fake agent and a fake GitHub) across 13 test files.",
    ],
    tags: ["Claude Agent SDK", "TypeScript", "Node.js", "Express 5", "React 19", "Vite 6", "Zod", "MSAL", "GitHub PR automation"],
    featured: true,
  },
  {
    id: "classic-feedback-tool",
    title: "Classic Feedback Tool for SharePoint",
    role: "SPFx 1.21 · about 6.2k lines of TypeScript",
    category: "In-Page Visual Feedback Tool",
    accentColor: "#788C5D",
    summary: "A SharePoint Framework solution in which a reviewer draws a box on any area of a page, captures and annotates a screenshot, and creates a task directly in the tenant's existing task list. It needs no provisioning and no new list.",
    bullets: [
      "It is a dual-host SPFx solution (Web Part and Application Customizer) that shares all services and components, so one package works on every page of a site without page edits.",
      "The schema-adaptive task service reads the actual columns of the target list, maps values to what exists, retries after dropping rejected fields and reports what was dropped. This lets it work across task lists with different structures.",
      "Sites, categories and priorities come dynamically from the tenant's SmartMetadata list, so nothing is hard-coded.",
      "I fixed html2canvas failures on modern CSS (oklch, oklab and color-mix from Tailwind v4) with a document-patching pipeline. A single offscreen-canvas readback cut capture time from about 500 ms to about 1 ms.",
      "The area-selection experience includes drag-to-capture, an element fallback, multi-screenshot support (including popups) and a per-screenshot annotation editor.",
      "Resilient CSS selectors, with volatile classes filtered out and uniqueness verified, anchor each task to its element and page. Rendering through a portal on the body at a high z-index solves SharePoint's stacking-context issues.",
    ],
    tags: ["SPFx 1.21", "React 17", "TypeScript 5.3", "PnPjs v4", "Fluent UI", "html2canvas", "Gulp"],
    featured: true,
  },
  {
    id: "team-management-system",
    title: "Team Management System",
    role: "Solo project",
    category: "Asset and User Management",
    accentColor: "#E8A94B",
    summary: "A complete enterprise system for managing hardware devices, software licenses and employee assets, with separate Admin and User dashboards. I developed and delivered it independently.",
    bullets: [
      "Role-based access control for the Admin and User dashboards manages permissions and secures operations.",
      "Asset modules handle hardware devices, software licenses and employee asset assignments, including single-user and multi-user licenses.",
      "Request workflows let users ask for hardware and software through the dashboard.",
      "Admin modules cover departments, license and hardware categories, inventory, employee details and activity tracking.",
      "The backend is a RESTful service in Spring Boot and Core Java with MySQL. The frontend uses React and TypeScript with reusable components.",
    ],
    tags: ["Core Java", "Spring Boot", "React.js", "TypeScript", "MySQL", "REST APIs", "Maven"],
    featured: true,
  },
  {
    id: "image-management",
    title: "SharePoint Image Management Component",
    category: "Reusable Component",
    accentColor: "#6A9BCC",
    summary: "A reusable component for a site's picture library. Users can upload, crop, rotate, transform and edit metadata, organize images in folders and search quickly. It is integrated into 3–4 projects, including WebStudio, SVD and the Task Management tool.",
    bullets: [],
    tags: ["React", "SharePoint", "JavaScript"],
    featured: false,
  },
  {
    id: "teams-chat-exporter",
    title: "MS Teams Chat Exporter",
    category: "Integration Tool",
    accentColor: "#B99278",
    summary: "A dynamic tool that exports Teams chats and shared resources with year-wise and date-wise filtering. It authenticates as the logged-in user through Graph permissions (Chat.ReadWrite.All, Chat.Read and Channel access).",
    bullets: [],
    tags: ["Microsoft Graph API", "Azure AD", "JavaScript"],
    featured: false,
  },
];

export const skillGroups: SkillGroup[] = [
  { category: "AI and Agents", color: "#D97757", items: ["Claude Agent SDK", "Agentic workflows", "Prompt engineering", "Human-in-the-loop approval", "AI guardrails and permission enforcement", "AI agents and MCP"] },
  { category: "Frontend", color: "#6A9BCC", items: ["React 17/19", "Redux Toolkit", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "Vite", "Fluent UI"] },
  { category: "Backend and APIs", color: "#B99278", items: ["Core Java", "Spring Boot", "Node.js", "Express", "REST APIs", "Zod", "PHP", "Maven", "PnP JS and SharePoint REST"] },
  { category: "SharePoint and Microsoft 365", color: "#788C5D", items: ["SPFx", "Site and tenant administration", "Groups and permission levels", "App Catalog deployment", "Power Automate (learning)"] },
  { category: "Cloud and Identity", color: "#9E8B70", items: ["Microsoft Graph API", "Azure AD app registrations", "Application and delegated permissions", "MSAL"] },
  { category: "Databases", color: "#C8C5BE", items: ["MySQL", "PostgreSQL", "SQL"] },
  { category: "Practices", color: "#87867F", items: ["Git and GitHub PR automation", "Postman", "Unit testing with fakes", "Gulp", "ESLint", "Data structures and algorithms", "OOP", "Role-based access control", "SEO optimization"] },
];

export const seoMeta: SEOMeta = {
  title: "Umang Kumar — Software Developer",
  description: "Portfolio of Umang Kumar, a Software Developer who builds SharePoint-backed platforms with React and Microsoft Graph API, and governed AI workflows with the Claude Agent SDK. Based in Noida, India.",
  keywords: ["Umang Kumar", "Software Developer", "React JS", "Claude Agent SDK", "SharePoint", "SPFx", "Microsoft Graph API", "PnP JS", "Azure AD", "Noida India", "Portfolio"],
};
