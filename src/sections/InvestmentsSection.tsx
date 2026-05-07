import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MessageCircle, TrendingUp, Check, Plus } from 'lucide-react';
import { investmentPlans } from '@/data/investments';

gsap.registerPlugin(ScrollTrigger);

export function InvestmentsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headerTl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom' }
      });

      headerTl
        .fromTo('.section-eyebrow', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 })
        .fromTo('.section-title', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
        .fromTo('.section-desc', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.25');

      const blocks = document.querySelectorAll('.investment-block');
      blocks.forEach((block) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: block, start: 'top bottom' }
        });

        tl.fromTo(block.querySelector('.card-white'),
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
        )
        .fromTo(block.querySelector('.section-label'),
          { opacity: 0, x: -16 },
          { opacity: 1, x: 0, duration: 0.1 },
          '-=0.3'
        )
        .fromTo(block.querySelector('.section-headline'),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.2 },
          '-=0.25'
        )
        .fromTo(block.querySelector('.section-desc'),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.2 },
          '-=0.2'
        )
        .fromTo(block.querySelectorAll('.feature-item'),
          { opacity: 0, x: -16 },
          { opacity: 1, x: 0, stagger: 0.08, duration: 0.4 },
          '-=0.15'
        )
        .fromTo(block.querySelector('.cta-buttons'),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.2 },
          '-=0.1'
        )
        .fromTo(block.querySelector('.block-image'),
          { opacity: 0, scale: 1.03 },
          { opacity: 1, scale: 1, duration: 0.2 },
          '-=0.5'
        )
        .fromTo(block.querySelector('.plus-icon'),
          { opacity: 0, scale: 0.6, rotate: -15 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.2,
            ease: 'back.out(1.7)',
          },
          '-=0.3'
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-12 md:py-16 px-6 md:px-[6vw] bg-saferaho-cloud">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-10 md:mb-14 text-center">
        <span className="section-eyebrow eyebrow inline-flex items-center gap-2 mb-3">
          <TrendingUp className="w-3.5 h-3.5 text-saferaho-gold" />
          Investment Goals
        </span>
        <h2 className="section-title font-display text-3xl md:text-4xl lg:text-5xl text-saferaho-navy mb-4">
          Invest in milestones.
        </h2>
        <p className="section-desc text-base md:text-lg text-saferaho-gray leading-relaxed">
          Retirement and child goals, built with disciplined savings and the right funds.
          Start early—time is your greatest advantage.
        </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
        {investmentPlans.map((plan, index) => {
          const isImageLeft = index % 2 === 0;
          const secondaryCta = index === 0 ? "Talk to an advisor" : "See investment options";

          return (
            <div key={plan.id} className="investment-block relative">
              {/* Decorative Plus Icon */}
              <div
                className={`plus-icon absolute top-16 ${isImageLeft ? 'left-[4vw]' : 'right-[4vw]'} w-11 h-11 bg-saferaho-blue/8 rounded-xl flex items-center justify-center hidden lg:flex`}
              >
                <Plus className="w-5 h-5 text-saferaho-blue" />
              </div>

              <div className="card-white overflow-hidden">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-6 md:p-10 lg:p-12`}>
                  {/* Image */}
                  <div
                    className={`relative ${isImageLeft ? 'order-1' : 'order-1 lg:order-2 ml-auto'}`}
                  >
                    <div className="block-image relative aspect-[4/5] max-h-[500px] rounded-[22px] overflow-hidden">
                      <img
                        src={plan.image}
                        alt={plan.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-saferaho-navy/15 to-transparent" />
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`flex flex-col justify-center ${isImageLeft ? 'order-2' : 'order-2 lg:order-1'}`}
                  >
                    <span className="section-label font-label text-xs uppercase tracking-[0.15em] text-saferaho-blue font-semibold mb-3">
                      {plan.title}
                    </span>

                    <h2 className="section-headline font-display text-3xl md:text-4xl lg:text-5xl text-saferaho-navy leading-tight mb-4">
                      {plan.subtitle}
                    </h2>

                    <p className="section-desc text-base text-saferaho-gray leading-relaxed mb-6">
                      {plan.description}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="feature-item flex items-start gap-3"
                        >
                          <div className="w-5 h-5 bg-emerald-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-emerald-600" />
                          </div>
                          <span className="text-sm text-saferaho-navy font-medium">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="cta-buttons flex flex-col sm:flex-row gap-3">
                      <a
                        href={`/investments/${plan.id}`}
                        className="btn-primary inline-flex items-center justify-center gap-2"
                      >
                        {plan.cta}
                        <ArrowRight className="w-4 h-4" />
                      </a>
                      <a
                        href="https://wa.me/918860077551"
                        className="btn-secondary text-[#ff7112] border-[#ff7112] inline-flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        {secondaryCta}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
