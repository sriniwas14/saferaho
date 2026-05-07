"use client"

import { useState } from "react"
import { BlogCard } from "./BlogCard"
import type { BlogPost } from "@/lib/blog"

export function BlogList({
  posts,
  categories,
  basePath = "/blog",
}: {
  posts: BlogPost[]
  categories: string[]
  basePath?: string
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory)

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === "All"
              ? "bg-saferaho-blue text-white"
              : "bg-saferaho-cloud text-saferaho-navy"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? "bg-saferaho-blue text-white"
                : "bg-saferaho-cloud text-saferaho-navy"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredPosts.length === 0 ? (
        <p className="text-center text-saferaho-gray py-12">No posts found in this category.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} basePath={basePath} />
          ))}
        </div>
      )}
    </div>
  )
}
