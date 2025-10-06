// components/Footer.tsx
import React from "react";
import Link from "next/link";

/**
 * Footer.tsx
 * Replace your existing Footer component with this file.
 * It includes links to Blog and legal pages required for AdSense discoverability.
 */

export default function Footer(): JSX.Element {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-slate-50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
          <div>
            <Link href="/">
              <a className="flex items-center gap-3">
                <img src="/BasicAssets/Klogo.jpg" alt="kegth" className="h-10 w-10 object-cover rounded" />
                <div>
                  <div className="font-semibold text-lg">kegth</div>
                  <div className="text-sm text-gray-500">Internships & student resources</div>
                </div>
              </a>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
            <nav className="flex gap-4">
              <Link href="/blog">
                <a className="hover:text-sky-700">Blog</a>
              </Link>
              <Link href="/legaldocs/privacy-policy">
                <a className="hover:text-sky-700">Privacy</a>
              </Link>
              <Link href="/legaldocs/terms-and-conditions">
                <a className="hover:text-sky-700">Terms</a>
              </Link>
              <Link href="/contact">
                <a className="hover:text-sky-700">Contact</a>
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-6 border-t pt-4 text-sm text-gray-500">
          <div className="flex flex-col md:flex-row md:justify-between">
            <div>© {year} kegth. All rights reserved.</div>
            <div className="mt-2 md:mt-0">
              Built with ❤️ — <a className="text-sky-700 hover:underline" href="mailto:hello@kegth.com">hello@kegth.com</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
