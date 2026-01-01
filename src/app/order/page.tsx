"use client";
import { CartProvider } from "./CartContext";
import OrderMenu from "./OrderMenu";
import CartSidebar from "./CartSidebar";
import { motion } from "framer-motion";

export default function Order() {
  return (
    <CartProvider>
      <div className="min-h-[60vh] py-12 px-4 bg-diner-cream">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-diner-coffee mb-3">Order Online</h1>
          <p className="text-lg text-diner-coffee/80 max-w-2xl mx-auto">
            Browse our menu, add items to your cart, and place your order. <span className="font-semibold text-diner-terracotta">Fast, easy, and delicious!</span>
          </p>
        </motion.div>
        <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto items-start">
          <div className="flex-1">
            <OrderMenu />
          </div>
          <div className="w-full lg:w-auto">
            <CartSidebar />
          </div>
        </div>
      </div>
    </CartProvider>
  );
}

