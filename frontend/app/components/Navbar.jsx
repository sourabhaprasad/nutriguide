"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkStyle =
    "block px-4 py-2 rounded transition duration-200 bg-transparent text-gray-700 hover:bg-gray-200 hover:text-green-400 hover:scale-105";

  return (
    <nav
      className="bg-[#F5F5F4] border-b border-[#E5E7EB] px-6 py-4 shadow-sm 
                 fixed md:static top-0 left-0 w-full z-50"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <h1 className="text-xl font-semibold text-[#333]">NutriGuide</h1>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? "✖" : "☰"}
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-4">
          <Link href="/" className={navLinkStyle}>
            Home
          </Link>
          <Link href="/about" className={navLinkStyle}>
            About
          </Link>
          <Link href="/products" className={navLinkStyle}>
            Products
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-40 mt-4" : "max-h-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col space-y-2">
          <Link
            href="/"
            className={navLinkStyle}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={navLinkStyle}
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/products"
            className={navLinkStyle}
            onClick={() => setMenuOpen(false)}
          >
            Products
          </Link>
        </div>
      </div>
    </nav>
  );
}
