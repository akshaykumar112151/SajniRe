// src/pages/DeleteAccount.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png"; // 👈 tumhari image

const DeleteAccount = () => {
  const [user, setUser] = useState(null);
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

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

  const handleDelete = () => {
    if (!agree) return;

    try {
      localStorage.removeItem("user");
      // agar aur data clear karna ho to yahan add kar sakte ho
    } catch (e) {}

    window.dispatchEvent(new Event("userChanged"));
    navigate("/", { replace: true });
  };

  return (
    <main className="min-h-[500px] bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        {/* Top heading like Myntra */}
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
                    <button className="block text-gray-800 hover:text-pink-600">
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
                    <button className="block text-gray-800 hover:text-pink-600">
                      Sajni Re Insider
                    </button>
                    {/* Active item */}
                    <button
                      type="button"
                      className="block text-pink-600 font-semibold"
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

            {/* RIGHT CONTENT – Myntra style Delete box */}
            <section className="flex-1">
              <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6 md:p-8">
                {/* Heading + top line */}
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                  Delete Account
                </h2>
                <hr className="border-t border-gray-200 mt-4 mb-6" />

                {/* Two-column layout: text left, illustration right */}
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Text + bullets */}
                  <div className="flex-1 text-sm text-gray-800">
                    <p className="font-medium mb-4">
                      Is this goodbye? Are you sure you don&apos;t want to
                      reconsider?
                    </p>

                    <ul className="list-disc pl-5 space-y-3">
                      <li>
                        <span className="font-semibold">
                          You&apos;ll lose your order history, saved details,
                          Sajni Re Credit, SajniCash and all other coupons and
                          benefits.
                        </span>
                        <br />
                        <span className="text-gray-600 text-[13px]">
                          Any account related benefits will be forfeited once
                          the account is deleted and will no longer be available
                          to you. You cannot recover them again. However, you
                          can always create a new account. By deleting your
                          account, you acknowledge you have read our{" "}
                          <span className="text-pink-500 cursor-pointer">
                            Privacy Policy
                          </span>
                          .
                        </span>
                      </li>

                      <li>
                        <span className="font-semibold">
                          Any pending orders, exchanges, returns or refunds will
                          no longer be accessible via your account.
                        </span>
                        <br />
                        <span className="text-gray-600 text-[13px]">
                          Sajni Re will try to complete any open transactions on
                          a best-effort basis, but we cannot ensure tracking and
                          traceability of transactions once the account is
                          deleted.
                        </span>
                      </li>

                      <li>
                        <span className="font-semibold">
                          New user offers may not be extended again on the same
                          mobile number or email.
                        </span>
                      </li>

                      <li>
                        <span className="font-semibold">
                          Sajni Re may refuse or delay deletion if there are any
                          pending grievances related to orders, shipments,
                          cancellations or other services.
                        </span>
                      </li>

                      <li>
                        <span className="font-semibold">
                          Sajni Re may retain certain data for legitimate
                          reasons such as security, fraud prevention, future
                          abuse and regulatory compliance, including exercising
                          legal rights or complying with legal orders under
                          applicable laws.
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Illustration – now using Sajni Re Logo */}
                  <div className="md:w-60 flex justify-center md:justify-end">
                    <div className="w-44 h-44 rounded-full bg-pink-50 flex items-center justify-center overflow-hidden">
                      <img
                        src={Logo}
                        alt="Sajni Re Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Checkbox */}
                <label className="mt-6 flex items-start gap-2 text-sm text-gray-800">
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                  />
                  <span>I agree to all the terms and conditions*</span>
                </label>

                {/* Buttons bottom – full width like Myntra */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={!agree}
                    className={`flex-1 px-6 py-3 rounded text-sm font-semibold border ${
                      agree
                        ? "bg-pink-600 text-white border-pink-600 hover:bg-pink-700"
                        : "bg-pink-100 text-pink-300 border-pink-100 cursor-not-allowed"
                    }`}
                  >
                    DELETE ANYWAY
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/account")}
                    className="flex-1 px-6 py-3 rounded text-sm font-semibold border border-pink-500 bg-white text-pink-600 hover:bg-pink-50"
                  >
                    KEEP ACCOUNT
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

export default DeleteAccount;
