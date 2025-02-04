import { useState } from "react"
import "./App.css"

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

function App() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState([])

  const filteredInternships = internships.filter(
    (internship) =>
      internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.skills.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleFilter = (filter) => {
    setSelectedFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-brand">
          <span className="navbar-icon">🌐</span>
          <h1>Interns' Journey: From Learning to Earning</h1>
        </div>
        <div className="navbar-links">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
      </nav>

      <main className="main-content">
        <div className="header">
          <h2>Find Your Perfect Internship</h2>
          <button className="filter-button">
            <span className="filter-icon">⚙️</span>
            Filters
          </button>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for internships..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="filters">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              className={`filter-tag ${selectedFilters.includes(filter) ? "active" : ""}`}
              onClick={() => toggleFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="internship-grid">
          {filteredInternships.map((internship) => (
            <div key={internship.id} className="internship-card">
              <h3>{internship.role}</h3>
              <p className="company">{internship.company}</p>
              <div className="internship-details">
                <span>📍 {internship.location}</span>
                <span>⏱️ {internship.duration}</span>
              </div>
              <p className="stipend">{internship.stipend}</p>
              <p className="skills">Skills: {internship.skills}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default App

