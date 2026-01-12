"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { authApi } from "@/lib/api";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        setLoading(true);

        try {
            const response = await authApi.forgotPassword(email);

            if (response.success || response.data) {
                setSuccess(true);
                setEmail("");
            } else {
                setError(response.error || "Failed to send reset email");
            }
        } catch {
            setError("Request failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-diner-cream via-diner-cream to-diner-gold/20 py-12 px-4 relative overflow-hidden">
            {/* Animated background elements */}
            <motion.div
                className="absolute top-20 right-10 w-64 h-64 bg-diner-coffee/5 rounded-full blur-3xl"
                animate={{
                    x: [0, 40, 0],
                    y: [0, -30, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-20 left-10 w-72 h-72 bg-diner-terracotta/10 rounded-full blur-3xl"
                animate={{
                    x: [0, -40, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-md relative z-10 border border-diner-gold/20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                {/* Logo/Icon */}
                <motion.div
                    className="flex justify-center mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                    <div className="w-20 h-20 bg-gradient-to-br from-diner-terracotta to-diner-gold rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-4xl">🔑</span>
                    </div>
                </motion.div>

                <motion.h1
                    className="text-4xl md:text-5xl font-bold text-diner-coffee mb-2 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Forgot Password?
                </motion.h1>

                <motion.p
                    className="text-diner-coffee/70 text-center mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    {success
                        ? "Check your email for the reset link"
                        : "Enter your email to receive a password reset link"
                    }
                </motion.p>

                {success ? (
                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className="bg-green-50 border-2 border-green-200 text-green-700 px-4 py-4 rounded-xl text-center">
                            <p className="font-semibold mb-2">✓ Reset link sent!</p>
                            <p className="text-sm">
                                If an account exists with that email, you will receive a password reset link shortly.
                            </p>
                        </div>

                        <motion.div
                            className="text-center space-y-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <p className="text-diner-coffee/70 text-sm">
                                Didn&apos;t receive the email? Check your spam folder.
                            </p>
                            <button
                                onClick={() => setSuccess(false)}
                                className="text-diner-terracotta hover:text-diner-coffee transition-colors font-medium"
                            >
                                Send another email
                            </button>
                        </motion.div>

                        <motion.div
                            className="text-center pt-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-2 text-diner-coffee/60 hover:text-diner-coffee transition-colors"
                            >
                                ← Back to login
                            </Link>
                        </motion.div>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <label className="block text-sm font-semibold text-diner-coffee mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-diner-coffee/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-diner-terracotta focus:border-transparent transition-all"
                                placeholder="you@example.com"
                            />
                        </motion.div>

                        {error && (
                            <motion.div
                                className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                {error}
                            </motion.div>
                        )}

                        <motion.button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-diner-terracotta to-diner-gold text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            whileHover={{ scale: loading ? 1 : 1.02, y: -2 }}
                            whileTap={{ scale: loading ? 1 : 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Sending...
                                </span>
                            ) : (
                                "Send Reset Link"
                            )}
                        </motion.button>

                        <motion.div
                            className="text-center pt-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            <Link
                                href="/login"
                                className="text-diner-coffee/60 hover:text-diner-coffee transition-colors"
                            >
                                ← Back to login
                            </Link>
                        </motion.div>
                    </form>
                )}
            </motion.div>
        </div>
    );
}
