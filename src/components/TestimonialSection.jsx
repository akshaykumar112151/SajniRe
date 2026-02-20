// src/components/TestimonialSection.jsx
import React, { useState } from "react";
import Profile1 from "../assets/profile1.jpeg";
import Profile2 from "../assets/profile2.jpg";
import Profile3 from "../assets/profile3.jpg";
import { FaStar, FaRegStar, FaQuoteRight } from "react-icons/fa";
import { motion } from "framer-motion";

const testimonials = [
  {
    rating: 3,
    text:
      "Absolutely love the craftsmanship and attention to detail! The piece feels luxurious yet comfortable to wear. I’ve received so many compliments every time I step out with it.",
    title: "Shine With Elegance",
    name: "Kimberly Joe",
    location: "New York",
    image: Profile1,
  },
  {
    rating: 2,
    text:
      "The design is truly one of a kind, and the sparkle is unmatched. It’s the perfect blend of modern elegance and timeless beauty — worth every penny.",
    title: "Timeless Beauty Awaits",
    name: "Stephanie Laura",
    location: "California",
    image: Profile2,
  },
  {
    rating: 4,
    text:
      "From packaging to quality, everything exceeded my expectations. This jewellery doesn’t just look stunning — it tells a story of grace and elegance.",
    title: "Unveil Your Sparkle",
    name: "Kathleen White",
    location: "San Francisco",
    image: Profile3,
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.995 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const quoteVariants = {
  hidden: { opacity: 0, rotate: -8, scale: 0.92 },
  show: {
    opacity: 0.12,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function TestimonialSection() {
  const [loaded, setLoaded] = useState(() => testimonials.map(() => false));

  const handleImageLoad = (index) => {
    setLoaded((prev) => {
      const copy = [...prev];
      copy[index] = true;
      return copy;
    });
  };

  return (
    <section className="bg-[#fef6f0] py-10 sm:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto text-center mb-8 sm:mb-14">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
          className="text-xs sm:text-sm uppercase tracking-[4px] text-gray-500"
        >
          Testimonial
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.04 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#111] mt-2"
        >
          Joyful Moments, Told
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mt-4 text-sm sm:text-base text-gray-600"
        >
          Hear from our delighted customers — their words, their stories, and the little details that made their experience sparkle.
        </motion.p>
      </div>

      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {testimonials.map((t, idx) => (
          <motion.article
            key={idx}
            variants={cardVariants}
            whileHover={{ y: -12, scale: 1.01, boxShadow: "0 30px 70px rgba(17,17,17,0.12)" }}
            whileTap={{ scale: 0.995 }}
            className="relative bg-white p-5 sm:p-6 lg:p-8 rounded-2xl overflow-hidden focus:outline-none focus:ring-4 focus:ring-[rgba(201,141,80,0.12)]"
          >
            {/* Luxury overlay */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,244,230,0.04) 30%, rgba(210,170,120,0.02) 100%)",
                mixBlendMode: "overlay",
              }}
            />

            {/* Quote icon */}
            <motion.div
              className="hidden md:block absolute -top-6 right-6 text-gray-200"
              variants={quoteVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
            >
              <FaQuoteRight className="text-6xl md:text-7xl" />
            </motion.div>

            {/* Stars */}
            <div className="flex items-center mb-4" aria-hidden>
              {[...Array(5)].map((_, i) => {
                const filled = i < t.rating;
                return (
                  <motion.span
                    key={i}
                    whileHover={filled ? { scale: 1.18, rotate: -6 } : { scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`mr-1 ${filled ? "" : "opacity-60"}`}
                  >
                    {filled ? (
                      <FaStar className="text-[#c78b61] w-4 h-4" />
                    ) : (
                      <FaRegStar className="text-[#c78b61] w-4 h-4" />
                    )}
                  </motion.span>
                );
              })}
            </div>

            {/* Text */}
            <motion.p
              initial={{ opacity: 0.98 }}
              whileHover={{ color: "#c78b61" }}
              className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6"
            >
              {t.text}
            </motion.p>

            {/* Profile */}
            <div className="border-t border-gray-100 pt-4 mt-2 flex items-center gap-4">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden flex-shrink-0">
                {!loaded[idx] && (
                  <div
                    className="absolute inset-0 animate-pulse"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(230,230,230,0.06) 50%, rgba(255,255,255,0.02) 100%)",
                    }}
                  />
                )}

                <motion.img
                  src={t.image}
                  onLoad={() => handleImageLoad(idx)}
                  alt={t.name}
                  className={`w-full h-full object-cover rounded-full border-2 border-[#c78b61] transition-all duration-500 ${
                    loaded[idx] ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                  whileHover={{ scale: 1.04 }}
                />
              </div>

              <div className="text-left">
                <p className="text-sm sm:text-base font-semibold text-[#111]">{t.title}</p>
                <p className="text-xs sm:text-sm text-gray-600">
                  - {t.name}, <span className="text-gray-400">{t.location}</span>
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
