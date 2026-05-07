import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileCheck, UserCheck, HeartHandshake, Quote } from 'lucide-react';
import { trustPillars } from '@/data/site';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  'Clear coverage & exclusions': FileCheck,
  'Personalized plan suggestions': UserCheck,
  'Honest guidance': HeartHandshake,
};

const pillarStats = [
  { value: '98%', label: 'Claim success rate' },
  { value: '3x', label: 'Plans compared per client' },
  { value: '0', label: 'Spam emails sent. Ever.' },
];

export function WhySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom' }
      });

      tl.fromTo('.section-eyebrow', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 })
        .fromTo('.section-title', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
        .fromTo('.section-desc', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.25')
        .fromTo('.pillar-card', 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.12, duration: 0.5, ease: 'power2.out' },
          '-=0.1'
        )
        .fromTo('.pillar-icon', 
          { scale: 0.5, rotate: -15 },
          { scale: 1, rotate: 0, stagger: 0.1, duration: 0.5, ease: 'back.out(1.7)' },
          '-=0.4'
        )
        .fromTo('.pillar-number', 
          { opacity: 0 },
          { opacity: 1, stagger: 0.1, duration: 0.4 },
          '-=0.3'
        )
        .fromTo('.testimonial-card', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.1');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-16 md:py-24 px-6 md:px-[6vw]">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div ref={titleRef} className="max-w-xl mb-10 md:mb-14">
          <span className="section-eyebrow eyebrow inline-flex items-center gap-2 mb-3">
            <HeartHandshake className="w-3.5 h-3.5 text-saferaho-gold" />
            Why Saferaho
          </span>
          <h2 className="section-title font-display text-3xl md:text-4xl lg:text-5xl text-saferaho-navy mb-4">
            We don't sell. We explain.
          </h2>
          <p className="section-desc text-base md:text-lg text-saferaho-gray leading-relaxed">
            So you choose with confidence—not because someone pushed a plan.
          </p>
        </div>

        {/* Pillars Grid */}
        <div ref={pillarsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {trustPillars.map((pillar, index) => {
            const Icon = iconMap[pillar.title] || HeartHandshake;
            const stat = pillarStats[index];

            return (
              <div
                key={pillar.title}
                className="pillar-card group relative bg-white rounded-[24px] p-8 card-shadow border border-saferaho-navy/[0.04] hover:-translate-y-1 hover:card-shadow-hover transition-all duration-300"
              >
                {/* Large Number Background */}
                <div className="pillar-number absolute -top-3 -right-2 font-display text-8xl font-bold text-saferaho-navy/[0.02] select-none pointer-events-none leading-none">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Icon */}
                <div className="pillar-icon w-14 h-14 bg-saferaho-blue/8 rounded-xl flex items-center justify-center mb-6 group-hover:bg-saferaho-blue/12 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-saferaho-blue" />
                </div>

                {/* Content */}
                <h3 className="font-display font-semibold text-xl text-saferaho-navy mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-saferaho-gray leading-relaxed mb-6">
                  {pillar.description}
                </p>

                {/* Stat */}
                <div className="pt-5 border-t border-saferaho-navy/[0.04]">
                  <div className="stat-number text-2xl md:text-3xl text-saferaho-blue">{stat.value}</div>
                  <div className="text-xs text-saferaho-gray mt-1 font-medium">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mini Testimonial */}
        <div className="testimonial-card relative max-w-3xl mx-auto overflow-hidden rounded-[28px] border border-saferaho-navy/[0.06] bg-white px-6 py-7 md:px-8 md:py-8 card-shadow">
          <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-amber-400 via-amber-500 to-saferaho-blue" />
          <Quote className="absolute right-6 top-6 h-16 w-16 text-saferaho-navy/[0.05]" />

          <div className="relative pl-5 md:pl-6">
            <span className="eyebrow mb-3 inline-flex items-center gap-2 text-saferaho-gold">
              <HeartHandshake className="h-3.5 w-3.5" />
              Client perspective
            </span>

            <blockquote className="max-w-2xl font-display text-xl leading-snug text-saferaho-navy md:text-[1.7rem] md:leading-[1.35]">
              “Saferaho helped me save <span className="text-saferaho-gold">₹12,000/year</span> by switching to a better plan. They didn&apos;t try to upsell, they just showed me the facts.”
            </blockquote>

            <div className="mt-5 flex items-center gap-3 border-t border-saferaho-navy/[0.06] pt-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-sm font-bold text-white shadow-sm">
                R
              </div>
              <div>
                <p className="text-sm font-semibold text-saferaho-navy">Rahul Mehta</p>
                <p className="text-xs text-saferaho-gray">Health Insurance, Noida</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
