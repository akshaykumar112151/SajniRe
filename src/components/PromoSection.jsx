// src/components/PromoSection.jsx
import React from "react";
import { motion } from "framer-motion";
import diamondring from "../assets/diamondring.png";
import RingWithBox from "../assets/RingWithBox.png";
import RingsSet1 from "../assets/RingsSet1.png";
import Chain from "../assets/Chain.png";
import {
  FaTags,
  FaGem,
  FaTruck,
  FaHandHoldingUsd,
} from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const PromoSection = () => {
  return (
    <section className="bg-amber-50 py-12 px-4 sm:px-8 md:px-16 font-marcellus">

      {/* ---- HEADING ---- */}
      <motion.div
        className="text-center max-w-6xl mx-auto mb-12"
        initial="hidden"
        whileInView="show"
        variants={fadeUp}
        viewport={{ once: true, amount: 0.3 }}
      >
        <p className="text-xs sm:text-sm tracking-widest text-amber-700 font-medium">
          JEWELS AS UNIQUE AS YOU ARE
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 leading-relaxed mt-4">
          ELEGANCE IS TIMELESS, AND SO IS OUR JEWELRY{" "}
          <img
            src={diamondring}
            alt="Diamond Ring"
            className="inline-block w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mx-1"
          />
          DESIGNED WITH CARE. EACH PIECE{" "}
          <img
            src={RingWithBox}
            alt="Ring With Box"
            className="inline-block w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mx-1"
          />
          REFLECTS YOUR UNIQUE STORY{" "}
          <img
            src={RingsSet1}
            alt="Rings Set"
            className="inline-block w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mx-1"
          />
          MAKING EVERY MOMENT{" "}
          <img
            src={Chain}
            alt="Chain"
            className="inline-block w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mx-1"
          />
          UNFORGETTABLE AND EVERY LOOK ICONIC.
        </h2>
      </motion.div>

      {/* ---- FEATURES GRID ---- */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto text-center"
        initial="hidden"
        whileInView="show"
        variants={fadeUp}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="bg-white rounded-lg py-6 shadow-sm hover:shadow-md transition">
          <FaTags className="text-3xl sm:text-4xl text-amber-600 mx-auto mb-2" />
          <p className="font-medium text-gray-700 text-sm sm:text-base">
            Special Discounts
          </p>
        </div>

        <div className="bg-white rounded-lg py-6 shadow-sm hover:shadow-md transition">
          <FaGem className="text-3xl sm:text-4xl text-amber-600 mx-auto mb-2" />
          <p className="font-medium text-gray-700 text-sm sm:text-base">
            Unique Designs
          </p>
        </div>

        <div className="bg-white rounded-lg py-6 shadow-sm hover:shadow-md transition">
          <FaTruck className="text-3xl sm:text-4xl text-amber-600 mx-auto mb-2" />
          <p className="font-medium text-gray-700 text-sm sm:text-base">
            Fast Shipping
          </p>
        </div>

        <div className="bg-white rounded-lg py-6 shadow-sm hover:shadow-md transition">
          <FaHandHoldingUsd className="text-3xl sm:text-4xl text-amber-600 mx-auto mb-2" />
          <p className="font-medium text-gray-700 text-sm sm:text-base">
            Great Prices
          </p>
        </div>
      </motion.div>

      {/* ---- AUTHOR ---- */}
      <motion.div
        className="mt-12 text-center"
        initial="hidden"
        whileInView="show"
        variants={fadeUp}
        viewport={{ once: true, amount: 0.3 }}
      >
        <p className="italic text-gray-700 text-lg">Piku Sahu</p>
        <p className="text-sm text-gray-500">Founder, Sajni Re</p>
      </motion.div>

    </section>
  );
};

export default PromoSection;