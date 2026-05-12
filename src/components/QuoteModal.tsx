"use client";

import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { LeadForm } from "@/components/LeadForm";
import { X, Sparkles, Clock, Shield, ArrowLeft, Loader2, Smartphone, CheckCircle } from "lucide-react";

interface QuoteModalProps {
  triggerClassName?: string;
}

const COUNTDOWN_DURATION = 60;

export function QuoteModal({ triggerClassName = "btn-primary text-sm" }: QuoteModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [stage, setStage] = useState<"form" | "otp" | "success">("form");
  const [otpValue, setOtpValue] = useState("");
  const [countdown, setCountdown] = useState(COUNTDOWN_DURATION);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [phoneHint, setPhoneHint] = useState("");

  const handleFormSubmit = useCallback((data: { name: string; phone: string; email?: string; source: string; lookingFor: string }) => {
    const digits = data.phone.replace(/\D/g, "");
    setPhoneHint(digits.slice(-4));
    setOtpValue("");
    setCountdown(COUNTDOWN_DURATION);
    setOtpError(null);
    setIsVerifying(false);
    setStage("otp");
  }, []);

  const handleBack = useCallback(() => {
    setStage("form");
  }, []);

  const handleResend = useCallback(() => {
    setOtpValue("");
    setCountdown(COUNTDOWN_DURATION);
    setOtpError(null);
  }, []);

  const handleVerify = useCallback(async () => {
    if (otpValue.length !== 4) return;
    setIsVerifying(true);
    setOtpError(null);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (otpValue === "0000") {
      setIsVerifying(false);
      setStage("success");
    } else {
      setOtpError("Invalid code. Please try again.");
      setIsVerifying(false);
    }
  }, [otpValue]);

  useEffect(() => {
    if (otpError) setOtpError(null);
  }, [otpValue]);

  useEffect(() => {
    if (stage !== "otp" || countdown <= 0) return;

    const id = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(id);
  }, [stage, countdown]);

  useEffect(() => {
    if (stage === "success") {
      const id = setTimeout(() => setIsOpen(false), 2000);
      return () => clearTimeout(id);
    }
  }, [stage]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          className={triggerClassName}
          onClick={() => {
            setStage("form");
            setOtpValue("");
            setCountdown(COUNTDOWN_DURATION);
            setOtpError(null);
            setIsVerifying(false);
          }}
        >
          Get a Quote
        </button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[580px] p-0 gap-0 rounded-[34px] border-saferaho-navy/[0.06] shadow-[0_40px_80px_rgba(10,22,40,0.12)] bg-white"
        showCloseButton={false}
      >
        <div className="relative h-1.5 w-full shrink-0 bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600" />

        <DialogClose className="absolute top-5 right-5 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-saferaho-navy/[0.04] bg-white/80 shadow-sm transition-all duration-200 hover:bg-white">
          <X className="h-4 w-4 text-saferaho-gray" />
        </DialogClose>

        <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 translate-x-1/4 -translate-y-1/4 rounded-full bg-gradient-to-br from-amber-400/10 to-transparent blur-3xl" />

        {stage === "form" && (
          <>
            <div className="relative px-7 pb-2 pt-7 text-center">
              <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                <Sparkles className="h-3 w-3" />
                Free Consultation
              </div>
              <h2 className="font-display text-[1.75rem] leading-tight text-saferaho-navy md:text-[2rem]">
                Get Your Free Quote
              </h2>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-saferaho-gray">
                No obligations. No spam. Just honest advice tailored to your needs.
              </p>
              <div className="mt-4 flex items-center justify-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-xs text-saferaho-gray/70">
                  <Clock className="h-3.5 w-3.5 text-emerald-500" />
                  Response in 24h
                </span>
                <span className="h-1 w-1 rounded-full bg-saferaho-gray/30" />
                <span className="inline-flex items-center gap-1.5 text-xs text-saferaho-gray/70">
                  <Shield className="h-3.5 w-3.5 text-saferaho-blue" />
                  100% secure
                </span>
              </div>
            </div>

            <div className="mx-7 my-5 h-px bg-gradient-to-r from-transparent via-saferaho-navy/[0.06] to-transparent" />

            <div className="px-7 pb-2">
              <LeadForm
                variant="default"
                showSource={false}
                showEmail={true}
                suppressSuccessView
                onSubmit={handleFormSubmit}
              />
            </div>
          </>
        )}

        {stage === "otp" && (
          <>
            <div className="relative px-7 pb-2 pt-7 text-center">
              <button
                type="button"
                onClick={handleBack}
                className="absolute left-6 top-7 flex h-8 w-8 items-center justify-center rounded-full border border-saferaho-navy/[0.04] bg-white/80 shadow-sm transition-all duration-200 hover:bg-white"
              >
                <ArrowLeft className="h-4 w-4 text-saferaho-gray" />
              </button>

              <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                <Smartphone className="h-3 w-3" />
                Verify Identity
              </div>
              <h2 className="font-display text-[1.75rem] leading-tight text-saferaho-navy md:text-[2rem]">
                Enter Verification Code
              </h2>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-saferaho-gray">
                We&apos;ve sent a 4-digit code to your phone ending in{" "}
                <span className="font-semibold text-saferaho-navy">{phoneHint}</span>
              </p>
            </div>

            <div className="mx-7 my-5 h-px bg-gradient-to-r from-transparent via-saferaho-navy/[0.06] to-transparent" />

            <div className="px-7 pb-2">
              <div className="flex flex-col items-center gap-5">
                <InputOTP
                  maxLength={4}
                  value={otpValue}
                  onChange={setOtpValue}
                  containerClassName="justify-center"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="h-14 w-14 rounded-xl border border-saferaho-navy/10 text-lg font-semibold text-saferaho-navy data-[active=true]:border-saferaho-blue data-[active=true]:ring-[3px] data-[active=true]:ring-saferaho-blue/20" />
                    <InputOTPSlot index={1} className="h-14 w-14 rounded-xl border border-saferaho-navy/10 text-lg font-semibold text-saferaho-navy data-[active=true]:border-saferaho-blue data-[active=true]:ring-[3px] data-[active=true]:ring-saferaho-blue/20" />
                    <InputOTPSlot index={2} className="h-14 w-14 rounded-xl border border-saferaho-navy/10 text-lg font-semibold text-saferaho-navy data-[active=true]:border-saferaho-blue data-[active=true]:ring-[3px] data-[active=true]:ring-saferaho-blue/20" />
                    <InputOTPSlot index={3} className="h-14 w-14 rounded-xl border border-saferaho-navy/10 text-lg font-semibold text-saferaho-navy data-[active=true]:border-saferaho-blue data-[active=true]:ring-[3px] data-[active=true]:ring-saferaho-blue/20" />
                  </InputOTPGroup>
                </InputOTP>

                {otpError && (
                  <p className="text-xs text-red-500">{otpError}</p>
                )}

                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={otpValue.length !== 4 || isVerifying}
                  className="btn-primary w-full h-12 disabled:opacity-70"
                >
                  {isVerifying ? (
                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                  ) : (
                    "Verify Code"
                  )}
                </button>

                <div className="text-center">
                  {countdown > 0 ? (
                    <span className="text-sm text-saferaho-gray">
                      Resend code in{" "}
                      <span className="font-semibold text-saferaho-navy">
                        {countdown}s
                      </span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResend}
                      className="text-sm font-medium text-saferaho-blue transition-colors duration-200 hover:underline"
                    >
                      Resend Code
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {stage === "success" && (
          <div className="flex flex-col items-center justify-center px-7 py-14 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
            <h2 className="font-display text-[1.75rem] leading-tight text-saferaho-navy md:text-[2rem]">
              Verified!
            </h2>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-saferaho-gray">
              Your identity has been verified. Our advisor will call you within 24 hours.
            </p>
            <div className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-saferaho-cloud px-3 py-1.5">
              <Shield className="h-3.5 w-3.5 text-saferaho-blue" />
              <span className="text-xs font-medium text-saferaho-navy">
                Your data is secure
              </span>
            </div>
          </div>
        )}

        {stage !== "success" && (
          <div className="flex items-center justify-center gap-2 border-t border-saferaho-navy/[0.04] bg-saferaho-cloud/80 px-7 py-3.5">
            <Shield className="h-3.5 w-3.5 text-saferaho-gray/40" />
            <span className="text-xs text-saferaho-gray/50">
              Your data is protected. We&apos;ll never share it with third parties.
            </span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
