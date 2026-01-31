"use client"

import { motion } from "framer-motion"
import { Heart, Sparkles, Star } from "lucide-react"

const loveNotes = [
  {
    title: "My Love",
    content: "Being with you feels unreal in the best way. Like time slows down without asking. You slip into my thoughts quietly and somehow stay there.",
    icon: Heart,
  },
  {
    title: "Vincent",
    content: "I used to think, who becomes restless just to see a face, hear voice. Until it was my turn", 
    icon: Sparkles,
  },
  {
    title: "Touch",
    content: "Your kisses feel like pauses. Your hugs feel like answers. And when you rest against my chest, the world doesn’t end — it just fades, gently, like it knows it’s not needed for a while.",
    icon: Star,
  },
]

export function LoveNotes() {
  return (
    <section className="py-24 px-4 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">Love Notes</p>
          <h2 className="font-serif text-4xl md:text-6xl font-light text-foreground text-balance">
            Words From My Heart
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {loveNotes.map((note, index) => (
            <motion.div
              key={note.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="bg-card rounded-2xl p-8 h-full border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-500">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors"
                >
                  <note.icon className="w-7 h-7 text-primary" />
                </motion.div>
                
                <h3 className="font-serif text-2xl text-foreground mb-4">{note.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{note.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
