import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, Shield } from "lucide-react";
import { siteConfig, navLinks } from "@/data/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const insuranceLinks =
    navLinks.find((l) => l.label === "Insurance")?.children || [];
  const investmentLinks =
    navLinks.find((l) => l.label === "Investments")?.children || [];

  return (
    <footer className="bg-white border-t border-saferaho-navy/[0.06]">
      {/* Trust Banner */}
      <div className="px-6 md:px-[6vw] py-8 border-b border-saferaho-navy/[0.06]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-saferaho-navy/[0.04] rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-saferaho-navy">IRDAI Registered Advisor</p>
              <p className="text-xs text-saferaho-gray">Licensed to serve you across India</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs text-saferaho-gray">
            <span>{siteConfig.contact.phone}</span>
            <span>{siteConfig.contact.email}</span>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="px-6 md:px-[6vw] py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center mb-4">
              <img
                src="/logo.png"
                alt={`${siteConfig.name} logo`}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-saferaho-gray text-sm leading-relaxed mb-6">
              {siteConfig.tagline}. Simple, honest protection for your family, health, vehicle, and travels.
            </p>
            <div className="space-y-3">
              <a
                href={`tel:${siteConfig.contact.phoneHref}`}
                className="flex items-center gap-3 text-sm text-saferaho-gray hover:text-saferaho-navy transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{siteConfig.contact.phone}</span>
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-3 text-sm text-saferaho-gray hover:text-saferaho-navy transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{siteConfig.contact.email}</span>
              </a>
              <a
                href={siteConfig.social.whatsapp}
                className="flex items-center gap-3 text-sm text-saferaho-gray hover:text-saferaho-navy transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Insurance Links */}
          <div>
            <h3 className="font-body font-semibold text-xs uppercase tracking-wider text-saferaho-gray/60 mb-4">
              Insurance
            </h3>
            <ul className="space-y-2.5">
              {insuranceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-saferaho-gray hover:text-saferaho-navy transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Investments Links */}
          <div>
            <h3 className="font-body font-semibold text-xs uppercase tracking-wider text-saferaho-gray/60 mb-4">
              Investments
            </h3>
            <ul className="space-y-2.5">
              {investmentLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-saferaho-gray hover:text-saferaho-navy transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Address & Tools */}
          <div>
            <h3 className="font-body font-semibold text-xs uppercase tracking-wider text-saferaho-gray/60 mb-4">
              Contact
            </h3>
            <div className="flex items-start gap-3 text-sm text-saferaho-gray mb-6">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{siteConfig.contact.address}</span>
            </div>
            <h3 className="font-body font-semibold text-xs uppercase tracking-wider text-saferaho-gray/60 mb-4">
              Tools
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/tools/sip"
                  className="text-sm text-saferaho-gray hover:text-saferaho-navy transition-colors"
                >
                  SIP Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/emi"
                  className="text-sm text-saferaho-gray hover:text-saferaho-navy transition-colors"
                >
                  EMI Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/health-coverage"
                  className="text-sm text-saferaho-gray hover:text-saferaho-navy transition-colors"
                >
                  Health Coverage Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/life-coverage"
                  className="text-sm text-saferaho-gray hover:text-saferaho-navy transition-colors"
                >
                  Life Coverage Calculator
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-saferaho-navy/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-saferaho-gray/60 text-center md:text-left">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-saferaho-gray/60 hover:text-saferaho-navy transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-saferaho-gray/60 hover:text-saferaho-navy transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
