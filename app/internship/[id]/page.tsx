// app/internship/[id]/page.tsx
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase-bigdata"; // using comdata project
import Link from "next/link";

// Pre-generate static pages for each internship document by its ID
export async function generateStaticParams() {
  const snapshot = await getDocs(collection(db, "internships"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
  }));
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-8">
        <Link href="/" className="text-blue-500 hover:underline mb-4">
          &larr; Back to Home
        </Link>
        <p className="text-xl">Internship not found.</p>
      </div>
    );
  }

  const data = docSnap.data();
  const hasHeaderData = data.logo || data.company || data.role;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      {hasHeaderData ? (
        <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-12">
          <div className="container mx-auto px-4 text-center">
            {data.logo ? (
              <img
                src={data.logo}
                alt={data.company || "Logo"}
                className="mx-auto h-24 w-24 rounded-full border-4 border-white shadow-lg"
              />
            ) : (
              <div className="mx-auto h-24 w-24 flex items-center justify-center rounded-full bg-gray-300">
                <span className="text-3xl font-bold text-gray-800">?</span>
              </div>
            )}
            {data.company && (
              <h1 className="text-4xl font-bold text-white mt-4">
                {data.company}
              </h1>
            )}
            {data.role && (
              <p className="text-lg text-white mt-2">
                {data.role}
              </p>
            )}
            <Link
              href="/"
              className="mt-4 inline-block bg-white text-indigo-600 px-4 py-2 rounded hover:bg-gray-100"
            >
              &larr; Back to Internships
            </Link>
          </div>
        </header>
      ) : (
        <header className="bg-gradient-to-r from-gray-700 to-gray-900 py-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-white">Internship Details</h1>
            <Link
              href="/"
              className="mt-4 inline-block bg-white text-gray-700 px-4 py-2 rounded hover:bg-gray-100"
            >
              &larr; Back to Internships
            </Link>
          </div>
        </header>
      )}

      {/* Details Section */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Internship Information</h2>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {Object.entries(data)
              .filter(([key]) => key !== "responseSchema")
              .map(([key, value]) => (
                <div key={key} className="py-2">
                  <span className="font-semibold capitalize">{key}:</span>
                  <div className="mt-1 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {typeof value === "object"
                      ? JSON.stringify(value, null, 2)
                      : value.toString()}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}
