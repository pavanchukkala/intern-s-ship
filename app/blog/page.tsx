// app/blog/page.tsx
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Link from "next/link";

const posts = [
  {
    title: "How Intern-s-ship helps students land internships faster",
    slug: "how-kegth-helps-students-land-internships",
    date: "2025-10-02",
    excerpt:
      "A practical overview of how Intern-s-ship (kegth) matches students with opportunities, optimizes applications, and accelerates hiring.",
  },
  {
    title: "The student portfolio playbook: show impact, not effort",
    slug: "student-portfolio-playbook",
    date: "2025-10-02",
    excerpt:
      "Exactly what to include in your internship portfolio so recruiters see impact — project selection, README, demos, and measurable results.",
  },
  {
    title: "Zero-to-offer: preparing for internship interviews on Intern-s-hip",
    slug: "zero-to-offer-interview-prep",
    date: "2025-10-03",
    excerpt:
      "A step-by-step interview prep routine tuned for the types of roles listed on Intern-s-ship: product, frontend, data, and design internships.",
  },
  {
    title: "How to network on Intern-s-ship: messages that open doors",
    slug: "networking-on-kegth-messages-that-work",
    date: "2025-10-03",
    excerpt:
      "Exact connection and follow-up templates to use on Intern-s-hip when reaching out to recruiters, mentors, and hiring engineers.",
  },
  {
    title: "Convert internships into career offers: tactical guide for interns",
    slug: "convert-internships-into-offers",
    date: "2025-10-04",
    excerpt:
      "How to create impact during an internship so that your manager has no reason not to convert you to full-time — includes milestone blueprint.",
  },
  {
    title: "Company-side guide: posting internships that attract quality candidates",
    slug: "how-companies-post-internships-on-kegth",
    date: "2025-10-04",
    excerpt:
      "Tips for recruiters and hiring managers on writing clear, attractive internship listings on Intern-s-hip that get better applicants and fewer noise applications.",
  },
];

export default function BlogIndex() {
  return (
    <>
      <NavBar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold mb-2">Intern-s-ship Insights — kegth Blog</h1>
        <p className="text-gray-700 mb-8">
          Actionable guides and industry-tested playbooks to help students find meaningful internships and help companies attract talent.
        </p>

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
