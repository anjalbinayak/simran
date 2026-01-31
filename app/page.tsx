"use client"

import { useState, useEffect } from "react"
import { HeroSection } from "@/components/hero-section"
import { LoveNotes } from "@/components/love-notes"
import { ReasonsSection } from "@/components/reasons-section"
import { TimelineSection } from "@/components/timeline-section"
import { FloatingHearts } from "@/components/floating-hearts"
import { Footer } from "@/components/footer"

export default function LoveLetterPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="relative min-h-screen overflow-hidden">
      <FloatingHearts />
      <HeroSection />
      <LoveNotes />
      <ReasonsSection />
      <TimelineSection />
      <Footer />
    </main>
  )
}
