import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../src/index.css';
import { SiteShell } from '@/components/SiteShell';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Insurance & Investments`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
