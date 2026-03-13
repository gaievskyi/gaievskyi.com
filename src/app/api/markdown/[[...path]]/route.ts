import { getArticle, getArticles } from "@/cms/data-access/articles"
import { getProject, getProjects } from "@/cms/data-access/projects"
import { craftsMap } from "@/components/video/crafts-videos"
import { getServerSideURL } from "@/lib/get-url"
import type { NextRequest } from "next/server"

function markdownResponse(content: string) {
  return new Response(content.trimStart(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  })
}

function md(fields: Record<string, string | null | undefined>) {
  const lines = Object.entries(fields)
    .filter(([, v]) => v != null)
    .map(([k, v]) => `${k}: ${v}`)
  return `---\n${lines.join("\n")}\n---`
}

function toTitle(slug: string) {
  return slug
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ")
}

const CRAFTS: Record<string, string> = {
  "radial-menu":
    "An elegant radial context menu built with React and Tailwind CSS — gesture-driven, spring-animated, and fully keyboard accessible.",
  "fractional-slider":
    "An experimental fractional slider component with haptic-style SFX — drag to explore non-linear value ranges.",
  "ios-slider":
    "A stretchable brightness slider replicating the iOS Control Center — rubber-band physics and smooth spring animations.",
  "dynamic-island":
    "Apple Dynamic Island inspired component in React — smooth physics animations with live activity states.",
  "vercel-badge":
    "A 3D Vercel Ship 2024 badge recreation — WebGL with realistic materials and physics via Three.js and React Three Fiber.",
  "family-transactions":
    "A family expense tracker UI with animated transaction cards and real-time balance updates — built with React.",
  "vercel-call-to-action":
    "A polished Vercel-inspired call-to-action with animated gradient border and hover effects — React and Tailwind CSS.",
}

async function index() {
  const url = getServerSideURL()
  const [articles, projects] = await Promise.all([getArticles(), getProjects()])

  const articleLines = articles.map(
    (a) =>
      `- [${a.title}](${url}/blog/${a.slug})${a.meta?.description ? ` — ${a.meta.description}` : ""}`,
  )
  const projectLines = projects.map(
    (p) => `- [${p.title}](${url}/projects/${p.slug})`,
  )
  const craftLines = Object.keys(craftsMap).map(
    (slug) => `- [${toTitle(slug)}](${url}/crafts/${slug})`,
  )

  return markdownResponse(`
${md({ title: "Daniel Gaievskyi", url })}

# Daniel Gaievskyi — Design Engineer

Design Engineer crafting polished UI components, interactive experiments, and developer tools.

- Email: daniel@gaievskyi.com
- GitHub: https://github.com/gaievskyi
- X: https://x.com/dgaievskyi
- Telegram: https://t.me/cybermysh

## About

I develop elegant, user-centered, and visually appealing applications. I like projects where design and code naturally flow together. Drawn to experiments — I dive in fast and explore broadly. Based in Poland, available remotely worldwide.

## Publications

${articleLines.join("\n")}

## Crafts

${craftLines.join("\n")}

## Projects

${projectLines.join("\n")}
`)
}

async function article(slug: string) {
  const url = getServerSideURL()
  const post = await getArticle(slug).catch(() => null)
  if (!post) return new Response(null, { status: 404 })

  const published = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null

  return markdownResponse(`
${md({ title: `"${post.title}"`, url: `${url}/blog/${slug}`, published, author: "Daniel Gaievskyi" })}

# ${post.title}

${post.meta?.description ?? ""}
${published ? `\n*Published ${published}*` : ""}

> Full article: ${url}/blog/${slug}
`)
}

async function project(slug: string) {
  const url = getServerSideURL()
  const proj = await getProject(slug).catch(() => null)
  if (!proj) return new Response(null, { status: 404 })

  const created = new Date(proj.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  })

  return markdownResponse(`
${md({ title: `"${proj.title}"`, url: `${url}/projects/${slug}`, created, author: "Daniel Gaievskyi" })}

# ${proj.title}

*${created}*

> View project: ${url}/projects/${slug}
`)
}

function craft(slug: string) {
  const url = getServerSideURL()
  const description = CRAFTS[slug]
  if (!description) return new Response(null, { status: 404 })

  const title = toTitle(slug)

  return markdownResponse(`
${md({ title: `"${title}"`, url: `${url}/crafts/${slug}`, author: "Daniel Gaievskyi" })}

# ${title}

${description}

> View craft: ${url}/crafts/${slug}
`)
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> },
) {
  const { path = [] } = await params
  const [section, slug] = path

  if (!section) return index()
  if (section === "blog" && slug) return article(slug)
  if (section === "projects" && slug) return project(slug)
  if (section === "crafts" && slug) return craft(slug)

  return new Response(null, { status: 404 })
}
