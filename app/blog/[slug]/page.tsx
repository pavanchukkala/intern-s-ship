// app/blog/[slug]/page.tsx
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import Link from "next/link";

type Post = { title: string; date: string; description: string; content: string };

const POSTS: Record<string, Post> = {
  "how-kegth-helps-students-land-internships": {
    title: "How Intern-s-ship helps students land internships faster",
    date: "2025-10-02",
    description:
      "How our platform matches students with the right roles, improves application quality, and shortens time-to-offer.",
    content: `
<h2>Overview</h2>
<p>Intern-s-hip (kegth) is built around one simple idea: remove friction between talent and opportunity. Instead of scrolling scattered listings, students get curated matches, application templates, and feedback loops that meaningfully improve their chances.</p>

<h2>Smart matching, not blind applying</h2>
<p>Our matching engine weights role requirements, project experience, and student intent. Instead of applying to every posting, focus on high-quality matches where you meet 60–80% of requirements — we'll surface those first. This saves time and increases conversion rates.</p>

<h2>Application templates tuned to roles</h2>
<p>For each internship listing we provide a role-specific template: a short pitch, top 3 skills, and a one-line impact statement. Recruiters read a lot of applications — a concise, targeted message increases the odds of being shortlisted.</p>

<h2>Structured practice & interview cues</h2>
<p>Once you apply, Intern-s-hip surfaces suggested practice resources and likely interview topics (e.g., React fundamentals for frontend roles, SQL patterns for data roles). Practicing these focused topics yields better interview performance than unfocused study.</p>

<h2>Feedback and iteration</h2>
<p>When an application is rejected, we encourage structured feedback: anonymous recruiter signals (if provided) and automated tips to improve resumes and project READMEs. Iterating using real signals is the fastest way to improve application outcomes.</p>

<h2>Final note</h2>
<p>In short: quality over quantity. Intern-s-hip reduces wasted effort, surfaces the right roles, and helps students present evidence of impact — that's how we accelerate internships into offers.</p>
`,
  },

  "student-portfolio-playbook": {
    title: "The student portfolio playbook: show impact, not effort",
    date: "2025-10-02",
    description:
      "What to include in a portfolio so hiring teams on Intern-s-hip immediately understand impact and fit.",
    content: `
<h2>Why portfolios matter</h2>
<p>A portfolio is the fastest way to show you can ship. Recruiters judge by results — a deployed demo, a clear README, and a small metric or observation communicate competence much faster than a long resume bullet.</p>

<h2>Choose project topics that map to roles</h2>
<p>Pick 1–2 projects that align with the internships you want: a mini-dashboard for data roles, a single-page interactive app for frontend roles, or a product spec + prototype for product design internships. Focus matters.</p>

<h2>README: the one-minute sell</h2>
<p>Your README should answer: what it does, why you built it, tech used, and one measurable outcome or test. Include a 30-second screenshot, a live link, and clear setup instructions. The goal: a recruiter should understand the project in under a minute.</p>

<h2>Use issues/commits to show process</h2>
<p>Small teams and projects love to see process. A few meaningful commits, a short issue describing a problem you solved, or a tiny test-suite gives evidence you think like an engineer — not just a copy-paster.</p>

<h2>Deploy a small demo</h2>
<p>Deploy to Vercel/Netlify and link it. A live demo removes friction for reviewers and increases interview invites.</p>

<h2>Conclusion</h2>
<p>Don’t glorify effort — demonstrate outcomes. Choose high-signal projects, document them well, and make them easy to evaluate during a short review.</p>
`,
  },

  "zero-to-offer-interview-prep": {
    title: "Zero-to-offer: preparing for internship interviews on Intern-s-hip",
    date: "2025-10-03",
    description:
      "A practical, week-by-week interview plan tuned for the internships you’ll find on Intern-s-hip.",
    content: `
<h2>Start with role mapping (Day 1)</h2>
<p>List 5 roles you want. For each, write the 3 most important skills required. This simple mapping converts your study time into role-relevant practice.</p>

<h2>Week 1 — fundamentals & short projects</h2>
<p>Build or refine a tiny project that covers the primary skill (e.g., a small React app). This gives a talking point and shows you can ship.</p>

<h2>Week 2 — common interview patterns</h2>
<p>Practice 20 common technical questions related to your role. For product roles, practice product critiques; for data roles, rewrite a short SQL problem and optimize it.</p>

<h2>Week 3 — mock interviews & feedback</h2>
<p>Schedule 3 mock interviews using peers or mentors. Time-box answers, request feedback on communication clarity, and iterate quickly.</p>

<h2>Day before — logistics & mindset</h2>
<p>Read the job posting once more, pick 2 project bullets to highlight, and prepare 3 questions to ask the interviewer. Sleep well — clarity beats cramming.</p>

<h2>Post-interview — follow-up</h2>
<p>Send a short thank-you message referencing one specific conversation topic. If you received feedback, implement and record it for the next application.</p>
`,
  },

  "networking-on-kegth-messages-that-work": {
    title: "How to network on Intern-s-hip: messages that open doors",
    date: "2025-10-03",
    description:
      "Concrete connection and follow-up templates to reach recruiters and engineers through Intern-s-hip and LinkedIn.",
    content: `
<h2>Connection request (30–40 words)</h2>
<p>\"Hi [Name], I'm a CS student focused on frontend engineering. I enjoyed your recent article on component design — can I connect to learn about internships at [Company]?\" Short and specific wins.</p>

<h2>After connect — the 3-line ask</h2>
<p>\"Thanks for connecting, [Name]. Quick question — would you recommend applying via the company portal or a referral for internships? I built X (link) and am applying to [role]. Any tip would be appreciated.\"</p>

<h2>If they offer help</h2>
<p>Share one short highlight and a link: \"Thanks — I’ll apply. Quick context: I built [project], which improved X by Y. Link: [URL]. Appreciate any referral.\"</p>

<h2>Timing & persistence</h2>
<p>Wait 5–7 days for a reply. If none, send a short, value-add follow-up: share a one-sentence update or small improvement to your project. If still no reply after two tries, archive and move on.</p>

<h2>Use Intern-s-hip features</h2>
<p>Use the platform’s messaging and mentorship options to request 10-minute chats. Keep these short, respectful of time, and prepared with two focused questions.</p>
`,
  },

  "convert-internships-into-offers": {
    title: "Convert internships into career offers: tactical guide for interns",
    date: "2025-10-04",
    description:
      "A milestone-based blueprint to create measurable impact during internships so conversions to full-time become natural.",
    content: `
<h2>First 2 weeks — onboarding and small wins</h2>
<p>Understand team goals, set a 30-day goal with your manager, and ship one small but visible improvement (a bug fix, a doc, a test). Early wins build trust.</p>

<h2>30–60 days — measurable feature work</h2>
<p>Take ownership of a defined piece of work that has a measurable outcome (e.g., reduced load time, increased test coverage, or added an analytics event). Share progress updates frequently.</p>

<h2>60–90 days — visibility and feedback</h2>
<p>Request mid-internship feedback and iterate. Present a short demo of your work to the team; ask for actionable next steps on how to transition to a longer-term role.</p>

<h2>End of internship — the close</h2>
<p>Prepare a one-page summary: what you shipped, what you learned, and proposed next steps where you can add long-term value. Share this with your manager before final conversations.</p>

<h2>Manager relationship</h2>
<p>Ask directly about conversion criteria early. Many managers appreciate a proactive intern who tracks progress and ties outcomes to business metrics.</p>
`,
  },

  "how-companies-post-internships-on-kegth": {
    title: "Company-side guide: posting internships that attract quality candidates",
    date: "2025-10-04",
    description:
      "How hiring managers can write clear internships on Intern-s-hip to attract qualified applicants and reduce noise.",
    content: `
<h2>Write clear outcomes, not long lists of skills</h2>
<p>Describe what the intern will deliver in 3–5 bullet points. Outcome-oriented descriptions attract candidates who want to make impact and self-select for fit.</p>

<h2>Provide mentor & learning signals</h2>
<p>Mention mentor availability, expected weekly time with manager, and what technical growth the intern will experience. Students prioritize mentorship and clarity.</p>

<h2>Specify must-have vs nice-to-have</h2>
<p>Separate required skills from preferred skills. This reduces false negatives and increases applied candidates that match baseline expectations.</p>

<h2>Include a short sample task</h2>
<p>Optional: a small take-home or coding guideline helps evaluate candidates and signals that your hiring process values practical skills.</p>

<h2>Conclusion</h2>
<p>Write with empathy: assume many applicants are early in their careers. Clear listings with mentorship cues generate better shortlists and fewer low-signal applications.</p>
`,
  },
};

export async function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = POSTS[slug];
  if (!post) notFound();
  return (
    <>
      <NavBar />
      <main className="container mx-auto px-4 py-12">
        <article className="prose lg:prose-xl max-w-none">
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <div className="text-sm text-gray-500 mb-6">{post.date}</div>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        <hr className="my-8" />
        <div>
          <Link href="/blog">
            <a className="text-sky-700 font-medium">← Back to blog</a>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
