// src/components/AuthModal.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Reusable Auth Modal used for Login & Signup
 * - mode: "login" | "signup"
 * - open: boolean
 * - onClose: fn
 * - onSuccess: fn(user)
 *
 * NOTE: This is client-only demo logic. In production use a proper backend,
 * hashed passwords, and secure auth flows.
 */

const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v?.trim() || "");
const validatePhone = (v) => /^[6-9]\d{9}$/.test((v || "").replace(/\D/g, ""));

// helpers to read/write users list (demo)
const readUsers = () => {
  try {
    const raw = localStorage.getItem("users");
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
};
const writeUsers = (users) => {
  try {
    localStorage.setItem("users", JSON.stringify(users));
  } catch (e) {
    console.error("Failed to write users", e);
  }
};
// save current signed-in user under "user"
const setCurrentUser = (u) => {
  try {
    localStorage.setItem("user", JSON.stringify(u));
  } catch (e) {
    console.error("Failed to set current user", e);
  }
};

const AuthModal = ({ mode = "login", open, onClose, onSuccess }) => {
  const [m, setM] = useState(mode); // internal mode (can toggle inside modal)
  useEffect(() => setM(mode), [mode]);

  // fields
  const [name, setName] = useState(""); // signup only
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(""); // optional for login, required for signup
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!open) {
      // reset on close
      setName("");
      setPhone("");
      setEmail("");
      setPassword("");
      setConfirmPwd("");
      setErr("");
      setLoading(false);
    }
  }, [open]);

  // Signup: ensure we store users list with password (demo only)
  const handleSignup = () => {
    if (!name || name.trim().length < 2) return setErr("Please provide your name.");
    if (!phone || !validatePhone(phone)) return setErr("Please enter a valid 10-digit mobile number.");
    if (!email || !validateEmail(email)) return setErr("Please enter a valid email.");
    if (!password || password.length < 6) return setErr("Password should be at least 6 characters.");
    if (password !== confirmPwd) return setErr("Passwords do not match.");

    setLoading(true);
    setTimeout(() => {
      const users = readUsers();
      // check duplicate phone or email
      const normalizedPhone = "+91" + phone.replace(/\D/g, "").slice(-10);
      if (users.find((u) => u.phone === normalizedPhone)) {
        setLoading(false);
        return setErr("An account with this mobile number already exists. Please login or use a different mobile.");
      }
      if (users.find((u) => u.email && u.email.toLowerCase() === email.trim().toLowerCase())) {
        setLoading(false);
        return setErr("An account with this email already exists. Please login or use a different email.");
      }

      const newUser = {
        id: Date.now().toString(),
        name: name.trim(),
        phone: normalizedPhone,
        email: email.trim().toLowerCase(),
        password: password, // Demo: plain text. Replace in production.
        signedUpAt: new Date().toISOString(),
        discountEligible: true,
      };

      users.push(newUser);
      writeUsers(users);

      // set as current user (public info only)
      setCurrentUser({
        name: newUser.name,
        phone: newUser.phone,
        email: newUser.email,
        signedUpAt: newUser.signedUpAt,
        discountEligible: newUser.discountEligible,
      });

      setLoading(false);
      onSuccess && onSuccess(newUser);
      onClose && onClose();
    }, 900);
  };

  // Login: check credentials against users list
  // Per request: Login requires Mobile No. + Password, Email field is optional (not used for auth)
  const handleLogin = () => {
    if (!phone || !validatePhone(phone)) return setErr("Please enter your 10-digit mobile number.");
    if (!password || password.length < 4) return setErr("Enter a valid password (min 4 chars).");

    setLoading(true);
    setTimeout(() => {
      const users = readUsers();
      const normalizedPhone = "+91" + phone.replace(/\D/g, "").slice(-10);
      const found = users.find((u) => u.phone === normalizedPhone);
      if (!found) {
        setLoading(false);
        return setErr("No account found for this mobile number. Please sign up first.");
      }
      // check password (demo)
      if (found.password !== password) {
        setLoading(false);
        return setErr("Invalid credentials. Please check mobile and password.");
      }

      // success -> set current user (without storing password on 'user' key)
      const current = {
        name: found.name || "Guest User",
        phone: found.phone,
        email: found.email || null,
        signedInAt: new Date().toISOString(),
        discountEligible: !!found.discountEligible,
      };
      setCurrentUser(current);

      setLoading(false);
      onSuccess && onSuccess(current);
      onClose && onClose();
    }, 700);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr("");
    if (m === "login") handleLogin();
    else handleSignup();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => { if (!loading) onClose && onClose(); }}
      />

      <motion.div
        initial={{ opacity: 0, y: -12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative w-full max-w-lg mx-4"
      >
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="px-8 py-6">
            <h2 className="text-2xl font-semibold text-center mb-2">{m === "login" ? "Sign in" : "Create account"}</h2>
            <p className="text-sm text-gray-500 text-center mb-4">
              {m === "login"
                ? "Enter your credentials to continue"
                : "Create an account to save orders, wishlist and get discounts"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* LOGIN: Mobile required, Email optional, Password required
                  SIGNUP: Name, Mobile(required), Email(required), Password + Confirm */}
              {m === "signup" && (
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                    placeholder="Your name"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm text-gray-700 mb-1">{m === "login" ? "Mobile Number" : "Mobile Number"}</label>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-2 bg-gray-100 rounded select-none">+91</div>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className="flex-1 border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                    placeholder="10 digit mobile"
                    required
                    inputMode="numeric"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Email {m === "login" ? <span className="text-xs text-gray-400">(optional)</span> : ""}
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                  placeholder={m === "login" ? "Email (optional)" : "Email"}
                  {...(m === "signup" ? { required: true } : {})}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                  placeholder="••••••••"
                  required
                />
              </div>

              {m === "signup" && (
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPwd}
                    onChange={(e) => setConfirmPwd(e.target.value)}
                    className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                    placeholder="Repeat password"
                    required
                  />
                </div>
              )}

              {err && <div className="text-sm text-red-500">{err}</div>}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2 rounded text-white font-semibold ${
                    loading ? "bg-gray-400" : (m === "login" ? "bg-blue-600 hover:bg-blue-700" : "bg-pink-600 hover:bg-pink-700")
                  } transition`}
                >
                  {loading ? "Please wait..." : (m === "login" ? "Continue" : "Create account")}
                </button>
              </div>
            </form>

            <div className="mt-3 text-center text-sm text-gray-500">
              {m === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={() => { setM("signup"); setErr(""); }}
                    className="text-pink-600 font-semibold underline"
                  >
                    Create one
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => { setM("login"); setErr(""); }}
                    className="text-blue-600 font-semibold underline"
                  >
                    Sign in
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="px-6 py-3 bg-gray-50 text-xs text-gray-500 text-center">
            By continuing you agree to our Terms & Privacy.
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthModal;
