import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileCheck, UserCheck, HeartHandshake } from 'lucide-react';
import { trustPillars } from '@/data/site';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  'Clear coverage & exclusions': FileCheck,
  'Personalized plan suggestions': UserCheck,
  'Honest guidance': HeartHandshake,
};

export function WhySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const pillars = pillarsRef.current;

    if (!section || !title || !pillars) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(title,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Pillars animation
      const pillarElements = pillars.querySelectorAll('.pillar-row');
      gsap.fromTo(pillarElements,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: pillars,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Icon chips animation
      const iconChips = pillars.querySelectorAll('.icon-chip');
      gsap.fromTo(iconChips,
        { scale: 0.7, rotate: -10 },
        {
          scale: 1,
          rotate: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: pillars,
            start: 'top 72%',
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
      className="relative w-full py-16 md:py-24 px-6 md:px-[6vw] plus-grid"
    >
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div ref={titleRef} className="max-w-xl mb-10 md:mb-12">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-saferaho-navy mb-4">
            Why Saferaho?
          </h2>
          <p className="text-base md:text-lg text-saferaho-gray leading-relaxed">
            We don't sell. We explain—so you choose with confidence.
          </p>
        </div>

        {/* Pillars */}
        <div ref={pillarsRef} className="space-y-4 md:space-y-5">
          {trustPillars.map((pillar) => {
            const Icon = iconMap[pillar.title] || HeartHandshake;
            return (
              <div
                key={pillar.title}
                className="pillar-row bg-white rounded-[18px] p-5 md:p-6 card-shadow border border-saferaho-navy/5 flex items-start gap-4 md:gap-5"
              >
                {/* Icon Chip */}
                <div className="icon-chip w-12 h-12 md:w-14 md:h-14 bg-saferaho-blue rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <h3 className="font-display font-semibold text-lg md:text-xl text-saferaho-navy mb-1">
                    {pillar.title}
                  </h3>
                  <p className="text-sm md:text-base text-saferaho-gray leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
