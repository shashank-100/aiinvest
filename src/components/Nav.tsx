"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "News", href: "/news" },
  { label: "Market", href: "/market" },
  { label: "Screener", href: "/screener" },
  { label: "Learn", href: "/learn" },
  { label: "AIME", href: "/aime" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-black text-white border-b border-gray-800 h-14 flex items-center px-4 md:px-8">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-[#00d4aa]">
          AInvest
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/aime"
            className="bg-[#00d4aa] text-black text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-[#00bfa0] transition-colors"
          >
            Try AIME Free
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21 6H3V4H21V6ZM21 13H3V11H21V13ZM3 20H21V18H3V20Z"
              fill="white"
            />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-14 left-0 right-0 bg-black border-b border-gray-800 px-4 py-4 flex flex-col gap-4 md:hidden">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-gray-300 hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/aime"
            className="bg-[#00d4aa] text-black text-sm font-semibold px-4 py-2 rounded-full text-center"
            onClick={() => setMenuOpen(false)}
          >
            Try AIME Free
          </Link>
        </div>
      )}
    </nav>
  );
}
