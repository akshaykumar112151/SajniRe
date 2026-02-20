// src/pages/SearchResults.jsx
import React, { useMemo } from "react";
import { useLocation, Link } from "react-router-dom";

// Main home products
import mainProducts from "../data/products";

// ====== URL ?q=... helper ======
function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

// ====== Helpers ======
const formatPriceINR = (num) => "₹" + Number(num || 0).toLocaleString("en-IN");

// Common mapper for category pages
const mapCategoryProducts = (source, category, prefix, link) =>
  source.map((p) => ({
    id: `${prefix}-${p.id}`,
    name: p.title,
    image: p.image,
    price: formatPriceINR(p.price),
    category,
    link,
  }));

// ====== SOURCE DATA (copied from your category pages) ======

// BRACELETS (from BraceletsPage.jsx)
const braceletsSource = [
  { id: 1, title: "Elegant Bracelet", price: 2499, image: "/images/bracelet1.jpg" },
  { id: 2, title: "Charm Bracelet", price: 1999, image: "/images/bracelet2.jpg" },
  { id: 3, title: "Slim Kada", price: 3499, image: "/images/bracelet3.jpg" },
  { id: 4, title: "Diamond Studded", price: 5999, image: "/images/bracelet4.jpg" },
  { id: 5, title: "Matte Cuff", price: 1499, image: "/images/bracelet1.jpg" },
  { id: 6, title: "Classic Kada", price: 2299, image: "/images/bracelet2.jpg" },
  { id: 7, title: "Twist Bangle", price: 2999, image: "/images/bracelet1.jpg" },
  { id: 8, title: "Mesh Kada", price: 3299, image: "/images/bracelet3.jpg" },
  { id: 9, title: "Box Chain Cuff", price: 2099, image: "/images/bracelet2.jpg" },
  { id: 10, title: "Lined Kada", price: 2699, image: "/images/bracelet1.jpg" },
  { id: 11, title: "Minimal Bracelet", price: 1399, image: "/images/bracelet1.jpg" },
  { id: 12, title: "Link Kada", price: 2199, image: "/images/bracelet2.jpg" },
  { id: 13, title: "Pearl Kada", price: 2799, image: "/images/bracelet1.jpg" },
  { id: 14, title: "Curve Cuff", price: 2599, image: "/images/bracelet3.jpg" },
  { id: 15, title: "Edge Bracelet", price: 1999, image: "/images/bracelet2.jpg" },
  { id: 16, title: "Pearl Slim Kada", price: 2799, image: "/images/bracelet1.jpg" },
  { id: 17, title: "Curve Mesh Kada", price: 2599, image: "/images/bracelet3.jpg" },
  { id: 18, title: "Matte Chain", price: 1699, image: "/images/bracelet1.jpg" },
  { id: 19, title: "White Stone Kada", price: 1899, image: "/images/bracelet1.jpg" },
  { id: 20, title: "Classic White Band", price: 2599, image: "/images/bracelet2.jpg" },
  { id: 21, title: "Pink Heart Kada", price: 2899, image: "/images/bracelet3.jpg" },
  { id: 22, title: "Black Stone Kada", price: 3199, image: "/images/bracelet4.jpg" },
];

// EARRINGS (from EarringsPage.jsx)
const earringsSource = [
  { id: 1, title: "Stud Earrings", price: 1499, image: "/images/earring1.jpg" },
  { id: 2, title: "Hoop Earrings", price: 1999, image: "/images/earring2.jpg" },
  { id: 3, title: "Drop Earrings", price: 1799, image: "/images/earring3.jpg" },
  { id: 4, title: "Jhumka", price: 2499, image: "/images/earring4.jpg" },
  { id: 5, title: "Pearl Studs", price: 2199, image: "/images/earring1.jpg" },
  { id: 6, title: "Chandelier Earrings", price: 3299, image: "/images/earring2.jpg" },
  { id: 7, title: "Crystal Earrings", price: 1899, image: "/images/earring3.jpg" },
  { id: 8, title: "White Stone Studs", price: 2599, image: "/images/earring1.jpg" },
  { id: 9, title: "Pink Heart Studs", price: 2799, image: "/images/earring2.jpg" },
  { id: 10, title: "Black Stone Studs", price: 2999, image: "/images/earring3.jpg" },
  { id: 11, title: "Diamond Cut Studs", price: 3499, image: "/images/earring4.jpg" },
  { id: 12, title: "Floral Hoop Earrings", price: 1899, image: "/images/earring1.jpg" },
  { id: 13, title: "Silver Drop Earrings", price: 2199, image: "/images/earring2.jpg" },
  { id: 14, title: "Golden Jhumka", price: 2799, image: "/images/earring3.jpg" },
  { id: 15, title: "Classic Pearl Studs", price: 1599, image: "/images/earring4.jpg" },
  { id: 16, title: "Royal Chandelier", price: 3899, image: "/images/earring1.jpg" },
  { id: 17, title: "Ruby Crystal Earrings", price: 3299, image: "/images/earring2.jpg" },
  { id: 18, title: "Shiny White Tops", price: 2499, image: "/images/earring3.jpg" },
  { id: 19, title: "Pink Drop Studs", price: 2699, image: "/images/earring4.jpg" },
  { id: 20, title: "Elegant Black Studs", price: 2899, image: "/images/earring1.jpg" },
];

// MANGALSUTRA (from MangalsutraPage.jsx)
const mangalsutraSource = [
  { id: 1, title: "Classic Black Bead Mangalsutra", price: 2999, image: "/images/mangalsutra1.jpg" },
  { id: 2, title: "Elegant Gold Chain Mangalsutra", price: 3499, image: "/images/mangalsutra2.jpg" },
  { id: 3, title: "Silver Bead Designer Mangalsutra", price: 4199, image: "/images/mangalsutra3.jpg" },
  { id: 4, title: "Traditional Double Layer Mangalsutra", price: 3799, image: "/images/mangalsutra4.jpg" },
  { id: 5, title: "Pearl Chain Mangalsutra", price: 4599, image: "/images/mangalsutra5.jpg" },
  { id: 6, title: "Modern Heart Pendant Mangalsutra", price: 4999, image: "/images/mangalsutra6.jpg" },
  { id: 7, title: "Floral Design Mangalsutra", price: 3299, image: "/images/mangalsutra7.jpg" },
  { id: 8, title: "Royal Long Gold Mangalsutra", price: 5699, image: "/images/mangalsutra8.jpg" },
  { id: 9, title: "Kundan Pendant Mangalsutra", price: 3999, image: "/images/mangalsutra9.jpg" },
  { id: 10, title: "Short Stylish Mangalsutra", price: 2899, image: "/images/mangalsutra10.jpg" },
  { id: 11, title: "Dual Tone Designer Mangalsutra", price: 4799, image: "/images/mangalsutra11.jpg" },
  { id: 12, title: "Rose Gold Plated Mangalsutra", price: 5299, image: "/images/mangalsutra12.jpg" },
  { id: 13, title: "Diamond Pendant Mangalsutra", price: 6499, image: "/images/mangalsutra13.jpg" },
  { id: 14, title: "Lightweight Daily Wear Mangalsutra", price: 2599, image: "/images/mangalsutra14.jpg" },
  { id: 15, title: "Antique Gold Mangalsutra", price: 5599, image: "/images/mangalsutra15.jpg" },
  { id: 16, title: "Color Stone Mangalsutra", price: 3699, image: "/images/mangalsutra16.jpg" },
  { id: 17, title: "Elegant Short Chain Mangalsutra", price: 3199, image: "/images/mangalsutra17.jpg" },
  { id: 18, title: "Trendy Designer Mangalsutra", price: 4899, image: "/images/mangalsutra18.jpg" },
];

// NECKLACE (from NecklacePage.jsx)
const necklaceSource = [
  { id: 1, title: "Gold Plated Necklace", price: 3499, image: "/images/necklace1.jpg" },
  { id: 2, title: "Silver Pendant Necklace", price: 2799, image: "/images/necklace2.jpg" },
  { id: 3, title: "Pearl Beaded Necklace", price: 3999, image: "/images/necklace3.jpg" },
  { id: 4, title: "Traditional Kundan", price: 4999, image: "/images/necklace4.jpg" },
  { id: 5, title: "Crystal Choker", price: 2599, image: "/images/necklace5.jpg" },
  { id: 6, title: "Black Stone Necklace", price: 2999, image: "/images/necklace6.jpg" },
  { id: 7, title: "Diamond Studded Necklace", price: 6999, image: "/images/necklace7.jpg" },
  { id: 8, title: "Antique Gold Necklace", price: 5599, image: "/images/necklace8.jpg" },
  { id: 9, title: "Elegant Choker Necklace", price: 3199, image: "/images/necklace9.jpg" },
  { id: 10, title: "Long Chain Necklace", price: 4299, image: "/images/necklace10.jpg" },
  { id: 11, title: "Kundan Stone Necklace", price: 4799, image: "/images/necklace11.jpg" },
  { id: 12, title: "Rose Gold Necklace", price: 5299, image: "/images/necklace12.jpg" },
  { id: 13, title: "Designer Crystal Necklace", price: 3699, image: "/images/necklace13.jpg" },
  { id: 14, title: "Traditional Bridal Necklace", price: 7999, image: "/images/necklace14.jpg" },
  { id: 15, title: "Emerald Stone Necklace", price: 6499, image: "/images/necklace15.jpg" },
  { id: 16, title: "Modern Daily Wear Necklace", price: 2599, image: "/images/necklace16.jpg" },
  { id: 17, title: "Color Stone Necklace", price: 3899, image: "/images/necklace17.jpg" },
  { id: 18, title: "Stylish Party Necklace", price: 4899, image: "/images/necklace18.jpg" },
];

// PENDANT SET (from PendantSetPage.jsx)
const pendantSource = [
  { id: 1, title: "Royal Pendant Set", price: 2499, image: "/images/pendant1.jpg" },
  { id: 2, title: "Classic Pendant Set", price: 1999, image: "/images/pendant2.jpg" },
  { id: 3, title: "Elegant Pendant Set", price: 3499, image: "/images/pendant3.jpg" },
  { id: 4, title: "Diamond Pendant Set", price: 5999, image: "/images/pendant4.jpg" },
  { id: 5, title: "Pearl Pendant Set", price: 2799, image: "/images/pendant5.jpg" },
  { id: 6, title: "Ruby Pendant Set", price: 4599, image: "/images/pendant6.jpg" },
  { id: 7, title: "Emerald Pendant Set", price: 4899, image: "/images/pendant7.jpg" },
  { id: 8, title: "Blue Sapphire Pendant", price: 5199, image: "/images/pendant8.jpg" },
  { id: 9, title: "Antique Gold Pendant", price: 3999, image: "/images/pendant9.jpg" },
  { id: 10, title: "Crystal Pendant Set", price: 3299, image: "/images/pendant10.jpg" },
  { id: 11, title: "Traditional Pendant", price: 4499, image: "/images/pendant11.jpg" },
  { id: 12, title: "Modern Daily Pendant", price: 1899, image: "/images/pendant12.jpg" },
  { id: 13, title: "Stylish Party Pendant", price: 3799, image: "/images/pendant13.jpg" },
  { id: 14, title: "Designer Pendant Set", price: 4299, image: "/images/pendant14.jpg" },
  { id: 15, title: "Wedding Pendant Set", price: 6999, image: "/images/pendant15.jpg" },
  { id: 16, title: "Choker Style Pendant", price: 2599, image: "/images/pendant16.jpg" },
  { id: 17, title: "Rose Gold Pendant", price: 3399, image: "/images/pendant17.jpg" },
  { id: 18, title: "Luxury Pendant Set", price: 7999, image: "/images/pendant18.jpg" },
];

// RINGS (from RingsPage.jsx)
const ringsSource = [
  { id: 1, title: "Classic Gold Ring", price: 1999, image: "/images/ring1.jpg" },
  { id: 2, title: "Diamond Ring", price: 4999, image: "/images/ring2.jpg" },
  { id: 3, title: "Ruby Stone Ring", price: 3499, image: "/images/ring3.jpg" },
  { id: 4, title: "Emerald Ring", price: 2799, image: "/images/ring4.jpg" },
  { id: 5, title: "Pearl Ring", price: 2299, image: "/images/ring5.jpg" },
  { id: 6, title: "Platinum Promise Ring", price: 7999, image: "/images/ring6.jpg" },
  { id: 7, title: "Sapphire Royal Ring", price: 5599, image: "/images/ring7.jpg" },
  { id: 8, title: "Black Onyx Ring", price: 2599, image: "/images/ring8.jpg" },
  { id: 9, title: "Rose Quartz Ring", price: 1899, image: "/images/ring9.jpg" },
  { id: 10, title: "Turquoise Silver Ring", price: 2999, image: "/images/ring10.jpg" },
  { id: 11, title: "Royal Kundan Ring", price: 3999, image: "/images/ring11.jpg" },
  { id: 12, title: "Amethyst Crystal Ring", price: 2699, image: "/images/ring12.jpg" },
  { id: 13, title: "Antique Silver Ring", price: 1499, image: "/images/ring13.jpg" },
  { id: 14, title: "Citrine Sun Ring", price: 2299, image: "/images/ring14.jpg" },
  { id: 15, title: "Opal Shimmer Ring", price: 4499, image: "/images/ring15.jpg" },
  { id: 16, title: "Navratna Ring", price: 4999, image: "/images/ring16.jpg" },
  { id: 17, title: "Floral CZ Ring", price: 1999, image: "/images/ring17.jpg" },
  { id: 18, title: "Moonstone Ring", price: 2799, image: "/images/ring18.jpg" },
  { id: 19, title: "Victorian Style Ring", price: 3599, image: "/images/ring19.jpg" },
  { id: 20, title: "Dual Tone Adjustable Ring", price: 1799, image: "/images/ring20.jpg" },
];

// ====== COMBINED PRODUCT LIST ======
const braceletsProducts = mapCategoryProducts(
  braceletsSource,
  "Bracelets",
  "bracelet",
  "/collection/bracelets"
);
const earringsProducts = mapCategoryProducts(
  earringsSource,
  "Earrings",
  "earring",
  "/collection/earrings"
);
const mangalsutraProducts = mapCategoryProducts(
  mangalsutraSource,
  "Mangalsutra",
  "mangalsutra",
  "/collection/mangalsutra"
);
const necklaceProducts = mapCategoryProducts(
  necklaceSource,
  "Necklace",
  "necklace",
  "/collection/necklace"
);
const pendantProducts = mapCategoryProducts(
  pendantSource,
  "Pendant Set",
  "pendant",
  "/collection/pendant-set"
);
const ringsProducts = mapCategoryProducts(
  ringsSource,
  "Rings",
  "ring",
  "/collection/rings"
);

// Main products from products.js (CollectionSection + ProductDetail)
const mainMappedProducts = mainProducts.map((p) => ({
  id: `main-${p.id}`,
  name: p.name,
  image: p.images[0],
  price: p.priceRange,
  category: p.category,
  link: `/product/${p.id}`,
  sale: p.sale,
}));

const allProducts = [
  ...mainMappedProducts,
  ...braceletsProducts,
  ...earringsProducts,
  ...mangalsutraProducts,
  ...necklaceProducts,
  ...pendantProducts,
  ...ringsProducts,
];

export default function SearchResults() {
  const query = useQuery();
  const qRaw = query.get("q") || "";
  const q = qRaw.trim().toLowerCase();

  const results = useMemo(() => {
    if (!q) return [];
    return allProducts.filter((p) => {
      const name = p.name.toLowerCase();
      const category = (p.category || "").toLowerCase();
      return name.includes(q) || category.includes(q);
    });
  }, [q]);

  return (
    <main className="min-h-screen bg-[#fbf2e8]">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:px-20">
        {/* Heading */}
        <h1 className="mb-4 text-2xl font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
          Search results for “{qRaw || "..."}”
        </h1>

        {q === "" && (
          <p className="mb-4 text-sm text-gray-600 sm:text-base">
            Please type something in the search bar to see results.
          </p>
        )}

        {q !== "" && results.length === 0 && (
          <p className="mb-4 text-sm text-gray-600 sm:text-base">
            No products found. Try a different keyword.
          </p>
        )}

        {/* RESULT GRID – bigger cards (width + height) */}
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
          {results.map((p) => (
            <div
              key={p.id}
              className="group block h-full focus:outline-none focus:ring-2 focus:ring-[#9a6b47] focus:ring-offset-2 focus:ring-offset-[#fbf2e8]"
            >
              {/* Outer gradient card */}
              <div
                className="
                  relative h-full min-h-[520px] sm:min-h-[580px]
                  rounded-[30px] bg-gradient-to-b from-[#f0dfc6] to-[#d3a873]
                  p-[12px] shadow-md transition-all duration-300
                  group-hover:-translate-y-1 group-hover:shadow-2xl
                "
              >
                {/* Glow border on hover */}
                <div
                  className="
                    pointer-events-none absolute inset-0 rounded-[30px]
                    border border-transparent
                    transition-all duration-300
                    group-hover:border-[#f7d9a5]
                    group-hover:shadow-[0_0_28px_rgba(248,207,150,0.9)]
                  "
                />

                {/* SALE badge (sirf main products ke liye) */}
                {p.sale && (
                  <span className="absolute right-6 top-4 z-20 rounded-md bg-[#9a6b47] px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white shadow-md">
                    SALE
                  </span>
                )}

                {/* Inner white card */}
                <div className="relative z-10 flex h-full flex-col items-stretch overflow-hidden rounded-[24px] bg-white">
                  {/* Image area */}
                  <div className="flex w-full flex-1 items-center justify-center pt-10 pb-8">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="max-h-[300px] sm:max-h-[340px] object-contain"
                    />
                  </div>

                  {/* Text + Button */}
                  <div className="flex flex-col items-center px-7 pb-8 pt-2 text-center">
                    {p.category && (
                      <p className="mb-1 text-xs text-gray-500 sm:text-[13px]">
                        {p.category}
                      </p>
                    )}
                    <h3 className="mb-1 text-base font-semibold text-[#9a6b47] sm:text-lg">
                      {p.name}
                    </h3>
                    <p className="mb-6 text-xs text-gray-800 sm:text-sm">
                      {p.price}
                    </p>

                    {/* View Details button ONLY does navigation */}
                    <Link
                      to={p.link || "#"}
                      className="
                        w-full rounded-lg bg-black py-2.5 text-xs text-white
                        sm:text-sm
                        transition-colors duration-200 hover:bg-[#111]
                        inline-flex items-center justify-center
                      "
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
