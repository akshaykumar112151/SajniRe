// src/pages/Refund.jsx
import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Refund.jsx
 * - Same interface/animations as Terms.jsx & Shipping.jsx
 * - Cream background, big hero heading, animated accordion cards
 * - Number badge separated from title
 * - Accessible (aria attributes, keyboard navigation)
 */

const refundPolicy = [
  {
    title: "Eligible Cases for Return / Exchange",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Damaged or defective on arrival.</li>
        <li>Wrong product delivered (different design/size/colour).</li>
      </ul>
    ),
  },
  {
    title: "Mandatory Proof",
    content: (
      <p className="leading-relaxed text-gray-700 text-xs sm:text-sm md:text-[15px]">
        A single, continuous, unedited 360° unboxing video of the sealed parcel
        (with shipping label visible) till complete inspection of the jewellery
        is required. Edited/paused videos or only photos will not be accepted.
      </p>
    ),
  },
  {
    title: "Time Limit",
    content: (
      <p className="leading-relaxed text-gray-700 text-xs sm:text-sm md:text-[15px]">
        Your claim along with the required unboxing video must be sent to our
        team within <strong>24 hours</strong> of delivery at{" "}
        <a
          href="mailto:sajnire2922@gmail.com"
          className="text-pink-600 hover:underline"
        >
          sajnire2922@gmail.com
        </a>{" "}
        or{" "}
        <a
          href="tel:+919123140229"
          className="text-pink-600 hover:underline"
        >
          +91 9123140229
        </a>
        .
      </p>
    ),
  },
  {
    title: "Condition of Item",
    content: (
      <p className="leading-relaxed text-gray-700 text-xs sm:text-sm md:text-[15px]">
        The item must be unused and returned in its original packaging with
        invoice, tags, pouch, and any certificates/freebies.
      </p>
    ),
  },
  {
    title: "Contact Us",
    content: (
      <div className="leading-relaxed text-gray-700 text-xs sm:text-sm md:text-[15px]">
        <p>
          <strong>Email:</strong>{" "}
          <a
            href="mailto:sajnire2922@gmail.com"
            className="text-pink-600 hover:underline"
          >
            sajnire2922@gmail.com
          </a>
        </p>
        <p>
          <strong>Phone:</strong>{" "}
          <a
            href="tel:+919123140229"
            className="text-pink-600 hover:underline"
          >
            +91 9123140229
          </a>
        </p>
        <p className="mt-2">
          <strong>Address:</strong>
        </p>
        <p className="whitespace-pre-line">
          LIC Building, 113 F/28, Road, opposite Post Office,
          {"\n"}Sanjay Palace, Civil Lines, Agra, Uttar Pradesh 282002
        </p>
      </div>
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

/* ---------- Accordion (same style/animations as Terms/Shipping) ---------- */
function RefundAccordion({ items, openIndex, setOpenIndex, prefix = "refund-" }) {
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
                    transition={{ duration: 0.24 }}
                    className="px-4 sm:px-6 md:px-7 pb-4 sm:pb-5 md:pb-6 pt-2 sm:pt-3 border-top border-gray-200 bg-white"
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

export default function Refund() {
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
            Cancellation &amp; Refund
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06, duration: 0.36 }}
            className="mt-3 text-xs sm:text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-2"
          >
            Read the policy carefully — follow the unboxing &amp; reporting steps to
            ensure a smooth refund/exchange.
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
        <RefundAccordion
          items={refundPolicy}
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
        />

        {/* Bottom helper text */}
        <div className="mt-8 sm:mt-10 text-center text-[11px] sm:text-xs md:text-sm text-gray-600 px-4">
          Still have questions? Reach out at{" "}
          <a
            href="mailto:sajnire2922@gmail.com"
            className="text-pink-600 font-medium hover:underline"
          >
            sajnire2922@gmail.com
          </a>{" "}
          or call{" "}
          <a
            href="tel:+919123140229"
            className="text-pink-600 font-medium hover:underline"
          >
            +91 9123140229
          </a>
          .
        </div>
      </motion.section>
    </motion.main>
  );
}
