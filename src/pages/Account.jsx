// src/pages/Account.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// 🔹 Overview tile images
import OverviewOrders from "../assets/OverviewOrders.png";
import OverviewCollectionsandWishlist from "../assets/OverviewCollectionsandWishlist.png";
import OverviewSajniReCredit from "../assets/OverviewSajniReCredit.png";
import OverviewSajniCash from "../assets/OverviewSajniCash.png";
import OverviewSavedCards from "../assets/OverviewSavedCards.png";
import OverviewSavedUPI from "../assets/OverviewSavedUPI.png";
import OverviewWalletsandBNPL from "../assets/OverviewWalletsandBNPL.png";
import OverviewAddresses from "../assets/OverviewAddresses.png";
import OverviewCoupons from "../assets/OverviewCoupons.png";
import OverviewProfileDetails from "../assets/OverviewProfileDetails.png";

/**
 * Reads user object from localStorage safely
 */
const readUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch (e) {
    return null;
  }
};

/**
 * Saves user object to localStorage safely
 */
const saveUser = (u) => {
  try {
    localStorage.setItem("user", JSON.stringify(u));
  } catch (e) {
    console.error("save user failed", e);
  }
};

// helpers
const isPhoneValid = (p) => p && p.replace(/\D/g, "").length === 10;

// sirf last 10 digits nikal lo (agar +91 ya kuch aur bhi ho to)
const extract10Digits = (value) => {
  if (!value) return "";
  const digits = String(value).replace(/\D/g, "");
  if (!digits) return "";
  return digits.slice(-10); // last 10 digits as mobile
};

const normalizePhoneDigits = (p) => extract10Digits(p);
const formatPhoneForDisplay = (p) =>
  isPhoneValid(p) ? normalizePhoneDigits(p) : p || "";
const displayOrNotAdded = (value) =>
  value && String(value).trim() !== "" ? value : "- not added -";

/* -------------------
   FeatureCard component (animated) – desktop view
   ------------------- */
const FeatureCard = ({ title, subtitle, imgSrc, onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ y: -4, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 260, damping: 18 }}
    className="w-full text-left border border-gray-200 rounded-lg p-8 flex flex-col items-center gap-3 bg-white"
  >
    <div className="w-16 h-16 flex items-center justify-center">
      <img src={imgSrc} alt={title} className="max-h-12 object-contain" />
    </div>
    <div className="text-sm font-semibold text-gray-800 text-center">
      {title}
    </div>
    <div className="text-xs text-gray-400 text-center">{subtitle}</div>
  </motion.button>
);

/* -------------------
   Account page
   ------------------- */
const Account = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(readUser());
  const [primaryCity, setPrimaryCity] = useState("");
  const [view, setView] = useState("overview");

  // Form fields
  const [phone, setPhone] = useState(() =>
    user?.phone ? extract10Digits(user.phone) : ""
  );
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [birthday, setBirthday] = useState(user?.birthday || "");
  const [altMobile, setAltMobile] = useState(
    user?.altMobile ? extract10Digits(user.altMobile) : ""
  );
  const [hintName, setHintName] = useState(user?.hintName || "");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  // Avatar
  const fileInputRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
  const [avatarError, setAvatarError] = useState("");

  useEffect(() => {
    const u = readUser();
    setUser(u);
    setPhone(u?.phone ? extract10Digits(u.phone) : "");
    setName(u?.name || "");
    setEmail(u?.email || "");
    setGender(u?.gender || "");
    setBirthday(u?.birthday || "");
    setAltMobile(u?.altMobile ? extract10Digits(u.altMobile) : "");
    setHintName(u?.hintName || "");
    setAvatarPreview(u?.avatar || null);

    try {
      const stored = JSON.parse(localStorage.getItem("addresses")) || [];
      if (stored.length > 0) {
        const def = stored.find((a) => a.makeDefault) || stored[0];
        setPrimaryCity(def.city || "");
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const notifyUserChanged = () => {
    window.dispatchEvent(new Event("userChanged"));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setMsg("");

    if (!isPhoneValid(phone)) {
      setMsg("Please enter a valid 10 digit mobile number.");
      return;
    }

    const mobileDigits = normalizePhoneDigits(phone); // exactly 10 digits
    const altMobileDigits = normalizePhoneDigits(altMobile || "");

    setSaving(true);
    setTimeout(() => {
      const updated = {
        ...(user || {}),
        name: name.trim(),
        // store as +91 + 10 digits (single +91)
        phone: mobileDigits ? `+91${mobileDigits}` : "",
        email: email.trim(),
        gender,
        birthday: birthday.trim(),
        altMobile: altMobileDigits ? `+91${altMobileDigits}` : "",
        hintName: hintName.trim(),
        avatar: avatarPreview || null,
        updatedAt: new Date().toISOString(),
      };

      saveUser(updated);
      setUser(updated);
      notifyUserChanged();

      setSaving(false);
      setMsg("Profile saved.");
      setView("profile");
    }, 600);
  };

  const SidebarItem = ({ label, id }) => {
    const active = view === id;
    return (
      <motion.button
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        onClick={() => setView(id)}
        className={`block w-full text-left py-2 text-sm ${
          active ? "font-semibold text-green-500" : "text-gray-800"
        }`}
      >
        {label}
      </motion.button>
    );
  };

  // 🔴 LOGOUT: clear storage + redirect + scroll to top
  const handleLogout = () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.error("Failed to clear storage on logout", e);
    }

    notifyUserChanged();
    setUser(null);
    setView("overview");

    navigate("/");

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, 50);
  };

  const onAvatarClick = () => {
    setAvatarError("");
    fileInputRef.current?.click();
  };

  const onFileSelected = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setAvatarError("Invalid file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setAvatarError("Image must be < 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = reader.result;
      setAvatarPreview(img);
      const updated = { ...(user || {}), avatar: img };
      saveUser(updated);
      setUser(updated);
      notifyUserChanged();
    };
    reader.readAsDataURL(file);
  };

  // 🔹 Remove avatar
  const handleRemoveAvatar = () => {
    setAvatarPreview(null);
    const updated = { ...(user || {}), avatar: null };
    saveUser(updated);
    setUser(updated);
    notifyUserChanged();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // 🔹 Coupons page navigation helper – sidebar + overview tiles dono yahi use karenge
  const goToCoupons = () => {
    navigate("/coupons");
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, 50);
  };

  // 🔹 Values for display
  const fullNameDisplay = name || user?.name;
  const emailDisplay = email || user?.email || "";

  const phoneDigitsForDisplay =
    phone && isPhoneValid(phone)
      ? normalizePhoneDigits(phone)
      : user?.phone
      ? extract10Digits(user.phone)
      : "";

  const phoneDisplay = phoneDigitsForDisplay
    ? `+91 ${phoneDigitsForDisplay}`
    : "";

  const altMobileDigitsDisplay =
    altMobile && isPhoneValid(altMobile)
      ? normalizePhoneDigits(altMobile)
      : user?.altMobile
      ? extract10Digits(user.altMobile)
      : "";

  const altMobileDisplay = altMobileDigitsDisplay
    ? `+91 ${altMobileDigitsDisplay}`
    : "";

  // 🔹 Common animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  };

  // 🔹 Overview items (used for mobile list + desktop grid)
  const overviewItems = [
    {
      key: "orders",
      title: "Orders",
      subtitle: "Check your order status",
      imgSrc: OverviewOrders,
      onClick: () => navigate("/orders"),
    },
    {
      key: "wishlist",
      title: "Collections & Wishlist",
      subtitle: "Your saved collections",
      imgSrc: OverviewCollectionsandWishlist,
      onClick: () => navigate("/wishlist"),
    },
    {
      key: "credit",
      title: "Sajni Re Credit",
      subtitle: "Refunds & gift cards",
      imgSrc: OverviewSajniReCredit,
      onClick: () => navigate("/sajni-credit"),
    },
    {
      key: "cash",
      title: "Sajni Re Cash",
      subtitle: "Earn & spend Sajni Cash",
      imgSrc: OverviewSajniCash,
      onClick: () => navigate("/sajnicash"),
    },
    {
      key: "cards",
      title: "Saved Cards",
      subtitle: "Your saved cards",
      imgSrc: OverviewSavedCards,
      onClick: () => navigate("/saved-cards"),
    },
    {
      key: "upi",
      title: "Saved UPI",
      subtitle: "UPI IDs saved for checkout",
      imgSrc: OverviewSavedUPI,
      onClick: () => navigate("/saved-upi"),
    },
    {
      key: "wallets",
      title: "Wallets / BNPL",
      subtitle: "Your wallets & BNPL",
      imgSrc: OverviewWalletsandBNPL,
      onClick: () => navigate("/saved-wallets-bnpl"),
    },
    {
      key: "addresses",
      title: "Addresses",
      subtitle: "Saved addresses",
      imgSrc: OverviewAddresses,
      onClick: () => navigate("/addresses"),
    },
    {
      key: "coupons",
      title: "Coupons",
      subtitle: "Your coupon savings",
      imgSrc: OverviewCoupons,
      onClick: goToCoupons,
    },
  ];

  return (
    <motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={onFileSelected}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {/* Sidebar – mobile par hide, desktop par show */}
          <aside className="hidden md:block md:col-span-3 border-r border-gray-200 pr-6">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-lg font-semibold">Account</div>
              <div className="text-xs text-gray-500 mb-6">
                {user?.name || "Sajni Re User"}
              </div>

              <nav className="text-sm text-gray-700 space-y-1">
                {/* OVERVIEW */}
                <div className="text-[11px] font-semibold text-gray-400 uppercase mt-2">
                  Overview
                </div>
                <SidebarItem label="Overview" id="overview" />

                {/* ORDERS */}
                <div className="mt-4 text-[11px] font-semibold text-gray-400 uppercase">
                  Orders
                </div>
                <motion.button
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  onClick={() => navigate("/orders")}
                  className="block w-full text-left py-2 text-sm text-gray-800"
                >
                  Orders &amp; Returns
                </motion.button>

                {/* CREDITS */}
                <div className="mt-4 text-[11px] font-semibold text-gray-400 uppercase">
                  Credits
                </div>

                <motion.button
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={goToCoupons}
                  className="block w-full text-left py-2 text-sm text-gray-800"
                >
                  Coupons
                </motion.button>

                <motion.button
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/sajni-credit")}
                  className="block w-full text-left py-2 text-sm text-gray-800"
                >
                  Sajni Re Credit
                </motion.button>

                <motion.button
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/sajnicash")}
                  className="block w-full text-left py-2 text-sm text-gray-800"
                >
                  Sajni Re Cash
                </motion.button>

                {/* ACCOUNT */}
                <div className="mt-4 text-[11px] font-semibold text-gray-400 uppercase">
                  Account
                </div>

                <SidebarItem label="Profile" id="profile" />

                <motion.button
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/saved-cards")}
                  className="block w-full text-left py-2 text-sm text-gray-800"
                >
                  Saved Cards
                </motion.button>
                <motion.button
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/saved-upi")}
                  className="block w-full text-left py-2 text-sm text-gray-800"
                >
                  Saved UPI
                </motion.button>
                <motion.button
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/saved-wallets-bnpl")}
                  className="block w-full text-left py-2 text-sm text-gray-800"
                >
                  Saved Wallets / BNPL
                </motion.button>
                <motion.button
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/addresses")}
                  className="block w-full text-left py-2 text-sm text-gray-800"
                >
                  Addresses
                </motion.button>

                {/* LEGAL */}
                <div className="mt-4 text-[11px] font-semibold text-gray-400 uppercase">
                  Legal
                </div>
                <motion.button
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/terms")}
                  className="block w-full text-left py-2 text-sm text-gray-800"
                >
                  Terms of Use
                </motion.button>
                <motion.button
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/privacypolicy")}
                  className="block w-full text-left py-2 text-sm text-gray-800"
                >
                  Privacy Center
                </motion.button>
              </nav>
            </motion.div>
          </aside>

          {/* Main */}
          <main className="md:col-span-9">
            <AnimatePresence mode="wait">
              {/* OVERVIEW PAGE */}
              {view === "overview" && (
                <motion.div
                  key="overview"
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                >
                  {/* Avatar strip – centre like Myntra + EDIT PROFILE button */}
                  <motion.div
                    className="border border-gray-200 rounded-sm mb-6 sm:mb-8 bg-gray-100"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="flex flex-col items-center gap-3 py-5">
                      <div
                        className="w-24 h-24 rounded-full bg-gray-300 overflow-hidden cursor-pointer flex items-center justify-center"
                        onClick={onAvatarClick}
                      >
                        {avatarPreview ? (
                          <img
                            src={avatarPreview}
                            alt="avatar"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <svg
                            viewBox="0 0 64 64"
                            className="w-16 h-16"
                            aria-hidden="true"
                          >
                            <circle cx="32" cy="24" r="12" fill="#e5e7eb" />
                            <path
                              d="M16 52c0-8.8 7.2-16 16-16s16 7.2 16 16"
                              fill="#e5e7eb"
                            />
                          </svg>
                        )}
                      </div>

                      <div className="text-xs sm:text-sm text-gray-800">
                        {emailDisplay || "Add your email in profile"}
                      </div>

                      {/* 👉 EDIT PROFILE button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setView("edit")}
                        className="mt-1 px-4 py-2 border border-gray-400 rounded-sm bg-white text-[11px] sm:text-xs font-semibold tracking-wide"
                      >
                        EDIT PROFILE
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* MOBILE OVERVIEW LIST */}
                  <div className="block md:hidden rounded-sm overflow-hidden border border-gray-200 bg-white">
                    {overviewItems.map((item, index) => (
                      <motion.button
                        key={item.key}
                        onClick={item.onClick}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full flex items-center justify-between px-4 py-3 ${
                          index !== overviewItems.length - 1
                            ? "border-b border-gray-200"
                            : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 flex items-center justify-center">
                            <img
                              src={item.imgSrc}
                              alt={item.title}
                              className="max-h-7 object-contain"
                            />
                          </div>
                          <div className="text-left">
                            <div className="text-sm font-semibold text-gray-800">
                              {item.title}
                            </div>
                            <div className="text-[11px] text-gray-500">
                              {item.subtitle}
                            </div>
                          </div>
                        </div>
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </motion.button>
                    ))}

                    {/* Profile Details row (last) */}
                    <motion.button
                      onClick={() => setView("profile")}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-between px-4 py-3 border-t border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 flex items-center justify-center">
                          <img
                            src={OverviewProfileDetails}
                            alt="Profile Details"
                            className="max-h-7 object-contain"
                          />
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-semibold text-gray-800">
                            Profile Details
                          </div>
                          <div className="text-[11px] text-gray-500">
                            View / edit profile
                          </div>
                        </div>
                      </div>
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </motion.button>
                  </div>

                  {/* DESKTOP GRID OVERVIEW */}
                  <div className="hidden md:grid md:grid-cols-3 md:gap-6">
                    {overviewItems.map((item) => (
                      <FeatureCard
                        key={item.key}
                        title={item.title}
                        subtitle={item.subtitle}
                        imgSrc={item.imgSrc}
                        onClick={item.onClick}
                      />
                    ))}
                  </div>

                  {/* Profile Details tile – desktop only */}
                  <div className="hidden md:grid md:grid-cols-3 md:gap-6 mt-8">
                    <FeatureCard
                      title="Profile Details"
                      subtitle="View / edit profile"
                      imgSrc={OverviewProfileDetails}
                      onClick={() => setView("profile")}
                    />
                  </div>

                  {/* LOGOUT */}
                  <div className="mt-8 sm:mt-10 flex justify-center">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleLogout}
                      className="bg-red-500 text-white px-10 sm:px-16 py-3 rounded-sm font-semibold shadow-sm text-sm sm:text-base"
                    >
                      LOGOUT
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* PROFILE VIEW – MOBILE RESPONSIVE */}
              {view === "profile" && (
                <motion.div
                  key="profile"
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                  className="w-full max-w-3xl bg-white border rounded-sm shadow-sm mt-4 mx-auto"
                >
                  <div className="px-4 sm:px-8 py-4 sm:py-6 border-b">
                    <h2 className="text-base sm:text-lg font-semibold">
                      Profile Details
                    </h2>
                  </div>

                  {/* Rows – har row mobile pe bhi achhi lagegi */}
                  <div className="px-4 sm:px-8 py-4 sm:py-6 text-sm divide-y divide-gray-100">
                    {[
                      ["Full Name", displayOrNotAdded(fullNameDisplay)],
                      ["Mobile Number", displayOrNotAdded(phoneDisplay)],
                      ["Email", displayOrNotAdded(emailDisplay)],
                      ["Gender", displayOrNotAdded(gender)],
                      ["Birthday", displayOrNotAdded(birthday)],
                      ["Location", displayOrNotAdded(primaryCity)],
                      ["Alternate Mobile", displayOrNotAdded(altMobileDisplay)],
                      ["Hint Name", displayOrNotAdded(hintName)],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-3"
                      >
                        <span className="text-gray-600 text-xs sm:text-sm">
                          {label}
                        </span>
                        <span className="text-sm text-gray-900 sm:text-right break-words">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="px-4 sm:px-8 py-4 sm:py-5 border-t flex justify-center">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setView("edit")}
                      className="w-full sm:w-64 py-3 bg-pink-600 text-white rounded-sm font-semibold text-sm sm:text-base"
                    >
                      Edit
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* EDIT VIEW */}
              {view === "edit" && (
                <motion.div
                  key="edit"
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                  className="bg-white rounded-sm border p-5 sm:p-8 shadow-sm"
                >
                  <h3 className="text-lg sm:text-xl font-semibold mb-5 sm:mb-6">
                    Edit Details
                  </h3>

                  <form onSubmit={handleSave} className="space-y-5 sm:space-y-6">
                    {/* Avatar inside Edit form */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-300 overflow-hidden cursor-pointer flex items-center justify-center"
                          onClick={onAvatarClick}
                        >
                          {avatarPreview ? (
                            <img
                              src={avatarPreview}
                              alt="avatar"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <svg
                              viewBox="0 0 64 64"
                              className="w-12 h-12 sm:w-16 sm:h-16"
                              aria-hidden="true"
                            >
                              <circle cx="32" cy="24" r="12" fill="#e5e7eb" />
                              <path
                                d="M16 52c0-8.8 7.2-16 16-16s16 7.2 16 16"
                                fill="#e5e7eb"
                              />
                            </svg>
                          )}
                        </div>
                      </div>

                      {/* Change + Remove buttons side by side */}
                      <div className="flex items-center gap-2 text-[11px] sm:text-xs mt-1">
                        <button
                          type="button"
                          onClick={onAvatarClick}
                          className="px-3 py-1 border border-gray-300 rounded-sm bg-white font-semibold text-gray-800 hover:bg-gray-50"
                        >
                          Change picture
                        </button>

                        <button
                          type="button"
                          onClick={handleRemoveAvatar}
                          className="px-3 py-1 border border-red-400 rounded-sm bg-white font-semibold text-red-600 hover:bg-red-50"
                        >
                          Remove picture
                        </button>
                      </div>
                    </div>

                    {/* Mobile */}
                    <div>
                      <label className="text-xs text-gray-600">
                        Mobile Number*
                      </label>
                      <div className="flex items-center mt-2">
                        <span className="px-3 py-3 border border-gray-300 bg-gray-50 rounded-l text-sm text-gray-700">
                          +91
                        </span>
                        <input
                          value={phone}
                          onChange={(e) =>
                            setPhone(
                              e.target.value.replace(/\D/g, "").slice(0, 10)
                            )
                          }
                          className="flex-1 border border-gray-300 border-l-0 rounded-r px-3 py-3 text-sm"
                          placeholder="10 digit mobile"
                        />
                      </div>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="text-xs text-gray-600">Full Name</label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border rounded px-3 py-3 mt-2 text-sm"
                        placeholder="Full name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-xs text-gray-600">Email</label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded px-3 py-3 mt-2 bg-blue-50 text-sm"
                        placeholder="Email"
                      />
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="text-xs text-gray-600">Gender</label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full border rounded px-3 py-3 mt-2 text-sm"
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>

                    {/* Birthday */}
                    <div>
                      <label className="text-xs text-gray-600">Birthday</label>
                      <input
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        className="w-full border rounded px-3 py-3 mt-2 text-sm"
                        placeholder="dd/mm/yyyy"
                      />
                    </div>

                    {/* Alternate Mobile */}
                    <div>
                      <label className="text-xs text-gray-600">
                        Alternate Mobile
                      </label>
                      <div className="flex items-center mt-2">
                        <span className="px-3 py-3 border border-gray-300 bg-gray-50 rounded-l text-sm text-gray-700">
                          +91
                        </span>
                        <input
                          value={altMobile}
                          onChange={(e) =>
                            setAltMobile(
                              e.target.value.replace(/\D/g, "").slice(0, 10)
                            )
                          }
                          className="flex-1 border border-gray-300 border-l-0 rounded-r px-3 py-3 text-sm bg-blue-50"
                          placeholder="Alternate 10 digit mobile"
                        />
                      </div>
                    </div>

                    {/* Hint Name */}
                    <div>
                      <label className="text-xs text-gray-600">Hint Name</label>
                      <input
                        value={hintName}
                        onChange={(e) => setHintName(e.target.value)}
                        className="w-full border rounded px-3 py-3 mt-2 text-sm"
                      />
                    </div>

                    {avatarError && (
                      <div className="text-xs text-red-600">{avatarError}</div>
                    )}

                    {msg && (
                      <div
                        className={`text-sm ${
                          msg.includes("saved")
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {msg}
                      </div>
                    )}

                    <motion.button
                      type="submit"
                      disabled={saving}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-pink-600 text-white py-3 rounded-sm font-semibold text-sm sm:text-base"
                    >
                      {saving ? "Saving..." : "SAVE DETAILS"}
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Account;
