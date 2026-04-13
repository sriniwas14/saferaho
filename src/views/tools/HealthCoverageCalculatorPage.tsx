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

export function HealthCoverageCalculatorPage() {
  const [age, setAge] = useState(30);
  const [familySize, setFamilySize] = useState(3);
  const [city, setCity] = useState<'metro' | 'non-metro'>('metro');
  const [result, setResult] = useState<CalculatorResult[]>([]);

  useEffect(() => {
    const baseCoverage = city === 'metro' ? 500000 : 300000;
    const ageMultiplier = age > 40 ? 1.5 : age > 30 ? 1.2 : 1;
    const familyMultiplier = familySize > 2 ? 1.5 : 1;
    const recommendedCoverage = Math.round(baseCoverage * ageMultiplier * familyMultiplier / 100000) * 100000;

    setResult([
      { label: 'Recommended Coverage', value: `₹${recommendedCoverage.toLocaleString('en-IN')}` },
      { label: 'Family Size', value: `${familySize} members` },
      { label: 'City Type', value: city === 'metro' ? 'Metro' : 'Non-Metro' },
    ]);
  }, [age, familySize, city]);

  return (
    <main className="relative pt-20">
      <section className="relative w-full min-h-[40vh] flex items-center plus-grid px-6 md:px-[6vw] py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center w-full">
          <div className="w-14 h-14 bg-saferaho-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Calculator className="w-7 h-7 text-saferaho-blue" />
          </div>

          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-saferaho-navy leading-tight mb-3">
            Health Coverage Calculator
          </h1>

          <p className="text-base text-saferaho-gray leading-relaxed max-w-xl mx-auto">
            Calculate how much health coverage you need based on your age, family size, and medical history.
          </p>
        </div>
      </section>

      <section className="relative w-full py-10 md:py-16 px-6 md:px-[6vw]">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-[22px] p-6 md:p-8 card-shadow border border-saferaho-navy/5">
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
          </div>
        </div>
      </section>
    </main>
  );
}