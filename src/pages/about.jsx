import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function About() {
  return (
    <div>
      <Navbar />
      <div className="bg-amber-50 min-h-screen px-6 py-16 text-center">
        <h1 className="text-4xl font-bold text-green-900 mb-4">About HimShakti</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          HimShakti is a Himalayan food brand dedicated to bringing pure,
          authentic, and sustainably sourced products to modern e-commerce
          platforms. This AI tool helps our team create compelling listings
          without needing a dedicated writing team.
        </p>
      </div>
      <Footer />
    </div>
  )
}

export default About