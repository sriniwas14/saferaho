import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Shield, Car, Plane, ArrowRight, Sparkles } from 'lucide-react';
import { serviceCards } from '@/data/insurance';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  'Life Insurance': Heart,
  'Health Insurance': Shield,
  'Motor Insurance': Car,
  'Travel Insurance': Plane,
};

const cardMeta: Record<string, { stat: string; popular?: boolean }> = {
  'health-insurance': { stat: 'Coverage from ₹5L', popular: true },
  'life-insurance': { stat: 'Plans from ₹500/mo' },
  'motor-insurance': { stat: 'From ₹2,094/year' },
  'travel-insurance': { stat: 'From ₹300/trip' },
};

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom' }
      });

      tl.fromTo('.section-eyebrow', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 })
        .fromTo('.section-title', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
        .fromTo('.section-desc', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.25')
        .fromTo('.service-card', 
          { opacity: 0, y: 40, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out' },
          '-=0.2'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-16 md:py-24 px-6 md:px-[6vw] bg-saferaho-cloud">
      <div className="max-w-7xl mx-auto">
        {/* Title Block */}
        <div ref={titleRef} className="max-w-xl mb-10 md:mb-14">
          <span className="section-eyebrow eyebrow inline-flex items-center gap-2 mb-3">
            <Shield className="w-3.5 h-3.5 text-saferaho-gold" />
            Our Solutions
          </span>
          <h2 className="section-title font-display text-3xl md:text-4xl lg:text-5xl text-saferaho-navy mb-4">
            Insurance, simplified.
          </h2>
          <p className="section-desc text-base md:text-lg text-saferaho-gray leading-relaxed">
            Pick what matters most. We'll compare, explain, and help you buy—without spam.
          </p>
        </div>

        {/* Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {serviceCards.map((card) => {
            const Icon = iconMap[card.title] || Shield;
            const meta = cardMeta[card.id] || { stat: 'Get a quote' };
            const isPopular = meta.popular;

            return (
              <Link
                key={card.id}
                href={card.href}
                className={`service-card group relative bg-white rounded-[22px] p-6 card-shadow border transition-all duration-300 hover:-translate-y-1.5 hover:card-shadow-hover ${
                  isPopular 
                    ? 'border-amber-400/40 ring-1 ring-amber-400/10' 
                    : 'border-saferaho-navy/[0.04]'
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-2.5 right-5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                      <Sparkles className="w-3 h-3" />
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 ${
                  isPopular 
                    ? 'bg-amber-50 group-hover:bg-amber-100' 
                    : 'bg-saferaho-blue/8 group-hover:bg-saferaho-blue/15'
                }`}>
                  <Icon className={`w-6 h-6 transition-colors duration-300 ${
                    isPopular 
                      ? 'text-amber-600' 
                      : 'text-saferaho-blue'
                  }`} />
                </div>

                {/* Content */}
                <h3 className="font-display font-semibold text-lg text-saferaho-navy mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-saferaho-gray leading-relaxed mb-4">
                  {card.description}
                </p>

                {/* Stat */}
                <div className="text-xs font-mono font-semibold text-saferaho-navy/50 mb-4 pb-4 border-b border-saferaho-navy/[0.04]">
                  {meta.stat}
                </div>

                {/* CTA */}
                <span className={`inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all duration-300 ${
                  isPopular ? 'text-amber-600' : 'text-saferaho-blue'
                }`}>
                  {card.cta}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
