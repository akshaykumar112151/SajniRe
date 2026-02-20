// src/pages/PrivacyPolicy.jsx
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ---------- PAGE HEADER (without breadcrumb) ---------- */
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

/* ---------- REUSABLE ACCORDION (layout like screenshot) ---------- */
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

/* ---------- PRIVACY ITEMS ---------- */
const privacyItems = [
  {
    q: "Introduction",
    a: (
      <p>
        Welcome to <b>Sajni Re</b>—an online store for contemporary and
        traditional jewellery. You can browse our catalogue, add items to cart,
        and purchase products securely on our website.
      </p>
    ),
  },
  {
    q: "What Information Do We Collect?",
    a: (
      <>
        <p>We may collect the following categories of information:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>
            <b>Contact &amp; Account:</b> Name, Email, Phone, Shipping/Billing
            Address.
          </li>
          <li>
            <b>Order &amp; Transaction:</b> Items Purchased, Order Value,
            Delivery Notes.
          </li>
          <li>
            <b>Payment:</b> Processed securely by our payment partners (e.g.,
            Razorpay/Stripe). We do not store full card details.
          </li>
          <li>
            <b>Communications:</b> Emails, Chats, or Forms you send us.
          </li>
          <li>
            <b>Usage Data:</b> IP, Device/Browser Info, Pages Visited, Time
            Spent, Referrals.
          </li>
          <li>
            <b>Cookies</b> to remember preferences and improve performance.
          </li>
        </ul>
      </>
    ),
  },
  {
    q: "How Do We Use Your Information?",
    a: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Process, fulfill, and deliver your orders.</li>
        <li>Communicate about orders, updates, and support.</li>
        <li>Personalize content, recommendations, and offers.</li>
        <li>Run analytics and improve our website &amp; services.</li>
        <li>Prevent fraud, ensure security, and comply with law.</li>
      </ul>
    ),
  },
  {
    q: "Cookies & Tracking Technologies",
    a: (
      <p>
        We use cookies and similar technologies to keep you signed in, remember
        preferences, measure traffic, and improve performance. You can control
        cookies in your browser settings; disabling some may affect site
        functionality.
      </p>
    ),
  },
  {
    q: "Sharing With Third Parties",
    a: (
      <>
        <p>We may share information with:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>
            <b>Service providers</b> (payment gateways, shipping partners,
            hosting, analytics, support tools) as needed to provide services.
          </li>
          <li>
            <b>Legal authorities</b> when required by law or to protect rights
            and safety.
          </li>
          <li>
            <b>Business transfers</b> in case of merger, acquisition, or asset
            sale.
          </li>
        </ul>
        <p className="mt-2">
          <b>We do not sell</b> personal data.
        </p>
      </>
    ),
  },
  {
    q: "Data Retention & Security",
    a: (
      <>
        <p>
          We keep personal data only as long as necessary for services,
          legal/tax obligations, dispute resolution, and enforcement. When no
          longer required, we delete or anonymize it.
        </p>
        <p className="mt-2">
          We use reasonable safeguards to protect your data, but no method is
          100% secure.
        </p>
      </>
    ),
  },
  {
    q: "Your Rights",
    a: (
      <ul className="list-disc pl-5 space-y-1">
        <li>
          Access, correct, delete, or download a copy of your data (where
          applicable).
        </li>
        <li>Object to or restrict certain processing.</li>
        <li>Unsubscribe from marketing emails anytime.</li>
        <li>Contact us to exercise your rights.</li>
      </ul>
    ),
  },
  {
    q: "Changes To This Policy",
    a: (
      <p>
        We may update this Policy from time to time. We will post the revised
        version with an updated “Last Updated” date. Continued use means you
        accept the changes.
      </p>
    ),
  },
  {
    q: "Contact Us",
    a: (
      <>
        <p>
          <b>Sajni Re</b>
        </p>
        <p>
          Email:{" "}
          <a className="underline" href="mailto:sajnire2922@gmail.com">
            sajnire2922@gmail.com
          </a>
        </p>
        <p>
          Phone:{" "}
          <a className="underline" href="tel:+919123140229">
            +91&nbsp;9123140229
          </a>
        </p>
      </>
    ),
  },
];

/* ---------- RETURNS (SECOND SECTION – same style) ---------- */
const returnItems = [
  {
    q: "What Is Your Return Policy?",
    a: (
      <>
        <p>
          Returns / exchanges are accepted <b>only</b> in the following cases and
          must be reported <b>within 24 hours</b> of delivery:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>
            <b>Damaged or defective on arrival</b>.
          </li>
          <li>
            <b>Wrong product delivered</b> (different design/size/colour).
          </li>
        </ul>

        <p className="mt-2">
          Mandatory proof: a <b>single, continuous, unedited 360° unboxing video</b>{" "}
          from the sealed parcel (shipping label visible) till complete
          inspection of the jewellery. Edited/paused videos or only photos are
          not accepted.
        </p>

        <p className="mt-2">
          <b>Time limit:</b> Your claim and the required 360° unboxing video must
          be sent to our team <b>within 24 hours of delivery</b> at{" "}
          <a className="underline" href="mailto:sajnire2922@gmail.com">
            sajnire2922@gmail.com
          </a>{" "}
          or{" "}
          <a className="underline" href="tel:+919123140229">
            +91 9123140229
          </a>
          .
        </p>

        <p className="mt-2">
          The item must be <b>unused</b> and returned in its{" "}
          <b>original packaging</b> with invoice, tags, pouch and any
          certificates/freebies.
        </p>
      </>
    ),
  },
  {
    q: "How Long Do I Have To Return An Item?",
    a: (
      <p>
        You must <b>notify us within 24 hours</b> of delivery with the required
        video proof. Once approved, please hand over/dispatch the product in
        original condition within <b>2–3 days</b> as per the pickup/drop
        instructions shared by our team. Requests raised after 24 hours aren’t
        eligible.
      </p>
    ),
  },
  {
    q: "Can I Return An Item If I Changed My Mind?",
    a: (
      <p>
        <b>No.</b> We do not accept returns for change of mind
        (colour/design/size preference). For hygiene reasons,{" "}
        <b>earrings are non-returnable and non-exchangeable</b>. Customized/
        engraved items are also non-returnable unless received
        damaged/defective (with proof).
      </p>
    ),
  },
  {
    q: "How Do I Start A Return?",
    a: (
      <ol className="list-decimal pl-5 space-y-1">
        <li>
          Within <b>24 hours</b> of delivery, email{" "}
          <a className="underline" href="mailto:sajnire2922@gmail.com">
            sajnire2922@gmail.com
          </a>{" "}
          or call{" "}
          <a className="underline" href="tel:+919123140229">
            +91 9123140229
          </a>{" "}
          with your order number and the <b>continuous 360° unboxing video</b>{" "}
          (plus clear photos, if needed).
        </li>
        <li>
          Our team will verify and share pickup/drop-off instructions. Keep the
          product unused and packed with invoice, tags, pouch and all
          inclusions.
        </li>
        <li>
          After quality check, we’ll ship a replacement or issue a refund to the
          original payment method within <b>3–7 business days</b> (for COD, via
          UPI/bank transfer).
        </li>
      </ol>
    ),
  },
];

export default function PrivacyPolicy() {
  const [openPrivacy, setOpenPrivacy] = useState(0);
  const [openReturns, setOpenReturns] = useState(0);

  return (
    <motion.main
      className="bg-[#fbf2e8] min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      {/* Top hero */}
      <PageHeader
        title="Privacy Policy"
        subtitle="Read our privacy, data & return guidelines carefully to enjoy a smooth and secure shopping experience."
      />

      {/* Privacy Section */}
      <motion.section
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-20 pt-6 sm:pt-8 md:pt-10 pb-6 sm:pb-8"
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
          Your Privacy Questions, Answered
        </motion.h2>

        <Accordion
          items={privacyItems}
          openIndex={openPrivacy}
          setOpenIndex={setOpenPrivacy}
          prefix="privacy-"
        />

        <p className="mt-8 sm:mt-10 text-[11px] sm:text-xs md:text-sm text-gray-600">
          Last Updated: {new Date().toLocaleDateString()}
        </p>
      </motion.section>

      {/* Returns Section – same style as screenshot cards */}
      <motion.section
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-20 pb-12 sm:pb-14 md:pb-16"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-black mb-4 sm:mb-5 md:mb-6"
        >
          Your Guide To Hassle-Free Returns
        </motion.h2>

        <Accordion
          items={returnItems}
          openIndex={openReturns}
          setOpenIndex={setOpenReturns}
          prefix="returns-"
        />

        {/* bottom helper text – like screenshot */}
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
