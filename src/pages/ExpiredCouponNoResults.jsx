// src/pages/ExpiredCouponNoResults.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ExpiredCoupon from "../assets/ExpiredCoupon.png";

const containerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      staggerChildren: 0.08,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const placeholderSuggestions = [
  "Bracelets",
  "Earrings",
  "Mangalsutra",
  "Necklace",
  "Pendant Set",
  "Rings",
  "Anklets",
];

const ExpiredCouponNoResults = () => {
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // 🔁 Rotate placeholder text
  useEffect(() => {
    const id = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % placeholderSuggestions.length);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  const currentPlaceholder = placeholderSuggestions[placeholderIndex];

  return (
    <motion.main
      className="min-h-[500px] md:bg-white bg-gradient-to-b from-white via-pink-50/40 to-white flex items-center md:items-start py-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="max-w-xl md:max-w-3xl w-full mx-auto px-4 md:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Top text */}
        <motion.p
          className="text-sm md:text-lg text-gray-600 mb-4"
          variants={fadeUp}
        >
          You searched for{" "}
          <span className="text-blue-600 font-semibold text-base md:text-xl">
            Sajni Re
          </span>
        </motion.p>

        {/* Illustration – bigger + new animation (rotate + scale) */}
        <motion.img
          src={ExpiredCoupon}
          alt="Expired coupon"
          className="mx-auto w-60 sm:w-72 max-w-full mb-5 md:mb-6"
          variants={fadeUp}
          animate={{
            rotate: [-2, 2, -2],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
          whileHover={{ scale: 1.06 }}
        />

        {/* Heading */}
        <motion.h1
          className="text-lg md:text-2xl font-semibold text-gray-800 mb-1"
          variants={fadeUp}
        >
          We couldn&apos;t find any matches!
        </motion.h1>

        <motion.p
          className="text-xs md:text-base text-gray-500 mb-5 md:mb-6"
          variants={fadeUp}
        >
          Please check the coupon code or try searching something else.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          className="max-w-xl mx-auto mb-5 md:mb-6 w-full"
          variants={fadeUp}
        >
          <motion.div
            className="flex w-full border border-gray-300 rounded-sm bg-white overflow-hidden shadow-sm"
            animate={{
              boxShadow: isFocused
                ? "0 0 0 1px rgba(59,130,246,0.3), 0 14px 35px rgba(15,23,42,0.14)"
                : "0 8px 22px rgba(15,23,42,0.08)",
              y: isFocused ? -2 : 0,
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <input
              type="text"
              className="flex-1 px-3 py-2 text-sm md:text-base text-gray-700 placeholder-gray-400 focus:outline-none"
              placeholder={currentPlaceholder}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />

            <div className="w-[1px] bg-gray-300" />

            <motion.button
              type="button"
              className="px-5 md:px-6 text-sm font-semibold text-blue-600 hover:text-blue-700"
              whileHover={{ backgroundColor: "rgba(37,99,235,0.06)", y: -1 }}
              whileTap={{
                scale: 0.95,
                boxShadow: "0 0 0 8px rgba(37,99,235,0.18)",
              }}
            >
              SEARCH
            </motion.button>
          </motion.div>

          {/* underline shimmer */}
          <motion.div
            className="h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mt-1 rounded-full"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 0.75, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </motion.div>

        {/* Popular Searches */}
        <motion.p
          className="text-xs md:text-base text-gray-500 leading-relaxed"
          variants={fadeUp}
        >
          Popular searches:{" "}
          <motion.span
            className="text-blue-600"
            animate={{
              textShadow: [
                "0 0 0px rgba(37,99,235,0)",
                "0 0 10px rgba(37,99,235,0.7)",
                "0 0 0px rgba(37,99,235,0)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          >
            Lightweight Chain, Classic Gold Hoops, Pearl Necklace, Pearl
            Earrings, Crystal Necklace, Pearl Hair Clip, Silver Chain, Gold
            Pendant
          </motion.span>
        </motion.p>

        {/* Back Button */}
        <motion.button
          type="button"
          onClick={() => navigate("/coupons")}
          className="mt-8 text-sm md:text-base font-semibold text-pink-600 hover:underline"
          variants={fadeUp}
          whileHover={{
            x: -4,
            textShadow: "0 0 10px rgba(236,72,153,0.8)",
          }}
          whileTap={{
            scale: 0.96,
            boxShadow: "0 0 0 8px rgba(236,72,153,0.2)",
          }}
        >
          ⟵ Back to Coupons
        </motion.button>
      </motion.div>
    </motion.main>
  );
};

export default ExpiredCouponNoResults;
