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
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Privacy Policy</h2>
            <section className="space-y-6 text-base leading-relaxed">
              <p>
                <strong>Effective Date:</strong> 21-03-2025
              </p>
              <p>
                This Privacy Policy describes how Kegth ("we", "us", or "our") collects, uses, and discloses your information when you use our website (the "Service").
              </p>
              <p>
                <strong>Information Collection and Use</strong>
                <br />
                We collect several different types of information for various purposes to provide and improve our Service to you.
              </p>
              <p>
                <strong>Personal Data</strong>
                <br />
                While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally, identifiable information may include, but is not limited to:
                <ul className="list-disc list-inside">
                  <li>Email address</li>
                  <li>First name and last name</li>
                  <li>Phone number</li>
                  <li>Address, State, Province, ZIP/Postal code, City</li>
                  <li>Cookies and Usage Data</li>
                </ul>
              </p>
              <p>
                <strong>Usage Data</strong>
                <br />
                We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
              </p>
              <p>
                <strong>Use of Data</strong>
                <br />
                Kegth uses the collected data for various purposes:
                <ul className="list-disc list-inside">
                  <li>To provide and maintain the Service</li>
                  <li>To notify you about changes to our Service</li>
                  <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                  <li>To provide customer care and support</li>
                  <li>To provide analysis or valuable information so that we can improve the Service</li>
                  <li>To monitor the usage of the Service</li>
                  <li>To detect, prevent and address technical issues</li>
                </ul>
              </p>
              <p>
                <strong>Changes to This Privacy Policy</strong>
                <br />
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "effective date" at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
              <p>
                <strong>Contact Us</strong>
                <br />
                If you have any questions about this Privacy Policy, please contact us by email: kegthgroup@gmail.com
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
