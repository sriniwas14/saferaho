'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, ArrowLeft, ArrowRight } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

gsap.registerPlugin(ScrollTrigger);

interface CalculatorResult {
  label: string;
  value: string;
  subtext?: string;
}

export function SIPCalculatorPage() {
  const router = useRouter();
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [years, setYears] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [result, setResult] = useState<CalculatorResult[]>([]);

  useEffect(() => {
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
  }, [monthlyInvestment, years, expectedReturn]);

  return (
    <main className="relative pt-20">
      <section className="relative w-full min-h-[40vh] flex items-center plus-grid px-6 md:px-[6vw] py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center w-full">
          <div className="w-14 h-14 bg-saferaho-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <TrendingUp className="w-7 h-7 text-saferaho-blue" />
          </div>

          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-saferaho-navy leading-tight mb-3">
            SIP Calculator
          </h1>

          <p className="text-base text-saferaho-gray leading-relaxed max-w-xl mx-auto">
            Calculate returns on your Systematic Investment Plan and plan your wealth creation.
          </p>
        </div>
      </section>

      <section className="relative w-full py-10 md:py-16 px-6 md:px-[6vw]">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-[22px] p-6 md:p-8 card-shadow border border-saferaho-navy/5">
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
          </div>
        </div>
      </section>
    </main>
  );
}