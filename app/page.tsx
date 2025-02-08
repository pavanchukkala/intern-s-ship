"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Filter, Search, Building, Globe, Users, CheckCircle, Sun, Moon } from "lucide-react"

const FILTERS = [
  "Paid", "Free", "Stipend-based", "Hourly Pay", "Project-based", "Short-term", "Long-term",
  "Remote", "On-site", "Hybrid", "Part-time", "Full-time", "Technical", "Non-Technical",
  "Internship Duration", "Company Size", "Industry Sector", "Experience Level", "Startup", "MNC"
]

const internships = [
  { id: 1, company: "TechCorp", role: "Software Engineer", location: "Remote", stipend: "$1000/month", duration: "6 months", skills: "React, Node.js, Python", logo: "https://via.placeholder.com/50" },
  { id: 2, company: "InnovateX", role: "Data Analyst", location: "On-site", stipend: "$800/month", duration: "3 months", skills: "SQL, Tableau, Python", logo: "https://via.placeholder.com/50" },
  { id: 3, company: "DevSolutions", role: "Frontend Developer", location: "Hybrid", stipend: "$1200/month", duration: "5 months", skills: "HTML, CSS, JavaScript, React", logo: "https://via.placeholder.com/50" },
  { id: 4, company: "FinTech Ltd.", role: "Backend Developer", location: "Remote", stipend: "$900/month", duration: "4 months", skills: "Node.js, Express, MongoDB", logo: "https://via.placeholder.com/50" },
  { id: 5, company: "CyberSec Inc.", role: "Cybersecurity Analyst", location: "On-site", stipend: "$1100/month", duration: "6 months", skills: "Kali Linux, Pen Testing, Python", logo: "https://via.placeholder.com/50" },
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
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} flex flex-col`}>
      <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex justify-between items-center shadow-lg">
        <div className="flex items-center space-x-3">
          <Globe className="text-yellow-400" size={32} />
          <h1 className="text-3xl font-extrabold tracking-wide">Interns' Journey: From Learning to Earning</h1>
        </div>
        <div className="flex items-center space-x-6 text-lg font-medium">
          <a href="#" className="hover:text-yellow-400 transition-colors duration-300">Home</a>
          <a href="#" className="hover:text-yellow-400 transition-colors duration-300">About</a>
          <a href="#" className="hover:text-yellow-400 transition-colors duration-300">Contact</a>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-white text-black hover:bg-gray-300 transition">
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </nav>

      <main className="container mx-auto p-8 flex-1">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold">Find Your Perfect Internship</h2>
        </div>

        <div className="relative mb-8">
          <Input
            type="text"
            placeholder="Search for internships..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 py-3 w-full shadow-lg border border-gray-300 rounded-xl focus:ring focus:ring-indigo-400 text-lg"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={24} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredInternships.map((internship) => (
            <Card key={internship.id} className="hover:shadow-2xl transition-shadow border border-gray-200 rounded-xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-3">
                  <img src={internship.logo} alt={internship.company} className="w-10 h-10 rounded-full" />
                  <h3 className="text-2xl font-bold text-indigo-700">{internship.role}</h3>
                </div>
                <p className="text-gray-700 mb-3 flex items-center gap-2"><Building size={18} className="text-gray-500" /> {internship.company}</p>
                <p className="text-gray-700 mb-3 flex items-center gap-2"><Globe size={18} className="text-gray-500" /> {internship.location}</p>
                <p className="text-gray-700 mb-3 flex items-center gap-2"><Users size={18} className="text-gray-500" /> {internship.duration}</p>
                <p className="text-green-600 font-semibold text-lg flex items-center gap-2"><CheckCircle size={20} className="text-green-500" /> {internship.stipend}</p>
                <p className="text-sm text-gray-500 mt-4">Skills: {internship.skills}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
