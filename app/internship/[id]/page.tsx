// app/internship/[id]/page.tsx
import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase-bigdata";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";

// Force dynamic rendering on every request
export const dynamic = "force-dynamic";

// Define the desired order for your fields
const desiredOrder = [
  "Company",
  "Founded",
  "Team",
  "CMMi Level",
  "Duration",
  "Quality And Trust",
  "Hands On Experience",
  "Certification Excellence",
  "Mentorship And Guidance",
];

const FUZZY_THRESHOLD = 2;

// Normalize keys (trim and lowercase) for uniform comparison
function normalizeKey(key: string): string {
  return key.trim().toLowerCase();
}

// Simple Levenshtein distance algorithm for fuzzy matching
function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array(n + 1).fill(0)
  );
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + 1
        );
      }
    }
  }
  return dp[m][n];
}

// Returns true if the two keys are within the defined fuzzy threshold
function fuzzyMatch(a: string, b: string, threshold: number = FUZZY_THRESHOLD): boolean {
  return levenshtein(normalizeKey(a), normalizeKey(b)) <= threshold;
}

// Helper to format keys for display (restores title case)
function formatKey(key: string): string {
  return key
    .replace(/[_\-]+/g, " ")
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .split(" ")
    .filter((word) => word.length > 0)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// Build an ordered array of [key, value] entries from the Firestore document
function getOrderedEntries(data: Record<string, any>): [string, any][] {
  const ignoreKeys = ["logo", "company", "role", "responseSchema"];
  const orderedKeys: string[] = [];

  // 1. Loop through desiredOrder (skipping "pay") and use fuzzy matching to add keys
  desiredOrder.forEach((desiredKey) => {
    if (normalizeKey(desiredKey) === "pay") return; // skip "pay"
    const matchedKey = Object.keys(data).find(
      (key) => !ignoreKeys.includes(key) && fuzzyMatch(key, desiredKey)
    );
    if (matchedKey && !orderedKeys.includes(matchedKey)) {
      orderedKeys.push(matchedKey);
    }
  });

  // 2. Append any additional keys (not in ignoreKeys) that weren’t matched already
  Object.keys(data).forEach((key) => {
    if (ignoreKeys.includes(key)) return;
    if (!orderedKeys.includes(key)) {
      orderedKeys.push(key);
    }
  });

  return orderedKeys.map((key) => [key, data[key]]);
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
              &larr; Know More
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const data = docSnap.data();
  const orderedEntries = getOrderedEntries(data);

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
              {orderedEntries.map(([key, value]) => (
                <div
                  key={key}
                  className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    {formatKey(key)}:
                  </span>
                  <div className="mt-1 text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                    {typeof value === "object" && value !== null
                      ? JSON.stringify(value)
                      : value.toString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
            All internship information displayed has been thoroughly verified to ensure its accuracy and support informed career decisions.
          </p>
        </section>
      </main>

      {/* Navigation Footer */}
      <footer className="bg-gray-50 dark:bg-gray-800 py-6">
        <div className="container mx-auto px-6 flex justify-center">
          <Link href="/">
            <Button className="px-6 py-3 text-lg font-medium rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-lg">
              &larr; Know More
            </Button>
          </Link>
        </div>
      </footer>
      <Footer />
    </div>
  );
}
