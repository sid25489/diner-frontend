"use client";
import { useState } from "react";
import { useCart } from "./CartContext";
import { motion, AnimatePresence } from "framer-motion";
import CheckoutModal from "./CheckoutModal";

export default function CartSidebar() {
  const { cart, updateQuantity, removeFromCart, getTotal, clearCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);
  const total = getTotal();

  const handleCheckoutSuccess = (orderNumber: string) => {
    setOrderSuccess(orderNumber);
    setTimeout(() => {
      setOrderSuccess(null);
    }, 5000);
  };

  return (
    <aside className="w-full md:w-96 bg-white rounded-xl shadow-diner p-6 h-fit sticky top-24">
      <h2 className="text-2xl font-bold text-diner-coffee mb-4">Your Order</h2>
      {cart.length === 0 ? (
        <p className="text-diner-coffee/60 text-center py-8">Your cart is empty. Add items to get started!</p>
      ) : (
        <>
          <div className="space-y-3 mb-6 max-h-[400px] overflow-y-auto">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.name}
                  className="flex items-center justify-between gap-3 p-3 bg-diner-cream rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-diner-coffee text-sm truncate">{item.name}</p>
                    <p className="text-diner-coffee/70 text-xs">${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.name, item.quantity - 1)}
                      className="w-7 h-7 rounded-full bg-diner-coffee text-diner-cream font-bold hover:bg-diner-terracotta transition-colors text-sm"
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-semibold text-diner-coffee">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.name, item.quantity + 1)}
                      className="w-7 h-7 rounded-full bg-diner-coffee text-diner-cream font-bold hover:bg-diner-terracotta transition-colors text-sm"
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.name)}
                      className="ml-2 text-diner-terracotta hover:text-diner-coffee transition-colors text-sm font-medium"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="border-t border-diner-coffee/20 pt-4 space-y-3">
            <div className="flex justify-between items-center text-lg font-semibold text-diner-coffee">
              <span>Total:</span>
              <span className="text-diner-gold">${total.toFixed(2)}</span>
            </div>
            {orderSuccess && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-3">
                Order placed successfully! Order #: {orderSuccess}
              </div>
            )}
            <motion.button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full bg-diner-coffee text-diner-cream py-3 rounded-full font-semibold hover:bg-diner-terracotta transition-colors shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Proceed to Checkout
            </motion.button>
            <CheckoutModal
              isOpen={isCheckoutOpen}
              onClose={() => setIsCheckoutOpen(false)}
              onSuccess={handleCheckoutSuccess}
            />
            <button
              onClick={clearCart}
              className="w-full text-diner-coffee/70 hover:text-diner-coffee py-2 text-sm font-medium transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </aside>
  );
}

