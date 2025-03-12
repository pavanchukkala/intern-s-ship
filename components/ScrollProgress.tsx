// app/components/ScrollProgress.tsx
"use client";
import { useState, useEffect } from "react";

export default function ScrollProgress() {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollPercent(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1.5 z-50">
  <div
    className="bg-green-600 h-full animate-pulse"
    style={{
      width: `${scrollPercent}%`,
      boxShadow: "0 0 10px #38a169, 0 0 20px #38a169", // Glowing effect
    }}
  ></div>
</div>

  );
}
