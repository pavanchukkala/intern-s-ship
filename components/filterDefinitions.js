// /components/filterDefinitions.js
export const FILTER_CATEGORIES = [
  {
    title: "Payment & Stipend",
    filters: [
      { label: "Paid", value: "paid" },
      { label: "Free", value: "free" },
      { 
        label: "Stipend-based", 
        value: "stipend-based",
        subFilters: [
          { label: "$0 - $500", value: "$0 - $500" },
          { label: "$500 - $1000", value: "$500 - $1000" },
          { label: "$1000+", value: "$1000+" },
        ],
      },
      { label: "Hourly Pay", value: "hourly pay" },
      { label: "Project-based", value: "project-based" },
    ],
  },
  {
    title: "Duration",
    filters: [
      { 
        label: "Internship Duration", 
        value: "internship duration",
        subFilters: [
          { label: "Less than 3 months", value: "less than 3 months" },
          { label: "3 to 6 months", value: "3 to 6 months" },
          { label: "6+ months", value: "6+ months" },
        ],
      },
      { label: "Short-term", value: "short-term" },
      { label: "Long-term", value: "long-term" },
    ],
  },
  {
    title: "Location",
    filters: [
      { label: "Remote", value: "remote" },
      { label: "On-site", value: "on-site" },
      { label: "Hybrid", value: "hybrid" },
    ],
  },
  {
    title: "Job Type",
    filters: [
      { label: "Part-time", value: "part-time" },
      { label: "Full-time", value: "full-time" },
    ],
  },
  {
    title: "Technical",
    filters: [
      { label: "Technical", value: "technical" },
      { label: "Non-Technical", value: "non-technical" },
    ],
  },
  {
    title: "Company",
    filters: [
      { label: "Startup", value: "company type: startup" },
      { label: "MNC", value: "company type: mnc" },
      { label: "Small", value: "company size: small" },
      { label: "Medium", value: "company size: medium" },
      { label: "Large", value: "company size: large" },
    ],
  },
  {
    title: "Industry Sector",
    filters: [
      { label: "Software", value: "industry sector: software" },
      { label: "Finance", value: "industry sector: finance" },
      { label: "Healthcare", value: "industry sector: healthcare" },
      { label: "Education", value: "industry sector: education" },
    ],
  },
  {
    title: "Experience Level",
    filters: [
      { label: "Entry", value: "experience level: entry" },
      { label: "Mid", value: "experience level: mid" },
      { label: "Senior", value: "experience level: senior" },
    ],
  },
  {
    title: "Additional",
    filters: [
      { label: "Visa Sponsored", value: "visa sponsored" },
      { label: "Accommodation Provided", value: "accommodation provided" },
      { label: "Flexible Hours", value: "flexible hours" },
      { label: "University Program", value: "university program" },
      { label: "International", value: "international" },
      { label: "High Growth", value: "high growth" },
    ],
  },
];
