// app/internship/[id]/page.tsx
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase-bigdata"; // using comdata project
import Link from "next/link";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar"; // Import the NavBar component

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-8">
        <NavBar />
        <p className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          Internship not found.
        </p>
        <Link href="/">
          <Button className="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md">
            &larr; Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  const data = docSnap.data();
  const hasHeaderData = data.logo || data.company || data.role;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <NavBar />
      {/* Hero Section */}
      {hasHeaderData ? (
        <header className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-12 shadow-md">
          <div className="container mx-auto px-6 text-center">
            {data.logo ? (
              <img
                src={data.logo}
                alt={data.company || "Company Logo"}
                className="mx-auto h-20 w-20 rounded-full border-4 border-white shadow-lg"
              />
            ) : (
              <div className="mx-auto h-20 w-20 flex items-center justify-center rounded-full bg-gray-300">
                <span className="text-3xl font-bold text-gray-800">?</span>
              </div>
            )}
            {data.company && (
              <h1 className="text-4xl font-bold text-white mt-4">
                {data.company}
              </h1>
            )}
            {data.role && (
              <p className="text-lg text-white mt-2 font-medium">{data.role}</p>
            )}
          </div>
        </header>
      ) : (
        <header className="bg-gradient-to-r from-gray-700 to-gray-900 py-8 shadow-md">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-3xl font-bold text-white">Internship Details</h1>
          </div>
        </header>
      )}

      {/* Details Section */}
      <main className="container mx-auto px-6 py-10">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-all">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
            Internship Information
          </h2>
          <div className="divide-y divide-gray-300 dark:divide-gray-700">
            {Object.entries(data)
              .filter(([key]) => key !== "responseSchema")
              .map(([key, value]) => (
                <div key={key} className="py-4">
                  <span className="font-semibold capitalize text-gray-700 dark:text-gray-300">
                    {key}:
                  </span>
                  <div className="mt-1 text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                    {typeof value === "object"
                      ? JSON.stringify(value, null, 2)
                      : value.toString()}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>

      {/* Footer with Back Button and Professional Verification Message */}
      <footer className="container mx-auto px-6 pb-12 flex flex-col items-center space-y-4">
        <Link href="/">
          <Button className="px-6 py-3 text-lg font-medium rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-lg">
            &larr; Back to Internships
          </Button>
        </Link>
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
          The internship information provided on this platform has been carefully verified by our experts to ensure accuracy and support informed career decisions.
        </p>
      </footer>
    </div>
  );
}
