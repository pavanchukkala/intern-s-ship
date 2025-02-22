// app/internship/[company]/page.tsx
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase-cardload";
import Link from "next/link";

// Pre-generate static pages for each company found in the "internships" collection
export async function generateStaticParams() {
  const internshipsSnapshot = await getDocs(collection(db, "internships"));
  const companies = new Set<string>();
  internshipsSnapshot.docs.forEach((doc) => {
    const data = doc.data();
    if (data.company) companies.add(data.company);
  });
  return Array.from(companies).map((company) => ({ company }));
}

interface InternshipData {
  id: string;
  [key: string]: any;
}

export default async function CompanyInternshipPage({
  params,
}: {
  params: { company: string };
}) {
  const { company } = params;

  // Query Firestore for all internships for this company
  const internshipsQuery = query(
    collection(db, "internships"),
    where("company", "==", company)
  );
  const querySnapshot = await getDocs(internshipsQuery);
  const internships: InternshipData[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto p-8">
        <Link href="/" className="text-blue-500 hover:underline">
          &larr; Back to Home
        </Link>
        <h1 className="text-4xl font-bold my-6">
          Internships at <span className="text-indigo-600">{company}</span>
        </h1>
        {internships.length === 0 ? (
          <p className="text-lg">No internships found for {company}.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {internships.map((internship) => (
              <div
                key={internship.id}
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
              >
                <h2 className="text-2xl font-semibold mb-4">
                  Document ID: {internship.id}
                </h2>
                <div className="space-y-2">
                  {Object.entries(internship).map(([key, value]) => {
                    // Skip fields that you don't want to repeat if desired.
                    if (key === "id") return null;
                    return (
                      <div key={key} className="border-b pb-1">
                        <span className="font-medium capitalize">
                          {key}:
                        </span>{" "}
                        <span className="break-words">
                          {typeof value === "object"
                            ? JSON.stringify(value)
                            : value.toString()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
