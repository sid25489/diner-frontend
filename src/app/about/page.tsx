"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center py-16 px-4 bg-diner-cream">
      <motion.h1
        className="text-4xl font-bold text-diner-coffee mb-4 text-center"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
      >
        About Us
      </motion.h1>
      <motion.p
        className="text-lg text-diner-coffee/90 max-w-2xl text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <b>Welcome to your new favorite local diner!</b> <br className="hidden md:inline" />
        Our space combines the best of <span className="text-diner-terracotta font-semibold">American comfort food</span> and <span className="text-diner-terracotta font-semibold">Latin flavors</span>—in a setting full of color and creative inspiration. From the aroma of freshly brewed coffee to the instantly recognizable <span className="text-diner-muralPink font-semibold">mural wall</span>, our restaurant is an experience as much as a meal.
      </motion.p>
      <motion.div
        className="flex flex-col md:flex-row justify-center gap-6 w-full max-w-4xl mb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0, y: 24 },
          visible: { opacity: 1, y: 0, transition: { delayChildren: 0.2, staggerChildren: 0.22 } },
        }}
      >
        <motion.div
          className="bg-white rounded-xl shadow-diner p-6 flex-1"
          variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }}
        >
          <h2 className="text-xl font-semibold text-diner-coffee mb-2">
            🎨 The Mural Wall
          </h2>
          <p className="text-diner-coffee/80 mb-1">Our hand-painted mural celebrates heritage, community, and creativity—making every visit feel special.</p>
        </motion.div>
        <motion.div
          className="bg-white rounded-xl shadow-diner p-6 flex-1"
          variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }}
        >
          <h2 className="text-xl font-semibold text-diner-coffee mb-2">
            ☕ Coffee & Comfort Food
          </h2>
          <p className="text-diner-coffee/80 mb-1">We’re all about breakfast, lunch, and Latin comfort classics. <b>Signature coffee, speedy service, and plenty of smiles.</b></p>
        </motion.div>
      </motion.div>
      <motion.div
        className="flex flex-col gap-3 w-full max-w-xl items-center text-diner-coffee/90"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ delay: 0.25, duration: 0.7 }}
      >
        <div className="rounded-full border px-4 py-2 text-diner-terracotta bg-white shadow">Dine-In · Takeaway · Outdoor Seating · Kids & Families Welcome · Wheelchair Accessible</div>
      </motion.div>
    </div>
  );
}
