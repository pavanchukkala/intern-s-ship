import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase-bigdata";
import KnowMore from "./KnowMore";

interface Params {
  params: {
    id: string;
  };
}

export default async function InternshipDetailPage({ params }: Params) {
  const { id } = params;
  const docRef = doc(db, "internships", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-8">
        <p className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          Internship not found.
        </p>
        <a
          href="/"
          className="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md"
        >
          &larr; Back to Home
        </a>
      </div>
    );
  }

  const data = { id, ...docSnap.data() };

  return <KnowMore internship={data} />;
}
