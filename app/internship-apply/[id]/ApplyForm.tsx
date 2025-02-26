// app/internship-apply/[id]/ApplyForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { doc, addDoc, collection } from "firebase/firestore";
import { db as dbHugeData } from "@/lib/firebase-hugedata";

interface InternshipData {
  id: string;
  company?: string;
  // Here, responseSchema is simply an object whose keys represent form fields.
  // The values can be ignored (or empty strings) since we only need the key names.
  responseSchema?: Record<string, string>;
  [key: string]: any;
}

interface ApplyFormProps {
  internship: InternshipData;
}

export default function ApplyForm({ internship }: ApplyFormProps) {
  const router = useRouter();
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // Initialize form values for each key in the responseSchema
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

      // Use the internship ID as the collection name in internrespo for responses.
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

  // If no responseSchema is defined, display a message
  if (!internship.responseSchema) {
    return (
      <div className="text-center text-xl text-gray-500">
        No application form is configured for this internship.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {Object.keys(internship.responseSchema).map((key) => (
        <div key={key}>
          <label className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
            {key}
          </label>
          <input
            type="text"
            value={formValues[key]}
            onChange={(e) => handleChange(key, e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-500"
            required
          />
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
