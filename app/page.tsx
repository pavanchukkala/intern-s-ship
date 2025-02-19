"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Globe, Sun, Moon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const FILTERS = [
  "Paid", "Free", "Stipend-based", "Hourly Pay", "Project-based", "Short-term", "Long-term",
  "Remote", "On-site", "Hybrid", "Part-time", "Full-time", "Technical", "Non-Technical",
  "Internship Duration", "Company Size", "Industry Sector", "Experience Level", "Startup", "MNC"
];

const internships = [
  { 
    id: 1, 
    company: "TechCorp", 
    role: "Software Engineer", 
    location: "Remote", 
    stipend: "$1000/month", 
    duration: "6 months", 
    skills: "React, Node.js, Python", 
    logo: "/logos/techcorp.png" 
  },
  { 
    id: 2, 
    company: "InnovateX", 
    role: "Data Analyst", 
    location: "On-site", 
    stipend: "$800/month", 
    duration: "3 months", 
    skills: "SQL, Tableau, Python", 
    logo: "/logos/innovatex.png" 
  }
];

function InternshipCard({ internship }) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="flex justify-center items-center p-4">
      <div className="relative w-full aspect-square flex justify-center items-center">
        <motion.div
          className="absolute w-11/12 h-11/12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex justify-center items-center shadow-2xl"
          initial={{ rotate: 45, filter: "blur(0px)" }}
          animate={isClicked ? { rotate: 0, filter: "blur(8px)" } : { rotate: 45, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <motion.div
            className="w-11/12 h-11/12 bg-white text-black p-5 rounded-lg shadow-xl flex flex-col justify-between items-center relative"
            initial={{ rotate: -45, borderWidth: "0px" }}
            animate={
              isClicked
                ? { rotate: 0, borderWidth: "4px", borderColor: "rgba(255,0,150,0.8)" }
                : { rotate: -45, borderWidth: "0px" }
            }
            transition={{ duration: 0.7, ease: "easeInOut" }}
            whileHover={!isClicked ? { scale: 1.05 } : {}}
          >
            {isClicked && (
              <motion.div
                className="absolute inset-0 rounded-lg"
                initial={{ opacity: 0, borderWidth: "0px" }}
                animate={{ opacity: 1, borderWidth: "4px" }}
                transition={{ duration: 0.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                style={{
                  borderStyle: "solid",
                  borderImage: "linear-gradient(90deg, #ff007f, #00ff7f, #007fff) 1",
                }}
              />
            )}

            <div className="text-center">
              <img src={internship.logo} alt={internship.company} className="h-10 w-10 mb-2 inline-block" />
              <h2 className="text-xl font-bold">{internship.role}</h2>
              <p className="text-sm">{internship.company} | {internship.location}</p>
              <p className="text-xs text-gray-500">{internship.duration} | {internship.stipend}</p>
              <p className="text-xs text-gray-500">Skills: {internship.skills}</p>
            </div>

            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsClicked(true)}
                className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs font-medium"
              >
                Know More
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsClicked(true)}
                className="bg-green-500 text-white px-2 py-1 rounded-md text-xs font-medium"
              >
                Apply Now
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default function InternshipPlatform() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  const filteredInternships = internships.filter(
    (internship) =>
      internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.skills.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
        
        {/* Navbar */}
        <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-gray-800 dark:to-gray-900 text-white p-6 flex flex-wrap justify-between items-center shadow-lg">
          <div className="flex items-center space-x-3">
            <Globe className="text-yellow-400" size={32} />
            <h1 className="text-3xl font-extrabold">Interns' Journey</h1>
          </div>
          <div className="flex items-center space-x-3 md:space-x-6 flex-wrap">
            <a href="#" className="hover:text-yellow-400">Home</a>
            <a href="#" className="hover:text-yellow-400">About</a>
            <a href="#" className="hover:text-yellow-400">Contact</a>
            <Button
              variant="outline"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 mt-2 md:mt-0"
            >
              {darkMode ? <Sun size={24} className="text-yellow-400" /> : <Moon size={24} className="text-gray-200" />}
            </Button>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto p-8 flex-1">
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <h2 className="text-4xl font-bold">Find Your Perfect Internship</h2>
            <Button variant="outline" onClick={() => router.push("/register")} className="px-6 py-3 shadow-lg">
              Register Internship
            </Button>
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

          {/* Filter Buttons */}
          <div className="mb-8 flex flex-wrap gap-3">
            {FILTERS.map((filter) => (
              <Button
                key={filter}
                variant={selectedFilters.includes(filter) ? "default" : "outline"}
                size="lg"
                onClick={() => toggleFilter(filter)}
                className="text-md px-5 py-3 transition-all transform hover:scale-110 hover:bg-indigo-600 hover:text-white rounded-xl shadow-md font-medium"
              >
                {filter}
              </Button>
            ))}
          </div>

          {/* Internship Listings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredInternships.map((internship) => (
              <InternshipCard internship={internship} key={internship.id} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
