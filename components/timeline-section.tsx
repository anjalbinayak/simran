"use client"

import { motion } from "framer-motion"
import { Heart, Sparkles, Star, Sun, Moon } from "lucide-react"

const memories = [
  {
    date: "December 18",
    title: "The First Call",
    description: "4:00 AM. You called me for the first time. And before you hung up, you told me to keep my WiFi on when I sleep from next time. That's when I knew you wanted to stay.",
    icon: Moon,
  },
  {
    date: "Every Day & Night",
    title: "Endless Conversations",
    description: "You kept calling me every single day and every single night. And I couldn't stop myself from answering. I didn't want to. Your voice became my favorite sound.",
    icon: Sun,
  },
  {
    date: "January 16",
    title: "The Day You Confessed",
    description: "I told you I didn't want to talk anymore. And that's when you told me you were attached to me, just like I was to you. My heart has been yours ever since.",
    icon: Heart,
  },
  {
    date: "January 17",
    title: "Our First Kiss",
    description: "You came to my house. We kissed. We hugged. We cuddled. That day, everything felt right. You in my arms was everything I never knew I needed.",
    icon: Sparkles,
  },
  {
    date: "January 18",
    title: "You Came Back",
    description: "You came to my house again. Another day of holding you, being with you, feeling like the luckiest person in the world.",
    icon: Star,
  },
  {
    date: "January 22",
    title: "A Whole Day Together",
    description: "We both called in at work. You came to my house and spent the whole day with me. You left your dress here. You left your hair clip. You left little pieces of yourself everywhere, and I never wanted to give them back.",
    icon: Heart,
  },
]

export function TimelineSection() {
  return (
    <section className="py-24 px-4 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4"> Story</p>
          <h2 className="font-serif text-4xl md:text-6xl font-light text-foreground text-balance">
            Maya
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-12">
            {memories.map((memory, index) => (
              <motion.div
                key={memory.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className={`relative flex items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Icon circle */}
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-card border-2 border-primary/30 flex items-center justify-center z-10 shadow-lg"
                >
                  <memory.icon className="w-6 h-6 text-primary" />
                </motion.div>

                {/* Content card */}
                <div className={`ml-24 md:ml-0 md:w-[calc(50%-4rem)] ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <p className="text-primary text-sm font-medium mb-1">{memory.date}</p>
                    <h3 className="font-serif text-xl text-foreground mb-2">{memory.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{memory.description}</p>
                  </motion.div>
                </div>

                {/* Empty space for the other side */}
                <div className="hidden md:block md:w-[calc(50%-4rem)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
