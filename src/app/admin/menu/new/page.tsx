"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { menuApi } from "@/lib/api";
import { authStorage } from "@/lib/auth";

const CATEGORIES = [
  "Breakfast",
  "Brunch",
  "Lunch",
  "Dinner",
  "Coffee & Drinks",
  "Cocktails, Beer, Wine",
  "Vegetarian & Healthy Options",
  "Kids Menu",
];

export default function NewMenuItem() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Breakfast",
    imageUrl: "",
    isVegetarian: false,
    isGlutenFree: false,
    isKids: false,
    isAvailable: true,
    happyHourPrice: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const token = authStorage.getToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }

    try {
      const menuItemData = {
        ...formData,
        price: parseFloat(formData.price),
        happyHourPrice: formData.happyHourPrice ? parseFloat(formData.happyHourPrice) : undefined,
      };

      const response = await menuApi.create(menuItemData, token);

      if (response.success) {
        router.push("/admin/dashboard");
      } else {
        setError(response.error || "Failed to create menu item");
      }
    } catch (err: any) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-diner-cream py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="bg-white rounded-xl shadow-diner p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-diner-coffee mb-6">Add New Menu Item</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-diner-coffee mb-1">
                Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-diner-coffee/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-diner-terracotta"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-diner-coffee mb-1">
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-diner-coffee/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-diner-terracotta"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-diner-coffee mb-1">
                  Price ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-2 border border-diner-coffee/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-diner-terracotta"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-diner-coffee mb-1">
                  Happy Hour Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.happyHourPrice}
                  onChange={(e) => setFormData({ ...formData, happyHourPrice: e.target.value })}
                  className="w-full px-4 py-2 border border-diner-coffee/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-diner-terracotta"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-diner-coffee mb-1">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-diner-coffee/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-diner-terracotta"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-diner-coffee mb-1">
                Image URL (Optional)
              </label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-4 py-2 border border-diner-coffee/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-diner-terracotta"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-diner-coffee mb-1">
                Options
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isVegetarian}
                    onChange={(e) => setFormData({ ...formData, isVegetarian: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-diner-coffee">Vegetarian</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isGlutenFree}
                    onChange={(e) => setFormData({ ...formData, isGlutenFree: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-diner-coffee">Gluten Free</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isKids}
                    onChange={(e) => setFormData({ ...formData, isKids: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-diner-coffee">Kids Menu</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isAvailable}
                    onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-diner-coffee">Available</span>
                </label>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-4 py-2 border border-diner-coffee text-diner-coffee rounded-lg hover:bg-diner-cream transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-diner-coffee text-diner-cream rounded-lg hover:bg-diner-terracotta transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating..." : "Create Menu Item"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

