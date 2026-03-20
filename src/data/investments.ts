export interface InvestmentPlan {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  cta: string;
  image: string;
}

export const investmentPlans: InvestmentPlan[] = [
  {
    id: "retirement",
    title: "Early Retirement Plans",
    description: "Build a corpus that lets you choose when to stop.",
    longDescription: "Retirement isn't about age — it's about freedom. With rising expenses and unpredictable markets, early retirement needs smart planning, disciplined savings, and the right financial strategy.",
    features: [
      "Fund selection based on your risk profile",
      "Regular rebalancing and review",
      "Tax-efficient withdrawal strategies",
      "Monthly SIP planning"
    ],
    cta: "Start retirement planning",
    image: "/images/retirement.jpg"
  },
  {
    id: "child-education",
    title: "Child Education Plans",
    description: "Goal-based investing for school fees and higher studies.",
    longDescription: "Every parent dreams of giving their child the best education. But with costs rising every year, these goals need careful, early planning.",
    features: [
      "Dedicated fund for education expenses",
      "Flexible withdrawal options",
      "Goal tracking and progress updates",
      "Tax-efficient investment options"
    ],
    cta: "Plan for your child's education",
    image: "/images/child-education.jpg"
  },
  {
    id: "child-marriage",
    title: "Child Marriage Plans",
    description: "Ensure your child's special day is financially secure.",
    longDescription: "Marriage is one of life's biggest milestones. With costs rising every year, planning early ensures your child's special day is everything they dream of.",
    features: [
      "Long-term wealth accumulation",
      "Flexible contribution options",
      "Goal-based investment tracking",
      "Partial withdrawal facilities"
    ],
    cta: "Plan for your child's marriage",
    image: "/images/child-marriage.jpg"
  }
];

export const investmentCards = [
  {
    id: "retirement",
    title: "Early Retirement Plans",
    description: "Build a corpus that lets you choose when to stop. We help with fund selection, rebalancing, and tax-efficient withdrawals.",
    cta: "Start retirement planning",
    image: "/images/retirement.jpg"
  },
  {
    id: "child",
    title: "Child Marriage & Education",
    description: "Goal-based investing for school fees, higher studies, and life's big moments—without dipping into emergency savings.",
    cta: "Plan for your child",
    image: "/images/child-education.jpg"
  }
];
