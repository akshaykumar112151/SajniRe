// src/components/TopStrip.jsx
import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

const TopStrip = () => {
  return (
    <div
      id="header-34"
      className="w-full bg-black text-white text-sm py-2 md:py-3"
      role="region"
      aria-label="Top announcement strip"
    >
      <div className="max-w-screen-xl mx-auto px-3 md:px-4">
        <div className="flex items-center justify-between">
          {/* Left: social icons (fixed group) */}
          <div className="flex items-center gap-2 md:gap-4 flex-none">
            <a
              href="https://www.facebook.com/share/1B8TReA2PD/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-1 md:p-1.5 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <FaFacebookF className="text-base md:text-2xl" />
            </a>

            <a
              href="https://www.instagram.com/sajnire2922?igsh=ZnRoejU3M2F5OXJl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-1 md:p-1.5 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <FaInstagram className="text-base md:text-2xl" />
            </a>

            <a
              href="https://wa.me/919123140229"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="p-1 md:p-1.5 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <FaWhatsapp className="text-base md:text-2xl" />
            </a>
          </div>

          {/* Center: single-line message, truncate if not enough space */}
          <div className="flex-1 px-3 text-center min-w-0">
            {/* min-w-0 is important so truncate works in flex children */}
            <p
              className="truncate text-xs md:text-sm lg:text-base font-semibold tracking-wide"
              title="Exclusive Engagement Rings — Your Perfect Choice!"
            >
              ✨ Exclusive Engagement Rings — Your Perfect Choice! ✨
            </p>
          </div>

          {/* Right: invisible placeholder with same structure to balance center alignment */}
          <div
            className="flex items-center gap-2 md:gap-4 flex-none invisible"
            aria-hidden="true"
          >
            <span className="p-1 md:p-1.5 rounded-full" />
            <span className="p-1 md:p-1.5 rounded-full" />
            <span className="p-1 md:p-1.5 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopStrip;
