// src/pages/SavedUPI.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SavedUPIImage from "../assets/SavedUPI.png"; // <- local image

const SavedUPI = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // user ko localStorage se read karo
  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user")) || null;
      setUser(u);
    } catch (e) {
      setUser(null);
    }
  }, []);

  // abhi userName ki zarurat nahi hai, isliye use nahi kar rahe

  return (
    <main className="min-h-[500px] bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        {/* Account / username heading HATA DIYA */}

        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row">
            {/* LEFT SIDEBAR – desktop only, mobile pe hidden */}
            <aside className="hidden md:block md:w-64 md:pr-10 mb-8 md:mb-0 border-b md:border-b-0 md:border-r border-gray-200">
              <nav className="space-y-6 pb-6 md:pb-0 text-sm">
                {/* Overview */}
                <div>
                  <button
                    type="button"
                    className="text-gray-800 hover:text-pink-600"
                    onClick={() => navigate("/account")}
                  >
                    Overview
                  </button>
                </div>

                {/* Orders */}
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

                {/* Credits */}
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

                {/* Account section */}
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
                      className="block text-emerald-500 font-semibold"
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
                    <button
                      type="button"
                      className="block text-gray-800 hover:text-pink-600"
                      onClick={() => navigate("/addresses")}
                    >
                      Addresses
                    </button>
                    {/* Sajni Re Insider option hata diya */}
                  </div>
                </div>

                {/* LEGAL */}
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

            {/* RIGHT CONTENT – Saved UPI empty state */}
            <section className="flex-1 flex items-center justify-center">
              <div className="flex flex-col items-center text-center py-12 px-4 w-full">
                {/* Image */}
                <img
                  src={SavedUPIImage}
                  alt="Saved UPI Illustration"
                  className="w-48 sm:w-56 md:w-60 mb-6 object-contain mx-auto"
                />

                {/* Heading */}
                <h2 className="text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wide text-gray-900">
                  Save your UPI ID while doing a payment
                </h2>

                {/* Subtitle */}
                <p className="text-sm text-gray-500 mt-2 max-w-md">
                  It&apos;s convenient to pay with saved UPI IDs.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SavedUPI;
