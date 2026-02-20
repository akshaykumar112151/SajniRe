// src/pages/Invoice.jsx
import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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

const Invoice = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // data from state OR localStorage
  let data = location.state;
  if (!data) {
    try {
      const saved = localStorage.getItem("invoiceData");
      if (saved) data = JSON.parse(saved);
    } catch (e) {
      data = null;
    }
  }

  if (!data || !data.productData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <p className="text-sm sm:text-base text-gray-600 mb-4">
          No invoice data found. Please place an order first.
        </p>
        <button
          onClick={() => navigate("/checkout")}
          className="px-5 py-2.5 rounded-full bg-black text-white text-sm"
        >
          Back to Checkout
        </button>
      </div>
    );
  }

  const {
    productData,
    formData,
    billingForm,
    billingAddress,
    paymentMethod, // (not shown yet, future use)
    subtotal: rawSubtotal,
  } = data;

  const now = useMemo(() => new Date(), []);
  const orderNumber = useMemo(() => Math.floor(now.getTime() / 1000), [now]);

  const dateStr =
    now.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }) +
    " " +
    now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  const shipping = billingAddress === "different" ? billingForm : formData;

  const customerName =
    ((shipping.firstName || "") + " " + (shipping.lastName || "")).trim() ||
    "Customer";

  const shippingAddressLine1 =
    [shipping.address, shipping.apartment].filter(Boolean).join(", ") ||
    "Address not provided";
  const shippingAddressLine2 = [shipping.city, shipping.state, shipping.pincode]
    .filter(Boolean)
    .join(", ");

  const customerPhone =
    shipping.phone && shipping.phone.trim() !== "+91" ? shipping.phone : "";

  const qty = productData.quantity || 1;

  // Subtotal (taxable value)
  const subtotal = typeof rawSubtotal === "number" ? rawSubtotal : 0;

  // ---- SERVICE CHARGE FIXED ₹50 ----
  const serviceCharge = 50;

  // ---- TAX CALCULATION (8% + 8% on subtotal) ----
  const taxRate = 0.08; // 8%
  const cgstAmount = subtotal * taxRate;
  const sgstAmount = subtotal * taxRate;

  // Base total = subtotal + service charge + CGST + SGST
  const baseTotal = subtotal + serviceCharge + cgstAmount + sgstAmount;

  // Per-item rate (single product case)
  const rate = qty ? subtotal / qty : 0;

  const storeName = "Sajni Re";
  const orderType = "Online";

  // 👉 Print = generate Bill.pdf using html2canvas + jsPDF
  const handlePrint = async () => {
    const element = document.getElementById("invoice-card");
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");

      // A4 portrait in mm
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 10;

      const pdfWidth = pageWidth - margin * 2;
      const pdfHeight = pageHeight - margin * 2;

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Ensure SINGLE PAGE: scale down if needed
      let finalWidth = imgWidth;
      let finalHeight = imgHeight;
      if (imgHeight > pdfHeight) {
        const ratio = pdfHeight / imgHeight;
        finalHeight = pdfHeight;
        finalWidth = imgWidth * ratio;
      }

      const x = (pageWidth - finalWidth) / 2;
      const y = (pageHeight - finalHeight) / 2;

      pdf.addImage(imgData, "PNG", x, y, finalWidth, finalHeight);

      // ✅ Always save as Bill.pdf
      pdf.save("Bill.pdf");
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <>
      <style>{`
        @page {
          size: A4 portrait;
          margin: 10mm;
        }
      `}</style>

      <div
        id="invoice-print-root"
        className="min-h-screen bg-gray-100 py-4 sm:py-10 px-3 sm:px-4 flex flex-col items-center"
      >
        {/* Top actions (screen only) */}
        <div className="no-print w-full max-w-md flex justify-between items-center mb-4">
          <button
            onClick={() => navigate(-1)}
            className="text-xs sm:text-sm px-3 py-1.5 rounded-full border border-gray-300 bg-white hover:bg-gray-50"
          >
            ← Back
          </button>
          <button
            onClick={handlePrint}
            className="text-xs sm:text-sm px-4 py-2 rounded-full bg-black text-white font-medium shadow-md hover:shadow-lg"
          >
            Print Invoice
          </button>
        </div>

        {/* E-BILL layout (fully responsive card) */}
        <div
          id="invoice-card"
          className="invoice-wrapper bg-white w-full max-w-md shadow-md rounded-xl p-4 sm:p-6 border border-gray-200 text-gray-800 flex flex-col justify-between"
        >
          <div>
            {/* Welcome */}
            <h1 className="text-center text-base sm:text-lg font-semibold mb-4 sm:mb-5">
              Welcome
            </h1>

            {/* Top order info */}
            <div className="grid grid-cols-2 text-[12px] sm:text-[13px] gap-y-4 sm:gap-y-5 mb-4 sm:mb-5">
              <div className="pr-3">
                <p className="text-gray-500">Order Number</p>
                <p className="mt-1 text-sm font-medium break-all">
                  {orderNumber}
                </p>
              </div>
              <div className="pl-3 border-l border-gray-200">
                <p className="text-gray-500">Order Type</p>
                <p className="mt-1 text-sm font-medium">{orderType}</p>
              </div>
              <div className="pr-3">
                <p className="text-gray-500">Order Amount</p>
                <p className="mt-1 text-sm font-medium">
                  {formatINR(baseTotal)}
                </p>
              </div>
              <div className="pl-3 border-l border-gray-200">
                <p className="text-gray-500">Date</p>
                <p className="mt-1 text-sm font-medium">{dateStr}</p>
              </div>
            </div>

            {/* Customer details */}
            <div className="mb-4 text-[12px] sm:text-[13px]">
              <p className="text-gray-600 mb-1.5 font-medium">
                Customer Details
              </p>
              <p className="text-sm leading-snug break-words">{customerName}</p>
              {customerPhone && (
                <p className="text-sm leading-snug break-words">
                  {customerPhone}
                </p>
              )}
              <p className="text-sm leading-snug break-words">
                {shippingAddressLine1}
              </p>
              {shippingAddressLine2 && (
                <p className="text-sm leading-snug break-words">
                  {shippingAddressLine2}
                </p>
              )}
            </div>

            {/* E-BILL card inner */}
            <div className="mt-3 border border-gray-200 rounded-lg px-4 sm:px-5 py-5 sm:py-6 text-[12px] sm:text-[13px]">
              {/* E-BILL heading */}
              <div className="text-center mb-4 sm:mb-5">
                <p className="text-base sm:text-lg font-semibold tracking-wide">
                  E-BILL
                </p>
                <p className="mt-1 text-xs sm:text-sm text-gray-600">
                  {storeName}
                </p>
              </div>

              {/* Table header */}
              <div className="border-t border-gray-200 pt-2 mt-1" />
              <div className="mt-3 grid grid-cols-[2fr,0.6fr,1fr,1fr] text-[12px] sm:text-[13px] font-medium">
                <span>Name</span>
                <span className="text-center">Qty.</span>
                <span className="text-right">Rate (₹)</span>
                <span className="text-right">Price (₹)</span>
              </div>
              <div className="border-b border-gray-200 mt-1.5 mb-2.5" />

              {/* Single line item */}
              <div className="grid grid-cols-[2fr,0.6fr,1fr,1fr] text-[12px] sm:text-[13px] mb-2">
                <div className="pr-2">
                  <p className="leading-snug break-words">
                    {productData.name || "Product"}
                  </p>
                  {productData.size && (
                    <p className="text-[11px] text-gray-500">
                      Size: {productData.size}
                    </p>
                  )}
                </div>
                <div className="text-center">{qty}</div>
                <div className="text-right">{rate.toFixed(2)}</div>
                <div className="text-right">{subtotal.toFixed(2)}</div>
              </div>

              <div className="border-t border-gray-200 mt-4 mb-4" />

              {/* Summary section */}
              <div className="space-y-1.5 text-[12px] sm:text-[13px]">
                <p>
                  <span>Total Quantity:</span>
                  <span className="float-right">{qty}</span>
                </p>
                <p>
                  <span>Sub Total:</span>
                  <span className="float-right">
                    {subtotal.toFixed(2)}
                  </span>
                </p>
                <p>
                  <span>Service Charge:</span>
                  <span className="float-right">
                    {serviceCharge.toFixed(2)}
                  </span>
                </p>
                <p>
                  <span>CGST</span>
                  <span className="float-right">
                    8%
                    <span className="ml-1">
                      ₹{cgstAmount.toFixed(2)}
                    </span>
                  </span>
                </p>
                <p>
                  <span>SGST</span>
                  <span className="float-right">
                    8%
                    <span className="ml-1">
                      ₹{sgstAmount.toFixed(2)}
                    </span>
                  </span>
                </p>
              </div>

              <div className="border-t border-gray-200 mt-4 mb-4" />

              {/* Total payable */}
              <div className="space-y-1 text-[12px] sm:text-[13px]">
                <p className="font-semibold">
                  <span>Total Payable Amount:</span>
                  <span className="float-right">
                    {formatINR(baseTotal)}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Footer note – BLACK text */}
          <p className="mt-6 text-center text-[12px] sm:text-[13px] font-medium text-black">
            Thank you for Choosing Us. Please Visit again
          </p>
        </div>
      </div>
    </>
  );
};

export default Invoice;
