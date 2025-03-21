import React from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="bg-gray-200 dark:bg-gray-700 text-center py-6 relative">
        <p className="text-sm">
          © {currentYear} Internsship. All rights reserved.
        </p>
        {/* Mobile view: display inline in footer */}
        <div className="mt-4 flex justify-center space-x-4 md:hidden">
          <Link href="/legaldocs/privacy-policy">
            <a className="text-sm text-gray-600 dark:text-gray-300 hover:underline">
              Privacy Policy
            </a>
          </Link>
          <Link href="/legaldocs/terms-and-conditions">
            <a className="text-sm text-gray-600 dark:text-gray-300 hover:underline">
              Terms &amp; Conditions
            </a>
          </Link>
        </div>
      </footer>

      {/* Desktop view: fixed links at bottom left and right */}
      <div className="hidden md:block">
        <div className="fixed bottom-4 left-4">
          <Link href="/legaldocs/terms-and-conditions">
            <a className="text-sm text-gray-600 dark:text-gray-300 hover:underline">
              Terms &amp; Conditions
            </a>
          </Link>
        </div>
        <div className="fixed bottom-4 right-4">
          <Link href="/legaldocs/privacy-policy">
            <a className="text-sm text-gray-600 dark:text-gray-300 hover:underline">
              Privacy Policy
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}
