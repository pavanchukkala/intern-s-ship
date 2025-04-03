"use client";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NavBar() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-gray-800 dark:to-gray-900 text-white p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center shadow-lg">
      <div className="flex items-center space-x-3 mb-4 sm:mb-0">
        <img
          src="/icon.png" // Change this path based on your actual icon location
          alt="Internship Icon"
          className="w-10 h-10" // Adjust size as needed
        />
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold">INTERNS⛵SHIP</h1>
          <p className="text-lg sm:text-xl font-extrabold">TO</p>
          <p className="text-2xl sm:text-3xl font-extrabold">Internship</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 sm:gap-6">
        <a href="/" className="hover:text-yellow-400 text-sm sm:text-base">
          Home
        </a>
        <a href="/about" className="hover:text-yellow-400 text-sm sm:text-base">
          About
        </a>
        <a href="/contact" className="hover:text-yellow-400 text-sm sm:text-base">
          Contact
        </a>
        <Button
          variant="outline"
          onClick={() => setDarkMode(!darkMode)}
          className="p-2"
        >
          {darkMode ? (
            <Sun size={24} className="text-yellow-400" />
          ) : (
            <Moon size={24} className="text-gray-200" />
          )}
        </Button>
      </div>
    </nav>
  );
}
