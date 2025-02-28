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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
        <p className="text-xl mb-4">Internship not found.</p>
        <Link href="/" className="text-blue-500 hover:underline">
          &larr; Back to Internships
        </Link>
      </div>
    );
  }

  const internship = { id: docSnap.id, ...docSnap.data() } as InternshipData;

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Apply for {internship.company || "this Internship"}
        </h1>
        <ApplyForm internship={internship} />
        <div className="mt-4 text-center">
          <Link href="/" className="text-blue-500 hover:underline">
            &larr; Back to Internships
          </Link>
        </div>
      </div>
    </div>
  );
}
