"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Globe, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function RegisterInternship() {
  const [formData, setFormData] = useState({
    organization: "",
    applicantName: "",
    designation: "",
    mobile: "",
    email: "",
  });
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
    try {
      await addDoc(collection(db, "internships"), formData);
      setSubmitted(true);
      setTimeout(() => router.push("/"), 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
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
                <Input name="organization" placeholder="Organization Name" onChange={handleChange} required className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500" />
                <Input name="applicantName" placeholder="Applicant Name" onChange={handleChange} required className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500" />
                <Input name="designation" placeholder="Designation" onChange={handleChange} required className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500" />
                <Input name="mobile" type="tel" placeholder="Mobile Number" onChange={handleChange} required className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500" />
                <Input name="email" type="email" placeholder="Email" onChange={handleChange} required className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500" />
                <Button type="submit" className="w-full bg-indigo-600 dark:bg-yellow-400 hover:bg-indigo-700 dark:hover:bg-yellow-500 text-white dark:text-gray-900 p-3 rounded-xl shadow-md transition-transform transform hover:scale-105">
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

      {/* Footer */}
      <footer className="w-full bg-indigo-600 dark:bg-gray-800 text-white p-4 text-center shadow-md">
        <p>&copy; 2024 Interns' Journey. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
