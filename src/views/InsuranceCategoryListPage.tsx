import { BlogList } from "@/components/blog/BlogList"
import {
  getInsuranceCategories,
  getInsurancePosts,
  insuranceContentSections,
  type InsuranceContentSection,
} from "@/lib/insurance-content"

export function InsuranceCategoryListPage({ section }: { section: InsuranceContentSection }) {
  const posts = getInsurancePosts(section)
  const categories = getInsuranceCategories(section)
  const sectionConfig = insuranceContentSections[section]

  return (
    <main className="min-h-screen bg-saferaho-cloud pt-24 md:pt-28 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold text-saferaho-navy mb-4">
            {sectionConfig.title}
          </h1>
          <p className="text-lg text-saferaho-gray max-w-2xl mx-auto">
            {sectionConfig.description}
          </p>
        </div>
        <BlogList posts={posts} categories={categories} basePath={`/${section}`} />
      </div>
    </main>
  )
}
