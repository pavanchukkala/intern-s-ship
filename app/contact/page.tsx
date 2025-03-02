// app/contact/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Globe, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Replace this with your form handling logic (e.g., send to backend)
    console.log("Contact Form Submitted", { name, mobile, email, message });
    // Optionally clear the form:
    setName("");
    setMobile("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
        {/* Navbar */}
        <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-gray-800 dark:to-gray-900 text-white p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center shadow-lg">
          <div className="flex items-center space-x-3 mb-4 sm:mb-0">
            <Globe className="text-yellow-400" size={32} />
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl sm:text-3xl font-extrabold">INTERNS⛵SHIP</h1>
              <p className="text-lg sm:text-xl font-extrabold">TO</p>
              <p className="text-2xl sm:text-3xl font-extrabold">Contact</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            <Link href="/">
              <a className="hover:text-yellow-400 text-sm sm:text-base">Home</a>
            </Link>
            <Link href="/about">
              <a className="hover:text-yellow-400 text-sm sm:text-base">About</a>
            </Link>
            <Link href="/contact">
              <a className="hover:text-yellow-400 text-sm sm:text-base">Contact</a>
            </Link>
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

        {/* Main Content */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
            Contact Us
          </h2>
          <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mobile" className="block text-lg font-medium mb-2">
                Mobile No.
              </label>
              <input
                type="tel"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter your mobile number"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-medium mb-2">
                Gmail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Gmail"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-lg font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message"
                rows={5}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              ></textarea>
            </div>
            <div className="text-center">
              <Button type="submit" variant="outline" className="px-6 py-2">
                Send Message
              </Button>
            </div>
          </form>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-200 dark:bg-gray-700 text-center py-6">
        <p className="text-sm">
          © {new Date().getFullYear()} Internship Platform. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
