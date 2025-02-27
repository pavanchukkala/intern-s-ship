// components/GlobalStyles.tsx
"use client";

export default function GlobalStyles() {
  return (
    <style jsx global>{`
      @keyframes gradient-x {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      .animate-gradient {
        background-size: 200% 200%;
        animation: gradient-x 8s ease infinite;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeIn {
        animation: fadeIn 1s ease-out forwards;
      }
      .delay-200 {
        animation-delay: 0.2s;
      }
    `}</style>
  );
}
