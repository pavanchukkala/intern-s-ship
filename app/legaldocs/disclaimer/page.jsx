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
                <strong>Effective Date:</strong> 21-03-2025
              </p>
              <p>
                <strong>General Overview:</strong> 
                <br />
                This Disclaimer (“Disclaimer”) governs your use of the information, content, and services provided on the Internsship platform (“Platform”), which is an open source initiative designed for connecting aspiring interns with opportunities. The Platform operates on a model that does not require user registration, login, or tracking, and is intended solely for general informational purposes.
              </p>
              <p>
                <strong>No Warranty & “As Is” Basis:</strong>
                <br />
                All information and materials on the Platform are provided "as is" and without warranties of any kind, whether express or implied. We expressly disclaim any warranties, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, and non-infringement. Use of this Platform is at your sole risk.
              </p>
              <p>
                <strong>Limitation of Liability:</strong>
                <br />
                Under no circumstances shall Internsship, its owners, or any affiliates be liable for any direct, indirect, incidental, consequential, special, or exemplary damages arising from your use of the Platform, even if advised of the possibility of such damages. This includes, but is not limited to, damages resulting from errors, omissions, or inaccuracies in the information provided.
              </p>
              <p>
                <strong>User Responsibilities & Indemnification:</strong>
                <br />
                Users are solely responsible for verifying the information provided on the Platform before relying on it for any purpose, including making internship-related decisions. You acknowledge that any actions taken based on the information found on the Platform are undertaken at your own risk. You agree to indemnify, defend, and hold harmless Internsship and its affiliates from any claims, damages, liabilities, or expenses arising from your use or misuse of the Platform.
              </p>
              <p>
                <strong>No Tracking, No Signups:</strong>
                <br />
                The Platform is uniquely designed to operate without requiring user signups, logins, or tracking. This model is a core feature intended to enhance privacy and transparency. While this approach minimizes the collection of personal data, users should understand that all information is provided on an “as is” basis and is not subject to further verification.
              </p>
              <p>
                <strong>Third-Party Content & Links:</strong>
                <br />
                The Platform may contain links to third-party websites or resources. Internsship does not control, endorse, or assume any responsibility for the content, privacy policies, or practices of any third parties. Your use of any third-party website is at your own risk.
              </p>
              <p>
                <strong>Changes and Updates:</strong>
                <br />
                We reserve the right to update or modify this Disclaimer at any time without prior notice. Any changes will be effective immediately upon posting the revised Disclaimer on the Platform. Your continued use of the Platform following any changes signifies your acceptance of the revised terms.
              </p>
              <p>
                <strong>Governing Law & Jurisdiction:</strong>
                <br />
                his Disclaimer shall be governed by and construed in accordance with the laws of India. Any disputes arising from this Disclaimer or your use of the Platform shall be subject to the exclusive jurisdiction of the courts in Tirupati, Andhra Pradesh, India.
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
