// app/internship-apply/[id]/ApplyForm.tsx
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

// Define the desired order for your fields (including "pay" if needed)
const desiredOrder = [
  "College Name",
  "Highest Qualification",
  "Mail Id",
  "Mobile Number",
  "Name",
  "Resume Link",
  "Year Of Pass Out",
  "pay",
];

// Helper to format keys consistently regardless of input variations
function formatKey(key: string): string {
  return key
    .replace(/[_\-]+/g, " ") // Replace underscores and hyphens with a space
    .replace(/[^a-zA-Z0-9\s]/g, "") // Remove any special characters
    .split(" ")
    .filter((word) => word.length > 0)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export default function ApplyForm({ internship }: ApplyFormProps) {
  const router = useRouter();
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentTransactionId, setPaymentTransactionId] = useState("");

  // Determine QR code image based on payment method
  let qrCodeImage = "";
  if (paymentMethod === "googlepay") {
    qrCodeImage = "/BasicAssets/googlepay.jpg";
  } else if (paymentMethod === "phonepay") {
    qrCodeImage = "/BasicAssets/phonepay.jpg";
  } else if (paymentMethod === "paytm") {
    qrCodeImage = "/BasicAssets/paytm.jpg";
  }

  // When responseSchema is available, initialize form values using ordered keys (excluding "pay")
  useEffect(() => {
    if (internship.responseSchema) {
      const initialValues: Record<string, string> = {};

      // Create an ordered list of keys for the form (exclude "pay")
      const orderedFormKeys: string[] = [];
      desiredOrder.forEach((key) => {
        if (key !== "pay" && internship.responseSchema?.hasOwnProperty(key)) {
          orderedFormKeys.push(key);
        }
      });
      // Append any additional keys not in desiredOrder
      Object.keys(internship.responseSchema).forEach((key) => {
        if (key !== "pay" && !orderedFormKeys.includes(key)) {
          orderedFormKeys.push(key);
        }
      });
      // Initialize each field to an empty string
      orderedFormKeys.forEach((key) => {
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
      const applicationData: Record<string, any> = {
        responses: formValues,
      };

      // Only include payment details if "pay" field exists in the schema
      if (internship.responseSchema && "pay" in internship.responseSchema) {
        applicationData.paymentMethod = paymentMethod;
        applicationData.transactionId = paymentTransactionId;
      }

      const responsesCollectionRef = collection(dbHugeData, internship.id);
      await addDoc(responsesCollectionRef, applicationData);

      setSubmitted(true);
      setTimeout(() => router.push("/"), 2000);
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
        <h2 className="text-lg font-medium text-green-550 dark:text-green-400">
          Thank You!
        </h2>
        <p className="text-lg font-medium text-green-700 dark:text-green-400">
          ✅ Thank you for your interest! We will send further instructions soon.
        </p>
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

  // Build the ordered list of form keys (excluding "pay")
  const orderedFormKeys: string[] = [];
  desiredOrder.forEach((key) => {
    if (key !== "pay" && internship.responseSchema?.hasOwnProperty(key)) {
      orderedFormKeys.push(key);
    }
  });
  Object.keys(internship.responseSchema).forEach((key) => {
    if (key !== "pay" && !orderedFormKeys.includes(key)) {
      orderedFormKeys.push(key);
    }
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Render non-payment fields using the custom order */}
      {orderedFormKeys.map((key) => (
        <div key={key}>
          <label className="block text-md font-medium text-gray-700 dark:text-gray-300 mb-1">
            {formatKey(key)}
          </label>
          <input
            type="text"
            value={formValues[key]}
            onChange={(e) => handleChange(key, e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-400 transition"
            required
          />
        </div>
      ))}

      {/* Conditionally display payment UI if "pay" field exists */}
      {internship.responseSchema && "pay" in internship.responseSchema && (
        <div className="mt-6 space-y-4">
          <p className="text-md font-medium text-gray-700 dark:text-gray-300">
            Payment Amount: {internship.responseSchema.pay}
          </p>
          <p className="text-md font-medium text-gray-700 dark:text-gray-300">
            Select Payment Method:
          </p>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-1 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="googlepay"
                checked={paymentMethod === "googlepay"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Google Pay</span>
            </label>
            <label className="flex items-center space-x-1 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="phonepay"
                checked={paymentMethod === "phonepay"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>PhonePe</span>
            </label>
            <label className="flex items-center space-x-1 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="paytm"
                checked={paymentMethod === "paytm"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Paytm</span>
            </label>
          </div>
          {paymentMethod && (
            <div className="mt-4">
              <img
                src={qrCodeImage}
                alt={`${paymentMethod} QR Code`}
                className="w-48 h-48 object-contain"
              />
            </div>
          )}
          <div className="mt-4">
            <label className="block text-md font-medium text-gray-700 dark:text-gray-300">
              Transaction ID
            </label>
            <input
              type="text"
              value={paymentTransactionId}
              onChange={(e) => setPaymentTransactionId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-400 transition"
              required
            />
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold transition"
      >
        {submitting ? "Submitting..." : "Submit Application"}
      </button>
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        Note: Every internship on our platform undergoes rigorous verification.
      </p>
    </form>
  );
}
