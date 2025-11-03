
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About kegth | Our Mission to Empower the Next Generation',
  description: 'Learn about kegth's mission to bridge the gap between education and industry, providing students and professionals with the tools and opportunities they need to succeed.',
};

const AboutPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            About Kegth
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Our mission is to empower the next generation of talent by connecting them with meaningful opportunities that kickstart their careers.
          </p>
        </div>
      </header>

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  <span className="block">Bridging the Gap Between</span>
                  <span className="block text-indigo-600">Education and Industry</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-gray-500">
                  Kegth was born from a simple but powerful idea: that every student and aspiring professional deserves a fair chance to succeed. We saw a disconnect between the skills learned in academia and the practical experience required by the industry. We set out to build a bridge.
                </p>
                <p className="mt-6 text-lg leading-6 text-gray-500">
                  Our platform is more than just an internship board. It's a comprehensive ecosystem designed to provide you with the tools, resources, and opportunities needed to thrive in today’s competitive landscape. We believe in learning by doing, and we are committed to helping you find the perfect role to grow your skills and launch your career.
                </p>
              </div>
            </div>
            <div className="aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1 -mt-6">
              <img
                className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
                src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="People working in an office"
              />
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">Our Core Values</h2>
              <p className="mt-4 text-lg text-gray-600">
                These principles guide every decision we make.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900">Accessibility</h3>
                <p className="mt-2 text-base text-gray-500">
                  We believe opportunity should be for everyone. Our platform is free to use for all applicants, ensuring no financial barriers stand in your way.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900">Empowerment</h3>
                <p className="mt-2 text-base text-gray-500">
                  We provide the resources and support you need to make informed career decisions and present your best self to employers.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900">Integrity</h3>
                <p className="mt-2 text-base text-gray-500">
                  We are committed to transparency and honesty. All internship listings are vetted to ensure they are legitimate, high-quality opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
