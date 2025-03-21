import React from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="bg-gray-200 dark:bg-gray-700 text-center py-6">
        <p className="text-sm">
          © {currentYear} Internsship. All rights reserved.
        </p>
      </footer>
      <div className="fixed bottom-4 right-4">
        <Link href="/legaldocs/privacy-policy">
          <a className="text-sm text-gray-600 dark:text-gray-300 hover:underline">
            Privacy Policy
          </a>
        </Link>
      </div>
    </>
  );
}
