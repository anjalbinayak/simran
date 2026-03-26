"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Volume2, VolumeX, Heart } from "lucide-react";

// Same memories config - keep in sync with gallery/page.tsx
const memories: Record<
  string,
  { title: string; date: string; image: string; music?: string }
> = {
  "first-picture": {
    title: "Meri Jaan",
    date: "March 26, 2026",
    image: "/memories/first-picture.jpg",
    music: "/music/kaisidillagi.mp3",
  },
};

// Rose petal component
function RosePetal({ delay, startX }: { delay: number; startX: number }) {
  const randomRotation = Math.random() * 360;
  const randomDuration = 8 + Math.random() * 6;
  const randomSwing = 50 + Math.random() * 100;

  return (
    <motion.div
      initial={{
        y: -60,
        x: startX,
        rotate: randomRotation,
        opacity: 0,
      }}
      animate={{
        y: "100vh",
        x: [startX, startX + randomSwing, startX - randomSwing, startX],
        rotate: randomRotation + 720,
        opacity: [0, 1, 1, 0.8, 0],
      }}
      transition={{
        duration: randomDuration,
        delay: delay,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute top-0 pointer-events-none z-20"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="text-primary/80"
        style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
      >
        <path
          fill="currentColor"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>
    </motion.div>
  );
}

// Floating rose petals (different style)
function FloatingPetal({ delay, startX }: { delay: number; startX: number }) {
  const size = 12 + Math.random() * 16;
  const randomDuration = 10 + Math.random() * 8;

  return (
    <motion.div
      initial={{
        y: -40,
        x: startX,
        rotate: 0,
        opacity: 0,
        scale: 0.5,
      }}
      animate={{
        y: "100vh",
        x: [startX, startX + 80, startX - 60, startX + 40, startX],
        rotate: [0, 180, 360, 540, 720],
        opacity: [0, 0.9, 0.9, 0.7, 0],
        scale: [0.5, 1, 1, 0.8, 0.5],
      }}
      transition={{
        duration: randomDuration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute top-0 pointer-events-none z-20"
    >
      <div
        className="rounded-full bg-gradient-to-br from-primary to-accent/70"
        style={{
          width: size,
          height: size * 0.6,
          borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          boxShadow: "0 2px 8px rgba(219, 112, 147, 0.3)",
        }}
      />
    </motion.div>
  );
}

export default function MemoryPage() {
  const params = useParams();
  const id = params.id as string;
  const memory = memories[id];
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [audioAvailable, setAudioAvailable] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Check if audio file is available and autoplay
  useEffect(() => {
    if (memory?.music) {
      const audio = new Audio();

      const handleCanPlay = async () => {
        setAudioAvailable(true);
        audioRef.current = audio;
        // Autoplay on load
        try {
          await audio.play();
          setIsPlaying(true);
        } catch {
          // Autoplay blocked by browser, user needs to click
          setIsPlaying(false);
        }
      };
      const handleError = () => {
        setAudioAvailable(false);
        audioRef.current = null;
      };

      audio.addEventListener("canplaythrough", handleCanPlay);
      audio.addEventListener("error", handleError);
      audio.src = memory.music;
      audio.loop = true;

      return () => {
        audio.removeEventListener("canplaythrough", handleCanPlay);
        audio.removeEventListener("error", handleError);
        audio.pause();
        audio.src = "";
      };
    }
  }, [memory?.music]);

  const toggleMusic = async () => {
    if (audioRef.current && audioAvailable) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch {
        setAudioAvailable(false);
      }
    }
  };

  if (!memory) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl text-foreground mb-4">
            Memory not found
          </h1>
          <Link href="/gallery" className="text-primary hover:underline">
            Back to Gallery
          </Link>
        </div>
      </main>
    );
  }

  if (!mounted) return null;

  // Generate petals
  const heartPetals = Array.from({ length: 15 }, (_, i) => ({
    delay: i * 0.8,
    startX:
      Math.random() *
      (typeof window !== "undefined" ? window.innerWidth : 1000),
  }));

  const rosePetals = Array.from({ length: 20 }, (_, i) => ({
    delay: i * 0.6 + 0.3,
    startX:
      Math.random() *
      (typeof window !== "undefined" ? window.innerWidth : 1000),
  }));

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20 overflow-hidden relative">
      {/* Rose petals animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {heartPetals.map((petal, i) => (
          <RosePetal
            key={`heart-${i}`}
            delay={petal.delay}
            startX={petal.startX}
          />
        ))}
        {rosePetals.map((petal, i) => (
          <FloatingPetal
            key={`petal-${i}`}
            delay={petal.delay}
            startX={petal.startX}
          />
        ))}
      </div>

      {/* Ambient glow effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[80px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Navigation */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm border border-border/50 rounded-full text-sm text-foreground hover:bg-card hover:border-primary/30 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>
      </div>

      {/* Music toggle */}
      {memory.music && audioAvailable && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          onClick={toggleMusic}
          className="fixed top-6 right-6 z-50 w-12 h-12 flex items-center justify-center bg-card/80 backdrop-blur-sm border border-border/50 rounded-full hover:bg-card hover:border-primary/30 transition-all duration-300"
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5 text-primary" />
          ) : (
            <VolumeX className="w-5 h-5 text-muted-foreground" />
          )}
        </motion.button>
      )}

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <p className="text-primary text-sm uppercase tracking-[0.3em] mb-2">
            {memory.date}
          </p>
          <h1 className="font-serif text-3xl md:text-5xl text-foreground">
            {memory.title}
          </h1>
        </motion.div>

        {/* Picture frame with decorations */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.3, type: "spring" }}
          className="relative"
        >
          {/* Decorative hearts around frame */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 z-30"
          >
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-primary fill-primary/50" />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            className="absolute -top-3 -right-4 sm:-top-4 sm:-right-8 z-30"
          >
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-primary fill-primary/50" />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-5 sm:-bottom-6 left-1/2 -translate-x-1/2 z-30"
          >
            <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-primary fill-primary" />
          </motion.div>

          {/* Glowing border effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 rounded-3xl blur-xl opacity-60 animate-pulse" />

          {/* Picture frame */}
          <div className="relative bg-card p-2 sm:p-3 md:p-4 rounded-2xl border-2 border-primary/30 shadow-2xl">
            <div className="relative w-[260px] h-[340px] sm:w-[300px] sm:h-[400px] md:w-[380px] md:h-[500px] lg:w-[420px] lg:h-[560px] rounded-xl overflow-hidden">
              <Image
                src={memory.image}
                alt={memory.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 260px, (max-width: 768px) 300px, (max-width: 1024px) 380px, 420px"
                priority
              />
              {/* Soft vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />
            </div>
          </div>
        </motion.div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-muted-foreground font-serif text-lg italic text-center max-w-md"
        >
          "Every moment with you is a memory I treasure forever"
        </motion.p>
      </div>
    </main>
  );
}
