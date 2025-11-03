 
"use client";
// components/NavBar.tsx (client component)
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * NavBar.tsx (client)
 *
 * - "use client" must be the first non-comment line for Client Components in Next.js App Router.
 * - Uses Tailwind classes to match your project's styling.
 */

export default function NavBar(): JSX.Element {
  const [open, setOpen] = useState(false);
  const pathname = typeof usePathname === "function" ? usePathname() : "/";

  const navItems: { title: string; href: string }[] = [
    { title: "Home", href: "/" },
    { title: "Blog", href: "/blog" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
    { title: "Disclaimer", href: "/disclaimer" },
  ];

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/">
              <a className="flex items-center space-x-2">
                <img src="/BasicAssets/logo.jpg" alt="kegth" className="h-8 w-8 rounded-sm object-cover" />
                <span className="font-semibold text-lg">kegth</span>
              </a>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  className={`text-sm font-medium ${
                    isActive(item.href) ? "text-sky-700" : "text-gray-700 hover:text-sky-700"
                  }`}
                >
                  {item.title}
                </a>
              </Link>
            ))}

            <Link href="/register">
              <a className="ml-4 inline-block rounded-md border border-sky-700 px-3 py-1 text-sm font-semibold text-sky-700 hover:bg-sky-50">
                Register
              </a>
            </Link>
          </nav>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen((s) => !s)}
              aria-label="Toggle menu"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-3 pb-4 space-y-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  onClick={() => setOpen(false)}
                  className={`block px-2 py-2 rounded-md text-base font-medium ${
                    isActive(item.href) ? "text-sky-700" : "text-gray-700 hover:text-sky-700"
                  }`}
                >
                  {item.title}
                </a>
              </Link>
            ))}

            <Link href="/legaldocs/privacy-policy">
              <a onClick={() => setOpen(false)} className="block px-2 py-2 rounded-md text-sm text-gray-600 hover:text-sky-700">
                Privacy
              </a>
            </Link>
            <Link href="/legaldocs/terms-and-conditions">
              <a onClick={() => setOpen(false)} className="block px-2 py-2 rounded-md text-sm text-gray-600 hover:text-sky-700">
                Terms
              </a>
            </Link>
            <Link href="/disclaimer">
              <a onClick={() => setOpen(false)} className="block px-2 py-2 rounded-md text-sm text-gray-600 hover:text-sky-700">
                Disclaimer
              </a>
            </Link>

            <Link href="/register">
              <a
                onClick={() => setOpen(false)}
                className="mt-2 inline-block w-full text-center rounded-md border border-sky-700 px-3 py-2 text-sm font-semibold text-sky-700 bg-white hover:bg-sky-50"
              >
                Register
              </a>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
