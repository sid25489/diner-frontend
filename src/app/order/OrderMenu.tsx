"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./CartContext";
import { motion } from "framer-motion";
import { menuApi } from "@/lib/api";

const ICONS = {
  vegetarian: "🥑",
  glutenFree: "🌾",
  kids: "🧒",
};

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  currentPrice?: number;
  category: string;
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
  isKids?: boolean;
  isAvailable: boolean;
  isHappyHour?: boolean;
}

export default function OrderMenu() {
  const { addToCart } = useCart();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const response = await menuApi.getAll();
        if (response.success && response.data) {
          setMenuItems(response.data as MenuItem[]);
        } else {
          setError(response.error || "Failed to load menu");
        }
      } catch (err: any) {
        setError("Failed to load menu. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  // Group items by category
  const groupedMenu = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  if (loading) {
    return (
      <section className="w-full max-w-3xl mx-auto px-4 py-6">
        <div className="text-center py-12">
          <p className="text-diner-coffee/70">Loading menu...</p>
        </div>
      </section>
    );
  }

  const router = useRouter();

  if (error) {
    return (
      <section className="w-full max-w-3xl mx-auto px-4 py-6">
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => router.refresh()}
            className="px-4 py-2 bg-diner-coffee text-diner-cream rounded-lg hover:bg-diner-terracotta"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-6">
      {Object.entries(groupedMenu).map(([category, items], catIdx) => (
        <motion.div
          key={category}
          className="mb-10"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: catIdx * 0.1 }}
        >
          <h2 className="text-2xl font-semibold text-diner-terracotta mb-4 border-b border-diner-coffee/20 pb-2">
            {category}
          </h2>
          <div className="space-y-3">
            {items.map((item, itemIdx) => (
              <motion.div
                key={item.name}
                className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, delay: itemIdx * 0.05 }}
              >
                <div className="flex-1">
                  <p className="text-lg font-medium text-diner-coffee flex items-center gap-2 mb-1">
                    {item.name}
                    {item.isVegetarian && (
                      <span title="Vegetarian" aria-label="Vegetarian">{ICONS.vegetarian}</span>
                    )}
                    {item.isGlutenFree && (
                      <span title="Gluten Free" aria-label="Gluten Free">{ICONS.glutenFree}</span>
                    )}
                    {item.isKids && (
                      <span title="Kids" aria-label="Kids">{ICONS.kids}</span>
                    )}
                  </p>
                  <p className="text-diner-coffee/70 text-sm mb-2">{item.description}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-diner-gold font-bold text-lg">
                      ${(item.currentPrice || item.price).toFixed(2)}
                    </p>
                    {item.isHappyHour && item.currentPrice && item.currentPrice < item.price && (
                      <span className="text-diner-terracotta text-xs line-through">
                        ${item.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
                <motion.button
                  onClick={() => addToCart({
                    ...item,
                    price: item.currentPrice || item.price,
                  } as any)}
                  disabled={!item.isAvailable}
                  className="bg-diner-coffee text-diner-cream px-6 py-2 rounded-full font-semibold hover:bg-diner-terracotta transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: item.isAvailable ? 1.05 : 1 }}
                  whileTap={{ scale: item.isAvailable ? 0.95 : 1 }}
                >
                  {item.isAvailable ? "Add to Cart" : "Unavailable"}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </section>
  );
}

