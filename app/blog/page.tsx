
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog | kegth',
  description: 'Read our blog for career advice, resume writing tips, interview strategies, and more to help you succeed in your internship search.',
};

// Sample blog posts data
const blogPosts = [
  {
    slug: 'how-to-write-a-resume-that-gets-noticed',
    title: 'How to Write a Resume That Gets Noticed',
    description: 'Learn the key strategies to make your resume stand out to recruiters and land your dream internship.',
    author: 'The Kegth Team',
    date: '2024-07-27',
  },
  // Add more blog posts here as you write them
];

const BlogPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Kegth Blog
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Your source for career advice, industry insights, and internship success stories.
          </p>
        </div>
      </header>

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {blogPosts.map((post) => (
              <div key={post.slug} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                <div className="p-6 flex-grow">
                  <h2 className="text-2xl font-bold text-gray-900">
                    <Link href={`/blog/${post.slug}`} className="hover:text-indigo-600 transition-colors duration-200">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-base text-gray-500">
                    {post.description}
                  </p>
                </div>
                <div className="p-6 bg-gray-50 border-t border-gray-100">
                  <p className="text-sm font-medium text-gray-600">
                    By {post.author} on {post.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogPage;
