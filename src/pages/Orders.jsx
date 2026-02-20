// src/pages/Orders.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// 👇 Image import
import OrdersAndReturnsImg from "../assets/OrdersandReturns.png";

const Orders = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // Load user
  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user")) || null;
      setUser(u);
    } catch (e) {
      setUser(null);
    }
  }, []);

  // Load orders
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("orders")) || [];
      setOrders(stored);
    } catch (e) {
      setOrders([]);
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
      {/* ✅ MOBILE VIEW - Bigger image, no text */}
      <div className="block md:hidden">
        <div className="max-w-md mx-auto px-4 py-12 flex flex-col items-center text-center">
          <img
            src={OrdersAndReturnsImg}
            alt="No orders yet"
            className="w-full max-w-[380px] object-contain"
          />
        </div>
      </div>

      {/* 🖥️ DESKTOP / TABLET VIEW */}
      <div className="hidden md:block">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
          {/* Top heading */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Account</h1>
            <p className="text-sm text-gray-500 mt-1">{userName}</p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex flex-col md:flex-row">
              {/* LEFT SIDEBAR */}
              <aside className="md:w-64 md:pr-10 mb-8 md:mb-0 border-b md:border-b-0 md:border-r border-gray-200">
                <nav className="space-y-6 pb-6 md:pb-0 text-sm">
                  {/* Overview */}
                  <div>
                    <button
                      className="text-gray-800 hover:text-pink-600"
                      onClick={() => navigate("/account")}
                    >
                      Overview
                    </button>
                  </div>

                  {/* Orders section */}
                  <div>
                    <p className="uppercase text-[11px] font-semibold tracking-wider text-gray-400 mb-2">
                      Orders
                    </p>
                    <button
                      type="button"
                      className="text-pink-600 font-semibold"
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
                        className="block text-gray-800 hover:text-pink-600"
                        onClick={() => navigate("/coupons")}
                      >
                        Coupons
                      </button>
                      <button
                        className="block text-gray-800 hover:text-pink-600"
                        onClick={() => navigate("/sajni-credit")}
                      >
                        Sajni Re Credit
                      </button>
                      <button
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
                        className="block text-gray-800 hover:text-pink-600"
                        onClick={() => navigate("/account")}
                      >
                        Profile
                      </button>
                      <button
                        className="block text-gray-800 hover:text-pink-600"
                        onClick={() => navigate("/saved-cards")}
                      >
                        Saved Cards
                      </button>
                      <button
                        className="block text-gray-800 hover:text-pink-600"
                        onClick={() => navigate("/addresses")}
                      >
                        Addresses
                      </button>
                      <button
                        className="block text-gray-800 hover:text-pink-600"
                        onClick={() => navigate("/delete-account")}
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>

                  {/* LEGAL */}
                  <div>
                    <p className="uppercase text-[11px] font-semibold tracking-wider text-gray-400 mb-2">
                      Legal
                    </p>
                    <div className="space-y-1">
                      <button
                        className="block text-gray-800 hover:text-pink-600"
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
                  </div>
                </nav>
              </aside>

              {/* RIGHT CONTENT */}
              <section className="flex-1 flex items-center justify-center">
                {orders.length === 0 ? (
                  <div className="py-12 px-4 text-center w-full">
                    <img
                      src={OrdersAndReturnsImg}
                      alt="No orders yet"
                      className="mx-auto object-contain"
                      style={{ width: "400px", maxWidth: "90%" }}
                    />
                  </div>
                ) : (
                  <div className="w-full py-8">
                    {/* Future order list */}
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Orders;
