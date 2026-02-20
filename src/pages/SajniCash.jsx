// src/pages/SajniCash.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const SajniCash = () => {
  const [user, setUser] = useState(null);

  // Sections ke liye toggle state (DONO default me CLOSED)
  const [openEligibility, setOpenEligibility] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);

  const navigate = useNavigate();

  // user name localStorage se, Navbar jaisa logic
  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user")) || null;
      setUser(u);
    } catch (e) {
      setUser(null);
    }
  }, []);

  const userName =
    (user &&
      (user.name ||
        user.fullName ||
        user.full_name ||
        user.username)) ||
    "Sajni Re User";

  // Common variants
  const pageVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
  };

  const accordionContentTransition = { duration: 0.25, ease: "easeOut" };

  return (
    <motion.main
      className="min-h-screen bg-gradient-to-b from-white via-emerald-50/40 to-white"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.25 }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Account heading intentionally removed */}

        <div className="border-t border-gray-200 pt-4 md:pt-6">
          <motion.div
            className="flex flex-col md:flex-row"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.05 }}
          >
            {/* LEFT SIDEBAR – mobile pe hidden, desktop pe Myntra style */}
            <aside className="hidden md:block md:w-64 md:pr-10 border-r border-gray-200">
              <motion.nav
                className="space-y-6 text-sm pt-2"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
              >
                {/* Overview */}
                <div>
                  <motion.button
                    type="button"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.97 }}
                    className="text-gray-800 hover:text-pink-600"
                    onClick={() => navigate("/account")}
                  >
                    Overview
                  </motion.button>
                </div>

                {/* Orders */}
                <div>
                  <p className="uppercase text-[11px] font-semibold tracking-wider text-gray-400 mb-2">
                    Orders
                  </p>
                  <motion.button
                    type="button"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.97 }}
                    className="text-gray-800 hover:text-pink-600"
                    onClick={() => navigate("/orders")}
                  >
                    Orders &amp; Returns
                  </motion.button>
                </div>

                {/* Credits */}
                <div>
                  <p className="uppercase text-[11px] font-semibold tracking-wider text-gray-400 mb-2">
                    Credits
                  </p>
                  <div className="space-y-1">
                    <motion.button
                      type="button"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.97 }}
                      className="block text-gray-800 hover:text-pink-600"
                      onClick={() => navigate("/sajni-credit")}
                    >
                      Sajni Re Credit
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.97 }}
                      className="block text-emerald-500 font-semibold"
                    >
                      SajniCash
                    </motion.button>
                  </div>
                </div>

                {/* Account */}
                <div>
                  <p className="uppercase text-[11px] font-semibold tracking-wider text-gray-400 mb-2">
                    Account
                  </p>
                  <div className="space-y-1">
                    <motion.button
                      type="button"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.97 }}
                      className="block text-gray-800 hover:text-pink-600"
                      onClick={() => navigate("/account")}
                    >
                      Profile
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.97 }}
                      className="block text-gray-800 hover:text-pink-600"
                      onClick={() => navigate("/saved-cards")}
                    >
                      Saved Cards
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.97 }}
                      className="block text-gray-800 hover:text-pink-600"
                      onClick={() => navigate("/saved-upi")}
                    >
                      Saved UPI
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.97 }}
                      className="block text-gray-800 hover:text-pink-600"
                      onClick={() => navigate("/addresses")}
                    >
                      Addresses
                    </motion.button>
                    {/* Sajni Re Insider button hata diya gaya hai */}
                  </div>
                </div>

                {/* LEGAL */}
                <div>
                  <p className="uppercase text-[11px] font-semibold tracking-wider text-gray-400 mb-2">
                    Legal
                  </p>
                  <div className="space-y-1">
                    <motion.button
                      type="button"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.97 }}
                      className="block text-gray-800 hover:text-pink-600"
                      onClick={() => navigate("/terms")}
                    >
                      Terms of Use
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.97 }}
                      className="block text-gray-800 hover:text-pink-600"
                      onClick={() => navigate("/privacypolicy")}
                    >
                      Privacy Center
                    </motion.button>
                  </div>
                </div>
              </motion.nav>
            </aside>

            {/* RIGHT CONTENT – mobile pe full width, center aligned */}
            <section className="flex-1 mt-2 md:mt-0">
              <motion.div
                className="w-full max-w-xl mx-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.05 }}
              >
                {/* TOP CARD: TOTAL AVAILABLE SAJNICASH */}
                <motion.div
                  className="border-b border-gray-200 pb-6 mb-2 text-center pt-6"
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className="inline-block">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-500">
                      Total Available SajniCash
                    </p>
                    {/* animated underline */}
                    <motion.div
                      className="h-[2px] w-24 mx-auto mt-1 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.45 }}
                    />
                  </div>

                  <motion.p
                    className="mt-3 text-4xl font-semibold text-gray-900"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                  >
                    <motion.span
                      animate={{ scale: [1, 1.05, 1], y: [0, -2, 0] }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        repeatType: "loop",
                      }}
                    >
                      0
                    </motion.span>
                  </motion.p>

                  <p className="mt-3 text-[11px] md:text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                    Your total SajniCash is worth ₹ 0.00. You can pay up to
                    100% (may vary during sale &amp; promotion events) of your
                    order value through SajniCash. Use them on the Payments page
                    during checkout.
                  </p>

                  <p className="mt-2 text-[10px] text-gray-400">
                    Logged in as <span className="font-medium">{userName}</span>
                  </p>
                </motion.div>

                {/* BOTTOM SECTIONS – accordion style rows, Myntra jaise */}
                <div className="border-t border-gray-200 text-sm bg-white/80 rounded-md shadow-sm overflow-hidden">
                  {/* ELIGIBILITY, MEMBERSHIP, ACCRUAL */}
                  <div className="border-b border-gray-200">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.98 }}
                      whileHover={{ backgroundColor: "#f9fafb" }}
                      onClick={() => setOpenEligibility((v) => !v)}
                      className="w-full flex items-center justify-between px-4 md:px-6 py-3 font-semibold uppercase text-xs tracking-wide text-gray-800"
                    >
                      <span>Eligibility, Membership, Accrual</span>
                      <motion.span
                        className="text-lg text-gray-500"
                        animate={{ rotate: openEligibility ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        ▾
                      </motion.span>
                    </motion.button>

                    <AnimatePresence initial={false}>
                      {openEligibility && (
                        <motion.div
                          key="eligibility"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={accordionContentTransition}
                          className="overflow-hidden"
                        >
                          <div className="px-4 md:px-6 pb-4 pt-1 text-[11px] md:text-xs text-gray-600 leading-relaxed space-y-2">
                            <p>
                              These terms apply only within India and are open
                              to Sajni Re customers who are residents of India
                              and above 18 years of age.
                            </p>
                            <p>
                              Any earlier rewards or privilege programme linked
                              to your Sajni Re account will now be treated as
                              SajniCash, with the same value carried forward
                              wherever applicable.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* GENERAL TERMS AND CONDITIONS */}
                  <div className="border-b border-gray-200">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.98 }}
                      whileHover={{ backgroundColor: "#f9fafb" }}
                      onClick={() => setOpenTerms((v) => !v)}
                      className="w-full flex items-center justify-between px-4 md:px-6 py-3 font-semibold uppercase text-xs tracking-wide text-gray-800"
                    >
                      <span>General Terms and Conditions</span>
                      <motion.span
                        className="text-lg text-gray-500"
                        animate={{ rotate: openTerms ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        ▾
                      </motion.span>
                    </motion.button>

                    <AnimatePresence initial={false}>
                      {openTerms && (
                        <motion.div
                          key="terms"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={accordionContentTransition}
                          className="overflow-hidden"
                        >
                          <div className="px-4 md:px-6 pb-4 pt-1 text-[11px] md:text-xs text-gray-600 leading-relaxed">
                            <ul className="list-disc list-inside space-y-1">
                              <li>
                                Every member is responsible for keeping
                                themselves updated with SajniCash terms and the
                                balance in their account.
                              </li>
                              <li>
                                Sajni Re may contact active members regarding
                                offers, programme changes and SajniCash updates
                                from time to time.
                              </li>
                              <li>
                                Sajni Re will not be responsible for any delay
                                or loss of communication in email / SMS / post.
                              </li>
                              <li>
                                Sajni Re reserves the right to modify, suspend
                                or cancel membership of any user at its sole
                                discretion, without prior notice.
                              </li>
                              <li>
                                Any change in a member&apos;s contact details
                                should be shared with Sajni Re support as early
                                as possible so that communication remains
                                accurate.
                              </li>
                              <li>
                                Sajni Re may add, update or remove programme
                                benefits, and may change these terms without
                                separate approval from members.
                              </li>
                              <li>
                                In case of any dispute regarding SajniCash and
                                these terms, Sajni Re&apos;s decision will be
                                final and binding, along with the standard legal
                                and privacy policies of Sajni Re.
                              </li>
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </section>
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
};

export default SajniCash;
