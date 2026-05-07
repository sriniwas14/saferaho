import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MessageCircle, MapPin, TrendingDown, Clock, ArrowRight } from 'lucide-react';
import { LeadForm } from '@/components/LeadForm';
import { siteConfig } from '@/data/site';

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const caseStudyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom' }
      });

      tl.fromTo('.cta-eyebrow', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 })
        .fromTo('.cta-title', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
        .fromTo('.cta-sub', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.25')
        .fromTo('.cta-case-study', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5 }, '-=0.15')
        .fromTo('.cta-contact', { opacity: 0, y: 12 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.4 }, '-=0.2')
        .fromTo('.cta-form-card', { opacity: 0, y: 30, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-16 md:py-24 px-6 md:px-[6vw] bg-saferaho-cloud">
      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left Content */}
          <div ref={contentRef} className="flex flex-col justify-center">
            
            {/* Eyebrow + Title */}
              <span className="cta-eyebrow text-xs font-semibold uppercase tracking-[0.15em] text-saferaho-gold mb-3 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              Free Consultation
            </span>
            
              <h2 className="cta-title font-display text-3xl md:text-4xl lg:text-5xl text-saferaho-navy mb-4 leading-tight">
                Ready to plan<br />your future?
              </h2>
              
              <p className="cta-sub text-base md:text-lg text-saferaho-gray leading-relaxed mb-8 max-w-md">
              Tell us what you need. We'll reply with a shortlist and a clear next step—usually within a few hours.
            </p>

            {/* Case Study */}
                <div ref={caseStudyRef} className="cta-case-study bg-white rounded-2xl p-6 card-shadow border border-saferaho-navy/[0.04] mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <TrendingDown className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-saferaho-navy font-semibold text-sm mb-1">Real savings, real family</h4>
                      <p className="text-saferaho-gray text-sm leading-relaxed">
                        Rahul saved <span className="text-saferaho-gold font-semibold">₹12,000/year</span> by switching to a better health plan. 
                        Same coverage, lower premium.
                      </p>
                    </div>
                  </div>
                </div>

            {/* Contact Details */}
                <div ref={contactRef} className="cta-contact space-y-3">
                  <a
                    href={`tel:${siteConfig.contact.phoneHref}`}
                    className="flex items-center gap-4 text-saferaho-gray hover:text-saferaho-navy transition-colors group"
                  >
                    <div className="w-10 h-10 bg-saferaho-navy/[0.04] rounded-lg flex items-center justify-center group-hover:bg-saferaho-navy/[0.08] transition-colors">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">{siteConfig.contact.phone}</span>
                  </a>

                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="flex items-center gap-4 text-saferaho-gray hover:text-saferaho-navy transition-colors group"
                  >
                    <div className="w-10 h-10 bg-saferaho-navy/[0.04] rounded-lg flex items-center justify-center group-hover:bg-saferaho-navy/[0.08] transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">{siteConfig.contact.email}</span>
                  </a>

                  <a
                    href={siteConfig.social.whatsapp}
                    className="flex items-center gap-4 text-saferaho-gray hover:text-saferaho-navy transition-colors group"
                  >
                    <div className="w-10 h-10 bg-saferaho-navy/[0.04] rounded-lg flex items-center justify-center group-hover:bg-saferaho-navy/[0.08] transition-colors">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">Chat on WhatsApp</span>
                  </a>

                  <div className="flex items-start gap-4 text-saferaho-gray">
                    <div className="w-10 h-10 bg-saferaho-navy/[0.04] rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="text-sm leading-relaxed">{siteConfig.contact.address}</span>
                  </div>
                </div>
          </div>

          {/* Right Form */}
          <div ref={formRef}>
            <div className="cta-form-card bg-white rounded-[28px] p-7 md:p-8 card-shadow-elevated border-t-4 border-t-amber-400">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display font-semibold text-xl text-saferaho-navy">
                    Get your free quote
                  </h3>
                  <p className="text-xs text-saferaho-gray mt-1">
                    No spam. No obligation. Just clarity.
                  </p>
                </div>
                <div className="trust-badge">
                  <Clock className="w-3 h-3" />
                  Response in 24h
                </div>
              </div>
              
              <LeadForm variant="default" showSource={false} />
              
              {/* WhatsApp Alternative */}
              <div className="mt-5 pt-5 border-t border-saferaho-navy/[0.06]">
                <p className="text-xs text-saferaho-gray text-center mb-3">Or reach us directly</p>
                <a
                  href={siteConfig.social.whatsapp}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  Message on WhatsApp
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
