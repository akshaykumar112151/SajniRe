import React, { useState } from "react";
import { motion } from "framer-motion";

import EarringsBanner from "../assets/earringsBanner.jpg";
import RingsBanner from "../assets/ringsBanner.png";
import BraceletsBanner from "../assets/braceletsBanner.png";
import PendantsBanner from "../assets/pendantsBanner.jpg";
import DefaultBanner from "../assets/defaultBanner.png";

const categories = [
  {
    name: "Earrings",
    image: EarringsBanner,
    description: "Shine every moment with our elegantly crafted earrings.",
    items: 40,
  },
  {
    name: "Rings",
    image: RingsBanner,
    description: "Celebrate every bond with rings that speak from the heart.",
    items: 25,
  },
  {
    name: "Bracelets",
    image: BraceletsBanner,
    description: "Graceful accents for every wrist, every mood.",
    items: 32,
  },
  {
    name: "Pendants",
    image: PendantsBanner,
    description: "Elevate your neckline with charm.",
    items: 18,
  },
];

// Scroll fade animation
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const CategorySplitBanner = () => {
  // default: Earrings selected, taaki start se hi image aaye
  const [hovered, setHovered] = useState("Earrings");

  const handleTap = (catName) => {
    // mobile par hi tap-toggle kare
    if (window.innerWidth >= 768) return;
    setHovered(hovered === catName ? null : catName);
  };

  const selectedCategory =
    categories.find((cat) => cat.name === hovered) || categories[0];

  return (
    <motion.section
      className="relative w-full h-[100vh] md:h-[90vh] flex flex-col md:flex-row overflow-hidden"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={fadeUp}
    >
      {/* Background Image - full cover, no black gaps */}
      <img
        src={selectedCategory?.image || DefaultBanner}
        alt={hovered || "Jewellery"}
        className={`
          absolute inset-0 w-full h-full object-cover object-center z-0
          transition-all duration-700 ease-in-out
          ${hovered ? "brightness-110" : "brightness-100"}
        `}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Category Sections */}
      <div className="relative w-full h-full flex flex-col md:flex-row z-20">
        {categories.map((cat) => (
          <motion.div
            key={cat.name}
            variants={fadeUp}
            onMouseEnter={() =>
              window.innerWidth >= 768 && setHovered(cat.name)
            }
            onMouseLeave={() =>
              window.innerWidth >= 768 && setHovered("Earrings")
            }
            onClick={() => handleTap(cat.name)}
            className={`
              flex-1 flex items-center justify-center text-center
              py-10 px-6 cursor-pointer relative
              border-t md:border-t-0 md:border-l border-white/20
              transition-all duration-300 ease-in-out
              ${
                hovered === cat.name
                  ? "shadow-[0_0_35px_8px_rgba(212,175,55,0.55)] border-white/50"
                  : "shadow-none"
              }
            `}
          >
            <div className="w-full max-w-xs">
              <h2
                className={`
                  text-2xl sm:text-3xl md:text-4xl font-serif mb-2
                  transition-all duration-300
                  ${
                    hovered === cat.name
                      ? "text-white border border-white px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm"
                      : "text-white/70"
                  }
                `}
              >
                * {cat.name} *
              </h2>

              {hovered === cat.name && (
                <>
                  <p className="text-sm sm:text-base text-white leading-relaxed mt-3">
                    {cat.description}
                  </p>

                  <p className="text-xs sm:text-sm mt-2 text-white italic">
                    ( Explore {cat.items}+ items )
                  </p>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default CategorySplitBanner;
