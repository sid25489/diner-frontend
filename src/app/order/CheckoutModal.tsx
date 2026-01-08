"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./CartContext";
import { orderApi } from "@/lib/api";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (orderNumber: string) => void;
}

export default function CheckoutModal({ isOpen, onClose, onSuccess }: CheckoutModalProps) {
  const { cart, getTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    deliveryType: "dine-in" as "dine-in" | "takeaway",
    paymentMethod: "card" as "card" | "nfc" | "cash",
    specialInstructions: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Prepare order items for backend
      const orderItems = cart.map((item) => ({
        menuItemId: (item as { _id?: string })._id || item.name, // Use _id if available (from backend)
        quantity: item.quantity,
      }));

      const orderData = {
        ...formData,
        items: orderItems,
      };

      const response = await orderApi.create(orderData);

      if (response.success && response.data) {
        const order = response.data.order || response.data;
        const orderNumber = typeof order === 'object' && order !== null && 'orderNumber' in order
          ? String(order.orderNumber || (order as { _id?: string })._id)
          : 'unknown';
        clearCart();
        onSuccess(orderNumber);
        onClose();
      } else {
        setError(response.error || "Failed to place order. Please try again.");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred. Please try again.";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
        <motion.div
          className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-diner-coffee">Checkout</h2>
              <button
                onClick={onClose}
                className="text-diner-coffee/70 hover:text-diner-coffee text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-diner-coffee mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full px-4 py-2 border border-diner-coffee/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-diner-terracotta"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-diner-coffee mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                  className="w-full px-4 py-2 border border-diner-coffee/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-diner-terracotta"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-diner-coffee mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                  className="w-full px-4 py-2 border border-diner-coffee/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-diner-terracotta"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-diner-coffee mb-1">
                  Order Type *
                </label>
                <select
                  required
                  value={formData.deliveryType}
                  onChange={(e) => setFormData({ ...formData, deliveryType: e.target.value as "dine-in" | "takeaway" })}
                  className="w-full px-4 py-2 border border-diner-coffee/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-diner-terracotta"
                >
                  <option value="dine-in">Dine-In</option>
                  <option value="takeaway">Takeaway</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-diner-coffee mb-1">
                  Payment Method *
                </label>
                <select
                  required
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as "card" | "nfc" | "cash" })}
                  className="w-full px-4 py-2 border border-diner-coffee/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-diner-terracotta"
                >
                  <option value="card">Card</option>
                  <option value="nfc">NFC</option>
                  <option value="cash">Cash</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-diner-coffee mb-1">
                  Special Instructions (Optional)
                </label>
                <textarea
                  value={formData.specialInstructions}
                  onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-diner-coffee/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-diner-terracotta"
                  placeholder="Any special requests or dietary restrictions..."
                />
              </div>

              <div className="border-t border-diner-coffee/20 pt-4">
                <div className="flex justify-between items-center text-lg font-semibold text-diner-coffee mb-4">
                  <span>Total:</span>
                  <span className="text-diner-gold">${getTotal().toFixed(2)}</span>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-diner-coffee text-diner-coffee rounded-lg hover:bg-diner-cream transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-diner-coffee text-diner-cream rounded-lg hover:bg-diner-terracotta transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

