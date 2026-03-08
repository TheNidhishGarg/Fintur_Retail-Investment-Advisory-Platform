// @ts-nocheck
"use client";

import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  User, LayoutGrid, Settings, Search, BarChart3, Leaf, Sparkles,
  Bell, BookOpen, LineChart, Check,
  Linkedin, Twitter, Instagram
} from "lucide-react";

// Image paths (served from public/images/landing/)
const heroBg = "/images/landing/hero-bg.jpg";
const cardAnalyseStock = "/images/landing/card-analyse-stock.jpg";
const cardPortfolio = "/images/landing/card-portfolio.jpg";
const cardMfAnalyse = "/images/landing/card-mf-analyse.jpg";
const cardMfCreate = "/images/landing/card-mf-create.jpg";
const trustMeeting = "/images/landing/trust-meeting.jpg";
const stepProfile = "/images/landing/step-profile.jpg";
const stepAnalyse = "/images/landing/step-analyse.jpg";
const stepGoal = "/images/landing/step-goal.jpg";
const stepSolution = "/images/landing/step-solution.jpg";
const benefitAlerts = "/images/landing/benefit-alerts.jpg";
const benefitGuidance = "/images/landing/benefit-guidance.jpg";
const benefitTracking = "/images/landing/benefit-tracking.jpg";

// Turtle Logo SVG
const TurtleLogo = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="18" cy="20" rx="12" ry="9" fill="hsl(160, 22%, 46%)" opacity="0.25" />
    <path d="M18 10C12 10 8 15 8 20C8 25 12 28 18 28C24 28 28 25 28 20C28 15 24 10 18 10Z" stroke="hsl(160, 22%, 46%)" strokeWidth="1.8" fill="none" />
    <path d="M18 12L15 16H21L18 12Z" fill="hsl(160, 22%, 46%)" opacity="0.4" />
    <path d="M13 18L18 14L23 18L20.5 24H15.5L13 18Z" stroke="hsl(160, 22%, 46%)" strokeWidth="1.2" fill="hsl(160, 22%, 46%)" opacity="0.15" />
    <line x1="18" y1="14" x2="18" y2="24" stroke="hsl(160, 22%, 46%)" strokeWidth="0.8" opacity="0.4" />
    <line x1="13" y1="18" x2="23" y2="18" stroke="hsl(160, 22%, 46%)" strokeWidth="0.8" opacity="0.4" />
    <circle cx="11" cy="16" r="1.5" fill="hsl(160, 22%, 46%)" opacity="0.5" />
    <circle cx="25" cy="16" r="1.5" fill="hsl(160, 22%, 46%)" opacity="0.5" />
    <circle cx="9" cy="22" r="1.2" fill="hsl(160, 22%, 46%)" opacity="0.4" />
    <circle cx="27" cy="22" r="1.2" fill="hsl(160, 22%, 46%)" opacity="0.4" />
    <ellipse cx="13" cy="11" rx="2" ry="1.5" fill="hsl(160, 22%, 46%)" opacity="0.3" />
    <circle cx="12.5" cy="10.8" r="0.6" fill="hsl(220, 30%, 12%)" />
  </svg>
);

// Fade up animation wrapper
const FadeUp = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Growth curve SVG
const GrowthCurve = () => (
  <svg viewBox="0 0 400 120" className="w-full h-24 mt-6">
    <defs>
      <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(38, 52%, 66%)" stopOpacity="0.4" />
        <stop offset="100%" stopColor="hsl(38, 52%, 66%)" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path d="M0 100 Q50 95 100 80 T200 50 T300 30 T400 10" fill="none" stroke="hsl(38, 52%, 66%)" strokeWidth="2.5" />
    <path d="M0 100 Q50 95 100 80 T200 50 T300 30 T400 10 L400 120 L0 120 Z" fill="url(#curveGrad)" />
  </svg>
);

// Navbar
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300 ${scrolled ? "border-b border-border shadow-sm" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TurtleLogo />
          <span className="font-serif text-2xl font-bold tracking-tight">
            Fin<span className="text-sage">tur</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-muted transition-colors">
            <User size={20} className="text-muted-foreground" />
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-muted transition-colors">
            <LayoutGrid size={20} className="text-muted-foreground" />
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-muted transition-colors">
            <Settings size={20} className="text-muted-foreground" />
          </button>
        </div>
      </div>
    </nav>
  );
};

// Section 1 - Hero
const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Financial district at golden hour" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ivory/[0.55] via-ivory/[0.40] to-ivory/[0.20]" />

      </div>
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-serif font-bold text-foreground leading-none"
          style={{ fontSize: "clamp(60px, 10vw, 120px)" }}
        >
          Fin<span className="text-sage">tur</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 max-w-3xl mx-auto"
        >
          <p className="text-xl md:text-2xl text-foreground/90 font-bold leading-normal">
            An advisory platform for personalized retail investment<br />
            and portfolio generation
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10"
        >
          <button
            onClick={() => navigate("/login")}
            className="bg-sage text-primary-foreground px-10 py-4 rounded-full text-base font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            Get Started
          </button>
        </motion.div>
      </div>
    </section>
  );
};

// Section 2 - What We Do
const whatWeDoCards = [
  { icon: Search, title: "Analyse a Stock", desc: "Deep-dive into any stock with comprehensive fundamental and technical analysis.", image: cardAnalyseStock, accent: "bg-clay-rose/20 border-clay-rose/30" },
  { icon: BarChart3, title: "Analyse Your Stock Portfolio", desc: "Get a complete health check of your stock portfolio with actionable insights.", image: cardPortfolio, accent: "bg-sage/20 border-sage/30" },
  { icon: Leaf, title: "Analyse Your MF Portfolio", desc: "Evaluate your mutual fund holdings for overlap, risk balance, and performance.", image: cardMfAnalyse, accent: "bg-gold/20 border-gold/30" },
  { icon: Sparkles, title: "Create Your MF Portfolio", desc: "Build a personalized mutual fund portfolio aligned to your goals and risk appetite.", image: cardMfCreate, accent: "bg-slate-blue/20 border-slate-blue/30" },
];

const WhatWeDoSection = () => (
  <section className="py-32 bg-ivory">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {whatWeDoCards.map((card, i) => (
          <FadeUp key={card.title} delay={i * 0.1}>
            <div className={`fintur-card rounded-2xl overflow-hidden border ${card.accent}`}>
              <div className="relative h-48 overflow-hidden">
                <img src={card.image} alt={card.title} className="w-full h-full object-cover opacity-60 saturate-50" />
                <div className={`absolute inset-0 ${card.accent.split(" ")[0]} mix-blend-multiply`} />
              </div>
              <div className="p-6 bg-ivory">
                <div className="flex items-center gap-3 mb-3">
                  <card.icon size={22} className="text-sage" />
                  <h3 className="font-serif text-xl font-semibold text-foreground">{card.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

// Section 3 - Why Trust Us
const trustStats = [
  { value: "X%", label: "Average Annual Returns" },
  { value: "X+", label: "Portfolios Managed" },
  { value: "X Cr+", label: "Assets Advised" },
  { value: "X+", label: "Happy Investors" },
];

const TrustSection = () => (
  <section className="py-0">
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
      <div className="relative overflow-hidden">
        <img src={trustMeeting} alt="Financial advisor meeting" className="w-full h-full object-cover min-h-[400px]" />
        <div className="absolute inset-0 bg-sage/40 mix-blend-multiply" />
      </div>
      <div className="bg-deep-navy p-12 lg:p-16 flex flex-col justify-center">
        <div className="grid grid-cols-2 gap-8">
          {trustStats.map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.15}>
              <div>
                <p className="font-serif text-4xl lg:text-5xl font-bold text-gold">{stat.value}</p>
                <p className="text-ivory/70 text-sm mt-2">{stat.label}</p>
              </div>
            </FadeUp>
          ))}
        </div>
        <FadeUp delay={0.5}>
          <GrowthCurve />
        </FadeUp>
        <FadeUp delay={0.6}>
          <p className="font-serif italic text-ivory/60 text-base mt-8 leading-relaxed">
            &quot;We believe in building portfolios that grow with you — grounded in research, driven by discipline, and shaped by your unique goals.&quot;
          </p>
        </FadeUp>
      </div>
    </div>
  </section>
);

// Section 4 - Steps
const steps = [
  { num: "I", title: "Tell Us About You", desc: "Share your financial profile and preferences.", image: stepProfile },
  { num: "II", title: "We Identify What You Lack", desc: "Gap analysis on your current investments.", image: stepAnalyse },
  { num: "III", title: "Define Your Investment Goal", desc: "Set clear, achievable financial targets.", image: stepGoal },
  { num: "IV", title: "Your Personalised Solution", desc: "Receive a curated portfolio just for you.", image: stepSolution },
];

const StepsSection = () => (
  <section className="py-32" style={{ background: "linear-gradient(180deg, hsl(43,33%,96%) 0%, hsl(210,26%,90%) 100%)" }}>
    <div className="max-w-6xl mx-auto px-6">
      {/* Desktop horizontal timeline */}
      <div className="hidden md:block">
        <div className="flex items-start justify-between relative">
          {/* Connector line */}
          <div className="absolute top-6 left-[12.5%] right-[12.5%] h-px border-t-2 border-dashed border-gold/50" />
          {steps.map((step, i) => (
            <FadeUp key={step.num} delay={i * 0.15} className="flex flex-col items-center w-1/4 relative">
              <div className="w-12 h-12 rounded-full bg-sage/20 border-2 border-sage flex items-center justify-center font-serif text-lg font-bold text-sage z-10 bg-ivory">
                {step.num}
              </div>
              <div className="fintur-card mt-6 rounded-2xl overflow-hidden bg-ivory border border-border w-full max-w-[220px]">
                <img src={step.image} alt={step.title} className="w-full h-28 object-cover opacity-70 saturate-50" />
                <div className="p-4">
                  <h4 className="font-serif font-semibold text-foreground text-sm">{step.title}</h4>
                  <p className="text-muted-foreground text-xs mt-1">{step.desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
      {/* Mobile vertical */}
      <div className="md:hidden space-y-8">
        {steps.map((step, i) => (
          <FadeUp key={step.num} delay={i * 0.1}>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-sage/20 border-2 border-sage flex items-center justify-center font-serif text-sm font-bold text-sage shrink-0">
                {step.num}
              </div>
              <div className="fintur-card rounded-xl overflow-hidden bg-ivory border border-border flex-1">
                <img src={step.image} alt={step.title} className="w-full h-32 object-cover opacity-70 saturate-50" />
                <div className="p-4">
                  <h4 className="font-serif font-semibold text-foreground">{step.title}</h4>
                  <p className="text-muted-foreground text-sm mt-1">{step.desc}</p>
                </div>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

// Section 5 - Benefits
const benefits = [
  { icon: Bell, title: "Timely Investment Alerts", desc: "Stay ahead with real-time notifications on market movements and portfolio changes that matter to you.", image: benefitAlerts },
  { icon: BookOpen, title: "Smart Financial Guidance", desc: "Get expert-backed recommendations and insights tailored to your risk profile and investment horizon.", image: benefitGuidance },
  { icon: LineChart, title: "Easy Portfolio Tracking", desc: "Monitor all your investments in one clean dashboard — stocks, mutual funds, and more at a glance.", image: benefitTracking },
];

const BenefitsSection = () => (
  <section className="py-32">
    {benefits.map((benefit, i) => {
      const isReversed = i % 2 === 1;
      return (
        <div key={benefit.title} className={`${i % 2 === 0 ? "bg-ivory" : "bg-sage/5"}`}>
          <div className={`max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isReversed ? "direction-rtl" : ""}`}>
            <FadeUp className={`${isReversed ? "lg:order-2" : ""}`}>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img src={benefit.image} alt={benefit.title} className="w-full h-72 object-cover" />
              </div>
            </FadeUp>
            <FadeUp delay={0.2} className={`${isReversed ? "lg:order-1" : ""}`}>
              <div className="flex flex-col gap-4">
                <div className="w-14 h-14 rounded-2xl bg-sage/10 flex items-center justify-center">
                  <benefit.icon size={28} className="text-sage" />
                </div>
                <h3 className="font-serif text-3xl font-semibold text-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-md">{benefit.desc}</p>
              </div>
            </FadeUp>
          </div>
        </div>
      );
    })}
  </section>
);

// Section 6 - Pricing
const plans = [
  {
    name: "Essential",
    price: "₹X/month",
    accent: "border-sage/30",
    bg: "bg-sage/5",
    featured: false,
    features: ["Basic stock analysis", "Portfolio health score", "Monthly market insights", "Email alerts", "1 goal tracker"],
  },
  {
    name: "Wealth",
    price: "₹X/month",
    accent: "border-gold",
    bg: "bg-gold/5",
    featured: true,
    features: ["Advanced stock & MF analysis", "Full portfolio optimization", "Weekly personalised insights", "Real-time alerts", "Unlimited goal trackers", "Priority advisor access"],
  },
  {
    name: "Legacy",
    price: "Custom Pricing",
    accent: "border-clay-rose/30",
    bg: "bg-clay-rose/5",
    featured: false,
    features: ["Everything in Wealth", "Dedicated financial advisor", "Tax advisory & planning", "Family portfolio management", "Quarterly review calls"],
  },
];

const PricingSection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-32 bg-ivory relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
      </div>
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, i) => (
            <FadeUp key={plan.name} delay={i * 0.15}>
              <div className={`fintur-card rounded-3xl ${plan.bg} border ${plan.accent} p-8 flex flex-col h-full ${plan.featured ? "md:-mt-4 md:mb-4 shadow-xl ring-2 ring-gold/20" : ""}`}>
                {plan.featured && (
                  <span className="inline-block self-start bg-gold text-foreground text-xs font-semibold px-3 py-1 rounded-full mb-4">
                    Most Popular
                  </span>
                )}
                <h3 className="font-serif text-2xl font-bold text-foreground">{plan.name}</h3>
                <p className="font-serif text-3xl font-bold text-sage mt-3">{plan.price}</p>
                <ul className="mt-6 space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check size={16} className="text-sage mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate("/login")}
                  className={`mt-8 w-full py-3 rounded-full font-medium text-sm transition-all duration-300 ${plan.featured ? "bg-sage text-primary-foreground hover:shadow-lg" : "border border-sage text-sage hover:bg-sage/10"}`}
                >
                  Choose {plan.name}
                </button>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};

// Section 7 - Footer
const footerLinks = {
  Platform: ["Portfolio Management", "Goal Planning", "Tax Advisory", "Insights"],
  Company: ["About", "Advisors", "Careers", "Press"],
  Support: ["Help Centre", "SEBI Disclosures", "Grievance", "Contact"],
};

const Footer = () => (
  <footer className="bg-deep-navy py-16">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TurtleLogo />
            <span className="font-serif text-xl font-bold text-ivory">
              Fin<span className="text-sage">tur</span>
            </span>
          </div>
          <p className="text-ivory/50 text-sm leading-relaxed">
            An advisory platform for personalized retail investment and portfolio generation.
          </p>
          <div className="flex gap-3 mt-6">
            {[Linkedin, Twitter, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full bg-ivory/10 flex items-center justify-center hover:bg-ivory/20 transition-colors">
                <Icon size={16} className="text-ivory/70" />
              </a>
            ))}
          </div>
        </div>
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="font-serif text-ivory font-semibold mb-4">{title}</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-ivory/50 text-sm hover:text-ivory/80 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-ivory/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-ivory/40 text-xs">© 2026 Fintur. All rights reserved.</p>
        <div className="flex gap-6">
          {["Privacy Policy", "Terms of Service", "Disclaimer"].map((link) => (
            <a key={link} href="#" className="text-ivory/40 text-xs hover:text-ivory/70 transition-colors">{link}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

// Main Page
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      <HeroSection />
      <WhatWeDoSection />
      <TrustSection />
      <StepsSection />
      <BenefitsSection />
      <PricingSection />
      <Footer />
    </div>
  );
}
