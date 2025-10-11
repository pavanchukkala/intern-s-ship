
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Globe, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

export default function TermsAndConditions() {
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Terms and Conditions</h2>
            <section className="space-y-6 text-base leading-relaxed">
              <p>
                <strong>Effective Date:</strong> 21-3-2025
              </p>
              <p>
                <strong>Introduction:</strong> Welcome to Kegth. By accessing and using our platform, you agree to these Terms and Conditions. Please read them carefully.
              </p>
              <p>
                <strong>User Responsibilities:</strong>
                <br />
                It is the user's sole responsibility to secure an internship and complete it successfully. Any rejections, issues, or malpractice (including misrepresentations or misconduct) are entirely the user's responsibility. Our platform will not be held liable for any such occurrences.
              </p>
              <p>
                <strong>Acceptable Guidelines:</strong>
                <br />
                In the process of applying for internships—particularly paid internships—if you are asked to make payments outside of our official platform charges, it is your responsibility to immediately report such activities via our "Contact Us" page. We do not endorse or facilitate any off-platform transactions.
              </p>
              <p>
                <strong>Intellectual Property:</strong>
                <br />
                All content, design, and underlying code on this platform are the exclusive property of Chukkala Pavan Kumar. I developed this platform single-handedly, and any modifications, maintenance, or enhancements will be managed by my designated team. Unauthorized use, reproduction, or distribution of any content is prohibited.
              </p>
              <p>
                <strong>Disclaimer:</strong>
                <br />
                Our platform is provided "as is" and "as available" without any warranties. We do not guarantee that your experience or the outcomes of internships will meet your expectations. We are not responsible for any indirect, incidental, or consequential damages arising from your use of our platform.
              </p>
              <p>
                <strong>Governing Law:</strong>
                <br />
                These terms are governed by and construed in accordance with the laws of India. Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts in Tirupati, Andhra Pradesh, India.
              </p>
              <p>
                <strong>Changes to Terms and Conditions:</strong>
                <br />
                We reserve the right to modify these Terms and Conditions at any time. Changes will be posted on this page with an updated effective date. Your continued use of the platform constitutes your acceptance of any changes.
              </p>
              <p>
                <strong>Contact Information:</strong>
                <br />
                If you have any questions or concerns about these Terms and Conditions, please contact us at: hello@kegth.com
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
