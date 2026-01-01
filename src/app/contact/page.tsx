"use client";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className="min-h-[60vh] py-16 px-4 bg-diner-cream">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-diner-coffee mb-8 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Contact & Location
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Contact Information Card */}
          <motion.div
            className="bg-white rounded-xl shadow-diner p-6"
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold text-diner-coffee mb-4">Get in Touch</h2>
            <div className="space-y-4">
              <div>
                <p className="text-diner-coffee/70 text-sm mb-1">Address</p>
                <p className="text-diner-coffee font-medium">
                  41 Prospect Rd<br />
                  Oakland Park, FL 33334<br />
                  United States
                </p>
              </div>
              <div>
                <p className="text-diner-coffee/70 text-sm mb-1">Phone</p>
                <a
                  href="tel:+19547728850"
                  className="text-diner-terracotta font-semibold hover:text-diner-coffee transition-colors"
                >
                  +1 954-772-8850
                </a>
              </div>
              <div>
                <p className="text-diner-coffee/70 text-sm mb-1">Hours</p>
                <p className="text-diner-coffee font-medium">Morning to 3 PM</p>
                <p className="text-diner-coffee/60 text-xs mt-1">Daytime eatery</p>
              </div>
              <div>
                <p className="text-diner-coffee/70 text-sm mb-1">Price Range</p>
                <p className="text-diner-coffee font-medium">$10–20 per person</p>
              </div>
            </div>
          </motion.div>

          {/* Services & Amenities Card */}
          <motion.div
            className="bg-white rounded-xl shadow-diner p-6"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold text-diner-coffee mb-4">Services & Amenities</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🍽️</span>
                <span className="text-diner-coffee">Dine-In</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🥡</span>
                <span className="text-diner-coffee">Takeaway</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌳</span>
                <span className="text-diner-coffee">Outdoor Seating</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">♿</span>
                <span className="text-diner-coffee">Wheelchair Accessible</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📶</span>
                <span className="text-diner-coffee">Free Wi-Fi</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🚗</span>
                <span className="text-diner-coffee">Parking Available</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🧒</span>
                <span className="text-diner-coffee">Kids-Friendly</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Google Maps Section */}
        <motion.div
          className="bg-white rounded-xl shadow-diner p-6"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold text-diner-coffee mb-4">Find Us</h2>
          <div className="w-full rounded-lg overflow-hidden shadow-md">
            <iframe
              title="Google Map - Diner Location"
              className="w-full"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=41%20Prospect%20Rd%2C%20Oakland%20Park%2C%20FL%2033334&t=&z=15&ie=UTF8&iwloc=&output=embed"
              allowFullScreen
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-4 justify-center text-sm text-diner-coffee/70">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=41+Prospect+Rd,+Oakland+Park,+FL+33334"
              target="_blank"
              rel="noopener noreferrer"
              className="text-diner-terracotta hover:text-diner-coffee font-medium transition-colors"
            >
              Get Directions →
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

