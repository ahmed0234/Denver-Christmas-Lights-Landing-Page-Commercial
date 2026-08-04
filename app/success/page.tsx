"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { CheckCircle2, Phone, ArrowLeft, Sparkles, Snowflake, Calendar, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary,#080807)] text-white flex flex-col justify-between relative overflow-hidden">
      <Navbar />

      {/* Atmospheric Ambient Glows */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, var(--accent-glow-soft) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 pt-32 sm:pt-40 pb-20 flex-1 flex flex-col justify-center items-center text-center">
        {/* Animated Check Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mb-6 shadow-2xl relative"
          style={{
            background: "linear-gradient(135deg, rgba(245, 200, 106, 0.25) 0%, rgba(229, 169, 50, 0.1) 100%)",
            border: "2px solid var(--accent)",
            boxShadow: "0 0 35px var(--accent-glow), inset 0 1px 0 var(--highlight-surface)",
          }}
        >
          <CheckCircle2
            className="w-10 h-10 sm:w-12 sm:h-12 text-amber-300 stroke-[2.2]"
            style={{ filter: "drop-shadow(0 0 8px var(--accent-glow))" }}
          />
        </motion.div>

        {/* Header Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-2 mb-3"
        >
          <Sparkles size={16} className="text-amber-400" />
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--accent)]">
            INQUIRY RECEIVED
          </span>
          <Sparkles size={16} className="text-amber-400" />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight font-sans"
        >
          Thank You for Requesting Your <br />
          <span className="text-accent-gradient">Free Christmas Light Quote!</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base sm:text-lg text-[var(--text-muted)] max-w-xl mb-10 leading-relaxed"
        >
          Your information has been sent to our team. A Denver Christmas Lights design specialist will review your property details and reach out within 24 hours.
        </motion.p>

        {/* Information Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.5 }}
          className="w-full rounded-2xl p-6 sm:p-8 mb-10 border text-left relative overflow-hidden"
          style={{
            background: "linear-gradient(180deg, var(--bg-glass-card) 0%, var(--bg-overlay) 100%)",
            borderColor: "var(--border-color)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.6), inset 0 1px 0 var(--highlight-surface)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
            <Snowflake size={20} className="text-amber-400 shrink-0" />
            <h2 className="text-lg font-bold text-[var(--text-heading)]">What Happens Next?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Calendar size={14} /> 1. Property Review
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                We review roofline lengths, tree displays, and custom layout options for your home.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Phone size={14} /> 2. Fast Consultation
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                We reach out via phone or email to present your custom estimate and schedule installation.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck size={14} /> 3. Worry-Free Season
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Professional installation, season-long maintenance, and post-holiday removal included.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md"
        >
          <Link
            href="/"
            className="group relative flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase border text-white hover:text-amber-200 transition-all duration-300"
            style={{
              borderColor: "var(--border-color)",
              background: "var(--bg-glass)",
              boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
            }}
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Return to Website</span>
          </Link>

          <a
            href="tel:7202967711"
            className="relative flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase overflow-hidden cursor-pointer shadow-lg transition-all"
            style={{
              background: `linear-gradient(180deg, #FFF4CE 0%, #F5C86A 32%, #E5A932 70%, #B87B15 100%)`,
              border: "1px solid rgba(255, 235, 170, 0.85)",
              color: "#241200",
              boxShadow: "0 4px 22px rgba(245, 200, 106, 0.38)",
            }}
          >
            <Phone size={16} className="shrink-0 text-amber-950" />
            <span className="text-amber-950">Call (720) 296-7711</span>
          </a>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}