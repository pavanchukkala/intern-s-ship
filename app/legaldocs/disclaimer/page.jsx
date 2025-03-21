"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Globe, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

export default function Disclaimer() {
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen overflow-x-hidden`}>
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
            <a href="/legaldocs/disclaimer" className="hover:text-yellow-400 text-sm sm:text-base">Disclaimer</a>
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
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Disclaimer</h2>
            <section className="space-y-6 text-base leading-relaxed">
              <p>
                <strong>Effective Date:</strong> [Insert Date]
              </p>
              <p>
                <strong>General Disclaimer:</strong> The information provided on this platform is for general informational purposes only. Our platform is open source, does not require signups, and does not track users. All content is provided "as is" without warranties of any kind, either express or implied.
              </p>
              <p>
                <strong>No Liability:</strong> We do not guarantee the accuracy, completeness, or reliability of the information provided. Users rely on this information at their own risk, and we shall not be held liable for any losses or damages arising from its use or misuse.
              </p>
              <p>
                <strong>User Responsibility:</strong> Users are solely responsible for verifying any information before relying on it. We encourage you to exercise caution and conduct your own research when making decisions based on the content provided.
              </p>
              <p>
                <strong>Third-Party Links:</strong> Any links to external websites are provided for convenience only. We do not endorse or assume responsibility for the content or practices of these third-party sites.
              </p>
            </section>
            <div className="mt-10 text-center">
              <Button variant="outline" onClick={() => router.push("/")}>
                Back to Home
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
