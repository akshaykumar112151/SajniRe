import React from "react";
import GoldPendantImage from "../assets/gold-pendant.png";
import diamondring from "../assets/diamondring.png";
import ModelImage from "../assets/model-image.jpg";

const ProductShowcase = () => {
  return (
    <section className="bg-[#fff8f5] py-16 px-6">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center">

        {/* Product 1 */}
        <div className="flex flex-col items-center">
          <img
            src={GoldPendantImage}
            alt="Gold Pendant Necklace"
            className="w-[280px] sm:w-[400px] md:w-[520px] h-auto object-contain"
          />
          <h3 className="mt-4 text-lg font-medium text-[#111]">
            Gold Pendant Necklace
          </h3>
          <p className="text-gray-600 mt-2">30.00$ – 35.00$</p>
        </div>

        {/* Product 2 */}
        <div className="flex flex-col items-center">
          <img
            src={diamondring}
            alt="Diamond Ring"
            className="w-[280px] sm:w-[400px] md:w-[520px] h-auto object-contain"
          />
          <h3 className="mt-4 text-lg font-medium text-[#111]">
            Diamond Ring
          </h3>
          <p className="text-gray-600 mt-2">23.00$ – 28.00$</p>
        </div>

        {/* Model with Shop Now */}
        <div className="relative rounded-tl-[300px] rounded-tr-[300px] overflow-hidden h-[800px]">
          <img
            src={ModelImage}
            alt="Model with Jewelry"
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2
            bg-white bg-opacity-80 w-[140px] h-[140px] rounded-full
            flex items-center justify-center text-center shadow-md
            cursor-pointer hover:bg-black hover:text-white
            transition-all duration-300 hover:scale-105 active:scale-95">
            <span className="text-sm font-medium tracking-wider">
              SHOP
              <br />
              NOW
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductShowcase;