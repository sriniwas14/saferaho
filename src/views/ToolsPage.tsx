'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calculator, TrendingUp, CreditCard, BarChart3, ArrowRight } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { siteConfig } from '@/data/site';

gsap.registerPlugin(ScrollTrigger);

interface CalculatorResult {
  label: string;
  value: string;
  subtext?: string;
}

// SIP Calculator
function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [years, setYears] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [result, setResult] = useState<CalculatorResult[]>([]);

  const calculate = () => {
    const monthlyRate = expectedReturn / 100 / 12;
    const months = years * 12;
    const futureValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const totalInvested = monthlyInvestment * months;
    const wealthGained = futureValue - totalInvested;

    setResult([
      { label: 'Total Investment', value: `₹${totalInvested.toLocaleString('en-IN')}` },
      { label: 'Wealth Gained', value: `₹${Math.round(wealthGained).toLocaleString('en-IN')}` },
      { label: 'Future Value', value: `₹${Math.round(futureValue).toLocaleString('en-IN')}`, subtext: 'Estimated returns' },
    ]);
  };

  useEffect(() => calculate(), [monthlyInvestment, years, expectedReturn]);

  return (
    <div className="space-y-6">
      <div>
        <Label className="flex justify-between mb-2">
          <span>Monthly Investment</span>
          <span className="text-saferaho-blue font-medium">₹{monthlyInvestment.toLocaleString()}</span>
        </Label>
        <Slider
          value={[monthlyInvestment]}
          onValueChange={(v) => setMonthlyInvestment(v[0])}
          min={500}
          max={100000}
          step={500}
        />
      </div>
      <div>
        <Label className="flex justify-between mb-2">
          <span>Investment Period</span>
          <span className="text-saferaho-blue font-medium">{years} years</span>
        </Label>
        <Slider
          value={[years]}
          onValueChange={(v) => setYears(v[0])}
          min={1}
          max={30}
          step={1}
        />
      </div>
      <div>
        <Label className="flex justify-between mb-2">
          <span>Expected Return Rate</span>
          <span className="text-saferaho-blue font-medium">{expectedReturn}%</span>
        </Label>
        <Slider
          value={[expectedReturn]}
          onValueChange={(v) => setExpectedReturn(v[0])}
          min={6}
          max={20}
          step={0.5}
        />
      </div>
      {result.length > 0 && (
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-saferaho-navy/10">
          {result.map((r) => (
            <div key={r.label} className="text-center">
              <p className="text-xs text-saferaho-gray mb-1">{r.label}</p>
              <p className="font-display font-semibold text-saferaho-navy">{r.value}</p>
              {r.subtext && <p className="text-[10px] text-saferaho-gray">{r.subtext}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// EMI Calculator
function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(10);
  const [tenure, setTenure] = useState(5);
  const [result, setResult] = useState<CalculatorResult[]>([]);

  const calculate = () => {
    const monthlyRate = interestRate / 100 / 12;
    const months = tenure * 12;
    const emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = emi * months;
    const totalInterest = totalPayment - loanAmount;

    setResult([
      { label: 'Monthly EMI', value: `₹${Math.round(emi).toLocaleString('en-IN')}` },
      { label: 'Total Interest', value: `₹${Math.round(totalInterest).toLocaleString('en-IN')}` },
      { label: 'Total Payment', value: `₹${Math.round(totalPayment).toLocaleString('en-IN')}` },
    ]);
  };

  useEffect(() => calculate(), [loanAmount, interestRate, tenure]);

  return (
    <div className="space-y-6">
      <div>
        <Label className="flex justify-between mb-2">
          <span>Loan Amount</span>
          <span className="text-saferaho-blue font-medium">₹{loanAmount.toLocaleString()}</span>
        </Label>
        <Slider
          value={[loanAmount]}
          onValueChange={(v) => setLoanAmount(v[0])}
          min={50000}
          max={5000000}
          step={50000}
        />
      </div>
      <div>
        <Label className="flex justify-between mb-2">
          <span>Interest Rate</span>
          <span className="text-saferaho-blue font-medium">{interestRate}%</span>
        </Label>
        <Slider
          value={[interestRate]}
          onValueChange={(v) => setInterestRate(v[0])}
          min={5}
          max={20}
          step={0.25}
        />
      </div>
      <div>
        <Label className="flex justify-between mb-2">
          <span>Loan Tenure</span>
          <span className="text-saferaho-blue font-medium">{tenure} years</span>
        </Label>
        <Slider
          value={[tenure]}
          onValueChange={(v) => setTenure(v[0])}
          min={1}
          max={30}
          step={1}
        />
      </div>
      {result.length > 0 && (
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-saferaho-navy/10">
          {result.map((r) => (
            <div key={r.label} className="text-center">
              <p className="text-xs text-saferaho-gray mb-1">{r.label}</p>
              <p className="font-display font-semibold text-saferaho-navy">{r.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Health Coverage Calculator
function HealthCoverageCalculator() {
  const [age, setAge] = useState(30);
  const [familySize, setFamilySize] = useState(3);
  const [city, setCity] = useState<'metro' | 'non-metro'>('metro');
  const [result, setResult] = useState<CalculatorResult[]>([]);

  const calculate = () => {
    const baseCoverage = city === 'metro' ? 500000 : 300000;
    const ageMultiplier = age > 40 ? 1.5 : age > 30 ? 1.2 : 1;
    const familyMultiplier = familySize > 2 ? 1.5 : 1;
    const recommendedCoverage = Math.round(baseCoverage * ageMultiplier * familyMultiplier / 100000) * 100000;

    setResult([
      { label: 'Recommended Coverage', value: `₹${recommendedCoverage.toLocaleString('en-IN')}` },
      { label: 'Family Size', value: `${familySize} members` },
      { label: 'City Type', value: city === 'metro' ? 'Metro' : 'Non-Metro' },
    ]);
  };

  useEffect(() => calculate(), [age, familySize, city]);

  return (
    <div className="space-y-6">
      <div>
        <Label className="flex justify-between mb-2">
          <span>Your Age</span>
          <span className="text-saferaho-blue font-medium">{age} years</span>
        </Label>
        <Slider
          value={[age]}
          onValueChange={(v) => setAge(v[0])}
          min={18}
          max={70}
          step={1}
        />
      </div>
      <div>
        <Label className="flex justify-between mb-2">
          <span>Family Size</span>
          <span className="text-saferaho-blue font-medium">{familySize} members</span>
        </Label>
        <Slider
          value={[familySize]}
          onValueChange={(v) => setFamilySize(v[0])}
          min={1}
          max={8}
          step={1}
        />
      </div>
      <div>
        <Label className="mb-2 block">City Type</Label>
        <div className="flex gap-3">
          <button
            onClick={() => setCity('metro')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              city === 'metro'
                ? 'bg-saferaho-blue text-white'
                : 'bg-saferaho-cloud text-saferaho-navy hover:bg-saferaho-blue/10'
            }`}
          >
            Metro
          </button>
          <button
            onClick={() => setCity('non-metro')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              city === 'non-metro'
                ? 'bg-saferaho-blue text-white'
                : 'bg-saferaho-cloud text-saferaho-navy hover:bg-saferaho-blue/10'
            }`}
          >
            Non-Metro
          </button>
        </div>
      </div>
      {result.length > 0 && (
        <div className="pt-4 border-t border-saferaho-navy/10">
          <div className="text-center p-4 bg-saferaho-blue/5 rounded-xl">
            <p className="text-sm text-saferaho-gray mb-1">Recommended Coverage</p>
            <p className="font-display font-semibold text-2xl text-saferaho-blue">{result[0].value}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Life Coverage Calculator
function LifeCoverageCalculator() {
  const [annualIncome, setAnnualIncome] = useState(500000);
  const [age, setAge] = useState(30);
  const [liabilities, setLiabilities] = useState(0);
  const [result, setResult] = useState<CalculatorResult[]>([]);

  const calculate = () => {
    const multiplier = age < 30 ? 20 : age < 40 ? 15 : age < 50 ? 12 : 10;
    const recommendedCoverage = (annualIncome * multiplier) + liabilities;

    setResult([
      { label: 'Recommended Cover', value: `₹${recommendedCoverage.toLocaleString('en-IN')}` },
      { label: 'Income Multiple', value: `${multiplier}x` },
      { label: 'Annual Income', value: `₹${annualIncome.toLocaleString('en-IN')}` },
    ]);
  };

  useEffect(() => calculate(), [annualIncome, age, liabilities]);

  return (
    <div className="space-y-6">
      <div>
        <Label className="flex justify-between mb-2">
          <span>Annual Income</span>
          <span className="text-saferaho-blue font-medium">₹{annualIncome.toLocaleString()}</span>
        </Label>
        <Slider
          value={[annualIncome]}
          onValueChange={(v) => setAnnualIncome(v[0])}
          min={100000}
          max= {5000000}
          step={50000}
        />
      </div>
      <div>
        <Label className="flex justify-between mb-2">
          <span>Your Age</span>
          <span className="text-saferaho-blue font-medium">{age} years</span>
        </Label>
        <Slider
          value={[age]}
          onValueChange={(v) => setAge(v[0])}
          min={20}
          max={60}
          step={1}
        />
      </div>
      <div>
        <Label className="flex justify-between mb-2">
          <span>Existing Liabilities</span>
          <span className="text-saferaho-blue font-medium">₹{liabilities.toLocaleString()}</span>
        </Label>
        <Slider
          value={[liabilities]}
          onValueChange={(v) => setLiabilities(v[0])}
          min={0}
          max={5000000}
          step={100000}
        />
      </div>
      {result.length > 0 && (
        <div className="pt-4 border-t border-saferaho-navy/10">
          <div className="text-center p-4 bg-saferaho-blue/5 rounded-xl">
            <p className="text-sm text-saferaho-gray mb-1">Recommended Life Cover</p>
            <p className="font-display font-semibold text-2xl text-saferaho-blue">{result[0].value}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Inflation Calculator
function InflationCalculator() {
  const [currentAmount, setCurrentAmount] = useState(100000);
  const [years, setYears] = useState(10);
  const [inflationRate, setInflationRate] = useState(6);
  const [result, setResult] = useState<CalculatorResult[]>([]);

  const calculate = () => {
    const futureValue = currentAmount * Math.pow(1 + inflationRate / 100, years);
    const purchasingPower = (currentAmount / futureValue) * 100;

    setResult([
      { label: 'Current Value', value: `₹${currentAmount.toLocaleString('en-IN')}` },
      { label: 'Future Value Needed', value: `₹${Math.round(futureValue).toLocaleString('en-IN')}` },
      { label: 'Purchasing Power', value: `${purchasingPower.toFixed(1)}%`, subtext: 'After inflation' },
    ]);
  };

  useEffect(() => calculate(), [currentAmount, years, inflationRate]);

  return (
    <div className="space-y-6">
      <div>
        <Label className="flex justify-between mb-2">
          <span>Current Amount</span>
          <span className="text-saferaho-blue font-medium">₹{currentAmount.toLocaleString()}</span>
        </Label>
        <Slider
          value={[currentAmount]}
          onValueChange={(v) => setCurrentAmount(v[0])}
          min={10000}
          max={10000000}
          step={10000}
        />
      </div>
      <div>
        <Label className="flex justify-between mb-2">
          <span>Time Period</span>
          <span className="text-saferaho-blue font-medium">{years} years</span>
        </Label>
        <Slider
          value={[years]}
          onValueChange={(v) => setYears(v[0])}
          min={1}
          max={30}
          step={1}
        />
      </div>
      <div>
        <Label className="flex justify-between mb-2">
          <span>Inflation Rate</span>
          <span className="text-saferaho-blue font-medium">{inflationRate}%</span>
        </Label>
        <Slider
          value={[inflationRate]}
          onValueChange={(v) => setInflationRate(v[0])}
          min={2}
          max={15}
          step={0.5}
        />
      </div>
      {result.length > 0 && (
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-saferaho-navy/10">
          {result.map((r) => (
            <div key={r.label} className="text-center">
              <p className="text-xs text-saferaho-gray mb-1">{r.label}</p>
              <p className="font-display font-semibold text-saferaho-navy">{r.value}</p>
              {r.subtext && <p className="text-[10px] text-saferaho-gray">{r.subtext}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const calculators = [
  {
    id: 'sip',
    title: 'SIP Calculator',
    description: 'Calculate returns on your Systematic Investment Plan.',
    icon: TrendingUp,
    component: SIPCalculator,
  },
  {
    id: 'emi',
    title: 'EMI Calculator',
    description: 'Calculate Equated Monthly Installments for loans.',
    icon: CreditCard,
    component: EMICalculator,
  },
  {
    id: 'health',
    title: 'Health Coverage Calculator',
    description: 'Find out how much health insurance you need.',
    icon: Calculator,
    component: HealthCoverageCalculator,
  },
  {
    id: 'life',
    title: 'Life Coverage Calculator',
    description: 'Calculate the right term insurance cover.',
    icon: Calculator,
    component: LifeCoverageCalculator,
  },
  {
    id: 'inflation',
    title: 'Inflation Calculator',
    description: 'See how inflation affects your purchasing power.',
    icon: BarChart3,
    component: InflationCalculator,
  },
];

export function ToolsPage() {
  const heroRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const cards = cardsRef.current;

    if (!hero || !cards) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(hero.querySelector('.hero-content'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        }
      );

      const cardElements = cards.querySelectorAll('.calculator-card');
      gsap.fromTo(cardElements,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative pt-20">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative w-full min-h-[40vh] flex items-center plus-grid px-6 md:px-[6vw] py-16 md:py-20"
      >
        <div className="hero-content max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-saferaho-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Calculator className="w-8 h-8 text-saferaho-blue" />
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-saferaho-navy leading-tight mb-4">
            Financial Calculators
          </h1>

          <p className="text-base md:text-lg text-saferaho-gray leading-relaxed max-w-2xl mx-auto">
            Plan your finances better with our easy-to-use calculators. 
            Make informed decisions about investments, loans, and insurance.
          </p>
        </div>
      </section>

      {/* Calculators Grid */}
      <section className="relative w-full py-16 md:py-24 px-6 md:px-[6vw]">
        <div className="max-w-6xl mx-auto">
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {calculators.map((calc) => {
              const Component = calc.component;
              return (
                <div
                  key={calc.id}
                  className="calculator-card bg-white rounded-[22px] p-6 md:p-8 card-shadow border border-saferaho-navy/5"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-saferaho-blue/10 rounded-xl flex items-center justify-center">
                      <calc.icon className="w-6 h-6 text-saferaho-blue" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg text-saferaho-navy">
                        {calc.title}
                      </h3>
                      <p className="text-sm text-saferaho-gray">{calc.description}</p>
                    </div>
                  </div>
                  <Component />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative w-full py-16 md:py-20 px-6 md:px-[6vw] plus-grid">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl text-saferaho-navy mb-4">
            Need personalized advice?
          </h2>
          <p className="text-base text-saferaho-gray mb-6">
            Our experts can help you choose the right plans based on your calculations.
          </p>
          <a
            href={siteConfig.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            Talk to an expert
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
