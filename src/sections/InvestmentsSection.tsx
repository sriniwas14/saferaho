import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, TrendingUp, GraduationCap } from 'lucide-react';
import { investmentCards } from '@/data/investments';


gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  'retirement': TrendingUp,
  'child': GraduationCap,
};

export function InvestmentsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!section || !header || !cards) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(header,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Cards animation
      const cardElements = cards.querySelectorAll('.investment-card');
      gsap.fromTo(cardElements,
        { opacity: 0, y: 70, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Images inside cards
      const images = cards.querySelectorAll('.card-image');
      gsap.fromTo(images,
        { opacity: 0, scale: 1.04 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 80%',
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
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-saferaho-navy mb-4">
            Invest in milestones.
          </h2>
          <p className="text-base md:text-lg text-saferaho-gray leading-relaxed">
            Retirement and child goals, built with disciplined savings and the right funds.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {investmentCards.map((card) => {
            const Icon = iconMap[card.id] || TrendingUp;
            return (
              <div
                key={card.id}
                className="investment-card bg-white rounded-[26px] overflow-hidden card-shadow border border-saferaho-navy/5 hover:-translate-y-1.5 hover:card-shadow-hover transition-all duration-300"
              >
                {/* Image */}
                <div className="card-image relative h-48 md:h-56 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-saferaho-navy/20 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-saferaho-blue/10 rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-saferaho-blue" />
                    </div>
                    <h3 className="font-display font-semibold text-xl text-saferaho-navy">
                      {card.title}
                    </h3>
                  </div>

                  <p className="text-sm text-saferaho-gray leading-relaxed mb-5">
                    {card.description}
                  </p>

                  <a
                    href={card.href}
                    className="inline-flex items-center gap-2 text-sm font-medium text-saferaho-blue hover:gap-3 transition-all"
                  >
                    {card.cta}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
