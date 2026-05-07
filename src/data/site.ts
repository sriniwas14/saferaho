export const siteConfig = {
  name: "Saferaho",
  tagline: "Aaj plan karo, kal safe raho",
  description: "Insurance & Investments made Simple, Honest & Secure",
  contact: {
    phone: "+91 9999 116504",
    phoneHref: "+919999116504",
    email: "hi@saferaho.com",
    whatsapp: "+919999116504",
    address:
      "5th Floor, Wing-A, Statesman House, Connaught Place, New Delhi-110001",
  },
  social: {
    whatsapp: "https://wa.me/919999116504",
  },
  stats: {
    families: "10,000+",
    claimRate: "98%",
    years: "8+",
  },
};

export const navLinks = [
  {
    label: "Insurance",
    href: "/life-insurance",
    children: [
      { label: "Health Insurance", href: "/health-insurance" },
      { label: "Life Insurance", href: "/life-insurance" },
      { label: "Motor Insurance", href: "/motor-insurance" },
      { label: "Travel Insurance", href: "/travel-insurance" },
    ],
  },
  {
    label: "Investments",
    href: "/early-retirement",
    children: [
      { label: "Early Retirement", href: "/early-retirement" },
      { label: "Child Education", href: "/child-education" },
      { label: "Child Marriage", href: "/child-marriage" },
    ],
  },
  { label: "Blog", href: "/blog" },
  {
    label: "Tools",
    href: "/tools/sip",
    children: [
      { label: "SIP Calculator", href: "/tools/sip" },
      { label: "EMI Calculator", href: "/tools/emi" },
      { label: "Health Coverage Calculator", href: "/tools/health-coverage" },
      { label: "Life Coverage Calculator", href: "/tools/life-coverage" },
      { label: "Inflation Calculator", href: "/tools/inflation" },
    ],
  },
];

export const insuranceMegaMenu = [
  {
    title: "Health Insurance",
    href: "/health-insurance",
    icon: "ShieldPlus",
    accent: "from-emerald-400/20 via-cyan-400/10 to-transparent",
    links: [
      {
        label: "Cashless Health Guide",
        href: "/health-insurance/cashless-health-insurance-guide",
      },
      { label: "Claims Support", href: "/claims" },
    ],
  },
  {
    title: "Life Insurance",
    href: "/life-insurance",
    icon: "HeartHandshake",
    accent: "from-amber-400/20 via-orange-400/10 to-transparent",
    links: [
      {
        label: "Coverage Basics",
        href: "/life-insurance/term-insurance-coverage-basics",
      },
      { label: "Life Cover Calculator", href: "/tools/life-coverage" },
      { label: "Talk to an Advisor", href: "/contact" },
    ],
  },
  {
    title: "Motor Insurance",
    href: "/motor-insurance",
    icon: "CarFront",
    accent: "from-sky-400/20 via-indigo-400/10 to-transparent",
    links: [
      {
        label: "Own Damage vs Third Party",
        href: "/motor-insurance/own-damage-vs-third-party",
      },
      { label: "Renew your policy", href: "/motor-insurance" },
      { label: "Claims Support", href: "/claims" },
    ],
  },
  {
    title: "Travel Insurance",
    href: "/travel-insurance",
    icon: "PlaneTakeoff",
    accent: "from-fuchsia-400/20 via-violet-400/10 to-transparent",
    links: [
      { label: "Overview", href: "/travel-insurance" },
      {
        label: "International Travel Checklist",
        href: "/travel-insurance/international-travel-cover-checklist",
      },
      { label: "Destination Planning", href: "/travel-insurance" },
      { label: "Get a Quote", href: "/contact" },
    ],
  },
] as const;

export const insuranceMegaMenuTools = {
  title: "Quick Actions",
  icon: "Wrench",
  links: [
    { label: "Health Cover Calculator", href: "/tools/health-coverage" },
    { label: "Life Cover Calculator", href: "/tools/life-coverage" },
    { label: "Claims", href: "/claims" },
    { label: "Contact Advisor", href: "/contact" },
  ],
} as const;

export const trustPillars = [
  {
    title: "Clear coverage & exclusions",
    description:
      "No jargon. Know exactly what's covered, what's not, and why—before you buy.",
  },
  {
    title: "Personalized plan suggestions",
    description: "Based on your age, goals, and budget—not commission targets.",
  },
  {
    title: "Honest guidance",
    description: "No hidden surprises. No spam. Only what you actually need.",
  },
];

export const partners = [
  "ICICI Prudential",
  "HDFC Life",
  "Max Life",
  "Star Health",
  "Care Health",
  "Bajaj Allianz",
  "ACKO",
  "Digit",
  "SBI Life",
  "Tata AIA",
  "Aditya Birla Health",
  "LIC",
];

export const calculators = [
  {
    id: "health-coverage",
    title: "Health Insurance Coverage Calculator",
    description:
      "Calculate how much health coverage you need based on your age, family size, and medical history.",
    icon: "Calculator",
  },
  {
    id: "life-coverage",
    title: "Life Insurance Coverage Calculator",
    description:
      "Find out the right term insurance cover to secure your family's future.",
    icon: "Calculator",
  },
  {
    id: "sip",
    title: "SIP Calculator",
    description:
      "Calculate returns on your Systematic Investment Plan and plan your wealth creation.",
    icon: "TrendingUp",
  },
  {
    id: "emi",
    title: "EMI Calculator",
    description:
      "Calculate Equated Monthly Installments for loans and plan your finances better.",
    icon: "CreditCard",
  },
  {
    id: "inflation",
    title: "Inflation Calculator",
    description:
      "See how inflation affects your purchasing power and plan your investments accordingly.",
    icon: "BarChart3",
  },
];
