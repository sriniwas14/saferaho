import { InsuranceCategoryPostPage } from "@/views/InsuranceCategoryPostPage"
import { getInsurancePosts } from "@/lib/insurance-content"

export function generateStaticParams() {
  return getInsurancePosts("life-insurance").map((post) => ({ slug: post.slug }))
}

export default async function LifeInsurancePostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <InsuranceCategoryPostPage section="life-insurance" slug={slug} />
}
