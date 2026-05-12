import Image from "next/image";
import { notFound } from "next/navigation";
import { BlogContent } from "@/components/blog/BlogContent";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { extractHeadings } from "@/lib/blog";
import {
  getInsurancePostBySlug,
  insuranceContentSections,
  type InsuranceContentSection,
} from "@/lib/insurance-content";

export function InsuranceCategoryPostPage({
  section,
  slug,
}: {
  section: InsuranceContentSection;
  slug: string;
}) {
  const post = getInsurancePostBySlug(section, slug);

  if (!post) {
    notFound();
  }

  const headings = extractHeadings(post.content);

  return (
    <main className="min-h-screen bg-white pt-16 md:pt-24">
      <div className="relative h-[400px] w-full">
        <Image
          src={post.heroImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-saferaho-navy/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <span className="inline-block bg-saferaho-blue px-3 py-1 rounded-full text-sm font-medium mb-4">
              {insuranceContentSections[section].title}
            </span>
            <h1 className="text-4xl md:text-5xl mb-4">{post.title}</h1>
            <p className="text-lg text-gray-200">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex gap-8 justify-center">
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-32 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <TableOfContents headings={headings} />
            </div>
          </aside>
          <div className="flex-1 min-w-0 max-w-3xl">
            <BlogContent content={post.content} />
          </div>
        </div>
      </div>
    </main>
  );
}
