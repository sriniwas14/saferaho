export interface InsurancePlan {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  cta: string;
  secondaryCta: string;
  icon: string;
  image: string;
}

export const insurancePlans: InsurancePlan[] = [
  {
    id: "life",
    title: "Life Insurance",
    subtitle: "Leave nothing to chance.",
    description: "Life is uncertain — but your family's future shouldn't be. Insurance isn't just about you today, it's about securing everything you leave behind.",
    features: [
      "Term plans that match your income replacement goal",
      "Riders explained clearly (critical illness, waiver, accidental)",
      "Claim support from day one"
    ],
    cta: "Compare term plans",
    secondaryCta: "Talk to an advisor",
    icon: "Heart",
    image: "/images/life-insurance.jpg"
  },
  {
    id: "health",
    title: "Health Insurance",
    subtitle: "Hospital bills shouldn't be a surprise.",
    description: "Good health is priceless. But medical treatment in India has become expensive — even a short hospital stay can disturb lifetime savings.",
    features: [
      "Cashless network check before you buy",
      "Restoration, no-claim bonus, room rent limits—explained",
      "Pre-existing condition clarity"
    ],
    cta: "Find the best health plan",
    secondaryCta: "See coverage checklist",
    icon: "Shield",
    image: "/images/health-insurance.jpg"
  },
  {
    id: "motor",
    title: "Motor Insurance",
    subtitle: "Drive calm. Claim easy.",
    description: "Your vehicle is more than just a machine — it's your daily partner. Motor Insurance protects you from financial losses arising due to accidents, damage, theft or 3rd-party liabilities.",
    features: [
      "Own damage + third party in one view",
      "IDV selection without the guesswork",
      "Add-ons that are actually useful"
    ],
    cta: "Check motor plans",
    secondaryCta: "Renew in 2 minutes",
    icon: "Car",
    image: "/images/motor-insurance.jpg"
  },
  {
    id: "travel",
    title: "Travel Insurance",
    subtitle: "Take the trip. Leave the worry.",
    description: "A vacation or business trip should feel exciting — not stressful. Travel Insurance protects you from unexpected events while travelling in India or abroad.",
    features: [
      "Medical emergencies + evacuation cover",
      "Trip cancellation and delay protection",
      "Lost baggage and passport assistance"
    ],
    cta: "Get travel cover",
    secondaryCta: "View destination-wise benefits",
    icon: "Plane",
    image: "/images/travel-insurance.jpg"
  }
];

export const serviceCards = [
  {
    id: "life",
    title: "Life Insurance",
    description: "Secure your family's future with the right term plan.",
    cta: "Explore"
  },
  {
    id: "health",
    title: "Health Insurance",
    description: "Cashless hospitalization and clear coverage.",
    cta: "Explore"
  },
  {
    id: "motor",
    title: "Motor Insurance",
    description: "Own damage + third party, explained simply.",
    cta: "Explore"
  },
  {
    id: "travel",
    title: "Travel Insurance",
    description: "Medical + baggage cover that actually works.",
    cta: "Explore"
  }
];
