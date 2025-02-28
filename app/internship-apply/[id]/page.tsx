"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db as dbBigData } from "@/lib/firebase-bigdata";
import Link from "next/link";
import ApplyForm from "./ApplyForm";
import { Globe, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ApplyPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [internship, setInternship] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInternship() {
      const docRef = doc(dbBigData, "internships", params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setInternship({ id: docSnap.id, ...docSnap.data() });
      }
      setLoading(false);
    }
    fetchInternship();
  }, [params.id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!internship) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-8">
        <p className="text-xl mb-4 text-gray-900 dark:text-gray-100">Internship not found.</p>
        <Link href="/" className="text-blue-500 hover:underline">
          &larr; Back to Internships
        </Link>
      </div>
    );
  }

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
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
          <Link href="/" className="hover:text-yellow-400 text-sm sm:text-base">
            Home
          </Link>
          <Link href="/about" className="hover:text-yellow-400 text-sm sm:text-base">
            About
          </Link>
          <Link href="/contact" className="hover:text-yellow-400 text-sm sm:text-base">
            Contact
          </Link>
          <Button
            variant="outline"
            onClick={() => setDarkMode(!darkMode)}
            className="p-2"
          >
            {darkMode ? <Sun size={24} className="text-yellow-400" /> : <Moon size={24} className="text-gray-200" />}
          </Button>
        </div>
      </nav>

      {/* Top Banner & Form */}
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="container mx-auto max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
            Apply for {internship.company || "this Internship"}
          </h1>
          <ApplyForm internship={internship} />
          <div className="mt-6 text-center">
            <Link href="/" className="text-blue-500 hover:underline">
              &larr; Back to Internships
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
