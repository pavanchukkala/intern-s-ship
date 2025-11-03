
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Write a Resume That Gets Noticed | Kegth Blog',
  description: 'A step-by-step guide to crafting a powerful resume that captures the attention of recruiters and helps you land your dream internship.',
};

const BlogPostPage = () => {
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
            How to Write a Resume That Gets Noticed
          </h1>
          <p className="mt-4 text-lg text-gray-600">Posted on July 27, 2024 by The Kegth Team</p>
        </header>

        <div className="prose prose-lg mx-auto text-gray-700">
          <p className="lead">
            Your resume is the most important document in your job search. It's your first—and sometimes only—chance to make a strong impression on a recruiter. In a sea of applications, how do you make sure yours stands out? This guide will walk you through creating a resume that not only gets noticed but also gets you interviews.
          </p>

          <h2 className="font-semibold text-2xl text-gray-900 mt-12">1. Start with a Powerful Summary or Objective</h2>
          <p>
            Forget the old, passive objective statement. Instead, start with a dynamic <strong>Professional Summary</strong> if you have some experience, or a clear <strong>Career Objective</strong> if you are just starting out. This should be a 2-3 sentence pitch that highlights your key skills and career goals.
          </p>
          <blockquote>
            <p><strong>Example Summary:</strong> Highly motivated and detail-oriented computer science student with a passion for artificial intelligence and machine learning. Proven ability to develop and implement innovative solutions through academic projects and a personal portfolio. Seeking to leverage strong programming skills in a challenging AI internship.</p>
          </blockquote>

          <h2 className="font-semibold text-2xl text-gray-900 mt-8">2. Tailor Your Resume for Each Application</h2>
          <p>
            A one-size-fits-all resume doesn't work. For each internship you apply for, carefully read the job description and identify the key skills and qualifications the employer is looking for. Then, update your resume to highlight your experience that matches those requirements. Use the same keywords you see in the job description.
          </p>

          <h2 className="font-semibold text-2xl text-gray-900 mt-8">3. Showcase Your Accomplishments, Not Just Your Responsibilities</h2>
          <p>
            Instead of simply listing what you did in a role, focus on what you <strong>achieved</strong>. Use action verbs and quantify your results whenever possible. This shows the impact you made.
          </p>
          <ul>
            <li><strong>Instead of:</strong> "Responsible for managing social media accounts."</li>
            <li><strong>Try:</strong> "Grew social media engagement by 25% over three months by creating and curating compelling content across three platforms."</li>
            <li><strong>Instead of:</strong> "Wrote code for a university project."</li>
            <li><strong>Try:</strong> "Developed a Python-based web scraper that automated data collection, reducing manual data entry time by 90% for a key academic research project."</li>
          </ul>

          <h2 className="font-semibold text-2xl text-gray-900 mt-8">4. Keep It Clean, Professional, and Easy to Read</h2>
          <p>
            Recruiters spend only a few seconds scanning each resume. Make sure yours is easy on the eyes.
          </p>
          <ul>
            <li><strong>Layout:</strong> Use a clean, modern layout with plenty of white space.</li>
            <li><strong>Font:</strong> Choose a professional font like Calibri, Arial, or Georgia, in a readable size (10-12 points).</li>
            <li><strong>Length:</strong> Keep it to one page. As a student or recent graduate, you should be able to fit everything on a single page.</li>
            <li><strong>Proofread:</strong> Typos and grammatical errors are a red flag. Proofread your resume multiple times and have someone else look at it too.
            </li>
          </ul>

          <h2 className="font-semibold text-2xl text-gray-900 mt-8">5. Highlight Your Skills and Projects</h2>
          <p>
            For technical roles, a dedicated "Skills" section is essential. List your programming languages, software, and tools. Additionally, a "Projects" section can be incredibly powerful. Describe 1-3 of your most significant projects, detailing the technology used and the outcome.
          </p>
          <blockquote>
            <p><strong>Example Project:</strong></p>
            <p><strong>Personal Portfolio Website</strong> | React, Next.js, Vercel</p>
            <p>Designed and deployed a fully responsive personal portfolio to showcase my projects and skills. Implemented a clean, modern UI with a focus on user experience. Optimized for performance, achieving a 95+ Lighthouse score.</p>
          </blockquote>

          <hr className="my-12" />

          <p>By following these steps, you can create a compelling resume that effectively markets your skills and experiences. This will significantly increase your chances of getting noticed by recruiters and securing the internship you want. Good luck!</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
