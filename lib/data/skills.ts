import {
  SiC,
  SiClaude,
  SiDocker,
  SiDotnet,
  SiDrizzle,
  SiExpress,
  SiGit,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNeovim,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiNuxt,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiSqlite,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVuedotjs,
} from "@icons-pack/react-simple-icons"
import type { IconType } from "@icons-pack/react-simple-icons"
import {
  Coffee,
  Database,
  Hash,
  Layers,
  Split,
  Terminal,
  Webhook,
  Workflow,
} from "lucide-react"

export type Skill = {
  brand?: boolean
  icon: IconType
  invertOnDark?: boolean
  name: string
}

export const skillGroups: { items: Skill[]; title: string }[] = [
  {
    title: "Languages",
    items: [
      { icon: Coffee, name: "Java" },
      { brand: true, icon: SiC, name: "C" },
      { brand: true, icon: SiPython, name: "Python" },
      { brand: true, icon: SiTypescript, name: "TypeScript" },
      { icon: Database, name: "SQL" },
      { icon: Hash, name: "C#" },
    ],
  },
  {
    title: "Frontend Frameworks",
    items: [
      { brand: true, icon: SiNextdotjs, invertOnDark: true, name: "Next.js" },
      { brand: true, icon: SiNuxt, name: "Nuxt.js" },
      { brand: true, icon: SiReact, name: "React" },
      { brand: true, icon: SiVuedotjs, name: "Vue" },
      { brand: true, icon: SiTailwindcss, name: "Tailwind CSS" },
    ],
  },
  {
    title: "Backend Frameworks",
    items: [
      { brand: true, icon: SiNestjs, name: "NestJS" },
      { brand: true, icon: SiExpress, invertOnDark: true, name: "Express" },
      { brand: true, icon: SiLaravel, name: "Laravel" },
      { brand: true, icon: SiDotnet, name: "ASP.NET" },
      { brand: true, icon: SiNodedotjs, name: "Node.js" },
    ],
  },
  {
    title: "Databases",
    items: [
      { brand: true, icon: SiMysql, name: "MySQL" },
      { brand: true, icon: SiPostgresql, name: "PostgreSQL" },
      { brand: true, icon: SiMongodb, name: "MongoDB" },
      { brand: true, icon: SiSqlite, name: "SQLite" },
      { icon: Database, name: "SQL Server" },
    ],
  },
  {
    title: "Cloud",
    items: [
      { brand: true, icon: SiVercel, invertOnDark: true, name: "Vercel" },
    ],
  },
  {
    title: "Tools",
    items: [
      { brand: true, icon: SiGit, name: "Git" },
      { brand: true, icon: SiPostman, name: "Postman" },
      { icon: Database, name: "MikroORM" },
      { brand: true, icon: SiDrizzle, name: "Drizzle ORM" },
      { brand: true, icon: SiDocker, name: "Docker" },
      { brand: true, icon: SiNeovim, name: "Neovim" },
    ],
  },
  {
    title: "Concepts",
    items: [
      { icon: Workflow, name: "CI/CD workflows" },
      { icon: Webhook, name: "REST API development" },
      { icon: Split, name: "CQRS" },
      { icon: Layers, name: "Clean Architecture" },
    ],
  },
  {
    title: "AI Tools",
    items: [
      { brand: true, icon: SiClaude, name: "Claude" },
      { icon: Terminal, name: "Codex" },
    ],
  },
]
