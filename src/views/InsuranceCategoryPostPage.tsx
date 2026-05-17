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
