import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Check,
  Shield,
  Heart,
  ArrowRight,
  Award,
} from "lucide-react";

const slides = [
  {
    id: "family",
    image: "/images/hero-family.jpg",
    tag: "Family Insurance",
    title: "Secure your family's tomorrow, today",
    description: "Comprehensive coverage for every stage of life",
    testimonial: {
      text: "Got my claim settled in 3 days. Saferaho made it effortless.",
      author: "Priya Sharma, Delhi",
      initials: "P",
      gradient: "from-amber-400 to-amber-600",
    },
  },
  {
    id: "health",
    image: "/images/health-insurance.jpg",
    tag: "Health Insurance",
    title: "Cashless treatment at 10,000+ hospitals",
    description: "No surprise bills. No hidden deductibles.",
    testimonial: {
      text: "Saved ₹85,000 on my mother's surgery. Truly grateful.",
      author: "Rajesh Mehta, Mumbai",
      initials: "R",
      gradient: "from-emerald-400 to-emerald-600",
    },
  },
  {
    id: "life",
    image: "/images/life-insurance.jpg",
    tag: "Life Insurance",
    title: "Protect what matters most",
    description: "Simple term plans with 100% transparency",
    testimonial: {
      text: "Finally found a term plan that's actually affordable.",
      author: "Ananya Gupta, Bangalore",
      initials: "A",
      gradient: "from-blue-400 to-indigo-600",
    },
  },
  {
    id: "motor",
    image: "/images/motor-insurance.jpg",
    tag: "Motor Insurance",
    title: "Drive with peace of mind",
    description: "Claim assistance from start to finish",
    testimonial: {
      text: "Car claim processed in 48 hours. Unbelievable service.",
      author: "Vikram Singh, Pune",
      initials: "V",
      gradient: "from-orange-400 to-red-600",
    },
  },
  {
    id: "travel",
    image: "/images/travel-insurance.jpg",
    tag: "Travel Insurance",
    title: "Explore the world, worry-free",
    description: "Global coverage for 200+ countries",
    testimonial: {
      text: "Medical evacuation covered in Europe. Lifesaver!",
      author: "Neha Patel, Ahmedabad",
      initials: "N",
      gradient: "from-sky-400 to-blue-600",
    },
  },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(id);
  }, [paused]);

  const slide = slides[current];

  return (
    <section className="relative w-full pt-24 md:pt-28 pb-12 md:pb-16 px-6 md:px-[6vw] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-saferaho-navy/2 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] -translate-y-1/2 translate-x-1/3 bg-gradient-to-bl from-saferaho-blue/4 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white rounded-[32px] overflow-hidden card-shadow border border-saferaho-navy/[0.04]">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col justify-center p-8 md:p-12 lg:p-16 order-2 lg:order-1"
          >
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-[3.75rem] text-saferaho-navy leading-[1.05] tracking-tight mb-5">
              Aaj plan karo,
              <br />
              <span className="italic text-saferaho-blue">kal Safe Raho</span>
            </h1>

            <div className="flex flex-col gap-3 mb-6">
              <Link
                href="/contact"
                className="btn-primary inline-flex items-center justify-center gap-2 text-center"
              >
                Get your personalized plan
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/919999116504"
                className="btn-secondary text-center inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full">
                <Check className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">
                  100% genuine guidance
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full">
                <Shield className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">
                  100% claims support
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full">
                <Heart className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">Zero spam, always</span>
              </div>
            </div>

            <div className="pt-6">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-saferaho-gold" />
                <div>
                  <div className="text-sm font-semibold text-saferaho-navy">
                    India's only 100% unbiased platform
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image Side - Slideshow */}
          <div
            className="relative lg:col-span-7 order-1 lg:order-2 min-h-[320px] md:min-h-[420px] lg:min-h-full bg-gradient-to-br from-saferaho-navy/5 to-saferaho-cloud overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={slide.id}
                custom={direction}
                className="absolute inset-0"
                variants={{
                  enter: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%" }),
                  center: { x: 0 },
                  exit: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%" }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <img
                  src={slide.image}
                  alt={slide.tag}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-saferaho-navy/30 via-saferaho-navy/10 to-transparent" />

                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
                  className="absolute bottom-24 left-6 md:left-8 max-w-[260px]"
                >
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full mb-3">
                    {slide.tag}
                  </span>
                  <h3 className="text-white text-xl md:text-2xl font-display font-bold leading-tight">
                    {slide.title}
                  </h3>
                  <p className="text-white/80 text-sm mt-1.5 leading-snug">
                    {slide.description}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.3 }}
                  className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-auto max-w-[220px] md:max-w-[240px] bg-white/95 backdrop-blur-sm rounded-2xl p-3.5 card-shadow border border-white/50"
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`w-8 h-8 rounded-full bg-gradient-to-br ${slide.testimonial.gradient} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                    >
                      {slide.testimonial.initials}
                    </div>
                    <div>
                      <p className="text-xs text-saferaho-navy leading-snug font-medium">
                        &ldquo;{slide.testimonial.text}&rdquo;
                      </p>
                      <p className="text-[11px] text-saferaho-gray mt-1 font-medium">
                        {slide.testimonial.author}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Slide indicators */}
            <div className="absolute top-4 right-4 flex gap-1.5 z-10">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "bg-white w-4"
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Partner Bar */}
        {/* <motion.div */}
        {/*   initial={{ opacity: 0, y: 12 }} */}
        {/*   animate={{ opacity: 1, y: 0 }} */}
        {/*   transition={{ duration: 0.4, delay: 0.3 }} */}
        {/*   className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-4 md:px-8" */}
        {/* > */}
        {/*   <div className="flex items-center gap-2 text-saferaho-gray"> */}
        {/*     <Award className="w-4 h-4 text-saferaho-gold" /> */}
        {/*     <span className="text-xs font-semibold uppercase tracking-wider"> */}
        {/*       Trusted partners */}
        {/*     </span> */}
        {/*   </div> */}
        {/*   <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6"> */}
        {/*     {[ */}
        {/*       "ICICI Prudential", */}
        {/*       "HDFC Life", */}
        {/*       "Max Life", */}
        {/*       "Star Health", */}
        {/*       "Bajaj Allianz", */}
        {/*     ].map((partner) => ( */}
        {/*       <span */}
        {/*         key={partner} */}
        {/*         className="text-xs font-medium text-saferaho-gray/60 hover:text-saferaho-navy transition-colors" */}
        {/*       > */}
        {/*         {partner} */}
        {/*       </span> */}
        {/*     ))} */}
        {/*   </div> */}
        {/* </motion.div> */}
      </div>
    </section>
  );
}
