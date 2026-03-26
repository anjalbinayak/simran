"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Heart, ImageIcon } from "lucide-react";

// Configure your memories here - add image path, title, and optional music
const memories = [
  {
    id: "kaisi-dil-lagi",
    title: "meri zindagi hai tu",
    date: "March 23, 2026",
    image: "/memories/first-picture.jpg",
    music: "/music/romantic-song.mp3", // optional
  },
];

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Decorative background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6"
            >
              <ImageIcon className="w-8 h-8 text-primary" />
            </motion.div>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
              Our Memories
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Ida husan leke kithe chalein
            </p>
          </div>
        </motion.div>

        {/* Memory Grid */}
        <div className="grid gap-4">
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Link href={`/gallery/${memory.id}`}>
                <motion.div
                  whileHover={{ scale: 1.02, x: 8 }}
                  className="group bg-card border border-border/50 rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <Heart className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <h2 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors">
                          {memory.title}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {memory.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-muted-foreground group-hover:text-primary transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty state hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">Khoobsurti</p>
        </motion.div>
      </div>
    </main>
  );
}
