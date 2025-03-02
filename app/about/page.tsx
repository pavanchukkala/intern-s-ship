"use client";

import Image from "next/image";
import Link from "next/link";
import { Globe } from "lucide-react";

export default function AboutPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <Globe size={64} className="mx-auto mb-4" />
          <h1 className="text-5xl font-extrabold mb-4">Welcome to Internship Platform</h1>
          <p className="text-xl max-w-3xl mx-auto">
            A unique bridge connecting internship-providing companies with ambitious candidates.
            Explore a secure, fast, and user-friendly experience—without any login or sign-up hassle.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-center">Our Story</h2>
          <p className="text-lg leading-relaxed mb-4">
            This platform began as a bold idea—developed single-handedly by me, <strong>Chukkala Pavan Kumar</strong>.
            With a passion for innovation and a desire to simplify the internship search process, I built the first version from scratch.
          </p>
          <p className="text-lg leading-relaxed">
            Every detail of this platform was thoughtfully designed to serve as a bridge between companies offering internships
            and enthusiastic candidates looking for opportunities. My personal journey, persistence, and drive are at the heart of every feature.
          </p>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-12 bg-gray-100 dark:bg-gray-800 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="w-48 h-48 relative rounded-full overflow-hidden mx-auto">
           <Image
  src="https://raw.githubusercontent.com/pavanchukkala/intern-s-ship/main/BasicAssets/founder.jpg"
  alt="Chukkala Pavan Kumar"
  width={192}
  height={192}
  className="object-cover"
/>
          </div>
          <div className="md:flex-1">
            <h2 className="text-3xl font-bold mb-4">Meet the Founder</h2>
            <p className="text-lg mb-4">
              I, Chukkala Pavan Kumar, envisioned a platform that eliminates unnecessary barriers—no need for logins or sign-ups,
              and with zero user data stored. My drive to empower both companies and candidates has shaped every aspect of this platform.
            </p>
            <p className="text-lg">
              This isn’t just a platform; it’s a movement towards transparency, speed, and excellence in connecting talent with opportunity.
            </p>
          </div>
        </div>
      </section>

      {/* Platform Highlights */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-center">Platform Highlights</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="text-2xl font-bold mb-2">Open & Accessible</h3>
              <p className="text-lg">
                Unlike other platforms, there’s no login or signup required. Explore internships freely without the need for registration.
                This open access model ensures that opportunities are never hidden behind unnecessary barriers.
              </p>
            </div>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="text-2xl font-bold mb-2">High Security</h3>
              <p className="text-lg">
                With no user data stored, our platform prioritizes your security and privacy. Enjoy peace of mind as you browse
                and apply for internships—your information remains completely safe.
              </p>
            </div>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="text-2xl font-bold mb-2">One-on-One Support</h3>
              <p className="text-lg">
                Every issue is met with personalized attention. We believe in direct, one-on-one resolution to ensure that your
                experience remains smooth and hassle-free.
              </p>
            </div>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="text-2xl font-bold mb-2">Speed & Performance</h3>
              <p className="text-lg">
                Our platform is built for speed. Lightning-fast load times and smooth transitions make finding your ideal internship
                a breeze.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Design & UX Section */}
      <section className="py-12 bg-gray-100 dark:bg-gray-800 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-center">Design & User Experience</h2>
          <p className="text-lg leading-relaxed mb-4">
            We’re obsessed with great design. The platform boasts a modern, attractive interface that’s responsive across all devices.
            Every element is crafted to deliver a delightful user experience—ensuring that your journey from browsing to applying is smooth and intuitive.
          </p>
          <p className="text-lg leading-relaxed">
            The aesthetic appeal and intuitive layout not only make the platform visually engaging but also emphasize functionality,
            setting a new standard for internship portals.
          </p>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Join the Revolution</h2>
          <p className="text-lg mb-6">
            Whether you're an internship provider or a driven candidate, our platform is designed with you in mind.
            Dive in, explore the opportunities, and become part of a community that values speed, security, and unmatched design.
          </p>
          <Link href="/">
            <span className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300">
              Explore Internships Now
            </span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 dark:bg-gray-700 text-center py-6">
        <p className="text-sm">
          © {currentYear} Internship Platform. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
