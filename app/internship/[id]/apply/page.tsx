// app/internship/[id]/apply/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { doc, getDoc, collection, addDoc, updateDoc, getDocs } from "firebase/firestore";
import { db as dbHugeData } from "@/lib/firebase-hugedata"; // Using your new Firebase project for huge data
import Link from "next/link";

// Define types for the dynamic response schema.
interface ResponseSchemaField {
  label: string;
  type: string; // e.g., "text", "email", "textarea", etc.
}

interface ResponseSchema {
  [key: string]: ResponseSchemaField;
}

interface InternshipData {
  id: string;
  company?: string;
  responseSchema?: ResponseSchema; // Holds the dynamic form configuration.
  // ... other fields as needed
}

export async function generateStaticParams() {
  const snapshot = await getDocs(collection(dbHugeData, "internships"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
  }));
}

export default function ApplyPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [internship, setInternship] = useState<InternshipData | null>(null);
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchInternship() {
      try {
        const docRef = doc(dbHugeData, "internships", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const fetchedInternship = { id: docSnap.id, ...data } as InternshipData;
          setInternship(fetchedInternship);
          if (fetchedInternship.responseSchema) {
            const initialValues: Record<string, string> = {};
            Object.keys(fetchedInternship.responseSchema).forEach((key) => {
              initialValues[key] = "";
            });
            setFormValues(initialValues);
          }
        } else {
          setError("Internship not found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load internship data.");
      }
      setLoading(false);
    }
    fetchInternship();
  }, [id]);

  const handleChange = (key: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!internship || !internship.responseSchema) return;
    setSubmitting(true);

    try {
      // Construct application data with the responses.
      const applicationData = {
        internshipId: internship.id,
        company: internship.company || "Unknown Company",
        responses: formValues,
        submittedAt: new Date().toISOString(),
      };

      // Reference the internship document.
      const internshipDocRef = doc(dbHugeData, "internships", internship.id);
      // Create a new document in the "responses" subcollection.
      const responsesCollectionRef = collection(internshipDocRef, "responses");
      await addDoc(responsesCollectionRef, applicationData);

      // Optionally, update a key in the internship document if needed.
      // await updateDoc(internshipDocRef, { response: JSON.stringify(formValues) });

      alert("Your application has been submitted successfully!");
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Failed to submit your application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p>Loading application form...</p>
      </div>
    );
  }

  if (error || !internship) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-8">
        <p className="text-xl mb-4">{error || "Unknown error."}</p>
        <Link href="/" className="text-blue-500 hover:underline">
          &larr; Back to Internships
        </Link>
      </div>
    );
  }

  if (!internship.responseSchema) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-8">
        <p className="text-xl">No application form is configured for this internship.</p>
        <Link href="/" className="text-blue-500 hover:underline mt-4">
          &larr; Back to Internships
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="container mx-auto max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
        <h1 className="text-3xl font-bold mb-6">
          Apply for {internship.company || "this Internship"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {Object.entries(internship.responseSchema).map(([key, field]) => (
            <div key={key}>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  value={formValues[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-500"
                  rows={4}
                  required
                />
              ) : (
                <input
                  type={field.type}
                  value={formValues[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-500"
                  required
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md font-semibold"
          >
            {submitting ? "Submitting..." : "Submit Application"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link href="/" className="text-blue-500 hover:underline">
            &larr; Back to Internships
          </Link>
        </div>
      </div>
    </div>
  );
}
