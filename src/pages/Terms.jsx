// src/pages/Terms.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

/**
 * Terms.jsx
 * - Same animation pattern as PrivacyPolicy.jsx
 * - Left numeric badge, hover lift effect, smooth open/close
 * - Keyboard accessible (Enter/Space toggle, ArrowUp/ArrowDown focus move)
 */

const termsData = [
  {
    title: "Introduction",
    content: `Welcome to Sajni Re! These terms and conditions outline the rules and regulations 
    for the use of Sajni Re's Website, located at https://sajnire.co/. 
    By accessing this website, we assume you accept these terms and conditions. 
    Do not continue to use Sajni Re if you do not agree to all of the terms and conditions stated on this page.

    By accessing and placing an order with Sajni Re, you confirm that you are in agreement with and bound 
    by the terms and conditions contained herein. These terms apply to the entire website and any email or 
    other type of communication between you and Sajni Re.`,
  },
  {
    title: "Products",
    content: `We strive to display as accurately as possible the colors, features, specifications, 
    and details of the products available on the Site. However, we do not guarantee accuracy, completeness, 
    reliability, or that your electronic display will reflect the actual product details. 
    All products are subject to availability and we reserve the right to discontinue any product at any time. 
    Prices for products are subject to change.`,
  },
  {
    title: "Orders",
    content: `When you place an order, you agree that you are purchasing goods in accordance 
    with the description set out in the product listing. Any discrepancies should be addressed 
    with our support team prior to placing your order. We reserve the right to refuse or cancel 
    any order for reasons including but not limited to product availability, inaccuracies, 
    or errors in product or pricing information.`,
  },
  {
    title: "Pricing & Payment",
    content: `All prices on our website are listed in INR (₹) and are inclusive of applicable taxes where mentioned. 
    We accept the following payment methods: UPI, Debit/Credit Cards, Net Banking, and Wallets. 
    By providing payment information, you confirm that you are authorized to use the payment method. 
    We reserve the right to refuse or cancel orders if fraud or unauthorized transactions are suspected.`,
  },
  {
    title: "Shipping & Delivery",
    content: `We will deliver the goods to the address you specify in your order. 
    While we aim to deliver by the quoted date, delivery times are not guaranteed. 
    If delays occur due to reasons beyond our control, we will contact you to arrange a new delivery date.`,
  },
  {
    title: "Returns & Exchanges",
    content: `Returns / exchanges are accepted only in the following cases and must be reported within 24 hours of delivery:

- Damaged or defective on arrival.  
- Wrong product delivered (different design/size/colour).  

Mandatory Proof: A single, continuous, unedited 360° unboxing video from the sealed parcel (shipping label visible) till complete inspection of the jewellery. Edited/paused videos or only photos are not accepted.  

Time Limit: Your claim and the required 360° unboxing video must be sent to our team within 24 hours of delivery at sajnire2922@gmail.com or +91 9123140229.  

The item must be unused and returned in its original packaging with invoice, tags, pouch, and any certificates/freebies.`,
  },
  {
    title: "Contact Us",
    content: `If you have any questions about these Terms, please contact us:

Sajni Re
Email: sajnire2922@gmail.com
Mobile: +91 9123140229`,
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

/* ---------- Accordion (same style/animations as PrivacyPolicy) ---------- */
function TermsAccordion({ items, openIndex, setOpenIndex, prefix = "terms-" }) {
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

              {/* Button row */}
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
                    className="px-4 sm:px-6 md:px-7 pb-4 sm:pb-5 md:pb-6 pt-2 sm:pt-3 border-t border-gray-200 bg-white text-gray-700 text-xs sm:text-sm md:text-[15px] whitespace-pre-line leading-relaxed"
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

export default function Terms() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <motion.main
      className="bg-[#fdf6f2] min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      {/* Hero */}
      <div className="w-full bg-[#fdf6f2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-20 py-8 sm:py-10 md:py-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 6, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.42, ease: "easeOut" }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-0 text-[#3a2d2d] leading-tight"
          >
            Terms and Conditions
          </motion.h1>
        </div>
      </div>

      {/* Content */}
      <motion.section
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-20 pt-6 sm:pt-8 md:pt-10 pb-12 sm:pb-14 md:pb-16 text-[#3a2d2d]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-4 sm:mb-5 md:mb-6"
        >
          Please Read Our Terms Carefully
        </motion.h2>

        <TermsAccordion
          items={termsData}
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
        />
      </motion.section>
    </motion.main>
  );
}
