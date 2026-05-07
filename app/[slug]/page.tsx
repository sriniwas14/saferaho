import { notFound } from 'next/navigation';
import { InvestmentPage } from '@/views/InvestmentPage';

const investmentSlugMap: Record<string, string> = {
  'early-retirement': 'retirement',
  'child-education': 'child-education',
  'child-marriage': 'child-marriage',
};

export function generateStaticParams() {
  return Object.keys(investmentSlugMap).map((slug) => ({ slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const investmentType = investmentSlugMap[slug];
  if (investmentType) {
    return <InvestmentPage type={investmentType} />;
  }

  notFound();
}
