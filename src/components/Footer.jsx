// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Images
import Logo from "../assets/Logo.png";
import GPlay from "../assets/google-play.jpg";
import AppStore from "../assets/app-store.jpg";
import Thumb4 from "../assets/thumb4.jpg";
import Thumb2 from "../assets/thumb2.jpg";
import Bottom1 from "../assets/bottom1.jpg";
import Bottom2 from "../assets/bottom2.jpg";
import Bottom3 from "../assets/bottom3.jpg";
import Bottom4 from "../assets/bottom4.jpg";
import FooterBg from "../assets/footer-bg.png";
import PaymentLogos from "../assets/Payment-Logos.png";

const galleryImages = [Thumb4, Thumb2, Bottom1, Bottom2, Bottom3, Bottom4];

const containerVars = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function Footer() {
  return (
    <motion.footer
      className="relative text-white bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${FooterBg})` }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVars}
      aria-labelledby="footer-heading"
    >
      {/* soft overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,5,5,0.10) 0%, rgba(0,0,0,0.28) 50%, rgba(0,0,0,0.44) 100%)",
          mixBlendMode: "multiply",
        }}
      />

      {/* Top Footer */}
      <motion.div
        variants={fadeUp}
        className="relative z-10 py-14 container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10"
      >
        {/* Instagram Gallery */}
        <motion.div variants={fadeUp} className="order-1">
          <h3 id="footer-heading" className="text-lg font-semibold mb-4">
            @SajniRe
          </h3>

          <div className="grid grid-cols-3 gap-3">
            {galleryImages.map((img, i) => (
              <motion.button
                key={i}
                variants={{
                  hidden: { opacity: 0, scale: 0.98 },
                  show: { opacity: 1, scale: 1, transition: { duration: 0.45, delay: i * 0.04 } },
                }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.98 }}
                className="p-0 block w-full h-20 sm:h-24 rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-amber-300"
                aria-label={`Gallery image ${i + 1}`}
              >
                <img
                  src={img}
                  alt={`gallery-${i}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300"
                />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={fadeUp} className="order-3 sm:order-2">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About Us" },
              { to: "/shop", label: "Shop" },
              { to: "/collection/bracelets", label: "Collection" },
            ].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="relative group inline-block text-white/95 hover:text-white transition-colors"
                >
                  {item.label}
                  <span className="absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 w-0 group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* More Information */}
        <motion.div variants={fadeUp} className="order-4 sm:order-3">
          <h3 className="text-lg font-semibold mb-4">More Information</h3>
          <ul className="space-y-3 text-sm">
            {[
              { to: "/privacypolicy", label: "Privacy Policy" },
              { to: "/terms", label: "Terms & Conditions" },
              { to: "/shipping", label: "Shipping & Delivery" },
              { to: "/refund", label: "Cancellation & Refund" },
              { to: "/faqs", label: "FAQs" },
            ].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="relative group inline-block text-white/95 hover:text-white transition-colors"
                >
                  {item.label}
                  <span className="absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 w-0 group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Us */}
        <motion.address variants={fadeUp} className="not-italic text-sm order-2 sm:order-4">
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>

          <p className="mb-2">
            <span className="font-medium">Email:</span>{" "}
            <a
              href="mailto:sajnire2922@gmail.com"
              className="relative group inline-block text-white/95 hover:text-white transition-colors"
            >
              sajnire2922@gmail.com
              <span className="absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 w-0 group-hover:w-full transition-all duration-300" />
            </a>
          </p>

          <p className="mb-2">
            <span className="font-medium">Phone:</span>{" "}
            <a href="tel:+919123140229" className="text-white/95 hover:text-white transition-colors">
              +91 9123140229
            </a>
          </p>

          <p className="mb-3 leading-relaxed text-sm text-white/90">
            <span className="font-medium">Address:</span> LIC Building, 113 F/28 Road, opposite Post office,
            Sanjay Palace, Sanjay Place, Civil Lines, Agra, Uttar Pradesh 282002
          </p>

          <p>
            <a
              href="https://wa.me/919123140229"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/95 hover:text-white transition-colors"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-[#00C857] shadow-[0_0_8px_rgba(0,200,87,0.35)]" aria-hidden />
              💬 Chat on WhatsApp
            </a>
          </p>
        </motion.address>

        {/* Brand Info — UPDATED: Balanced layout, no heavy hover rotation */}
        <motion.div variants={fadeUp} className="order-5">
          {/* Responsive: column on small screens (centered), row on sm+ (logo left, text right) */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 mb-4">
            {/* Logo: slightly larger, subtle scale on hover only */}
            <motion.img
              src={Logo}
              alt="Sajni Re"
              loading="lazy"
              className="w-24 h-24 object-contain rounded-sm"
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 260 }}
            />

            {/* Title + subtitle: vertically centered next to logo on wider screens */}
            <div className="text-center sm:text-left">
              <h4 className="text-3xl sm:text-3xl font-bold leading-tight">Sajni Re</h4>
              <p className="text-sm text-white/80 mt-1">Timeless Jewellery</p>
            </div>
          </div>

          <p className="text-sm mb-4 leading-relaxed text-white/90 max-w-sm">
            Discover timeless elegance with Sajni Re. From intricate designs to modern classics,
            our jewellery celebrates every moment with unmatched beauty and craftsmanship.
          </p>

          <div className="flex gap-3 items-center">
            <motion.img
              src={GPlay}
              alt="Google Play"
              className="h-10 object-contain rounded shadow-sm"
              loading="lazy"
              whileHover={{ scale: 1.04, boxShadow: "0 12px 30px rgba(0,0,0,0.12)" }}
            />
            <motion.img
              src={AppStore}
              alt="App Store"
              className="h-10 object-contain rounded shadow-sm"
              loading="lazy"
              whileHover={{ scale: 1.04, boxShadow: "0 12px 30px rgba(0,0,0,0.12)" }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Footer */}
      <motion.div variants={fadeUp} className="relative z-10 border-t border-white/20 py-4 text-sm">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/80">© {new Date().getFullYear()} SajniRe — All Rights Reserved</p>

          <motion.img
            src={PaymentLogos}
            alt="Payment Methods"
            className="h-6 object-contain"
            loading="lazy"
            whileHover={{ scale: 1.03 }}
          />

          <div className="flex gap-4 text-white/80 items-center">
            <Link to="/terms" className="relative group inline-block hover:text-white transition-colors">
              Terms & Conditions
              <span className="absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 w-0 group-hover:w-full transition-all duration-300" />
            </Link>
            <span aria-hidden>|</span>
            <Link to="/privacypolicy" className="relative group inline-block hover:text-white transition-colors">
              Privacy Policy
              <span className="absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 w-0 group-hover:w-full transition-all duration-300" />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
}
