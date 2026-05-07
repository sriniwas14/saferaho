import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { slug } from "github-slugger"

export interface BlogPost {
  slug: string
  title: string
  category: string
  heroImage: string
  date: string
  excerpt: string
  content: string
}

const contentDir = path.join(process.cwd(), "content/blog")

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".md"))

  const posts = files.map((filename) => {
    const filePath = path.join(contentDir, filename)
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const { data, content } = matter(fileContent)

    return {
      slug: data.slug || filename.replace(".md", ""),
      title: data.title,
      category: data.category,
      heroImage: data.heroImage || "/images/blog/default.jpg",
      date: data.date,
      excerpt: data.excerpt || "",
      content,
    }
  })

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts()
  return posts.find((post) => post.slug === slug)
}

export function getCategories(): string[] {
  const posts = getAllPosts()
  return [...new Set(posts.map((post) => post.category))]
}

export interface TocHeading {
  level: number
  text: string
  id: string
}

export function extractHeadings(content: string): TocHeading[] {
  const headings: TocHeading[] = []
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  let match: RegExpExecArray | null

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    headings.push({ level, text, id: slug(text) })
  }

  return headings
}
