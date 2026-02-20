// src/pages/Shipping.jsx
import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Shipping.jsx
 * - Same interface/animations as updated Terms & Privacy pages
 * - Cream background, big hero heading, animated accordion cards
 * - Keyboard navigation (Enter/Space toggles, ArrowUp/ArrowDown moves focus)
 */

const shippingInfo = [
  {
    title: "Shipping Time",
    content:
      "At Sajni Re, we strive to deliver your orders as quickly as possible. Once your order is shipped, it will be delivered within 4-8 days.",
  },
  {
    title: "Order Processing Time",
    content:
      "Orders are processed and shipped within 2-3 business days after receiving your order confirmation. You will receive a notification when your order has been shipped.",
  },
  {
    title: "Shipping Confirmation and Tracking",
    content:
      "Once your order has been shipped, you will receive a shipping confirmation email with tracking information. You can use the tracking number to check the status of your delivery.",
  },
  {
    title: "Shipping Charges",
    content:
      "Shipping charges are calculated at checkout based on your location and the weight of your order. Any applicable charges will be displayed before you complete your purchase.",
  },
  {
    title: "Delivery Time",
    content:
      "We aim to deliver all orders within 4-8 days of shipping. Delivery times may vary depending on your location and unforeseen delays with the carrier.",
  },
  {
    title: "Delays",
    content:
      "While we strive for timely delivery, there may be delays due to weather, customs, or other reasons beyond our control. We appreciate your understanding.",
  },
  {
    title: "Contact Us",
    content: (
      <p className="text-xs sm:text-sm md:text-[15px]">
        <strong>Email:</strong>{" "}
        <a
          href="mailto:sajnire2922@gmail.com"
          className="text-pink-600 hover:underline"
        >
          sajnire2922@gmail.com
        </a>
        <br />
        <strong>Phone:</strong>{" "}
        <a
          href="tel:+919123140229"
          className="text-pink-600 hover:underline"
        >
          +91 9123140229
        </a>
        <br />
        <strong>Address:</strong>{" "}
        <span className="block whitespace-pre-line">
          LIC Building, 113 F/28, Road, opposite Post Office,
          {"\n"}Sanjay Palace, Civil Lines, Agra, Uttar Pradesh 282002
        </span>
      </p>
    ),
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

const panelVariants = {
  collapsed: { height: 0, opacity: 0 },
  open: { height: "auto", opacity: 1 },
};

/* ---------- Accordion (same style as Terms/Privacy) ---------- */
function ShippingAccordion({ items, openIndex, setOpenIndex, prefix = "ship-" }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-3 sm:space-y-4"
    >
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <motion.article
            key={index}
            variants={itemVariants}
            layout
            whileHover={{ y: -2, boxShadow: "0 16px 40px rgba(15,23,42,0.10)" }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="bg-white border border-gray-200 rounded-2xl shadow-[0_6px_25px_rgba(15,23,42,0.06)] overflow-hidden"
          >
            <div className="flex items-stretch">
              {/* Left numeric badge (desktop) */}
              <div className="hidden sm:flex items-center pl-4 sm:pl-5 pr-2 sm:pr-3">
                <motion.div
                  initial={{ scale: 0.96, opacity: 0.9 }}
                  animate={{
                    scale: isOpen ? 1.06 : 1,
                    boxShadow: isOpen
                      ? "0 10px 30px rgba(236,72,153,0.35)"
                      : "0 4px 16px rgba(15,23,42,0.12)",
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 font-semibold text-sm sm:text-base select-none"
                  aria-hidden
                >
                  {index + 1}
                </motion.div>
              </div>

              {/* Header button */}
              <button
                id={`${prefix}accordion-btn-${index}`}
                aria-controls={`${prefix}panel-${index}`}
                aria-expanded={isOpen}
                onClick={() =>
                  setOpenIndex((prev) => (prev === index ? null : index))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpenIndex((prev) => (prev === index ? null : index));
                  }
                  if (e.key === "ArrowDown") {
                    const next = (index + 1) % items.length;
                    document
                      .getElementById(`${prefix}accordion-btn-${next}`)
                      ?.focus();
                  }
                  if (e.key === "ArrowUp") {
                    const prev = (index - 1 + items.length) % items.length;
                    document
                      .getElementById(`${prefix}accordion-btn-${prev}`)
                      ?.focus();
                  }
                }}
                className={`flex-1 flex items-center justify-between gap-3 sm:gap-4 px-3 sm:px-5 py-3.5 sm:py-4 md:py-5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 ${
                  isOpen ? "bg-white" : "bg-[#faf4ee] hover:bg-[#f5ebe0]"
                }`}
              >
                {/* Mobile badge */}
                <div className="sm:hidden mr-3">
                  <div className="w-9 h-9 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 font-semibold text-sm shadow-sm">
                    {index + 1}
                  </div>
                </div>

                <span className="flex-1 text-sm sm:text-base md:text-lg font-semibold text-gray-900">
                  {item.title}
                </span>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-block text-[11px] sm:text-xs font-medium text-pink-600 uppercase tracking-wide">
                    {isOpen ? "Hide" : "Show"}
                  </span>
                  <motion.span
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center shadow-sm"
                    animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.02 : 1 }}
                    transition={{ duration: 0.18 }}
                    aria-hidden
                  >
                    {isOpen ? (
                      <FaMinus className="text-pink-600 text-xs sm:text-sm" />
                    ) : (
                      <FaPlus className="text-pink-600 text-xs sm:text-sm" />
                    )}
                  </motion.span>
                </div>
              </button>
            </div>

            {/* Content panel */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${prefix}panel-${index}`}
                  role="region"
                  aria-labelledby={`${prefix}accordion-btn-${index}`}
                  key={`${prefix}panel-${index}`}
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={panelVariants}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.22 }}
                    className="px-4 sm:px-6 md:px-7 pb-4 sm:pb-5 md:pb-6 pt-2 sm:pt-3 border-t border-gray-200 bg-white text-gray-700 text-xs sm:text-sm md:text-[15px] leading-relaxed"
                  >
                    {item.content}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.article>
        );
      })}
    </motion.div>
  );
}

export default function Shipping() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <motion.main
      className="min-h-screen bg-[#fbf2e8]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      {/* Hero */}
      <div className="w-full bg-[#fbf2e8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-20 py-8 sm:py-10 md:py-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 6, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.42, ease: "easeOut" }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight"
          >
            Shipping &amp; Delivery
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06, duration: 0.36 }}
            className="mt-3 text-xs sm:text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-2"
          >
            Delivery details, charges, and tracking information. Click any item
            to expand and read more.
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <motion.section
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-20 pb-12 sm:pb-14 md:pb-16"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <ShippingAccordion
          items={shippingInfo}
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
        />
      </motion.section>
    </motion.main>
  );
}
