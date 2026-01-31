"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

const reasons = [
  "When my eyes drown in your deep ocean eyes",
  "When you touch me — you don't just stroke my skin, you stimulate every nerve in my body",
  "When you hug me, and I feel your warmth inside my chest",
  "When we kiss, and I am nearly about to eat you",
  "When we sleep together, skin to skin",
  "When we're cuddling and your hair falls on my face, and you try to fix it so I don't feel uncomfortable",
  "When I hold your waist and feel like I'm holding my whole world by my side",
]

export function ReasonsSection() {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">Lost in You</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground text-balance leading-tight">
            Times When I Forgot My Existence<br />
            <span className="text-primary">& Dissolved in You</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <div className="flex items-center gap-4 p-5 rounded-xl bg-card/60 border border-border/30 hover:border-primary/40 hover:bg-card transition-all duration-300">
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.2 }}
                  className="flex-shrink-0"
                >
                  <Heart className="w-5 h-5 text-primary fill-primary/30 group-hover:fill-primary transition-all duration-300" />
                </motion.div>
                <span className="font-serif text-lg text-foreground">{reason}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12 font-serif text-xl text-muted-foreground italic"
        >
          ...every moment with you, I lose myself a little more
        </motion.p>
      </div>
    </section>
  )
}
