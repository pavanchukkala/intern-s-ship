import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, Search, Building, Globe, Users } from "lucide-react";

const FILTERS: string[] = [
  "Paid", "Free", "Stipend-based", "Hourly Pay", "Project-based", "Short-term", "Long-term", 
  "Remote", "On-site", "Hybrid", "Part-time", "Full-time", "Technical", "Non-Technical", 
  "Internship Duration", "Company Size", "Industry Sector", "Experience Level", "Startup", "MNC"
];

type Internship = {
  id: number;
  company: string;
  role: string;
  location: string;
  stipend: string;
  duration: string;
  skills: string;
};

const internships: Internship[] = [
  { id: 1, company: "TechCorp", role: "Software Engineer", location: "Remote", stipend: "$1000/month", duration: "6 months", skills: "React, Node.js, Python" },
  { id: 2, company: "InnovateX", role: "Data Analyst", location: "On-site", stipend: "$800/month", duration: "3 months", skills: "SQL, Tableau, Python" },
  { id: 3, company: "DevSolutions", role: "Frontend Developer", location: "Hybrid", stipend: "$1200/month", duration: "5 months", skills: "HTML, CSS, JavaScript, React" },
  { id: 4, company: "FinTech Ltd.", role: "Backend Developer", location: "Remote", stipend: "$900/month", duration: "4 months", skills: "Node.js, Express, MongoDB" },
  { id: 5, company: "CyberSec Inc.", role: "Cybersecurity Analyst", location: "On-site", stipend: "$1100/month", duration: "6 months", skills: "Kali Linux, Pen Testing, Python" }
];

export default function InternshipPlatform(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>("");
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-3">
          <Globe className="text-yellow-400" size={28} />
          <h1 className="text-2xl font-bold">Interns' Journey: From Learning to Earning</h1>
        </div>
        <div className="space-x-6">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">About Us</a>
          <a href="#" className="hover:underline">FAQs</a>
          <a href="#" className="hover:underline">Contact Us</a>
        </div>
      </nav>

      {/* Search Bar */}
      <div className="flex justify-center mt-6">
        <div className="relative w-2/3">
          <Search className="absolute left-3 top-2.5 text-gray-500" />
          <Input
            type="text"
            placeholder="Search by role, skills, location..."
            className="pl-10 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex justify-center mt-4 gap-4 flex-wrap bg-white p-4 shadow-md rounded-lg">
        {FILTERS.map((filter) => (
          <div key={filter} className="flex items-center bg-gray-200 px-3 py-2 rounded-lg shadow-sm hover:bg-gray-300 transition-all">
            <Checkbox id={filter} />
            <label htmlFor={filter} className="text-gray-700 ml-2 text-sm font-medium">
              {filter}
            </label>
          </div>
        ))}
      </div>

      {/* Internship Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {internships.map(({ id, company, role, location, stipend, duration, skills }) => (
          <Card key={id} className="p-6 shadow-lg bg-white rounded-lg hover:shadow-xl transition-all border border-gray-200">
            <CardContent>
              <div className="flex items-center space-x-3">
                <Building className="text-indigo-500" />
                <h2 className="text-xl font-semibold text-gray-800">{company}</h2>
              </div>
              <p className="text-gray-600 mt-2 text-sm"><strong>Role:</strong> {role}</p>
              <p className="text-gray-600 text-sm"><strong>Location:</strong> {location}</p>
              <p className="text-gray-600 text-sm"><strong>Stipend:</strong> {stipend}</p>
              <p className="text-gray-600 text-sm"><strong>Duration:</strong> {duration}</p>
              <p className="text-gray-600 text-sm"><strong>Skills:</strong> {skills}</p>
              <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-6 text-center mt-6 flex flex-col gap-2">
        <p>&copy; 2025 Interns' Journey. All rights reserved.</p>
        <div className="flex justify-center gap-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <span>|</span>
          <a href="#" className="hover:underline">Terms of Service</a>
        </div>
        <p className="text-gray-400 text-sm">Connecting ambitious learners with endless opportunities.</p>
      </footer>
    </div>
  );
}
