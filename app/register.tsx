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
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Since user privacy is our priority, please allow us to verify your details.");
    router.push("/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <form className="bg-white dark:bg-gray-800 p-8 shadow-lg rounded-lg w-full max-w-lg" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6">Register an Internship</h2>
        <Input name="organization" placeholder="Organization Name" onChange={handleChange} required className="mb-4" />
        <Input name="applicantName" placeholder="Applicant Name" onChange={handleChange} required className="mb-4" />
        <Input name="designation" placeholder="Designation" onChange={handleChange} required className="mb-4" />
        <Input name="mobile" type="tel" placeholder="Mobile Number" onChange={handleChange} required className="mb-4" />
        <Input name="email" type="email" placeholder="Email" onChange={handleChange} required className="mb-4" />
        <Button type="submit" className="w-full">Submit</Button>
      </form>
    </div>
  );
}
