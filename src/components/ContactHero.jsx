// src/components/ContactHero.jsx
import React from "react";
import { motion } from "framer-motion";
import palmLeft from "../assets/palm-left-right.png";
import palmRight from "../assets/palm-left-right.png";

const ContactHero = () => {
  return (
    <motion.section
      className="relative w-full bg-[#fbf2e8] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-20 py-10 sm:py-12 md:py-16 flex flex-col items-center justify-center text-center min-h-[220px] sm:min-h-[260px] md:min-h-[320px] lg:min-h-[380px]">
        {/* Animated Left Leaf */}
        <img
          src={palmLeft}
          alt="Left Palm"
          className="pointer-events-none select-none absolute left-0 top-0 h-24 sm:h-32 md:h-48 lg:h-full opacity-40 animate-leafPulse"
        />

        {/* Animated Right Leaf */}
        <img
          src={palmRight}
          alt="Right Palm"
          className="pointer-events-none select-none absolute right-0 top-0 h-24 sm:h-32 md:h-48 lg:h-full opacity-40 animate-leafPulse"
        />

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 10, scale: 0.995 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative z-[1] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-black leading-tight"
        >
          Contact
        </motion.h1>

        {/* Subtitle (no breadcrumb) */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06, duration: 0.35 }}
          className="relative z-[1] mt-2 text-xs sm:text-sm md:text-base text-black/70 max-w-xl"
        >
          Have a question or need help? Reach out and we’ll get back to you as
          soon as possible.
        </motion.p>
      </div>

      {/* Custom Leaf Animation */}
      <style>
        {`
          @keyframes leafPulse {
            0%   { transform: scale(1) rotate(0deg); }
            35%  { transform: scale(1.06) rotate(6deg); }
            65%  { transform: scale(1.08) rotate(-5deg); }
            100% { transform: scale(1) rotate(0deg); }
          }
          .animate-leafPulse {
            animation: leafPulse 3.6s cubic-bezier(.57,.14,.85,.82) infinite;
          }
        `}
      </style>
    </motion.section>
  );
};

export default ContactHero;
