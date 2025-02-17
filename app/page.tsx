"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Globe, Sun, Moon, Search, Heart, Clock, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const internships = [
  { id: 1, company: "TechCorp", role: "Software Engineer", location: "Remote", stipend: "$1000/month", duration: "6 months", skills: "React, Node.js, Python", logo: "/logos/techcorp.png", hot: true },
  { id: 2, company: "InnovateX", role: "Data Analyst", location: "On-site", stipend: "$800/month", duration: "3 months", skills: "SQL, Tableau, Python", logo: "/logos/innovatex.png", closingSoon: true }
];

export default function InternshipPlatform() {
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const router = useRouter();

  const filteredInternships = internships.filter(
    (internship) =>
      internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

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

          {/* Internship Listings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredInternships.map((internship) => (
              <Card key={internship.id} className="p-6 rounded-xl shadow-md hover:shadow-2xl transition-all relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
                <img src={internship.logo} alt={internship.company} className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-semibold">{internship.role}</h3>
                <p className="text-gray-600 dark:text-gray-400">{internship.company}</p>
                <div className="flex items-center text-sm gap-2 mt-2">
                  <Briefcase size={16} /> <span>{internship.location}</span>
                </div>
                <div className="flex items-center text-sm gap-2 mt-1">
                  <Clock size={16} /> <span>{internship.duration}</span>
                </div>
                <p className="text-sm font-medium mt-2">{internship.stipend}</p>
                
                {/* Wishlist & Tags */}
                <button
                  className={`absolute top-4 right-4 ${wishlist.includes(internship.id) ? "text-red-500" : "text-gray-400"}`}
                  onClick={() => toggleWishlist(internship.id)}
                >
                  <Heart size={20} />
                </button>
                {internship.hot && <span className="absolute top-4 left-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full">Hot</span>}
                {internship.closingSoon && <span className="absolute bottom-4 right-4 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">Closing Soon</span>}
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
