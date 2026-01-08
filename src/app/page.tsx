"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import CoffeeEffects from "@/components/CoffeeEffects";

export default function Home() {
  useEffect(() => {
    // Empty effect for future use
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-diner-cream relative overflow-hidden">
      {/* Coffee Visual Effects */}
      <CoffeeEffects />
      {/* Animated background elements - Coffee themed */}
      <motion.div
        className="absolute top-20 right-10 w-32 h-32 bg-diner-coffee/5 rounded-full blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-40 h-40 bg-diner-gold/10 rounded-full blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 20, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Coffee aroma cloud */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-48 h-48 bg-diner-coffee/5 rounded-full blur-3xl"
        animate={{
          x: [0, 20, -20, 0],
          y: [0, -15, 15, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Hero Section */}
      <main className="w-full max-w-5xl px-6 py-24 sm:px-12 md:px-24 relative z-10">
        <motion.div
          className="bg-white shadow-diner rounded-2xl flex flex-col items-center gap-10 p-8 md:p-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl text-diner-coffee font-bold text-center tracking-tight mb-4"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0, duration: 0.7 }}
            whileHover={{ scale: 1.02 }}
          >
            American Diner Classics
            <br />
            <motion.span
              className="text-diner-terracotta italic inline-block"
              animate={{
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              with a Latin Twist
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl text-diner-coffee/80 text-center max-w-lg mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            A cozy daytime eatery serving breakfast, lunch, and fusion favorites in a space full of color, good vibes, and coffee aroma.
          </motion.p>

          <motion.div
            className="flex flex-col md:flex-row gap-6 mb-6 w-full justify-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            {[
              { href: "/order", text: "Order Online", style: "bg-diner-coffee text-diner-cream" },
              { href: "/menu", text: "View Menu", style: "border-2 border-diner-coffee text-diner-coffee" },
              { href: "/contact", text: "Visit Us", style: "border-2 border-diner-terracotta text-diner-terracotta" },
            ].map((btn, idx) => (
              <motion.a
                key={btn.href}
                href={btn.href}
                className={`${btn.style} rounded-full px-8 py-4 font-semibold shadow hover:shadow-lg transition-all text-lg text-center`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + idx * 0.1 }}
              >
                {btn.text}
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-8 mt-2"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.25, delayChildren: 0.9 } },
            }}
          >
            {[
              { icon: "☕", text: "Great Coffee", delay: 0 },
              { icon: "⚡", text: "Fast Service", delay: 0.7 },
              { icon: "🎨", text: "Local Specialties", delay: 1.4 },
            ].map(({ icon, text, delay }) => (
              <motion.div
                key={text}
                className="flex items-center gap-2"
                variants={{
                  hidden: { opacity: 0, y: 10, scale: 0.8 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <motion.span
                  className="text-3xl"
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay,
                  }}
                >
                  {icon}
                </motion.span>
                <span className="font-medium text-lg">{text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Coffee Blog Section */}
        <motion.section
          className="mt-16 bg-white shadow-diner rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <motion.span
              className="text-5xl"
              animate={{
                rotate: [0, 15, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ☕
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-bold text-diner-coffee">Our Coffee Story</h2>
          </motion.div>

          <motion.div
            className="space-y-6 text-diner-coffee/90 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, staggerChildren: 0.2 }}
          >
            <motion.p
              className="text-lg md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              At our diner, coffee isn&apos;t just a drink—it&apos;s the heart of our morning ritual. We source locally roasted beans that bring warmth and energy to every cup, creating that perfect balance of rich flavor and smooth finish that keeps our regulars coming back day after day.
            </motion.p>

            <motion.p
              className="text-lg md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              Whether you&apos;re starting your day with a classic house blend or exploring our signature <span className="font-semibold text-diner-terracotta">Iced Horchata Latte</span>, each sip tells a story of tradition meeting innovation. Our baristas craft every cup with care, ensuring that first morning coffee hits just right—bold enough to wake you up, smooth enough to savor.
            </motion.p>

            <motion.p
              className="text-lg md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              From the moment you walk in, the aroma of freshly brewed coffee welcomes you into our cozy space. It&apos;s that familiar, comforting scent that pairs perfectly with our breakfast classics and sets the tone for a great day. <span className="font-semibold text-diner-gold">Bottomless cups, endless conversations, and the perfect start to your morning.</span>
            </motion.p>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          >
            {[
              "Locally Roasted",
              "Bottomless Cups",
              "Signature Blends",
              "Fresh Daily",
            ].map((tag, idx) => (
              <motion.span
                key={tag}
                className="px-4 py-2 bg-diner-cream text-diner-coffee rounded-full text-sm font-medium"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2 + idx * 0.1, type: "spring" }}
                whileHover={{ scale: 1.1, backgroundColor: "#C19554", color: "#FFEBD8" }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
}
