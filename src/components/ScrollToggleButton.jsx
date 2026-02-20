import React, { useState, useEffect } from "react";

const ScrollToggleButton = () => {
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
      setAtBottom(bottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    if (atBottom) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 flex items-center justify-center p-0 m-0 bg-transparent border-none cursor-pointer hover:scale-110 transition-transform duration-300 group"
    >
      <svg
        width="70"
        height="70"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-transform duration-300 ${
          atBottom ? "rotate-180" : ""
        }`}
      >
        <defs>
          {/* Gold Gradient */}
          <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#FFA500" />
            <stop offset="100%" stopColor="#FFD700" />
          </linearGradient>

          {/* Shine Gradient */}
          <linearGradient id="shineGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="0.7" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          {/* Mask for Shine Animation */}
          <mask id="shineMask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <rect
              x="-100%"
              y="0"
              width="200%"
              height="100%"
              fill="url(#shineGrad)"
              className="shine"
            />
          </mask>
        </defs>

        {/* Main Sparkle */}
        <path
          d="M12 2C11.5 5.5 9 9 6 10C9 11 11.5 14.5 12 18C12.5 14.5 15 11 18 10C15 9 12.5 5.5 12 2Z"
          fill="url(#goldGrad)"
          mask="url(#shineMask)"
        />
      </svg>

      {/* Animation Styles */}
      <style jsx>{`
        .group:hover .shine {
          animation: shineMove 1.2s ease-in-out forwards;
        }
        @keyframes shineMove {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(100%);
          }
        }
        .group:hover svg {
          filter: drop-shadow(0 0 8px gold) drop-shadow(0 0 15px gold);
        }
      `}</style>
    </button>
  );
};

export default ScrollToggleButton;
