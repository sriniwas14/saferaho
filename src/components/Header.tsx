"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  CarFront,
  ChevronDown,
  HeartHandshake,
  Menu,
  PlaneTakeoff,
  ShieldPlus,
  Wrench,
  X,
} from "lucide-react";
import { QuoteModal } from "@/components/QuoteModal";
import {
  insuranceMegaMenu,
  insuranceMegaMenuTools,
  navLinks,
  siteConfig,
} from "@/data/site";

const insuranceIconMap = {
  ShieldPlus,
  HeartHandshake,
  CarFront,
  PlaneTakeoff,
  Wrench,
} as const;

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const openMenu = (label: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    setOpenDropdown(label);
  };

  const scheduleClose = () => {
    closeTimerRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 120);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm shadow-black/[0.03]"
          : "bg-transparent"
      }`}
    >
      <div className="w-full px-6 md:px-[6vw]">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt={`${siteConfig.name} logo`}
              className="h-9 md:h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative -m-2"
                onMouseEnter={() => link.children && openMenu(link.label)}
                onMouseLeave={scheduleClose}
              >
                {link.children ? (
                  <>
                    <button
                      className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive(link.href) ||
                        link.children.some((c) => isActive(c.href))
                          ? "text-saferaho-blue"
                          : "text-saferaho-navy/80 hover:text-saferaho-blue"
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${openDropdown === link.label ? "rotate-180" : ""}`}
                      />
                    </button>
                    {openDropdown === link.label &&
                      link.label === "Insurance" && (
                        <div
                          className="fixed left-1/2 top-[5.75rem] z-50 mt-0 w-[min(96vw,1380px)] -translate-x-1/2"
                          onMouseEnter={() => openMenu(link.label)}
                          onMouseLeave={scheduleClose}
                        >
                          <div className="overflow-hidden rounded-[34px] border border-saferaho-navy/10 bg-white/95 p-5 backdrop-blur-xl card-shadow-elevated">
                            <div className="pointer-events-none absolute inset-x-10 top-0 h-20 bg-gradient-to-r from-saferaho-blue/6 via-transparent to-amber-400/8 blur-2xl" />
                            <div className="relative grid grid-cols-[repeat(4,minmax(0,1fr))_290px] gap-3">
                              {insuranceMegaMenu.map((section) => {
                                const Icon = insuranceIconMap[section.icon];

                                return (
                                  <div
                                    key={section.title}
                                    className="group relative overflow-hidden rounded-[26px] border border-saferaho-navy/7 bg-white px-5 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-saferaho-blue/20 hover:shadow-[0_18px_50px_rgba(10,22,40,0.08)]"
                                  >
                                    <div
                                      className={`absolute inset-x-0 top-0 h-20 bg-gradient-to-br ${section.accent}`}
                                    />
                                    <div className="relative">
                                      <div className="mb-4 flex items-center gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-saferaho-blue/10 bg-saferaho-blue/5 text-saferaho-blue">
                                          <Icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                          <Link
                                            href={section.href}
                                            className="font-display text-[1.15rem] leading-none text-saferaho-navy transition-colors group-hover:text-saferaho-blue"
                                          >
                                            {section.title}
                                          </Link>
                                          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-saferaho-gray">
                                            Plans and guides
                                          </p>
                                        </div>
                                      </div>
                                      <div className="space-y-1">
                                        {section.links.map((item) => (
                                          <Link
                                            key={item.href}
                                            href={item.href}
                                            className="block rounded-2xl px-3 py-2.5 text-[15px] font-medium text-saferaho-navy/78 transition-all duration-200 hover:bg-saferaho-cloud hover:text-saferaho-blue"
                                          >
                                            {item.label}
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}

                              <div className="relative overflow-hidden rounded-[28px] border border-saferaho-navy/7 bg-[#f7f9ff] p-6">
                                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-br from-saferaho-blue/10 via-white to-white" />
                                <div className="relative">
                                  <div className="mb-5 flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-saferaho-blue/10 bg-white text-saferaho-blue shadow-sm shadow-saferaho-blue/10">
                                      <Wrench className="h-5 w-5" />
                                    </div>
                                    <div>
                                      <p className="font-display text-[1.15rem] text-saferaho-navy">
                                        {insuranceMegaMenuTools.title}
                                      </p>
                                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-saferaho-gray">
                                        Fast actions
                                      </p>
                                    </div>
                                  </div>
                                  <div className="space-y-1">
                                    {insuranceMegaMenuTools.links.map(
                                      (item) => (
                                        <Link
                                          key={item.href}
                                          href={item.href}
                                          className="block rounded-2xl px-3 py-2.5 text-[15px] font-medium text-saferaho-navy/78 transition-all duration-200 hover:bg-white hover:text-saferaho-blue"
                                        >
                                          {item.label}
                                        </Link>
                                      ),
                                    )}
                                  </div>
                                  <div className="mt-6 rounded-[22px] bg-saferaho-navy px-4 py-4 text-white">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/65">
                                      Need help deciding?
                                    </p>
                                    <p className="mt-2 text-sm leading-6 text-white/85">
                                      Compare plans with an advisor who explains
                                      exclusions, riders, and claim support in
                                      plain language.
                                    </p>
                                    <Link
                                      href="/contact"
                                      className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-saferaho-navy transition-transform duration-200 hover:-translate-y-0.5"
                                    >
                                      Speak to advisor
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    {openDropdown === link.label &&
                      link.label !== "Insurance" && (
                        <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg shadow-black/[0.06] border border-saferaho-navy/[0.06] py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2.5 text-sm text-saferaho-navy/80 hover:bg-saferaho-cloud hover:text-saferaho-blue transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "text-saferaho-blue"
                        : "text-saferaho-navy/80 hover:text-saferaho-blue"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/claim" className="btn-secondary text-sm">
              Claim Now
            </Link>
            <QuoteModal />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-saferaho-cloud transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-saferaho-navy" />
            ) : (
              <Menu className="w-5 h-5 text-saferaho-navy" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-saferaho-navy/[0.06] shadow-lg shadow-black/[0.03]">
          <nav className="px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.children ? (
                  <div className="space-y-1">
                    <span className="block px-4 py-2 text-sm font-semibold text-saferaho-navy">
                      {link.label}
                    </span>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-saferaho-navy/70 hover:text-saferaho-blue pl-8 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={`block px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive(link.href)
                        ? "text-saferaho-blue bg-saferaho-cloud"
                        : "text-saferaho-navy/70 hover:bg-saferaho-cloud hover:text-saferaho-blue"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-saferaho-navy/[0.06] space-y-3">
              <Link
                href="/claim"
                className="btn-secondary text-sm block text-center mx-4"
              >
                Claim Now
              </Link>
              <QuoteModal triggerClassName="btn-primary text-sm block text-center mx-4" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
