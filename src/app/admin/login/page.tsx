"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { authApi } from "@/lib/api";
import { authStorage, AuthUser } from "@/lib/auth";

export default function AdminLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await authApi.login(formData.email, formData.password);

      if (response.success && response.data) {
        const userData = response.data as AuthUser;
        authStorage.setUser(userData);
        router.push("/admin/dashboard");
      } else {
        setError(response.error || "Invalid credentials");
      }
    } catch (err: any) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-diner-cream py-12 px-4">
      <motion.div
        className="bg-white rounded-xl shadow-diner p-8 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-diner-coffee mb-2 text-center">Admin Login</h1>
        <p className="text-diner-coffee/70 text-center mb-6">Sign in to manage your restaurant</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-diner-coffee mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-diner-coffee/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-diner-terracotta"
              placeholder="admin@diner.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-diner-coffee mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border border-diner-coffee/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-diner-terracotta"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full bg-diner-coffee text-diner-cream py-3 rounded-lg font-semibold hover:bg-diner-terracotta transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

