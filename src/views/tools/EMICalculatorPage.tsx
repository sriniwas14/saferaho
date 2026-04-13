'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CreditCard } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

gsap.registerPlugin(ScrollTrigger);

interface CalculatorResult {
  label: string;
  value: string;
  subtext?: string;
}

export function EMICalculatorPage() {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(10);
  const [tenure, setTenure] = useState(5);
  const [result, setResult] = useState<CalculatorResult[]>([]);

  useEffect(() => {
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
  }, [loanAmount, interestRate, tenure]);

  return (
    <main className="relative pt-20">
      <section className="relative w-full min-h-[40vh] flex items-center plus-grid px-6 md:px-[6vw] py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center w-full">
          <div className="w-14 h-14 bg-saferaho-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <CreditCard className="w-7 h-7 text-saferaho-blue" />
          </div>

          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-saferaho-navy leading-tight mb-3">
            EMI Calculator
          </h1>

          <p className="text-base text-saferaho-gray leading-relaxed max-w-xl mx-auto">
            Calculate Equated Monthly Installments for loans and plan your finances better.
          </p>
        </div>
      </section>

      <section className="relative w-full py-10 md:py-16 px-6 md:px-[6vw]">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-[22px] p-6 md:p-8 card-shadow border border-saferaho-navy/5">
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
          </div>
        </div>
      </section>
    </main>
  );
}