import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MessageCircle, Check, Plus } from 'lucide-react';
import type { InsurancePlan } from '@/data/insurance';


gsap.registerPlugin(ScrollTrigger);

interface InsuranceDetailSectionProps {
  plan: InsurancePlan;
  imagePosition?: 'left' | 'right';
}

export function InsuranceDetailSection({ plan, imagePosition = 'right' }: InsuranceDetailSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const content = contentRef.current;
    const image = imageRef.current;

    if (!section || !card || !content || !image) return;

    const ctx = gsap.context(() => {
      // Card entrance
      gsap.fromTo(card,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Label animation
      const label = content.querySelector('.section-label');
      gsap.fromTo(label,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Headline animation
      const headline = content.querySelector('.section-headline');
      gsap.fromTo(headline,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Features animation
      const features = content.querySelectorAll('.feature-item');
      gsap.fromTo(features,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Image animation
      const imageX = imagePosition === 'left' ? -80 : 80;
      gsap.fromTo(image,
        { opacity: 0, x: imageX, scale: 1.03 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: image,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Plus icon animation
      const plusIcon = section.querySelector('.plus-icon');
      gsap.fromTo(plusIcon,
        { opacity: 0, scale: 0.6, rotate: -15 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, [imagePosition]);

  const isImageLeft = imagePosition === 'left';

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-12 md:py-16 px-6 md:px-[6vw] plus-grid"
    >
      {/* Decorative Plus Icon */}
      <div 
        className={`plus-icon absolute top-16 ${isImageLeft ? 'left-[4vw]' : 'right-[4vw]'} w-11 h-11 bg-saferaho-blue/10 rounded-xl flex items-center justify-center hidden lg:flex`}
      >
        <Plus className="w-5 h-5 text-saferaho-blue" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div
          ref={cardRef}
          className="card-white overflow-hidden"
        >
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-6 md:p-10 lg:p-12 ${isImageLeft ? '' : ''}`}>
            {/* Image - conditional order */}
            <div
              ref={imageRef}
              className={`relative ${isImageLeft ? 'order-1' : 'order-1 lg:order-2'}`}
            >
              <div className="relative aspect-[4/5] max-h-[500px] rounded-[22px] overflow-hidden">
                <img
                  src={plan.image}
                  alt={plan.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-saferaho-navy/10 to-transparent" />
              </div>
            </div>

            {/* Content */}
            <div
              ref={contentRef}
              className={`flex flex-col justify-center ${isImageLeft ? 'order-2' : 'order-2 lg:order-1'}`}
            >
              {/* Label */}
              <span className="section-label font-label text-xs uppercase tracking-[0.12em] text-saferaho-blue mb-3">
                {plan.title}
              </span>

              {/* Headline */}
              <h2 className="section-headline font-display text-3xl md:text-4xl lg:text-5xl text-saferaho-navy leading-tight mb-4">
                {plan.subtitle}
              </h2>

              {/* Description */}
              <p className="text-base text-saferaho-gray leading-relaxed mb-6">
                {plan.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="feature-item flex items-start gap-3">
                    <div className="w-5 h-5 bg-saferaho-blue/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-saferaho-blue" />
                    </div>
                    <span className="text-sm text-saferaho-navy">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/contact"
                  className="btn-primary flex items-center justify-center gap-2"
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/918860077551"
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  {plan.secondaryCta}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
