"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-24 px-4 bg-card">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="inline-block mb-8"
          >
            <Heart className="w-12 h-12 text-primary fill-primary" />
          </motion.div>

          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-6 text-balance">
            I Love You Meri Jaan Simran
          </h2>
          
          <p className="font-serif text-xl text-muted-foreground italic mb-8 max-w-2xl mx-auto leading-relaxed">
            Every word on this page is a piece of my heart. I want to hold you in my arms every second. FUCK YOU SOON 
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-primary fill-primary inline" />
            <span>by </span>
            <span className="underline font-medium">Abinayak</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
