"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase-cardload";
import Link from "next/link";
import { Globe, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function InternshipDetailPage() {
  const params = useParams();
  const { id } = params; // Assumes URL is /internship/[id]
  const router = useRouter();

  const [internship, setInternship] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    async function fetchInternship() {
      try {
        const docRef = doc(db, "internships", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setInternship(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching internship:", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchInternship();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  // If no internship was found
  if (!internship) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBarComponent darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="flex flex-col flex-1 items-center justify-center bg-gradient-to-r from-gray-700 to-gray-900 p-8">
          <Link href="/" className="text-blue-400 hover:underline mb-4">
            &larr; Back to Home
          </Link>
          <p className="text-2xl text-white">Internship not found.</p>
        </div>
        <FooterComponent />
      </div>
    );
  }

  // Check if at least one header field is available
  const hasHeaderData = internship.logo || internship.company || internship.role;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Top Banner */}
      <NavBarComponent darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Hero / Detail Section */}
      {hasHeaderData ? (
        <header className="py-16 text-center bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-gray-800 dark:to-gray-900 shadow-lg">
          <div className="container mx-auto px-4 transform transition duration-700 hover:scale-105">
            {internship.logo ? (
              <img
                src={internship.logo}
                alt={internship.company || "Logo"}
                className="mx-auto h-28 w-28 rounded-full border-4 border-white shadow-2xl animate-bounce"
              />
            ) : (
              <div className="mx-auto h-28 w-28 flex items-center justify-center rounded-full bg-gray-300 shadow-2xl">
                <span className="text-4xl font-bold text-gray-800">?</span>
              </div>
            )}
            {internship.company && (
              <h1 className="mt-6 text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                {internship.company}
              </h1>
            )}
            {internship.role && (
              <p className="mt-4 text-2xl text-gray-100">{internship.role}</p>
            )}
            <Link
              href="/"
              className="mt-8 inline-block px-8 py-3 rounded-full bg-white text-indigo-600 font-semibold shadow-lg transition transform hover:scale-110"
            >
              &larr; Back to Internships
            </Link>
          </div>
        </header>
      ) : (
        <header className="py-12 text-center bg-gray-700">
          <h1 className="text-4xl font-bold text-white">Internship Details</h1>
          <Link
            href="/"
            className="mt-4 inline-block px-4 py-2 bg-white text-gray-800 rounded shadow transition hover:bg-gray-100"
          >
            &larr; Back to Internships
          </Link>
        </header>
      )}

      {/* Details Section */}
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-10 transform transition hover:scale-105">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
            Internship Information
          </h2>
          <div className="space-y-4">
            {Object.entries(internship)
              .filter(([key]) => key !== "responseSchema")
              .map(([key, value]) => (
                <div key={key} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition transform hover:scale-105">
                  <span className="block font-semibold uppercase text-sm text-indigo-600">
                    {key}:
                  </span>
                  <p className="mt-1 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {typeof value === "object"
                      ? JSON.stringify(value, null, 2)
                      : value.toString()}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </main>

      {/* Bottom Banner */}
      <FooterComponent />
    </div>
  );
}

// Inline NavBar Component
function NavBarComponent({
  darkMode,
  setDarkMode,
}: {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}) {
  const router = useRouter();

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-gray-800 dark:to-gray-900 text-white p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center shadow-lg">
      <div className="flex items-center space-x-3 mb-4 sm:mb-0">
        <Globe className="text-yellow-400" size={32} />
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold">INTERNS⛵HIP</h1>
          <p className="text-lg sm:text-xl font-extrabold">TO</p>
          <p className="text-2xl sm:text-3xl font-extrabold">Know More</p>
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
          onClick={() => {
            setDarkMode(!darkMode);
            document.documentElement.classList.toggle("dark", !darkMode);
          }}
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

// Inline Footer Component
function FooterComponent() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-gray-800 dark:to-gray-900 text-white p-4 sm:p-6 text-center shadow-lg">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Interns⛵hip Platform. All rights reserved.
      </p>
    </footer>
  );
}
