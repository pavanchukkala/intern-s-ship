"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase-internorgres";
import { Globe, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import NavBar from "@/components/NavBar"; // Import NavBar
import Footer from "@/components/Footer"; // Import Footer

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
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!db) {
      setError("Firebase is not initialized. Please refresh the page.");
      return;
    }
    
    // Merge the payment info into the submission data
    const submissionData = { ...formData, paymentMethod, transactionId };
    
    try {
      await addDoc(collection(db, "internships"), submissionData);
      setSubmitted(true);
      setTimeout(() => router.push("/"), 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to submit. Please try again later.");
    }
  };

  // Determine QR code image based on selected payment method
  let qrCodeImage = "";
  if (paymentMethod === "googlepay") {
    qrCodeImage = "/BasicAssets/googlepay.jpg";
  } else if (paymentMethod === "phonepay") {
    qrCodeImage = "/BasicAssets/phonepay.jpg";
  } else if (paymentMethod === "paytm") {
    qrCodeImage = "/BasicAssets/paytm.jpg";
  }

  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
      <NavBar />

      {/* Main Content */}
      <main className="flex flex-col items-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-8 shadow-lg rounded-xl w-full max-w-lg mt-6 border dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold mb-6 text-indigo-600 dark:text-yellow-400">Register an Internship</h2>
          <p className="text-lg italic text-gray-600 dark:text-gray-400 mb-6">
            "Your gateway to a successful and impactful collaboration!"
          </p>
          
          {submitted ? (
            <p className="text-lg font-medium text-green-600 dark:text-green-400">
              ✅ Thank you! We have received your response. Our team will contact you soon.
            </p>
          ) : (
            <>
              {error && <p className="text-lg font-medium text-red-600 dark:text-red-400">{error}</p>}
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input 
                  name="organization" 
                  placeholder="Organization Name" 
                  onChange={handleChange} 
                  required 
                  className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500" 
                />
                <Input 
                  name="applicantName" 
                  placeholder="Applicant Name" 
                  onChange={handleChange} 
                  required 
                  className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500" 
                />
                <Input 
                  name="designation" 
                  placeholder="Designation" 
                  onChange={handleChange} 
                  required 
                  className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500" 
                />
                <Input 
                  name="mobile" 
                  type="tel" 
                  placeholder="Mobile Number" 
                  onChange={handleChange} 
                  required 
                  className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500" 
                />
                <Input 
                  name="email" 
                  type="email" 
                  placeholder="Email" 
                  onChange={handleChange} 
                  required 
                  className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500" 
                />
                
                {/* Payment Method Section */}
                <div className="space-y-2">
                  <p className="font-medium mb-2">Select Payment Method:</p>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-1 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="googlepay"
                        checked={paymentMethod === "googlepay"}
                        onChange={() => setPaymentMethod("googlepay")}
                      />
                      <span>Google Pay</span>
                    </label>
                    <label className="flex items-center space-x-1 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="phonepay"
                        checked={paymentMethod === "phonepay"}
                        onChange={() => setPaymentMethod("phonepay")}
                      />
                      <span>PhonePe</span>
                    </label>
                    <label className="flex items-center space-x-1 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paytm"
                        checked={paymentMethod === "paytm"}
                        onChange={() => setPaymentMethod("paytm")}
                      />
                      <span>Paytm</span>
                    </label>
                  </div>
                </div>

                {/* Display fee and QR code when a payment method is selected */}
                {paymentMethod && (
                  <div className="mt-4 text-center">
                    <p className="text-sm font-medium mb-2">
                      Fee for internship registration: 1500₹
                    </p>
                    <img 
                      src={qrCodeImage} 
                      alt={`${paymentMethod} QR Code`} 
                      className="mx-auto w-48 h-48 object-contain" 
                    />
                  </div>
                )}

                {/* Transaction ID input */}
                <Input 
                  name="transactionId" 
                  placeholder="Transaction ID" 
                  onChange={(e) => setTransactionId(e.target.value)} 
                  required 
                  className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500" 
                />

                <Button 
                  type="submit" 
                  className="w-full bg-indigo-600 dark:bg-yellow-400 hover:bg-indigo-700 dark:hover:bg-yellow-500 text-white dark:text-gray-900 p-3 rounded-xl shadow-md transition-transform transform hover:scale-105"
                >
                  Submit
                </Button>
              </form>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                Your privacy is our priority. Please allow us to verify your details.
              </p>
            </>
          )}
        </motion.div>
      </main>
      <Footer /> {/* Reuse Footer Component */}
    </div>
  );
}
