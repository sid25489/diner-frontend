"use client";
import { galleryImages } from "./gallery-images";
import { motion } from "framer-motion";

export default function GalleryGrid() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto py-6 px-2">
      {galleryImages.map(({ src, alt, caption }, idx) => (
        <motion.div
          key={src}
          className="overflow-hidden rounded-xl bg-white shadow-diner flex flex-col items-center group"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: idx * 0.14 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="object-cover w-full h-48 md:h-40 xl:h-56 group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            draggable="false"
          />
          <div className="py-2 text-sm text-diner-coffee/90 font-medium text-center w-full bg-diner-cream">
            {caption}
          </div>
        </motion.div>
      ))}
    </section>
  );
}

