import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { InfiniteSlider } from "../components/InfiniteSlider";
import { AppleStyleDock } from "../components/AppleStyleDock";
import { useTheme } from "../context/ThemeContext";

const products = [
  {
    name: "Raw Himalayan Honey",
    weight: "500g",
    description:
      "Cold-extracted from high-altitude flowers. Rich in enzymes.",
    tag: "Best Seller",
  },
  {
    name: "Organic Ghee",
    weight: "250g",
    description:
      "Slow-cooked from A2 cow milk. Pure and traditionally churned.",
    tag: "Premium",
  },
  {
    name: "Wild Forest Turmeric",
    weight: "200g",
    description:
      "High-curcumin wild-harvested turmeric. No additives.",
    tag: "Organic",
  },
  {
    name: "Himalayan Pink Salt",
    weight: "1kg",
    description:
      "Hand-mined from ancient deposits. Trace minerals intact.",
    tag: "Natural",
  },
];

function Home() {
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDark ? "bg-gray-950 text-white" : "bg-white text-gray-900"
      }`}
    >
      <Navbar />

      <Hero />

      {/* Products Section */}
      <section
        id="products"
        className={`relative overflow-hidden py-24 transition-all duration-500 ${
          isDark
            ? "bg-gradient-to-b from-[#111827] via-[#0f172a] to-[#020617]"
            : "bg-gradient-to-b from-[#f8fafc] via-[#eef2ff] to-[#e2e8f0]"
        }`}
      >
        {/* Dark Mode Glow */}
        {isDark && (
          <>
            <div className="absolute -top-40 left-10 h-96 w-96 rounded-full bg-pink-500/15 blur-[180px]" />

            <div className="absolute top-24 right-10 h-[500px] w-[500px] rounded-full bg-sky-500/15 blur-[200px]" />

            <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-500/15 blur-[180px]" />

            {/* Grid */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
          </>
        )}

        <div className="relative z-10">
          <h2
            className={`text-center text-5xl font-bold mb-16 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Our Products
          </h2>

          <InfiniteSlider gap={24} speed={30} className="py-10">
            {products.map((p) => (
              <div key={p.name} className="w-72 shrink-0">
                <Card
                  name={p.name}
                  weight={p.weight}
                  description={p.description}
                  tag={p.tag}
                />
              </div>
            ))}
          </InfiniteSlider>
        </div>
      </section>

      <Footer />
      <AppleStyleDock />
    </div>
  );
}

export default Home;