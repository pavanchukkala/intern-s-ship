"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function ScrollButtons() {
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const isAtTop = scrollTop === 0;
      const isAtBottom =
        window.innerHeight + scrollTop >= document.documentElement.scrollHeight;
      setAtTop(isAtTop);
      setAtBottom(isAtBottom);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    if (!atTop) window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    if (!atBottom)
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
  };

  // Mobile view: up button now positioned at 120px from top to clear the nav bar
  // Laptop view remains unchanged: up button at 150px and down button at 40px
  const upButtonClasses = `
    flex items-center justify-center
    w-8 h-8 md:w-12 md:h-12
    rounded-full shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white
    transition-opacity fixed right-4
    top-[180px] md:top-[150px]
    ${atTop ? "opacity-50 cursor-not-allowed" : "opacity-100"}
  `;

  const downButtonClasses = `
    flex items-center justify-center
    w-8 h-8 md:w-12 md:h-12
    rounded-full shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white
    transition-opacity fixed right-4
    bottom-[80px] md:bottom-[40px]
    ${atBottom ? "opacity-50 cursor-not-allowed" : "opacity-100"}
  `;

  return (
    <>
      <motion.button
        onClick={scrollToTop}
        disabled={atTop}
        whileHover={!atTop ? { scale: 1.1 } : {}}
        whileTap={!atTop ? { scale: 0.95 } : {}}
        className={upButtonClasses}
      >
        <ChevronUp size={20} className="md:hidden" />
        <ChevronUp size={24} className="hidden md:block" />
      </motion.button>
      <motion.button
        onClick={scrollToBottom}
        disabled={atBottom}
        whileHover={!atBottom ? { scale: 1.1 } : {}}
        whileTap={!atBottom ? { scale: 0.95 } : {}}
        className={downButtonClasses}
      >
        <ChevronDown size={20} className="md:hidden" />
        <ChevronDown size={24} className="hidden md:block" />
      </motion.button>
    </>
  );
}
