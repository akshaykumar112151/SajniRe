import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";

// ✅ React Icons
import { FaInstagram, FaFacebookF, FaWhatsapp, FaHeart, FaRegHeart } from "react-icons/fa";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const productFromData = products.find((p) => p.id === parseInt(id, 10));

  if (!productFromData) {
    return <div className="text-center py-16">Product not found.</div>;
  }

  // Ensure product always has images
  const product = {
    ...productFromData,
    images:
      productFromData.images && productFromData.images.length
        ? productFromData.images
        : ["/placeholder.jpg"],
  };

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);

  // ✅ Color palette
  const colors = [
    { name: "Violet", code: "#8F00FF" },
    { name: "Blue", code: "#0000FF" },
    { name: "Green", code: "#008000" },
    { name: "Yellow", code: "#FFFF00" },
    { name: "Orange", code: "#FFA500" },
    { name: "Red", code: "#FF0000" },
    { name: "White", code: "#FFFFFF" },
    { name: "Golden", code: "#D4AF37" },
    { name: "Pink", code: "#FFC0CB" },
    { name: "Black", code: "#000000" },
  ];
  const [selectedColor, setSelectedColor] = useState(colors[0].name);

  // ✅ Extract numeric price
  const extractNumericPrice = (raw) => {
    if (!raw) return 0;
    if (typeof raw === "number") return raw;

    const match = raw.match(/[\d,]+/);
    if (match) {
      return Number(match[0].replace(/,/g, ""));
    }
    return 0;
  };

  const numericPrice = extractNumericPrice(product.price ?? product.priceRange);
  const displayPrice = product.priceRange || product.price || "₹0";

  // ✅ Wishlist state
  const [isWishlisted, setIsWishlisted] = useState(false);

  const readWishlist = () => {
    try {
      return JSON.parse(localStorage.getItem("wishlist")) || [];
    } catch (e) {
      return [];
    }
  };

  const checkIfWishlisted = () => {
    const list = readWishlist();
    return list.some((item) => item.id === product.id && item.color === selectedColor);
  };

  useEffect(() => {
    setIsWishlisted(checkIfWishlisted());

    const onStorage = (e) => {
      if (e.key === "wishlist") {
        setIsWishlisted(checkIfWishlisted());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id, selectedColor]);

  // ✅ Add to Cart
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const newItem = {
      id: product.id,
      name: product.name,
      price: numericPrice,
      priceText: displayPrice,
      color: selectedColor,
      quantity,
      images: product.images,
      image: selectedImage,
      sku: product.sku || null,
    };
    cart.push(newItem);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("🛒 Added to Cart!");
  };

  // ✅ Buy Now
  const handleBuyNow = () => {
    const checkoutItem = {
      id: product.id,
      name: product.name,
      price: numericPrice,
      priceText: displayPrice,
      images: product.images,
      color: selectedColor,
      quantity,
      size: product.size || "",
      sku: product.sku || null,
    };

    try {
      localStorage.setItem("checkoutItem", JSON.stringify(checkoutItem));
    } catch (e) {
      console.error("Storage error:", e);
    }
    navigate("/checkout", { state: { product: checkoutItem } });
  };

  // ✅ Wishlist Click (Add-only, no remove, no navigate)
  const handleWishlistClick = () => {
    const list = readWishlist();
    const exists = list.some(
      (item) => item.id === product.id && item.color === selectedColor
    );

    if (exists) {
      // Already in wishlist → just ignore
      alert("Already in Wishlist ❤️");
      return;
    }

    const wishlistItem = {
      id: product.id,
      name: product.name,
      price: numericPrice,
      priceText: displayPrice,
      images: product.images,
      image: selectedImage,
      color: selectedColor,
      quantity,
      sku: product.sku || null,
      addedAt: new Date().toISOString(),
    };

    list.push(wishlistItem);
    try {
      localStorage.setItem("wishlist", JSON.stringify(list));
      setIsWishlisted(true);
      alert("Added to Wishlist ❤️");
    } catch (e) {
      console.error("Wishlist storage error:", e);
      alert("Could not add to wishlist.");
    }
  };

  return (
    <section className="bg-[#f6e8d8] py-16 px-6">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left - Images */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-[500px] object-contain mb-6"
          />
          <div className="flex gap-3 justify-center w-full">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} thumbnail ${index + 1}`}
                className={`w-28 h-28 object-contain border cursor-pointer rounded-md transition-transform duration-300 ${
                  selectedImage === img
                    ? "border-[#9a6b47] scale-105"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Right - Details */}
        <div>
          <h1 className="text-4xl font-light">{product.name}</h1>
          <p className="text-xl mt-2 text-gray-800">{displayPrice}</p>

          <div className="flex items-center mt-3 text-yellow-500">★★★☆☆</div>

          <div className="mt-4 text-gray-600 text-sm border-b border-gray-300 pb-4">
            <span>SKU: {product.sku || "N/A"}</span>
          </div>

          <p className="text-gray-600 mt-6 leading-relaxed">{product.description}</p>

          {/* Color Selector */}
          <div className="mt-6">
            <p className="font-medium text-gray-800">Choose Color</p>
            <div className="flex gap-3 mt-2">
              {colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-10 h-10 rounded-full border-2 transition-transform duration-200 ${
                    selectedColor === c.name
                      ? "scale-110 border-black"
                      : "border-gray-400"
                  }`}
                  style={{ backgroundColor: c.code }}
                  title={c.name}
                />
              ))}
            </div>
            <p className="mt-2 text-sm text-gray-700">
              Selected: <span className="font-semibold">{selectedColor}</span>
            </p>
          </div>

          {/* Quantity + Buttons */}
          <div className="flex items-center gap-4 mt-8">
            <div className="flex items-center border border-gray-400 rounded-md">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 text-lg"
              >
                -
              </button>
              <span className="px-4 text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 text-lg"
              >
                +
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="flex-1 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
            >
              Buy Now
            </button>

            <button
              onClick={handleAddToCart}
              className="flex-1 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
            >
              Add To Cart
            </button>

            <button
              onClick={handleWishlistClick}
              className="border border-gray-400 rounded-md p-3 hover:bg-gray-100 flex items-center justify-center"
              aria-label={isWishlisted ? "In wishlist" : "Add to wishlist"}
              title={isWishlisted ? "Already in Wishlist" : "Add to Wishlist"}
            >
              {isWishlisted ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            </button>
          </div>

          <div className="mt-8 text-sm text-gray-700 space-y-1">
            <p>✔ Free Delivery & Free Shipping</p>
            <p>✔ Secure Online Payment</p>
          </div>

          <div className="mt-8 border-t border-gray-300 pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-800">
                  Pick Up Available At Agra/Delhi, India
                </p>
                <p className="text-sm text-gray-600">
                  Usually ready within 2–3 business days
                </p>
              </div>
            </div>
          </div>

          {/* Social Share */}
          <div className="mt-8 flex items-center gap-5 text-gray-700 text-lg">
            <span className="font-semibold text-sm">Share:</span>

            <a
              href="https://www.instagram.com/sajnire2922"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com/share/1B8TReA2PD/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black"
            >
              <FaFacebookF />
            </a>
            <a
              href={`https://wa.me/919123140229?text=Hello, I am interested in the product ${product.name} (${displayPrice}) in ${selectedColor} color. Check it here: ${window.location.href}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-600"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
