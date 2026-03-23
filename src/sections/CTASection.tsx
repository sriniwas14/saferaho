import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MessageCircle, MapPin } from 'lucide-react';
import { LeadForm } from '@/components/LeadForm';
import { siteConfig } from '@/data/site';

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const form = formRef.current;
    const contact = contactRef.current;

    if (!section || !content || !form || !contact) return;

    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(content,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Form animation
      gsap.fromTo(form,
        { opacity: 0, x: 40, y: 30 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Contact details animation
      const contactItems = contact.querySelectorAll('.contact-item');
      gsap.fromTo(contactItems,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contact,
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
      className="relative w-full py-16 md:py-24 px-6 md:px-[6vw] bg-saferaho-navy"
    >
      {/* Subtle plus grid */}
      <div 
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M20 0v40M0 20h40' stroke='%23ffffff' stroke-width='1'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left Content */}
          <div ref={contentRef} className="flex flex-col justify-center">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-4">
              Ready to plan?
            </h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8">
              Tell us what you need. We'll reply with a shortlist and a clear next step—usually within a few hours.
            </p>

            {/* Contact Details */}
            <div ref={contactRef} className="space-y-4">
              <a
                href="#"
                className="contact-item flex items-center gap-4 text-white/80 hover:text-saferaho-blue transition-colors group"
              >
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-saferaho-blue/20 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-sm md:text-base">{siteConfig.contact.phone}</span>
              </a>

              <a
                href="#"
                className="contact-item flex items-center gap-4 text-white/80 hover:text-saferaho-blue transition-colors group"
              >
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-saferaho-blue/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-sm md:text-base">{siteConfig.contact.email}</span>
              </a>

              <a
                href="#"
                className="contact-item flex items-center gap-4 text-white/80 hover:text-saferaho-blue transition-colors group"
              >
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-saferaho-blue/20 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="text-sm md:text-base">Chat on WhatsApp</span>
              </a>

              <div className="contact-item flex items-start gap-4 text-white/60">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-sm md:text-base leading-relaxed">{siteConfig.contact.address}</span>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div ref={formRef}>
            <div className="bg-white rounded-[26px] p-6 md:p-8 card-shadow">
              <h3 className="font-display font-semibold text-xl text-saferaho-navy mb-6">
                Get your free quote
              </h3>
              <LeadForm variant="default" showSource={false} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
