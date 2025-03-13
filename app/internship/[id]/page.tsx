// app/internship/[id]/page.tsx
import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase-bigdata";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";

// Force the page to be dynamic on every request
export const dynamic = "force-dynamic";

// Helper to format field keys into a readable format, independent of indentation, case, or special characters.
function formatKey(key: string): string {
  return key
    // Replace underscores and hyphens with a space
    .replace(/[_\-]+/g, " ")
    // Remove any remaining special characters
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .split(" ")
    .filter((word) => word.length > 0)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// Helper to render values, handling nested objects and arrays recursively.
function renderValue(value: any): any {
  if (typeof value === "object" && value !== null) {
    if (Array.isArray(value)) {
      return (
        <div className="ml-4">
          {value.map((item, index) => (
            <div key={index}>{renderValue(item)}</div>
          ))}
        </div>
      );
    }
    return (
      <div className="ml-4 border-l-2 border-gray-300 pl-4 mt-2">
        {Object.entries(value).map(([subKey, subVal]) => (
          <div key={subKey} className="py-1">
            <strong>{formatKey(subKey)}:</strong> {renderValue(subVal)}
          </div>
        ))}
      </div>
    );
  }
  return value.toString();
}

interface InternshipData {
  id: string;
  [key: string]: any;
}

export default async function InternshipDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const docRef = doc(db, "internships", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <NavBar />
        <div className="flex flex-col items-center justify-center p-8">
          <p className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            Internship not found.
          </p>
          <Link href="/">
            <Button className="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md">
              &larr; Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const data = docSnap.data();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 relative">
      <ScrollProgress />
      <NavBar />
      <main className="container mx-auto px-6 py-8 space-y-12">
        {/* Hero Section */}
        <section className="mb-8">
          <header className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-12 shadow-lg rounded-lg transition-transform duration-500 hover:scale-105">
            <div className="text-center">
              {data.logo && (
                <img
                  src={data.logo}
                  alt={data.company || "Company Logo"}
                  className="mx-auto h-20 w-20 object-contain object-center rounded-full border-4 border-white shadow-lg"
                />
              )}
              {data.company && (
                <h1 className="text-4xl font-bold text-white mt-4">
                  {data.company}
                </h1>
              )}
              {data.role && (
                <p className="text-lg text-white mt-2 font-medium">
                  {data.role}
                </p>
              )}
            </div>
          </header>
        </section>

        {/* Internship Information Section */}
        <section>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white border-b pb-2">
              Internship Information
            </h2>
            <div className="space-y-4">
              {Object.entries(data)
                // Skip specific keys in a case-insensitive manner if needed
                .filter(
                  ([key]) =>
                    key.toLowerCase() !== "responseschema" &&
                    key.toLowerCase() !== "logo"
                )
                .map(([key, value]) => (
                  <div
                    key={key}
                    className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      {formatKey(key)}:
                    </span>
                    <div className="mt-1 text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                      {renderValue(value)}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
            All internship information displayed has been thoroughly verified to
            ensure its accuracy and support informed career decisions.
          </p>
        </section>
      </main>

      {/* Navigation Footer */}
      <footer className="bg-gray-50 dark:bg-gray-800 py-6">
        <div className="container mx-auto px-6 flex justify-center">
          <Link href="/">
            <Button className="px-6 py-3 text-lg font-medium rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-lg">
              &larr; Back to Internships
            </Button>
          </Link>
        </div>
      </footer>
      <Footer />
    </div>
  );
}
