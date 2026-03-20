export const siteConfig = {
  name: "Saferaho",
  tagline: "Aaj plan karo, kal safe raho",
  description: "Insurance & Investments made Simple, Honest & Secure",
  contact: {
    phone: "+91-9999-116504",
    email: "hi@saferaho.com",
    whatsapp: "+919999116504",
    address: "A-37, Street no. 6, West Vinod Nagar, New Delhi - 110092"
  },
  social: {
    whatsapp: "https://wa.me/919999116504"
  }
};

export const navLinks = [
  { label: "Home", href: "/" },
  { 
    label: "Insurance", 
    href: "#",
    children: [
      { label: "Life Insurance", href: "/life-insurance" },
      { label: "Health Insurance", href: "/health-insurance" },
      { label: "Motor Insurance", href: "/motor-insurance" },
      { label: "Travel Insurance", href: "/travel-insurance" }
    ]
  },
  { 
    label: "Investments", 
    href: "#",
    children: [
      { label: "Early Retirement", href: "/early-retirement" },
      { label: "Child Education", href: "/child-education" },
      { label: "Child Marriage", href: "/child-marriage" }
    ]
  },
  { label: "Claims", href: "/claims" },
  { label: "Tools", href: "/tools" },
  { label: "Contact", href: "/contact" }
];

export const trustPillars = [
  {
    title: "Clear coverage & exclusions",
    description: "No jargon. Know what's covered, what's not, and why."
  },
  {
    title: "Personalized plan suggestions",
    description: "Based on your age, goals, and budget—not commissions."
  },
  {
    title: "Honest guidance",
    description: "No hidden surprises. Only what you need."
  }
];

export const partners = [
  "ICICI Prudential",
  "HDFC Life",
  "Max Life",
  "Star Health",
  "Care Health",
  "Bajaj Allianz",
  "ACKO",
  "Digit"
];

export const calculators = [
  {
    id: "health-coverage",
    title: "Health Insurance Coverage Calculator",
    description: "Calculate how much health coverage you need based on your age, family size, and medical history.",
    icon: "Calculator"
  },
  {
    id: "life-coverage",
    title: "Life Insurance Coverage Calculator",
    description: "Find out the right term insurance cover to secure your family's future.",
    icon: "Calculator"
  },
  {
    id: "sip",
    title: "SIP Calculator",
    description: "Calculate returns on your Systematic Investment Plan and plan your wealth creation.",
    icon: "TrendingUp"
  },
  {
    id: "emi",
    title: "EMI Calculator",
    description: "Calculate Equated Monthly Installments for loans and plan your finances better.",
    icon: "CreditCard"
  },
  {
    id: "inflation",
    title: "Inflation Calculator",
    description: "See how inflation affects your purchasing power and plan your investments accordingly.",
    icon: "BarChart3"
  }
];
