import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Shield, Car, Plane, ArrowRight } from 'lucide-react';
import { serviceCards } from '@/data/insurance';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  'Life Insurance': Heart,
  'Health Insurance': Shield,
  'Motor Insurance': Car,
  'Travel Insurance': Plane,
};

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current;

    if (!section || !title || !cards) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(title,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Cards animation
      const cardElements = cards.querySelectorAll('.service-card');
      gsap.fromTo(cardElements,
        { opacity: 0, y: 60, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cards,
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
      className="relative w-full py-16 md:py-24 px-6 md:px-[6vw] plus-grid"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title Block */}
        <div ref={titleRef} className="max-w-xl mb-10 md:mb-14">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-saferaho-navy mb-4">
            Insurance, simplified.
          </h2>
          <p className="text-base md:text-lg text-saferaho-gray leading-relaxed">
            Pick what matters most. We'll compare, explain, and help you buy—without spam.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
        >
          {serviceCards.map((card) => {
            const Icon = iconMap[card.title] || Shield;
            return (
              <Link
                key={card.id}
                href={card.href}
                className="service-card group bg-white rounded-[22px] p-6 card-shadow border border-saferaho-navy/5 hover:-translate-y-1.5 hover:card-shadow-hover transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-saferaho-blue/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-saferaho-blue/20 transition-colors">
                  <Icon className="w-6 h-6 text-saferaho-blue" />
                </div>

                {/* Content */}
                <h3 className="font-display font-semibold text-lg text-saferaho-navy mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-saferaho-gray leading-relaxed mb-4">
                  {card.description}
                </p>

                {/* CTA */}
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-saferaho-blue group-hover:gap-2.5 transition-all">
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
