"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, app } from "@/lib/talk"; // Imported from talk.ts
import { Globe, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function TalkToExpertPage() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [selectedOption, setSelectedOption] = useState<"free" | "charge">("free");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Free option state
  const [freeData, setFreeData] = useState({
    domain: "",
    stream: "",
    education: "",
    purpose: "",
  });

  // Charge option state
  const [chargeData, setChargeData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    email: "",
    transactionId: "",
  });
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);

  const handleFreeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFreeData({ ...freeData, [e.target.name]: e.target.value });
  };

  const handleChargeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChargeData({ ...chargeData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentScreenshot(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (!db) {
        setError("Firebase is not initialized. Please refresh the page.");
        return;
      }
      if (selectedOption === "free") {
        await addDoc(collection(db, "talkToExpertFree"), freeData);
      } else {
        // Upload the screenshot to Firebase Storage
        const storage = getStorage(app);
        let screenshotUrl = "";
        if (paymentScreenshot) {
          // Create a unique storage reference using the current timestamp
          const storageRef = ref(storage, `paymentScreenshots/${paymentScreenshot.name}-${Date.now()}`);
          await uploadBytes(storageRef, paymentScreenshot);
          screenshotUrl = await getDownloadURL(storageRef);
        }
        const dataToSubmit = { ...chargeData, paymentScreenshot: screenshotUrl };
        await addDoc(collection(db, "talkToExpertCharge"), dataToSubmit);
      }
      setSubmitted(true);
      setTimeout(() => router.push("/"), 3000);
    } catch (err) {
      console.error("Submission error:", err);
      setError("Failed to submit. Please try again later.");
    }
  };

  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-gray-800 dark:to-gray-900 text-white p-4 flex justify-between items-center shadow-lg w-full">
        <div className="flex items-center space-x-3">
          <Globe className="text-yellow-400" size={32} />
          <h1 className="text-2xl font-extrabold">Interns' Journey</h1>
        </div>
        <div className="flex items-center space-x-4">
          <a href="/" className="hover:text-yellow-400 transition-colors">Home</a>
          <a href="/about" className="hover:text-yellow-400 transition-colors">About</a>
          <a href="/contact" className="hover:text-yellow-400 transition-colors">Contact</a>
          <a href="/talk-to-expert" className="hover:text-yellow-400 transition-colors">Talk to Expert</a>
          <Button variant="outline" onClick={() => setDarkMode(!darkMode)} className="p-2">
            {darkMode ? <Sun size={24} className="text-yellow-400" /> : <Moon size={24} className="text-gray-200" />}
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col items-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-8 shadow-lg rounded-xl w-full max-w-lg mt-6 border dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold mb-6 text-indigo-600 dark:text-yellow-400">
            Talk to Expert
          </h2>
          <p className="text-lg italic text-gray-600 dark:text-gray-400 mb-6">
            Not sure which internship to choose? Let our experts guide you.
          </p>
          <div className="flex justify-center gap-4 mb-6">
            <Button 
              variant={selectedOption === "free" ? "default" : "outline"} 
              onClick={() => setSelectedOption("free")}
            >
              Free Consultation
            </Button>
            <Button 
              variant={selectedOption === "charge" ? "default" : "outline"} 
              onClick={() => setSelectedOption("charge")}
            >
              Paid Consultation
            </Button>
          </div>

          {submitted ? (
            <p className="text-lg font-medium text-green-600 dark:text-green-400">
              ✅ Thank you! Your response has been received. Redirecting to homepage...
            </p>
          ) : (
            <>
              {error && (
                <p className="text-lg font-medium text-red-600 dark:text-red-400">
                  {error}
                </p>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                {selectedOption === "free" ? (
                  <>
                    <Input 
                      name="domain" 
                      placeholder="Interested Domain" 
                      onChange={handleFreeChange} 
                      required 
                      className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500" 
                    />
                    <Input 
                      name="stream" 
                      placeholder="Stream" 
                      onChange={handleFreeChange} 
                      required 
                      className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500" 
                    />
                    <Input 
                      name="education" 
                      placeholder="Educational Details" 
                      onChange={handleFreeChange} 
                      required 
                      className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500" 
                    />
                    <textarea 
                      name="purpose" 
                      placeholder="Purpose" 
                      rows={4} 
                      onChange={handleFreeChange} 
                      required 
                      className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600" 
                    ></textarea>
                  </>
                ) : (
                  <>
                    <Input 
                      name="name" 
                      placeholder="Your Name" 
                      onChange={handleChargeChange} 
                      required 
                      className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500" 
                    />
                    <Input 
                      name="phone" 
                      placeholder="Phone Number" 
                      onChange={handleChargeChange} 
                      required 
                      className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500" 
                    />
                    <Input 
                      name="whatsapp" 
                      placeholder="WhatsApp Number" 
                      onChange={handleChargeChange} 
                      required 
                      className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500" 
                    />
                    <Input 
                      name="email" 
                      type="email" 
                      placeholder="Email" 
                      onChange={handleChargeChange} 
                      required 
                      className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500" 
                    />
                    <Input 
                      name="transactionId" 
                      placeholder="Transaction ID" 
                      onChange={handleChargeChange} 
                      required 
                      className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500" 
                    />
                    <div>
                      <label className="block mb-2">Payment Screenshot</label>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        required 
                        className="w-full p-2 border rounded-xl"
                      />
                    </div>
                  </>
                )}
                <Button 
                  type="submit" 
                  className="w-full bg-indigo-600 dark:bg-yellow-400 hover:bg-indigo-700 dark:hover:bg-yellow-500 text-white dark:text-gray-900 p-3 rounded-xl shadow-md transition-transform transform hover:scale-105"
                >
                  Submit
                </Button>
              </form>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                Your privacy is our priority.
              </p>
            </>
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-indigo-600 dark:bg-gray-800 text-white p-4 text-center shadow-md">
        <p>&copy; {new Date().getFullYear()} Interns' Journey. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
