
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase-internorgres";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function RegisterInternship() {
  const [formData, setFormData] = useState({
    organization: "",
    applicantName: "",
    designation: "",
    mobile: "",
    email: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!db) {
      setError("Database connection failed. Please refresh and try again.");
      return;
    }

    if (!paymentMethod || !transactionId) {
        setError("Please complete the payment and provide a transaction ID.");
        return;
    }

    const submissionData = { ...formData, paymentMethod, transactionId, status: "pending" };

    try {
      await addDoc(collection(db, "internships"), submissionData);
      setSubmitted(true);
      setTimeout(() => router.push("/"), 4000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Submission failed. Please try again later.");
    }
  };

  let qrCodeImage = "";
  if (paymentMethod === "googlepay") qrCodeImage = "/BasicAssets/googlepay.jpg";
  else if (paymentMethod === "phonepay") qrCodeImage = "/BasicAssets/phonepay.jpg";
  else if (paymentMethod === "paytm") qrCodeImage = "/BasicAssets/paytm.jpg";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <NavBar />
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-8 shadow-lg rounded-xl w-full max-w-2xl mx-auto border dark:border-gray-700"
        >
          {submitted ? (
            <div className="text-center py-10">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
                <svg className="w-24 h-24 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>
              <h2 className="mt-6 text-2xl font-bold text-gray-800 dark:text-white">Thank You for Your Submission!</h2>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                Our team will review your internship posting and contact you within 24-48 hours. You will be redirected to the homepage shortly.
              </p>
            </div>
          ) : (
            <>
              <header className="text-center mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Post an Internship</h1>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Partner with us to find the best talent for your team.</p>
              </header>

              <div className="bg-sky-50 dark:bg-sky-900/50 p-6 rounded-lg mb-8 border border-sky-200 dark:border-sky-800">
                <h3 className="font-bold text-xl text-gray-800 dark:text-white">Why Post with Kegth?</h3>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  For a one-time fee of <strong>1500 INR</strong>, your internship will be featured on our platform and promoted to thousands of motivated candidates in our network. This fee helps us maintain a high-quality, curated platform for both companies and applicants.
                </p>
              </div>

              {error && <p className="mb-4 text-center font-medium text-red-600 dark:text-red-400">{error}</p>}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input name="organization" placeholder="Organization Name" onChange={handleChange} required />
                  <Input name="applicantName" placeholder="Your Full Name" onChange={handleChange} required />
                  <Input name="designation" placeholder="Your Designation (e.g., HR Manager)" onChange={handleChange} required />
                  <Input name="mobile" type="tel" placeholder="Your Mobile Number" onChange={handleChange} required />
                </div>
                <Input name="email" type="email" placeholder="Your Official Email" onChange={handleChange} required className="w-full" />

                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg border dark:border-gray-600">
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-white">Payment Process</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-4">1. Select your preferred payment app. 2. Scan the QR code to pay 1500 INR. 3. Enter the Transaction ID below.</p>
                  <div className="flex justify-center space-x-4 mb-4">
                    {["googlepay", "phonepay", "paytm"].map(method => (
                      <label key={method} className={`flex items-center space-x-2 cursor-pointer p-2 border rounded-lg ${paymentMethod === method ? 'border-sky-500 bg-sky-50' : 'border-gray-300'}`}>
                        <input type="radio" name="paymentMethod" value={method} checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} className="form-radio"/>
                        <span className="font-medium capitalize">{method.replace('pay', ' Pay')}</span>
                      </label>
                    ))}
                  </div>

                  {paymentMethod && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-center">
                      <img src={qrCodeImage} alt={`${paymentMethod} QR Code`} className="mx-auto w-48 h-48 object-contain rounded-md shadow-md" />
                      <Input name="transactionId" placeholder="Enter Transaction ID Here" onChange={(e) => setTransactionId(e.target.value)} required className="mt-4 max-w-xs mx-auto" />
                    </motion.div>
                  )}
                </div>

                <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                  Submit for Review
                </Button>
              </form>
              <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-6">
                By submitting, you agree to our <Link href="/legaldocs/terms-and-conditions" className="underline hover:text-sky-700">Terms of Service</Link>. Your privacy is important to us; learn more in our <Link href="/legaldocs/privacy-policy" className="underline hover:text-sky-700">Privacy Policy</Link>.
              </p>
            </>
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
