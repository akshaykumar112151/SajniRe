// src/pages/Checkout.jsx
import React, { useState, useMemo, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import IndiaFlag from "../assets/India_Flag.webp";
import PaymentLogos from "../assets/Payment-Logos.png";

const indianStates = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

// localStorage helpers
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

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // mount animation
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 20);
    return () => clearTimeout(t);
  }, []);

  // cart state synced with localStorage
  const [cartItems, setCartItems] = useState(() => readCart());
  useEffect(() => setCartItems(readCart()), []);

  // listen to storage changes (multi-tab)
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "cart") setCartItems(readCart());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // potential product sources
  const rawProductFromState = location.state?.product;
  const rawProductFromStorage = (() => {
    try {
      return JSON.parse(localStorage.getItem("checkoutItem"));
    } catch (e) {
      return null;
    }
  })();
  const rawProductFromCart = cartItems && cartItems.length ? cartItems[0] : null;

  const normalizeProduct = (p) => {
    if (!p) return null;
    const images =
      Array.isArray(p.images) && p.images.length
        ? p.images
        : p.image
        ? [p.image]
        : p.image_url
        ? [p.image_url]
        : ["/mnt/data/ff5a805e-989e-421f-836d-1f4cde60a2f4.png"];

    return {
      id: p.id || p.sku || null,
      name: p.name || p.title || "Product",
      price: p.price || p.priceText || "",
      priceRange: p.priceRange || "",
      images,
      image: images[0],
      quantity: Number(p.quantity) || 1,
      color: p.color || "",
      size: p.size || "",
      raw: p,
    };
  };

  // choose priority: state -> checkoutItem -> first item from cart -> null
  const productData = normalizeProduct(
    rawProductFromState || rawProductFromStorage || rawProductFromCart || null
  );

  const parsePrice = (priceStr) => {
    if (typeof priceStr === "number") return priceStr;
    if (!priceStr || typeof priceStr !== "string") return 0;
    const rangeSep = priceStr.includes("–")
      ? "–"
      : priceStr.includes("-")
      ? "-"
      : null;
    let candidate = priceStr;
    if (rangeSep) candidate = priceStr.split(rangeSep)[0];
    const digits = candidate.replace(/[^0-9.]/g, "");
    const num = Number(digits);
    return isNaN(num) ? 0 : num;
  };

  const formatINR = (num) => {
    if (typeof num !== "number") num = Number(num) || 0;
    return (
      "₹" +
      Number(num).toLocaleString("en-IN", {
        maximumFractionDigits: 2,
        minimumFractionDigits: Number.isInteger(num) ? 0 : 2,
      })
    );
  };

  const productPriceNumber = useMemo(() => {
    if (!productData) return 0;
    if (productData.price) return parsePrice(productData.price);
    if (productData.priceRange) return parsePrice(productData.priceRange);
    return 0;
  }, [productData]);

  // form states
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "Uttar Pradesh",
    pincode: "",
    phone: "+91 ",
  });
  const [billingForm, setBillingForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "Uttar Pradesh",
    pincode: "",
    phone: "+91 ",
  });
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [billingAddress, setBillingAddress] = useState("same");
  const errorClass = "border-2 border-red-500 focus:border-red-700";

  const isValidIndianPhone = (phoneValue) => {
    if (!phoneValue) return false;
    const digits = phoneValue.replace(/\D/g, "");
    if (phoneValue.startsWith("+91") || phoneValue.startsWith("+91 "))
      return digits.length === 12;
    return /^[6-9]\d{9}$/.test(digits);
  };

  // input handlers
  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "phone") {
      if (value.trim() === "") {
        setFormData((p) => ({ ...p, phone: "" }));
        setErrors((p) => ({ ...p, phone: null }));
        return;
      }
      if (!value.startsWith("+91")) {
        const digitsOnly = value.replace(/\D/g, "");
        value = `+91 ${digitsOnly}`;
      } else {
        if (!value.startsWith("+91 "))
          value = "+91 " + value.slice(3).replace(/\s/g, "");
      }
      setFormData((p) => ({ ...p, phone: value }));
      setErrors((p) => ({ ...p, phone: null }));
      return;
    }
    setFormData((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: null }));
  };

  const handleBillingChange = (e) => {
    let { name, value } = e.target;
    if (name === "phone") {
      if (value.trim() === "") {
        setBillingForm((p) => ({ ...p, phone: "" }));
        setErrors((p) => ({ ...p, billingPhone: null }));
        return;
      }
      if (!value.startsWith("+91")) {
        const digitsOnly = value.replace(/\D/g, "");
        value = `+91 ${digitsOnly}`;
      } else {
        if (!value.startsWith("+91 "))
          value = "+91 " + value.slice(3).replace(/\s/g, "");
      }
      setBillingForm((p) => ({ ...p, phone: value }));
      setErrors((p) => ({ ...p, billingPhone: null }));
      return;
    }
    setBillingForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: null }));
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.email.trim()) errs.email = "Email is required";
    if (!formData.firstName.trim()) errs.firstName = "First name is required";
    if (!formData.lastName.trim()) errs.lastName = "Last name is required";
    if (!formData.address.trim()) errs.address = "Address is required";
    if (!formData.city.trim()) errs.city = "City is required";
    if (!formData.pincode.trim()) errs.pincode = "PIN code is required";
    if (!formData.phone || formData.phone.trim() === "+91")
      errs.phone = "Phone number is required";
    else if (!isValidIndianPhone(formData.phone))
      errs.phone = "Please enter a valid Indian phone number";

    if (billingAddress === "different") {
      if (!billingForm.firstName.trim())
        errs.billingFirstName = "First name is required";
      if (!billingForm.lastName.trim())
        errs.billingLastName = "Last name is required";
      if (!billingForm.address.trim())
        errs.billingAddress = "Address is required";
      if (!billingForm.city.trim()) errs.billingCity = "City is required";
      if (!billingForm.pincode.trim())
        errs.billingPincode = "PIN code is required";
      if (!billingForm.phone || billingForm.phone.trim() === "+91")
        errs.billingPhone = "Phone number is required";
      else if (!isValidIndianPhone(billingForm.phone))
        errs.billingPhone = "Please enter a valid Indian phone number";
    }

    return errs;
  };

  // helper: scroll to first error field
  const scrollToFirstErrorField = (errs) => {
    if (!errs || !Object.keys(errs).length) return;
    const firstKey = Object.keys(errs)[0];
    const fieldName = firstKey.replace(/^billing/, function (m) {
      return m.charAt(0).toLowerCase() + m.slice(1);
    });
    const el = document.querySelector(`[name="${fieldName}"]`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handlePlaceOrder = () => {
    const validateErrors = validateForm();
    setErrors(validateErrors);
    if (Object.keys(validateErrors).length === 0) {
      alert(
        paymentMethod === "razorpay"
          ? "Redirecting to Razorpay..."
          : "Order placed successfully"
      );
      console.log({
        formData,
        billingForm: billingAddress === "different" ? billingForm : null,
        productData,
        paymentMethod,
        billingAddress,
      });
    } else {
      scrollToFirstErrorField(validateErrors);
    }
  };

  // totals
  const subtotal = useMemo(
    () => productPriceNumber * (productData ? productData.quantity || 1 : 0),
    [productPriceNumber, productData]
  );
  const shippingThreshold = 899;
  const shippingChargeIfBelowOrEqualThreshold = 60;
  const addressProvided =
    formData.address.trim() !== "" || formData.city.trim() !== "";
  const shippingFee = useMemo(() => {
    if (!addressProvided) return null;
    if (subtotal <= shippingThreshold) return shippingChargeIfBelowOrEqualThreshold;
    return 0;
  }, [addressProvided, subtotal]);
  const totalAmount = useMemo(
    () => (shippingFee === null ? subtotal : subtotal + shippingFee),
    [subtotal, shippingFee]
  );

  const productImageForSummary =
    productData && productData.image
      ? productData.image
      : "/mnt/data/ff5a805e-989e-421f-836d-1f4cde60a2f4.png";

  // ⭐ Go to invoice page instead of popup HTML
  const handleGoToInvoice = () => {
    // pehle form validate karo
    const validateErrors = validateForm();
    setErrors(validateErrors);

    if (Object.keys(validateErrors).length !== 0) {
      // agar error hai to scroll karo aur bill mat dikhao
      scrollToFirstErrorField(validateErrors);
      return;
    }

    if (!productData) {
      alert("Cart is empty. Please add a product before viewing the bill.");
      return;
    }

    const payload = {
      productData,
      formData,
      billingForm,
      billingAddress,
      paymentMethod,
      subtotal,
      shippingFee,
      totalAmount,
    };

    try {
      localStorage.setItem("invoiceData", JSON.stringify(payload));
    } catch (e) {
      console.error("Failed to save invoice data", e);
    }

    navigate("/invoice", { state: payload });
  };

  // REMOVE from cart
  const handleRemoveFromCart = (idToRemove = null) => {
    const current = readCart();
    let updated;
    if (!idToRemove) {
      updated = [];
    } else {
      updated = current.filter((c) => String(c.id) !== String(idToRemove));
    }
    writeCart(updated);
    try {
      const co = JSON.parse(localStorage.getItem("checkoutItem"));
      if (
        co &&
        (String(co.id) === String(idToRemove) ||
          String(co.sku) === String(idToRemove))
      ) {
        localStorage.removeItem("checkoutItem");
      }
    } catch (e) {}
    setCartItems(updated);
  };

  // Mobile summary (only if cart has items)
  const MobileSummary = () => {
    if (!cartItems || cartItems.length === 0 || !productData) return null;
    return (
      <div className="block md:hidden bg-white/90 rounded-2xl border border-gray-100 shadow-sm p-4 mb-4">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <img
              src={productImageForSummary}
              alt="Product"
              className="w-16 h-16 object-cover rounded-lg border border-gray-200"
            />
            {productData.quantity > 1 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] px-2 py-1 rounded-full">
                × {productData.quantity}
              </span>
            )}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium">{productData.name}</p>
                <p className="text-[11px] text-gray-500">
                  {productData.color}{" "}
                  {productData.size ? `/ ${productData.size}` : ""}
                </p>
              </div>
              <div className="text-sm font-semibold">
                {formatINR(productPriceNumber)}
              </div>
            </div>

            <div className="mt-3 border-t pt-3 text-sm">
              <div className="flex justify-between text-xs text-gray-600">
                <span>Subtotal</span>
                <span>{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>Shipping</span>
                <span>
                  {shippingFee === null ? (
                    <span className="text-gray-500">
                      Enter shipping address
                    </span>
                  ) : shippingFee === 0 ? (
                    <span className="text-green-600 font-semibold">
                      FREE
                    </span>
                  ) : (
                    formatINR(shippingFee)
                  )}
                </span>
              </div>
              <div className="flex justify-between font-semibold mt-2">
                <span>Total</span>
                <span>{formatINR(totalAmount)}</span>
              </div>
            </div>

            <div className="mt-3 flex justify-between text-[11px] text-gray-500">
              <button
                onClick={() => handleRemoveFromCart(productData.id)}
                className="px-4 py-2 border border-red-200 text-red-600 rounded w-full"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --------------- MAIN UI (Checkout page) ---------------
  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 flex flex-col transition-opacity duration-500 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Top bar */}
      <div className="w-full border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
            Sajni Re
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 lg:gap-8 flex-grow px-4 sm:px-6 py-6 sm:py-10">
        {/* Left column: form */}
        <div className="md:col-span-2 space-y-6 sm:space-y-8">
          {/* Contact */}
          <section className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8 transform transition duration-300 hover:shadow-md hover:-translate-y-[2px]">
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-black text-white text-xs">
                1
              </span>
              Contact
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Email or mobile phone"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full border rounded-lg p-3 sm:p-3.5 text-sm sm:text-base bg-gray-50/60 focus:bg-white outline-none transition-all duration-200 focus:ring-2 focus:ring-black/80 ${
                    errors.email ? errorClass : "border-gray-300"
                  }`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 uppercase tracking-widest hidden sm:block">
                  REQUIRED
                </span>
              </div>
              {errors.email && (
                <p className="text-red-600 text-xs sm:text-sm">
                  {errors.email}
                </p>
              )}
              <label className="flex items-center gap-2 text-xs sm:text-sm cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="accent-black h-4 w-4 rounded"
                  defaultChecked
                />
                <span>Email me with news and offers</span>
              </label>
            </div>
          </section>

          {/* Delivery */}
          <section className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8 transform transition duration-300 hover:shadow-md hover:-translate-y-[2px]">
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-black text-white text-xs">
                2
              </span>
              Delivery
            </h2>

            <select
              disabled
              className="w-full border rounded-lg p-3 sm:p-3.5 mb-3 sm:mb-4 border-gray-200 bg-gray-50 text-sm sm:text-base"
              defaultValue="India"
            >
              <option>India</option>
            </select>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <input
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`border p-3 sm:p-3.5 rounded-lg w-full text-sm sm:text-base bg-gray-50/60 focus:bg-white outline-none transition-all duration-200 focus:ring-2 focus:ring-black/80 ${
                    errors.firstName ? errorClass : "border-gray-300"
                  }`}
                />
                {errors.firstName && (
                  <p className="text-red-600 text-xs sm:text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <input
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`border p-3 sm:p-3.5 rounded-lg w-full text-sm sm:text-base bg-gray-50/60 focus:bg-white outline-none transition-all duration-200 focus:ring-2 focus:ring-black/80 ${
                    errors.lastName ? errorClass : "border-gray-300"
                  }`}
                />
                {errors.lastName && (
                  <p className="text-red-600 text-xs sm:text-sm mt-1">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-3 sm:mt-4">
              <input
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className={`border p-3 sm:p-3.5 rounded-lg w-full text-sm sm:text-base bg-gray-50/60 focus:bg-white outline-none transition-all duration-200 focus:ring-2 focus:ring-black/80 ${
                  errors.address ? errorClass : "border-gray-300"
                }`}
              />
              {errors.address && (
                <p className="text-red-600 text-xs sm:text-sm mt-1">
                  {errors.address}
                </p>
              )}
            </div>

            <div className="mt-3 sm:mt-4">
              <input
                name="apartment"
                placeholder="Apartment, suite, etc. (optional)"
                value={formData.apartment}
                onChange={handleChange}
                className="border p-3 sm:p-3.5 rounded-lg w-full text-sm sm:text-base border-gray-300 bg-gray-50/60 focus:bg-white outline-none transition-all duration-200 focus:ring-2 focus:ring-black/80"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-3 sm:mt-4">
              <div>
                <input
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className={`border p-3 sm:p-3.5 rounded-lg w-full text-sm sm:text-base bg-gray-50/60 focus:bg-white outline-none transition-all duration-200 focus:ring-2 focus:ring-black/80 ${
                    errors.city ? errorClass : "border-gray-300"
                  }`}
                />
                {errors.city && (
                  <p className="text-red-600 text-xs sm:text-sm mt-1">
                    {errors.city}
                  </p>
                )}
              </div>

              <div>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="border p-3 sm:p-3.5 rounded-lg w-full text-sm sm:text-base border-gray-300 bg-gray-50/60 focus:bg-white outline-none transition-all duration-200 focus:ring-2 focus:ring-black/80"
                >
                  {indianStates.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <input
                  name="pincode"
                  placeholder="PIN code"
                  value={formData.pincode}
                  onChange={handleChange}
                  className={`border p-3 sm:p-3.5 rounded-lg w-full text-sm sm:text-base bg-gray-50/60 focus:bg-white outline-none transition-all duration-200 focus:ring-2 focus:ring-black/80 ${
                    errors.pincode ? errorClass : "border-gray-300"
                  }`}
                />
                {errors.pincode && (
                  <p className="text-red-600 text-xs sm:text-sm mt-1">
                    {errors.pincode}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-3 sm:mt-4 relative">
              <input
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className={`border p-3 sm:p-3.5 rounded-lg w-full pr-12 text-sm sm:text-base bg-gray-50/60 focus:bg-white outline-none transition-all duration-200 focus:ring-2 focus:ring-black/80 ${
                  errors.phone ? errorClass : "border-gray-300"
                }`}
              />
              {isValidIndianPhone(formData.phone) && (
                <img
                  src={IndiaFlag}
                  alt="India Flag"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-7 rounded shadow-sm"
                />
              )}
            </div>
            {errors.phone && (
              <p className="text-red-600 text-xs sm:text-sm mt-1">
                {errors.phone}
              </p>
            )}

            <div className="mt-3 sm:mt-4 space-y-2">
              <label className="flex items-center gap-2 text-xs sm:text-sm cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="accent-black h-4 w-4 rounded"
                  defaultChecked
                />
                <span>Save info for next time</span>
              </label>
              <label className="flex items-center gap-2 text-xs sm:text-sm cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="accent-black h-4 w-4 rounded"
                  defaultChecked
                />
                <span>Text me offers</span>
              </label>
            </div>
          </section>

          {/* Shipping */}
          <section className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8 transform transition duration-300 hover:shadow-md hover:-translate-y-[2px]">
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-black text-white text-xs">
                3
              </span>
              Shipping method
            </h2>
            {!addressProvided ? (
              <div className="rounded-xl bg-gray-50 text-center text-xs sm:text-sm py-4 px-3 text-gray-600 border border-dashed border-gray-200">
                Enter your shipping address to view available shipping methods.
              </div>
            ) : (
              <div className="border rounded-xl p-4 sm:p-5 text-xs sm:text-sm space-y-3 bg-gray-50/60">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium">Standard</p>
                    <p className="text-[11px] sm:text-xs text-gray-500 mt-1">
                      Delivered within 3-6 business days
                    </p>
                  </div>
                  <div className="text-right">
                    {shippingFee === 0 ? (
                      <span className="text-green-600 font-semibold text-sm">
                        FREE
                      </span>
                    ) : (
                      <span className="font-semibold text-sm">
                        {formatINR(shippingFee)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-[11px] sm:text-xs text-gray-500">
                  Shipping charges may vary for remote locations.
                </div>
              </div>
            )}
          </section>

          {/* Payment */}
          <section className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8 transform transition duration-300 hover:shadow-md hover:-translate-y-[2px]">
            <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 flex items-center gap-2">
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-black text-white text-xs">
                4
              </span>
              Payment
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
              All transactions are secure and encrypted.
            </p>

            <div className="space-y-3 sm:space-y-4">
              <div
                className={`rounded-xl overflow-hidden transition-all duration-200 ${
                  paymentMethod === "razorpay"
                    ? "ring-2 ring-blue-200 border-blue-400 border bg-blue-50/40"
                    : "border-gray-200 border bg-white"
                }`}
              >
                <label className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === "razorpay"}
                    onChange={() => setPaymentMethod("razorpay")}
                    className="accent-blue-600 mt-1"
                  />
                  <div className="flex-1 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-xs sm:text-sm">
                        Razorpay Secure (UPI, Cards, Wallets, NetBanking)
                      </p>
                      <p className="text-[11px] sm:text-xs text-gray-500 mt-1">
                        Secure payments via multiple methods
                      </p>
                    </div>
                    <div className="ml-2 sm:ml-4">
                      <img
                        src={PaymentLogos}
                        alt="Payment logos"
                        className="h-5 sm:h-6 object-contain"
                      />
                    </div>
                  </div>
                </label>
              </div>

              <label
                className={`block border rounded-xl p-3 sm:p-4 cursor-pointer transition-all duration-200 ${
                  paymentMethod === "cod"
                    ? "ring-2 ring-blue-100 border-blue-300 bg-blue-50/40"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="accent-black"
                  />
                  <span className="font-medium text-xs sm:text-sm">
                    Cash on Delivery (COD)
                  </span>
                </div>
              </label>
            </div>
          </section>

          {/* Billing */}
          <section className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8 transform transition duration-300 hover:shadow-md hover:-translate-y-[2px]">
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-black text-white text-xs">
                5
              </span>
              Billing Address
            </h2>

            <label
              className={`block rounded-xl p-3 sm:p-4 cursor-pointer mb-2 border transition-all duration-200 ${
                billingAddress === "same"
                  ? "border-gray-400 bg-gray-50/80"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="billingAddress"
                  checked={billingAddress === "same"}
                  onChange={() => setBillingAddress("same")}
                  className="accent-black"
                />
                <span className="text-sm">Same as shipping address</span>
              </div>
            </label>

            <label
              className={`block rounded-xl p-3 sm:p-3.4 cursor-pointer border transition-all duration-200 ${
                billingAddress === "different"
                  ? "border-blue-500 ring-1 ring-blue-200 bg-blue-50/40"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="billingAddress"
                  checked={billingAddress === "different"}
                  onChange={() => setBillingAddress("different")}
                  className="accent-black"
                />
                <span className="text-sm">Use a different billing address</span>
              </div>

              {billingAddress === "different" && (
                <div className="mt-4 bg-white/90 p-4 sm:p-5 rounded-xl space-y-3 sm:space-y-4 border border-gray-100">
                  <select
                    disabled
                    className="w-full border rounded-lg p-3 sm:p-3.5 mb-2 border-gray-200 bg-gray-50 text-sm sm:text-base"
                    defaultValue="India"
                  >
                    <option>India</option>
                  </select>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <input
                        name="firstName"
                        placeholder="First name"
                        value={billingForm.firstName}
                        onChange={handleBillingChange}
                        className={`border p-3 sm:p-3.5 rounded-lg w-full text-sm sm:text-base bg-gray-50/60 focus:bg-white outline-none transition-all duration-200 focus:ring-2 focus:ring-black/80 ${
                          errors.billingFirstName
                            ? errorClass
                            : "border-gray-200"
                        }`}
                      />
                      {errors.billingFirstName && (
                        <p className="text-red-600 text-xs sm:text-sm mt-1">
                          {errors.billingFirstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        name="lastName"
                        placeholder="Last name"
                        value={billingForm.lastName}
                        onChange={handleBillingChange}
                        className={`border p-3 sm:p-3.5 rounded-lg w-full text-sm sm:text-base bg-gray-50/60 focus:bg-white outline-none transition-all duration-200 focus:ring-2 focus:ring-black/80 ${
                          errors.billingLastName
                            ? errorClass
                            : "border-gray-200"
                        }`}
                      />
                      {errors.billingLastName && (
                        <p className="text-red-600 text-xs sm:text-sm mt-1">
                          {errors.billingLastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <input
                      name="address"
                      placeholder="Address"
                      value={billingForm.address}
                      onChange={handleBillingChange}
                      className={`border p-3 sm:p-3.5 rounded-lg w-full text-sm sm:text-base bg-gray-50/60 focus:bg-white outline-none transition-all duration-200 focus:ring-2 focus:ring-black/80 ${
                        errors.billingAddress ? errorClass : "border-gray-200"
                      }`}
                    />
                    {errors.billingAddress && (
                      <p className="text-red-600 text-xs sm:text-sm mt-1">
                        {errors.billingAddress}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      name="apartment"
                      placeholder="Apartment, suite, etc. (optional)"
                      value={billingForm.apartment}
                      onChange={handleBillingChange}
                      className="border p-3 sm:p-3.5 rounded-lg w-full text-sm sm:text-base border-gray-200 bg-gray-50/60 focus:bg-white outline-none transition-all duration-200 focus:ring-2 focus:ring-black/80"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div>
                      <input
                        name="city"
                        placeholder="City"
                        value={billingForm.city}
                        onChange={handleBillingChange}
                        className={`border p-3 sm:p-3.5 rounded-lg w-full text-sm sm:text-base bg-gray-50/60 focus:bg-white outline-none transition-all duration-200 focus:ring-2 focus:ring-black/80 ${
                          errors.billingCity ? errorClass : "border-gray-200"
                        }`}
                      />
                      {errors.billingCity && (
                        <p className="text-red-600 text-xs sm:text-sm mt-1">
                          {errors.billingCity}
                        </p>
                      )}
                    </div>
                    <div>
                      <select
                        name="state"
                        value={billingForm.state}
                        onChange={handleBillingChange}
                        className="border p-3 sm:p-3.5 rounded-lg w-full text-sm sm:text-base border-gray-200 bg-gray-50/60 focus:bg-white outline-none transition-all duration-200 focus:ring-2 focus:ring-black/80"
                      >
                        {indianStates.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <input
                        name="pincode"
                        placeholder="PIN code"
                        value={billingForm.pincode}
                        onChange={handleBillingChange}
                        className={`border p-3 sm:p-3.5 rounded-lg w-full text-sm sm:text-base bg-gray-50/60 focus:bg-white outline-none transition-all duration-200 focus:ring-2 focus:ring-black/80 ${
                          errors.billingPincode
                            ? errorClass
                            : "border-gray-200"
                        }`}
                      />
                      {errors.billingPincode && (
                        <p className="text-red-600 text-xs sm:text-sm mt-1">
                          {errors.billingPincode}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <input
                      name="phone"
                      placeholder="Phone (optional)"
                      value={billingForm.phone}
                      onChange={handleBillingChange}
                      className={`border p-3 sm:p-3.5 rounded-lg w-full pr-12 text-sm sm:text-base bg-gray-50/60 focus:bg-white outline-none transition-all duration-200 focus:ring-2 focus:ring-black/80 ${
                        errors.billingPhone ? errorClass : "border-gray-200"
                      }`}
                    />
                    {isValidIndianPhone(billingForm.phone) && (
                      <img
                        src={IndiaFlag}
                        alt="India Flag"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-7 rounded shadow-sm"
                      />
                    )}
                  </div>
                  {errors.billingPhone && (
                    <p className="text-red-600 text-xs sm:text-sm mt-1">
                      {errors.billingPhone}
                    </p>
                  )}
                </div>
              )}
            </label>
          </section>

          {/* mobile summary */}
          <MobileSummary />

          {/* Buttons: Pay + View / Print Bill */}
          <div className="mt-2 sm:mt-4 space-y-2">
            {paymentMethod === "razorpay" ? (
              <button
                className="w-full bg-black text-white py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-medium tracking-wide shadow-md shadow-black/20 hover:shadow-lg hover:shadow-black/30 hover:-translate-y-[1px] active:translate-y-0 active:shadow-md transition-all duration-200"
                onClick={handlePlaceOrder}
              >
                Pay now
              </button>
            ) : (
              <button
                className="w-full bg-gray-900 text-white py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-medium tracking-wide shadow-md shadow-gray-700/20 hover:shadow-lg hover:shadow-gray-800/30 hover:-translate-y-[1px] active:translate-y-0 active:shadow-md transition-all duration-200"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            )}

            {/* ⭐ View / Print Bill button - goes to /invoice (only after valid form) */}
            <button
              type="button"
              onClick={handleGoToInvoice}
              className="w-full bg-black text-white py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-medium tracking-wide shadow-md shadow-black/20 hover:shadow-lg hover:shadow-black/30 hover:-translate-y-[1px] active:translate-y-0 active:shadow-md transition-all duration-200"
            >
              Print Bill
            </button>
          </div>
        </div>

        {/* right summary - show only when cart has items */}
        {cartItems && cartItems.length > 0 && productData ? (
          <aside className="hidden md:block bg-white/90 backdrop-blur-sm px-4 sm:px-6 py-6 sm:py-8 border border-gray-100 rounded-2xl shadow-sm h-fit transform transition duration-300 hover:shadow-md hover:-translate-y-[2px]">
            <div className="md:sticky md:top-24">
              <div className="flex items-start mb-4 sm:mb-5 space-x-4">
                <div className="relative">
                  <img
                    src={productImageForSummary}
                    alt="Product"
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border border-gray-200 shadow-sm"
                  />
                  {productData.quantity > 1 && (
                    <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] px-2 py-1 rounded-full shadow-md">
                      × {productData.quantity}
                    </span>
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm sm:text-base font-medium leading-snug">
                    {productData.name}
                  </p>
                  <p className="text-[11px] sm:text-xs text-gray-500">
                    {productData.color}{" "}
                    {productData.size ? `/ ${productData.size}` : ""}
                  </p>
                </div>
                <div className="text-sm sm:text-base font-semibold">
                  {formatINR(productPriceNumber)}
                </div>
              </div>

              <div className="border-t pt-4 sm:pt-5 space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shippingFee === null ? (
                      <span className="text-gray-500 text-[11px] sm:text-xs">
                        Enter shipping address
                      </span>
                    ) : shippingFee === 0 ? (
                      <span className="text-green-600 font-semibold">
                        FREE
                      </span>
                    ) : (
                      <span className="font-semibold">
                        {formatINR(shippingFee)}
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between font-semibold pt-2 text-sm sm:text-base">
                  <span>Total</span>
                  <span className="text-gray-900">
                    {formatINR(totalAmount)}
                  </span>
                </div>
              </div>

              <div className="mt-4 sm:mt-5 flex items-center justify-between text-[10px] sm:text-xs text-gray-500">
                <span>100% secure payment</span>
                <span>COD available</span>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => handleRemoveFromCart(productData.id)}
                  className="w-full border border-red-200 text-red-600 py-2 rounded-lg hover:bg-red-50 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          </aside>
        ) : (
          <div className="hidden md:block" />
        )}
      </div>

      <footer className="border-t border-gray-200 mt-4 sm:mt-6 py-4 sm:py-6 text-center text-gray-500 text-[11px] sm:text-xs px-4 space-x-3 sm:space-x-4 bg-white/80 backdrop-blur-sm">
        <Link to="/refund" className="hover:underline">
          Refund Policy
        </Link>
        <a href="/shipping" className="hover:underline">
          Shipping
        </a>
        <a href="/privacypolicy" className="hover:underline">
          Privacy Policy
        </a>
        <a href="/terms" className="hover:underline">
          Terms of Service
        </a>
        <a href="/contact" className="hover:underline">
          Contact
        </a>
      </footer>
    </div>
  );
};

export default Checkout;
