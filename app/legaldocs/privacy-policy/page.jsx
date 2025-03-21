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
                <strong>Introduction:</strong> At [Your Company Name], we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit and interact with our platform.
              </p>
              <p>
                <strong>Information We Collect:</strong>
                <br />
                <em>Personal Information:</em> When you interact with our platform, we may collect your name, Gmail address, and contact number, only when provided for specific purposes.
                <br />
                <em>Usage Data:</em> We also gather data about your interactions, such as your IP address, browser type, and pages visited, to help improve our services.
              </p>
              <p>
                <strong>Our Unique Approach:</strong>
                <br />
                We are proud to offer a platform that does not require any login or signup. This means:
                <ul className="list-disc list-inside">
                  <li>You can access and use our services without creating an account.</li>
                  <li>We do not track or monitor personal usage, ensuring your privacy is maintained.</li>
                  <li>Our platform is a secure, controlled, and open source environment where your experience is frictionless and private.</li>
                </ul>
              </p>
              <p>
                <strong>How We Use Your Information:</strong>
                <br />
                We use the information you provide to:
                <ul className="list-disc list-inside">
                  <li>Contact you regarding issues or inquiries you may have.</li>
                  <li>Facilitate your connection with companies and internship opportunities based on your profile.</li>
                  <li>Enhance and personalize your user experience on our platform.</li>
                </ul>
              </p>
              <p>
                <strong>Data Sharing & Third Parties:</strong>
                <br />
                We may share your information with trusted third-party service providers solely to match you with relevant opportunities. We do not sell or rent your personal data. However, once data is shared, we cannot guarantee its security, and we are not liable for any breaches on their end.
              </p>
              <p>
                <strong>Data Retention:</strong>
                <br />
                We retain your information only as long as necessary to provide our services or as required by law. Once no longer needed, your data is securely deleted.
              </p>
              <p>
                <strong>Data Security:</strong>
                <br />
                We implement robust security measures to protect your data. However, no method of electronic storage or transmission is completely secure.
              </p>
              <p>
                <strong>Your Rights:</strong>
                <br />
                Depending on your location, you may have rights over your personal data, including access, correction, deletion, or restriction of its processing. For any requests or inquiries about your data, please contact us at [Your Contact Email].
              </p>
              <p>
                <strong>Changes to This Privacy Policy:</strong>
                <br />
                We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. Please review this page regularly for any updates.
              </p>
              <p>
                <strong>Contact Us:</strong>
                <br />
                If you have any questions or concerns regarding this Privacy Policy, please contact us at: 
                <br /> <em>[Your Contact Information]</em>
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
