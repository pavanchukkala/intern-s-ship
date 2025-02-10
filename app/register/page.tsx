"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => router.push("/"), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 p-8 shadow-lg rounded-lg w-full max-w-lg text-center"
      >
        <h1 className="text-4xl font-extrabold text-indigo-600 dark:text-yellow-400 mb-4">Interns' Journey</h1>
        <p className="text-lg italic text-gray-600 dark:text-gray-400 mb-6">"Your gateway to a successful and impactful collaboration!"</p>
        <h2 className="text-2xl font-bold mb-6">Register an Internship</h2>
        {submitted ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-lg font-medium text-green-600 dark:text-green-400"
          >
            Thank you! We have received your response. Our team will contact you soon.
          </motion.p>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input name="organization" placeholder="Organization Name" onChange={handleChange} required className="p-3 border rounded-xl" />
              <Input name="applicantName" placeholder="Applicant Name" onChange={handleChange} required className="p-3 border rounded-xl" />
              <Input name="designation" placeholder="Designation" onChange={handleChange} required className="p-3 border rounded-xl" />
              <Input name="mobile" type="tel" placeholder="Mobile Number" onChange={handleChange} required className="p-3 border rounded-xl" />
              <Input name="email" type="email" placeholder="Email" onChange={handleChange} required className="p-3 border rounded-xl" />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button type="submit" className="w-full bg-indigo-600 dark:bg-yellow-400 hover:bg-indigo-700 dark:hover:bg-yellow-500 text-white dark:text-gray-900 p-3 rounded-xl shadow-md">
                  Submit
                </Button>
              </motion.div>
            </form>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-sm text-gray-600 dark:text-gray-400 mt-4"
            >
              Since user privacy is our priority, please allow us to verify your details.
            </motion.p>
          </>
        )}
      </motion.div>
    </div>
  );
}
