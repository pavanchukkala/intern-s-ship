// app/internship/[id]/page.tsx
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase-bigdata"; // Now loading from comdata (firebase-bigdata)
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center p-8">
          <Link href="/" className="text-blue-500 hover:underline">
            &larr; Back to Home
          </Link>
          <p className="mt-4 text-lg">Internship not found.</p>
        </div>
      </div>
    );
  }

  const internship: InternshipData = { id: internshipDoc.id, ...internshipDoc.data() };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-12">
        <div className="container mx-auto px-4 text-center">
          <img
            src={internship.logo}
            alt={internship.company}
            className="mx-auto mb-4 h-24 w-24 rounded-full border-4 border-white shadow-lg"
          />
          <h1 className="text-4xl font-bold text-white">
            {internship.company}
          </h1>
          <p className="text-xl text-white mt-2">{internship.role}</p>
          <Link href="/" className="mt-4 inline-block bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100">
            &larr; Back to Internships
          </Link>
        </div>
      </div>

      {/* Details Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Internship Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="font-medium">Duration: </span>
              <span>{internship.duration}</span>
            </div>
            <div>
              <span className="font-medium">Location: </span>
              <span>{internship.location}</span>
            </div>
            <div>
              <span className="font-medium">Stipend: </span>
              <span>{internship.stipend}</span>
            </div>
            <div>
              <span className="font-medium">Skills: </span>
              <span>{internship.skills}</span>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-medium">Additional Information</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              Document ID: {internship.id}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
