'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MobileStickyCTA } from '@/components/MobileStickyCTA';

interface SiteShellProps {
  children: ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const hideHeader = /^\/travel-insurance\/[^/]+\/[^/]+$/.test(pathname);

  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      {!hideHeader && <Header />}
      {children}
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}
