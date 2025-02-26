// app/internship-apply/[id]/ApplyForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { doc, addDoc, collection } from "firebase/firestore";
import { db as dbHugeData } from "@/lib/firebase-hugedata";

interface ResponseSchemaField {
  label: string;
  type: string; // e.g., "text", "email", "textarea", etc.
}

interface InternshipData {
  id: string;
  company?: string;
  responseSchema?: Record<string, ResponseSchemaField>;
  [key: string]: any;
}

interface ApplyFormProps {
  internship: InternshipData;
}

export default function ApplyForm({ internship }: ApplyFormProps) {
  const router = useRouter();
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // Initialize form values based on the response schema
  useEffect(() => {
    if (internship.responseSchema) {
      const initialValues: Record<string, string> = {};
      Object.keys(internship.responseSchema).forEach((key) => {
        initialValues[key] = "";
      });
      setFormValues(initialValues);
    }
  }, [internship.responseSchema]);

  const handleChange = (key: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const applicationData = {
        internshipId: internship.id,
        company: internship.company || "Unknown Company",
        responses: formValues,
        submittedAt: new Date().toISOString(),
      };

      // Instead of referencing a subcollection under a document,
      // we reference a top-level collection whose name is the internship id.
      const responsesCollectionRef = collection(dbHugeData, internship.id);
      await addDoc(responsesCollectionRef, applicationData);

      alert("Your application has been submitted successfully!");
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Failed to submit your application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {internship.responseSchema &&
        Object.entries(internship.responseSchema).map(([key, field]) => (
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
  );
}
