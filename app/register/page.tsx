"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <div className="bg-white dark:bg-gray-800 p-8 shadow-lg rounded-lg w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold mb-6 text-indigo-600 dark:text-yellow-400">Register an Internship</h2>
        {submitted ? (
          <p className="text-lg font-medium text-green-600 dark:text-green-400">
            Thank you! We have received your response. Our team will contact you soon.
          </p>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input name="organization" placeholder="Organization Name" onChange={handleChange} required className="p-3 border rounded-xl" />
              <Input name="applicantName" placeholder="Applicant Name" onChange={handleChange} required className="p-3 border rounded-xl" />
              <Input name="designation" placeholder="Designation" onChange={handleChange} required className="p-3 border rounded-xl" />
              <Input name="mobile" type="tel" placeholder="Mobile Number" onChange={handleChange} required className="p-3 border rounded-xl" />
              <Input name="email" type="email" placeholder="Email" onChange={handleChange} required className="p-3 border rounded-xl" />
              <Button type="submit" className="w-full bg-indigo-600 dark:bg-yellow-400 hover:bg-indigo-700 dark:hover:bg-yellow-500 text-white dark:text-gray-900 p-3 rounded-xl shadow-md">Submit</Button>
            </form>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">Since user privacy is our priority, please allow us to verify your details.</p>
          </>
        )}
      </div>
    </div>
  );
}
