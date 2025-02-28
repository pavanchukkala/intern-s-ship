import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db as dbBigData } from "@/lib/firebase-bigdata";
import Link from "next/link";
import ApplyForm from "./ApplyForm";

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
  const docRef = doc(dbBigData, "internships", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-8">
        <p className="text-xl mb-4">Internship not found.</p>
        <Link href="/" className="text-blue-500 hover:underline">
          &larr; Back to Internships
        </Link>
      </div>
    );
  }

  const internship = { id: docSnap.id, ...docSnap.data() } as InternshipData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Apply for {internship.company || "this Internship"}
        </h1>
        <ApplyForm internship={internship} />
        <div className="mt-6 text-center">
          <Link href="/" className="text-indigo-600 hover:underline">
            &larr; Back to Internships
          </Link>
        </div>
      </div>
    </div>
  );
}
