import { ArrowRight, Instagram } from "lucide-react";
import ImageB1 from "../assets/Imgb1.jpg";
import ImageB2 from "../assets/Imgb2.jpg";
import ImageB3 from "../assets/Imgb3.jpg";
import ImageB4 from "../assets/Imgb4.jpg";
import { useEffect } from "react";

export default function ContactFeedbackSection() {
  useEffect(() => {
    // Trigger smooth fade-in for section on scroll (optional, can remove for SSR)
    const section = document.querySelector('.contact-fs-animate');
    if (section) {
      const onScroll = () => {
        const rect = section.getBoundingClientRect();
        if(rect.top < window.innerHeight - 50){
          section.classList.add('contact-fs-inview');
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener('scroll', onScroll);
    }
  }, []);

  return (
    <section className="contact-fs-animate bg-[#f9f3ed] py-10 px-4 md:px-10 lg:px-20 transition-all md:py-16 opacity-0 translate-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Left Section */}
        <div className="animate-slide-left">
          <p className="uppercase tracking-wide text-xs md:text-sm mb-2 mt-2 text-[#b39272] animate-fade-in-down">Thoughts</p>
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-[#512c1e] animate-fade-in-down">We Value Feedback</h2>
          <p className="text-gray-700 mb-8 text-base md:text-lg">
            Your thoughts matter to us. At Sajni Re, we strive to craft jewellery that resonates with your style and story.<br />
            <span className="font-semibold text-[#a87956]">Share your feedback and help us create timeless pieces that you’ll cherish forever.</span>
          </p>

          {/* Working Hours */}
          <div className="mb-8">
            <h3 className="text-lg md:text-xl font-medium mb-3 text-[#a87956]">Working Hours</h3>
            <ul className="space-y-2 text-base md:text-lg">
              <li>✦ Monday To Friday - 10:30 am To 07:00 pm</li>
              <li>✦ Saturday - 10:30 am To 06:00 pm</li>
              <li>✦ Sunday - Holiday</li>
            </ul>
          </div>

          {/* Images Row with Animated Instagram Icon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
            {[ImageB1, ImageB2, ImageB3, ImageB4].map((img, idx) => (
              <div
                key={idx}
                className="relative group overflow-hidden rounded-lg cursor-pointer shadow-md hover:shadow-xl transition img-zoom-anim"
              >
                {/* Image */}
                <img
                  src={img}
                  alt={`feedback-${idx + 1}`}
                  className="w-full h-24 md:h-32 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Instagram Animated Icon */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500">
                  <Instagram size={28} className="text-white group-hover:flip-ig-icon" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section (Form) */}
        <div className="bg-[#a87956] p-6 md:p-10 rounded-xl shadow-lg animate-slide-right">
          <form className="space-y-4 md:space-y-5">
            <input
              type="text"
              placeholder="Name*"
              className="w-full p-3 md:p-4 bg-[#f2e4d3] outline-none rounded-md border border-[#e1cab3] focus:ring-2 focus:ring-[#b48154] transition-all duration-300 hover:scale-[1.03]"
            />
            <input
              type="text"
              placeholder="Phone Number*"
              className="w-full p-3 md:p-4 bg-[#f2e4d3] outline-none rounded-md border border-[#e1cab3] focus:ring-2 focus:ring-[#b48154] transition-all duration-300 hover:scale-[1.03]"
            />
            <input
              type="date"
              placeholder="Enter Date*"
              className="w-full p-3 md:p-4 bg-[#f2e4d3] outline-none rounded-md border border-[#e1cab3] focus:ring-2 focus:ring-[#b48154] transition-all duration-300 hover:scale-[1.03]"
            />
            <textarea
              placeholder="Message*"
              rows={4}
              className="w-full p-3 md:p-4 bg-[#f2e4d3] outline-none rounded-md border border-[#e1cab3] focus:ring-2 focus:ring-[#b48154] transition-all duration-300 resize-none hover:scale-[1.02]"
            ></textarea>
            <button
              type="submit"
              className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-[#222] active:scale-95 transition font-semibold shadow-md focus:ring-2 focus:ring-white"
            >
              Send Message <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
      {/* Animations */}
      <style>
        {`
          .contact-fs-animate.contact-fs-inview {
            opacity: 1 !important;
            transform: none !important;
            transition: opacity 0.8s cubic-bezier(.39,.575,.565,1), transform 0.8s cubic-bezier(.39,.575,.565,1);
          }
          .animate-fade-in-down {
            animation: fadeInDownCustom 0.90s cubic-bezier(.39,.575,.565,1) both;
          }
          @keyframes fadeInDownCustom {
            0% { opacity: 0; transform: translateY(-16px);}
            100% { opacity: 1; transform: translateY(0);}
          }
          .animate-slide-left {
            animation: slideLeftCustom 0.95s cubic-bezier(.41,.79,.26,.98) both;
          }
          @keyframes slideLeftCustom {
            0% { opacity: 0; transform: translateX(-26px);}
            100% { opacity: 1; transform: translateX(0);}
          }
          .animate-slide-right {
            animation: slideRightCustom 0.95s cubic-bezier(.41,.79,.26,.98) both;
          }
          @keyframes slideRightCustom {
            0% { opacity: 0; transform: translateX(26px);}
            100% { opacity: 1; transform: translateX(0);}
          }
          @keyframes flipY {
            0% { transform: rotateY(0deg);}
            100% { transform: rotateY(180deg);}
          }
          .flip-ig-icon {
            animation: flipY 0.7s forwards;
          }
          /* Optional: image pop zoom on scroll in */
          .contact-fs-inview .img-zoom-anim img {
            animation: imgZoomIn 1s cubic-bezier(.58,.74,.62,1.28) 0.02s both;
          }
          @keyframes imgZoomIn {
            0% { opacity: 0.75; transform: scale(0.92);}
            100% { opacity: 1; transform: scale(1);}
          }
        `}
      </style>
    </section>
  );
}
