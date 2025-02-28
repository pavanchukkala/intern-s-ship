"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { db as dbHugeData } from "@/lib/firebase-hugedata";
import { motion } from "framer-motion";

interface InternshipData {
  id: string;
  company?: string;
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
  const [submitted, setSubmitted] = useState(false);

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
        responses: formValues,
      };

      const responsesCollectionRef = collection(dbHugeData, internship.id);
      await addDoc(responsesCollectionRef, applicationData);

      // Instead of an alert, show a smooth success message and then redirect.
      setSubmitted(true);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("Failed to submit your application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="text-center p-8"
      >
        <h2 className="text-2xl font-bold mb-4">Success!</h2>
        <p className="text-lg">Your application has been submitted successfully.</p>
      </motion.div>
    );
  }

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
          <label className="block text-md font-medium text-gray-700 mb-1">
            {key}
          </label>
          <input
            type="text"
            value={formValues[key]}
            onChange={(e) => handleChange(key, e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 transition"
            required
          />
        </div>
      ))}
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold transition"
      >
        {submitting ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
