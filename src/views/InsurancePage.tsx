'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MessageCircle, Check, Shield, Heart, Car, Plane } from 'lucide-react';
import { insurancePlans } from '@/data/insurance';
import { siteConfig } from '@/data/site';
import { LeadForm } from '@/components/LeadForm';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  life: Heart,
  health: Shield,
  motor: Car,
  travel: Plane,
};

interface InsurancePageProps {
  type: string;
}

export function InsurancePage({ type }: InsurancePageProps) {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const plan = insurancePlans.find(p => p.id === type);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  useEffect(() => {
    const hero = heroRef.current;
    const content = contentRef.current;
    const form = formRef.current;

    if (!hero || !content || !form) return;

    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(hero.querySelector('.hero-content'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        }
      );

      // Content animation
      gsap.fromTo(content.querySelectorAll('.animate-item'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Form animation
      gsap.fromTo(form,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: form,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, hero);

    return () => ctx.revert();
  }, [type]);

  if (!plan) return null;

  const Icon = iconMap[plan.id] || Shield;

  return (
    <main className="relative pt-20">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative w-full min-h-[60vh] flex items-center plus-grid px-6 md:px-[6vw] py-16 md:py-24"
      >
        <div className="hero-content max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-saferaho-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Icon className="w-8 h-8 text-saferaho-blue" />
          </div>

          {/* Label */}
          <span className="font-label text-xs uppercase tracking-[0.12em] text-saferaho-gray mb-4 block">
            {siteConfig.name} Insurance
          </span>

          {/* Title */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-saferaho-navy leading-tight mb-4">
            {plan.title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-saferaho-blue font-display mb-6">
            {plan.subtitle}
          </p>

          {/* Description */}
          <p className="text-base md:text-lg text-saferaho-gray leading-relaxed max-w-2xl mx-auto mb-8">
            {plan.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center justify-center gap-2"
            >
              {plan.cta}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              {plan.secondaryCta}
            </a>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative w-full py-16 md:py-24 px-6 md:px-[6vw]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
            {/* Main Content */}
            <div ref={contentRef} className="lg:col-span-2">
              {/* Image */}
              <div className="animate-item relative aspect-video rounded-[22px] overflow-hidden mb-10">
                <img
                  src={plan.image}
                  alt={plan.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-saferaho-navy/10 to-transparent" />
              </div>

              {/* Features */}
              <div className="animate-item">
                <h2 className="font-display text-2xl md:text-3xl text-saferaho-navy mb-6">
                  What you get
                </h2>
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-saferaho-blue/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-saferaho-blue" />
                      </div>
                      <span className="text-base text-saferaho-navy">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Additional Info */}
              <div className="animate-item mt-10 p-6 bg-saferaho-blue/5 rounded-[18px] border border-saferaho-blue/10">
                <h3 className="font-display font-semibold text-lg text-saferaho-navy mb-3">
                  Why choose Saferaho?
                </h3>
                <p className="text-sm text-saferaho-gray leading-relaxed">
                  We compare plans from top insurers, explain the fine print in simple language, 
                  and help you make an informed decision. No spam, no pressure—just honest guidance 
                  to help you find the right coverage.
                </p>
              </div>
            </div>

            {/* Sidebar Form */}
            <div ref={formRef} className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-[22px] p-6 card-shadow border border-saferaho-navy/5">
                <h3 className="font-display font-semibold text-xl text-saferaho-navy mb-2">
                  Get a free quote
                </h3>
                <p className="text-sm text-saferaho-gray mb-6">
                  Fill in your details and we'll get back to you within 24 hours.
                </p>
                <LeadForm variant="compact" showSource={true} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Insurance */}
      <section className="relative w-full py-16 md:py-20 px-6 md:px-[6vw] plus-grid">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl text-saferaho-navy text-center mb-10">
            Explore other insurance options
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {insurancePlans
              .filter(p => p.id !== plan.id)
              .map(relatedPlan => {
                const RelatedIcon = iconMap[relatedPlan.id] || Shield;
                return (
                  <Link
                    key={relatedPlan.id}
                    href={`/${relatedPlan.id}-insurance`}
                    className="group bg-white rounded-[18px] p-5 card-shadow border border-saferaho-navy/5 hover:-translate-y-1 hover:card-shadow-hover transition-all duration-300"
                  >
                    <div className="w-10 h-10 bg-saferaho-blue/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-saferaho-blue/20 transition-colors">
                      <RelatedIcon className="w-5 h-5 text-saferaho-blue" />
                    </div>
                    <h3 className="font-display font-semibold text-base text-saferaho-navy mb-1">
                      {relatedPlan.title}
                    </h3>
                    <p className="text-xs text-saferaho-gray line-clamp-2">
                      {relatedPlan.description}
                    </p>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>
    </main>
  );
}
