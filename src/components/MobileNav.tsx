"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About Us" },
  { href: "/order", label: "Order Online" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
  { href: "/accessibility", label: "Accessibility" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden flex items-center">
      <button
        className="flex flex-col justify-center items-center w-9 h-9 group focus:outline-none"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="block w-7 h-0.5 bg-diner-cream rounded transition-transform duration-300 ease-in-out group-hover:bg-diner-gold" style={{ transform: open ? "rotate(45deg) translate(5px, 6px)" : "none" }} />
        <span className={`block w-7 h-0.5 bg-diner-cream rounded my-1 transition-all duration-300 ease-in-out group-hover:bg-diner-gold ${open ? "opacity-0" : ""}`} />
        <span className="block w-7 h-0.5 bg-diner-cream rounded transition-transform duration-300 ease-in-out group-hover:bg-diner-gold" style={{ transform: open ? "-rotate-45deg translate(5px, -6px)" : "none" }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-4/5 max-w-xs bg-diner-coffee text-diner-cream z-40 shadow-lg flex flex-col pt-24 pl-7 pr-4 gap-5"
          >
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-lg font-semibold py-2 px-2 rounded hover:bg-diner-terracotta/70 transition"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/admin/login"
              className="text-lg font-semibold py-2 px-2 rounded hover:bg-diner-terracotta/70 transition opacity-80"
              onClick={() => setOpen(false)}
            >
              Admin
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

