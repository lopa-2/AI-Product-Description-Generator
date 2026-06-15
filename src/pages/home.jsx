import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Card from '../components/Card'
import Footer from '../components/Footer'

const products = [
  { name: "Raw Himalayan Honey", weight: "500g", description: "Cold-extracted from high-altitude flowers. Rich in enzymes.", tag: "Best Seller" },
  { name: "Organic Ghee", weight: "250g", description: "Slow-cooked from A2 cow milk. Pure and traditionally churned.", tag: "Premium" },
  { name: "Wild Forest Turmeric", weight: "200g", description: "High-curcumin wild-harvested turmeric. No additives.", tag: "Organic" },
  { name: "Himalayan Pink Salt", weight: "1kg", description: "Hand-mined from ancient deposits. Trace minerals intact.", tag: "Natural" },
]

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <div className="bg-amber-50 py-16 px-6">
        <h2 className="text-center text-green-900 text-3xl font-bold mb-10">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {products.map((p) => (
            <Card
              key={p.name}
              name={p.name}
              weight={p.weight}
              description={p.description}
              tag={p.tag}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home