"use client";
import { useState, useEffect } from "react";
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

export default function MenuGrid() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const response = await menuApi.getAll();
        if (response.success && response.data) {
          setMenuItems(response.data as MenuItem[]);
        }
      } catch (err) {
        console.error("Failed to load menu:", err);
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
      <section className="w-full max-w-3xl mx-auto px-4 py-12">
        <div className="text-center py-12">
          <p className="text-diner-coffee/70">Loading menu...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-12">
      {Object.entries(groupedMenu).map(([category, items], idx) => (
        <motion.div
          key={category}
          className="mb-12"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, delay: idx * 0.09 }}
        >
          <motion.h2
            className="text-2xl font-semibold text-diner-terracotta mb-4 border-b border-diner-coffee/20 pb-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.45, delay: 0.09 }}
          >
            {category}
          </motion.h2>
          <ul className="divide-y divide-diner-coffee/10">
            {items.map((item, itemIdx) => (
              <motion.li
                key={item.name}
                className="flex flex-col md:flex-row md:items-center justify-between py-5 gap-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.33, delay: itemIdx * 0.08 }}
              >
                <div>
                  <p className="text-lg font-medium text-diner-coffee flex items-center gap-2">
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
                  <p className="text-diner-coffee/70 text-sm max-w-lg">{item.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-diner-gold text-lg ml-1 min-w-[68px] text-right">
                    ${(item.currentPrice || item.price).toFixed(2)}
                  </span>
                  {item.isHappyHour && item.currentPrice && item.currentPrice < item.price && (
                    <span className="text-diner-terracotta text-xs line-through">
                      ${item.price.toFixed(2)}
                    </span>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </section>
  );
}
