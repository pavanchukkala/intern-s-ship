// app/internship/[id]/page.tsx
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase-cardload";
import Link from "next/link";

// Pre-generate static pages for each internship document based on its document ID
export async function generateStaticParams() {
  const internshipsSnapshot = await getDocs(collection(db, "internships"));
  return internshipsSnapshot.docs.map((doc) => ({
    id: doc.id,
  }));
}

interface InternshipData {
  id: string;
  [key: string]: any;
}

export default async function InternshipPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const internshipDoc = await getDoc(doc(db, "internships", id));

  if (!internshipDoc.exists()) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="container mx-auto p-8">
          <Link href="/" className="text-blue-500 hover:underline">
            &larr; Back to Home
          </Link>
          <p className="text-lg">Internship not found.</p>
        </div>
      </div>
    );
  }

  const internship: InternshipData = { id: internshipDoc.id, ...internshipDoc.data() };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto p-8">
        <Link href="/" className="text-blue-500 hover:underline">
          &larr; Back to Home
        </Link>
        <h1 className="text-4xl font-bold my-6">
          Internship Details - <span className="text-indigo-600">{internship.company}</span>
        </h1>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Document ID: {internship.id}</h2>
          <div className="space-y-2">
            {Object.entries(internship).map(([key, value]) => {
              if (key === "id") return null;
              return (
                <div key={key} className="border-b pb-1">
                  <span className="font-medium capitalize">{key}:</span>{" "}
                  <span className="break-words">
                    {typeof value === "object" ? JSON.stringify(value) : value.toString()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
