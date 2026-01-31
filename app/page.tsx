"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Archive } from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import { LoveNotes } from "@/components/love-notes";
import { ReasonsSection } from "@/components/reasons-section";
import { TimelineSection } from "@/components/timeline-section";
import { FloatingHearts } from "@/components/floating-hearts";
import { Footer } from "@/components/footer";

export default function LoveLetterPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Archive Button */}
      <Link
        href="/archive"
        className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm border border-border/50 rounded-full text-sm text-foreground hover:bg-card hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md"
      >
        <Archive className="w-4 h-4" />
        <span className="font-medium">Letters</span>
      </Link>

      <FloatingHearts />
      <HeroSection />
      <LoveNotes />
      <ReasonsSection />
      <TimelineSection />
      <Footer />
    </main>
  );
}
