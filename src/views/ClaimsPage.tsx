'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MessageCircle, FileText, Clock, CheckCircle, Shield } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { LeadForm } from '@/components/LeadForm';

gsap.registerPlugin(ScrollTrigger);

const claimSteps = [
  {
    icon: FileText,
    title: 'Report the claim',
    description: 'Call us or WhatsApp your policy details and incident information.',
  },
  {
    icon: Clock,
    title: 'We guide you',
    description: 'Our team explains the documents needed and next steps clearly.',
  },
  {
    icon: CheckCircle,
    title: 'Track progress',
    description: 'We follow up with the insurer and keep you updated throughout.',
  },
  {
    icon: Shield,
    title: 'Get resolution',
    description: 'We help ensure fair and timely settlement of your claim.',
  },
];

export function ClaimsPage() {
  const heroRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const steps = stepsRef.current;
    const form = formRef.current;

    if (!hero || !steps || !form) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(hero.querySelector('.hero-content'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        }
      );

      const stepElements = steps.querySelectorAll('.step-card');
      gsap.fromTo(stepElements,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: steps,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );

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
  }, []);

  return (
    <main className="relative pt-20">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative w-full min-h-[50vh] flex items-center plus-grid px-6 md:px-[6vw] py-16 md:py-24"
      >
        <div className="hero-content max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-saferaho-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-saferaho-blue" />
          </div>

          <span className="font-label text-xs uppercase tracking-[0.12em] text-saferaho-gray mb-4 block">
            {siteConfig.name} Support
          </span>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-saferaho-navy leading-tight mb-4">
            Claims Helpdesk
          </h1>

          <p className="text-base md:text-lg text-saferaho-gray leading-relaxed max-w-2xl mx-auto mb-8">
            Facing an issue with your claim? We're here to help you navigate the process 
            and ensure you get the support you deserve.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`tel:${siteConfig.contact.phoneHref}`}
              className="btn-primary flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call us now
            </a>
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp us
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative w-full py-16 md:py-24 px-6 md:px-[6vw]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-saferaho-navy mb-4">
              How claim support works
            </h2>
            <p className="text-base text-saferaho-gray">
              Simple, step-by-step assistance to help you through the claims process.
            </p>
          </div>

          <div ref={stepsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {claimSteps.map((step, index) => (
              <div
                key={step.title}
                className="step-card bg-white rounded-[18px] p-6 card-shadow border border-saferaho-navy/5 text-center"
              >
                <div className="w-12 h-12 bg-saferaho-blue/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-6 h-6 text-saferaho-blue" />
                </div>
                <div className="w-6 h-6 bg-saferaho-blue rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>
                <h3 className="font-display font-semibold text-base text-saferaho-navy mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-saferaho-gray leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Form */}
      <section className="relative w-full py-16 md:py-24 px-6 md:px-[6vw] plus-grid">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-saferaho-navy mb-6">
                Get in touch
              </h2>
              <p className="text-base text-saferaho-gray leading-relaxed mb-8">
                Have a claim-related query? Reach out to us through any of these channels. 
                Our team is available Monday to Saturday, 9 AM to 7 PM.
              </p>

              <div className="space-y-4">
                <a
                  href={`tel:${siteConfig.contact.phoneHref}`}
                  className="flex items-center gap-4 p-4 bg-white rounded-[18px] card-shadow border border-saferaho-navy/5 hover:-translate-y-0.5 hover:card-shadow-hover transition-all group"
                >
                  <div className="w-12 h-12 bg-saferaho-blue/10 rounded-xl flex items-center justify-center group-hover:bg-saferaho-blue/20 transition-colors">
                    <Phone className="w-5 h-5 text-saferaho-blue" />
                  </div>
                  <div>
                    <span className="block text-xs text-saferaho-gray mb-0.5">Call us</span>
                    <span className="font-medium text-saferaho-navy">{siteConfig.contact.phone}</span>
                  </div>
                </a>

                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-4 p-4 bg-white rounded-[18px] card-shadow border border-saferaho-navy/5 hover:-translate-y-0.5 hover:card-shadow-hover transition-all group"
                >
                  <div className="w-12 h-12 bg-saferaho-blue/10 rounded-xl flex items-center justify-center group-hover:bg-saferaho-blue/20 transition-colors">
                    <Mail className="w-5 h-5 text-saferaho-blue" />
                  </div>
                  <div>
                    <span className="block text-xs text-saferaho-gray mb-0.5">Email us</span>
                    <span className="font-medium text-saferaho-navy">{siteConfig.contact.email}</span>
                  </div>
                </a>

                <a
                  href={siteConfig.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white rounded-[18px] card-shadow border border-saferaho-navy/5 hover:-translate-y-0.5 hover:card-shadow-hover transition-all group"
                >
                  <div className="w-12 h-12 bg-saferaho-blue/10 rounded-xl flex items-center justify-center group-hover:bg-saferaho-blue/20 transition-colors">
                    <MessageCircle className="w-5 h-5 text-saferaho-blue" />
                  </div>
                  <div>
                    <span className="block text-xs text-saferaho-gray mb-0.5">WhatsApp</span>
                    <span className="font-medium text-saferaho-navy">Chat with us</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Form */}
            <div ref={formRef}>
              <div className="bg-white rounded-[22px] p-6 md:p-8 card-shadow border border-saferaho-navy/5">
                <h3 className="font-display font-semibold text-xl text-saferaho-navy mb-2">
                  Submit a claim query
                </h3>
                <p className="text-sm text-saferaho-gray mb-6">
                  Fill in your details and we'll get back to you as soon as possible.
                </p>
                <LeadForm variant="default" showSource={false} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative w-full py-16 md:py-20 px-6 md:px-[6vw]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl text-saferaho-navy text-center mb-10">
            Frequently asked questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: 'What documents do I need for a claim?',
                a: 'Documents vary by claim type. Generally, you need your policy document, ID proof, and claim-specific documents (medical bills for health, FIR for motor theft, etc.). We guide you through exactly what\'s needed.',
              },
              {
                q: 'How long does claim settlement take?',
                a: 'It depends on the claim type and complexity. Health claims typically take 15-30 days, while motor claims can be settled in 7-15 days. We follow up regularly to ensure timely processing.',
              },
              {
                q: 'Can you help with rejected claims?',
                a: 'Yes, we review rejection reasons and help you understand your options. In many cases, claims can be re-submitted with additional documentation or clarification.',
              },
              {
                q: 'Is there a charge for claim assistance?',
                a: 'No, our claim assistance is completely free for all Saferaho customers. We\'re here to help you get the support you deserve.',
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-[18px] p-5 md:p-6 card-shadow border border-saferaho-navy/5"
              >
                <h3 className="font-display font-semibold text-base text-saferaho-navy mb-2">
                  {faq.q}
                </h3>
                <p className="text-sm text-saferaho-gray leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
