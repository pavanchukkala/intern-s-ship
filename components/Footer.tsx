import React from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-gray-200 dark:bg-gray-700 text-center py-6 relative">
        <p className="text-sm">
          © {currentYear} Kegth. All rights reserved.
        </p>

        {/* Disclaimer below the copyright */}
        <div className="mt-2">
          <Link
            href="/legaldocs/disclaimer"
            className="text-sm text-gray-600 dark:text-gray-300 hover:underline"
          >
            • Disclaimer
          </Link>
        </div>

        {/* Mobile view: Privacy & Terms inline */}
        <div className="mt-4 flex justify-center space-x-4 md:hidden">
          <Link
            href="/legaldocs/privacy-policy"
            className="text-sm text-gray-600 dark:text-gray-300 hover:underline"
          >
            • Privacy Policy
          </Link>
          <Link
            href="/legaldocs/terms-and-conditions"
            className="text-sm text-gray-600 dark:text-gray-300 hover:underline"
          >
            • Terms &amp; Conditions
          </Link>
        </div>
      </footer>

      {/* Desktop view: fixed links on sides */}
      <div className="hidden md:block">
        <div className="fixed bottom-4 left-4">
          <Link
            href="/legaldocs/terms-and-conditions"
            className="text-sm text-gray-600 dark:text-gray-300 hover:underline"
          >
            Terms &amp; Conditions
          </Link>
        </div>
        <div className="fixed bottom-4 right-4">
          <Link
            href="/legaldocs/privacy-policy"
            className="text-sm text-gray-600 dark:text-gray-300 hover:underline"
          >
            Privacy Policy
          </Link>
        </div>
      </div>

      {/* Bottom credit section */}
      <div className="mt-6 border-t pt-4 text-sm text-gray-500">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div>© {currentYear} Kegth. All rights reserved.</div>
          <div className="mt-2 md:mt-0">
            Built with ❤️ —{" "}
            <a
              className="text-sky-700 hover:underline"
              href="mailto:kegthgroup@gmail.com"
            >
              kegthgroup@gmail.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
