// src/components/NewArrivals.jsx
import React, { useRef, useState, useEffect } from "react";

// Product Images
import GoldBangle from "../assets/gold-bangle.png";
import AdjustableChain from "../assets/adjustable-chain.png";
import CoupleRing from "../assets/couple-ring.png";
import LightChain from "../assets/light-chain.png";
import ClassicHoops from "../assets/classic-hoops.png";
import PearlNecklace from "../assets/pearl-necklace.png";
import PearlEarring from "../assets/pearl-earring.png";
import CrystalNecklace from "../assets/crystal-necklace.png";

// Model Images for Hover
import ModelBangle from "../assets/model-bangle.png";
import ModelChain from "../assets/model-chain.png";
import ModelRing from "../assets/model-ring.png";
import ModelLightChain from "../assets/model-light-chain.png";
import ModelHoops from "../assets/model-hoops.png";
import ModelPearlNecklace from "../assets/model-pearl-necklace.png";
import ModelEarring from "../assets/model-earring.png";
import ModelCrystal from "../assets/model-crystal-necklace.png";

// ========== LOCAL STORAGE CART ==========
const readCart = () => {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch (e) {
    return [];
  }
};

const writeCart = (arr) => {
  try {
    localStorage.setItem("cart", JSON.stringify(arr));
  } catch (e) {
    console.error("Cart save error", e);
  }
};

// ========== PRODUCT LIST ==========
const products = [
  { id: 1, title: "Gold Bangle", image: GoldBangle, modelImage: ModelBangle, price: "23.00$" },
  { id: 2, title: "Adjustable Gold Chain", image: AdjustableChain, modelImage: ModelChain, price: "20.00$" },
  { id: 3, title: "Couple Ring", image: CoupleRing, modelImage: ModelRing, price: "17.00$" },
  { id: 4, title: "Lightweight Chain", image: LightChain, modelImage: ModelLightChain, price: "28.00$" },
  { id: 5, title: "Classic Gold Hoops", image: ClassicHoops, modelImage: ModelHoops, price: "16.00$" },
  { id: 6, title: "Pearl Bird Necklace", image: PearlNecklace, modelImage: ModelPearlNecklace, price: "19.00$" },
  { id: 7, title: "Pearl Earring", image: PearlEarring, modelImage: ModelEarring, price: "19.00$" },
  { id: 8, title: "Crystal Heart Necklace", image: CrystalNecklace, modelImage: ModelCrystal, price: "32.00$" },
];

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // ========== ADD TO CART BUTTON ==========
  const handleAddToCart = (product) => {
    const cart = readCart();

    const existingIndex = cart.findIndex((item) => item.id === product.id);

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }

    writeCart(cart);

    alert("Added to cart ✔");
  };

  // ========== AUTO SLIDE ==========
  useEffect(() => {
    const interval = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;

      const amount = el.clientWidth * 0.9;

      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 20) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: amount, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // ========== PROGRESS BAR ==========
  const updateScrollProgress = () => {
    const el = scrollRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    const percent = (el.scrollLeft / maxScroll) * 100;
    setScrollProgress(percent);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", updateScrollProgress);

    return () => el?.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <section className="bg-[#fffaf5] py-14 px-4 sm:px-8 md:px-20">

      {/* Heading */}
      <p className="text-xs sm:text-sm uppercase tracking-widest text-neutral-600 mb-1">
        Fresh Arrivals, Just For You
      </p>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-black mb-8">
        New Arrivals, Endless Choices
      </h2>

      {/* PRODUCTS SLIDER */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((item) => (
          <div
            key={item.id}
            className="
              snap-start relative 
              min-w-[240px] sm:min-w-[300px] md:min-w-[360px]
              max-w-[380px] 
              bg-white p-4 rounded-lg shadow-sm 
              flex-shrink-0 text-left 
              group transition-all duration-300
            "
          >
            {/* IMAGE */}
            <div className="aspect-[4/5] relative flex items-center justify-center">
              <img
                src={item.image}
                alt={item.title}
                className="h-full object-contain transition-opacity duration-300 group-hover:opacity-0"
              />
              <img
                src={item.modelImage}
                alt={item.title}
                className="absolute top-0 left-0 h-full w-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>

            {/* INFO */}
            <div className="relative pt-4">
              <h3 className="font-medium text-base sm:text-lg text-black">{item.title}</h3>

              <div className="text-sm text-neutral-800 mt-1 mb-12">
                <span>{item.price}</span>
              </div>

              {/* ADD TO CART BUTTON */}
              <button
                onClick={() => handleAddToCart(item)}
                className="
                  absolute -bottom-10 left-0 right-0 bg-black text-white 
                  py-2 rounded-md text-sm
                  transform translate-y-full group-hover:translate-y-0 
                  opacity-0 group-hover:opacity-100
                  transition-all duration-500
                "
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PROGRESS BAR */}
      <div className="relative mt-5 h-[4px] w-full bg-neutral-300 rounded-full overflow-hidden">
        <div
          className="absolute h-full bg-black rounded-full transition-all duration-200"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

    </section>
  );
};

export default NewArrivals;
