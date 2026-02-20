// src/pages/Addresses.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// ✅ All Indian States + Union Territories
const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

// ✅ Major cities list
const citiesByState = {
  "Andhra Pradesh": [
    "Visakhapatnam",
    "Vijayawada",
    "Guntur",
    "Nellore",
    "Kurnool",
    "Tirupati",
  ],
  "Arunachal Pradesh": ["Itanagar", "Tawang", "Pasighat"],
  Assam: ["Guwahati", "Silchar", "Dibrugarh", "Jorhat"],
  Bihar: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
  Chhattisgarh: ["Raipur", "Bhilai", "Bilaspur"],
  Goa: ["Panaji", "Margao", "Vasco da Gama"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Junagadh"],
  Haryana: ["Gurugram", "Faridabad", "Panipat", "Ambala", "Karnal"],
  "Himachal Pradesh": ["Shimla", "Dharamshala", "Manali"],
  Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
  Karnataka: ["Bengaluru", "Mysuru", "Mangalore", "Hubballi", "Belagavi"],
  Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad"],
  Manipur: ["Imphal"],
  Meghalaya: ["Shillong"],
  Mizoram: ["Aizawl"],
  Nagaland: ["Kohima", "Dimapur"],
  Odisha: ["Bhubaneswar", "Cuttack", "Rourkela", "Puri"],
  Punjab: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Mohali"],
  Rajasthan: ["Jaipur", "Udaipur", "Jodhpur", "Kota", "Ajmer"],
  Sikkim: ["Gangtok"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
  Telangana: ["Hyderabad", "Warangal", "Nizamabad"],
  Tripura: ["Agartala"],
  "Uttar Pradesh": [
    "Agra",
    "Lucknow",
    "Kanpur",
    "Noida",
    "Ghaziabad",
    "Varanasi",
    "Prayagraj",
    "Meerut",
    "Bareilly",
    "Aligarh",
  ],
  Uttarakhand: ["Dehradun", "Haridwar", "Rishikesh", "Haldwani"],
  "West Bengal": ["Kolkata", "Siliguri", "Durgapur", "Asansol"],
  "Andaman and Nicobar Islands": ["Port Blair"],
  Chandigarh: ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa"],
  Delhi: ["New Delhi", "Dwarka", "Rohini", "Pitampura", "Saket"],
  "Jammu and Kashmir": ["Srinagar", "Jammu"],
  Ladakh: ["Leh", "Kargil"],
  Lakshadweep: ["Kavaratti"],
  Puducherry: ["Puducherry", "Karaikal"],
};

const getDigits = (v) => (v || "").replace(/\D/g, "");

// ✅ mobile normalisation
const normalizeMobile = (v) => {
  let digits = getDigits(v || "");
  digits = digits.replace(/^0+/, "");
  if (digits.length > 10) {
    digits = digits.slice(-10);
  }
  return digits;
};

// 🔹 Animations
const pageVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

const Addresses = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [useCustomCity, setUseCustomCity] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    pincode: "",
    state: "",
    houseNumber: "",
    addressLine: "",
    locality: "",
    city: "",
    addressType: "home",
    makeDefault: false,
  });

  // user load
  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user")) || null;
      setUser(u);
    } catch (e) {
      setUser(null);
    }
  }, []);

  // addresses load
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("addresses")) || [];
      setAddresses(stored);
    } catch (e) {
      setAddresses([]);
    }
  }, []);

  // prefill name + mobile
  useEffect(() => {
    if (!user) return;

    const nameFromUser =
      user.name || user.fullName || user.full_name || user.username || "";

    const phoneRaw =
      user.phone ||
      user.mobile ||
      user.phoneNumber ||
      user.contactNumber ||
      "";

    const last10 = normalizeMobile(phoneRaw);

    setFormData((prev) => ({
      ...prev,
      name: prev.name || nameFromUser,
      mobile: last10 || prev.mobile,
    }));
  }, [user]);

  const userName =
    (user &&
      (user.name ||
        user.fullName ||
        user.full_name ||
        user.username)) ||
    "Sajni Re User";

  const handleChange = (field) => (e) => {
    const value = field === "makeDefault" ? e.target.checked : e.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleStateChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      state: value,
      city: "",
    }));
    setUseCustomCity(false);
  };

  const handleAddressTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      addressType: type,
    }));
  };

  const handleDeleteAddress = (id) => {
    const updated = addresses.filter((a) => a.id !== id);
    setAddresses(updated);
    localStorage.setItem("addresses", JSON.stringify(updated));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanMobile = normalizeMobile(formData.mobile);

    const newAddress = {
      id: Date.now(),
      ...formData,
      mobile: cleanMobile,
    };

    let updated = [];
    if (newAddress.makeDefault) {
      updated = [
        { ...newAddress, makeDefault: true },
        ...addresses.map((a) => ({ ...a, makeDefault: false })),
      ];
    } else {
      updated = [newAddress, ...addresses];
    }

    setAddresses(updated);
    localStorage.setItem("addresses", JSON.stringify(updated));

    setFormData({
      name: "",
      mobile: "",
      pincode: "",
      state: "",
      houseNumber: "",
      addressLine: "",
      locality: "",
      city: "",
      addressType: "home",
      makeDefault: false,
    });
    setUseCustomCity(false);
    setShowForm(false);
  };

  const isMobileValid = normalizeMobile(formData.mobile).length === 10;

  const isSaveDisabled =
    !formData.name ||
    !isMobileValid ||
    !formData.pincode ||
    !formData.houseNumber ||
    !formData.addressLine ||
    !formData.city ||
    !formData.state;

  const baseCities = citiesByState[formData.state] || [];
  const availableCities = formData.state ? [...baseCities, "__OTHER__"] : [];

  return (
    <motion.main
      className="min-h-[500px] bg-white"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* ✅ Account heading hata diya – direct content start */}

        <div className="flex flex-col md:flex-row gap-6 md:gap-0">
          {/* LEFT SIDEBAR – only desktop */}
          <aside className="hidden md:block md:w-64 md:pr-10 mb-0 border-b md:border-b-0 md:border-r border-gray-200">
            <nav className="space-y-6 pb-6 text-sm">
              <div>
                <button
                  type="button"
                  className="text-gray-800 hover:text-pink-600"
                  onClick={() => navigate("/account")}
                >
                  Overview
                </button>
              </div>

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
                    className="block text-gray-800 hover:text-pink-600"
                    onClick={() => navigate("/sajni-credit")}
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
                    onClick={() => navigate("/saved-upi")}
                  >
                    Saved UPI
                  </button>
                  <button
                    type="button"
                    className="block text-gray-800 hover:text-pink-600"
                    onClick={() => navigate("/saved-wallets-bnpl")}
                  >
                    Saved Wallets/BNPL
                  </button>
                  <span className="block text-emerald-500 font-semibold">
                    Addresses
                  </span>
                  {/* Sajni Re Insider button hata diya */}
                </div>
              </div>

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

          {/* RIGHT CONTENT – full-width on mobile */}
          <motion.section
            className="flex-1 mt-2 md:mt-0"
            variants={listVariants}
          >
            {/* LIST MODE */}
            {!showForm && (
              <div className="py-4 sm:py-6">
                {addresses.length === 0 ? (
                  <motion.div
                    className="flex items-center justify-center"
                    variants={cardVariants}
                  >
                    <div className="flex flex-col items-center text-center py-10 px-4 w-full max-w-md">
                      <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.25 }}
                      >
                        <img
                          src="https://via.placeholder.com/160x130?text=Address"
                          alt="Addresses"
                          className="w-28 sm:w-32 mb-6 object-contain"
                        />
                      </motion.div>
                      <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-gray-900">
                        Save your addresses now
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-500 mt-2">
                        Add your home and office addresses and enjoy faster
                        checkout.
                      </p>
                      <motion.button
                        type="button"
                        className="mt-6 w-full sm:w-auto px-8 py-2 border border-indigo-400 text-indigo-500 text-xs sm:text-sm font-semibold rounded-md hover:bg-indigo-50 uppercase tracking-wide"
                        onClick={() => setShowForm(true)}
                        whileHover={{ y: -1, scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        + Add New Address
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {/* Header + button */}
                    <motion.div
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2"
                      variants={cardVariants}
                    >
                      <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-gray-800">
                        Saved Addresses
                      </h2>
                      <motion.button
                        type="button"
                        className="w-full sm:w-auto px-6 py-2 border border-indigo-400 text-indigo-500 text-xs font-semibold rounded-md hover:bg-indigo-50 uppercase tracking-wide"
                        onClick={() => setShowForm(true)}
                        whileHover={{ y: -1, scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        + Add New Address
                      </motion.button>
                    </motion.div>

                    {/* Address cards */}
                    <motion.div
                      className="space-y-3 sm:space-y-4"
                      variants={listVariants}
                    >
                      {addresses.map((addr) => (
                        <motion.div
                          key={addr.id}
                          variants={cardVariants}
                          whileHover={{
                            y: -2,
                            boxShadow:
                              "0 10px 25px rgba(15,23,42,0.08)",
                          }}
                          className="border border-gray-200 rounded-md px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-800 bg-white"
                        >
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div className="font-semibold">
                              {addr.name}
                              {addr.makeDefault && (
                                <span className="ml-2 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wide text-emerald-500 border border-emerald-400 px-1.5 py-0.5 rounded">
                                  Default
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] sm:text-[11px] uppercase tracking-wide text-gray-500">
                              {addr.addressType === "home" ? "Home" : "Office"}
                            </div>
                          </div>

                          <div className="text-[11px] sm:text-xs text-gray-600 space-y-0.5">
                            <p>
                              {addr.houseNumber}
                              {addr.addressLine
                                ? ` ${addr.addressLine},`
                                : ","}
                            </p>
                            {addr.locality && <p>{addr.locality}</p>}
                            <p>
                              {addr.city}, {addr.state} - {addr.pincode}
                            </p>
                            <p className="mt-1">
                              Mobile:{" "}
                              <span className="font-medium">
                                +91 {normalizeMobile(addr.mobile)}
                              </span>
                            </p>
                          </div>

                          <div className="mt-3 flex justify-end">
                            <button
                              type="button"
                              onClick={() => handleDeleteAddress(addr.id)}
                              className="text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-red-500 hover:text-red-600"
                            >
                              Remove
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                )}
              </div>
            )}

            {/* FORM MODE */}
            {showForm && (
              <motion.div
                className="w-full max-w-2xl border border-gray-200 rounded-md bg-white mx-auto"
                variants={cardVariants}
              >
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-gray-800">
                    Add New Address
                  </h2>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="px-4 sm:px-6 py-4 sm:py-5 space-y-6 text-xs sm:text-sm text-gray-800">
                    {/* Name + Mobile */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] sm:text-[11px] uppercase tracking-wide text-gray-500 mb-1">
                          Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={handleChange("name")}
                          className="w-full border-0 border-b border-gray-300 focus:border-gray-600 focus:outline-none py-1"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] sm:text-[11px] uppercase tracking-wide text-gray-500 mb-1">
                          Mobile *
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-md px-3 bg-white">
                          <span className="text-gray-700 text-xs sm:text-sm font-medium select-none">
                            +91
                          </span>
                          <input
                            type="text"
                            maxLength={10}
                            value={formData.mobile}
                            onChange={(e) => {
                              const clean = normalizeMobile(e.target.value);
                              setFormData((prev) => ({
                                ...prev,
                                mobile: clean,
                              }));
                            }}
                            className="flex-1 ml-2 py-2 text-xs sm:text-sm focus:outline-none"
                            placeholder="Enter 10 digit number"
                          />
                        </div>

                        {formData.mobile.length > 0 &&
                          formData.mobile.length < 10 && (
                            <p className="text-red-500 text-[10px] sm:text-xs mt-1">
                              Mobile number must be 10 digits
                            </p>
                          )}
                      </div>
                    </div>

                    <hr className="border-gray-200" />

                    {/* Pincode + State */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-[10px] sm:text-[11px] uppercase tracking-wide text-gray-500 mb-1">
                          Pincode *
                        </label>
                        <input
                          type="text"
                          value={formData.pincode}
                          onChange={handleChange("pincode")}
                          className="w-full border-0 border-b border-gray-300 focus:border-gray-600 focus:outline-none py-1"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] sm:text-[11px] uppercase tracking-wide text-gray-500 mb-1">
                          State *
                        </label>
                        <select
                          value={formData.state}
                          onChange={handleStateChange}
                          className="w-full border-0 border-b border-gray-300 focus:border-gray-600 focus:outline-none py-1 bg-transparent text-[11px] sm:text-xs uppercase text-gray-700"
                        >
                          <option value="">Select State</option>
                          {indianStates.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* House Number */}
                    <div>
                      <label className="block text-[10px] sm:text-[11px] uppercase tracking-wide text-gray-500 mb-1">
                        House Number/Tower/Block *
                      </label>
                      <input
                        type="text"
                        value={formData.houseNumber}
                        onChange={handleChange("houseNumber")}
                        className="w-full border-0 border-b border-gray-300 focus:border-gray-600 focus:outline-none py-1"
                      />
                    </div>

                    {/* Address line */}
                    <div>
                      <label className="block text-[10px] sm:text-[11px] uppercase tracking-wide text-gray-500 mb-1">
                        Address (Building, Street, Area) *
                      </label>
                      <input
                        type="text"
                        value={formData.addressLine}
                        onChange={handleChange("addressLine")}
                        className="w-full border-0 border-b border-gray-300 focus:border-gray-600 focus:outline-none py-1"
                      />
                    </div>

                    {/* City + Locality */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-[10px] sm:text-[11px] uppercase tracking-wide text-gray-500 mb-1">
                          City / District *
                        </label>
                        <select
                          value={
                            useCustomCity ? "__OTHER__" : formData.city || ""
                          }
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === "__OTHER__") {
                              setUseCustomCity(true);
                              setFormData((prev) => ({
                                ...prev,
                                city: "",
                              }));
                            } else {
                              setUseCustomCity(false);
                              setFormData((prev) => ({
                                ...prev,
                                city: value,
                              }));
                            }
                          }}
                          className="w-full border-0 border-b border-gray-300 focus:border-gray-600 focus:outline-none py-1 bg-transparent text-[11px] sm:text-xs text-gray-700"
                        >
                          <option value="">Select City / District</option>
                          {formData.state &&
                            availableCities.map((c) =>
                              c === "__OTHER__" ? (
                                <option key="__OTHER__" value="__OTHER__">
                                  Other (Write Manually)
                                </option>
                              ) : (
                                <option key={c} value={c}>
                                  {c}
                                </option>
                              )
                            )}
                        </select>

                        {useCustomCity && (
                          <input
                            type="text"
                            value={formData.city}
                            onChange={handleChange("city")}
                            className="mt-2 w-full border-0 border-b border-gray-300 focus:border-gray-600 focus:outline-none py-1"
                            placeholder="Enter City / District"
                          />
                        )}
                      </div>
                      <div>
                        <label className="block text-[10px] sm:text-[11px] uppercase tracking-wide text-gray-500 mb-1">
                          Locality / Town
                        </label>
                        <input
                          type="text"
                          value={formData.locality}
                          onChange={handleChange("locality")}
                          className="w-full border-0 border-b border-gray-300 focus:border-gray-600 focus:outline-none py-1"
                        />
                      </div>
                    </div>

                    {/* Type of Address + default */}
                    <div className="pt-1 sm:pt-2">
                      <label className="block text-[10px] sm:text-[11px] uppercase tracking-wide text-gray-500 mb-2">
                        Type of Address *
                      </label>
                      <div className="flex items-center gap-6 text-xs sm:text-sm">
                        <label className="inline-flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="addressType"
                            value="home"
                            checked={formData.addressType === "home"}
                            onChange={() => handleAddressTypeChange("home")}
                            className="accent-pink-500"
                          />
                          <span>Home</span>
                        </label>

                        <label className="inline-flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="addressType"
                            value="office"
                            checked={formData.addressType === "office"}
                            onChange={() => handleAddressTypeChange("office")}
                            className="accent-pink-500"
                          />
                          <span>Office</span>
                        </label>
                      </div>

                      <label className="mt-4 inline-flex items-center gap-2 cursor-pointer text-[11px] sm:text-xs text-gray-700">
                        <input
                          type="checkbox"
                          checked={formData.makeDefault}
                          onChange={handleChange("makeDefault")}
                          className="accent-pink-500"
                        />
                        <span>Make this as my default address</span>
                      </label>
                    </div>
                  </div>

                  {/* Bottom buttons */}
                  <div className="mt-3 border-t border-gray-200 flex">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setUseCustomCity(false);
                      }}
                      className="flex-1 py-3 text-[11px] sm:text-sm font-semibold uppercase tracking-wide text-gray-600 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSaveDisabled}
                      className={`flex-1 py-3 text-[11px] sm:text-sm font-semibold uppercase tracking-wide ${
                        isSaveDisabled
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-gray-800 text-white hover:bg-black"
                      }`}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </motion.section>
        </div>
      </div>
    </motion.main>
  );
};

export default Addresses;
