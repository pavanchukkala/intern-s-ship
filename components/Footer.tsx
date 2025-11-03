
import React from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = {
    company: [
      { title: "About Us", href: "/about" },
      { title: "Blog", href: "/blog" },
      { title: "Contact Us", href: "/contact" },
    ],
    legal: [
      { title: "Privacy Policy", href: "/legaldocs/privacy-policy" },
      { title: "Terms & Conditions", href: "/legaldocs/terms-and-conditions" },
      { title: "Disclaimer", href: "/disclaimer" },
    ],
  };

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/BasicAssets/logo.jpg" alt="kegth" className="h-10 w-10 rounded-md object-cover" />
              <span className="font-bold text-xl text-gray-800 dark:text-white">kegth</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 max-w-sm">
              The ultimate platform for students and professionals to find top internships and accelerate their career growth.
            </p>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              <a href="mailto:kegthgroup@gmail.com" className="hover:text-sky-700 dark:hover:text-sky-500">
                kegthgroup@gmail.com
              </a>
            </p>
          </div>

          {/* Links Sections */}
          <div className="col-span-1 md:col-start-1 md:col-span-1 lg:col-start-auto">
            <h3 className="font-semibold text-gray-800 dark:text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {sections.company.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-sky-700 dark:hover:text-sky-500">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold text-gray-800 dark:text-white">Legal</h3>
            <ul className="mt-4 space-y-2">
              {sections.legal.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-sky-700 dark:hover:text-sky-500">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="my-8 border-gray-200 dark:border-gray-700" />

        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; {currentYear} kegth. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
