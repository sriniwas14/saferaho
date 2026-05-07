import { InsuranceCategoryPostPage } from "@/views/InsuranceCategoryPostPage"
import { getInsurancePosts } from "@/lib/insurance-content"

export function generateStaticParams() {
  return getInsurancePosts("travel-insurance").map((post) => ({ slug: post.slug }))
}

export default async function TravelInsurancePostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <InsuranceCategoryPostPage section="travel-insurance" slug={slug} />
}
