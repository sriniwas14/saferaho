import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Handshake } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const partnerLogos = [
  { name: 'ICICI Prudential', src: '/partners/icici-prudential.png', className: 'max-h-12 md:max-h-14' },
  { name: 'HDFC Life', src: '/partners/hdfc-life.jpg', className: 'max-h-12 md:max-h-14' },
  { name: 'Max Life', src: '/partners/max-life.svg', className: 'max-h-11 md:max-h-12' },
  { name: 'Star Health', src: '/partners/star-health.svg', className: 'max-h-12 md:max-h-14' },
  { name: 'Care Health', src: '/partners/care-health.png', className: 'max-h-12 md:max-h-14' },
  { name: 'Bajaj Allianz', src: '/partners/bajaj-allianz.svg', className: 'max-h-10 md:max-h-11' },
  { name: 'ACKO', src: '/partners/acko.svg', className: 'max-h-11 md:max-h-12' },
  { name: 'Digit', src: '/partners/digit.png', className: 'max-h-11 md:max-h-12' },
  { name: 'SBI Life', src: '/partners/sbi-life.png', className: 'max-h-11 md:max-h-13' },
  { name: 'Tata AIA', src: '/partners/tata-aia.png', className: 'max-h-11 md:max-h-13' },
  { name: 'Aditya Birla Health', src: '/partners/aditya-birla.png', className: 'max-h-11 md:max-h-13' },
  { name: 'LIC', src: '/partners/lic.png', className: 'max-h-11 md:max-h-13' },
];

export function PartnersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom' }
      });

      tl.fromTo('.section-eyebrow', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 })
        .fromTo('.section-title', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
        .fromTo('.partner-logo', 
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.06, duration: 0.4, ease: 'power2.out' },
          '-=0.15'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-14 md:py-20 px-6 md:px-[6vw] bg-saferaho-cloud">
      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-xl mx-auto mb-10 md:mb-12">
          <span className="section-eyebrow text-xs font-semibold uppercase tracking-[0.15em] text-saferaho-gold mb-3 flex items-center justify-center gap-2">
            <Handshake className="w-3.5 h-3.5" />
            Trusted Partnerships
          </span>
          <h2 className="section-title font-display text-2xl md:text-3xl lg:text-4xl text-saferaho-navy mb-3">
            We partner with India's most trusted insurers
          </h2>
          <p className="text-sm md:text-base text-saferaho-gray leading-relaxed">
            {partnerLogos.length}+ leading companies. One honest comparison.
          </p>
        </div>

        {/* Logos Grid */}
        <div ref={logosRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {partnerLogos.map((partner) => (
            <div
              key={partner.name}
              className="partner-logo group relative min-h-[92px] md:min-h-[108px] bg-white rounded-2xl px-4 md:px-5 py-4 flex items-center justify-center card-shadow border border-saferaho-navy/[0.04] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-saferaho-navy/[0.06]"
            >
              <img
                src={partner.src}
                alt={`${partner.name} logo`}
                className={`w-full h-auto object-contain ${partner.className} grayscale-[0.08] opacity-80 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
