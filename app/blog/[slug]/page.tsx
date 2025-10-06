// app/blog/[slug]/page.tsx
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import Link from "next/link";

type Post = { title: string; date: string; description: string; content: string };

const POSTS: Record<string, Post> = {
  "how-to-prepare-for-internships": {
    title: "How to prepare for internships (step-by-step)",
    date: "2025-10-01",
    description:
      "A practical, step-by-step guide to find, apply for, and succeed at internships — portfolios, resumes, interviews and follow-ups.",
    content: `
<h2>Why preparation matters</h2>
<p>Internships are experience accelerators. A well-prepared intern gets better projects, stronger references and higher chance of conversion to full-time. Preparation reduces rejection friction and helps you learn faster on the job.</p>

<h2>Step 1 — Define learning goals</h2>
<p>Start by picking one or two focused skills you want to learn (e.g., React fundamentals, data analysis with Python, product research). Clear goals guide project choices and interview prep.</p>

<h2>Step 2 — Build 1–2 portfolio projects</h2>
<p>Create small, finishable projects that demonstrate the chosen skills. Use GitHub for code and a simple deploy (Netlify/Vercel) for a live demo. Use README to explain design choices and learning outcomes.</p>

<h2>Step 3 — Tailor your resume</h2>
<p>For each role, highlight 2–3 achievements that match the job description. Use strong action verbs and metrics when possible (e.g., \"reduced page load by 30%\" or \"implemented feature used by 200 users\"). Keep resume to one page if you're a student.</p>

<h2>Step 4 — Application strategy</h2>
<p>Apply widely but thoughtfully. Use a short, customized cover note that connects your project or coursework to the internship's needs. Track applications in a spreadsheet and follow up politely after 7–10 days.</p>

<h2>Step 5 — Interview preparation</h2>
<p>Practice common questions and mock interviews. For technical roles, practice coding problems on platforms like LeetCode or HackerRank and rehearse explaining your projects end-to-end.</p>

<h2>Step 6 — Follow-up and learning</h2>
<p>After each interview, send a short thank you email and note what you learned from the interview. Keep iterating on your resume and projects based on feedback and rejections.</p>

<p><strong>Final tip:</strong> Consistent, focused action beats random applications. Build, apply, improve — repeat.</p>
`,
  },

  "top-paid-internships-2025": {
    title: "Top paid internships in 2025 for students",
    date: "2025-10-01",
    description:
      "Curated list of high-paying internships in 2025 with stipend ranges, tips to apply and what employers expect.",
    content: `
<h2>Why target paid internships</h2>
<p>Paid internships reduce financial stress and often come with structured mentorship. Companies that pay interns usually treat the role as meaningful work, so targeting these can accelerate learning and provide strong references.</p>

<h2>Where to look</h2>
<p>Large companies, well-funded startups, and specialized internships hubs are primary sources. Use the careers page, LinkedIn, AngelList, and university placement portals to find listings.</p>

<h2>Sample categories and expectations</h2>
<ul>
  <li><strong>BigTech:</strong> rigorous hiring process, competitive stipends, often remote or hybrid.</li>
  <li><strong>FinTech / Quant:</strong> high stipends, strong emphasis on algorithms and data skills.</li>
  <li><strong>Startups:</strong> variable stipends, high-impact projects and cross-functional exposure.</li>
</ul>

<h2>How to increase your chances</h2>
<p>Match your resume to role keywords, build a relevant small project, and network with employees to get referrals. For competitive roles, early application (before deadlines) matters.</p>

<p><strong>Conclusion:</strong> Paid internships are accessible with targeted applications and the right portfolio. Focus on roles where your skills show immediate impact.</p>
`,
  },

  "resume-guide-for-students": {
    title: "Resume guide for students: land your first internship",
    date: "2025-10-01",
    description: "One-page resume templates and practical dos/don'ts for students applying to internships.",
    content: `
<h2>Keep the resume simple</h2>
<p>Your resume should be scannable. Use a clear headline, education, projects, skills, and relevant experience. For students, projects can be treated like experience.</p>

<h2>Headline and summary</h2>
<p>One-line headline (e.g., \"Computer Science student — front-end focused, React & TypeScript\") and a 1–2 line summary of what you build and why you're applying.</p>

<h2>Project bullets</h2>
<p>For each project, add 2 bullets: what you built, and the impact. Include links to GitHub or deployed demo.</p>

<h2>Skills section</h2>
<p>List skills in categories (Languages, Tools, Frameworks). Avoid long generic lists — keep only relevant items.</p>

<h2>Extras and formatting</h2>
<p>Keep fonts standard, 10–12pt, single-column layout. PDF is the preferred format for applications. Proofread carefully.</p>

<p><strong>Final note:</strong> Your resume should invite an interviewer to ask about one strong project — make that project easy to understand quickly.</p>
`,
  },

  "ace-internship-interviews": {
    title: "Ace internship interviews: 10 practical techniques",
    date: "2025-10-02",
    description: "Tactical interview techniques and preparation routines to help you stand out in internship interviews.",
    content: `
<h2>1 — Prepare a one-minute pitch</h2>
<p>Have a concise pitch describing who you are, what you built, and what you want to learn. Keep it specific and relevant to the role.</p>

<h2>2 — Know your projects</h2>
<p>Be ready to explain trade-offs, architecture choices, and what you would do differently. Interviewers probe for depth, not just surface facts.</p>

<h2>3 — Practice whiteboard problems</h2>
<p>For technical roles, practice by writing code on paper or in a shared editor. Explain your thought process aloud.</p>

<h2>4 — Clarify the problem first</h2>
<p>Ask clarifying questions before jumping to a solution. This shows critical thinking and saves time.</p>

<h2>5 — Use structured answers for behavioural</h2>
<p>Use STAR (Situation, Task, Action, Result) to answer behavioural questions concisely.</p>

<h2>6 — Mock interviews</h2>
<p>Do mock interviews with peers or mentors and request honest feedback. Iterate quickly on weak areas.</p>

<h2>7 — Ask smart questions</h2>
<p>At the end, ask questions about the team’s day-to-day, mentorship, or what success looks like for interns.</p>

<h2>8 — Follow up</h2>
<p>Send a short thank-you email that references one part of the interview to remind them of your fit.</p>

<p><strong>Closing:</strong> Use preparation to reduce anxiety and to make your answers clear and focused.</p>
`,
  },

  "build-internship-portfolio-github": {
    title: "Build a simple internship portfolio with GitHub (step-by-step)",
    date: "2025-10-02",
    description:
      "Create a focused GitHub portfolio project that demonstrates the skills recruiters care about, with deploy and README best practices.",
    content: `
<h2>Pick a single useful project idea</h2>
<p>Choose an idea small enough to finish in 1–2 weeks but complex enough to show design decisions (e.g., a mini job board, expense tracker, or dashboard).</p>

<h2>Repository structure</h2>
<p>Keep a clean repo with README, LICENSE, contribution notes, and small sections: setup, run, tests, and demo link.</p>

<h2>Write a strong README</h2>
<p>Start with a one-sentence summary, then features, screenshots, quick start, and tech stack. Mention what you learned.</p>

<h2>Deploy a live demo</h2>
<p>Use Vercel or Netlify for quick deployment. A working demo is often the single most persuasive piece for an internship application.</p>

<h2>Highlight results</h2>
<p>Include measurable outcomes if possible (e.g., page speed, number of users in test, or test coverage).</p>

<p><strong>Final advice:</strong> A focused, well-documented project beats many unfinished experiments. Ship one great demo.</p>
`,
  },

  "networking-messages-for-internships": {
    title: "Networking for internships: messages that actually work",
    date: "2025-10-02",
    description:
      "Exact LinkedIn and email message templates, timing, and follow-up strategy to connect with recruiters and engineers.",
    content: `
<h2>Start with a short connection message</h2>
<p>When sending a connection request on LinkedIn, use 1–2 lines: who you are and why you’d like to connect (e.g., \"CS student interested in product analytics — I admire your work at X\").</p>

<h2>Follow-up message template</h2>
<p>After connecting, send a 3-line message: 1) quick intro, 2) one specific question about their team/project, 3) ask for a 10-minute chat if appropriate.</p>

<h2>Email template for recruiters</h2>
<p>Subject: \"Internship candidate — [Your Name] — [Role]\"\n<br>Body: short one-paragraph pitch linking to your GitHub/portfolio and 1–2 lines about why you fit. Close by proposing next steps or asking for a referral.</p>

<h2>Timing and persistence</h2>
<p>Wait 5–7 days before a gentle follow-up. If no response after two polite follow-ups, move on — but keep the contact for future updates.</p>

<p><strong>Key idea:</strong> Be concise, ask one clear question, and always add value (share a relevant project or insight).</p>
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
