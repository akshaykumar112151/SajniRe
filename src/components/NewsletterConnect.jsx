import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import emailjs from "emailjs-com";
import { useState } from "react";
import { motion } from "framer-motion";

export default function NewsletterConnect() {
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);
  const [sending, setSending] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    if (!email || !agree) return;

    setSending(true);

    try {
      await emailjs.send(
        "service_xxxxxx",
        "template_abcd123",
        { user_email: email },
        "abcdEfgh12345"
      );

      alert("Message Sent!");
      setEmail("");
      setAgree(false);
    } catch (error) {
      alert("Failed to send. Try again.");
    }

    setSending(false);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ show: { transition: { staggerChildren: 0.15 } } }}
      className="w-full bg-[#f8e6d2] relative bg-cover bg-center py-14 sm:py-20 overflow-hidden"
    >
      {/* Soft Luxury Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 1.3 }}
        className="absolute inset-0 bg-gradient-to-b from-white/60 to-[#f8e6d2]/90"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-0 flex flex-col lg:flex-row gap-14 lg:gap-20 items-start lg:items-center justify-between">

        {/* LEFT CONTENT */}
        <motion.div variants={fadeUp} className="lg:w-2/3 w-full">
          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-serif mb-5 tracking-wide text-[#111]"
          >
            Stay Informed, Always
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-gray-700 text-base sm:text-lg mb-8 max-w-2xl leading-relaxed"
          >
            Be part of our story. Receive exclusive updates, trends, and timeless
            inspiration—curated personally for you.
          </motion.p>

          {/* EMAIL FORM */}
          <motion.form
            variants={fadeUp}
            onSubmit={sendEmail}
            className="flex flex-col gap-5 max-w-xl"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              {/* EMAIL INPUT */}
              <motion.input
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="flex-1 px-5 py-3 rounded-lg bg-white/80 border border-gray-300 focus:ring-2 focus:ring-black outline-none placeholder-gray-700"
              />

              {/* SEND BUTTON */}
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                type="submit"
                disabled={sending}
                className={`px-8 py-3 text-white text-lg rounded-lg bg-black transition-all 
                  ${sending ? "opacity-60 cursor-not-allowed" : "hover:bg-gray-900"}`}
              >
                {sending ? "Sending..." : "Send Message"}
              </motion.button>
            </div>

            {/* CHECKBOX */}
            <motion.label
              variants={fadeUp}
              className="flex items-center text-sm text-gray-700 cursor-pointer"
            >
              <input
                type="checkbox"
                required
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mr-3 accent-black"
              />
              I agree to the{" "}
              <a href="/terms" className="underline ml-1 hover:text-black">
                Terms & Conditions
              </a>
            </motion.label>
          </motion.form>
        </motion.div>

        {/* DIVIDER */}
        <motion.div
          variants={fadeUp}
          className="hidden lg:block w-px bg-gray-400 h-40"
        />

        {/* RIGHT SOCIAL ICONS */}
        <motion.div
          variants={fadeUp}
          className="lg:w-1/3 flex flex-col items-center lg:items-start"
        >
          <h3 className="text-3xl font-serif mb-6 tracking-wide text-[#111]">
            Connect Globally
          </h3>

          <p className="text-gray-700 mb-4 max-w-sm text-center lg:text-left">
            Follow us for behind-the-scenes, new arrivals & more.
          </p>

          <div className="flex gap-5">
            {[
              { icon: <FaFacebookF />, link: "https://facebook.com" },
              {
                icon: <FaInstagram />,
                link: "https://www.instagram.com/sajnire2922?igsh=ZnRoejU3M2F5OXJl",
              },
              {
                icon: <FaWhatsapp />,
                link: "https://wa.me/919123140229?text=Hello%20Sajni%20Re,%20I%20want%20to%20know%20more%20about%20your%20jewellery%20collection!",
              },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 8 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800 transition-all text-lg shadow-md"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
