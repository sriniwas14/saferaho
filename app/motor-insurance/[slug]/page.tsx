import { InsuranceCategoryPostPage } from "@/views/InsuranceCategoryPostPage"
import { getInsurancePosts } from "@/lib/insurance-content"

export function generateStaticParams() {
  return getInsurancePosts("motor-insurance").map((post) => ({ slug: post.slug }))
}

export default async function MotorInsurancePostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <InsuranceCategoryPostPage section="motor-insurance" slug={slug} />
}
