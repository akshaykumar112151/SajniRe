// src/pages/BraceletsPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SideBarImg from "../assets/sidebar-img.jpg";

const colorMeta = {
  violet: { label: "Violet", swatch: "#8F00FF" },
  indigo: { label: "Indigo", swatch: "#4B0082" },
  blue:   { label: "Blue",   swatch: "#0000FF" },
  green:  { label: "Green",  swatch: "#008000" },
  yellow: { label: "Yellow", swatch: "#FFFF00" },
  orange: { label: "Orange", swatch: "#FFA500" },
  red:    { label: "Red",    swatch: "#FF0000" },
  white:  { label: "White",  swatch: "#FFFFFF" },
  pink:   { label: "Pink",   swatch: "#FFC0CB" },
  black:  { label: "Black",  swatch: "#000000" },
};

const products = [
  { id: 1,  title: "Elegant Bracelet",    price: 2499, oldPrice: 3199, image: "/images/bracelet1.jpg", color: "violet" },
  { id: 2,  title: "Charm Bracelet",      price: 1999, oldPrice: 2499, image: "/images/bracelet2.jpg", color: "indigo" },
  { id: 3,  title: "Slim Kada",           price: 3499, oldPrice: 4199, image: "/images/bracelet3.jpg", color: "blue" },
  { id: 4,  title: "Diamond Studded",     price: 5999, oldPrice: 7299, image: "/images/bracelet4.jpg", color: "green" },
  { id: 5,  title: "Matte Cuff",          price: 1499, oldPrice: 1899, image: "/images/bracelet1.jpg", color: "yellow" },
  { id: 6,  title: "Classic Kada",        price: 2299, oldPrice: 2699, image: "/images/bracelet2.jpg", color: "orange" },
  { id: 7,  title: "Twist Bangle",        price: 2999, oldPrice: 3599, image: "/images/bracelet1.jpg", color: "red" },
  { id: 8,  title: "Mesh Kada",           price: 3299, oldPrice: 3899, image: "/images/bracelet3.jpg", color: "violet" },
  { id: 9,  title: "Box Chain Cuff",      price: 2099, oldPrice: 2599, image: "/images/bracelet2.jpg", color: "indigo" },
  { id:10,  title: "Lined Kada",          price: 2699, oldPrice: 3299, image: "/images/bracelet1.jpg", color: "blue" },
  { id:11,  title: "Minimal Bracelet",    price: 1399, oldPrice: 1799, image: "/images/bracelet1.jpg", color: "green" },
  { id:12,  title: "Link Kada",           price: 2199, oldPrice: 2599, image: "/images/bracelet2.jpg", color: "yellow" },
  { id:13,  title: "Pearl Kada",          price: 2799, oldPrice: 3399, image: "/images/bracelet1.jpg", color: "orange" },
  { id:14,  title: "Curve Cuff",          price: 2599, oldPrice: 3099, image: "/images/bracelet3.jpg", color: "red" },
  { id:15,  title: "Edge Bracelet",       price: 1999, oldPrice: 2399, image: "/images/bracelet2.jpg", color: "violet" },
  { id:16,  title: "Pearl Slim Kada",     price: 2799, oldPrice: 3399, image: "/images/bracelet1.jpg", color: "indigo" },
  { id:17,  title: "Curve Mesh Kada",     price: 2599, oldPrice: 3099, image: "/images/bracelet3.jpg", color: "blue" },
  { id:18,  title: "Matte Chain",         price: 1699, oldPrice: 2099, image: "/images/bracelet1.jpg", color: "green" },
  { id:19,  title: "White Stone Kada",    price: 1899, oldPrice: 2299, image: "/images/bracelet1.jpg", color: "white" },
  { id:20,  title: "Classic White Band",  price: 2599, oldPrice: 3199, image: "/images/bracelet2.jpg", color: "white" },
  { id:21,  title: "Pink Heart Kada",     price: 2899, oldPrice: 3499, image: "/images/bracelet3.jpg", color: "pink" },
  { id:22,  title: "Black Stone Kada",    price: 3199, oldPrice: 3899, image: "/images/bracelet4.jpg", color: "black" },
];

const categories = [
  { name: "Bracelets", count: products.length },
  { name: "Earrings", count: 3 },
  { name: "Mangalsutra", count: 14 },
  { name: "Necklace", count: 3 },
  { name: "Pendant Set", count: 4 },
  { name: "Rings", count: 1 },
];

const Bracelets = () => {
  const [sort, setSort] = useState("az");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState(0);
  const [tempPrice, setTempPrice] = useState(0);
  const [selectedColors, setSelectedColors] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const productsPerPage = 12;

  const colorCounts = useMemo(() => {
    const counts = {};
    products.forEach((p) => {
      counts[p.color] = (counts[p.color] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredSorted = [...products]
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (price > 0 ? p.price <= price : true))
    .filter((p) => (selectedColors.length ? selectedColors.includes(p.color) : true))
    .sort((a, b) => {
      if (sort === "az") return a.title.localeCompare(b.title);
      if (sort === "za") return b.title.localeCompare(a.title);
      if (sort === "lowHigh") return a.price - b.price;
      if (sort === "highLow") return b.price - a.price;
      return 0;
    });

  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / productsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const currentProducts = filteredSorted.slice(
    (safePage - 1) * productsPerPage,
    safePage * productsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, sort, price, selectedColors]);

  const toggleColor = (c) => {
    setSelectedColors((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };
  const clearColors = () => setSelectedColors([]);
  const applyPrice = () => { setPrice(tempPrice); setShowFilters(false); };
  const clearPrice = () => { setTempPrice(0); setPrice(0); };

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
  const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.36 } } };
  const cardHover = { scale: 1.03, boxShadow: "0 18px 40px rgba(0,0,0,0.12)" };

  return (
    <section className="px-6 py-12 lg:px-20">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-center lg:text-left">Bracelets Collection</h1>
        <div className="flex items-start gap-3 flex-col sm:flex-row">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(true)}
              className="inline-flex items-center gap-2 px-3 py-2 border rounded-md md:hidden"
              aria-expanded={showFilters}
              aria-controls="filters-drawer"
            >Filters</button>
            <label className="text-sm hidden md:inline-block">Sort:</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border rounded-md px-3 py-2"
              aria-label="Sort products"
            >
              <option value="az">A → Z</option>
              <option value="za">Z → A</option>
              <option value="lowHigh">Price: Low to High</option>
              <option value="highLow">Price: High to Low</option>
            </select>
          </div>
          {/* Mobile search */}
          <div className="w-full md:hidden mt-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border rounded-md px-3 py-2 pr-10 focus:outline-none"
                aria-label="Search products"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={16} />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:items-start">
        {/* Sticky Sidebar */}
        <aside className="hidden lg:block lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-[#f6ecdf] p-6 rounded-lg shadow-md flex flex-col gap-6 sticky top-16"
          >
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Keyword"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border-b border-gray-400 bg-transparent focus:outline-none py-2 pr-8"
                aria-label="Search products"
              />
              <Search className="absolute right-2 top-3 text-gray-600" size={18} />
            </div>
            {/* Product Type */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Product Type</h3>
              <ul className="space-y-3 text-sm">
                {categories.map((cat, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between border-b border-gray-300 pb-1 cursor-pointer hover:text-yellow-700"
                    role="button"
                    tabIndex={0}
                  >
                    <span>{cat.name}</span>
                    <span>({cat.count})</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Filter By Colour */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Filter By Colour</h3>
              <div className="flex flex-wrap gap-2">
                {Object.keys(colorMeta).map((key) => {
                  const active = selectedColors.includes(key);
                  return (
                    <button
                      key={key}
                      onClick={() => toggleColor(key)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition text-sm ${active ? "bg-black text-white border-black" : "bg-white text-black hover:bg-gray-100"}`}
                      aria-pressed={active}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: colorMeta[key].swatch }}
                        aria-hidden="true"
                      />
                      <span>{colorMeta[key].label}</span>
                      <span className="text-xs opacity-70">({colorCounts[key] || 0})</span>
                    </button>
                  );
                })}
              </div>
              {selectedColors.length > 0 && (
                <button onClick={clearColors} className="mt-3 text-sm underline underline-offset-4 hover:no-underline">
                  Clear colours
                </button>
              )}
            </div>
            {/* Filter By Price */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Filter By Price</h3>
              <input
                type="range"
                min="0"
                max="7000"
                step="100"
                value={tempPrice}
                onChange={(e) => setTempPrice(Number(e.target.value))}
                className="w-full cursor-pointer accent-black"
                aria-label="Temp price range"
              />
              <p className="mt-2 text-sm">
                Price: <span className="font-medium">₹0</span> —{" "}
                <span className="font-medium">{tempPrice > 0 ? `₹${tempPrice}` : "No Limit"}</span>
                {price !== tempPrice && <span className="ml-2 text-xs text-gray-600">(pending… Apply to set)</span>}
              </p>
              <hr className="my-3" />
              <div className="flex items-center gap-3">
                <button onClick={applyPrice} className="px-4 py-2 bg-black text-white rounded hover:bg-yellow-700 transition">
                  Apply Filter
                </button>
                <button onClick={clearPrice} className="px-4 py-2 border border-black text-black rounded hover:bg-gray-100 transition">
                  Clear
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-600">Applied: <b>{price > 0 ? `₹${price}` : "No Limit"}</b></p>
            </div>
            {/* Promo Banner */}
            <div className="relative rounded-lg overflow-hidden shadow-md -mt-2">
              <img src={SideBarImg} alt="Promo Banner" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-4">
                <p className="font-semibold">Exclusive Offer</p>
              </div>
            </div>
          </motion.div>
        </aside>
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-600">
              Showing <b>{currentProducts.length}</b> of <b>{filteredSorted.length}</b> results
              {selectedColors.length > 0 && (
                <span className="ml-2">• Colours: {selectedColors.map((c) => colorMeta[c].label).join(", ")}</span>
              )}
            </div>
            <div className="hidden md:flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border rounded-md px-3 py-2 w-64 focus:outline-none"
                />
                <Search className="absolute right-3 top-2.5 text-gray-500" size={16} />
              </div>
            </div>
          </div>
          <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProducts.map((item) => (
              <motion.article
                key={item.id}
                variants={item}
                whileHover={cardHover}
                className="group border rounded-2xl transition p-4 cursor-pointer bg-white"
                aria-labelledby={`product-${item.id}`}
              >
                <div className="relative w-full h-64 overflow-hidden rounded-xl">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.4 }}
                    draggable={false}
                  />
                  <span
                    className={`absolute top-3 left-3 w-4 h-4 rounded-full border ${item.color === "white" ? "ring-1 ring-black/20 border-white" : "border-white"}`}
                    title={colorMeta[item.color]?.label}
                    style={{ backgroundColor: colorMeta[item.color]?.swatch }}
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 id={`product-${item.id}`} className="font-medium">{item.title}</h3>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <span className="text-lg font-semibold">₹{item.price}</span>
                    <span className="line-through text-gray-400">₹{item.oldPrice}</span>
                  </div>
                </div>
                <motion.button
                  layout
                  whileTap={{ scale: 0.98 }}
                  className="hidden group-hover:block w-full mt-3 bg-black text-white py-2 rounded-lg"
                  aria-label={`Add ${item.title} to cart`}
                >
                  Add to Cart
                </motion.button>
              </motion.article>
            ))}
          </motion.div>
          {/* Pagination */}
          <div className="flex justify-center mt-8 space-x-3">
            {Array.from({ length: totalPages }, (_, idx) => (
              <motion.button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                whileTap={{ scale: 0.95 }}
                className={`w-10 h-10 flex items-center justify-center rounded-full border transition-colors ${
                  safePage === idx + 1 ? "bg-black text-white" : "bg-white text-black hover:bg-gray-200"
                }`}
                aria-label={`Go to page ${idx + 1}`}
              >
                {idx + 1}
              </motion.button>
            ))}
            <motion.button
              onClick={() => setCurrentPage((p) => (p < totalPages ? p + 1 : p))}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 flex items-center justify-center rounded-full border bg-white hover:bg-gray-200"
              aria-label="Next page"
            >
              →
            </motion.button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showFilters && (
          <motion.aside
            id="filters-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-xl p-6 overflow-auto"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button onClick={() => setShowFilters(false)} aria-label="Close filters" className="px-2 py-1">✕</button>
            </div>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Enter Keyword"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border rounded-md px-3 py-2 focus:outline-none"
              />
              <Search className="absolute right-3 top-3 text-gray-600" size={16} />
            </div>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Filter By Colour</h4>
              <div className="flex flex-wrap gap-2">
                {Object.keys(colorMeta).map((key) => {
                  const active = selectedColors.includes(key);
                  return (
                    <button
                      key={key}
                      onClick={() => toggleColor(key)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition text-sm ${
                        active ? "bg-black text-white border-black" : "bg-white text-black hover:bg-gray-100"
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: colorMeta[key].swatch }} aria-hidden />
                      <span>{colorMeta[key].label}</span>
                      <span className="text-xs opacity-70">({colorCounts[key] || 0})</span>
                    </button>
                  );
                })}
              </div>
              {selectedColors.length > 0 && <button onClick={clearColors} className="mt-3 text-sm underline">Clear colours</button>}
            </div>
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Filter By Price</h4>
              <input type="range" min="0" max="7000" step="100" value={tempPrice} onChange={(e) => setTempPrice(Number(e.target.value))} className="w-full" />
              <p className="mt-2 text-sm">Up to: <b>{tempPrice > 0 ? `₹${tempPrice}` : "No limit"}</b></p>
              <div className="flex gap-3 mt-3">
                <button onClick={applyPrice} className="px-4 py-2 bg-black text-white rounded">Apply</button>
                <button onClick={clearPrice} className="px-4 py-2 border rounded">Clear</button>
              </div>
            </div>
            <div className="mt-4">
              <button onClick={() => setShowFilters(false)} className="w-full px-4 py-3 bg-[#f6ecdf] rounded">Done</button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Bracelets;
