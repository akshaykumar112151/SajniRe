// src/components/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/Logo.png";
import AuthModal from "./AuthModal";

const Navbar = () => {
  const [showCollectionDropdown, setShowCollectionDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileCollectionOpen, setMobileCollectionOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  // refs for outside click close
  const profileRef = useRef(null);
  const collectionRef = useRef(null);

  // === LOCAL STORAGE SYNC ===
  const updateFromStorage = () => {
    try {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const u = JSON.parse(localStorage.getItem("user")) || null;
      setWishlistCount(wishlist.length);
      setCartCount(cart.length);
      setUser(u);
    } catch (e) {
      setWishlistCount(0);
      setCartCount(0);
      setUser(null);
    }
  };

  useEffect(() => {
    updateFromStorage();
    window.addEventListener("storage", updateFromStorage);
    const onUserChanged = () => updateFromStorage();
    window.addEventListener("userChanged", onUserChanged);
    return () => {
      window.removeEventListener("storage", updateFromStorage);
      window.removeEventListener("userChanged", onUserChanged);
    };
  }, []);

  const signedIn = !!user;

  // close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileDropdown(false);
      }
      if (collectionRef.current && !collectionRef.current.contains(e.target)) {
        setShowCollectionDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleOpenAuth = (mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
    setShowProfileDropdown(false);
    setMobileMenuOpen(false);
  };

  const handleAuthSuccess = (u) => {
    setUser(u);
    try {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setWishlistCount(wishlist.length);
      setCartCount(cart.length);
    } catch (e) {}
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("user");
    } catch (e) {}
    window.dispatchEvent(new Event("userChanged"));
    setUser(null);
    setShowProfileDropdown(false);
    try {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setWishlistCount(wishlist.length);
      setCartCount(cart.length);
    } catch (e) {}
  };

  const displayPhone = (p) => {
    if (!p) return "";
    const cleaned = (p + "").replace(/\D/g, "");
    if (cleaned.length === 12 && cleaned.startsWith("91")) return "+" + cleaned;
    if (cleaned.length === 10) return cleaned;
    return p;
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = searchTerm.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setMobileSearchOpen(false);
  };

  // ========= PROFILE MENU =========
  const ProfileMenu = () => (
    <div className="w-80 p-4 text-sm text-gray-800">
      {!signedIn ? (
        // =================== NOT LOGGED IN ===================
        <>
          <div className="mb-3">
            <p className="text-sm font-semibold text-gray-900">Welcome</p>
            <p className="text-xs text-gray-500">
              To access account and manage orders
            </p>
          </div>

          {/* TWO SEPARATE BUTTONS: LOGIN + SIGNUP */}
          <div className="flex gap-2 mb-3">
            <motion.button
              onClick={() => handleOpenAuth("login")}
              whileHover={{ scale: 1.03 }}
              className="flex-1 py-2 rounded-md border border-pink-200 text-pink-600 font-semibold bg-white text-xs uppercase tracking-wide"
            >
              <span className="inline-block mr-2">👤</span> LOGIN
            </motion.button>

            <motion.button
              onClick={() => handleOpenAuth("signup")}
              whileHover={{ scale: 1.03 }}
              className="flex-1 py-2 rounded-md bg-pink-600 text-white font-semibold text-xs uppercase tracking-wide"
            >
              <span className="inline-block mr-2">✨</span> SIGNUP
            </motion.button>
          </div>

          <hr className="border-t border-gray-100 my-3" />

          <div className="space-y-2 text-sm">
            <button
              onClick={() => {
                setShowProfileDropdown(false);
                navigate("/orders");
              }}
              className="w-full text-left hover:text-pink-600"
            >
              Orders
            </button>
            <button
              onClick={() => {
                setShowProfileDropdown(false);
                navigate("/wishlist");
              }}
              className="w-full text-left hover:text-pink-600"
            >
              Wishlist
            </button>
            <button
              onClick={() => {
                setShowProfileDropdown(false);
                navigate("/contact");
              }}
              className="w-full text-left hover:text-pink-600"
            >
              Contact Us
            </button>

            <hr className="border-t border-gray-100 my-3" />

            <button
              type="button"
              onClick={() => {
                setShowProfileDropdown(false);
                navigate("/sajni-credit");
              }}
              className="w-full text-left hover:text-pink-600"
            >
              Sajni Re Credit
            </button>
            <button
              type="button"
              onClick={() => {
                setShowProfileDropdown(false);
                navigate("/coupons");
              }}
              className="w-full text-left hover:text-pink-600"
            >
              Coupons
            </button>
            <button
              type="button"
              onClick={() => {
                setShowProfileDropdown(false);
                navigate("/saved-cards");
              }}
              className="w-full text-left hover:text-pink-600"
            >
              Saved Cards
            </button>
          </div>
        </>
      ) : (
        // =================== LOGGED IN ===================
        <>
          <div className="mb-3">
            <p className="text-sm font-semibold text-gray-900">
              Hello{" "}
              <span className="font-medium">
                {user.name ||
                  user.fullName ||
                  user.full_name ||
                  user.username ||
                  "Sajni Re User"}
              </span>
            </p>
            {user.phone && (
              <p className="text-xs text-gray-500 mt-1">
                {displayPhone(user.phone)}
              </p>
            )}
          </div>

          <hr className="border-t border-gray-100 my-3" />

          <div className="space-y-2 text-sm">
            <button
              onClick={() => {
                setShowProfileDropdown(false);
                navigate("/orders");
              }}
              className="w-full text-left hover:text-pink-600"
            >
              Orders
            </button>
            <button
              onClick={() => {
                setShowProfileDropdown(false);
                navigate("/wishlist");
              }}
              className="w-full text-left hover:text-pink-600"
            >
              Wishlist
            </button>
            <button
              onClick={() => {
                setShowProfileDropdown(false);
                navigate("/contact");
              }}
              className="w-full text-left hover:text-pink-600"
            >
              Contact Us
            </button>

            <hr className="border-t border-gray-100 my-3" />

            <button
              type="button"
              onClick={() => {
                setShowProfileDropdown(false);
                navigate("/sajni-credit");
              }}
              className="w-full text-left hover:text-pink-600"
            >
              Sajni Re Credit
            </button>
            <button
              type="button"
              onClick={() => {
                setShowProfileDropdown(false);
                navigate("/coupons");
              }}
              className="w-full text-left hover:text-pink-600"
            >
              Coupons
            </button>
            <button
              type="button"
              onClick={() => {
                setShowProfileDropdown(false);
                navigate("/saved-cards");
              }}
              className="w-full text-left hover:text-pink-600"
            >
              Saved Cards
            </button>
          </div>

          <hr className="border-t border-gray-100 my-3" />

          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                setShowProfileDropdown(false);
                navigate("/account?section=edit");
              }}
              className="w-full text-left text-sm font-medium text-gray-800 hover:text-pink-600"
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left text-sm text-red-600 font-medium hover:underline"
            >
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );

  return (
    <header id="header-35" className="w-full bg-white text-black shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-24 md:h-28 lg:h-32">
          {/* Left: Logo + Mobile Hamburger */}
          <div className="flex items-center gap-4 md:gap-6">
            <button
              className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              onClick={() => setMobileMenuOpen((s) => !s)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <FaTimes className="text-2xl md:text-3xl" />
              ) : (
                <FaBars className="text-2xl md:text-3xl" />
              )}
            </button>

            <Link to="/" className="flex items-center">
              <img
                src={Logo}
                alt="Sajni Re Logo"
                className="h-16 md:h-24 lg:h-28 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Center links */}
          <nav className="hidden md:flex gap-12 text-lg md:text-xl lg:text-2xl font-semibold items-center">
            <Link to="/" className="hover:text-pink-500 transition">
              Home
            </Link>
            <Link to="/shop" className="hover:text-[#9a6b47] transition">
              Shop
            </Link>

            {/* Desktop Collection: CLICK ONLY + ref */}
            <div className="relative" ref={collectionRef}>
              <button
                type="button"
                className="hover:text-pink-500 transition cursor-pointer"
                onClick={() =>
                  setShowCollectionDropdown((prev) => !prev)
                }
              >
                Collection
              </button>

              <AnimatePresence>
                {showCollectionDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 mt-2 w-60 bg-white shadow-lg rounded-lg py-2 z-50"
                  >
                    {[
                      "Bracelets",
                      "Earrings",
                      "Mangalsutra",
                      "Necklace",
                      "Pendant Set",
                      "Rings",
                    ].map((item, index) => (
                      <Link
                        key={index}
                        to={`/collection/${item
                          .toLowerCase()
                          .replace(" ", "-")}`}
                        className="block px-4 py-2 text-lg text-gray-700 hover:bg-pink-100 hover:text-pink-500 transition"
                        onClick={() => setShowCollectionDropdown(false)}
                      >
                        {item}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/contact" className="hover:text-pink-500 transition">
              Contact Us
            </Link>
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-6">
            {/* Desktop search */}
            <div className="hidden md:flex items-center gap-3">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-300 text-black rounded px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-pink-400 transition text-base md:text-lg"
                />
                <button
                  type="submit"
                  className="p-2 rounded-md hover:text-pink-500"
                  aria-label="Search"
                >
                  <FaSearch className="cursor-pointer text-2xl md:text-3xl" />
                </button>
              </form>
            </div>

            {/* Mobile search icon */}
            <button
              className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              onClick={() => setMobileSearchOpen((s) => !s)}
              aria-label="Open search"
            >
              <FaSearch className="text-xl" />
            </button>

            {/* Wishlist */}
            <div
              className="relative cursor-pointer"
              onClick={() => navigate("/wishlist")}
              aria-label="Wishlist"
              title="Wishlist"
            >
              <FaHeart className="hover:text-pink-500 text-2xl md:text-3xl" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </div>

            {/* Cart */}
            <div
              className="cursor-pointer"
              onClick={() => navigate("/checkout")}
              aria-label="Cart"
              title="Cart"
            >
              <FaShoppingCart className="hover:text-pink-500 text-2xl md:text-3xl" />
            </div>

            {/* Profile: CLICK ONLY + ref */}
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                className="cursor-pointer p-1 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                aria-label="Profile"
                title="Profile"
                onClick={() =>
                  setShowProfileDropdown((prev) => !prev)
                }
              >
                <FaUser className="hover:text-pink-500 text-2xl md:text-3xl" />
              </button>

              <AnimatePresence>
                {showProfileDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.12 }}
                    className="absolute right-0 mt-3 z-50"
                  >
                    <div className="bg-white rounded-md shadow-lg border border-gray-100">
                      <ProfileMenu />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="md:hidden px-4 pb-3"
          >
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <button
                type="submit"
                className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
              >
                Search
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="md:hidden px-4 pb-4"
          >
            <div className="bg-white rounded-md shadow-md border border-gray-100 p-4 space-y-3">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base md:text-lg font-medium"
              >
                Home
              </Link>
              <Link
                to="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base md:text-lg font-medium"
              >
                Shop
              </Link>

              <button
                onClick={() => setMobileCollectionOpen((s) => !s)}
                className="w-full flex items-center justify-between text-left text-base md:text-lg font-medium"
              >
                <span>Collection</span>
                <span>{mobileCollectionOpen ? "▴" : "▾"}</span>
              </button>

              {mobileCollectionOpen && (
                <div className="pl-3 space-y-1">
                  {[
                    "Bracelets",
                    "Earrings",
                    "Mangalsutra",
                    "Necklace",
                    "Pendant Set",
                    "Rings",
                  ].map((item, index) => (
                    <Link
                      key={index}
                      to={`/collection/${item
                        .toLowerCase()
                        .replace(" ", "-")}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-sm md:text-base text-gray-700 pl-2"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}

              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base md:text-lg font-medium"
              >
                Contact Us
              </Link>

              {/* 🔥 Orders / Wishlist / Account / Logout MOBILE MENU SE HATA DIYA */}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <AuthModal
        mode={authMode}
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </header>
  );
};

export default Navbar;
