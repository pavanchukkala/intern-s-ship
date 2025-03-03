"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, app } from "@/lib/talk";
import { Globe, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "@/components/NavBar";

export default function TalkToExpertPage() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<"free" | "dedicated" | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Free consultation form state
  const [freeData, setFreeData] = useState({
    domain: "",
    stream: "",
    education: "",
    purpose: "",
  });

  // Dedicated consultation form state
  const [dedicatedData, setDedicatedData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    email: "",
    transactionId: "",
  });
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);

  const handleFreeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFreeData({ ...freeData, [e.target.name]: e.target.value });
  };

  const handleDedicatedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDedicatedData({ ...dedicatedData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentScreenshot(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (!db) {
        setError("Firebase is not initialized. Please refresh the page.");
        setLoading(false);
        return;
      }
      if (selectedOption === "free") {
        await addDoc(collection(db, "talkToExpertFree"), freeData);
      } else if (selectedOption === "dedicated") {
        const storage = getStorage(app);
        let screenshotUrl = "";
        if (paymentScreenshot) {
          const storageRef = ref(
            storage,
            `paymentScreenshots/${paymentScreenshot.name}-${Date.now()}`
          );
          await uploadBytes(storageRef, paymentScreenshot);
          screenshotUrl = await getDownloadURL(storageRef);
        }
        const dataToSubmit = { ...dedicatedData, paymentScreenshot: screenshotUrl };
        await addDoc(collection(db, "talkToExpertDedicated"), dataToSubmit);
      }
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => router.push("/"), 3000);
    } catch (err) {
      console.error("Submission error:", err);
      setError("Failed to submit. Please try again later.");
      setLoading(false);
    }
  };

  // Animation variants for cards and form fields
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 flex flex-col">
      {/* Reusable NavBar */}
      <NavBar />
      
      <main className="flex-grow flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {/* Landing Cards */}
          {!selectedOption && !submitted && (
            <motion.div 
              key="landing"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="flex flex-col items-center space-y-8"
            >
              <h2 className="text-3xl font-bold mb-4 text-indigo-600 dark:text-yellow-400">
                Choose Your Consultation
              </h2>
              <div className="flex flex-col md:flex-row gap-8">
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  className="cursor-pointer w-80 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all"
                  onClick={() => setSelectedOption("free")}
                >
                  <h3 className="text-2xl font-bold mb-3">Free Consultation</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Tap into expert advice at zero cost. Quick insights, no strings attached.
                  </p>
                </motion.div>
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ scale: 1.05, rotate: -1 }}
                  className="cursor-pointer w-80 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all"
                  onClick={() => setSelectedOption("dedicated")}
                >
                  <h3 className="text-2xl font-bold mb-3">Dedicated Consultation</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Dive deep with one-on-one guidance. Personalized help for your next big move.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Consultation Form */}
          {selectedOption && !submitted && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl w-full max-w-2xl border dark:border-gray-700"
            >
              <h2 className="text-3xl font-bold mb-6 text-indigo-600 dark:text-yellow-400">
                {selectedOption === "free" ? "Free Consultation" : "Dedicated Consultation"}
              </h2>
              {error && (
                <motion.p 
                  className="text-red-500 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error}
                </motion.p>
              )}
              <form onSubmit={handleSubmit} className="space-y-5">
                {selectedOption === "free" ? (
                  <>
                    <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ duration: 0.3 }}>
                      <Input 
                        name="domain" 
                        placeholder="Interested Domain" 
                        onChange={handleFreeChange} 
                        required 
                        className="w-full p-4 rounded-xl border focus:ring-2 focus:ring-indigo-500"
                      />
                    </motion.div>
                    <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ duration: 0.35 }}>
                      <Input 
                        name="stream" 
                        placeholder="Stream" 
                        onChange={handleFreeChange} 
                        required 
                        className="w-full p-4 rounded-xl border focus:ring-2 focus:ring-indigo-500"
                      />
                    </motion.div>
                    <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ duration: 0.4 }}>
                      <Input 
                        name="education" 
                        placeholder="Educational Details" 
                        onChange={handleFreeChange} 
                        required 
                        className="w-full p-4 rounded-xl border focus:ring-2 focus:ring-indigo-500"
                      />
                    </motion.div>
                    <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ duration: 0.45 }}>
                      <textarea 
                        name="purpose" 
                        placeholder="Purpose" 
                        rows={4} 
                        onChange={handleFreeChange} 
                        required 
                        className="w-full p-4 rounded-xl border focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                      ></textarea>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ duration: 0.3 }}>
                      <Input 
                        name="name" 
                        placeholder="Your Name" 
                        onChange={handleDedicatedChange} 
                        required 
                        className="w-full p-4 rounded-xl border focus:ring-2 focus:ring-indigo-500"
                      />
                    </motion.div>
                    <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ duration: 0.35 }}>
                      <Input 
                        name="phone" 
                        placeholder="Phone Number" 
                        onChange={handleDedicatedChange} 
                        required 
                        className="w-full p-4 rounded-xl border focus:ring-2 focus:ring-indigo-500"
                      />
                    </motion.div>
                    <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ duration: 0.4 }}>
                      <Input 
                        name="whatsapp" 
                        placeholder="WhatsApp Number" 
                        onChange={handleDedicatedChange} 
                        required 
                        className="w-full p-4 rounded-xl border focus:ring-2 focus:ring-indigo-500"
                      />
                    </motion.div>
                    <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ duration: 0.45 }}>
                      <Input 
                        name="email" 
                        type="email" 
                        placeholder="Email" 
                        onChange={handleDedicatedChange} 
                        required 
                        className="w-full p-4 rounded-xl border focus:ring-2 focus:ring-indigo-500"
                      />
                    </motion.div>
                    <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ duration: 0.5 }}>
                      <Input 
                        name="transactionId" 
                        placeholder="Transaction ID" 
                        onChange={handleDedicatedChange} 
                        required 
                        className="w-full p-4 rounded-xl border focus:ring-2 focus:ring-indigo-500"
                      />
                    </motion.div>
                    <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ duration: 0.55 }}>
                      <div>
                        <label className="block mb-2 font-medium">Payment Screenshot</label>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleFileChange} 
                          required 
                          className="w-full p-3 border rounded-xl"
                        />
                      </div>
                    </motion.div>
                  </>
                )}
                <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ duration: 0.6 }}>
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-indigo-600 dark:bg-yellow-400 hover:bg-indigo-700 dark:hover:bg-yellow-500 text-white dark:text-gray-900 p-4 rounded-xl shadow-lg transition-transform transform hover:scale-105"
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          )}

          {/* Success Message */}
          {submitted && (
            <motion.div
              key="submitted"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex flex-col items-center justify-center space-y-4"
            >
              <CheckCircle size={64} className="text-green-500" />
              <h2 className="text-3xl font-bold text-green-600">Success!</h2>
              <p className="text-lg">Your response has been received.</p>
              <p className="text-sm text-gray-500">Redirecting to homepage...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer with Copyright Banner */}
      <footer className="bg-gray-50 dark:bg-gray-800 text-center py-4 shadow-md">
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          &copy; {new Date().getFullYear()} Interns' Journey. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
