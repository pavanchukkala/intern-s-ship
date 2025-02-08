"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Filter, Search, Building, Globe, Users } from "lucide-react"

const FILTERS = [
  "Paid",
  "Free",
  "Stipend-based",
  "Hourly Pay",
  "Project-based",
  "Short-term",
  "Long-term",
  "Remote",
  "On-site",
  "Hybrid",
  "Part-time",
  "Full-time",
  "Technical",
  "Non-Technical",
  "Internship Duration",
  "Company Size",
  "Industry Sector",
  "Experience Level",
  "Startup",
  "MNC",
]

const internships = [
  {
    id: 1,
    company: "TechCorp",
    role: "Software Engineer",
    location: "Remote",
    stipend: "$1000/month",
    duration: "6 months",
    skills: "React, Node.js, Python",
  },
  {
    id: 2,
    company: "InnovateX",
    role: "Data Analyst",
    location: "On-site",
    stipend: "$800/month",
    duration: "3 months",
    skills: "SQL, Tableau, Python",
  },
  {
    id: 3,
    company: "DevSolutions",
    role: "Frontend Developer",
    location: "Hybrid",
    stipend: "$1200/month",
    duration: "5 months",
    skills: "HTML, CSS, JavaScript, React",
  },
  {
    id: 4,
    company: "FinTech Ltd.",
    role: "Backend Developer",
    location: "Remote",
    stipend: "$900/month",
    duration: "4 months",
    skills: "Node.js, Express, MongoDB",
  },
  {
    id: 5,
    company: "CyberSec Inc.",
    role: "Cybersecurity Analyst",
    location: "On-site",
    stipend: "$1100/month",
    duration: "6 months",
    skills: "Kali Linux, Pen Testing, Python",
  },
]

export default function InternshipPlatform() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const filteredInternships = internships.filter(
    (internship) =>
      internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.skills.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-3">
          <Globe className="text-yellow-400" size={28} />
          <h1 className="text-2xl font-bold">Interns' Journey: From Learning to Earning</h1>
        </div>
        <div className="space-x-6">
          <a href="#" className="hover:text-yellow-400 transition-colors">
            Home
          </a>
          <a href="#" className="hover:text-yellow-400 transition-colors">
            About
          </a>
          <a href="#" className="hover:text-yellow-400 transition-colors">
            Contact
          </a>
        </div>
      </nav>

      <main className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Find Your Perfect Internship</h2>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={20} />
            Filters
          </Button>
        </div>

        <div className="relative mb-6">
          <Input
            type="text"
            placeholder="Search for internships..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <Button
              key={filter}
              variant={selectedFilters.includes(filter) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleFilter(filter)}
              className="text-sm"
            >
              {filter}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInternships.map((internship) => (
            <Card key={internship.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{internship.role}</h3>
                <p className="text-gray-600 mb-4">{internship.company}</p>
                <div className="flex items-center gap-2 mb-2">
                  <Building size={16} className="text-gray-400" />
                  <span>{internship.location}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Users size={16} className="text-gray-400" />
                  <span>{internship.duration}</span>
                </div>
                <p className="text-green-600 font-semibold mb-4">{internship.stipend}</p>
                <p className="text-sm text-gray-500">Skills: {internship.skills}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
