import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { BlogPost } from "@/lib/blog"

export const insuranceContentSections = {
  "health-insurance": {
    title: "Health Insurance",
    description: "Guides, explainers, and comparisons to help you choose the right health cover.",
    directory: "health-insurance",
  },
  "life-insurance": {
    title: "Life Insurance",
    description: "Articles on term plans, riders, and coverage decisions for long-term protection.",
    directory: "life-insurance",
  },
  "motor-insurance": {
    title: "Motor Insurance",
    description: "Practical advice on renewals, claims, add-ons, and vehicle coverage decisions.",
    directory: "motor-insurance",
  },
  "travel-insurance": {
    title: "Travel Insurance",
    description: "Destination-ready travel cover guides for medical, baggage, and trip disruptions.",
    directory: "travel-insurance",
  },
} as const

export type InsuranceContentSection = keyof typeof insuranceContentSections

function getContentDir(section: InsuranceContentSection) {
  return path.join(process.cwd(), "content", "insurance", insuranceContentSections[section].directory)
}

export function getInsurancePosts(section: InsuranceContentSection): BlogPost[] {
  const contentDir = getContentDir(section)
  const files = fs.readdirSync(contentDir).filter((file) => file.endsWith(".md"))

  const posts = files.map((filename) => {
    const filePath = path.join(contentDir, filename)
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const { data, content } = matter(fileContent)

    return {
      slug: data.slug || filename.replace(".md", ""),
      title: data.title,
      category: data.category || insuranceContentSections[section].title,
      heroImage: data.heroImage || "/images/hero-family.jpg",
      date: data.date,
      excerpt: data.excerpt || "",
      content,
    }
  })

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getInsurancePostBySlug(section: InsuranceContentSection, slug: string) {
  return getInsurancePosts(section).find((post) => post.slug === slug)
}

export function getInsuranceCategories(section: InsuranceContentSection) {
  const posts = getInsurancePosts(section)
  return [...new Set(posts.map((post) => post.category))]
}
