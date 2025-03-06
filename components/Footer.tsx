import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-200 dark:bg-gray-700 text-center py-6">
      <p className="text-sm">
        © {currentYear} Internship Platform. All rights reserved.
      </p>
    </footer>
  );
}
