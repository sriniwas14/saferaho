import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { partners } from '@/data/site';

gsap.registerPlugin(ScrollTrigger);

export function PartnersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const logos = logosRef.current;

    if (!section || !header || !logos) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(header,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Logos animation
      const logoElements = logos.querySelectorAll('.partner-logo');
      gsap.fromTo(logoElements,
        { opacity: 0, y: 30, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: logos,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-12 md:py-20 px-6 md:px-[6vw] plus-grid"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-xl mx-auto mb-8 md:mb-12">
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-saferaho-navy mb-3">
            Backed by trusted insurers.
          </h2>
          <p className="text-sm md:text-base text-saferaho-gray leading-relaxed">
            We compare plans across leading companies so you don't have to hop between sites.
          </p>
        </div>

        {/* Logos Grid */}
        <div
          ref={logosRef}
          className="flex flex-wrap justify-center gap-4 md:gap-6"
        >
          {partners.map((partner) => (
            <div
              key={partner}
              className="partner-logo w-[120px] md:w-[140px] h-12 md:h-14 bg-white rounded-xl flex items-center justify-center card-shadow border border-saferaho-navy/5 grayscale hover:grayscale-0 transition-all duration-300 hover:-translate-y-0.5"
            >
              <span className="text-xs md:text-sm font-medium text-saferaho-navy/70 text-center px-2">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
