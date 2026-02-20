// src/components/LoveBeautySection.jsx
import React from "react";
import RingHandImage from "../assets/ring-hand.jpg";
import RingBoxImage from "../assets/ring-box.png";

const LoveBeautySection = () => {
  return (
    // mt-6 ensures spacing from previous section (countdown)
    <section className="relative w-full bg-[#fff8f5] px-4 sm:px-6 md:px-8 py-12 md:py-20 overflow-hidden mt-6">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-14">

        {/* Left - Arched Image with enlarged Circular Text */}
        <div className="relative w-full md:w-1/2 flex-shrink-0">
          <div className="relative w-full h-[420px] md:h-[780px] overflow-hidden rounded-tl-[140px] rounded-tr-[140px] md:rounded-tl-[300px] md:rounded-tr-[300px] shadow-md">
            <img
              src={RingHandImage}
              alt="Ring on Hand"
              className="w-full h-full object-cover"
            />

            {/* BIGGER Circular Text */}
            <svg
              viewBox="0 0 620 620"
              className="
                absolute left-1/2
                -top-6 sm:-top-10 md:-top-14
                transform -translate-x-1/2
                w-64 sm:w-96 md:w-[720px] lg:w-[820px]
                pointer-events-none
              "
              aria-hidden
              role="img"
            >
              <defs>
                <path
                  id="loveCirclePathXL"
                  d="M310,310 m-200,0 a200,200 0 1,1 400,0 a200,200 0 1,1 -400,0"
                  fill="none"
                />
              </defs>

              <text fill="#442d25" fontSize="22" fontFamily="serif" letterSpacing="1.4">
                <textPath href="#loveCirclePathXL" startOffset="6%">
                  Where Beauty And Love Intertwine Perfectly — &nbsp;
                </textPath>
              </text>
            </svg>

            {/* Center Shop Now Circle */}
            <div
              role="button"
              tabIndex={0}
              aria-label="Shop Now"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  // optional: add navigation or click handling
                  e.currentTarget.click();
                }
              }}
              className="
                absolute z-20
                left-1/2 transform -translate-x-1/2
                md:top-[68%] top-[62%]
                w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32
                rounded-full bg-white text-black
                flex items-center justify-center shadow-lg
                cursor-pointer
                transition-colors duration-200 ease-out
                focus:outline-none focus:ring-4 focus:ring-pink-200
                hover:bg-black hover:text-white
              "
            >
              {/* use text-current so it follows parent's color (black by default, white on hover) */}
              <span className="text-center font-medium text-current text-[11px] sm:text-sm md:text-sm leading-tight">
                SHOP
                <br />
                NOW
              </span>
            </div>
          </div>
        </div>

        {/* Right - Content */}
        <div className="relative w-full md:w-1/2 max-w-xl text-center md:text-left">
          {/* Ring Box Floating Image (only on md+) */}
          <img
            src={RingBoxImage}
            alt="Ring Box"
            className="hidden md:block absolute -top-20 md:-top-28 right-0 md:right-[-60px] w-[160px] md:w-[230px] z-30 drop-shadow-xl"
          />

          <p className="uppercase tracking-[3px] text-sm text-gray-600 mb-4">
            Timeless Wrist Treasures
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-snug mb-5 text-[#111]">
            Unleash Your Style
            <br className="hidden md:block" />
            With Our Unique Bracelets
          </h2>

          <p className="text-gray-600 mb-7 text-sm sm:text-base md:text-lg max-w-md mx-auto md:mx-0">
            Our rings are more than just jewellery — they are a symbol of love,
            commitment, and timeless beauty. Crafted with precision and passion,
            each design tells a story that is uniquely yours.
          </p>

          <div className="flex justify-center md:justify-start">
            <button className="bg-black text-white px-6 md:px-8 py-3 md:py-4 rounded-md hover:bg-gray-800 transition flex items-center gap-3">
              <span>Shop Now</span>
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Background Leaf */}
      <div className="absolute right-4 bottom-4 opacity-10 hidden md:block z-0">
        <svg
          width="280"
          height="280"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#d0a89f"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 20s8-10 20-10"></path>
        </svg>
      </div>
    </section>
  );
};

export default LoveBeautySection;
