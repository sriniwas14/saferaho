import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, MessageCircle, Check, Plus } from "lucide-react";
import type { InsurancePlan } from "@/data/insurance";

gsap.registerPlugin(ScrollTrigger);

interface InsuranceDetailSectionProps {
  plan: InsurancePlan;
  imagePosition?: "left" | "right";
}

export function InsuranceDetailSection({
  plan,
  imagePosition = "right",
}: InsuranceDetailSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: cardRef.current, start: "top bottom" },
      });

      tl.fromTo(
        cardRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
      )
        .fromTo(
          ".section-label",
          { opacity: 0, x: -16 },
          { opacity: 1, x: 0, duration: 0.1 },
          "-=0.3",
        )
        .fromTo(
          ".section-headline",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.2 },
          "-=0.25",
        )
        .fromTo(
          ".section-desc",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.2 },
          "-=0.2",
        )
        .fromTo(
          ".feature-item",
          { opacity: 0, x: -16 },
          { opacity: 1, x: 0, stagger: 0.08, duration: 0.4 },
          "-=0.15",
        )
        .fromTo(
          ".cta-buttons",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.2 },
          "-=0.1",
        )
        .fromTo(
          imageRef.current,
          { opacity: 0, scale: 1.03 },
          { opacity: 1, scale: 1, duration: 0.2 },
          "-=0.5",
        )
        .fromTo(
          ".plus-icon",
          { opacity: 0, scale: 0.6, rotate: -15 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.2,
            ease: "back.out(1.7)",
          },
          "-=0.3",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [imagePosition]);

  const isImageLeft = imagePosition === "left";

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-12 md:py-16 px-6 md:px-[6vw] bg-saferaho-cloud"
    >
      {/* Decorative Plus Icon */}
      <div
        className={`plus-icon absolute top-16 ${isImageLeft ? "left-[4vw]" : "right-[4vw]"} w-11 h-11 bg-saferaho-blue/8 rounded-xl flex items-center justify-center hidden lg:flex`}
      >
        <Plus className="w-5 h-5 text-saferaho-blue" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div ref={cardRef} className="card-white overflow-hidden">
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-6 md:p-10 lg:p-12`}
          >
            {/* Image - conditional order */}
            <div
              ref={imageRef}
              className={`relative ${isImageLeft ? "order-1" : "order-1 lg:order-2 ml-auto"}`}
            >
              <div className="relative aspect-[4/5] max-h-[500px] rounded-[22px] overflow-hidden">
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
              ref={contentRef}
              className={`flex flex-col justify-center ${isImageLeft ? "order-2" : "order-2 lg:order-1"}`}
            >
              {/* Label */}
              <span className="section-label font-label text-xs uppercase tracking-[0.15em] text-saferaho-blue font-semibold mb-3">
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
                  <li
                    key={index}
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

              {/* CTAs */}
              <div className="cta-buttons flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://wa.me/918860077551"
                  className="btn-secondary text-[#ff7112] border-[#ff7112] inline-flex items-center justify-center gap-2"
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
