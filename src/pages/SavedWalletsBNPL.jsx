// src/pages/SavedWalletsBNPL.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SavedCardsImage from "../assets/SavedCards.png"; // same illustration as Saved Cards

const SavedWalletsBNPL = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // user name localStorage se, same as baaki account pages
  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user")) || null;
      setUser(u);
    } catch (e) {
      setUser(null);
    }
  }, []);

  const userName =
    (user &&
      (user.name ||
        user.fullName ||
        user.full_name ||
        user.username)) ||
    "Sajni Re User";

  return (
    <main className="min-h-[500px] bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Top heading – sirf desktop pe */}
        <div className="mb-5 sm:mb-6 hidden md:block">
          <h1 className="text-2xl font-semibold text-gray-900">Account</h1>
          <p className="text-sm text-gray-500 mt-1">{userName}</p>
        </div>

        {/* Desktop pe top border, mobile pe nahi */}
        <div className="pt-0 md:pt-6 md:border-t md:border-gray-200">
          <div className="flex flex-col md:flex-row">
            {/* LEFT SIDEBAR – mobile par hide, desktop par show */}
            <aside className="hidden md:block md:w-64 md:pr-10 mb-8 md:mb-0 border-b md:border-b-0 md:border-r border-gray-200">
              <nav className="space-y-6 pb-6 text-sm">
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

                {/* Account */}
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
                      className="block text-gray-800 hover:text-pink-600"
                      onClick={() => navigate("/saved-upi")}
                    >
                      Saved UPI
                    </button>
                    <button
                      type="button"
                      className="block text-emerald-500 font-semibold"
                    >
                      Saved Wallets / BNPL
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

            {/* RIGHT CONTENT – mobile pe clean full screen view */}
            <section className="flex-1 mt-0 md:mt-0">
              {/* Page title – sirf desktop pe */}
              <h2 className="hidden md:block text-lg md:text-xl font-semibold text-gray-900 mb-10">
                Saved Wallets/BNPL
              </h2>

              <div className="flex items-center justify-center px-0 sm:px-4 pt-6 pb-12 md:pb-16">
                <div className="flex flex-col items-center text-center w-full">
                  {/* 1) Image sabse pehle */}
                  <img
                    src={SavedCardsImage}
                    alt="Something went wrong"
                    className="w-56 md:w-64 mb-6 object-contain"
                  />

                  {/* 2) Heading */}
                  <p className="text-sm md:text-base font-semibold tracking-wide text-gray-900 mb-4">
                    SOMETHING WENT WRONG
                  </p>

                  {/* 3) Retry button */}
                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="px-12 py-2 border border-red-400 text-red-500 text-sm font-semibold rounded-md hover:bg-red-50 transition"
                  >
                    RETRY
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SavedWalletsBNPL;
