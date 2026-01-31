"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { useEffect, useState } from "react"

interface FloatingHeart {
  id: number
  x: number
  delay: number
  duration: number
  size: number
  opacity: number
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([])

  useEffect(() => {
    const generatedHearts: FloatingHeart[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
      size: 12 + Math.random() * 20,
      opacity: 0.1 + Math.random() * 0.2,
    }))
    setHearts(generatedHearts)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{ left: `${heart.x}%` }}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{
            y: "-100vh",
            opacity: [0, heart.opacity, heart.opacity, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <motion.div
            animate={{
              x: [0, 20, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Heart
              style={{ width: heart.size, height: heart.size }}
              className="text-primary fill-primary/50"
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
