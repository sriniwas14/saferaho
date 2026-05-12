"use client";

import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { LeadForm } from "@/components/LeadForm";
import { X, Sparkles, Clock, Shield } from "lucide-react";

interface QuoteModalProps {
  triggerClassName?: string;
}

export function QuoteModal({ triggerClassName = "btn-primary text-sm" }: QuoteModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={triggerClassName}>
          Get a Quote
        </button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[580px] p-0 gap-0 rounded-[34px] border-saferaho-navy/[0.06] shadow-[0_40px_80px_rgba(10,22,40,0.12)] bg-white"
        showCloseButton={false}
      >
        {/* Gold accent strip */}
        <div className="relative h-1.5 w-full shrink-0 bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600" />

        {/* Custom close button */}
        <DialogClose className="absolute top-5 right-5 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-saferaho-navy/[0.04] bg-white/80 shadow-sm transition-all duration-200 hover:bg-white">
          <X className="h-4 w-4 text-saferaho-gray" />
        </DialogClose>

        {/* Decorative warm glow */}
        <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 translate-x-1/4 -translate-y-1/4 rounded-full bg-gradient-to-br from-amber-400/10 to-transparent blur-3xl" />

        {/* Header */}
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

        {/* Divider */}
        <div className="mx-7 my-5 h-px bg-gradient-to-r from-transparent via-saferaho-navy/[0.06] to-transparent" />

        {/* Form */}
        <div className="px-7 pb-2">
          <LeadForm variant="default" showSource={false} showEmail={true} />
        </div>

        {/* Trust footer */}
        <div className="flex items-center justify-center gap-2 border-t border-saferaho-navy/[0.04] bg-saferaho-cloud/80 px-7 py-3.5">
          <Shield className="h-3.5 w-3.5 text-saferaho-gray/40" />
          <span className="text-xs text-saferaho-gray/50">
            Your data is protected. We&apos;ll never share it with third parties.
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
