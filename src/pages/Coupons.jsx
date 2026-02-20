// src/pages/Coupons.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/** user ko localStorage se read karne ke helpers */
const readUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch (e) {
    return null;
  }
};

// ✅ Ab ek page me 20 coupons
const PAGE_SIZE = 20;

/** Dummy coupons data (UI ke liye) */
const COUPONS = [
  {
    id: 1,
    title: "Flat ₹1197 off",
    description: "On min. purchase of ₹3995 and 4 items",
    code: "THREEJIBBITZ",
    expiry: "31 Dec 2025",
    tag: "Trending",
    type: "trending",
    expired: false,
  },
  {
    id: 2,
    title: "Flat ₹1000 off",
    description: "On min. purchase of ₹3999",
    code: "BUGATTI1000OFF",
    expiry: "31 Mar 2026",
    tag: "Trending",
    type: "trending",
    expired: false,
  },
  {
    id: 3,
    title: "Flat ₹750 off",
    description: "On min. purchase of ₹6999",
    code: "BUGATTI750",
    expiry: "31 Dec 2025",
    tag: "Big Discount",
    type: "discount",
    expired: false,
  },
  {
    id: 4,
    title: "Flat ₹500 off",
    description: "On min. purchase of ₹11999",
    code: "ECC0500",
    expiry: "30 Nov 2025",
    tag: "Big Discount",
    type: "discount",
    expired: false,
  },
  {
    id: 5,
    title: "Flat 5% off",
    description: "On min. purchase of ₹2499",
    code: "NORETURN5X",
    expiry: "15 Dec 2023",
    tag: "Expired",
    type: "expiring",
    expired: true,
  },
  {
    id: 6,
    title: "Flat 5% off",
    description: "On min. purchase of ₹2999",
    code: "NORETURN5OFF",
    expiry: "31 Mar 2026",
    tag: "All Orders",
    type: "all",
    expired: false,
  },
  {
    id: 7,
    title: "Flat 5% off",
    description: "On min. purchase of ₹1999",
    code: "NEEMANSNEW5",
    expiry: "29 Oct 2026",
    tag: "Trending",
    type: "trending",
    expired: false,
  },
  {
    id: 8,
    title: "Flat 7% off",
    description: "On min. purchase of ₹2499",
    code: "NORETURN7OFF",
    expiry: "31 Mar 2026",
    tag: "Big Discount",
    type: "discount",
    expired: false,
  },
  {
    id: 9,
    title: "Flat 10% off",
    description: "On min. purchase of ₹3499",
    code: "RAREB10",
    expiry: "30 Nov 2025",
    tag: "Big Discount",
    type: "discount",
    expired: false,
  },
  {
    id: 10,
    title: "Flat 10% off",
    description: "On min. purchase of ₹2999",
    code: "FOOTWEAR10",
    expiry: "31 Dec 2025",
    tag: "All Orders",
    type: "all",
    expired: false,
  },
  {
    id: 11,
    title: "Flat 10% off",
    description: "On min. purchase of ₹2499",
    code: "NORETURN10X",
    expiry: "31 Dec 2025",
    tag: "All Orders",
    type: "all",
    expired: false,
  },
  {
    id: 12,
    title: "Flat 10% off",
    description: "On min. purchase of ₹1999",
    code: "EXTRA10OFF",
    expiry: "28 Feb 2026",
    tag: "Discount",
    type: "discount",
    expired: false,
  },
  {
    id: 13,
    title: "Flat 10% off",
    description: "On min. purchase of ₹2499",
    code: "NEEMANSNEW10",
    expiry: "29 Oct 2026",
    tag: "Trending",
    type: "trending",
    expired: false,
  },
  {
    id: 14,
    title: "Flat 10% off",
    description: "On min. purchase of ₹1349",
    code: "BLACKFRIDAY10",
    expiry: "30 Nov 2023",
    tag: "Expired",
    type: "expiring",
    expired: true,
  },
  {
    id: 15,
    title: "Flat 11% off",
    description: "On min. purchase of ₹2499",
    code: "CROCS11OFF",
    expiry: "31 Dec 2025",
    tag: "Big Discount",
    type: "discount",
    expired: false,
  },
  {
    id: 16,
    title: "Flat 20% off",
    description: "On min. purchase of ₹999",
    code: "NORETURNCAMPUS20",
    expiry: "31 Dec 2025",
    tag: "All Orders",
    type: "all",
    expired: false,
  },
  {
    id: 17,
    title: "20% off",
    description: "Upto 85% on min. purchase of ₹399",
    code: "NORETURNX",
    expiry: "31 Dec 2025",
    tag: "Trending",
    type: "trending",
    expired: false,
  },
  {
    id: 18,
    title: "Flat 25% off",
    description: "On min. purchase of 2 items",
    code: "RB25",
    expiry: "30 Nov 2025",
    tag: "Big Discount",
    type: "discount",
    expired: false,
  },
  {
    id: 19,
    title: "Flat 15% off",
    description: "On min. purchase of ₹2999",
    code: "SAJNI15",
    expiry: "31 Mar 2026",
    tag: "Trending",
    type: "trending",
    expired: false,
  },
  {
    id: 20,
    title: "Flat ₹200 off",
    description: "On min. purchase of ₹1499",
    code: "SAJNI200",
    expiry: "30 Jun 2026",
    tag: "Big Discount",
    type: "discount",
    expired: false,
  },
];

/** sort options list */
const SORT_OPTIONS = [
  { id: "trending", label: "Trending" },
  { id: "discount", label: "Discount" },
  { id: "expiring", label: "Expiring Soon" },
  { id: "all", label: "All" },
];

/** Copy icon (small inline SVG) */
const CopyIcon = () => (
  <svg
    className="w-3 h-3 inline-block ml-1 text-gray-500"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden
  >
    <rect
      x="9"
      y="9"
      width="11"
      height="11"
      rx="1.2"
      stroke="#9CA3AF"
      strokeWidth="1.4"
    />
    <rect
      x="4"
      y="4"
      width="11"
      height="11"
      rx="1.2"
      stroke="#D1D5DB"
      strokeWidth="1.4"
    />
  </svg>
);

/** Card animation variants */
const cardVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.32,
      delay: i * 0.05,
      ease: "easeOut",
    },
  }),
};

/** Single coupon card – Myntra style ticket, full height */
const CouponCard = ({ coupon, onViewProducts, index }) => {
  const isExpired = coupon.expired;

  return (
    <motion.div
      className="h-full"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible" // scroll par animate
      viewport={{ once: true, amount: 0.25 }}
      custom={index}
      whileHover={{
        y: -4,
        scale: 1.02,
        boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
      }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="h-full border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm transition-shadow duration-200">
        <div className="flex h-full">
          {/* LEFT IMAGE */}
          <div className="w-2/5 bg-gray-100">
            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
              IMAGE
            </div>
          </div>

          {/* MIDDLE TICKET DIVIDER */}
          <div className="relative w-0">
            {/* dashed line */}
            <div className="absolute inset-y-0 left-0 border-l border-dashed border-gray-300" />

            {/* top notch */}
            <div className="absolute -left-2 -top-2 w-4 h-4 rounded-full bg-white border border-gray-200" />

            {/* bottom notch */}
            <div className="absolute -left-2 -bottom-2 w-4 h-4 rounded-full bg-white border border-gray-200" />

            {/* small star / pin icon */}
            <div className="absolute -left-[9px] top-4 text-[10px] text-gray-300">
              ✱
            </div>
          </div>

          {/* RIGHT SIDE DETAILS */}
          <div className="w-3/5 px-5 py-4 flex flex-col justify-between">
            <div>
              <div className="text-sm font-semibold text-gray-900 mb-1">
                {coupon.title}
              </div>
              <div className="text-xs text-gray-500 mb-3">
                {coupon.description}
              </div>

              <div className="text-xs text-gray-700 mb-1">
                <span className="font-semibold">Code:</span>{" "}
                <span className="font-mono tracking-wide">{coupon.code}</span>
                <CopyIcon />
              </div>
              <div className="text-[11px] text-gray-500">
                <span className="font-semibold">Expiry:</span> {coupon.expiry}
              </div>
              {isExpired && (
                <div className="mt-1 text-[11px] font-semibold text-red-500">
                  This coupon has expired
                </div>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between">
              <button
                type="button"
                onClick={() => onViewProducts(coupon)}
                className={`text-xs font-semibold flex items-center gap-1 ${
                  isExpired
                    ? "text-gray-400 cursor-pointer hover:text-gray-500"
                    : "text-pink-600 hover:text-pink-700"
                }`}
              >
                View Products
                <span aria-hidden>›</span>
              </button>
              <span
                className={`text-[11px] px-2 py-1 rounded-full border ${
                  isExpired
                    ? "border-red-200 text-red-500"
                    : "border-gray-200 text-gray-500"
                }`}
              >
                {coupon.tag}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/** Sidebar nav button with animation */
const SidebarNavButton = ({ children, onClick, active = false }) => (
  <motion.button
    whileHover={{ x: 4 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className={`block w-full text-left py-2 text-sm transition-colors ${
      active ? "font-semibold text-pink-600" : "text-gray-800"
    }`}
  >
    {children}
  </motion.button>
);

/** MAIN PAGE */
const Coupons = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeFilter, setActiveFilter] = useState("trending");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setUser(readUser());
  }, []);

  // filter change par hamesha page 1 pe aa jao
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  const filteredCoupons = COUPONS.filter((c) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "trending") return c.type === "trending";
    if (activeFilter === "discount") return c.type === "discount";
    if (activeFilter === "expiring") return c.type === "expiring";
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredCoupons.length / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedCoupons = filteredCoupons.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  // Pagination button styling
  const pageButtonClass = (page, currentPageValue) =>
    `min-w-[28px] h-7 px-2 flex items-center justify-center text-xs rounded-sm mx-0.5 cursor-pointer ${
      currentPageValue === page
        ? "bg-gray-900 text-white"
        : "bg-transparent text-gray-800 hover:underline"
    }`;

  /** View Products click handler */
  const handleViewProducts = (coupon) => {
    if (coupon.expired) {
      navigate(`/coupon-expired?q=${encodeURIComponent(coupon.code)}`);
    } else {
      alert("Products page will come here for active coupons.");
    }
  };

  return (
    <motion.div
      className="min-h-screen md:bg-white bg-gradient-to-b from-white via-pink-50/40 to-white"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* LEFT SIDEBAR – sirf desktop/tablet par, mobile par HIDE */}
          <aside className="hidden md:block md:col-span-3 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-6">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-lg font-semibold">Account</div>
              <div className="text-xs text-gray-500 mb-6">
                {user?.name || "Sajni Re User"}
              </div>

              <nav className="text-sm text-gray-700">
                {/* OVERVIEW */}
                <div className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
                  Overview
                </div>
                <SidebarNavButton onClick={() => navigate("/account")}>
                  Overview
                </SidebarNavButton>

                {/* ORDERS */}
                <div className="mt-4 text-xs font-semibold tracking-wide text-gray-400 uppercase">
                  Orders
                </div>
                <SidebarNavButton onClick={() => navigate("/orders")}>
                  Orders &amp; Returns
                </SidebarNavButton>

                {/* CREDITS */}
                <div className="mt-4 text-xs font-semibold tracking-wide text-gray-400 uppercase">
                  Credits
                </div>

                {/* Coupons – active */}
                <SidebarNavButton
                  onClick={() => navigate("/coupons")}
                  active={true}
                >
                  Coupons
                </SidebarNavButton>

                <SidebarNavButton onClick={() => navigate("/sajni-credit")}>
                  Sajni Re Credit
                </SidebarNavButton>
                <SidebarNavButton onClick={() => navigate("/sajnicash")}>
                  Sajni Re Cash
                </SidebarNavButton>

                {/* ACCOUNT SECTION */}
                <div className="mt-4 text-xs font-semibold tracking-wide text-gray-400 uppercase">
                  Account
                </div>
                <SidebarNavButton onClick={() => navigate("/account")}>
                  Profile
                </SidebarNavButton>
                <SidebarNavButton onClick={() => navigate("/saved-cards")}>
                  Saved Cards
                </SidebarNavButton>
                <SidebarNavButton onClick={() => navigate("/saved-upi")}>
                  Saved UPI
                </SidebarNavButton>
                <SidebarNavButton onClick={() => navigate("/saved-wallets-bnpl")}>
                  Saved Wallets/BNPL
                </SidebarNavButton>
                <SidebarNavButton onClick={() => navigate("/addresses")}>
                  Addresses
                </SidebarNavButton>
                {/* Myntra Insider button removed */}

                <SidebarNavButton onClick={() => navigate("/delete-account")}>
                  Delete Account
                </SidebarNavButton>

                {/* LEGAL */}
                <div className="mt-4 text-xs font-semibold tracking-wide text-gray-400 uppercase">
                  Legal
                </div>
                <SidebarNavButton onClick={() => navigate("/terms")}>
                  Terms of Use
                </SidebarNavButton>
                <SidebarNavButton onClick={() => navigate("/privacypolicy")}>
                  Privacy Center
                </SidebarNavButton>
              </nav>
            </motion.div>
          </aside>

          {/* RIGHT SIDE – MOBILE PAR FULL WIDTH, DESKTOP PAR 9 COLUMNS */}
          <main className="md:col-span-9 pt-2 md:pt-0">
            {/* Mobile-only animated heading */}
            <motion.div
              className="mb-4 md:hidden"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-xl font-semibold text-gray-900">Coupons</h1>
              <motion.div
                className="h-[2px] w-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mt-1"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
              <p className="mt-2 text-xs text-gray-500">
                Apply these offers and save more on your next order.
              </p>
            </motion.div>

            {/* Sort bar with animation */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="flex flex-wrap items-center gap-3 mb-6"
            >
              <span className="text-xs text-gray-500">Sort by:</span>

              {SORT_OPTIONS.map((opt) => (
                <motion.button
                  key={opt.id}
                  type="button"
                  onClick={() => setActiveFilter(opt.id)}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-semibold border overflow-hidden ${
                    activeFilter === opt.id
                      ? "bg-white text-pink-600 border-pink-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {activeFilter === opt.id && (
                    <motion.span
                      layoutId="sortPill"
                      className="absolute inset-0 bg-pink-600/10"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    />
                  )}
                  <motion.span
                    className="relative z-10"
                    animate={
                      activeFilter === opt.id
                        ? {
                            scale: [1, 1.06, 1],
                          }
                        : { scale: 1 }
                    }
                    transition={
                      activeFilter === opt.id
                        ? {
                            duration: 1.4,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }
                        : { duration: 0.2 }
                    }
                  >
                    {opt.label}
                  </motion.span>
                </motion.button>
              ))}
            </motion.div>

            {/* Responsive Coupon Grid – items stretch, cards full height */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {paginatedCoupons.map((coupon, i) => (
                <div key={coupon.id} className="h-full">
                  <CouponCard
                    coupon={coupon}
                    onViewProducts={handleViewProducts}
                    index={i}
                  />
                </div>
              ))}
            </motion.div>

            {/* Pagination Animated */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-10 pt-6 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-gray-600"
            >
              <div>
                Page {currentPage} of {totalPages}
              </div>

              <div className="flex items-center">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <motion.button
                      key={page}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={pageButtonClass(page, currentPage)}
                    >
                      {page}
                    </motion.button>
                  )
                )}

                <motion.button
                  whileHover={{
                    scale: currentPage === totalPages ? 1 : 1.05,
                  }}
                  whileTap={{
                    scale: currentPage === totalPages ? 1 : 0.95,
                  }}
                  type="button"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`ml-3 px-4 h-7 flex items-center justify-center text-xs border rounded-sm ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  Next
                  <span className="ml-1" aria-hidden>
                    ›
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </main>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Coupons;
