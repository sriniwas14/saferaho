import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Handshake } from "lucide-react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

gsap.registerPlugin(ScrollTrigger);

type PartnerLogo = {
  name: string;
  domain: string;
  src?: string;
  className?: string;
  category: "Insurance" | "Mutual Funds";
};

const insurancePartners: PartnerLogo[] = [
  {
    name: "Agriculture Insurance Company of India Ltd.",
    domain: "aicofindia.com",
    src: "/partners/AIC.png",
    category: "Insurance",
  },
  {
    name: "Bajaj Allianz General Insurance Co. Ltd",
    domain: "bajajallianz.com",
    src: "/partners/Bajaj_Allianz.svg",
    className: "max-h-10 md:max-h-11",
    category: "Insurance",
  },
  {
    name: "Cholamandalam MS General Insurance Co. Ltd",
    domain: "cholainsurance.com",
    src: "/partners/Chola_MS.png",
    category: "Insurance",
  },
  {
    name: "Navi General Insurance Ltd.",
    domain: "navi.com",
    src: "/partners/Navi.png",
    category: "Insurance",
  },
  {
    name: "ECGC Ltd.",
    domain: "ecgc.in",
    src: "/partners/ECGC_Ltd.jpg",
    category: "Insurance",
  },
  {
    name: "Future Generali India Insurance Co. Ltd.",
    domain: "futuregenerali.in",
    src: "/partners/Future_Generali.svg",
    category: "Insurance",
  },
  {
    name: "HDFC ERGO General Insurance Co. Ltd",
    domain: "hdfcergo.com",
    src: "/partners/HDFC_ERGO.svg",
    category: "Insurance",
  },
  {
    name: "IFFCO-TOKIO General Insurance Co. Ltd.",
    domain: "iffcotokio.co.in",
    src: "/partners/IFFCO_Tokio.svg",
    category: "Insurance",
  },
  {
    name: "ICICI Lombard General Insurance Co. Ltd.",
    domain: "icicilombard.com",
    src: "/partners/ICICI_Lombard.png",
    category: "Insurance",
  },
  {
    name: "Kotak Mahindra General insurance co. Ltd.",
    domain: "kotakgeneral.com",
    src: "/partners/Kotak_Mahindra.svg",
    category: "Insurance",
  },
  {
    name: "Liberty General Insurance Co. Ltd.",
    domain: "libertyinsurance.in",
    src: "/partners/Liberty_General.png",
    category: "Insurance",
  },
  {
    name: "Magma HDI General Insurance Co. Ltd.",
    domain: "magmahdi.com",
    src: "/partners/Magma_HDI.png",
    category: "Insurance",
  },
  {
    name: "National Insurance Co. Ltd.",
    domain: "nationalinsurance.nic.co.in",
    src: "/partners/National_Insurance.png",
    category: "Insurance",
  },
  {
    name: "Raheja QBE General Insurance Co. Ltd.",
    domain: "rahejaqbe.com",
    src: "/partners/Raheja_QBE.jpg",
    category: "Insurance",
  },
  {
    name: "Reliance General Insurance Co. Ltd.",
    domain: "reliancegeneral.co.in",
    src: "/partners/Reliance_General.svg",
    category: "Insurance",
  },
  {
    name: "Royal Sundaram General Insurance Co. Ltd",
    domain: "royalsundaram.in",
    src: "/partners/Royal_Sundaram.jpg",
    category: "Insurance",
  },
  {
    name: "SBI General Insurance Co. Ltd.",
    domain: "sbigeneral.in",
    src: "/partners/SBI_General.png",
    category: "Insurance",
  },
  {
    name: "Shriram General Insurance Co. Ltd.",
    domain: "shriramgi.com",
    src: "/partners/Shriram_General.svg",
    category: "Insurance",
  },
  {
    name: "Tata-AIG General Insurance Co. Ltd.",
    domain: "tataaig.com",
    src: "/partners/Tata_AIG.png",
    category: "Insurance",
  },
  {
    name: "The New India Assurance Co. Ltd.",
    domain: "newindia.co.in",
    src: "/partners/New_India_Assurance.svg",
    category: "Insurance",
  },
  {
    name: "The Oriental Insurance Co. Ltd.",
    domain: "orientalinsurance.org.in",
    src: "/partners/Oriental_Insurance.png",
    category: "Insurance",
  },
  {
    name: "Universal Sompo General Insurance Co. Ltd.",
    domain: "universalsompo.com",
    src: "/partners/Universal_Sompo.svg",
    category: "Insurance",
  },
  {
    name: "United India Insurance Co. Ltd.",
    domain: "uiic.co.in",
    src: "/partners/United_India_Insurance.svg",
    category: "Insurance",
  },
  {
    name: "Acko General Insurance Ltd.",
    domain: "acko.com",
    src: "/partners/Acko.svg",
    className: "max-h-11 md:max-h-12",
    category: "Insurance",
  },
  {
    name: "Edelweiss General Insurance Company Limited",
    domain: "edelweissinsurance.com",
    category: "Insurance",
  },
  {
    name: "Go Digit General Insurance Limited",
    domain: "godigit.com",
    src: "/partners/Digit.svg",
    className: "max-h-11 md:max-h-12",
    category: "Insurance",
  },
  {
    name: "Aditya Birla Health insurance Co Ltd.",
    domain: "adityabirlacapital.com",
    src: "/partners/Aditya_Birla_Health.png",
    className: "max-h-11 md:max-h-13",
    category: "Insurance",
  },
  {
    name: "Manipal Cigna Health Insurance Company Limited",
    domain: "manipalcigna.com",
    src: "/partners/Manipal_Cigna.png",
    category: "Insurance",
  },
  {
    name: "Niva bupa health insurance company limited",
    domain: "nivabupa.com",
    src: "/partners/Niva_Bupa.svg",
    category: "Insurance",
  },
  {
    name: "Care Health Insurance Ltd",
    domain: "careinsurance.com",
    src: "/partners/Care_Health.png",
    className: "max-h-12 md:max-h-14",
    category: "Insurance",
  },
  {
    name: "Star Health & Allied Insurance Co. Ltd",
    domain: "starhealth.in",
    src: "/partners/Star_Health.svg",
    className: "max-h-12 md:max-h-14",
    category: "Insurance",
  },
  {
    name: "General Insurance corporation of India",
    domain: "gicre.in",
    src: "/partners/GIC_Re.svg",
    category: "Insurance",
  },
  {
    name: "General Reinsurance AG - India Branch",
    domain: "genre.com",
    src: "/partners/Gen_Re.png",
    category: "Insurance",
  },
  {
    name: "Munich Re - India Branch",
    domain: "munichre.com",
    src: "/partners/Munich_Re.svg",
    category: "Insurance",
  },
  {
    name: "RGA Life Reinsurance Co. of Canada - India Branch",
    domain: "rgare.com",
    src: "/partners/RGA.png",
    category: "Insurance",
  },
  {
    name: "SCOR SE - India Branch",
    domain: "scor.com",
    src: "/partners/SCOR_SE.svg",
    category: "Insurance",
  },
  {
    name: "Swiss Reinsurance Company Ltd.-India Branch",
    domain: "swissre.com",
    src: "/partners/Swiss_Re.svg",
    category: "Insurance",
  },
  {
    name: "XL Insurance Co SE - India Reinsurance Branch",
    domain: "axaxl.com",
    src: "/partners/XL_Insurance.svg",
    category: "Insurance",
  },
  {
    name: "Hannover Ruck SE - India Branch",
    domain: "hannover-re.com",
    src: "/partners/Hannover_Re.svg",
    category: "Insurance",
  },
  {
    name: "Lloyd's",
    domain: "lloyds.com",
    src: "/partners/Lloyds.svg",
    category: "Insurance",
  },
  {
    name: "AXA France VIE - India Reinsurance Branch",
    domain: "axa.com",
    src: "/partners/AXA_France_Vie.svg",
    category: "Insurance",
  },
  {
    name: "Allianz Global Corporate & Speciality SE, India Branch",
    domain: "agcs.allianz.com",
    src: "/partners/Allianz.svg",
    category: "Insurance",
  },
];

const mutualFundPartners: PartnerLogo[] = [
  { name: "NJ Mutual Fund", domain: "njmutualfund.com", category: "Mutual Funds" },
  {
    name: "Choice Mutual Fund",
    domain: "choicemutualfund.com",
    category: "Mutual Funds",
  },
  {
    name: "The Wealth Company Mutual Fund",
    domain: "thewealthcompany.in",
    category: "Mutual Funds",
  },
  {
    name: "Capitalmind Mutual Fund",
    domain: "capitalmind.com",
    category: "Mutual Funds",
  },
  {
    name: "JioBlackRock Mutual Fund",
    domain: "jioblackrockamc.com",
    category: "Mutual Funds",
  },
  { name: "Unifi Mutual Fund", domain: "unifimf.com", category: "Mutual Funds" },
  { name: "Helios Mutual Fund", domain: "heliosmf.in", category: "Mutual Funds" },
  {
    name: "Bajaj Finserv Mutual Fund",
    domain: "bajajamc.com",
    category: "Mutual Funds",
  },
  {
    name: "Navi Mutual Fund",
    domain: "navimutualfund.com",
    category: "Mutual Funds",
  },
  {
    name: "Bandhan Mutual Fund",
    domain: "bandhanmutual.com",
    category: "Mutual Funds",
  },
  { name: "Union Mutual Fund", domain: "unionmf.com", category: "Mutual Funds" },
  {
    name: "Nippon India Mutual Fund",
    domain: "nipponindiamf.com",
    category: "Mutual Funds",
  },
  { name: "360 ONE Mutual Fund", domain: "360.one", category: "Mutual Funds" },
  {
    name: "WhiteOak Capital Mutual Fund",
    domain: "whiteoakamc.com",
    category: "Mutual Funds",
  },
  {
    name: "PGIM India Mutual Fund",
    domain: "pgimindiamf.com",
    category: "Mutual Funds",
  },
  {
    name: "Motilal Oswal Mutual Fund",
    domain: "motilaloswalmf.com",
    category: "Mutual Funds",
  },
  {
    name: "Bank of India Mutual Fund",
    domain: "boimf.in",
    category: "Mutual Funds",
  },
  {
    name: "Mirae Asset Mutual Fund",
    domain: "miraeassetmf.co.in",
    category: "Mutual Funds",
  },
  {
    name: "Aditya Birla Sun Life Mutual Fund",
    domain: "adityabirlacapital.com",
    category: "Mutual Funds",
  },
  {
    name: "Franklin Templeton Mutual Fund",
    domain: "franklintempletonindia.com",
    category: "Mutual Funds",
  },
  { name: "LIC Mutual Fund", domain: "licmf.com", category: "Mutual Funds" },
  {
    name: "JM Financial Mutual Fund",
    domain: "jmmutualfund.com",
    category: "Mutual Funds",
  },
  {
    name: "ICICI Prudential Mutual Fund",
    domain: "icicipruamc.com",
    category: "Mutual Funds",
  },
  { name: "Quant Mutual Fund", domain: "quantmutual.com", category: "Mutual Funds" },
  {
    name: "Canara Robeco Mutual Fund",
    domain: "canararobeco.com",
    category: "Mutual Funds",
  },
  {
    name: "Mahindra Manulife Mutual Fund",
    domain: "mahindramanulife.com",
    category: "Mutual Funds",
  },
  { name: "ITI Mutual Fund", domain: "itiamc.com", category: "Mutual Funds" },
  { name: "TRUST Mutual Fund", domain: "trustmf.in", category: "Mutual Funds" },
  {
    name: "Abakkus Mutual Fund",
    domain: "abakkusamc.com",
    category: "Mutual Funds",
  },
  { name: "Samco Mutual Fund", domain: "samcomf.com", category: "Mutual Funds" },
  { name: "SBI Mutual Fund", domain: "sbimf.com", category: "Mutual Funds" },
  { name: "DSP Mutual Fund", domain: "dspim.com", category: "Mutual Funds" },
  {
    name: "Tata Mutual Fund",
    domain: "tatamutualfund.com",
    category: "Mutual Funds",
  },
  {
    name: "Edelweiss Mutual Fund",
    domain: "edelweissmf.com",
    category: "Mutual Funds",
  },
  {
    name: "Invesco Mutual Fund",
    domain: "invesco.com",
    category: "Mutual Funds",
  },
  {
    name: "Sundaram Mutual Fund",
    domain: "sundarammutual.com",
    category: "Mutual Funds",
  },
  { name: "HDFC Mutual Fund", domain: "hdfcfund.com", category: "Mutual Funds" },
  { name: "HSBC Mutual Fund", domain: "hsbc.co.in", category: "Mutual Funds" },
  { name: "PPFAS Mutual Fund", domain: "ppfas.com", category: "Mutual Funds" },
  {
    name: "Baroda BNP Paribas Mutual Fund",
    domain: "barodabnpparibasmf.in",
    category: "Mutual Funds",
  },
  {
    name: "Quantum Mutual Fund",
    domain: "quantumamc.com",
    category: "Mutual Funds",
  },
  {
    name: "Taurus Mutual Fund",
    domain: "taurusmutualfund.com",
    category: "Mutual Funds",
  },
  {
    name: "Shriram Mutual Fund",
    domain: "shriramamc.in",
    category: "Mutual Funds",
  },
  {
    name: "Groww Mutual Fund",
    domain: "growwmutualfund.in",
    category: "Mutual Funds",
  },
  {
    name: "Kotak Mahindra Mutual Fund",
    domain: "kotakmf.com",
    category: "Mutual Funds",
  },
  {
    name: "Zerodha Mutual Fund",
    domain: "zerodhamf.com",
    category: "Mutual Funds",
  },
  { name: "Axis Mutual Fund", domain: "axismf.com", category: "Mutual Funds" },
  { name: "UTI Mutual Fund", domain: "utimf.com", category: "Mutual Funds" },
];

const popularInsurancePartners = [
  "Bajaj Allianz General Insurance Co. Ltd",
  "HDFC ERGO General Insurance Co. Ltd",
  "ICICI Lombard General Insurance Co. Ltd.",
  "Tata-AIG General Insurance Co. Ltd.",
  "SBI General Insurance Co. Ltd.",
  "Acko General Insurance Ltd.",
  "Go Digit General Insurance Limited",
  "Star Health & Allied Insurance Co. Ltd",
  "Care Health Insurance Ltd",
  "Niva bupa health insurance company limited",
  "Aditya Birla Health insurance Co Ltd.",
  "Manipal Cigna Health Insurance Company Limited",
];

const popularMutualFundPartners = [
  "Aditya Birla Sun Life Mutual Fund",
  "ICICI Prudential Mutual Fund",
  "SBI Mutual Fund",
  "HDFC Mutual Fund",
  "Nippon India Mutual Fund",
  "Axis Mutual Fund",
  "UTI Mutual Fund",
  "Kotak Mahindra Mutual Fund",
  "Mirae Asset Mutual Fund",
  "Motilal Oswal Mutual Fund",
  "DSP Mutual Fund",
  "Tata Mutual Fund",
  "Franklin Templeton Mutual Fund",
  "LIC Mutual Fund",
  "Bandhan Mutual Fund",
  "Bajaj Finserv Mutual Fund",
  "Edelweiss Mutual Fund",
];

const prioritizePartners = (
  items: PartnerLogo[],
  featuredNames: string[],
) => {
  const featuredIndex = new Map(
    featuredNames.map((name, index) => [name, index]),
  );

  return [...items].sort((left, right) => {
    const leftIndex = featuredIndex.get(left.name);
    const rightIndex = featuredIndex.get(right.name);

    if (leftIndex !== undefined && rightIndex !== undefined) {
      return leftIndex - rightIndex;
    }

    if (leftIndex !== undefined) {
      return -1;
    }

    if (rightIndex !== undefined) {
      return 1;
    }

    return 0;
  });
};

const partnersWithLogos = [
  ...prioritizePartners(insurancePartners, popularInsurancePartners),
  ...prioritizePartners(mutualFundPartners, popularMutualFundPartners),
].filter((partner) => Boolean(partner.src));

const ITEMS_PER_SLIDE = 16;

const createSlides = (items: PartnerLogo[], chunkSize: number) => {
  const slides: PartnerLogo[][] = [];

  for (let index = 0; index < items.length; index += chunkSize) {
    slides.push(items.slice(index, index + chunkSize));
  }

  return slides;
};

const partnerSlides = createSlides(partnersWithLogos, ITEMS_PER_SLIDE);

function PartnerCard({ partner }: { partner: PartnerLogo }) {
  return (
    <div className="partner-logo group relative min-h-[104px] md:min-h-[116px] bg-white rounded-2xl px-4 md:px-5 py-4 flex items-center justify-center card-shadow border border-saferaho-navy/[0.04] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-saferaho-navy/[0.06] overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-saferaho-gold/70 via-saferaho-navy/10 to-saferaho-gold/20 opacity-70" />

      <img
        src={partner.src}
        alt={`${partner.name} logo`}
        loading="lazy"
        className={`w-full h-auto object-contain ${partner.className ?? "max-h-12 md:max-h-14"} transition-all duration-300`}
      />
    </div>
  );
}

export function PartnersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom" },
      });

      tl.fromTo(
        ".section-eyebrow",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4 },
      )
        .fromTo(
          ".section-title",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.2",
        )
        .fromTo(
          ".partner-slide",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
          "-=0.15",
        )
        .fromTo(
          ".partner-logo",
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.03,
            duration: 0.35,
            ease: "power2.out",
          },
          "-=0.25",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const updateCurrentSlide = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };

    updateCurrentSlide();
    carouselApi.on("select", updateCurrentSlide);
    carouselApi.on("reInit", updateCurrentSlide);

    return () => {
      carouselApi.off("select", updateCurrentSlide);
      carouselApi.off("reInit", updateCurrentSlide);
    };
  }, [carouselApi]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-14 md:py-20 px-6 md:px-[6vw] bg-saferaho-cloud"
    >
      <div className="relative max-w-6xl mx-auto">
        <div
          ref={headerRef}
          className="text-center max-w-2xl mx-auto mb-10 md:mb-12"
        >
          <span className="section-eyebrow text-xs font-semibold uppercase tracking-[0.15em] text-saferaho-gold mb-3 flex items-center justify-center gap-2">
            <Handshake className="w-3.5 h-3.5" />
            Trusted Partnerships
          </span>
          <h2 className="section-title font-display text-2xl md:text-3xl lg:text-4xl text-saferaho-navy mb-3">
            Trusted insurers and investment partners
          </h2>
          <p className="text-sm md:text-base text-saferaho-gray leading-relaxed">
            Insurance companies first, followed by mutual fund partners, across
            curated logo slides.
          </p>
        </div>

        <div ref={logosRef} className="relative px-2 md:px-10">
          <Carousel
            setApi={setCarouselApi}
            opts={{ align: "start", loop: false }}
            className="w-full"
          >
            <CarouselContent>
              {partnerSlides.map((slide, slideIndex) => (
                <CarouselItem key={`partner-slide-${slideIndex}`}>
                  <div className="partner-slide grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
                    {slide.map((partner) => (
                      <PartnerCard key={partner.name} partner={partner} />
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-0 md:-left-4 border-saferaho-navy/10 bg-white text-saferaho-navy hover:bg-saferaho-navy hover:text-white disabled:opacity-30" />
            <CarouselNext className="right-0 md:-right-4 border-saferaho-navy/10 bg-white text-saferaho-navy hover:bg-saferaho-navy hover:text-white disabled:opacity-30" />
          </Carousel>

          <div className="mt-6 flex items-center justify-center gap-2">
            {partnerSlides.map((_, slideIndex) => (
              <button
                key={`partner-dot-${slideIndex}`}
                type="button"
                aria-label={`Go to partner slide ${slideIndex + 1}`}
                onClick={() => carouselApi?.scrollTo(slideIndex)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === slideIndex
                    ? "w-8 bg-saferaho-navy"
                    : "w-2.5 bg-saferaho-navy/20 hover:bg-saferaho-navy/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
