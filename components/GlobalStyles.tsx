"use client";

export default function GlobalAnimations() {
  return (
    <style jsx global>{`
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeIn {
        animation: fadeIn 1s ease-out forwards;
      }
      .delay-200 {
        animation-delay: 0.2s;
      }
      @keyframes pulseSlow {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.5; }
      }
      .animate-pulse-slow {
        animation: pulseSlow 6s infinite;
      }
    `}</style>
  );
}
