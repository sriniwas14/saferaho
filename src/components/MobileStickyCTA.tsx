import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { Phone, MessageCircle } from 'lucide-react';

export function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (barRef.current) {
      if (isVisible) {
        gsap.fromTo(barRef.current, 
          { y: '100%' },
          { y: '0%', duration: 0.4, ease: 'power2.out' }
        );
      } else {
        gsap.to(barRef.current, {
          y: '100%', duration: 0.3, ease: 'power2.in'
        });
      }
    }
  }, [isVisible]);

  if (typeof window !== 'undefined' && window.innerWidth >= 768) return null;

  return (
    <div
      ref={barRef}
      className="fixed bottom-0 left-0 right-0 z-50 translate-y-full md:hidden"
    >
      <div className="bg-white border-t border-saferaho-navy/[0.06] shadow-lg shadow-black/5">
        <div className="flex items-center gap-2 p-3 safe-area-bottom">
          <a
            href="tel:+918860077551"
            className="flex-1 inline-flex items-center justify-center gap-2 h-12 bg-saferaho-navy text-white font-semibold rounded-xl active:scale-[0.98] transition-transform"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
          <a
            href="https://wa.me/918860077551"
            className="flex-1 inline-flex items-center justify-center gap-2 h-12 bg-emerald-500 text-white font-semibold rounded-xl active:scale-[0.98] transition-transform"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
          <Link
            href="/contact"
            className="flex-1 inline-flex items-center justify-center gap-2 h-12 bg-gradient-to-r from-amber-400 to-amber-500 text-white font-semibold rounded-xl active:scale-[0.98] transition-transform"
          >
            Get Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
