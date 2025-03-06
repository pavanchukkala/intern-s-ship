import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-indigo-600 dark:bg-gray-800 text-white p-4 text-center shadow-md">
      <p>&copy; {new Date().getFullYear()} Interns' Journey. All Rights Reserved.</p>
    </footer>
  );
}
