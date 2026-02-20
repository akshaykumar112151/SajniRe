// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Common Components
import TopStrip from "./components/TopStrip";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToggleButton from "./components/ScrollToggleButton";

// Home Page Components
import HeroBanner from "./components/HeroBanner";
import PromoSection from "./components/PromoSection";
import CategorySplitBanner from "./components/CategorySplitBanner";
import NewArrivals from "./components/NewArrivals";
import DealCountdown from "./components/DealCountdown";
import LoveBeautySection from "./components/LoveBeautySection";
import ProductShowcase from "./components/ProductShowcase";
import CollectionSection from "./components/CollectionSection";
import TestimonialSection from "./components/TestimonialSection";
import NewsletterConnect from "./components/NewsletterConnect";

// Pages
import Contact from "./pages/Contact";
import BraceletsPage from "./pages/BraceletsPage";
import EarringsPage from "./pages/EarringsPage";
import MangalsutraPage from "./pages/MangalsutraPage";
import NecklacePage from "./pages/NecklacePage";
import PendantSetPage from "./pages/PendantSetPage";
import RingsPage from "./pages/RingsPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import ProductDetail from "./pages/ProductDetail";
import Faqs from "./pages/Faqs";
import Shipping from "./pages/Shipping";
import Refund from "./pages/Refund";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";

// Account Related Pages
import Orders from "./pages/Orders";
import SajniReCredit from "./pages/SajniReCredit";
import SajniCash from "./pages/SajniCash";
import SavedCards from "./pages/SavedCards";
import SavedUPI from "./pages/SavedUPI";
import SavedWalletsBNPL from "./pages/SavedWalletsBNPL";
import Addresses from "./pages/Addresses";
import DeleteAccount from "./pages/DeleteAccount";
import Account from "./pages/Account";

// NEW — Coupons Page
import Coupons from "./pages/Coupons";

// ⭐ NEW — Expired coupon no-results page
import ExpiredCouponNoResults from "./pages/ExpiredCouponNoResults";

// Auth
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

// Search
import SearchResults from "./pages/SearchResults";

// ⭐ NEW — Invoice Page
import Invoice from "./pages/Invoice";

function HomePage() {
  return (
    <>
      <HeroBanner />
      <PromoSection />
      <CategorySplitBanner />
      <NewArrivals />
      <DealCountdown />
      <LoveBeautySection />
      <ProductShowcase />
      <CollectionSection />
      <TestimonialSection />
      <NewsletterConnect />
    </>
  );
}

function App() {
  return (
    <Router>
      <TopStrip />
      <Navbar />

      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />

        {/* Shop / Collections */}
        <Route path="/shop" element={<CollectionSection />} />
        <Route path="/collection/bracelets" element={<BraceletsPage />} />
        <Route path="/collection/earrings" element={<EarringsPage />} />
        <Route path="/collection/mangalsutra" element={<MangalsutraPage />} />
        <Route path="/collection/necklace" element={<NecklacePage />} />
        <Route path="/collection/pendant-set" element={<PendantSetPage />} />
        <Route path="/collection/rings" element={<RingsPage />} />

        {/* Product Detail */}
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* Cart / Wishlist / Checkout */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />

        {/* ⭐ NEW: Invoice */}
        <Route path="/invoice" element={<Invoice />} />

        {/* Orders + Account System */}
        <Route path="/orders" element={<Orders />} />
        <Route path="/sajni-credit" element={<SajniReCredit />} />
        <Route path="/sajnicash" element={<SajniCash />} />
        <Route path="/saved-cards" element={<SavedCards />} />
        <Route path="/saved-upi" element={<SavedUPI />} />
        <Route path="/saved-wallets-bnpl" element={<SavedWalletsBNPL />} />
        <Route path="/addresses" element={<Addresses />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
        <Route path="/account" element={<Account />} />

        {/* ⭐ COUPONS + EXPIRED COUPON PAGES ⭐ */}
        <Route path="/coupons" element={<Coupons />} />
        <Route path="/coupon-expired" element={<ExpiredCouponNoResults />} />

        {/* Legal */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/refund" element={<Refund />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Search */}
        <Route path="/search" element={<SearchResults />} />
      </Routes>

      <Footer />
      <ScrollToggleButton />
    </Router>
  );
}

export default App;
