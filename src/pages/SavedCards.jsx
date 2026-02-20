// src/pages/SavedCards.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SavedCardsImg from "../assets/SavedCards.png";

const SavedCards = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // read user
  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user")) || null;
      setUser(u);
    } catch (e) {
      setUser(null);
    }
  }, []);

  return (
    <main className="min-h-[500px] bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">

        {/* Removed Account + Username heading completely */}

        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row">

            {/* LEFT SIDEBAR — only visible on desktop */}
            <aside className="hidden md:block md:w-64 md:pr-10 border-r border-gray-200">
              <nav className="space-y-6 text-sm">
                
                <div>
                  <button
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
                    className="text-gray-800 hover:text-pink-600"
                    onClick={() => navigate("/orders")}
                  >
                    Orders & Returns
                  </button>
                </div>

                <div>
                  <p className="uppercase text-[11px] font-semibold tracking-wider text-gray-400 mb-2">
                    Credits
                  </p>
                  <button
                    className="block text-gray-800 hover:text-pink-600 mb-1"
                    onClick={() => navigate("/coupons")}
                  >
                    Coupons
                  </button>
                  <button
                    className="block text-gray-800 hover:text-pink-600 mb-1"
                    onClick={() => navigate("/sajni-credit")}
                  >
                    Sajni Re Credit
                  </button>
                  <button
                    className="block text-gray-800 hover:text-pink-600 mb-1"
                    onClick={() => navigate("/sajnicash")}
                  >
                    SajniCash
                  </button>
                </div>

                <div>
                  <p className="uppercase text-[11px] font-semibold tracking-wider text-gray-400 mb-2">
                    Account
                  </p>

                  <button
                    className="block text-gray-800 hover:text-pink-600 mb-1"
                    onClick={() => navigate("/account")}
                  >
                    Profile
                  </button>

                  <button
                    className="block text-emerald-500 font-semibold mb-1"
                  >
                    Saved Cards
                  </button>

                  <button
                    className="block text-gray-800 hover:text-pink-600 mb-1"
                    onClick={() => navigate("/saved-upi")}
                  >
                    Saved UPI
                  </button>

                  <button
                    className="block text-gray-800 hover:text-pink-600 mb-1"
                    onClick={() => navigate("/saved-wallets-bnpl")}
                  >
                    Saved Wallets/BNPL
                  </button>

                  <button
                    className="block text-gray-800 hover:text-pink-600 mb-1"
                    onClick={() => navigate("/addresses")}
                  >
                    Addresses
                  </button>
                </div>

                <div>
                  <p className="uppercase text-[11px] font-semibold tracking-wider text-gray-400 mb-2">
                    Legal
                  </p>
                  <button
                    className="block text-gray-800 hover:text-pink-600 mb-1"
                    onClick={() => navigate("/terms")}
                  >
                    Terms of Use
                  </button>
                  <button
                    className="block text-gray-800 hover:text-pink-600"
                    onClick={() => navigate("/privacypolicy")}
                  >
                    Privacy Center
                  </button>
                </div>
              </nav>
            </aside>

            {/* MAIN CONTENT — full width on mobile */}
            <section className="flex-1 flex items-center justify-center">
              <div className="flex flex-col items-center text-center py-10 px-4 w-full">
                
                <h2 className="text-sm md:text-base font-semibold tracking-wide text-gray-800 mb-6 uppercase">
                  SOMETHING WENT WRONG
                </h2>

                <img
                  src={SavedCardsImg}
                  alt="Something went wrong"
                  className="w-56 sm:w-64 md:w-72 mb-8 select-none object-contain"
                />

                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="px-10 py-2 border border-pink-400 text-pink-500 
                             text-sm font-semibold rounded-md 
                             hover:bg-pink-50 uppercase tracking-wide"
                >
                  Retry
                </button>

              </div>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
};

export default SavedCards;
