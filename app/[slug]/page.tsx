import { notFound } from 'next/navigation';
import { InsurancePage } from '@/views/InsurancePage';
import { InvestmentPage } from '@/views/InvestmentPage';

const insuranceSlugMap: Record<string, string> = {
  'life-insurance': 'life',
  'health-insurance': 'health',
  'motor-insurance': 'motor',
  'travel-insurance': 'travel',
};

const investmentSlugMap: Record<string, string> = {
  'early-retirement': 'retirement',
  'child-education': 'child-education',
  'child-marriage': 'child-marriage',
};

export function generateStaticParams() {
  return [
    ...Object.keys(insuranceSlugMap).map((slug) => ({ slug })),
    ...Object.keys(investmentSlugMap).map((slug) => ({ slug })),
  ];
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const insuranceType = insuranceSlugMap[slug];
  if (insuranceType) {
    return <InsurancePage type={insuranceType} />;
  }

  const investmentType = investmentSlugMap[slug];
  if (investmentType) {
    return <InvestmentPage type={investmentType} />;
  }

  notFound();
}
