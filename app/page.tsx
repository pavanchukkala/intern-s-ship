"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Filter, Search, Building, Globe, Users, CheckCircle, Sun, Moon } from "lucide-react"
import { useEffect } from "react";

const MyComponent = () => {
  useEffect(() => {
    document.title = "My Custom App";
  }, []);

  return <h1>Welcome to My Custom App!</h1>;
};

export default MyComponent;

const FILTERS = [
  "Paid", "Free", "Stipend-based", "Hourly Pay", "Project-based", "Short-term", "Long-term",
  "Remote", "On-site", "Hybrid", "Part-time", "Full-time", "Technical", "Non-Technical",
  "Internship Duration", "Company Size", "Industry Sector", "Experience Level", "Startup", "MNC"
]

const internships = [
  { id: 1, company: "TechCorp", role: "Software Engineer", location: "Remote", stipend: "$1000/month", duration: "6 months", skills: "React, Node.js, Python", logo: "/logos/techcorp.png" },
  { id: 2, company: "InnovateX", role: "Data Analyst", location: "On-site", stipend: "$800/month", duration: "3 months", skills: "SQL, Tableau, Python", logo: "/logos/innovatex.png" },
  { id: 3, company: "DevSolutions", role: "Frontend Developer", location: "Hybrid", stipend: "$1200/month", duration: "5 months", skills: "HTML, CSS, JavaScript, React", logo: "/logos/devsolutions.png" },
  { id: 4, company: "FinTech Ltd.", role: "Backend Developer", location: "Remote", stipend: "$900/month", duration: "4 months", skills: "Node.js, Express, MongoDB", logo: "/logos/fintech.png" },
  { id: 5, company: "CyberSec Inc.", role: "Cybersecurity Analyst", location: "On-site", stipend: "$1100/month", duration: "6 months", skills: "Kali Linux, Pen Testing, Python", logo: "/logos/cybersec.png" },
]

export default function InternshipPlatform() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [darkMode, setDarkMode] = useState(false)

  const filteredInternships = internships.filter(
    (internship) =>
      internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.skills.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
        <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-gray-800 dark:to-gray-900 text-white p-6 flex justify-between items-center shadow-lg">
          <div className="flex items-center space-x-3">
            <Globe className="text-yellow-400" size={32} />
            <h1 className="text-3xl font-extrabold tracking-wide">Interns' Journey: From Learning to Earning</h1>
          </div>
          <div className="flex items-center space-x-6 text-lg font-medium">
            <a href="#" className="hover:text-yellow-400 transition-colors duration-300">Home</a>
            <a href="#" className="hover:text-yellow-400 transition-colors duration-300">About</a>
            <a href="#" className="hover:text-yellow-400 transition-colors duration-300">Contact</a>
            <Button variant="outline" onClick={() => setDarkMode(!darkMode)} className="p-2">
              {darkMode ? <Sun size={24} className="text-yellow-400" /> : <Moon size={24} className="text-gray-200" />}
            </Button>
          </div>
        </nav>

        <main className="container mx-auto p-8 flex-1">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200">Find Your Perfect Internship</h2>
            <Button variant="outline" className="flex items-center gap-2 text-lg px-4 py-2 shadow-md hover:shadow-lg">
              <Filter size={24} /> Filters
            </Button>
          </div>

          <div className="relative mb-8">
            <Input
              type="text"
              placeholder="Search for internships..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 w-full shadow-lg border border-gray-300 dark:border-gray-700 rounded-xl focus:ring focus:ring-indigo-400 text-lg"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={24} />
          </div>

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInternships.map((internship) => (
              <Card key={internship.id} className="hover:shadow-2xl transition-shadow border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <img src={internship.logo} alt={internship.company} className="w-12 h-12 object-contain" />
                    <h3 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">{internship.role}</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2"><Building size={18} className="text-gray-500 dark:text-gray-400" /> {internship.company}</p>
                  <p className="text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2"><Globe size={18} className="text-gray-500 dark:text-gray-400" /> {internship.location}</p>
                  <p className="text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2"><Users size={18} className="text-gray-500 dark:text-gray-400" /> {internship.duration}</p>
                  <p className="text-green-600 dark:text-green-400 font-semibold text-lg flex items-center gap-2"><CheckCircle size={20} className="text-green-500 dark:text-green-400" /> {internship.stipend}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">Skills: {internship.skills}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>

        <footer className="bg-gray-900 text-white text-center p-6 mt-8">
          <p className="text-lg">&copy; {new Date().getFullYear()} Interns' Journey. All Rights Reserved.</p>
          <p className="text-gray-400 text-md mt-2">Privacy Policy | Terms of Service | Contact Us</p>
        </footer>
      </div>
    </div>
  )
}
