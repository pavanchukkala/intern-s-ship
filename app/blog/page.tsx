// app/blog/page.tsx
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Link from "next/link";

const posts = [
  {
    title: "How to prepare for internships (step-by-step)",
    slug: "how-to-prepare-for-internships",
    date: "2025-10-01",
    excerpt:
      "Practical step-by-step guide to find, apply for, and succeed in internships — covering portfolio, resume, interviews and follow-ups.",
  },
  {
    title: "Top paid internships in 2025 for students",
    slug: "top-paid-internships-2025",
    date: "2025-10-01",
    excerpt:
      "Curated list of high-paying internships in 2025 with stipend ranges, tips to get shortlisted, and application strategies.",
  },
  {
    title: "Resume guide for students: land your first internship",
    slug: "resume-guide-for-students",
    date: "2025-10-01",
    excerpt:
      "One-page resume templates and practical dos/don'ts for students applying to internships with examples.",
  },
  {
    title: "Ace internship interviews: 10 practical techniques",
    slug: "ace-internship-interviews",
    date: "2025-10-02",
    excerpt:
      "A tactical list of interview techniques and preparation routines that make a candidate stand out during internship interviews.",
  },
  {
    title: "Build a simple internship portfolio with GitHub (step-by-step)",
    slug: "build-internship-portfolio-github",
    date: "2025-10-02",
    excerpt:
      "How to create a focused GitHub portfolio project that demonstrates the skills recruiters care about — with deploy steps.",
  },
  {
    title: "Networking for internships: messages that actually work",
    slug: "networking-messages-for-internships",
    date: "2025-10-02",
    excerpt:
      "Exact LinkedIn and email message templates, timing, and follow-up strategy to connect with recruiters and engineers.",
  },
];

export default function BlogIndex() {
  return (
    <>
      <NavBar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold mb-2">kegth Blog</h1>
        <p className="text-gray-700 mb-8">Guides, internship tips and career resources curated for students.</p>

        <ul className="space-y-8">
          {posts.map((p) => (
            <li key={p.slug} className="border-b pb-6">
              <Link href={`/blog/${p.slug}`}>
                <a className="text-2xl font-semibold text-sky-700 hover:underline">{p.title}</a>
              </Link>
              <div className="text-sm text-gray-500 mt-1">{p.date}</div>
              <p className="mt-3 text-gray-700">{p.excerpt}</p>
              <div className="mt-3">
                <Link href={`/blog/${p.slug}`}>
                  <a className="text-sky-700 font-medium">Read more →</a>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
