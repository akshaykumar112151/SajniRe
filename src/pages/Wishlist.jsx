// src/pages/Wishlist.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

/**
 * Utility to format INR currency
 */
const formatINR = (num) => {
  if (typeof num !== "number") num = Number(num) || 0;
  return "₹" + Number(num).toLocaleString("en-IN");
};

/**
 * LocalStorage helpers
 */
const readWishlist = () => {
  try {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  } catch (e) {
    return [];
  }
};
const writeWishlist = (arr) => {
  try {
    localStorage.setItem("wishlist", JSON.stringify(arr));
  } catch (e) {
    console.error("Wishlist save error", e);
  }
};
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

/**
 * ImageWithSkeleton
 * shows a simple shimmer skeleton while the image loads
 */
const ImageWithSkeleton = ({ src, alt, className = "" }) => {
  const [loaded, setLoaded] = useState(false);
  // handle broken image fallback
  const [fail, setFail] = useState(false);
  const finalSrc = !fail ? src : "/placeholder.jpg";

  return (
    <div
      className={`w-full h-full flex items-center justify-center bg-white relative ${className}`}
      style={{ minHeight: 120 }}
    >
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
          <div className="w-3/4 h-3/4 rounded animate-pulse bg-gray-200" />
        </div>
      )}

      <img
        src={finalSrc}
        alt={alt || "product image"}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setFail(true);
          setLoaded(true);
        }}
        className={`max-h-full max-w-full object-contain transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        draggable={false}
      />
    </div>
  );
};

const Wishlist = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  // for entrance animation
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setItems(readWishlist());
    const t = setTimeout(() => setMounted(true), 20);
    return () => clearTimeout(t);
  }, []);

  const handleRemove = (id, color) => {
    const updated = items.filter(
      (i) => !(i.id === id && (i.color || "") === (color || ""))
    );
    setItems(updated);
    writeWishlist(updated);
  };

  // NOTE: This will overwrite cart with only the selected item (as requested).
  const handleMoveToCart = (item) => {
    // Ensure cart contains only this item
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price || 0,
      priceText: item.priceText || "",
      images: item.images || [],
      image: item.image || (item.images && item.images[0]) || "/placeholder.jpg",
      color: item.color || "",
      quantity: item.quantity || 1,
      sku: item.sku || null,
    };

    writeCart([cartItem]); // overwrite cart with single item

    // remove from wishlist
    const updated = items.filter(
      (i) => !(i.id === item.id && (i.color || "") === (item.color || ""))
    );
    setItems(updated);
    writeWishlist(updated);

    alert("Moved to cart ✅");
  };

  // Empty state
  if (!items || items.length === 0) {
    return (
      <section className="py-20 px-6 bg-white min-h-screen flex items-start">
        <div className="max-w-5xl mx-auto text-center w-full">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Your Wishlist is empty</h2>
          <p className="text-gray-600 mb-6">You haven't added any items to your wishlist yet.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-black text-white px-6 py-3 rounded-md shadow hover:opacity-95 transition"
            aria-label="Continue shopping"
          >
            Continue shopping
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6">
          My Wishlist <span className="text-gray-500 text-lg">({items.length} items)</span>
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {items.map((item, idx) => {
            const delay = Math.min(idx * 60, 300);
            return (
              <div
                key={`${item.id}-${item.color || "default"}-${idx}`}
                className={`relative border rounded-lg overflow-hidden bg-white transform transition-shadow duration-300 ease-out group`}
                style={{
                  boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 6px 12px rgba(0,0,0,0.04)",
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0px) scale(1)" : "translateY(8px) scale(0.995)",
                  transition: `opacity 360ms cubic-bezier(.2,.8,.2,1) ${delay}ms, transform 360ms cubic-bezier(.2,.8,.2,1) ${delay}ms`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px) scale(1.01)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow =
                    "0 1px 2px rgba(0,0,0,0.04), 0 6px 12px rgba(0,0,0,0.04)";
                }}
              >
                <button
                  onClick={() => handleRemove(item.id, item.color)}
                  className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-sm hover:bg-red-50 z-10"
                  aria-label={`Remove ${item.name} from wishlist`}
                >
                  <FaTimes className="text-gray-600 text-sm" />
                </button>

                <div
                  className="w-full h-44 md:h-56 lg:h-48 flex items-center justify-center cursor-pointer bg-white"
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <div className="w-full h-full flex items-center justify-center p-3">
                    <ImageWithSkeleton
                      src={item.image || (item.images && item.images[0]) || "/placeholder.jpg"}
                      alt={item.name}
                      className="w-full h-full"
                    />
                  </div>
                </div>

                <div className="p-3 text-center">
                  <h3 className="text-sm sm:text-sm md:text-sm font-medium line-clamp-2 h-12" title={item.name}>
                    {item.name}
                  </h3>
                  <p className="text-md font-semibold mt-1 text-gray-900">
                    {item.priceText || formatINR(item.price)}
                  </p>
                </div>

                <div className="p-3">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="w-full inline-flex items-center justify-center text-pink-600 border border-pink-600 py-2 text-sm font-medium rounded hover:bg-pink-50 transition focus:outline-none focus:ring-2 focus:ring-pink-200"
                    aria-label={`Move ${item.name} to cart`}
                  >
                    MOVE TO CART
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Wishlist;
