import { InsuranceCategoryPostPage } from "@/views/InsuranceCategoryPostPage"
import { getInsurancePosts } from "@/lib/insurance-content"

export function generateStaticParams() {
  return getInsurancePosts("health-insurance").map((post) => ({ slug: post.slug }))
}

export default async function HealthInsurancePostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <InsuranceCategoryPostPage section="health-insurance" slug={slug} />
}
