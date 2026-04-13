import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { siteConfig, navLinks } from "@/data/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const insuranceLinks =
    navLinks.find((l) => l.label === "Insurance")?.children || [];
  const investmentLinks =
    navLinks.find((l) => l.label === "Investments")?.children || [];

  return (
    <footer className="bg-saferaho-navy text-white">
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
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              {siteConfig.description}. Simple, honest protection for your
              family, health, vehicle, and travels.
            </p>
            <div className="space-y-3">
              <a
                href={`tel:${siteConfig.contact.phoneHref}`}
                className="flex items-center gap-3 text-sm text-white/80 hover:text-saferaho-blue transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{siteConfig.contact.phone}</span>
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-3 text-sm text-white/80 hover:text-saferaho-blue transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{siteConfig.contact.email}</span>
              </a>
              <a
                href={siteConfig.social.whatsapp}
                className="flex items-center gap-3 text-sm text-white/80 hover:text-saferaho-blue transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Insurance Links */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-white/50 mb-4">
              Insurance
            </h3>
            <ul className="space-y-2.5">
              {insuranceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-saferaho-blue transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Investments Links */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-white/50 mb-4">
              Investments
            </h3>
            <ul className="space-y-2.5">
              {investmentLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-saferaho-blue transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Address & Tools */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-white/50 mb-4">
              Contact
            </h3>
            <div className="flex items-start gap-3 text-sm text-white/70 mb-6">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{siteConfig.contact.address}</span>
            </div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-white/50 mb-4">
              Tools
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/tools"
                  className="text-sm text-white/80 hover:text-saferaho-blue transition-colors"
                >
                  SIP Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="text-sm text-white/80 hover:text-saferaho-blue transition-colors"
                >
                  EMI Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="text-sm text-white/80 hover:text-saferaho-blue transition-colors"
                >
                  Coverage Calculator
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50 text-center md:text-left">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
