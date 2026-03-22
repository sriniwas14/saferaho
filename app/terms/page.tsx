import { siteConfig } from '@/data/site';

export default function Page() {
  return (
    <main className="px-6 md:px-[6vw] py-28 md:py-32">
      <div className="max-w-3xl mx-auto bg-white rounded-[22px] p-8 md:p-10 card-shadow border border-saferaho-navy/5">
        <h1 className="font-display text-4xl text-saferaho-navy mb-4">Terms of Service</h1>
        <p className="text-saferaho-gray leading-relaxed mb-4">
          The information on this website is for general guidance. Insurance and investment recommendations depend on your profile, policy terms, underwriting, and market conditions.
        </p>
        <p className="text-saferaho-gray leading-relaxed mb-4">
          Quotes, benefits, and claim outcomes are subject to the insurer&apos;s final approval and the applicable product documents.
        </p>
        <p className="text-saferaho-gray leading-relaxed">
          By using this site, you agree to contact us for personalised advice before making a purchase decision. For support, reach us at <a className="text-saferaho-blue" href={`tel:${siteConfig.contact.phoneHref}`}>{siteConfig.contact.phone}</a>.
        </p>
      </div>
    </main>
  );
}
