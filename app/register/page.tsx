"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Globe, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    setError(null); // Clear previous errors
    try {
      // Store data in Firestore
      await addDoc(collection(db, "internships"), formData);
      setSubmitted(true);
      setTimeout(() => router.push("/"), 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to submit. Please try again later.");
    }
  };

  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8 w-full`}>
      
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-gray-800 dark:to-gray-900 text-white p-6 flex justify-between items-center shadow-lg w-full">
        <div className="flex items-center space-x-3">
          <Globe className="text-yellow-400" size={32} />
          <h1 className="text-3xl font-extrabold">Interns' Journey</h1>
        </div>
        <div className="flex items-center space-x-6">
          <a href="/" className="hover:text-yellow-400">Home</a>
          <a href="/about" className="hover:text-yellow-400">About</a>
          <a href="/contact" className="hover:text-yellow-400">Contact</a>
          <Button variant="outline" onClick={() => setDarkMode(!darkMode)} className="p-2">
            {darkMode ? <Sun size={24} className="text-yellow-400" /> : <Moon size={24} className="text-gray-200" />}
          </Button>
        </div>
      </nav>

      {/* Registration Form */}
      <div className="bg-white dark:bg-gray-800 p-8 shadow-lg rounded-lg w-full max-w-lg text-center mt-6">
        <h2 className="text-2xl font-bold mb-6 text-indigo-600 dark:text-yellow-400">Register an Internship</h2>
        <p className="text-lg italic text-gray-600 dark:text-gray-400 mb-6">"Your gateway to a successful and impactful collaboration!"</p>
        
        {submitted ? (
          <p className="text-lg font-medium text-green-600 dark:text-green-400">
            ✅ Thank you! We have received your response. Our team will contact you soon.
          </p>
        ) : (
          <>
            {error && <p className="text-lg font-medium text-red-600 dark:text-red-400">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input name="organization" placeholder="Organization Name" onChange={handleChange} required className="p-3 border rounded-xl" />
              <Input name="applicantName" placeholder="Applicant Name" onChange={handleChange} required className="p-3 border rounded-xl" />
              <Input name="designation" placeholder="Designation" onChange={handleChange} required className="p-3 border rounded-xl" />
              <Input name="mobile" type="tel" placeholder="Mobile Number" onChange={handleChange} required className="p-3 border rounded-xl" />
              <Input name="email" type="email" placeholder="Email" onChange={handleChange} required className="p-3 border rounded-xl" />
              <Button type="submit" className="w-full bg-indigo-600 dark:bg-yellow-400 hover:bg-indigo-700 dark:hover:bg-yellow-500 text-white dark:text-gray-900 p-3 rounded-xl shadow-md">
                Submit
              </Button>
            </form>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
              Since user privacy is our priority, please allow us to verify your details.
            </p>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="w-full bg-indigo-600 dark:bg-gray-800 text-white p-4 text-center mt-6 shadow-md">
        <p>&copy; 2024 Interns' Journey. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
