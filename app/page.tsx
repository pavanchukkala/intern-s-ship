"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Globe, Sun, Moon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const internships = [
  { id: 1, company: "TechCorp", role: "Software Engineer", location: "Remote", stipend: "$1000/month", duration: "6 months", skills: "React, Node.js, Python", logo: "/logos/techcorp.png" },
  { id: 2, company: "InnovateX", role: "Data Analyst", location: "On-site", stipend: "$800/month", duration: "3 months", skills: "SQL, Tableau, Python", logo: "/logos/innovatex.png" }
];

export default function InternshipPlatform() {
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  const filteredInternships = internships.filter(
    (internship) =>
      internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
        
        {/* Navbar */}
        <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-gray-800 dark:to-gray-900 text-white p-6 flex justify-between items-center shadow-lg">
          <div className="flex items-center space-x-3">
            <Globe className="text-yellow-400" size={32} />
            <h1 className="text-3xl font-extrabold">Interns' Journey</h1>
          </div>
          <Button variant="outline" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun size={24} className="text-yellow-400" /> : <Moon size={24} className="text-gray-200" />}
          </Button>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto p-8 flex-1">
          <div className="mb-8">
            <h2 className="text-4xl font-bold">Find Your Perfect Internship</h2>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Input
              type="text"
              placeholder="Search for internships..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 w-full border rounded-xl"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2" size={24} />
          </div>

          {/* Internship Listings as Interactive List */}
          <div className="space-y-6">
            {filteredInternships.map((internship) => (
              <div key={internship.id} className="flex items-center justify-between p-6 border rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer">
                <div className="flex items-center space-x-4">
                  <img src={internship.logo} alt={internship.company} className="w-16 h-16 object-contain rounded-full border" />
                  <div>
                    <h3 className="text-xl font-semibold">{internship.role}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{internship.company}</p>
                    <p className="text-sm">{internship.location} • {internship.duration}</p>
                  </div>
                </div>
                <p className="font-semibold text-blue-600 dark:text-blue-400">{internship.stipend}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
