// src/pages/SajniReCredit.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const SajniReCredit = () => {
  const [user, setUser] = useState(null);

  // view: 'overview' | 'details' | 'topup' | 'giftcard'
  const [view, setView] = useState("overview");
  const [detailsTab, setDetailsTab] = useState("active"); // active | expired

  // top-up state
  const [topupAmount, setTopupAmount] = useState("");
  const quickOptions = [500, 1000, 1500, 2000, 2500];

  // gift card state
  const [giftCardNumber, setGiftCardNumber] = useState("");
  const [giftCardPin, setGiftCardPin] = useState("");

  const navigate = useNavigate();

  // user name localStorage se, Navbar jaisa hi logic
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

  const isTopupDisabled = !topupAmount;
  const isGiftCardDisabled = !giftCardNumber || !giftCardPin;

  // card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 16, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  // view transition animation
  const viewVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.22 } },
  };

  // feature icon variants (entry + stagger)
  const featureVariants = {
    hidden: { opacity: 0, y: 12, scale: 0.97 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: "easeOut",
        delay: 0.06 * i,
      },
    }),
  };

  // topup quick option variants
  const topupOptionVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.96 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.28,
        ease: "easeOut",
        delay: 0.04 * i,
      },
    }),
  };

  return (
    <main className="min-h-[500px] md:bg-white bg-gradient-to-b from-white via-pink-50/40 to-white">
      <motion.div
        className="max-w-6xl mx-auto px-4 md:px-6 py-8"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Top heading – ONLY desktop/tablet */}
        <motion.div
          className="mb-6 hidden md:block"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.05 }}
        >
          <h1 className="text-2xl font-semibold text-gray-900">Account</h1>
          <p className="text-sm text-gray-500 mt-1">{userName}</p>
        </motion.div>

        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row">
            {/* LEFT SIDEBAR – mobile par hidden */}
            <aside className="hidden md:block md:w-64 md:pr-10 mb-8 md:mb-0 border-b md:border-b-0 md:border-r border-gray-200">
              <nav className="space-y-6 pb-6 md:pb-0 text-sm">
                {/* Overview */}
                <div>
                  <button
                    type="button"
                    className="text-gray-800 hover:text-pink-600"
                    onClick={() => navigate("/account")}
                  >
                    Overview
                  </button>
                </div>

                {/* Orders */}
                <div>
                  <p className="uppercase text-[11px] font-semibold tracking-wider text-gray-400 mb-2">
                    Orders
                  </p>
                  <button
                    type="button"
                    className="text-gray-800 hover:text-pink-600"
                    onClick={() => navigate("/orders")}
                  >
                    Orders &amp; Returns
                  </button>
                </div>

                {/* Credits */}
                <div>
                  <p className="uppercase text-[11px] font-semibold tracking-wider text-gray-400 mb-2">
                    Credits
                  </p>
                  <div className="space-y-1">
                    <button
                      type="button"
                      className="block text-gray-800 hover:text-pink-600"
                      onClick={() => navigate("/coupons")}
                    >
                      Coupons
                    </button>
                    <button
                      type="button"
                      className="block text-pink-600 font-semibold"
                    >
                      Sajni Re Credit
                    </button>
                    <button
                      type="button"
                      className="block text-gray-800 hover:text-pink-600"
                      onClick={() => navigate("/sajnicash")}
                    >
                      SajniCash
                    </button>
                  </div>
                </div>

                {/* Account */}
                <div>
                  <p className="uppercase text-[11px] font-semibold tracking-wider text-gray-400 mb-2">
                    Account
                  </p>
                  <div className="space-y-1">
                    <button
                      type="button"
                      className="block text-gray-800 hover:text-pink-600"
                      onClick={() => navigate("/account")}
                    >
                      Profile
                    </button>
                    <button
                      type="button"
                      className="block text-gray-800 hover:text-pink-600"
                      onClick={() => navigate("/saved-cards")}
                    >
                      Saved Cards
                    </button>
                    <button
                      type="button"
                      className="block text-gray-800 hover:text-pink-600"
                      onClick={() => navigate("/addresses")}
                    >
                      Addresses
                    </button>
                    {/* Sajni Re Insider button yahan se hata diya gaya hai */}
                  </div>
                </div>

                {/* LEGAL */}
                <div>
                  <p className="uppercase text-[11px] font-semibold tracking-wider text-gray-400 mb-2">
                    Legal
                  </p>
                  <div className="space-y-1">
                    <button
                      type="button"
                      className="block text-gray-800 hover:text-pink-600"
                      onClick={() => navigate("/terms")}
                    >
                      Terms of Use
                    </button>
                    <button
                      type="button"
                      className="block text-gray-800 hover:text-pink-600"
                      onClick={() => navigate("/privacypolicy")}
                    >
                      Privacy Center
                    </button>
                  </div>
                </div>
              </nav>
            </aside>

            {/* RIGHT CONTENT */}
            <section className="flex-1">
              <AnimatePresence mode="wait">
                {/* === 1) OVERVIEW VIEW === */}
                {view === "overview" && (
                  <motion.div
                    key="overview"
                    className="space-y-6"
                    layout
                    variants={viewVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {/* Top big card */}
                    <motion.div
                      layout
                      className="border border-gray-200 rounded-md overflow-hidden bg-white"
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <div className="px-6 py-5 border-b border-gray-200">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <h2 className="text-lg md:text-xl font-semibold text-gray-900 tracking-wide">
                              SAJNI RE CREDIT
                            </h2>
                            <p className="text-xs md:text-sm text-gray-500 mt-1 uppercase tracking-wider">
                              A quick and convenient way to pay and get refunds
                            </p>
                            {/* small animated bar under heading */}
                            <motion.div
                              className="h-[2px] w-20 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full mt-2"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="px-6 py-6 grid grid-cols-1 md:grid-cols-4 gap-6 text-center text-sm">
                        {[
                          {
                            icon: "🛒",
                            title: "Instant Checkout",
                            text: "One-click, easy and fast checkout.",
                          },
                          {
                            icon: "⚡",
                            title: "Faster Refunds",
                            text: "Get instant refunds as Sajni Re Credit.",
                          },
                          {
                            icon: "💳",
                            title: "Consolidated Money",
                            text: "Gift cards, refunds and cashback in one place.",
                          },
                          {
                            icon: "🎁",
                            title: "Many More Benefits",
                            text: "Benefits and offers on using Sajni Re Credit.",
                          },
                        ].map((item, index) => (
                          <motion.div
                            key={item.title}
                            custom={index}
                            variants={featureVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover={{ y: -4, scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            className="cursor-default"
                          >
                            <div className="mb-3 text-2xl">{item.icon}</div>
                            <p className="font-semibold uppercase text-xs tracking-wide text-gray-700">
                              {item.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {item.text}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Balance card */}
                    <motion.div
                      layout
                      className="border border-gray-200 rounded-md bg-white"
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <div className="px-6 py-4 border-b border-gray-200 text-center">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                          Top-up your Sajni Re Credit now!
                        </p>
                        <motion.p
                          className="mt-3 text-2xl font-semibold text-gray-900 inline-flex items-center gap-1"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{
                            duration: 2.1,
                            repeat: Infinity,
                            repeatType: "loop",
                          }}
                        >
                          ₹0.00
                        </motion.p>
                      </div>

                      <div className="px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-700 gap-4">
                        <div className="flex-1 text-center md:text-left border-b md:border-b-0 md:border-r border-gray-200 pb-3 md:pb-0 md:pr-4">
                          <p>For a quick checkout</p>
                          <motion.button
                            type="button"
                            className="mt-1 font-semibold text-pink-600 uppercase text-xs tracking-wide"
                            whileHover={{ x: 2, scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setView("topup");
                            }}
                          >
                            Top Up
                          </motion.button>
                        </div>
                        <div className="flex-1 text-center md:text-right pt-3 md:pt-0 md:pl-4">
                          <p>Have a gift card?</p>
                          <motion.button
                            type="button"
                            className="mt-1 font-semibold text-pink-600 uppercase text-xs tracking-wide"
                            whileHover={{ x: -2, scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setView("giftcard")}
                          >
                            Add Gift Card
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>

                    {/* Transaction log + credit details row */}
                    <motion.div
                      layout
                      className="border border-gray-200 rounded-md divide-y divide-gray-200 text-sm bg-white"
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.button
                        type="button"
                        className="w-full flex items-center justify-between px-6 py-4"
                        whileHover={{ backgroundColor: "#f9fafb", x: 2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="font-semibold text-gray-800">
                          Transaction Log
                        </span>
                        <span className="text-gray-500 text-lg">&gt;</span>
                      </motion.button>
                      <motion.button
                        type="button"
                        className="w-full flex items-center justify-between px-6 py-4"
                        whileHover={{ backgroundColor: "#f9fafb", x: 2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setView("details");
                          setDetailsTab("active");
                        }}
                      >
                        <span className="font-semibold text-gray-800">
                          Credit Details
                        </span>
                        <span className="text-gray-500 text-lg">&gt;</span>
                      </motion.button>
                    </motion.div>

                    {/* PLEASE NOTE card */}
                    <motion.div
                      layout
                      className="border border-gray-200 rounded-md bg-white"
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <div className="px-6 py-5 text-xs md:text-sm text-gray-700">
                        <p className="uppercase text-[11px] font-semibold tracking-wider mb-3">
                          Please Note
                        </p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>
                            Sajni Re Credit can&apos;t be cancelled or
                            transferred to another account.
                          </li>
                          <li>
                            It can&apos;t be withdrawn as cash or transferred to
                            any bank account.
                          </li>
                          <li>
                            It can&apos;t be used to purchase gift cards
                            directly.
                          </li>
                          <li>
                            Net-banking and cards issued in India can be used
                            for Sajni Re Credit top-up.
                          </li>
                          <li>
                            Credits may have an expiry. Please check FAQs for
                            complete details.
                          </li>
                        </ul>

                        <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] md:text-xs font-semibold uppercase tracking-wider text-pink-600">
                          <button type="button" className="hover:underline">
                            Sajni Re Credit T&amp;C &gt;
                          </button>
                          <button type="button" className="hover:underline">
                            Gift Card T&amp;C &gt;
                          </button>
                          <button type="button" className="hover:underline">
                            FAQs &gt;
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {/* === 2) CREDIT DETAILS VIEW === */}
                {view === "details" && (
                  <motion.div
                    key="details"
                    layout
                    className="border border-gray-200 rounded-md bg-white"
                    variants={viewVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {/* Tabs header */}
                    <div className="px-6 pt-4 border-b border-gray-200">
                      <div className="flex text-[11px] md:text-xs font-semibold uppercase tracking-wider">
                        <motion.button
                          type="button"
                          whileHover={{ y: -1, scale: 1.02 }}
                          whileTap={{ scale: 0.96 }}
                          className={`pb-2 px-4 border-b-2 ${
                            detailsTab === "active"
                              ? "border-emerald-400 text-emerald-500"
                              : "border-transparent text-gray-500"
                          }`}
                          onClick={() => setDetailsTab("active")}
                        >
                          Active Credit
                        </motion.button>
                        <motion.button
                          type="button"
                          whileHover={{ y: -1, scale: 1.02 }}
                          whileTap={{ scale: 0.96 }}
                          className={`pb-2 px-4 ml-8 border-b-2 ${
                            detailsTab === "expired"
                              ? "border-emerald-400 text-emerald-500"
                              : "border-transparent text-gray-500"
                          }`}
                          onClick={() => setDetailsTab("expired")}
                        >
                          Expired Credit
                        </motion.button>
                      </div>
                    </div>

                    {/* Tab content */}
                    <motion.div
                      className="px-6 py-6 text-sm text-gray-500"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {detailsTab === "active" ? "No credits" : "No credits"}
                    </motion.div>
                  </motion.div>
                )}

                {/* === 3) TOP UP VIEW === */}
                {view === "topup" && (
                  <motion.div
                    key="topup"
                    layout
                    className="space-y-4"
                    variants={viewVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {/* Info strip */}
                    <motion.div
                      layout
                      className="border border-rose-200 bg-rose-50 rounded-md"
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <div className="flex">
                        <motion.div
                          className="w-1 bg-emerald-400 rounded-l-md"
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "loop",
                          }}
                        />
                        <div className="px-4 py-3">
                          <p className="text-xs font-semibold text-gray-800 mb-1">
                            Info:
                          </p>
                          <p className="text-xs text-gray-600">
                            Sajni Re Credit Top-up amount will be added in the
                            Sajni Re Credit balance.
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Top-up card */}
                    <motion.div
                      layout
                      className="border border-gray-200 rounded-md bg-white"
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <div className="px-4 md:px-6 py-3 border-b border-gray-200 flex items-center justify-between text-xs md:text-sm font-semibold text-gray-800">
                        <span className="uppercase tracking-wide">
                          Available Sajni Re Credit
                        </span>
                        <motion.span
                          animate={{ scale: [1, 1.04, 1] }}
                          transition={{
                            duration: 2.2,
                            repeat: Infinity,
                            repeatType: "loop",
                          }}
                        >
                          ₹0.00
                        </motion.span>
                      </div>

                      <div className="px-4 md:px-6 py-5 text-sm text-gray-800">
                        <motion.p
                          className="mb-3"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          Top-up your Sajni Re Credit
                        </motion.p>

                        {/* Quick amount options */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {quickOptions.map((amt, index) => {
                            const isSelected = topupAmount === String(amt);
                            return (
                              <motion.button
                                key={amt}
                                type="button"
                                custom={index}
                                variants={topupOptionVariants}
                                initial="hidden"
                                animate="visible"
                                onClick={() => setTopupAmount(String(amt))}
                                whileHover={{ y: -2, scale: 1.03 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-4 py-2 text-sm border rounded-sm ${
                                  isSelected
                                    ? "border-pink-500 bg-pink-50 text-gray-900 shadow-sm"
                                    : "border-gray-300 bg-white text-gray-800 hover:border-pink-400"
                                }`}
                              >
                                ₹{amt.toLocaleString("en-IN")}
                              </motion.button>
                            );
                          })}
                        </div>

                        {/* Amount input */}
                        <motion.div
                          className="mt-3"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25, delay: 0.1 }}
                        >
                          <label className="block text-xs text-gray-500 mb-1">
                            ₹ Enter an amount (eg: 1000)
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={topupAmount}
                            onChange={(e) => setTopupAmount(e.target.value)}
                            className="w-full border-0 border-b border-gray-300 focus:border-gray-500 focus:outline-none text-sm py-1 bg-transparent"
                          />
                        </motion.div>

                        {/* TOP UP button */}
                        <motion.button
                          type="button"
                          disabled={isTopupDisabled}
                          whileHover={
                            isTopupDisabled ? {} : { scale: 1.05, y: -1 }
                          }
                          whileTap={
                            isTopupDisabled ? {} : { scale: 0.97, y: 0 }
                          }
                          className={`mt-6 w-full py-3 text-sm font-semibold uppercase tracking-wide rounded-sm ${
                            isTopupDisabled
                              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                              : "bg-pink-600 text-white shadow-md hover:bg-pink-700"
                          }`}
                        >
                          Top Up
                        </motion.button>
                      </div>
                    </motion.div>

                    {/* PLEASE NOTE block */}
                    <motion.div
                      layout
                      className="border border-gray-200 rounded-md bg-white mt-2"
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <div className="px-4 md:px-6 py-4 text-xs md:text-sm text-gray-700">
                        <p className="uppercase text-[11px] font-semibold tracking-wider mb-3">
                          Please Note
                        </p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>
                            Sajni Re Credit can&apos;t be cancelled or
                            transferred to another account.
                          </li>
                          <li>
                            It can&apos;t be withdrawn as cash or transferred to
                            any bank account.
                          </li>
                          <li>
                            It can&apos;t be used to purchase gift cards
                            directly.
                          </li>
                          <li>
                            Net-banking and credit/debit cards issued in India
                            can be used for Sajni Re Credit top up.
                          </li>
                          <li>
                            Credits have an expiry. Check FAQs for more
                            details.
                          </li>
                        </ul>

                        <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] md:text-xs font-semibold uppercase tracking-wider text-pink-600">
                          <button type="button" className="hover:underline">
                            View T&amp;C &gt;
                          </button>
                          <button type="button" className="hover:underline">
                            FAQs &gt;
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {/* === 4) GIFT CARD VIEW === */}
                {view === "giftcard" && (
                  <motion.div
                    key="giftcard"
                    layout
                    className="border border-gray-200 rounded-md bg-white px-4 md:px-6 py-6 w-full md:max-w-md mx-auto"
                    variants={viewVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <motion.p
                      className="text-sm font-semibold text-gray-900 mb-6"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      Enter Gift Card Details
                    </motion.p>

                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: 0.05 }}
                    >
                      <label className="block text-xs text-gray-500 mb-1">
                        Gift Card Number
                      </label>
                      <input
                        type="text"
                        value={giftCardNumber}
                        onChange={(e) => setGiftCardNumber(e.target.value)}
                        className="w-full border-0 border-b border-gray-300 focus:border-gray-500 focus:outline-none text-sm py-1 bg-transparent"
                      />
                    </motion.div>

                    <motion.div
                      className="mb-8"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: 0.1 }}
                    >
                      <label className="block text-xs text-gray-500 mb-1">
                        Gift Card Pin
                      </label>
                      <input
                        type="password"
                        value={giftCardPin}
                        onChange={(e) => setGiftCardPin(e.target.value)}
                        className="w-full border-0 border-b border-gray-300 focus:border-gray-500 focus:outline-none text-sm py-1 bg-transparent"
                      />
                    </motion.div>

                    <motion.button
                      type="button"
                      disabled={isGiftCardDisabled}
                      whileHover={
                        isGiftCardDisabled ? {} : { scale: 1.04, y: -1 }
                      }
                      whileTap={
                        isGiftCardDisabled ? {} : { scale: 0.97, y: 0 }
                      }
                      className={`w-full py-3 text-sm font-semibold uppercase tracking-wide rounded-sm ${
                        isGiftCardDisabled
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : "bg-emerald-400 text-white hover:bg-emerald-500 shadow-md"
                      }`}
                    >
                      Add to Account
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default SajniReCredit;
