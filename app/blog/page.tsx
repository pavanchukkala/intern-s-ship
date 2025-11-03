
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Kegth Blog | Career Insights & Internship Tips',
  description: 'Explore our blog for expert career advice, resume strategies, interview tips, and insights to succeed in your internship search and beyond.',
};

// Expanded blog posts data to make the blog feel more substantial
const blogPosts = [
  {
    slug: 'how-to-write-a-resume-that-gets-noticed',
    title: 'How to Write a Resume That Gets Noticed',
    description: 'Learn the key strategies to make your resume stand out to recruiters and land your dream internship. A deep dive into formatting, keywords, and impact statements.',
    author: 'The Kegth Team',
    date: '2024-07-28',
    featured: true, // Mark this as the featured post
  },
  {
    slug: 'ace-your-next-internship-interview',
    title: '10 Common Internship Interview Questions (and How to Answer Them)',
    description: 'Preparation is key. Walk into your next interview with confidence by preparing for these common questions with our expert-backed answer strategies.',
    author: 'Jane Doe, Career Coach',
    date: '2024-07-22',
    featured: false,
  },
  {
    slug: 'networking-for-students',
    title: 'A Student’s Guide to Professional Networking (Even if You’re an Introvert)',
    description: 'Networking can be intimidating. Here are practical, low-stress tips for students to build meaningful connections that can lead to future opportunities.',
    author: 'John Smith, HR Specialist',
    date: '2024-07-15',
    featured: false,
  },
];

const featuredPost = blogPosts.find(p => p.featured);
const otherPosts = blogPosts.filter(p => !p.featured);

const BlogPage = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow">
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="container mx-auto py-16 px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">Kegth Career Hub</h1>
            <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Your source for career advice, industry insights, and internship success stories to help you build a future you love.
            </p>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16">
          {/* Featured Post Section */}
          {featuredPost && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Featured Article</h2>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300">
                <div className="md:flex">
                  <div className="p-8 flex-1">
                    <p className="text-sm text-sky-600 dark:text-sky-400 font-semibold">{featuredPost.date}</p>
                    <h3 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                      <Link href={`/blog/${featuredPost.slug}`} className="hover:text-sky-700 dark:hover:text-sky-500 transition-colors">
                        {featuredPost.title}
                      </Link>
                    </h3>
                    <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
                      {featuredPost.description}
                    </p>
                    <div className="mt-6 flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">By {featuredPost.author}</p>
                      <Link href={`/blog/${featuredPost.slug}`} className="text-sky-600 dark:text-sky-400 font-semibold flex items-center hover:translate-x-1 transition-transform">
                        Read More <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Grid of Other Posts */}
          <section>
             <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">More Insights</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {otherPosts.map((post) => (
                <div key={post.slug} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                  <div className="p-6 flex-grow">
                    <p className="text-sm text-sky-600 dark:text-sky-400 font-semibold">{post.date}</p>
                    <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                       <Link href={`/blog/${post.slug}`} className="hover:text-sky-700 dark:hover:text-sky-500 transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-3 text-base text-gray-600 dark:text-gray-400">
                      {post.description}
                    </p>
                  </div>
                  <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 mt-auto">
                     <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">By {post.author}</p>
                      <Link href={`/blog/${post.slug}`} className="text-sky-600 dark:text-sky-400 font-semibold flex items-center hover:translate-x-1 transition-transform">
                        Read article <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
           </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPage;
