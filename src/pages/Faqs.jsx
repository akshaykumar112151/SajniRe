// src/pages/Faqs.jsx
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ---------- PAGE HEADER (same style as PrivacyPolicy) ---------- */
function PageHeader({ title, subtitle }) {
  return (
    <div className="w-full bg-[#fbf2e8] border-b border-[#f0e1d3]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-20 py-8 sm:py-10 md:py-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.35 }}
            className="mt-3 text-xs sm:text-sm md:text-base text-black/70 max-w-2xl mx-auto px-2"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}

/* ---------- MOTION VARIANTS ---------- */
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

/* ---------- REUSABLE ACCORDION (same layout as PrivacyPolicy) ---------- */
function Accordion({ items, openIndex, setOpenIndex, prefix = "" }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-3 sm:space-y-4"
    >
      {items.map((it, idx) => {
        const isOpen = openIndex === idx;

        return (
          <motion.article
            key={idx}
            variants={itemVariants}
            layout
            whileHover={{ y: -2, boxShadow: "0 16px 40px rgba(15,23,42,0.10)" }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="bg-white border border-[#f0e1d3] rounded-2xl shadow-[0_6px_25px_rgba(15,23,42,0.06)] overflow-hidden"
          >
            {/* top row – number + title + show/+ icon  */}
            <div className="flex items-stretch">
              {/* left number badge for desktop */}
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
                  {idx + 1}
                </motion.div>
              </div>

              <button
                id={`${prefix}accordion-btn-${idx}`}
                aria-controls={`${prefix}panel-${idx}`}
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpenIndex(isOpen ? -1 : idx);
                  }
                  if (e.key === "ArrowDown") {
                    const next = (idx + 1) % items.length;
                    document
                      .getElementById(`${prefix}accordion-btn-${next}`)
                      ?.focus();
                  }
                  if (e.key === "ArrowUp") {
                    const prev = (idx - 1 + items.length) % items.length;
                    document
                      .getElementById(`${prefix}accordion-btn-${prev}`)
                      ?.focus();
                  }
                }}
                className={`flex-1 flex items-center justify-between gap-3 sm:gap-4 px-3 sm:px-5 py-3.5 sm:py-4 md:py-5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 ${
                  isOpen ? "bg-white" : "bg-[#faf4ee] hover:bg-[#f5ebe0]"
                }`}
              >
                {/* mobile badge */}
                <div className="sm:hidden mr-3">
                  <div className="w-9 h-9 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 font-semibold text-sm shadow-sm">
                    {idx + 1}
                  </div>
                </div>

                <span className="flex-1 text-sm sm:text-base md:text-lg font-semibold text-gray-900">
                  {it.q}
                </span>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-block text-[11px] sm:text-xs font-medium text-pink-600 uppercase tracking-wide">
                    {isOpen ? "Hide" : "Show"}
                  </span>
                  <motion.span
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 border border-[#ecd9c6] flex items-center justify-center shadow-sm"
                    animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.02 : 1 }}
                    transition={{ duration: 0.18 }}
                    aria-hidden
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-pink-600" />
                    ) : (
                      <Plus className="w-4 h-4 text-pink-600" />
                    )}
                  </motion.span>
                </div>
              </button>
            </div>

            {/* content panel */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${prefix}panel-${idx}`}
                  role="region"
                  aria-labelledby={`${prefix}accordion-btn-${idx}`}
                  key={`${prefix}panel-${idx}`}
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={panelVariants}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.22 }}
                    className="px-4 sm:px-6 md:px-7 pb-4 sm:pb-5 md:pb-6 pt-2 sm:pt-3 border-t border-[#f0e1d3] bg-white text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed text-gray-800"
                  >
                    {it.a}
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

/* ---------- FAQ ITEMS ---------- */
const faqItems = [
  {
    q: "Do you sell anti-tarnish jewellery?",
    a: (
      <p>
        Yes! All our jewellery pieces are anti-tarnish and long-lasting. With
        proper care, they will retain their shine and beauty for years.
      </p>
    ),
  },
  {
    q: "Is your jewellery waterproof?",
    a: (
      <p>
        Our jewellery is designed to resist everyday moisture like sweat or
        light splashes. However, we recommend avoiding direct contact with
        water, perfumes, or chemicals to maintain durability and shine.
      </p>
    ),
  },
  {
    q: "Do you offer Cash on Delivery (COD)?",
    a: (
      <p>
        Yes, we provide COD (Cash on Delivery) service across India for your
        convenience. You can also choose secure online payment methods at
        checkout.
      </p>
    ),
  },
  {
    q: "How long does delivery take?",
    a: (
      <p>
        Your order is usually processed within 24–48 hours. Delivery typically
        takes 4–7 business days depending on your location.
      </p>
    ),
  },
  {
    q: "What is your return or exchange policy?",
    a: (
      <div>
        <p>
          Returns / exchanges are accepted <b>only</b> in the following cases
          and must be reported <b>within 24 hours</b> of delivery:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Damaged or defective on arrival.</li>
          <li>Wrong product delivered (different design/size/colour).</li>
        </ul>
        <p className="mt-2">
          <b>Mandatory proof:</b> A single, continuous, unedited 360° unboxing
          video from the sealed parcel (shipping label visible). Edited/paused
          videos or only photos are not accepted.
        </p>
        <p className="mt-2">
          <b>Time limit:</b> Your claim and the required video must be sent
          within 24 hours of delivery at{" "}
          <a
            href="mailto:sajnire2922@gmail.com"
            className="text-pink-600 underline"
          >
            sajnire2922@gmail.com
          </a>{" "}
          or{" "}
          <a href="tel:+919123140229" className="text-pink-600 underline">
            +91 9123140229
          </a>
          .
        </p>
        <p className="mt-2">
          The item must be <b>unused</b> and returned in its{" "}
          <b>original packaging</b> with invoice, tags, pouch and any
          certificates/freebies.
        </p>
      </div>
    ),
  },
  {
    q: "Can I gift your jewellery to someone special?",
    a: (
      <p>
        Absolutely! You can mark your order as a &quot;gift&quot; at checkout.
        We’ll pack it beautifully and deliver it directly to your loved one.
      </p>
    ),
  },
  {
    q: "Can I visit your store?",
    a: (
      <p>
        Yes, you are most welcome to visit us at our store: LIC Building, 113
        F/28, Road, opposite Post Office, Sanjay Palace, Civil Lines, Agra,
        Uttar Pradesh 282002.
      </p>
    ),
  },
  {
    q: "How can I track my order?",
    a: (
      <p>
        Once your order is shipped, you’ll receive a confirmation SMS and email
        with a tracking link so you can monitor your delivery status in real
        time.
      </p>
    ),
  },
];

/* ---------- PAGE COMPONENT ---------- */
export default function Faqs() {
  const [openFAQ, setOpenFAQ] = useState(0);

  return (
    <motion.main
      className="bg-[#fbf2e8] min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      {/* Top hero */}
      <PageHeader
        title="FAQs"
        subtitle="Find quick answers to the most common questions about Sajni Re jewellery, orders and returns."
      />

      {/* FAQ Section – same layout as PrivacyPolicy sections */}
      <motion.section
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-20 pt-6 sm:pt-8 md:pt-10 pb-12 sm:pb-14 md:pb-16"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-black mb-4 sm:mb-5 md:mb-6"
        >
          Frequently Asked Questions
        </motion.h2>

        <Accordion
          items={faqItems}
          openIndex={openFAQ}
          setOpenIndex={setOpenFAQ}
          prefix="faq-"
        />

        {/* bottom helper text */}
        <div className="mt-8 sm:mt-10 text-center text-[11px] sm:text-xs md:text-sm text-gray-600 px-4">
          Didn&apos;t find your answer? Reach out at{" "}
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
