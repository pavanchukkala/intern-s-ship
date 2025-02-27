import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase-bigdata"; // using comdata project
import Link from "next/link";
import GlobalAnimations from "@/components/GlobalAnimations";

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 p-8">
        <Link href="/" className="text-white text-lg hover:underline">
          &larr; Back to Home
        </Link>
        <p className="text-2xl text-white mt-4">Internship not found.</p>
      </div>
    );
  }

  const data = docSnap.data();
  const hasHeaderData = data.logo || data.company || data.role;

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Inject global animations */}
      <GlobalAnimations />
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-500 via-purple-500 to-pink-500 opacity-30 animate-pulse-slow"></div>
      </div>
      <div className="relative z-10">
        {/* Hero Section */}
        {hasHeaderData ? (
          <header className="py-16 text-center backdrop-blur-lg bg-white/30 dark:bg-gray-800/30">
            <div className="container mx-auto px-4 transform transition duration-700 hover:scale-105">
              {data.logo ? (
                <img
                  src={data.logo}
                  alt={data.company || "Logo"}
                  className="mx-auto h-28 w-28 rounded-full border-4 border-white shadow-2xl animate-bounce"
                />
              ) : (
                <div className="mx-auto h-28 w-28 flex items-center justify-center rounded-full bg-gray-300 shadow-2xl">
                  <span className="text-4xl font-bold text-gray-800">?</span>
                </div>
              )}
              {data.company && (
                <h1 className="mt-6 text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 animate-fadeIn">
                  {data.company}
                </h1>
              )}
              {data.role && (
                <p className="mt-4 text-2xl text-gray-800 dark:text-gray-200 animate-fadeIn delay-200">
                  {data.role}
                </p>
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
          <header className="py-12 text-center">
            <h1 className="text-4xl font-bold text-gray-800">Internship Details</h1>
            <Link
              href="/"
              className="mt-4 inline-block px-4 py-2 bg-white text-gray-800 rounded shadow hover:bg-gray-100 transition"
            >
              &larr; Back to Internships
            </Link>
          </header>
        )}

        {/* Details Section */}
        <main className="container mx-auto px-4 py-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-10 transform transition hover:scale-105">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
              Internship Information
            </h2>
            <div className="space-y-4">
              {Object.entries(data)
                .filter(([key]) => key !== "responseSchema")
                .map(([key, value]) => (
                  <div
                    key={key}
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition transform hover:scale-105"
                  >
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
      </div>
    </div>
  );
}
