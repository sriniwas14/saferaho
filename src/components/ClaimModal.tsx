"use client";

import { useState, useEffect, useCallback } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CheckCircle, Loader2, Shield, X, Clock, Headphones, Check, ChevronsUpDown, ArrowLeft, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactCountryFlag from "react-country-flag";
import { countryCodes, getCountryByCode } from "@/data/country-codes";

interface ClaimModalProps {
  triggerClassName?: string;
}

const TURNSTILE_SITE_KEY = "1x00000000000000000000AA";

const validateName = (name: string) => name.trim().length >= 2;

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePhone = (phone: string, code: string) => {
  const digits = phone.replace(/\D/g, "");
  if (code === "IN") {
    return digits.length === 10 && /^[6-9]\d{9}$/.test(digits);
  }
  return digits.length >= 4 && digits.length <= 15;
};

const formatPhone = (value: string, code: string) => {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 0) return "";
  if (code === "IN") {
    if (digits.length <= 5) return digits;
    return `${digits.slice(0, 5)} ${digits.slice(5, 10)}`;
  }
  return digits;
};

const POLICY_TYPES = [
  { value: "health", label: "Health" },
  { value: "life", label: "Life" },
  { value: "motor", label: "Motor" },
  { value: "travel", label: "Travel" },
  { value: "others", label: "Others" },
];

export function ClaimModal({ triggerClassName = "btn-secondary text-sm" }: ClaimModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [stage, setStage] = useState<"form" | "otp" | "success">("form");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [policyType, setPolicyType] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [countryCode, setCountryCode] = useState("IN");
  const [countryPickerOpen, setCountryPickerOpen] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    email?: string;
    policyType?: string;
  }>({});
  const [otpValue, setOtpValue] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [phoneHint, setPhoneHint] = useState("");

  useEffect(() => {
    if (stage === "success") {
      const id = setTimeout(() => setIsOpen(false), 2500);
      return () => clearTimeout(id);
    }
  }, [stage]);

  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const maxLen = countryCode === "IN" ? 10 : 15;
      const digits = e.target.value.replace(/\D/g, "").slice(0, maxLen);
      setPhone(formatPhone(digits, countryCode));
    },
    [countryCode],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};
    if (!validateName(name)) newErrors.name = "Please enter at least 2 characters";
    if (!validatePhone(phone, countryCode)) {
      newErrors.phone =
        countryCode === "IN"
          ? "Enter a valid 10-digit Indian number"
          : "Enter a valid phone number";
    }
    if (!validateEmail(email)) newErrors.email = "Enter a valid email address";
    if (!policyType) newErrors.policyType = "Select a policy type";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    if (!turnstileToken) return;

    setIsSubmitting(true);

    const selectedCountry = getCountryByCode(countryCode);
    const payload = {
      name: name.trim(),
      phone: `${selectedCountry?.dial ?? "+91"} ${phone.replace(/\D/g, "")}`,
      email: email.trim(),
      policyType,
      policyNumber: policyNumber.trim(),
      turnstileToken,
    };

    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Claim submitted:", payload);

    setIsSubmitting(false);

    const digits = phone.replace(/\D/g, "");
    setPhoneHint(digits.slice(-4));
    setOtpValue("");
    setCountdown(60);
    setOtpError(null);
    setIsVerifying(false);
    setStage("otp");
  };

  const handleOtpBack = useCallback(() => {
    setStage("form");
  }, []);

  const handleResend = useCallback(() => {
    setOtpValue("");
    setCountdown(60);
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

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setStage("form");
      setName("");
      setPhone("");
      setEmail("");
      setPolicyType("");
      setPolicyNumber("");
      setCountryCode("IN");
      setTurnstileToken(null);
      setIsSubmitting(false);
      setErrors({});
      setOtpValue("");
      setCountdown(60);
      setOtpError(null);
      setIsVerifying(false);
      setPhoneHint("");
    }
  };

  const allValid =
    validateName(name) &&
    validatePhone(phone, countryCode) &&
    validateEmail(email) &&
    Boolean(policyType) &&
    Boolean(turnstileToken);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className={triggerClassName}>
          Claim Now
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
              <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-saferaho-blue/10 px-3 py-1 text-xs font-semibold text-saferaho-blue">
                <Headphones className="h-3 w-3" />
                Claim Support
              </div>
              <h2 className="font-display text-[1.75rem] leading-tight text-saferaho-navy md:text-[2rem]">
                Start Your Claim
              </h2>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-saferaho-gray">
                Submit your details and we&apos;ll raise a service desk ticket for you.
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

            <form onSubmit={handleSubmit} className="space-y-4 px-7 pb-2">
              <div>
                <Label
                  htmlFor="claim-name"
                  className="text-sm font-medium text-saferaho-navy mb-1.5 block"
                >
                  Full Name <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="claim-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
                  }}
                  className={`h-12 bg-white rounded-xl transition-colors ${
                    errors.name
                      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                      : "border-saferaho-navy/10"
                  }`}
                  required
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1.5">{errors.name}</p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="claim-phone"
                  className="text-sm font-medium text-saferaho-navy mb-1.5 block"
                >
                  Phone Number <span className="text-red-400">*</span>
                </Label>
                <div className="flex">
                  <Popover open={countryPickerOpen} onOpenChange={setCountryPickerOpen}>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        role="combobox"
                        aria-expanded={countryPickerOpen}
                        className="!h-12 w-[100px] rounded-l-xl rounded-r-none border border-r-0 bg-white border-saferaho-navy/10 flex items-center justify-between px-2 text-xs font-medium text-saferaho-navy transition-colors"
                      >
                        <ReactCountryFlag
                          countryCode={countryCode}
                          svg
                          className="h-4 w-5 shrink-0"
                        />
                        {getCountryByCode(countryCode)?.dial}
                        <ChevronsUpDown className="h-3 w-3 shrink-0 opacity-50" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="z-[60] w-[280px] p-0" align="start">
                      <Command>
                        <CommandInput placeholder="Search country..." className="h-10" />
                        <CommandList>
                          <CommandEmpty className="py-4 text-xs text-saferaho-gray">
                            No country found
                          </CommandEmpty>
                          <CommandGroup>
                            {countryCodes.map((c) => (
                              <CommandItem
                                key={c.code}
                                value={`${c.name} ${c.dial} ${c.code}`}
                                onSelect={() => {
                                  setCountryCode(c.code);
                                  setCountryPickerOpen(false);
                                }}
                                className="flex items-center gap-2 px-2 py-1.5"
                              >
                                <ReactCountryFlag
                                  countryCode={c.code}
                                  svg
                                  className="h-4 w-5 shrink-0"
                                />
                                <span className="text-xs font-medium text-saferaho-navy">
                                  {c.dial}
                                </span>
                                <span className="flex-1 text-xs text-saferaho-gray">
                                  {c.name}
                                </span>
                                <Check
                                  className={cn(
                                    "h-3.5 w-3.5",
                                    countryCode === c.code
                                      ? "text-saferaho-blue opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <Input
                    id="claim-phone"
                    type="tel"
                    placeholder={countryCode === "IN" ? "XXXXX XXXXX" : "Phone number"}
                    value={phone}
                    onChange={(e) => {
                      handlePhoneChange(e);
                      if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
                    }}
                    className={`h-12 rounded-r-xl rounded-l-none bg-white transition-colors ${
                      errors.phone
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : "border-saferaho-navy/10"
                    }`}
                    required
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-red-500 mt-1.5">{errors.phone}</p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="claim-email"
                  className="text-sm font-medium text-saferaho-navy mb-1.5 block"
                >
                  Email Address <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="claim-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                  }}
                  className={`h-12 bg-white rounded-xl transition-colors ${
                    errors.email
                      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                      : "border-saferaho-navy/10"
                  }`}
                  required
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="claim-policy-type"
                  className="text-sm font-medium text-saferaho-navy mb-1.5 block"
                >
                  Policy Type <span className="text-red-400">*</span>
                </Label>
                <Select value={policyType} onValueChange={(v) => {
                  setPolicyType(v);
                  if (errors.policyType) setErrors((p) => ({ ...p, policyType: undefined }));
                }}>
                  <SelectTrigger
                    id="claim-policy-type"
                    className={`h-12 bg-white rounded-xl transition-colors ${
                      errors.policyType
                        ? "border-red-300"
                        : "border-saferaho-navy/10"
                    }`}
                  >
                    <SelectValue placeholder="Select policy type" />
                  </SelectTrigger>
                  <SelectContent>
                    {POLICY_TYPES.map((pt) => (
                      <SelectItem key={pt.value} value={pt.value}>
                        {pt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.policyType && (
                  <p className="text-xs text-red-500 mt-1.5">{errors.policyType}</p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="claim-policy-number"
                  className="text-sm font-medium text-saferaho-navy mb-1.5 block"
                >
                  Policy Number <span className="text-saferaho-gray/50 font-normal">(optional)</span>
                </Label>
                <Input
                  id="claim-policy-number"
                  type="text"
                  placeholder="e.g. SAF-2024-XXXXXX"
                  value={policyNumber}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 32);
                    setPolicyNumber(val);
                  }}
                  className="h-12 bg-white rounded-xl border-saferaho-navy/10 transition-colors"
                  maxLength={32}
                />
              </div>

              <div className="flex justify-center pt-1">
                <Turnstile
                  siteKey={TURNSTILE_SITE_KEY}
                  onSuccess={setTurnstileToken}
                  options={{
                    theme: "light",
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={!allValid || isSubmitting}
                className="btn-primary w-full h-12 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                ) : (
                  "Submit Claim"
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-xs text-saferaho-gray/70 pb-1">
                <Shield className="w-3 h-3" />
                <span>Your data is protected. We&apos;ll never share it.</span>
              </div>
            </form>
          </>
        )}

        {stage === "otp" && (
          <>
            <div className="relative px-7 pb-2 pt-7 text-center">
              <button
                type="button"
                onClick={handleOtpBack}
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
              Claim Submitted!
            </h2>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-saferaho-gray">
              We&apos;ve received your claim request. Our team will reach out within 24 hours.
            </p>
            <div className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-saferaho-cloud px-3 py-1.5">
              <Shield className="h-3.5 w-3.5 text-saferaho-blue" />
              <span className="text-xs font-medium text-saferaho-navy">
                Ticket raised
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
