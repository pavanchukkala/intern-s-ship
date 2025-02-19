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
  const [showFilters, setShowFilters] = useState(true);
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
    <div className={`${darkMode ? "dark" : ""} overflow-x-hidden`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
        
        {/* Navbar */}
        <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-gray-800 dark:to-gray-900 text-white p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center shadow-lg">
          <div className="flex items-center space-x-3 mb-4 sm:mb-0">
            <Globe className="text-yellow-400" size={32} />
            <div className="flex flex-col">
  <h1 className="text-2xl sm:text-3xl font-extrabold">INTERNS⛵SHIP</h1>
  <h4 className="text-2xl sm:text-3xl font-extrabold">Interns' Journey</h4>
</div>

          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            <a href="#" className="hover:text-yellow-400 text-sm sm:text-base">Home</a>
            <a href="#" className="hover:text-yellow-400 text-sm sm:text-base">About</a>
            <a href="#" className="hover:text-yellow-400 text-sm sm:text-base">Contact</a>
            <Button
              variant="outline"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2"
            >
              {darkMode ? <Sun size={24} className="text-yellow-400" /> : <Moon size={24} className="text-gray-200" />}
            </Button>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold">Find Your Perfect Internship</h2>
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                onClick={() => router.push("/register")} 
                className="px-4 py-2 shadow-lg text-sm"
              >
                Register/publish Internship
              </Button>
              <Button 
                variant="outline" 
                onClick={() => router.push("/talk-to-expert")} 
                className="px-4 py-2 shadow-lg text-sm"
              >
                Talk to Expert
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Input
              type="text"
              placeholder="Search for internships..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border rounded-xl text-sm"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={20} />
          </div>

          {/* Filter Toggle */}
          <div className="flex justify-end mb-2">
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="text-xs">
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          {/* Filter Buttons */}
          {showFilters && (
            <div className="mb-4 flex flex-wrap gap-3">
              {FILTERS.map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilters.includes(filter) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter(filter)}
                  className="px-3 py-2 transition-all transform hover:scale-105 hover:bg-indigo-600 hover:text-white rounded-xl shadow-md text-xs"
                >
                  {filter}
                </Button>
              ))}
            </div>
          )}

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
