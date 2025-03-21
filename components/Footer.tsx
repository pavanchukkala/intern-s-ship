import React from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-6 relative">
      <div className="container mx-auto px-4 flex justify-center items-center">
        <p className="text-sm">
          © {currentYear} Internsship. All rights reserved.
        </p>
      </div>
      <div className="absolute right-4 bottom-4">
        <Link href="/legaldocs/privacy-policy">
          <a className="text-sm hover:text-blue-500">Privacy Policy</a>
        </Link>
      </div>
    </footer>
  );
}
