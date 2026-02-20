// src/data/products.js

import LightChain from "../assets/light-chain.png";
import ClassicHoops from "../assets/classic-hoops.png";
import PearlNecklace from "../assets/pearl-necklace.png";
import PearlEarring from "../assets/pearl-earring.png";
import CrystalNecklace from "../assets/crystal-necklace.png";
import PearlHairClip from "../assets/pearlhairclip.png";
import SilverChain from "../assets/silverchain.png";
import GoldPendantImage from "../assets/gold-pendant.png";

const products = [
  {
    id: 1,
    category: "Chains",
    name: "Lightweight Chain",
    priceRange: "₹1,000 – ₹1,300",
    images: [LightChain, LightChain, LightChain],
    description: "A 10k caret lightweight chain with a unique beauty style.",
    sale: true,
    sku: "MTUO-258-AJ-256-658-9",
    inStock: 20,
    weights: ["10g", "15g", "20g"],
  },
  {
    id: 2,
    category: "Ear Studs",
    name: "Classic Gold Hoops",
    priceRange: "₹599 – ₹799",
    images: [ClassicHoops, ClassicHoops],
    description: "Classic golden hoops that add elegance to your look.",
    sale: true,
    sku: "ABCD-123-EFG-456",
    inStock: 15,
    weights: ["5g", "8g", "12g"],
  },
  {
    id: 3,
    category: "Necklaces",
    name: "Pearl Necklace",
    priceRange: "₹1,577 – ₹1,826",
    images: [PearlNecklace, PearlNecklace],
    description: "Elegant pearl necklace, perfect for parties and weddings.",
    sale: false,
    sku: "PEARL-234-XYZ-789",
    inStock: 5,
    weights: ["10g", "12g", "15g"],
  },
  {
    id: 4,
    category: "Earrings",
    name: "Pearl Earrings",
    priceRange: "₹1,577 – ₹1,992",
    images: [PearlEarring, PearlEarring],
    description: "Simple yet classy pearl earrings for everyday wear.",
    sale: true,
    sku: "PEARL-567-QWE-101",
    inStock: 12,
    weights: ["3g", "5g", "7g"],
  },
  {
    id: 5,
    category: "Necklaces",
    name: "Crystal Necklace",
    priceRange: "₹2,656 – ₹3,071",
    images: [CrystalNecklace, CrystalNecklace],
    description: "Shiny crystal necklace for a sparkling appearance.",
    sale: false,
    sku: "CRYS-890-RTY-202",
    inStock: 8,
    weights: ["8g", "10g", "13g"],
  },
  {
    id: 6,
    category: "Hair Accessories",
    name: "Pearl Hair Clip",
    priceRange: "₹332 – ₹664",
    images: [PearlHairClip, PearlHairClip],
    description: "Trendy pearl hair clip to style your hair elegantly.",
    sale: true,
    sku: "CLIP-111-HJK-303",
    inStock: 30,
    weights: ["2g", "3g", "5g"],
  },
  {
    id: 7,
    category: "Chains",
    name: "Silver Chain",
    priceRange: "₹1,328 – ₹1,826",
    images: [SilverChain, SilverChain],
    description: "Durable silver chain with a modern look.",
    sale: false,
    sku: "SILV-444-LMN-404",
    inStock: 18,
    weights: ["15g", "20g", "25g"],
  },
  {
    id: 8,
    category: "Pendants",
    name: "Gold Pendant",
    priceRange: "₹2,490 – ₹2,905",
    images: [GoldPendantImage, GoldPendantImage],
    description: "Stylish gold pendant for special occasions.",
    sale: true,
    sku: "GOLD-777-BVC-505",
    inStock: 10,
    weights: ["10g", "12g", "15g"],
  },
];

export default products;
