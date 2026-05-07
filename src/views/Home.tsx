"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroSection } from "@/sections/HeroSection";
import { ServicesSection } from "@/sections/ServicesSection";
import { InsuranceDetailSection } from "@/sections/InsuranceDetailSection";
import { InvestmentsSection } from "@/sections/InvestmentsSection";
import { WhySection } from "@/sections/WhySection";
import { PartnersSection } from "@/sections/PartnersSection";
import { CTASection } from "@/sections/CTASection";
import { insurancePlans } from "@/data/insurance";

gsap.registerPlugin(ScrollTrigger);

export function Home() {
  useEffect(() => {
    // Global snap for pinned sections
    const setupGlobalSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center:
          (st.start + ((st.end ?? st.start) - st.start) * 0.35) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02,
            );
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0,
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: "power2.out",
        },
      });
    };

    // Delay to ensure all ScrollTriggers are created
    const timer = setTimeout(setupGlobalSnap, 150);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Get insurance plans in specific order
  const lifePlan = insurancePlans.find((p) => p.id === "life")!;
  const healthPlan = insurancePlans.find((p) => p.id === "health")!;
  const motorPlan = insurancePlans.find((p) => p.id === "motor")!;
  const travelPlan = insurancePlans.find((p) => p.id === "travel")!;

  return (
    <main className="relative">
      {/* Hero - Pinned */}
      <HeroSection />

      {/* Services Overview */}
      {/* <ServicesSection /> */}

      {/* Health Insurance - Image Left */}
      <InsuranceDetailSection plan={healthPlan} imagePosition="left" />

      {/* Life Insurance - Image Right */}
      <InsuranceDetailSection plan={lifePlan} imagePosition="right" />

      {/* Motor Insurance - Image Right */}
      <InsuranceDetailSection plan={motorPlan} imagePosition="right" />

      {/* Travel Insurance - Image Left */}
      <InsuranceDetailSection plan={travelPlan} imagePosition="left" />

      {/* Investments */}
      <InvestmentsSection />

      {/* Why Saferaho */}
      <WhySection />

      {/* Partners */}
      <PartnersSection />

      {/* Final CTA */}
      <CTASection />
    </main>
  );
}
