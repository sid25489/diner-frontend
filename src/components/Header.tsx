import Link from "next/link";
import MobileNav from "./MobileNav";

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
  return (
    <header className="w-full bg-diner-coffee py-3 px-6 flex justify-center items-center shadow-diner sticky top-0 z-30">
      <nav className="flex gap-3 md:gap-6 items-center w-full max-w-6xl mx-auto">
        <span className="font-bold text-diner-cream text-xl tracking-tight select-none mr-3">Diner</span>
        <div className="hidden md:flex gap-3 md:gap-6 items-center">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-diner-cream px-2 py-1 rounded-lg font-medium hover:bg-diner-terracotta/70 transition"
            >
              {label}
            </Link>
          ))}
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

