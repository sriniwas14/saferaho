import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Check, Shield, Heart } from 'lucide-react';


gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const content = contentRef.current;
    const image = imageRef.current;
    const pills = pillsRef.current;

    if (!section || !card || !content || !image || !pills) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      loadTl
        .fromTo(card, 
          { opacity: 0, y: 40, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8 }
        )
        .fromTo(content.querySelectorAll('.animate-item'),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          '-=0.4'
        )
        .fromTo(image,
          { opacity: 0, x: 60, scale: 1.02 },
          { opacity: 1, x: 0, scale: 1, duration: 0.7 },
          '-=0.5'
        )
        .fromTo(pills.querySelectorAll('.trust-pill'),
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
          '-=0.3'
        );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.set(card, { opacity: 1, y: 0, scale: 1 });
            gsap.set(content.querySelectorAll('.animate-item'), { opacity: 1, y: 0, x: 0 });
            gsap.set(image, { opacity: 1, x: 0 });
            gsap.set(pills.querySelectorAll('.trust-pill'), { opacity: 1, y: 0 });
          }
        }
      });

      // Exit animation (70% - 100%)
      scrollTl
        .fromTo(card,
          { y: 0, scale: 1, opacity: 1 },
          { y: '-18vh', scale: 0.96, opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(content.querySelectorAll('.animate-item'),
          { x: 0, opacity: 1 },
          { x: '-10vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(image,
          { x: 0, opacity: 1 },
          { x: '10vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(pills.querySelectorAll('.trust-pill'),
          { y: 0, opacity: 1 },
          { y: '10vh', opacity: 0, ease: 'power2.in' },
          0.7
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center plus-grid pt-20 pb-10 px-4 md:px-6"
    >
      {/* Subtle radial gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 70% 50%, rgba(0,191,255,0.06), transparent 55%)'
        }}
      />

      {/* Main Card */}
      <div
        ref={cardRef}
        className="relative w-full max-w-[1400px] min-h-[70vh] md:min-h-[72vh] card-white overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 h-full">
          {/* Content Side */}
          <div ref={contentRef} className="flex flex-col justify-center p-6 md:p-10 lg:p-12 order-2 lg:order-1">
            {/* Eyebrow */}
            <span className="animate-item font-label text-xs uppercase tracking-[0.12em] text-saferaho-gray mb-4">
              Insurance & Investments
            </span>

            {/* Headline */}
            <h1 className="animate-item font-display text-4xl md:text-5xl lg:text-6xl text-saferaho-navy leading-[0.95] tracking-tight mb-4">
              Aaj plan karo,
              <br />
              <span className="text-saferaho-blue">kal Safe Raho</span>
            </h1>

            {/* Subheadline */}
            <p className="animate-item text-base md:text-lg text-saferaho-gray leading-relaxed mb-6 max-w-md">
              Simple, honest protection for your family, health, vehicle, and travels.
            </p>

            {/* CTA Buttons */}
            <div className="animate-item flex flex-col sm:flex-row gap-3 mb-4">
              <a
                href="#"
                className="btn-primary text-center"
              >
                Get your free plan
              </a>
              <a
                href="#"
                className="btn-secondary text-center flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Or chat on WhatsApp
              </a>
            </div>

            {/* Trust Pills */}
            <div ref={pillsRef} className="flex flex-wrap gap-2 mt-4">
              <div className="trust-pill inline-flex items-center gap-1.5 px-3 py-1.5 bg-saferaho-cloud rounded-full">
                <Check className="w-3.5 h-3.5 text-saferaho-blue" />
                <span className="text-xs font-medium text-saferaho-navy">100% genuine guidance</span>
              </div>
              <div className="trust-pill inline-flex items-center gap-1.5 px-3 py-1.5 bg-saferaho-cloud rounded-full">
                <Shield className="w-3.5 h-3.5 text-saferaho-blue" />
                <span className="text-xs font-medium text-saferaho-navy">100% claims support</span>
              </div>
              <div className="trust-pill inline-flex items-center gap-1.5 px-3 py-1.5 bg-saferaho-cloud rounded-full">
                <Heart className="w-3.5 h-3.5 text-saferaho-blue" />
                <span className="text-xs font-medium text-saferaho-navy">100% spam-free</span>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div ref={imageRef} className="relative h-64 md:h-80 lg:h-auto order-1 lg:order-2 p-4 md:p-6 lg:p-8">
            <div className="relative w-full h-full rounded-[22px] overflow-hidden">
              <img
                src="/images/hero-family.jpg"
                alt="Happy family protected by Saferaho"
                className="w-full h-full object-cover"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-saferaho-navy/10 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
