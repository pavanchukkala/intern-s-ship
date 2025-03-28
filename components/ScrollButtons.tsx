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

  const buttonClasses =
    "flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white transition-opacity";

  return (
    <>
      <motion.button
        onClick={scrollToTop}
        disabled={atTop}
        whileHover={!atTop ? { scale: 1.1 } : {}}
        whileTap={!atTop ? { scale: 0.95 } : {}}
        className={`${buttonClasses} fixed top-[150px] right-4 ${
          atTop ? "opacity-50 cursor-not-allowed" : "opacity-100"
        }`}
      >
        <ChevronUp size={24} />
      </motion.button>
      <motion.button
        onClick={scrollToBottom}
        disabled={atBottom}
        whileHover={!atBottom ? { scale: 1.1 } : {}}
        whileTap={!atBottom ? { scale: 0.95 } : {}}
        className={`${buttonClasses} fixed bottom-[40px] right-4 ${
          atBottom ? "opacity-50 cursor-not-allowed" : "opacity-100"
        }`}
      >
        <ChevronDown size={24} />
      </motion.button>
    </>
  );
}
