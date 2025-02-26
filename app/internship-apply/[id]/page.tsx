// app/internship-apply/[id]/page.tsx
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db as dbBigData } from "@/lib/firebase-bigdata"; // Using comdata for internship details
import Link from "next/link";
import ApplyForm from "./ApplyForm"; // Client component for the interactive form

export async function generateStaticParams() {
  const snapshot = await getDocs(collection(dbBigData, "internships"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
  }));
}

interface InternshipData {
  id: string;
  company?: string;
  responseSchema?: Record<string, { label: string; type: string }>;
  [key: string]: any;
}

export default async function ApplyPage({ params }: { params: { id: string } }) {
  const { id } = params;
  // Fetch internship details from comdata
  const docRef = doc(dbBigData, "internships", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-8">
        <p className="text-xl mb-4">Internship not found.</p>
        <Link href="/" className="text-blue-500 hover:underline">
          &larr; Back to Internships
        </Link>
      </div>
    );
  }

  const internship = { id: docSnap.id, ...docSnap.data() } as InternshipData;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="container mx-auto max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
        <h1 className="text-3xl font-bold mb-6">
          Apply for {internship.company || "this Internship"}
        </h1>
        {/* Render the client component for the interactive form */}
        <ApplyForm internship={internship} />
        <div className="mt-6 text-center">
          <Link href="/" className="text-blue-500 hover:underline">
            &larr; Back to Internships
          </Link>
        </div>
      </div>
    </div>
  );
}
