'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calculator } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

gsap.registerPlugin(ScrollTrigger);

interface CalculatorResult {
  label: string;
  value: string;
  subtext?: string;
}

export function LifeCoverageCalculatorPage() {
  const [annualIncome, setAnnualIncome] = useState(500000);
  const [age, setAge] = useState(30);
  const [liabilities, setLiabilities] = useState(0);
  const [result, setResult] = useState<CalculatorResult[]>([]);

  useEffect(() => {
    const multiplier = age < 30 ? 20 : age < 40 ? 15 : age < 50 ? 12 : 10;
    const recommendedCoverage = (annualIncome * multiplier) + liabilities;

    setResult([
      { label: 'Recommended Cover', value: `₹${recommendedCoverage.toLocaleString('en-IN')}` },
      { label: 'Income Multiple', value: `${multiplier}x` },
      { label: 'Annual Income', value: `₹${annualIncome.toLocaleString('en-IN')}` },
    ]);
  }, [annualIncome, age, liabilities]);

  return (
    <main className="relative pt-20">
      <section className="relative w-full min-h-[40vh] flex items-center plus-grid px-6 md:px-[6vw] py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center w-full">
          <div className="w-14 h-14 bg-saferaho-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Calculator className="w-7 h-7 text-saferaho-blue" />
          </div>

          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-saferaho-navy leading-tight mb-3">
            Life Coverage Calculator
          </h1>

          <p className="text-base text-saferaho-gray leading-relaxed max-w-xl mx-auto">
            Find out the right term insurance cover to secure your family's future.
          </p>
        </div>
      </section>

      <section className="relative w-full py-10 md:py-16 px-6 md:px-[6vw]">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-[22px] p-6 md:p-8 card-shadow border border-saferaho-navy/5">
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
                  max={5000000}
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
          </div>
        </div>
      </section>
    </main>
  );
}