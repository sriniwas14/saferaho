'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BarChart3 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

gsap.registerPlugin(ScrollTrigger);

interface CalculatorResult {
  label: string;
  value: string;
  subtext?: string;
}

export function InflationCalculatorPage() {
  const [currentAmount, setCurrentAmount] = useState(100000);
  const [years, setYears] = useState(10);
  const [inflationRate, setInflationRate] = useState(6);
  const [result, setResult] = useState<CalculatorResult[]>([]);

  useEffect(() => {
    const futureValue = currentAmount * Math.pow(1 + inflationRate / 100, years);
    const purchasingPower = (currentAmount / futureValue) * 100;

    setResult([
      { label: 'Current Value', value: `₹${currentAmount.toLocaleString('en-IN')}` },
      { label: 'Future Value Needed', value: `₹${Math.round(futureValue).toLocaleString('en-IN')}` },
      { label: 'Purchasing Power', value: `${purchasingPower.toFixed(1)}%`, subtext: 'After inflation' },
    ]);
  }, [currentAmount, years, inflationRate]);

  return (
    <main className="relative pt-20">
      <section className="relative w-full min-h-[40vh] flex items-center plus-grid px-6 md:px-[6vw] py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center w-full">
          <div className="w-14 h-14 bg-saferaho-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <BarChart3 className="w-7 h-7 text-saferaho-blue" />
          </div>

          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-saferaho-navy leading-tight mb-3">
            Inflation Calculator
          </h1>

          <p className="text-base text-saferaho-gray leading-relaxed max-w-xl mx-auto">
            See how inflation affects your purchasing power and plan your investments accordingly.
          </p>
        </div>
      </section>

      <section className="relative w-full py-10 md:py-16 px-6 md:px-[6vw]">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-[22px] p-6 md:p-8 card-shadow border border-saferaho-navy/5">
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
          </div>
        </div>
      </section>
    </main>
  );
}