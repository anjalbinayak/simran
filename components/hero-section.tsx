"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/30 via-background to-background" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <Heart className="w-16 h-16 mx-auto text-primary fill-primary animate-pulse" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-muted-foreground uppercase tracking-[0.3em] text-sm mb-6"
        >
          A Letter Written in Code
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-serif text-6xl md:text-8xl lg:text-9xl font-light text-foreground mb-6 text-balance"
        >
          Simran
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="font-serif text-2xl md:text-3xl text-muted-foreground italic"
        >
          with all my love
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              className="w-6 h-10 mx-auto text-primary/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 40"
            >
              <rect x="6" y="2" width="12" height="20" rx="6" strokeWidth="2" />
              <circle cx="12" cy="10" r="2" fill="currentColor" className="animate-bounce" />
            </svg>
            <p className="text-xs text-muted-foreground mt-2 tracking-widest uppercase">Scroll</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
