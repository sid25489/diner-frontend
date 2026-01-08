"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { authStorage } from "@/lib/auth";
import { menuApi } from "@/lib/api";
import Link from "next/link";

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isAvailable: boolean;
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
  isKids?: boolean;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = authStorage.getToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }
    setToken(token);
    fetchMenuItems();
  }, [router]);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await menuApi.getAll();
      if (response.success && response.data) {
        setMenuItems(response.data as MenuItem[]);
      }
    } catch {
      console.error("Failed to fetch menu items");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token || !confirm("Are you sure you want to delete this item?")) return;

    try {
      const response = await menuApi.delete(id, token);
      if (response.success) {
        fetchMenuItems();
      } else {
        alert(response.error || "Failed to delete item");
      }
    } catch {
      alert("Failed to delete item");
    }
  };

  const handleLogout = () => {
    authStorage.removeToken();
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-diner-cream">
        <p className="text-diner-coffee">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-diner-cream py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-diner-coffee">Admin Dashboard</h1>
          <div className="flex gap-4">
            <Link
              href="/admin/orders"
              className="px-4 py-2 border border-diner-coffee text-diner-coffee rounded-lg hover:bg-diner-coffee hover:text-diner-cream transition-colors"
            >
              Manage Orders
            </Link>
            <Link
              href="/admin/menu/new"
              className="px-4 py-2 bg-diner-coffee text-diner-cream rounded-lg hover:bg-diner-terracotta transition-colors"
            >
              Add Menu Item
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-diner-coffee text-diner-coffee rounded-lg hover:bg-diner-coffee hover:text-diner-cream transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-diner p-6">
          <h2 className="text-2xl font-semibold text-diner-coffee mb-4">Menu Items</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-diner-coffee/20">
                  <th className="text-left py-3 px-4 text-diner-coffee font-semibold">Name</th>
                  <th className="text-left py-3 px-4 text-diner-coffee font-semibold">Category</th>
                  <th className="text-left py-3 px-4 text-diner-coffee font-semibold">Price</th>
                  <th className="text-left py-3 px-4 text-diner-coffee font-semibold">Status</th>
                  <th className="text-left py-3 px-4 text-diner-coffee font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map((item) => (
                  <motion.tr
                    key={item._id}
                    className="border-b border-diner-coffee/10 hover:bg-diner-cream/50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <td className="py-3 px-4">
                      <div className="font-medium text-diner-coffee">{item.name}</div>
                      <div className="text-sm text-diner-coffee/70">{item.description}</div>
                    </td>
                    <td className="py-3 px-4 text-diner-coffee">{item.category}</td>
                    <td className="py-3 px-4 text-diner-gold font-semibold">${item.price.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs ${item.isAvailable
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                          }`}
                      >
                        {item.isAvailable ? "Available" : "Unavailable"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/menu/${item._id}/edit`}
                          className="text-diner-terracotta hover:text-diner-coffee text-sm font-medium"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

