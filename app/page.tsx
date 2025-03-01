"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { Globe, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import { db } from "@/lib/firebase-cardload";

// InternshipCard component remains mostly unchanged.
function InternshipCard({ internship, activeCardId, setActiveCardId }: { 
  internship: any, 
  activeCardId: string | null, 
  setActiveCardId: (id: string | null) => void 
}) {
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();
  const isDisabled = activeCardId && activeCardId !== internship.id;

  const handleKnowMore = () => {
    if (isDisabled) return;
    if (!activeCardId) setActiveCardId(internship.id);
    setIsClicked(true);
    setTimeout(() => {
      router.push(`/internship/${internship.id}`);
    }, 700);
  };

  const handleApplyNow = () => {
    if (isDisabled) return;
    if (!activeCardId) setActiveCardId(internship.id);
    setIsClicked(true);
    setTimeout(() => {
      router.push(`/internship-apply/${internship.id}`);
    }, 700);
  };

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
            className="w-11/12 h-11/12 bg-white dark:bg-gray-800 text-black dark:text-gray-100 p-5 rounded-lg shadow-xl flex flex-col justify-between items-center relative"
            initial={{ rotate: -45, borderWidth: "0px" }}
            animate={isClicked ? { rotate: 0, borderWidth: "4px", borderColor: "rgba(255,0,150,0.8)" } : { rotate: -45, borderWidth: "0px" }}
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
                onClick={handleKnowMore}
                disabled={isDisabled}
                className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs font-medium"
              >
                Know More
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleApplyNow}
                disabled={isDisabled}
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

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [internships, setInternships] = useState<any[]>([]);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const router = useRouter();

  // Fetch internships from Firestore on mount
  useEffect(() => {
    async function fetchInternships() {
      try {
        const internshipsSnapshot = await getDocs(collection(db, "internships"));
        const internshipsData = internshipsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setInternships(internshipsData);
      } catch (error) {
        console.error("Error fetching internships:", error);
      }
    }
    fetchInternships();
  }, []);

  const filteredInternships = internships.filter(
    (internship) =>
      internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.skills.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recommendedInternships = filteredInternships;

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  return (
    <div className={`${darkMode ? "dark" : ""} overflow-x-hidden`}>
      {/* Navbar & Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <nav className="container mx-auto flex flex-col sm:flex-row justify-between items-center py-6 px-4">
          <div className="flex items-center space-x-3 mb-4 sm:mb-0">
            <Globe className="text-yellow-400" size={32} />
            <h1 className="text-3xl font-extrabold">INTERNS⛵HIP</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            <a href="#" className="hover:text-yellow-400 text-sm sm:text-base">Home</a>
            <a href="/about" className="hover:text-yellow-400 text-sm sm:text-base">About</a>
            <a href="#" className="hover:text-yellow-400 text-sm sm:text-base">Contact</a>
            <Button variant="outline" onClick={() => setDarkMode(!darkMode)} className="p-2">
              {darkMode ? <Sun size={24} className="text-yellow-400" /> : <Moon size={24} className="text-gray-200" />}
            </Button>
          </div>
        </nav>
        <div className="container mx-auto text-center py-12">
          <h2 className="text-5xl font-bold">Find Your Perfect Internship</h2>
          <p className="text-xl mt-4 max-w-3xl mx-auto">
            Discover a secure, lightning-fast, and hassle-free platform connecting top internship providers with aspiring candidates.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button variant="outline" onClick={() => router.push("/register")} className="px-6 py-3 shadow-lg text-lg">
              Register/Publish Internship
            </Button>
            <Button variant="outline" onClick={() => router.push("/talk-to-expert")} className="px-6 py-3 shadow-lg text-lg">
              Talk to Expert
            </Button>
          </div>
        </div>
      </header>

      {/* Platform Highlights Section */}
      <section className="py-12 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Why Choose Us?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="text-2xl font-bold mb-2">Open & Accessible</h3>
              <p className="text-lg">
                Explore internships without any login or sign-up. Our open access ensures opportunities are available to everyone.
              </p>
            </div>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="text-2xl font-bold mb-2">High Security</h3>
              <p className="text-lg">
                With zero user data stored, our platform is built for maximum security and privacy.
              </p>
            </div>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="text-2xl font-bold mb-2">Speed & Performance</h3>
              <p className="text-lg">
                Enjoy lightning-fast load times and seamless navigation for a smooth browsing experience.
              </p>
            </div>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="text-2xl font-bold mb-2">Attractive Design</h3>
              <p className="text-lg">
                Our modern, responsive design ensures an engaging and intuitive UI/UX across all devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <FilterPanel
          selectedFilters={selectedFilters}
          toggleFilter={toggleFilter}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />
      </section>

      {/* Internship Listings */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedInternships.map((internship) => (
            <InternshipCard
              internship={internship}
              key={internship.id}
              activeCardId={activeCardId}
              setActiveCardId={setActiveCardId}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 dark:bg-gray-700 text-center py-6">
        <p className="text-sm">
          © {new Date().getFullYear()} Internship Platform. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
