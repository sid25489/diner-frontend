"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import MobileNav from "./MobileNav";
import { authStorage } from "@/lib/auth";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About Us" },
  { href: "/order", label: "Order Online" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
  { href: "/accessibility", label: "Accessibility" },
];

export default function Header() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = authStorage.getUser();
    setIsAuthenticated(!!user);
    if (user) {
      setUserName(user.name);
    }
  }, []);

  const handleLogout = () => {
    authStorage.removeToken();
    setIsAuthenticated(false);
    setUserName("");
    router.push("/");
  };

  return (
    <header className="w-full bg-diner-coffee py-3 px-6 flex justify-center items-center shadow-diner sticky top-0 z-30">
      <nav className="flex gap-3 md:gap-6 items-center w-full max-w-6xl mx-auto">
        <span className="font-bold text-diner-cream text-xl tracking-tight select-none mr-3">Diner</span>
        <div className="hidden md:flex gap-3 md:gap-6 items-center flex-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-diner-cream px-2 py-1 rounded-lg font-medium hover:bg-diner-terracotta/70 transition"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Auth buttons */}
        <div className="hidden md:flex gap-3 items-center">
          {isAuthenticated ? (
            <>
              <span className="text-diner-cream/80 text-sm">Hi, {userName}!</span>
              <button
                onClick={handleLogout}
                className="text-diner-cream bg-diner-terracotta px-4 py-2 rounded-lg font-medium hover:bg-diner-terracotta/80 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-diner-cream px-4 py-2 rounded-lg font-medium hover:bg-diner-terracotta/70 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-diner-cream bg-diner-terracotta px-4 py-2 rounded-lg font-medium hover:bg-diner-terracotta/80 transition"
              >
                Sign Up
              </Link>
            </>
          )}
          <Link
            href="/admin/login"
            className="text-diner-cream px-2 py-1 rounded-lg font-medium hover:bg-diner-terracotta/70 transition text-sm opacity-80"
          >
            Admin
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-end md:hidden">
          <MobileNav />
        </div>
      </nav>
    </header>
  );
}

