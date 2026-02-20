// src/components/HeroBanner.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import ModelImage from "../assets/model-main.jpg";
import Thumb1 from "../assets/thumb1.jpg";
import Thumb2 from "../assets/thumb2.jpg";
import Thumb3 from "../assets/thumb3.jpg";
import Thumb4 from "../assets/thumb4.jpg";
import RingImage from "../assets/ring.png";
import BraceletImage from "../assets/bracelet.png";

const HeroBanner = () => {
  const [centerImage, setCenterImage] = useState(ModelImage);
  const thumbnails = [Thumb1, Thumb2, Thumb3, Thumb4];

  return (
    <section className="relative flex flex-col md:flex-row min-h-[650px] md:min-h-screen w-full overflow-hidden font-serif bg-white">
      {/* ---------- CENTER IMAGE (DESKTOP / TABLET) ---------- */}
      <div className="hidden md:flex absolute inset-0 items-center justify-center z-30 pointer-events-none">
        <motion.div
          key={centerImage}
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="
            w-[300px] sm:w-[340px] md:w-[420px] lg:w-[480px] xl:w-[520px]
            aspect-[4/5]
            overflow-hidden rounded-tl-[110px] md:rounded-tl-[140px]
            border-[2px] border-[#D7B97F] shadow-2xl group
            transition duration-500 ease-in-out
            hover:shadow-[0_0_55px_12px_rgba(215,185,127,0.9)]
            -translate-y-6
            md:-translate-x-36 lg:-translate-x-48 xl:-translate-x-56
            pointer-events-auto
          "
        >
          <img
            src={centerImage}
            alt="Jewellery Model"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
          />
        </motion.div>
      </div>

      {/* ---------- LEFT SIDE (ONLY DESKTOP) ---------- */}
      <div className="relative bg-[#f3e7dc] w-1/2 hidden md:flex items-center justify-center px-4 font-marcellus">
        {/* Vertical SAJNI RE */}
        <div className="absolute left-5 top-1/2 transform -translate-y-1/2 rotate-[-90deg] 
          text-[40px] lg:text-[48px] text-gray-500 tracking-[0.8em]">
          Sajni Re
        </div>

        {/* Thumbnails */}
        <div className="z-20 flex flex-col space-y-16 ml-[-120px]">
          {thumbnails.map((thumb, idx) => (
            <img
              key={idx}
              src={thumb}
              onClick={() => setCenterImage(thumb)}
              alt={`Thumb ${idx + 1}`}
              className={`w-[115px] h-[115px] rounded-xl object-cover border-2 
                shadow-md cursor-pointer transition duration-500 ease-in-out
                hover:scale-105 hover:border-[#D7B97F] hover:shadow-[0_0_30px_8px_rgba(215,185,127,1)]
                ${
                  centerImage === thumb
                    ? "border-[#D7B97F] shadow-[0_0_30px_8px_rgba(215,185,127,0.8)]"
                    : "border-white"
                }`}
            />
          ))}
        </div>
      </div>

      {/* ---------- RIGHT SIDE (MOBILE + DESKTOP CONTENT) ---------- */}
      <div className="relative w-full md:w-1/2 bg-white px-6 sm:px-10 py-10 sm:py-12 flex flex-col justify-center items-start md:pl-72 font-marcellus">
        {/* Soft glow BG (desktop only) */}
        <div className="hidden md:block absolute -right-32 top-10 w-80 h-80 rounded-full bg-[#fff6ea] blur-3xl opacity-70 pointer-events-none" />

        {/* MOBILE CENTER IMAGE (no overlap, full visible) */}
        <div className="w-full flex justify-center mb-6 md:hidden">
          <motion.div
            key={centerImage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="
              w-[260px] sm:w-[280px]
              aspect-[4/5]
              overflow-hidden rounded-tl-[90px]
              border-[2px] border-[#D7B97F] shadow-2xl group
            "
          >
            <img
              src={centerImage}
              alt="Jewellery Model"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
            />
          </motion.div>
        </div>

        {/* Text content */}
        <p className="uppercase text-xs sm:text-sm tracking-[0.3em] text-[#c19065] mb-3">
          Timeless Craftsmanship
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight max-w-[600px]">
          Where Every Piece <br /> Tells a Story of Grace
        </h1>

        <p className="text-gray-600 mt-4 max-w-md text-sm sm:text-base leading-relaxed">
          Discover exquisite jewellery handcrafted to perfection. At Sajni Re,
          every design echoes tradition and elegance — made to celebrate your
          special moments with a sparkle that lasts forever.
        </p>

        {/* Decorative jewellery images (desktop only) */}
        <div className="absolute bottom-6 right-6 flex gap-6 hidden md:flex">
          <img
            src={RingImage}
            className="w-[230px] lg:w-[270px] transition duration-500 ease-in-out hover:scale-110"
            alt="Ring"
          />
          <img
            src={BraceletImage}
            className="w-[280px] lg:w-[330px] transition duration-500 ease-in-out hover:scale-110"
            alt="Bracelet"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
