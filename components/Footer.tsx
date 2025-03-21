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
        {/* Fixed Privacy Policy Link on the Right */}
        <div className="absolute bottom-4 right-4">
          <Link href="/legaldocs/privacy-policy">
            <a className="text-sm text-gray-600 dark:text-gray-300 hover:underline">
              Privacy Policy
            </a>
          </Link>
        </div>
        {/* Fixed Terms & Conditions Link on the Left */}
        <div className="absolute bottom-4 left-4">
          <Link href="/legaldocs/terms-and-conditions">
            <a className="text-sm text-gray-600 dark:text-gray-300 hover:underline">
              Terms &amp; Conditions
            </a>
          </Link>
        </div>
      </footer>
    </>
  );
}
