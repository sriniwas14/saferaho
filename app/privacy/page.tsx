import { siteConfig } from '@/data/site';

export default function Page() {
  return (
    <main className="px-6 md:px-[6vw] py-28 md:py-32">
      <div className="max-w-3xl mx-auto bg-white rounded-[22px] p-8 md:p-10 card-shadow border border-saferaho-navy/5">
        <h1 className="font-display text-4xl text-saferaho-navy mb-4">Privacy Policy</h1>
        <p className="text-saferaho-gray leading-relaxed mb-4">
          {siteConfig.name} uses the information you share through forms, calls, and WhatsApp chats to respond to your enquiries, prepare quotes, and support policy servicing.
        </p>
        <p className="text-saferaho-gray leading-relaxed mb-4">
          We do not sell your personal information. Data may be shared with insurers or service providers only when needed to process your request or provide support.
        </p>
        <p className="text-saferaho-gray leading-relaxed">
          For any privacy-related request, contact us at <a className="text-saferaho-blue" href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
        </p>
      </div>
    </main>
  );
}
