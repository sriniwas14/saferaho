'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MessageCircle, MapPin, Clock } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { LeadForm } from '@/components/LeadForm';

gsap.registerPlugin(ScrollTrigger);

export function ContactPage() {
  const heroRef = useRef<HTMLElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const info = infoRef.current;
    const form = formRef.current;

    if (!hero || !info || !form) return;

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

      const infoItems = info.querySelectorAll('.info-card');
      gsap.fromTo(infoItems,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: info,
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
        className="relative w-full min-h-[40vh] flex items-center plus-grid px-6 md:px-[6vw] py-16 md:py-20"
      >
        <div className="hero-content max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-saferaho-navy leading-tight mb-4">
            Get in touch
          </h1>
          <p className="text-base md:text-lg text-saferaho-gray leading-relaxed max-w-2xl mx-auto">
            Have questions about insurance or investments? We're here to help. 
            Reach out to us through any of the channels below.
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="relative w-full py-16 md:py-24 px-6 md:px-[6vw]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Contact Info */}
            <div ref={infoRef}>
              <h2 className="font-display text-2xl md:text-3xl text-saferaho-navy mb-6">
                Contact Information
              </h2>
              <p className="text-base text-saferaho-gray leading-relaxed mb-8">
                Our team is available Monday to Saturday, 9 AM to 7 PM. 
                We typically respond within 24 hours.
              </p>

              <div className="space-y-4">
                <a
                  href={`tel:${siteConfig.contact.phoneHref}`}
                  className="info-card flex items-center gap-4 p-5 bg-white rounded-[18px] card-shadow border border-saferaho-navy/5 hover:-translate-y-0.5 hover:card-shadow-hover transition-all group"
                >
                  <div className="w-12 h-12 bg-saferaho-blue/10 rounded-xl flex items-center justify-center group-hover:bg-saferaho-blue/20 transition-colors">
                    <Phone className="w-5 h-5 text-saferaho-blue" />
                  </div>
                  <div>
                    <span className="block text-xs text-saferaho-gray mb-0.5">Phone</span>
                    <span className="font-medium text-saferaho-navy">{siteConfig.contact.phone}</span>
                  </div>
                </a>

                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="info-card flex items-center gap-4 p-5 bg-white rounded-[18px] card-shadow border border-saferaho-navy/5 hover:-translate-y-0.5 hover:card-shadow-hover transition-all group"
                >
                  <div className="w-12 h-12 bg-saferaho-blue/10 rounded-xl flex items-center justify-center group-hover:bg-saferaho-blue/20 transition-colors">
                    <Mail className="w-5 h-5 text-saferaho-blue" />
                  </div>
                  <div>
                    <span className="block text-xs text-saferaho-gray mb-0.5">Email</span>
                    <span className="font-medium text-saferaho-navy">{siteConfig.contact.email}</span>
                  </div>
                </a>

                <a
                  href={siteConfig.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="info-card flex items-center gap-4 p-5 bg-white rounded-[18px] card-shadow border border-saferaho-navy/5 hover:-translate-y-0.5 hover:card-shadow-hover transition-all group"
                >
                  <div className="w-12 h-12 bg-saferaho-blue/10 rounded-xl flex items-center justify-center group-hover:bg-saferaho-blue/20 transition-colors">
                    <MessageCircle className="w-5 h-5 text-saferaho-blue" />
                  </div>
                  <div>
                    <span className="block text-xs text-saferaho-gray mb-0.5">WhatsApp</span>
                    <span className="font-medium text-saferaho-navy">Chat with us</span>
                  </div>
                </a>

                <div className="info-card flex items-start gap-4 p-5 bg-white rounded-[18px] card-shadow border border-saferaho-navy/5">
                  <div className="w-12 h-12 bg-saferaho-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-saferaho-blue" />
                  </div>
                  <div>
                    <span className="block text-xs text-saferaho-gray mb-0.5">Address</span>
                    <span className="font-medium text-saferaho-navy leading-relaxed">{siteConfig.contact.address}</span>
                  </div>
                </div>

                <div className="info-card flex items-start gap-4 p-5 bg-white rounded-[18px] card-shadow border border-saferaho-navy/5">
                  <div className="w-12 h-12 bg-saferaho-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-saferaho-blue" />
                  </div>
                  <div>
                    <span className="block text-xs text-saferaho-gray mb-0.5">Working Hours</span>
                    <span className="font-medium text-saferaho-navy">Monday - Saturday: 9 AM - 7 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div ref={formRef}>
              <div className="bg-white rounded-[22px] p-6 md:p-8 card-shadow border border-saferaho-navy/5">
                <h3 className="font-display font-semibold text-xl text-saferaho-navy mb-2">
                  Send us a message
                </h3>
                <p className="text-sm text-saferaho-gray mb-6">
                  Fill in your details and we'll get back to you as soon as possible.
                </p>
                <LeadForm variant="default" showSource={true} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative w-full py-16 md:py-20 px-6 md:px-[6vw] plus-grid">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-[22px] overflow-hidden card-shadow border border-saferaho-navy/5">
            <div className="aspect-video md:aspect-[21/9] bg-saferaho-cloud flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="w-12 h-12 text-saferaho-blue mx-auto mb-4" />
                <h3 className="font-display font-semibold text-lg text-saferaho-navy mb-2">
                  {siteConfig.name}
                </h3>
                <p className="text-sm text-saferaho-gray max-w-md">
                  {siteConfig.contact.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
