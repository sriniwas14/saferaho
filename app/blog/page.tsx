import { getAllPosts, getCategories } from "@/lib/blog"
import { BlogList } from "@/components/blog/BlogList"

export default function BlogPage() {
  const posts = getAllPosts()
  const categories = getCategories()

  return (
    <main className="min-h-screen bg-saferaho-cloud pt-24 md:pt-28 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold text-saferaho-navy mb-4">
            Blog
          </h1>
          <p className="text-lg text-saferaho-gray max-w-2xl mx-auto">
            Insights, tips, and guides on insurance and investments to help you make informed financial decisions.
          </p>
        </div>
        <BlogList posts={posts} categories={categories} />
      </div>
    </main>
  )
}
