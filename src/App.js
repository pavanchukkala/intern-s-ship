import { useState } from "react";

const FILTERS = {
  Type: ["Paid", "Free", "Stipend-based", "Hourly Pay", "Project-based"],
  Duration: ["Short-term", "Long-term"],
  WorkMode: ["Remote", "On-site", "Hybrid"],
  EmploymentType: ["Part-time", "Full-time"],
  Category: ["Technical", "Non-Technical"],
  CompanyType: ["Startup", "MNC"],
};

const internships = [
  { id: 1, company: "TechCorp", role: "Software Engineer", location: "Remote", stipend: "$1000/month", duration: "6 months", category: "Technical" },
  { id: 2, company: "InnovateX", role: "Data Analyst", location: "On-site", stipend: "$800/month", duration: "3 months", category: "Technical" },
  { id: 3, company: "DevSolutions", role: "Frontend Developer", location: "Hybrid", stipend: "$1200/month", duration: "5 months", category: "Technical" },
  { id: 4, company: "FinTech Ltd.", role: "Backend Developer", location: "Remote", stipend: "$900/month", duration: "4 months", category: "Technical" },
  { id: 5, company: "CyberSec Inc.", role: "Cybersecurity Analyst", location: "On-site", stipend: "$1100/month", duration: "6 months", category: "Technical" }
];

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({});

  const toggleFilter = (category, filter) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category]?.includes(filter)
        ? prev[category].filter((item) => item !== filter)
        : [...(prev[category] || []), filter],
    }));
  };

  const clearFilters = () => setSelectedFilters({});

  const filteredInternships = internships.filter((internship) => {
    const matchesSearch =
      internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.role.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilters = Object.entries(selectedFilters).every(([category, selectedValues]) =>
      selectedValues.length === 0 || selectedValues.includes(internship[category.toLowerCase()])
    );

    return matchesSearch && matchesFilters;
  });

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
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for internships..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="filters">
          {Object.entries(FILTERS).map(([category, options]) => (
            <div key={category} className="filter-category">
              <h4>{category}</h4>
              <div className="filter-options">
                {options.map((option) => (
                  <label key={option} className="filter-option">
                    <input
                      type="checkbox"
                      checked={selectedFilters[category]?.includes(option) || false}
                      onChange={() => toggleFilter(category, option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button className="clear-filters" onClick={clearFilters}>Clear Filters</button>
        </div>

        <div className="internship-grid">
          {filteredInternships.length > 0 ? (
            filteredInternships.map((internship) => (
              <div key={internship.id} className="internship-card">
                <h3>{internship.role}</h3>
                <p className="company">{internship.company}</p>
                <div className="internship-details">
                  <span>📍 {internship.location}</span>
                  <span>⏱️ {internship.duration}</span>
                </div>
                <p className="stipend">{internship.stipend}</p>
              </div>
            ))
          ) : (
            <p className="no-results">No internships found.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
