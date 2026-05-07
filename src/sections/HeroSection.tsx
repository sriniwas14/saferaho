import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  MessageCircle,
  Check,
  Shield,
  Heart,
  ArrowRight,
  Award,
} from "lucide-react";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const trustPillsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-eyebrow",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5 },
      )
        .fromTo(
          ".hero-headline",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.25",
        )
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3",
        )
        .fromTo(
          ".hero-ctas",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.25",
        )
        .fromTo(
          ".hero-pills",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4 },
          "-=0.2",
        )
        .fromTo(
          ".hero-stats",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.15",
        )
        .fromTo(
          ".hero-image",
          { opacity: 0, scale: 1.04 },
          { opacity: 1, scale: 1, duration: 0.7 },
          "-=0.5",
        )
        .fromTo(
          ".hero-testimonial",
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.5 },
          "-=0.3",
        )
        .fromTo(
          ".hero-partners",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4 },
          "-=0.2",
        );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full pt-24 md:pt-28 pb-12 md:pb-16 px-6 md:px-[6vw] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-saferaho-navy/2 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] -translate-y-1/2 translate-x-1/3 bg-gradient-to-bl from-saferaho-blue/4 to-transparent rounded-full blur-3xl" />
      </div>

      <div ref={cardRef} className="relative max-w-[1400px] mx-auto">
        {/* Main Hero Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white rounded-[32px] overflow-hidden card-shadow border border-saferaho-navy/[0.04]">
          {/* Content Side */}
          <div
            ref={contentRef}
            className="lg:col-span-7 flex flex-col justify-center p-8 md:p-12 lg:p-16 order-2 lg:order-1"
          >
            {/* Eyebrow */}
            <span className="hero-eyebrow eyebrow inline-flex items-center gap-2 mb-5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Insurance & Investments
            </span>

            {/* Headline */}
            <h1 className="hero-headline font-display text-4xl md:text-5xl lg:text-[3.75rem] text-saferaho-navy leading-[1.05] tracking-tight mb-5">
              Aaj plan karo,
              <br />
              <span className="italic text-saferaho-blue">kal Safe Raho</span>
            </h1>

            {/* Subheadline */}
            <p className="hero-sub text-base md:text-lg text-saferaho-gray leading-relaxed mb-8 max-w-lg">
              Simple, honest protection for your family, health, vehicle, and
              travels. No jargon. No hidden commissions. Just clarity.
            </p>

            {/* CTA Buttons */}
            <div className="hero-ctas flex flex-col sm:flex-row gap-3 mb-6">
              <Link
                href="/contact"
                className="btn-primary inline-flex items-center justify-center gap-2 text-center"
              >
                Get your personalized plan
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/919999116504"
                className="btn-secondary text-center inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </div>

            {/* Trust Pills */}
            <div
              ref={trustPillsRef}
              className="hero-pills flex flex-wrap gap-2 mb-8"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full">
                <Check className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">
                  100% genuine guidance
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full">
                <Shield className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">
                  100% claims support
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full">
                <Heart className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">Zero spam, always</span>
              </div>
            </div>

            {/* Trust Badge */}
            <div
              ref={statsRef}
              className="hero-stats pt-6"
            >
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-saferaho-gold" />
                <div>
                  <div className="text-sm font-semibold text-saferaho-navy">
                    India's only 100% unbiased platform
                  </div>
                  <div className="text-xs text-saferaho-gray mt-0.5">
                    No ads/commisions from insurers
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div
            ref={imageRef}
            className="hero-image relative lg:col-span-5 order-1 lg:order-2 min-h-[320px] md:min-h-[420px] lg:min-h-full bg-gradient-to-br from-saferaho-navy/5 to-saferaho-cloud"
          >
            <div className="relative w-full h-full">
              <img
                src="/images/hero.png"
                alt="Happy family protected by Saferaho"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-saferaho-navy/15 to-transparent" />

              {/* Floating Testimonial */}
              <div className="hero-testimonial absolute bottom-6 left-4 right-4 md:bottom-8 md:left-6 md:right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 card-shadow border border-white/50">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    P
                  </div>
                  <div>
                    <p className="text-sm text-saferaho-navy leading-snug font-medium">
                      "Got my claim settled in 3 days. Saferaho made it
                      effortless."
                    </p>
                    <p className="text-xs text-saferaho-gray mt-1.5 font-medium">
                      Priya Sharma, Delhi
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partner Bar */}
        <div className="hero-partners mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-4 md:px-8">
          <div className="flex items-center gap-2 text-saferaho-gray">
            <Award className="w-4 h-4 text-saferaho-gold" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Trusted partners
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {[
              "ICICI Prudential",
              "HDFC Life",
              "Max Life",
              "Star Health",
              "Bajaj Allianz",
            ].map((partner) => (
              <span
                key={partner}
                className="text-xs font-medium text-saferaho-gray/60 hover:text-saferaho-navy transition-colors"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
