import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  XCircle,
  Flame,
  ShieldCheck,
  Download,
  BookOpen,
  Sparkles,
  Clock,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  Lock,
  HeartPulse,
  AlertTriangle,
  FileText,
  Smartphone,
  Check,
  Gift,
  HelpCircle,
  X,
  Volume2,
  Layers,
  Award
} from 'lucide-react';
import coverImg from './assets/images/ebook_cover_1792395532468.jpg';

const CHECKOUT_URL = "https://pay.hotmart.com/W108024157S";
const PRICE = "27,96 €";
const REGULAR_PRICE = "49,90 €";

// Social contacts provided by user
const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/karinzeit?stkn=NmZiY2VzaW1leXlo',
    handle: '@karinzeit',
    color: 'from-pink-600 via-rose-500 to-amber-500',
    iconSvg: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    )
  },
  {
    name: 'Facebook Profil',
    url: 'https://www.facebook.com/share/1c8J76URqe/',
    handle: 'Karin Zeit',
    color: 'from-blue-600 to-blue-700',
    iconSvg: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  },
  {
    name: 'Facebook Seite',
    url: 'https://www.facebook.com/share/1DzZyfFWRL/',
    handle: 'Offizielle Seite',
    color: 'from-blue-500 to-indigo-600',
    iconSvg: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@karinzeit',
    handle: '@karinzeit',
    color: 'from-neutral-900 via-stone-800 to-black',
    iconSvg: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v7.54c0 1.94-.53 3.86-1.65 5.43-1.48 2.07-3.88 3.39-6.44 3.48-1.57.06-3.15-.31-4.55-1.07-2.39-1.3-4.04-3.62-4.47-6.3-.43-2.68.39-5.46 2.24-7.44 1.85-1.98 4.56-2.93 7.28-2.52.01 1.48.01 2.96 0 4.44-1.42-.3-2.92-.09-4.17.61-1.07.6-1.83 1.65-2.07 2.86-.24 1.21.05 2.49.81 3.47.76.98 1.96 1.58 3.21 1.61 1.37.03 2.71-.56 3.53-1.65.68-.9 1.01-2.04 1.01-3.18V.02z"/>
      </svg>
    )
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@karinzeit?si=prrRmxwtRBUQ0sit',
    handle: '@karinzeit',
    color: 'from-red-600 to-rose-700',
    iconSvg: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    )
  },
  {
    name: 'Threads',
    url: 'https://www.threads.com/@karinzeit',
    handle: '@karinzeit',
    color: 'from-neutral-800 to-zinc-950',
    iconSvg: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12.186 24C5.454 24 0 18.625 0 12.01 0 5.397 5.454.022 12.186.022c6.643 0 11.966 5.228 12.012 11.758v.48h-3.41c-.042-4.636-3.87-8.775-8.602-8.775-4.846 0-8.779 3.86-8.779 8.525 0 4.665 3.933 8.524 8.779 8.524 3.045 0 5.836-1.572 7.37-4.152l2.915 1.76C18.497 21.642 15.508 24 12.186 24zm4.195-10.748c0 2.457-1.745 4.316-4.241 4.316-2.502 0-4.225-1.859-4.225-4.316 0-2.458 1.723-4.316 4.225-4.316 2.496 0 4.241 1.858 4.241 4.316z"/>
      </svg>
    )
  },
  {
    name: 'Kwai',
    url: 'https://k.kwai.com/u/@kariningrid673/NxhDbbCg',
    handle: '@kariningrid673',
    color: 'from-amber-500 to-orange-600',
    iconSvg: (
      <span className="font-extrabold text-xs tracking-tighter uppercase px-1 py-0.5 bg-white/20 rounded">
        KW
      </span>
    )
  }
];

// Purchase notification list for social proof (without names, verified purchases)
const PURCHASE_NOTIFICATIONS = [
  { city: "Frankfurt am Main", time: "vor 2 Minuten", device: "PDF Sofort-Download" },
  { city: "Wien", time: "vor 5 Minuten", device: "PDF Sofort-Download" },
  { city: "Hamburg", time: "vor 9 Minuten", device: "PDF Sofort-Download" },
  { city: "Zürich", time: "vor 14 Minuten", device: "PDF Sofort-Download" },
  { city: "München", time: "vor 19 Minuten", device: "PDF Sofort-Download" },
  { city: "Berlin", time: "vor 26 Minuten", device: "PDF Sofort-Download" },
  { city: "Köln", time: "vor 32 Minuten", device: "PDF Sofort-Download" },
  { city: "Stuttgart", time: "vor 41 Minuten", device: "PDF Sofort-Download" },
];

export default function App() {
  // Notification state
  const [notificationIndex, setNotificationIndex] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [hasClosedNotification, setHasClosedNotification] = useState(false);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Interactive Quiz state
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState<{ [key: number]: number }>({});
  const [quizFinished, setQuizFinished] = useState(false);

  // Sticky bottom bar visibility
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Cycle purchase notifications smoothly
  useEffect(() => {
    if (hasClosedNotification) return;

    const initialTimer = setTimeout(() => {
      setShowNotification(true);
    }, 2800);

    const interval = setInterval(() => {
      setShowNotification(false);
      setTimeout(() => {
        setNotificationIndex((prev) => (prev + 1) % PURCHASE_NOTIFICATIONS.length);
        setShowNotification(true);
      }, 1000);
    }, 8500);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [hasClosedNotification]);

  // Scroll listener for sticky CTA
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleQuizAnswer = (qIndex: number, value: number) => {
    const nextScores = { ...quizScore, [qIndex]: value };
    setQuizScore(nextScores);
    if (qIndex < 2) {
      setQuizStep(qIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const currentNotification = PURCHASE_NOTIFICATIONS[notificationIndex];

  return (
    <div className="relative min-h-screen text-stone-100 font-sans overflow-hidden bg-[#071710]">
      {/* 
        ========================================================================
        IMMERSIVE ENVELOPING BACKGROUND (NEVER WHITE! RICH, DEEP & ALIVE)
        ========================================================================
      */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Base radiant botanical gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#06150e] via-[#0b2419] to-[#04100b]" />

        {/* Ambient luminous glow spheres */}
        <div className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] max-w-[750px] max-h-[750px] rounded-full bg-emerald-600/20 blur-[130px] animate-pulse-subtle" />
        <div className="absolute top-[28%] -right-[15%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full bg-teal-500/15 blur-[140px] animate-float-slow" />
        <div className="absolute top-[60%] -left-[12%] w-[45vw] h-[45vw] max-w-[650px] max-h-[650px] rounded-full bg-emerald-500/15 blur-[120px] animate-float-reverse" />
        <div className="absolute bottom-[5%] right-[5%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-amber-500/10 blur-[130px]" />

        {/* Subtle organic contour lines / luxury noise mesh */}
        <div 
          className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />

        {/* Subtle glowing vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-[#05140d]/40 to-[#020b07]/90" />
      </div>

      {/* Floating social proof notification: Bottom Left (as requested: "sem nomes apenas compra confirmada") */}
      <AnimatePresence>
        {showNotification && !hasClosedNotification && (
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed bottom-5 left-5 z-50 max-w-sm w-[90vw] sm:w-[350px] bg-[#0c291d]/95 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-3.5 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.6),0_0_20px_rgba(16,185,129,0.15)] flex items-start gap-3 text-left"
          >
            <div className="relative shrink-0 mt-0.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-md">
                <CheckCircle2 className="w-5 h-5 text-emerald-950 stroke-[2.5]" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
              </span>
            </div>

            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 tracking-wide uppercase">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Bestätigter Kauf ✓
              </div>
              <p className="text-sm font-semibold text-white truncate">
                E-Book: Was essen bei Sodbrennen?
              </p>
              <div className="flex items-center gap-2 text-xs text-stone-300 mt-0.5">
                <span>{currentNotification.city}</span>
                <span>•</span>
                <span className="text-emerald-300/90">{currentNotification.time}</span>
              </div>
            </div>

            <button
              onClick={() => setHasClosedNotification(true)}
              className="text-stone-400 hover:text-stone-200 p-1 -mr-1 -mt-1 rounded-lg transition-colors"
              aria-label="Schließen"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Banner Alert */}
      <div className="relative z-10 bg-gradient-to-r from-emerald-900/90 via-teal-900/90 to-emerald-950/90 border-b border-emerald-500/20 backdrop-blur-md text-center py-2.5 px-4 text-xs sm:text-sm text-emerald-200 flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[11px] uppercase tracking-wider">
          🔥 Sonderaktion
        </span>
        <span>
          Exklusiver Einführungspreis: <strong>{PRICE}</strong> <span className="line-through text-stone-400 ml-1">{REGULAR_PRICE}</span>
        </span>
        <span className="hidden md:inline text-emerald-400">• Sofortiger PDF-Download</span>
      </div>

      {/* Header / Brand Nav */}
      <header className="relative z-10 max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-900/40 border border-emerald-300/30">
            <HeartPulse className="w-5 h-5 text-emerald-950 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-base font-extrabold tracking-tight text-white block">
              Karin Zeit
            </span>
            <span className="text-[11px] text-emerald-300/80 uppercase tracking-wider block font-medium">
              Natürliche Magen-Gesundheit
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-300">
          <a href="#loesung" className="hover:text-emerald-300 transition-colors">Was löst es?</a>
          <a href="#inhalt" className="hover:text-emerald-300 transition-colors">Buch-Inhalt</a>
          <a href="#fuer-wen" className="hover:text-emerald-300 transition-colors">Für wen?</a>
          <a href="#faq" className="hover:text-emerald-300 transition-colors">Häufige Fragen</a>
        </nav>

        <a
          href={CHECKOUT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 font-semibold text-xs sm:text-sm transition-all duration-300 shadow-sm"
        >
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span>Jetzt für {PRICE}</span>
        </a>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10">

        {/* 
          ======================================================================
          HERO SECTION with Cover Showcase & Core Hook
          ======================================================================
        */}
        <section className="pt-6 pb-20 px-4 sm:px-6 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Copy Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-7 text-left space-y-6"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-semibold tracking-wide shadow-inner">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Praktischer 30-Seiten Ratgeber als PDF</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
                WAS ESSEN BEI{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200">
                  SODBRENNEN?
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-emerald-100/90 font-medium leading-relaxed font-serif-title italic">
                Der sanfte Weg zu einer beschwerdefreien Verdauung – mit Sofortmaßnahmen, Tagesplänen und Rezepten.
              </p>

              {/* Core Description */}
              <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
                Schluss mit dem quälenden Feuer im Hals und schlaflosen Nächten. Erfahren Sie auf 30 Seiten ohne unnötige Theorie und ohne Umwege, welche Lebensmittel Ihren Magen beruhigen und welche das Brennen sofort verstärken.
              </p>

              {/* Key Bullet Highlights */}
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-stone-200 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Sofort-Hilfe gegen akutes Brennen</span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-stone-200 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>3 praxiserprobte Tagespläne</span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-stone-200 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Schluss mit falschen Hausmitteln</span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-stone-200 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Direkt lesbar auf Handy & PC</span>
                </div>
              </div>

              {/* CTA Price Box */}
              <div className="pt-4 space-y-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                    {PRICE}
                  </span>
                  <span className="text-xl text-stone-400 line-through font-medium">
                    {REGULAR_PRICE}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-400/20 border border-amber-400/40 text-amber-300 font-bold text-xs uppercase tracking-wider">
                    Sie sparen 44%
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href={CHECKOUT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 text-emerald-950 font-extrabold text-base sm:text-lg shadow-[0_10px_30px_rgba(16,185,129,0.4)] hover:shadow-[0_15px_40px_rgba(16,185,129,0.6)] hover:scale-[1.02] active:scale-[0.99] transition-all duration-300"
                  >
                    <span>JETZT SICHER KAUFEN</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-stone-300 px-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Sichere Hotmart-Abwicklung & Sofortzugriff</span>
                  </div>
                </div>

                <p className="text-xs text-stone-400 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>Lieferung per E-Mail direkt nach Bestätigung – In 2 Minuten startklar</span>
                </p>
              </div>
            </motion.div>

            {/* Right Book Visual Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="lg:col-span-5 flex justify-center relative"
            >
              <div className="relative group max-w-sm sm:max-w-md w-full">
                {/* Glow under book */}
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/40 to-teal-400/30 rounded-3xl blur-3xl transform -rotate-2 scale-95 group-hover:scale-105 transition-all duration-700" />

                {/* 3D Book Frame */}
                <div className="relative rounded-2xl p-2 bg-gradient-to-b from-emerald-400/40 via-emerald-600/20 to-teal-800/40 backdrop-blur-md border border-emerald-400/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]">
                  <div className="overflow-hidden rounded-xl bg-stone-900 shadow-2xl relative">
                    <img
                      src={coverImg}
                      alt="Was essen bei Sodbrennen? E-Book Cover"
                      className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    
                    {/* Subtle book spine shading overlay */}
                    <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/40 via-black/10 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl pointer-events-none" />
                  </div>
                </div>

                {/* Floating Badge 1: Top Right */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                  className="absolute -top-4 -right-3 sm:-right-6 bg-[#0f3424]/90 backdrop-blur-md border border-emerald-400/40 text-emerald-200 px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-2 text-xs font-bold"
                >
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>30 Seiten Praxis-Wissen</span>
                </motion.div>

                {/* Floating Badge 2: Bottom Left */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-5 -left-3 sm:-left-6 bg-[#0f3424]/90 backdrop-blur-md border border-amber-400/40 text-amber-200 px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-2 text-xs font-bold"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>PDF Sofort-Download</span>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </section>


        {/* 
          ======================================================================
          SECTION: DIE PROBLEM-FAKTEN (Kennen Sie dieses Brennen?)
          ======================================================================
        */}
        <section className="py-16 px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-12"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              <span>Kennen Sie diese Beschwerden?</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Wenn Essen nicht mehr schmeckt, sondern brennt
            </h2>
            <p className="text-stone-300 max-w-2xl mx-auto text-base">
              Millionen Menschen leiden täglich unter Reflux und saurem Aufstoßen. Häufig liegt es an kleinen, unscheinbaren Fehlern im Alltag.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 rounded-2xl bg-[#0c271c]/70 border border-emerald-500/20 backdrop-blur-md hover:border-emerald-400/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-4 text-rose-400">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Das akute Brennen</h3>
              <p className="text-stone-300 text-sm leading-relaxed">
                Ein stechendes, ätzendes Gefühl steigt die Speiseröhre hinauf – besonders nach fettigen Mahlzeiten oder abends beim Hinlegen.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-2xl bg-[#0c271c]/70 border border-emerald-500/20 backdrop-blur-md hover:border-emerald-400/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 text-amber-400">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Große Unsicherheit</h3>
              <p className="text-stone-300 text-sm leading-relaxed">
                Man weiß vor dem Essen oft nicht: Darf ich das noch essen? Welche Zutaten beruhigen den Magen und welche provozieren die Magensäure?
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 rounded-2xl bg-[#0c271c]/70 border border-emerald-500/20 backdrop-blur-md hover:border-emerald-400/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-4 text-teal-400">
                <XCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Falsche Hausmittel</h3>
              <p className="text-stone-300 text-sm leading-relaxed">
                Tipps wie Milch trinken oder Natron schlucken verschlimmern das Brennen im Nachhinein durch den gefürchteten Rebound-Effekt dramatisch.
              </p>
            </motion.div>
          </div>
        </section>


        {/* 
          ======================================================================
          SECTION: WAS IST DAS? & WAS LÖST ES?
          ======================================================================
        */}
        <section id="loesung" className="py-20 px-4 max-w-5xl mx-auto scroll-mt-20">
          <div className="rounded-3xl bg-gradient-to-br from-[#0c2e20]/90 via-[#0e3525]/80 to-[#082016]/90 border border-emerald-500/30 p-8 sm:p-12 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-12 space-y-4 text-left">
                <span className="px-3 py-1 rounded-full bg-emerald-400/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  Die Lösung
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                  Was ist dieser Ratgeber – und was löst er für Sie?
                </h2>
                <p className="text-stone-200 text-base sm:text-lg leading-relaxed">
                  <strong>„Was essen bei Sodbrennen?“</strong> ist ein praktischer Ratgeber als PDF. Auf 30 Seiten zeigt er Ihnen, welche Lebensmittel Ihren Magen beruhigen und welche das Brennen verstärken. Ohne lange Theorie und ohne Umwege bekommen Sie die konkrete Anleitung, Ihre Ernährung magenfreundlich umzustellen – einfach, direkt und in Ihrem eigenen Tempo.
                </p>
              </div>

              {/* 3 Solution Pillars from description */}
              <div className="lg:col-span-12 grid sm:grid-cols-3 gap-6 pt-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="p-6 rounded-2xl bg-[#092217]/90 border border-emerald-500/25 space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
                    1
                  </div>
                  <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Akutes Brennen stoppen</span>
                  </h3>
                  <p className="text-stone-300 text-sm leading-relaxed">
                    Sie erfahren, wie einfache Hausmittel wie stilles Wasser, Mandeln und Haferflocken Ihnen im Moment der Schmerzen spürbar helfen können.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="p-6 rounded-2xl bg-[#092217]/90 border border-emerald-500/25 space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
                    2
                  </div>
                  <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Unsicherheit beim Essen beseitigen</span>
                  </h3>
                  <p className="text-stone-300 text-sm leading-relaxed">
                    Drei fertige Tagespläne, zwei leckere Rezepte und Snack-Ideen zeigen Ihnen genau, was ab sofort bedenkenlos auf den Teller darf.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="p-6 rounded-2xl bg-[#092217]/90 border border-emerald-500/25 space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
                    3
                  </div>
                  <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Falsche Hausmittel vermeiden</span>
                  </h3>
                  <p className="text-stone-300 text-sm leading-relaxed">
                    Vermeiden Sie gefährliche Fehler wie Milch oder Natron, die das Problem oft verschlimmern, und sparen Sie wertvolle Zeit, Nerven und Geld.
                  </p>
                </motion.div>
              </div>

              {/* End result callout */}
              <div className="lg:col-span-12 p-5 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-emerald-500/20 border border-emerald-400/30 flex items-start sm:items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-400 text-emerald-950 flex items-center justify-center shrink-0 font-extrabold text-xl">
                  ✓
                </div>
                <div className="text-left">
                  <h4 className="text-base font-bold text-white">
                    Ihr klares Endergebnis nach dem Lesen:
                  </h4>
                  <p className="text-sm text-emerald-100">
                    Sie wissen ganz genau, wie Sie Ihre persönlichen Auslöser erkennen und Sodbrennen im Alltag gezielt vorbeugen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* 
          ======================================================================
          INTERACTIVE FOOD PREVIEW (Die Ampel: Magenschmeichler vs. Säure-Trigger)
          ======================================================================
        */}
        <section className="py-16 px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-10"
          >
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              Einblick in die Praxis
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Vorschau: Was beruhigt – und was feuert an?
            </h2>
            <p className="text-stone-300 max-w-2xl mx-auto text-sm sm:text-base">
              Im E-Book finden Sie die detaillierte Lebensmittel-Ampel. Hier ist ein erster Vorgeschmack:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Green / Calming */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-2xl bg-[#09251a]/85 border border-emerald-500/30 backdrop-blur-md"
            >
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-emerald-500/20">
                <div className="w-8 h-8 rounded-full bg-emerald-400/20 flex items-center justify-center text-emerald-400 font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-bold text-lg text-emerald-300">Sanfte Magenschmeichler</h3>
                  <span className="text-xs text-stone-300">Beruhigen die Schleimhaut & binden Säure</span>
                </div>
              </div>
              <ul className="space-y-3 text-sm text-stone-200">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Stilles warmes Wasser:</strong> Verdünnt Magensäure sanft ohne Aufstoßen.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Ungesalzene Mandeln:</strong> Gut gekaut bilden sie eine beruhigende Schutzschicht.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Zarter Haferbrei:</strong> Der Klassiker für einen geschützten Magen.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Fenchel- & Kamillentee:</strong> Entkrampfen und harmonisieren die Verdauung.</span>
                </li>
              </ul>
            </motion.div>

            {/* Red / Trigger */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-2xl bg-[#251012]/80 border border-rose-500/30 backdrop-blur-md"
            >
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-rose-500/20">
                <div className="w-8 h-8 rounded-full bg-rose-400/20 flex items-center justify-center text-rose-400 font-bold">
                  ✕
                </div>
                <div>
                  <h3 className="font-bold text-lg text-rose-300">Versteckte Säure-Fallen</h3>
                  <span className="text-xs text-stone-300">Schwächen den Magenverschluss & reizen</span>
                </div>
              </div>
              <ul className="space-y-3 text-sm text-stone-200">
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Kohlensäurereiche Getränke:</strong> Blähen den Magen auf und drücken den Schließmuskel auf.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Milch & Rahm:</strong> Scheinen kurz zu kühlen, regen aber danach die Säureproduktion massiv an.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Natron-Pulver:</strong> Schnelle Erleichterung, führt jedoch oft zu aggressivem Säure-Rückprall.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Schokolade, Pfefferminze & Röststoffe:</strong> Entspannen den Schließmuskel der Speiseröhre.</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </section>


        {/* 
          ======================================================================
          INTERACTIVE QUIZ: Sodbrennen-Check in 3 Klicks
          ======================================================================
        */}
        <section className="py-16 px-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-3xl bg-gradient-to-b from-[#0e2f21] to-[#081e15] border border-emerald-500/30 backdrop-blur-xl shadow-xl text-left"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-emerald-500/20">
              <div className="flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-white text-base sm:text-lg">
                  Schnell-Check: Was triggert Ihr Sodbrennen?
                </span>
              </div>
              <span className="text-xs text-emerald-300 font-semibold px-2 py-0.5 rounded bg-emerald-500/20">
                Schritt {quizFinished ? 3 : quizStep + 1} von 3
              </span>
            </div>

            {!quizFinished ? (
              <div className="space-y-4">
                {quizStep === 0 && (
                  <div>
                    <p className="text-stone-200 text-sm sm:text-base font-semibold mb-3">
                      1. Wann spüren Sie das Brennen oder den Druck am häufigsten?
                    </p>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleQuizAnswer(0, 1)}
                        className="w-full text-left p-3.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-800/40 border border-emerald-500/20 hover:border-emerald-400/50 transition-all text-sm text-stone-200 flex items-center justify-between"
                      >
                        <span>Direkt nach üppigen oder fettigen Mahlzeiten</span>
                        <ChevronDown className="w-4 h-4 -rotate-90 text-emerald-400" />
                      </button>
                      <button
                        onClick={() => handleQuizAnswer(0, 2)}
                        className="w-full text-left p-3.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-800/40 border border-emerald-500/20 hover:border-emerald-400/50 transition-all text-sm text-stone-200 flex items-center justify-between"
                      >
                        <span>Abends im Bett oder beim Bücken</span>
                        <ChevronDown className="w-4 h-4 -rotate-90 text-emerald-400" />
                      </button>
                      <button
                        onClick={() => handleQuizAnswer(0, 3)}
                        className="w-full text-left p-3.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-800/40 border border-emerald-500/20 hover:border-emerald-400/50 transition-all text-sm text-stone-200 flex items-center justify-between"
                      >
                        <span>Unregelmäßig, oft bei Kaffee, Stress oder Hast</span>
                        <ChevronDown className="w-4 h-4 -rotate-90 text-emerald-400" />
                      </button>
                    </div>
                  </div>
                )}

                {quizStep === 1 && (
                  <div>
                    <p className="text-stone-200 text-sm sm:text-base font-semibold mb-3">
                      2. Welche Hausmittel haben Sie bisher probiert?
                    </p>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleQuizAnswer(1, 1)}
                        className="w-full text-left p-3.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-800/40 border border-emerald-500/20 hover:border-emerald-400/50 transition-all text-sm text-stone-200 flex items-center justify-between"
                      >
                        <span>Milch oder Natron (half kurz, kam dann aber wieder)</span>
                        <ChevronDown className="w-4 h-4 -rotate-90 text-emerald-400" />
                      </button>
                      <button
                        onClick={() => handleQuizAnswer(1, 2)}
                        className="w-full text-left p-3.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-800/40 border border-emerald-500/20 hover:border-emerald-400/50 transition-all text-sm text-stone-200 flex items-center justify-between"
                      >
                        <span>Tees oder stilles Wasser (bisher mit gemischtem Erfolg)</span>
                        <ChevronDown className="w-4 h-4 -rotate-90 text-emerald-400" />
                      </button>
                      <button
                        onClick={() => handleQuizAnswer(1, 3)}
                        className="w-full text-left p-3.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-800/40 border border-emerald-500/20 hover:border-emerald-400/50 transition-all text-sm text-stone-200 flex items-center justify-between"
                      >
                        <span>Bisher kaum etwas – ich suche eine klare Anleitung</span>
                        <ChevronDown className="w-4 h-4 -rotate-90 text-emerald-400" />
                      </button>
                    </div>
                  </div>
                )}

                {quizStep === 2 && (
                  <div>
                    <p className="text-stone-200 text-sm sm:text-base font-semibold mb-3">
                      3. Was ist Ihr größter Wunsch für Ihre Ernährung?
                    </p>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleQuizAnswer(2, 1)}
                        className="w-full text-left p-3.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-800/40 border border-emerald-500/20 hover:border-emerald-400/50 transition-all text-sm text-stone-200 flex items-center justify-between"
                      >
                        <span>Fertige Tagespläne, damit ich nicht mehr nachdenken muss</span>
                        <ChevronDown className="w-4 h-4 -rotate-90 text-emerald-400" />
                      </button>
                      <button
                        onClick={() => handleQuizAnswer(2, 2)}
                        className="w-full text-left p-3.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-800/40 border border-emerald-500/20 hover:border-emerald-400/50 transition-all text-sm text-stone-200 flex items-center justify-between"
                      >
                        <span>Schnelle Notfall-Tipps, wenn es wieder akut brennt</span>
                        <ChevronDown className="w-4 h-4 -rotate-90 text-emerald-400" />
                      </button>
                      <button
                        onClick={() => handleQuizAnswer(2, 3)}
                        className="w-full text-left p-3.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-800/40 border border-emerald-500/20 hover:border-emerald-400/50 transition-all text-sm text-stone-200 flex items-center justify-between"
                      >
                        <span>Beides! Ein vollständiger Leitfaden für jeden Tag</span>
                        <ChevronDown className="w-4 h-4 -rotate-90 text-emerald-400" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-stone-200">
                  <h4 className="font-bold text-white text-base mb-1 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                    <span>Ergebnis: Ihr Magen braucht sanfte Entlastung</span>
                  </h4>
                  <p className="text-sm text-emerald-100/90 leading-relaxed">
                    Ihre Antworten zeigen: Mit der richtigen Kombination aus <strong>präzisen Notfall-Hausmitteln</strong> (wie stilles Wasser & Mandeln) und den <strong>3 fertigen Tagesplänen</strong> aus dem Ratgeber können Sie Ihre Beschwerden rasch spürbar lindern.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <a
                    href={CHECKOUT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold text-sm shadow-lg transition-colors"
                  >
                    <span>Ratgeber jetzt für {PRICE} laden</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => {
                      setQuizStep(0);
                      setQuizFinished(false);
                      setQuizScore({});
                    }}
                    className="text-xs text-stone-400 hover:text-stone-200 underline transition-colors"
                  >
                    Test wiederholen
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </section>


        {/* 
          ======================================================================
          SECTION: INHALT DES E-BOOKS (Was steckt genau drin?)
          ======================================================================
        */}
        <section id="inhalt" className="py-20 px-4 max-w-5xl mx-auto scroll-mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-12"
          >
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              Blick ins Buch
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Das erwartet Sie auf 30 Seiten Kompaktwissen
            </h2>
            <p className="text-stone-300 max-w-2xl mx-auto text-sm sm:text-base">
              Strukturiert, direkt auf den Punkt gebracht und sofort in Ihrer Küche anwendbar.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 rounded-2xl bg-[#0a2318]/80 border border-emerald-500/20 backdrop-blur-md hover:border-emerald-400/40 transition-all hover:translate-y-[-2px]"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 text-emerald-300 flex items-center justify-center font-bold mb-4">
                <Flame className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-bold text-white text-base mb-2">1. Akut-Maßnahmen</h3>
              <p className="text-stone-300 text-sm leading-relaxed">
                Was tun im Moment des Brennens? Sofort-Techniken mit stillem Wasser, gekauten Mandeln und Haferflocken.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="p-6 rounded-2xl bg-[#0a2318]/80 border border-emerald-500/20 backdrop-blur-md hover:border-emerald-400/40 transition-all hover:translate-y-[-2px]"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-300 flex items-center justify-center font-bold mb-4">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="font-bold text-white text-base mb-2">2. Die Mythen-Falle</h3>
              <p className="text-stone-300 text-sm leading-relaxed">
                Warum Milch oder Natron das Problem meist drastisch verschlimmern – und welche echten Alternativen existieren.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-2xl bg-[#0a2318]/80 border border-emerald-500/20 backdrop-blur-md hover:border-emerald-400/40 transition-all hover:translate-y-[-2px]"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-400/10 border border-teal-400/20 text-teal-300 flex items-center justify-center font-bold mb-4">
                <Layers className="w-5 h-5 text-teal-400" />
              </div>
              <h3 className="font-bold text-white text-base mb-2">3. Drei fertige Tagespläne</h3>
              <p className="text-stone-300 text-sm leading-relaxed">
                Komplett zusammengestellte Pläne für morgens, mittags und abends. Ohne Rätselraten, einfach nachmachen.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="p-6 rounded-2xl bg-[#0a2318]/80 border border-emerald-500/20 backdrop-blur-md hover:border-emerald-400/40 transition-all hover:translate-y-[-2px]"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 text-emerald-300 flex items-center justify-center font-bold mb-4">
                <Sparkles className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-bold text-white text-base mb-2">4. Zwei Rezepte & Snacks</h3>
              <p className="text-stone-300 text-sm leading-relaxed">
                Schmackhafte, magenschonende Gerichte und clevere Snack-Ideen für Beruf, Reisen und unterwegs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 rounded-2xl bg-[#0a2318]/80 border border-emerald-500/20 backdrop-blur-md hover:border-emerald-400/40 transition-all hover:translate-y-[-2px]"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-400/10 border border-teal-400/20 text-teal-300 flex items-center justify-center font-bold mb-4">
                <BookOpen className="w-5 h-5 text-teal-400" />
              </div>
              <h3 className="font-bold text-white text-base mb-2">5. Trigger erkennen</h3>
              <p className="text-stone-300 text-sm leading-relaxed">
                Lernen Sie Ihre ganz individuellen Auslöser kennen, um Reflux dauerhaft und gezielt vorzubeugen.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="p-6 rounded-2xl bg-[#0a2318]/80 border border-emerald-500/20 backdrop-blur-md hover:border-emerald-400/40 transition-all hover:translate-y-[-2px]"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-300 flex items-center justify-center font-bold mb-4">
                <Smartphone className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="font-bold text-white text-base mb-2">6. Überall lesbar (PDF)</h3>
              <p className="text-stone-300 text-sm leading-relaxed">
                Bequem auf dem Smartphone, Tablet oder Computer. Sie haben den Ratgeber immer griffbereit.
              </p>
            </motion.div>
          </div>
        </section>


        {/* 
          ======================================================================
          SECTION: FÜR WEN IST ES? / FÜR WEN IST ES NICHT?
          ======================================================================
        */}
        <section id="fuer-wen" className="py-20 px-4 max-w-5xl mx-auto scroll-mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-12"
          >
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              Ehrliche Orientierung
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Ist dieser Ratgeber das Richtige für Sie?
            </h2>
            <p className="text-stone-300 max-w-2xl mx-auto text-sm sm:text-base">
              Wir möchten, dass Sie genau wissen, was Sie erwartet und den größtmöglichen Nutzen daraus ziehen.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Für wen ist es */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-3xl bg-gradient-to-b from-[#0e2c1e] to-[#092015] border-2 border-emerald-400/40 backdrop-blur-xl shadow-2xl relative"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-400/20 text-emerald-300 font-bold text-xs uppercase tracking-wider mb-6">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Für Sie geeignet, wenn Sie:</span>
              </div>

              <ul className="space-y-4 text-stone-200">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400 font-bold text-xs">
                    ✓
                  </div>
                  <span className="text-base">
                    Sodbrennen ohne unnötige Komplikationen in den Griff bekommen möchten.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400 font-bold text-xs">
                    ✓
                  </div>
                  <span className="text-base">
                    Einsteiger sind und klare, leicht verständliche Orientierung brauchen.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400 font-bold text-xs">
                    ✓
                  </div>
                  <span className="text-base">
                    Eine praktische Methode suchen, die Sie sofort heute noch anwenden können.
                  </span>
                </li>
              </ul>
            </motion.div>

            {/* Für wen ist es NICHT */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-3xl bg-gradient-to-b from-[#241315] to-[#180a0c] border border-rose-500/30 backdrop-blur-xl shadow-2xl relative"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 text-rose-300 font-bold text-xs uppercase tracking-wider mb-6">
                <XCircle className="w-4 h-4 text-rose-400" />
                <span>Nicht für Sie geeignet, wenn Sie:</span>
              </div>

              <ul className="space-y-4 text-stone-200">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center shrink-0 mt-0.5 text-rose-400 font-bold text-xs">
                    ✕
                  </div>
                  <span className="text-base">
                    Wunder-Ergebnisse erwarten, ohne selbst etwas an den Gewohnheiten umzusetzen.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center shrink-0 mt-0.5 text-rose-400 font-bold text-xs">
                    ✕
                  </div>
                  <span className="text-base">
                    Lange, komplizierte wissenschaftliche Abhandlungen einem kompakten Leitfaden vorziehen.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center shrink-0 mt-0.5 text-rose-400 font-bold text-xs">
                    ✕
                  </div>
                  <span className="text-base">
                    Einen medizinischen Ersatz für eine ärztliche Diagnose bei schwerwiegenden Erkrankungen suchen.
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Medical Disclaimer Note from description */}
          <div className="mt-8 p-4 rounded-2xl bg-stone-900/60 border border-stone-700/50 text-xs sm:text-sm text-stone-400 text-center flex items-center justify-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Hinweis:</strong> Dieser Ratgeber dient der Information und Selbsthilfe bei Alltagsbeschwerden und ersetzt keinen Arztbesuch.
            </span>
          </div>
        </section>


        {/* 
          ======================================================================
          SECTION: SOFORTZUGANG DETAILS & FORMAT
          ======================================================================
        */}
        <section className="py-16 px-4 max-w-5xl mx-auto">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#092217]/90 border border-emerald-500/30 backdrop-blur-xl">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2 p-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-white text-base">Format: PDF</h4>
                <p className="text-stone-300 text-sm">
                  30 Seiten, optimiert und bequem lesbar auf Smartphone, Tablet und Computer.
                </p>
              </div>

              <div className="space-y-2 p-4 border-y md:border-y-0 md:border-x border-emerald-500/20">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center mx-auto mb-3">
                  <Download className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-white text-base">Lieferung: Sofort per E-Mail</h4>
                <p className="text-stone-300 text-sm">
                  Direkt nach Zahlungsbestätigung erhalten Sie Ihren persönlichen Download-Link.
                </p>
              </div>

              <div className="space-y-2 p-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center mx-auto mb-3">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-white text-base">Sichere Zahlung</h4>
                <p className="text-stone-300 text-sm">
                  100% verschlüsselte Kaufabwicklung über Hotmart mit allen gängigen Zahlungsarten.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* 
          ======================================================================
          SECTION: GROSSES KAUF-ANGEBOT (Call To Action Box mit Preis 27,96 €)
          ======================================================================
        */}
        <section className="py-20 px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-[#103828] via-[#0d2e20] to-[#071911] border-2 border-emerald-400/50 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_30px_rgba(16,185,129,0.2)] text-center overflow-hidden"
          >
            {/* Ambient lighting effect */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-400/20 border border-emerald-400/40 text-emerald-300 font-extrabold text-xs uppercase tracking-wider mb-6">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Offizielles Hotmart-Angebot</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Starten Sie heute in Ihre beschwerdefreie Zukunft
            </h2>

            <p className="text-stone-300 text-base sm:text-lg max-w-xl mx-auto mb-8">
              Holen Sie sich jetzt den 30-seitigen PDF-Ratgeber und verabschieden Sie sich von saurem Aufstoßen und schlaflosen Nächten.
            </p>

            {/* What's included checklist */}
            <div className="max-w-md mx-auto text-left space-y-3 mb-8 bg-[#082015]/80 p-5 rounded-2xl border border-emerald-500/25 text-sm text-stone-200">
              <div className="flex items-center gap-2.5">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>30 Seiten praxiserprobtes PDF-Kompaktwissen</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Sofort-Hilfe bei akutem Brennen (stilles Wasser, Mandeln etc.)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>3 fertige Tagespläne & 2 magenschonende Rezepte</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Entlarvung falscher Hausmittel wie Milch & Natron</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Sofortiger digitaler Zugang per E-Mail nach dem Kauf</span>
              </div>
            </div>

            {/* Big Price Display: 27,96 € */}
            <div className="mb-8">
              <div className="flex items-center justify-center gap-3">
                <span className="text-stone-400 line-through text-2xl font-semibold">
                  {REGULAR_PRICE}
                </span>
                <span className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-amber-200">
                  {PRICE}
                </span>
              </div>
              <span className="inline-block mt-2 text-xs uppercase tracking-wider font-bold text-amber-300 bg-amber-400/15 border border-amber-400/30 px-3 py-1 rounded-full">
                Einmalige Zahlung • Kein Abo • Sofort-Download
              </span>
            </div>

            {/* Main Primary Button */}
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-5 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 text-emerald-950 font-extrabold text-lg sm:text-xl shadow-[0_12px_35px_rgba(16,185,129,0.5)] hover:shadow-[0_18px_50px_rgba(16,185,129,0.7)] hover:scale-[1.02] active:scale-[0.99] transition-all duration-300"
            >
              <Download className="w-6 h-6 text-emerald-950" />
              <span>E-BOOK JETZT FÜR {PRICE} HERUNTERLADEN</span>
            </a>

            {/* Trust footer under button */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-xs text-stone-300">
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>256-Bit SSL-Verschlüsselung</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Hotmart Zahlungsgarantie</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Sofortiger E-Mail Versand</span>
              </div>
            </div>
          </motion.div>
        </section>


        {/* 
          ======================================================================
          SECTION: FAQ (Häufig gestellte Fragen)
          ======================================================================
        */}
        <section id="faq" className="py-16 px-4 max-w-4xl mx-auto scroll-mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-10"
          >
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              Antworten auf Ihre Fragen
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Häufig gestellte Fragen (FAQ)
            </h2>
          </motion.div>

          <div className="space-y-3">
            {[
              {
                q: "Wie erhalte ich das E-Book nach dem Kauf?",
                a: "Unmittelbar nach der Bestätigung Ihrer Zahlung auf Hotmart erhalten Sie eine E-Mail mit Ihrem persönlichen Download-Link. Sie können das PDF direkt auf Ihr Smartphone, Tablet oder Ihren Computer herunterladen und sofort loslegen."
              },
              {
                q: "Ist der Ratgeber für Anfänger ohne Vorwissen geeignet?",
                a: "Absolut! Das E-Book wurde bewusst ohne langes medizinisches Fachchinesisch geschrieben. Sie erhalten eine leicht verständliche, direkte Schritt-für-Schritt-Anleitung, die jeder sofort in seiner Küche anwenden kann."
              },
              {
                q: "Warum ist Milch oder Natron bei Sodbrennen ein Problem?",
                a: "Milch und Natron lindern das Brennen oft nur für wenige Minuten. Danach schlägt der Körper mit einer noch intensiveren Säureproduktion zurück (der sogenannte Rebound-Effekt). Im Buch erfahren Sie, welche sanften Mittel den Magen nachhaltig beruhigen, ohne diese Gegenreaktion hervorzurufen."
              },
              {
                q: "Muss ich teure Speziallebensmittel einkaufen?",
                a: "Nein. Alle im Ratgeber empfohlenen Lebensmittel wie Haferflocken, ungesalzene Mandeln, stilles Wasser und schonende Gemüsesorten sind preiswert in jedem herkömmlichen Supermarkt erhältlich."
              },
              {
                q: "Auf welchen Geräten kann ich das E-Book lesen?",
                a: "Das E-Book ist im universellen PDF-Format gehalten. Sie können es auf Apple iOS (iPhone, iPad), Android-Geräten, Windows-PCs, Macs sowie gängigen E-Readern mit PDF-Unterstützung öffnen."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="rounded-2xl bg-[#092217]/80 border border-emerald-500/20 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-white hover:text-emerald-300 transition-colors"
                >
                  <span className="text-base">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-emerald-400 shrink-0 transition-transform duration-300 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 text-stone-300 text-sm leading-relaxed border-t border-emerald-500/15 pt-3">
                    {faq.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

      </main>


      {/* 
        ========================================================================
        FOOTER with Social Contacts Buttons as requested
        ========================================================================
      */}
      <footer className="relative z-10 border-t border-emerald-500/25 bg-[#05130c]/90 backdrop-blur-xl pt-16 pb-24 sm:pb-16 px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Social Contacts Section */}
          <div className="text-center space-y-4">
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              Bleiben Sie in Kontakt
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Folgen & Kontaktieren Sie Karin Zeit
            </h3>
            <p className="text-stone-300 text-sm max-w-xl mx-auto">
              Haben Sie Fragen zum Ratgeber oder möchten Sie weitere wertvolle Ernährungstipps? Besuchen Sie unsere offiziellen Kanäle:
            </p>

            {/* Social Buttons Grid */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4 max-w-4xl mx-auto">
              {SOCIAL_LINKS.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#0c2b1e] hover:bg-[#123d2b] border border-emerald-500/30 hover:border-emerald-400/60 text-stone-100 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-md"
                >
                  <div className="text-emerald-400 group-hover:text-emerald-300 transition-colors">
                    {social.iconSvg}
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-bold text-white group-hover:text-emerald-200">
                      {social.name}
                    </span>
                    <span className="block text-[10px] text-stone-400 group-hover:text-stone-300">
                      {social.handle}
                    </span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-400 ml-1 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Bottom Copyright & Disclaimer */}
          <div className="border-t border-emerald-500/15 pt-8 text-center text-xs text-stone-400 space-y-3">
            <p>
              © {new Date().getFullYear()} Karin Zeit. Alle Rechte vorbehalten.
            </p>
            <p className="max-w-2xl mx-auto leading-relaxed text-stone-400">
              Haftungsausschluss: Die Inhalte dieses Leitfadens dienen ausschließlich der allgemeinen Information und Ernährungsunterstützung. Sie stellen keine medizinische Beratung, Diagnose oder Behandlung dar und ersetzen keinesfalls die Konsultation eines qualifizierten Arztes.
            </p>
            <div className="flex justify-center gap-4 text-stone-400 pt-2">
              <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300 transition-colors">
                Hotmart Checkout
              </a>
              <span>•</span>
              <a href="#loesung" className="hover:text-emerald-300 transition-colors">
                Über das E-Book
              </a>
              <span>•</span>
              <a href="#faq" className="hover:text-emerald-300 transition-colors">
                FAQ
              </a>
            </div>
          </div>
        </div>
      </footer>


      {/* 
        ========================================================================
        STICKY BOTTOM BAR (Mobile & Desktop quick purchase trigger)
        ========================================================================
      */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 inset-x-0 z-40 bg-[#092218]/95 backdrop-blur-xl border-t border-emerald-500/30 p-3 shadow-2xl"
          >
            <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 px-2">
              <div className="hidden sm:flex items-center gap-3">
                <img
                  src={coverImg}
                  alt="Was essen bei Sodbrennen?"
                  className="w-10 h-12 object-cover rounded shadow"
                />
                <div>
                  <span className="font-bold text-white text-sm block">
                    Was essen bei Sodbrennen?
                  </span>
                  <span className="text-xs text-emerald-300">
                    PDF-Ratgeber (30 Seiten) • Sofort-Download
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                <div className="text-left">
                  <span className="text-xs text-stone-400 block line-through">
                    {REGULAR_PRICE}
                  </span>
                  <span className="text-xl sm:text-2xl font-extrabold text-white">
                    {PRICE}
                  </span>
                </div>

                <a
                  href={CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 text-emerald-950 font-extrabold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>JETZT KAUFEN ({PRICE})</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
