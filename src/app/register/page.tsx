"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { authApi } from "@/lib/api";
import { authStorage, AuthUser } from "@/lib/auth";

function RegisterPageContent() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        // Validate password length
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        setLoading(true);

        try {
            const response = await authApi.register(
                formData.name,
                formData.email,
                formData.password
            );

            if (response.success && response.data) {
                const userData = response.data as AuthUser;
                authStorage.setUser(userData);
                router.push("/order");
            } else {
                setError(response.error || "Registration failed");
            }
        } catch {
            setError("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse: { credential?: string }) => {
        if (!credentialResponse.credential) {
            setError("Google sign-up failed");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await authApi.googleAuth(credentialResponse.credential);

            if (response.success && response.data) {
                const userData = response.data as AuthUser;
                authStorage.setUser(userData);
                router.push("/order");
            } else {
                setError(response.error || "Google sign-up failed");
            }
        } catch {
            setError("Google sign-up failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-diner-cream via-diner-cream to-diner-gold/20 py-12 px-4 relative overflow-hidden">
            {/* Animated background elements */}
            <motion.div
                className="absolute top-20 left-10 w-64 h-64 bg-diner-terracotta/10 rounded-full blur-3xl"
                animate={{
                    x: [0, -40, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-20 right-10 w-72 h-72 bg-diner-coffee/5 rounded-full blur-3xl"
                animate={{
                    x: [0, 40, 0],
                    y: [0, -30, 0],
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
                        <span className="text-4xl">🍽️</span>
                    </div>
                </motion.div>

                <motion.h1
                    className="text-4xl md:text-5xl font-bold text-diner-coffee mb-2 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Join Us
                </motion.h1>

                <motion.p
                    className="text-diner-coffee/70 text-center mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    Create an account to start ordering
                </motion.p>

                {/* Google Sign-Up Button */}
                <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="flex justify-center">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => setError("Google sign-up failed")}
                            theme="outline"
                            size="large"
                            text="signup_with"
                            width="384"
                        />
                    </div>
                </motion.div>

                {/* Divider */}
                <motion.div
                    className="relative mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-diner-coffee/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-diner-coffee/60">or sign up with email</span>
                    </div>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <label className="block text-sm font-semibold text-diner-coffee mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-diner-coffee/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-diner-terracotta focus:border-transparent transition-all"
                            placeholder="John Doe"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <label className="block text-sm font-semibold text-diner-coffee mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-diner-coffee/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-diner-terracotta focus:border-transparent transition-all"
                            placeholder="you@example.com"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 }}
                    >
                        <label className="block text-sm font-semibold text-diner-coffee mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-diner-coffee/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-diner-terracotta focus:border-transparent transition-all"
                            placeholder="••••••••"
                        />
                        <p className="text-xs text-diner-coffee/60 mt-1">
                            Must be at least 6 characters
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.0 }}
                    >
                        <label className="block text-sm font-semibold text-diner-coffee mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            required
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-diner-coffee/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-diner-terracotta focus:border-transparent transition-all"
                            placeholder="••••••••"
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
                        transition={{ delay: 1.1 }}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Creating account...
                            </span>
                        ) : (
                            "Create Account"
                        )}
                    </motion.button>

                    <motion.div
                        className="text-center pt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                    >
                        <p className="text-diner-coffee/70">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="font-semibold text-diner-terracotta hover:text-diner-coffee transition-colors underline decoration-2 underline-offset-2"
                            >
                                Sign in
                            </Link>
                        </p>
                    </motion.div>

                    <motion.div
                        className="text-center pt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.3 }}
                    >
                        <Link
                            href="/"
                            className="text-sm text-diner-coffee/60 hover:text-diner-coffee transition-colors"
                        >
                            ← Back to Home
                        </Link>
                    </motion.div>
                </form>
            </motion.div>
        </div>
    );
}

export default function RegisterPage() {
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

    return (
        <GoogleOAuthProvider clientId={googleClientId}>
            <RegisterPageContent />
        </GoogleOAuthProvider>
    );
}
