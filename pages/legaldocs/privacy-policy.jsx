"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Globe, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  return (
    <div className={`${darkMode ? "dark" : ""} overflow-x-hidden`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
        {/* Navbar */}
        <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-gray-800 dark:to-gray-900 text-white p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center shadow-lg">
          <div className="flex items-center space-x-3 mb-4 sm:mb-0">
            <Globe className="text-yellow-400" size={32} />
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl sm:text-3xl font-extrabold">INTERNS⛵SHIP</h1>
              <p className="text-lg sm:text-xl font-extrabold">TO</p>
              <p className="text-2xl sm:text-3xl font-extrabold">Internship</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            <a href="/" className="hover:text-yellow-400 text-sm sm:text-base">Home</a>
            <a href="/about" className="hover:text-yellow-400 text-sm sm:text-base">About</a>
            <a href="/contact" className="hover:text-yellow-400 text-sm sm:text-base">Contact</a>
            <a href="/legaldocs/privacy-policy" className="hover:text-yellow-400 text-sm sm:text-base">Privacy Policy</a>
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
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex-1">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Privacy Policy</h2>
          <section className="space-y-4 text-base leading-relaxed">
            <p>
              <strong>Effective Date:</strong> [Insert Date]
            </p>
            <p>
              <strong>Introduction:</strong> We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and share your information when you use our platform.
            </p>
            <p>
              <strong>Information We Collect:</strong> We collect basic details such as your name, Gmail address, and contact number. This data is collected solely to be shared with respective companies as per their requirements.
            </p>
            <p>
              <strong>How We Use Your Information:</strong> Your data is used to contact you regarding issues you have raised. Other than that, our platform does not use your information for any additional purposes.
            </p>
            <p>
              <strong>Data Sharing:</strong> The data collected is shared with companies based on their specific needs. Although we collect, maintain, and organize your data securely, there remains a chance of data leakage from the company’s side, for which we are not responsible.
            </p>
            <p>
              <strong>Data Security:</strong> We take appropriate measures to secure your data, but no electronic transmission or storage method is completely foolproof.
            </p>
            <p>
              <strong>User Consent:</strong> By using our platform, you consent to the collection and use of your information as detailed in this Privacy Policy.
            </p>
          </section>
          {/* Navigation Back to Home */}
          <div className="mt-8">
            <Button variant="outline" onClick={() => router.push("/")}>
              Back to Home
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

