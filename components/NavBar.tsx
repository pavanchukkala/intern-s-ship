 
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, Menu, X } from "lucide-react"; // Icons

export default function NavBar(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();

  // Navigation items
  const navItems = [
    { title: "Home", href: "/" },
    { title: "Blog", href: "/blog" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ];

  // Check if a nav item is active
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dark mode toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-md" : "bg-white dark:bg-gray-900"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img src="/BasicAssets/logo.jpg" alt="kegth Logo" className="h-8 w-8 rounded-full object-cover" />
            <span className="font-bold text-xl text-gray-900 dark:text-white">kegth</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className={`text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-sky-600 dark:text-sky-400 font-semibold"
                      : "text-gray-600 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400"
                  }`}
                >
                  {item.title}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Register Button */}
            <Link href="/register">
              <button
                className="hidden md:inline-block rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-sky-700 transition-transform transform hover:scale-105"
              >
                Register
              </button>
            </Link>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setOpen(!open)}
                className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Toggle menu"
              >
                {open ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-4"
          onClick={() => setOpen(false)} // Close menu on link click
        >
          <div className="container mx-auto px-4 space-y-3">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className={`block text-base font-medium transition-colors rounded-md px-3 py-2 ${
                    isActive(item.href)
                      ? "bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {item.title}
                </span>
              </Link>
            ))}
            <hr className="border-gray-200 dark:border-gray-700"/>
            <Link href="/register">
              <button
                className="w-full rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-sky-700 transition-transform transform hover:scale-105"
              >
                Register
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
