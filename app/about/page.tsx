
import { Metadata } from 'next';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Kegth | Our Mission to Empower the Next Generation',
  description: 'Learn about Kegth\'s mission to bridge the gap between education and industry, providing students and professionals with the tools and opportunities they need to succeed.',
};

const AboutPage = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow">
            <header className="bg-white dark:bg-gray-800 shadow-sm">
                <div className="container mx-auto py-16 px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">Our Mission</h1>
                <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    To empower the next generation of talent by connecting them with meaningful opportunities that kickstart their careers.
                </p>
                </div>
            </header>

            <div className="py-16">
                <div className="container mx-auto px-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
                            <div className="p-8 lg:p-12">
                                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                                    <span className="block">Bridging the Gap Between</span>
                                    <span className="block text-sky-600 dark:text-sky-400">Education & Industry</span>
                                </h2>
                                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                                    Kegth was born from a simple but powerful idea: that every student and aspiring professional deserves a fair chance to succeed. We saw a disconnect between the skills learned in academia and the practical experience required by the industry. We set out to build a bridge.
                                </p>
                                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                                    Our platform is more than just an internship board; it is a comprehensive ecosystem designed to provide you with the tools, resources, and opportunities needed to thrive in today’s competitive landscape.
                                </p>
                            </div>
                            <div className="p-8">
                                <img
                                    className="rounded-lg shadow-md w-full h-full object-cover"
                                    src="/BasicAssets/mission.jpg"
                                    alt="Team collaborating in an office"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Our Core Values</h2>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">These principles guide every decision we make.</p>
                        </div>
                        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Accessibility</h3>
                                <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                                    Opportunity should be for everyone. Our platform is free for applicants, ensuring no financial barriers stand in your way.
                                </p>
                            </div>
                            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Empowerment</h3>
                                <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                                    We provide the resources and support you need to make informed career decisions and present your best self to employers.
                                </p>
                            </div>
                            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Integrity</h3>
                                <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                                    All internship listings are vetted to ensure they are legitimate, high-quality opportunities. We are committed to transparency and honesty.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <Footer />
    </div>
  );
};

export default AboutPage;
