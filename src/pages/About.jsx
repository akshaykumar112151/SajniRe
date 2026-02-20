// src/pages/About.jsx
import React from "react";
import { motion } from "framer-motion";

/* ---------- PAGE HEADER (matched with PrivacyPolicy style, no underline) ---------- */
function PageHeader({ title, subtitle }) {
  return (
    <div className="relative w-full bg-[#fbf2e8] border-b border-[#f0e1d3] overflow-hidden">
      {/* Soft animated glow shapes in the background */}
      <motion.div
        className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-pink-200/60 blur-3xl"
        animate={{ x: [0, 20, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute right-0 -bottom-10 h-44 w-44 rounded-full bg-fuchsia-200/60 blur-3xl"
        animate={{ x: [0, -18, 0], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-20 py-8 sm:py-10 md:py-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          whileHover={{
            scale: 1.02,
            letterSpacing: "0.04em",
          }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.35 }}
            className="mt-4 text-xs sm:text-sm md:text-base text-black/70 max-w-2xl mx-auto px-2"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}

const About = () => {
  return (
    <motion.main
      className="bg-[#fbf2e8] min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      {/* Top hero */}
      <PageHeader
        title="About Us"
        subtitle="Get to know the story, vision and heart behind Sajni Re."
      />

      {/* Main content card */}
      <motion.section
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-20 pt-6 sm:pt-8 md:pt-10 pb-10 sm:pb-12 md:pb-14"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{
            y: -6,
            boxShadow: "0 22px 55px rgba(15,23,42,0.18)",
            borderColor: "#f9d5ea",
          }}
          className="bg-white border border-[#f0e1d3] rounded-3xl shadow-[0_10px_30px_rgba(15,23,42,0.10)] 
                     px-5 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12 
                     space-y-6 sm:space-y-8 text-gray-700 leading-relaxed 
                     text-sm sm:text-base md:text-lg transition-all duration-300"
        >
          <motion.p
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-semibold text-pink-600">Sajni Re</span> began
            as a passion project born from a deep love for Indian
            craftsmanship. The name{" "}
            <span className="italic text-pink-600/90">"Sajni Re"</span> was
            chosen to reflect the romantic and soulful essence of our designs.
            It started with a simple idea: to bring the joy of beautiful,
            high-quality imitation jewellery to every woman.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            At Sajni Re, we believe that style should be both{" "}
            <span className="font-medium">beautiful and accessible</span>. Our
            collection is a curated blend of{" "}
            <span className="font-medium">classic Indian designs</span> and{" "}
            <span className="font-medium">contemporary fashion trends</span>,
            ensuring there’s something special for everyone.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            At Sajni Re, we don’t just sell jewellery;{" "}
            <span className="font-semibold text-pink-600">
              we craft stories of love, longing, and eternal grace.
            </span>{" "}
            Every piece carries with it the timeless spirit of elegance and
            heritage.
          </motion.p>
        </motion.div>

        {/* Bottom highlight banner with extra animation */}
        <motion.div
          className="mt-8 sm:mt-10 md:mt-12 w-full bg-gradient-to-r from-pink-200 via-pink-100 to-pink-200 
                     rounded-2xl shadow-md flex items-center justify-center 
                     px-4 py-6 sm:py-7 md:py-8 text-center"
          initial={{ opacity: 0, scale: 0.94, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 20px 50px rgba(236,72,153,0.40)",
          }}
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800"
          >
            Timeless Elegance. Modern Spirit. 💎
          </motion.h2>
        </motion.div>
      </motion.section>
    </motion.main>
  );
};

export default About;
