// src/components/DealCountdown.jsx
import React, { useEffect, useState } from "react";
import DealBannerImage from "../assets/deal-banner.png";

const DealCountdown = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date("2025-12-31T23:59:59");
    const now = new Date();
    const difference = targetDate - now;

    const timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };

    return difference > 0
      ? timeLeft
      : { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-[#fef6f2] py-10 px-4 rounded-xl">
      <div
        className="
          relative w-full max-w-[1750px] mx-auto 
          h-[200px]
          bg-[url('https://wdtswarna.wpengine.com/wp-content/uploads/2024/10/home-deal-counter-bg.jpg')]
          bg-cover bg-center rounded-xl shadow-md
          overflow-visible

          /* ensure pseudo overlay is behind content */
          before:content-[''] before:absolute before:inset-0 
          before:bg-[rgba(223,160,102,0.4)] before:rounded-xl before:z-0

          /* layout */
          flex flex-col md:flex-row items-center justify-between
          px-6 md:px-10
        "
      >
        {/* LEFT TEXT */}
        <div className="z-20 w-full md:w-[30%] text-white text-center md:text-left mb-4 md:mb-0">
          <p className="text-xs md:text-sm tracking-widest uppercase mb-2">
            Shop Now, Save Big
          </p>
          <h2 className="text-2xl md:text-4xl font-semibold leading-tight">
            Hurry, Deals Ends Soon
          </h2>
        </div>

        {/* CENTER IMAGE */}
        <div className="z-20 w-full md:w-[30%] flex justify-center relative mb-4 md:mb-0">
          {/* smaller negative offset on mobile so it doesn't overlap timer */}
          <img
            src={DealBannerImage}
            alt="Jewellery Mannequin"
            className="object-contain object-top
                       h-[160px] sm:h-[220px] md:h-[380px] 
                       mt-0 md:-mt-20"
          />
        </div>

        {/* COUNTDOWN TIMER */}
        <div
          className="
            z-20 w-full md:w-[30%] flex flex-wrap md:flex-nowrap 
            justify-center md:justify-end gap-3 md:gap-0 items-center
          "
        >
          {[
            { label: "DAYS", value: timeLeft.days },
            { label: "HRS", value: timeLeft.hours },
            { label: "MINS", value: timeLeft.minutes },
            { label: "SECS", value: timeLeft.seconds },
          ].map((item, idx, arr) => (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center px-2 sm:px-4">
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                  {item.value.toString().padStart(2, "0")}
                </span>
                <span className="text-[10px] sm:text-xs tracking-widest mt-1">
                  {item.label}
                </span>
              </div>

              {/* divider only on md+ so mobile doesn't show vertical lines */}
              {idx !== arr.length - 1 && (
                <div className="hidden md:block h-12 w-[2px] bg-white/80 self-center" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealCountdown;
