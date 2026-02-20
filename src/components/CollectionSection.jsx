// src/components/CollectionSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import products from "../data/products";

const CollectionSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="collection-section"
      className="bg-[#f6e8d8] py-14 sm:py-20 px-4 sm:px-6 lg:px-10"
    >
      <div className="max-w-[1400px] mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sm uppercase tracking-[4px] text-gray-700">
            Elegance in Every Piece
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#111] mt-3">
            Your Style, Our Collection
          </h2>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{
                scale: 1.04,
                y: -8,
                boxShadow: "0 15px 40px rgba(0,0,0,0.18)",
              }}
              className="relative bg-white p-4 rounded-2xl shadow-md cursor-pointer group"
            >
              {/* 🔥 SALE Badge (Shown for ALL products) */}
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute top-3 right-3 bg-[#9a6b47] text-white 
                  text-xs px-2 py-1 rounded-md shadow-md z-20"
              >
                SALE
              </motion.span>

              {/* Glow Border on Hover */}
              <div
                className="
                  absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                  transition duration-500 pointer-events-none
                  bg-gradient-to-br from-[#cfa77a] via-[#e5d3b1] to-[#c89f7a]
                "
              ></div>

              {/* Actual Card Content */}
              <div className="relative bg-white rounded-xl p-4 h-full z-10">

                {/* Product Image */}
                <div className="relative w-full h-[250px] sm:h-[280px] overflow-hidden flex items-center justify-center">
                  {/* Gold Glow on Hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#e3c7a3]"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.4 }}
                    transition={{ duration: 0.4 }}
                  />

                  <motion.img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Details */}
                <div className="mt-4 text-center">
                  <p className="text-sm text-[#9a6b47] opacity-90 group-hover:opacity-100 transition">
                    {product.category}
                  </p>

                  <h3 className="text-lg font-semibold text-[#111] mt-1 group-hover:text-[#9a6b47] transition">
                    {product.name}
                  </h3>

                  <p className="text-gray-700 mt-1 text-sm">
                    {product.priceRange}
                  </p>

                  {/* View Details Button */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="
                      mt-4 w-full bg-black text-white py-2 rounded-lg
                      hover:bg-[#333] transition duration-300
                    "
                  >
                    View Details
                  </motion.button>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionSection;
